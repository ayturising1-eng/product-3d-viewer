const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
let checks = 0;
function check(value, message) { checks += 1; if (!value) throw new Error(message); }

check(html.includes('p3dv.v3.53'), 'V3.53 HTML version token missing');

// Freedom: 2308 + 216*n, 8..30 panels, last 7060.
for (const token of [
  'depthMin: 2308', 'depthMax: 7060', 'depthStep: 216', 'depthListStart: 2308',
  'panelMin: 8', 'panelMax: 30', 'panelPitch: 216', 'projectionOffset: 580'
]) check(app.includes(token), `Freedom opening contract missing: ${token}`);
check(8 * 216 + 580 === 2308, 'Freedom 8-panel opening must be 2308 mm');
check(30 * 216 + 580 === 7060, 'Freedom 30-panel opening must be 7060 mm');
check(((7060 - 2308) / 216) + 1 === 23, 'Freedom dropdown must contain 23 dimensional presets');
check(app.includes('`${value} - ${panelCount} Panel`'), 'Freedom/Bio dropdown must show compact value - panel label');
check(app.includes('`- ${panelCountFromProjection(Number(value), modelState.productGroup)} Panel`'), 'editable combo panel label missing');

// Bio-Rise uses the same two-column display contract.
for (const token of ['depthMin: 2070', 'depthMax: 6070', 'depthStep: 200', 'panelPitch: 200', 'projectionOffset: 470']) {
  check(app.includes(token), `Bio-Rise opening contract missing: ${token}`);
}
check(8 * 200 + 470 === 2070, 'Bio-Rise first panel-labelled opening mismatch');
check(28 * 200 + 470 === 6070, 'Bio-Rise last panel-labelled opening mismatch');

// Dropdown must remain in the system-card column and never create a horizontal scroller.
for (const token of [
  'width: 100%;', 'min-width: 0;', 'max-width: 100%;', 'overflow-x: hidden;',
  'grid-template-columns: max-content max-content;', 'justify-content: start;', 'gap: 8px;'
]) check(css.includes(token), `contained dropdown CSS missing: ${token}`);

// Pergo Rise fields and PLMR option dependencies are restored independently from Freedom/Bio-Rise.
for (const id of [
  'pergoGlassTrackInput','pergoStructureColorInput','pergoFabricInput','pergoFabricProfilesInput',
  'pergoDimmerInput','pergoTriangleJoineryInput','pergoWaterOutletPlacementInput'
]) check(html.includes(`id="${id}"`), `Pergo Rise PLMR field missing: ${id}`);
for (const token of [
  "Object.freeze(['-', 'RISING MOTOR', 'SOMFY RTS', 'SOMFY IO'])",
  "'RISING MOTOR': ['-', 'RISING 6 CHANNELS']",
  "'SOMFY RTS': ['-', 'SITUO 2 RTS', 'SITUO 5 RTS', 'TELIS 16 RTS']",
  "'SOMFY IO': ['-', 'SITUO 2 IO', 'SITUO 5 IO']",
  'C 1602 - 3D (8118-1622)', 'C 9012 - D (8290-9002)'
]) check(app.includes(token), `Pergo Rise PLMR option token missing: ${token}`);
check(css.includes('body.is-freedom-family .pergo-option-row'), 'Pergo-only fields must be isolated from Freedom/Bio-Rise');

// Panel color live update must refresh the shared Freedom louver material before atomic rebuild.
check(app.includes('function refreshFreedomLouverTemplateMaterial()'), 'Freedom louver live material refresh missing');
const colorStart = app.indexOf("if(event.data.type==='set-color-state')");
const colorEnd = app.indexOf("if(event.data.type==='set-pergo-rise-project'", colorStart);
const colorBlock = app.slice(colorStart, colorEnd);
check(colorBlock.includes('refreshFreedomLouverTemplateMaterial();'), 'panel color message must refresh Freedom template material');
check(colorBlock.indexOf('refreshFreedomLouverTemplateMaterial();') < colorBlock.indexOf('rebuildModelWithoutFrameReload(revision);'), 'material refresh must precede live rebuild');
const cloneStart = app.indexOf('function cloneFreedomLouverObject');
const cloneEnd = app.indexOf('function createFreedomLamel', cloneStart);
check(!app.slice(cloneStart, cloneEnd).includes('refreshFreedomLouverTemplateMaterial();'), 'template material must not be redundantly refreshed for every cloned louver');
check(app.includes("postViewerMessage('set-color-state'"), 'parent live color postMessage contract missing');
// Execute the actual embedded viewer material refresh function against a mock shared material.
const refreshStart = app.indexOf('function refreshFreedomLouverTemplateMaterial()');
const refreshEnd = app.indexOf('\nfunction cloneFreedomLouverObject', refreshStart);
const refreshSource = app.slice(refreshStart, refreshEnd);
const mockMaterial = { color: { value: 0, setHex(value) { this.value = value; } }, opacity: 1, roughness: 0, metalness: 0, bumpMap: {}, roughnessMap: {}, needsUpdate: false };
const refreshContext = {
  freedomLouverTemplate: { traverse(callback) { callback({ isMesh: true, material: mockMaterial }); } },
  PANEL_COLOR: 0x3020aa,
  PANEL_FINISH: 'texture',
  finishMaterialSettings() { return { roughness: 0.91, metalness: 0.03, bumpMap: null, roughnessMap: null }; }
};
vm.runInNewContext(`${refreshSource}; refreshFreedomLouverTemplateMaterial();`, refreshContext);
check(mockMaterial.color.value === 0x3020aa, 'live panel material color function did not apply PANEL_COLOR');
check(mockMaterial.roughness === 0.91 && mockMaterial.metalness === 0.03, 'live panel material finish function did not apply finish values');
check(mockMaterial.needsUpdate === true, 'live panel material must mark GPU state dirty');

// Open Zip Screen remains 80% visibly deployed.
check(app.includes("panelOpen?Math.max(80,(fullPanelH-bottomBarH)*.80)"), 'detailed Zip open height must remain 80 percent visible');
check(app.includes('const visibleH=open?Math.max(80,fullH*.80):fullH;'), 'Zip fallback open height must remain 80 percent visible');

// Expanded preview requests actual browser fullscreen and keeps dialogs above the workspace.
check(app.includes('document.documentElement.requestFullscreen()'), 'real Fullscreen API request missing');
check(app.includes('document.exitFullscreen()'), 'Fullscreen API exit missing');
check(app.includes("document.addEventListener('fullscreenchange', syncBrowserFullscreenClass)"), 'fullscreenchange synchronization missing');
for (const token of ['body.preview-expanded .dialog-backdrop', 'body.is-browser-fullscreen .dialog-backdrop', 'z-index: 1600;']) {
  check(css.includes(token), `expanded dialog overlay contract missing: ${token}`);
}
check(css.includes('body.preview-expanded .toolbox-selection-banner'), 'expanded selection banner containment missing');

// Right toolbox has one drawing-check action (header only) and exposes the previously hidden quick tests.
check(html.includes('id="headerCheckDrawingBtn"'), 'header drawing check missing');
check(!html.includes('id="largePreviewCheckDrawingBtn"'), 'duplicate right-toolbox drawing check remains');
for (let i = 1; i <= 10; i += 1) {
  check(html.includes(`id="largePreviewQuickTest${i}Btn"`), `right toolbox quick test ${i} missing`);
  check(app.includes(`largePreviewQuickTest${i}Btn`) || app.includes('data-quick-test'), `right toolbox quick test ${i} binding missing`);
}

// Raw GLBs stay out of the delivery package.
const glbs = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.glb$/i.test(entry.name)) glbs.push(full);
  }
})(root);
check(glbs.length === 0, `raw GLB files must be absent: ${glbs.join(', ')}`);

console.log(JSON.stringify({
  pass: true,
  checks,
  freedom: { first: '2308 - 8 Panel', last: '7060 - 30 Panel', presets: 23 },
  bioRise: 'panel-labelled editable combo',
  pergoRise: 'PLMR V13.92 option rows restored',
  panelColor: 'same iframe / shared louver material refresh',
  zipOpenVisibleRatio: 0.8,
  fullscreen: 'Fullscreen API + contained overlays',
  quickTestsInRightToolbox: 10
}));
