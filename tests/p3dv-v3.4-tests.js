const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
function assert(condition, message) { if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.4', 'Paneller Açık', 'toolboxPanelMasterInput', 'Sabit Doğrama',
  'Dikey Bölme Sayısı', 'Yatay Bölme Sayısı', 'Yatay Bölme Yükseklikleri (mm)',
  'Dikmenin Önü'
]) assert(indexSource.includes(token), `missing HTML token: ${token}`);
for (const forbidden of ['Yatay Bölme Yerleşim Mantığı', 'Dikmenin Dışı', '>Önden<']) {
  assert(!indexSource.includes(forbidden), `obsolete HTML remains: ${forbidden}`);
}
for (const token of [
  "['TOP', 'Üstten']",
  'zipPlacements: {}', 'function allProductEntries', 'function zipProductKey',
  'let zipPlacements=${zipPlacementsJson};', 'const lamellaOpenMode=panelMasterOpen;',
  'const lamelOpenAngle=-80;', 'function buildFixedJoineryProduct',
  'const verticalProfiles=Math.max(0,verticalDivisions-1);',
  'const horizontalDivisions=Math.max(1,Math.min(10',
  'const zipPlacement=zipPlacements[zone.id];',
  "try{buildZipScreenProduct(zone,zipPlacement);}",
  "zone={...zone,inward:-originalInward,zipOriginalInward:originalInward};",
  "if(cable==='TOP')cableY=zone.topY-9;",
  "if(toolboxSelectionMode==='multi-product')return true;"
]) assert(appSource.includes(token), `missing V3.4 code token: ${token}`);

class ClassList {
  constructor() { this.values = new Set(); }
  toggle(name, force) {
    if (force === undefined) {
      if (this.values.has(name)) this.values.delete(name); else this.values.add(name);
      return this.values.has(name);
    }
    if (force) this.values.add(name); else this.values.delete(name);
    return force;
  }
  contains(name) { return this.values.has(name); }
}
class El {
  constructor(id, tag = 'div') {
    this.id = id; this.tagName = tag.toUpperCase(); this._value = ''; this.textContent = '';
    this.hidden = false; this.disabled = false; this.checked = false; this.srcdoc = '';
    this.min = ''; this.max = ''; this.children = []; this.listeners = {}; this.selected = false;
    this._innerHTML = ''; this.classList = new ClassList(); this.messages = [];
    this.contentWindow = { postMessage: (data) => this.messages.push(data) };
  }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  dispatch(type, extra = {}) { for (const fn of this.listeners[type] || []) fn({ target: this, preventDefault() {}, ...extra }); }
  focus() {} select() {}
  appendChild(child) { this.children.push(child); if (child.selected || (!this._value && this.tagName === 'SELECT')) this._value = child.value; return child; }
  set innerHTML(value) { this._innerHTML = value; this.children = []; this._value = ''; }
  get innerHTML() { return this._innerHTML; }
  set value(value) { this._value = String(value == null ? '' : value); }
  get value() { return this._value; }
  querySelector(selector) {
    const match = selector.match(/^option\[value="([^"]+)"\]$/);
    if (match) return this.children.find((child) => child.value === match[1]) || null;
    return null;
  }
  querySelectorAll() { return []; }
}

const ids = [...indexSource.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
const elements = new Map(ids.map((id) => [id, new El(id, id.includes('Input') ? 'select' : 'div')]));
function el(id) { if (!elements.has(id)) elements.set(id, new El(id)); return elements.get(id); }
for (const id of [
  'productPanelsInput','productCustomGlassInput','widthInput','depthInput','heightInput',
  'bottomPanelModeInput','bottomPanelStateInput','bottomPanelHingeInput','productViewInput',
  'profileWidthInput','profileDepthInput','zoneWidthInput','zoneHeightInput','postXInput','postZInput',
  'productFixedVerticalCountInput','productFixedHorizontalCountInput','productFixedHorizontalHeightsInput',
  'toolboxPanelMasterInput','toolboxIntermediateDimensionsInput','toolboxMainDimensionsInput'
]) el(id).tagName = 'INPUT';

el('productTypeInput').value = 'sliding';
el('productSeriesInput').value = 'A SERIES';
el('productGlassColorInput').value = 'TRANSPARENT';
el('productPanelTypeInput').value = '1+2';
el('productMotorDirectionInput').value = 'RIGHT';
el('productViewInput').value = 'OUTSIDE VIEW';
el('productMotorTypeInput').value = 'SOMFY RTS';
el('productRemoteInput').value = '1 CHANNEL';
el('bottomPanelModeInput').value = 'VASISTAS';
el('bottomPanelStateInput').value = 'OPEN';
el('bottomPanelHingeInput').value = 'BOTTOM';
el('slidingCollectionStateInput').value = 'NORMAL';
el('collectingDisplayStateInput').value = 'NORMAL';
el('profileOrientationInput').value = 'vertical';
el('profileTypeInput').value = '100x100';
el('postProfileTypeInput').value = '100x220';
el('productPlacementInput').value = 'BETWEEN POSTS';

const alerts = [];
const windowListeners = {};
const document = { getElementById: el, createElement(tag) { return new El('', tag); } };
const window = {
  addEventListener(type, fn) { (windowListeners[type] ??= []).push(fn); },
  confirm() { return true; }, alert(message) { alerts.push(message); }
};
const context = { document, window, alert(message) { alerts.push(message); }, console, JSON, Math, Number, String, Array, Object, Date, setTimeout, clearTimeout };
context.global = context;
vm.runInNewContext(appSource, context, { filename: 'app.js' });
function message(data) { for (const fn of windowListeners.message || []) fn({ data }); }
function viewerHtml() { return el('viewerFrame').srcdoc; }
function extractJson(html, prefix, suffix) {
  const start = html.indexOf(prefix); assert(start >= 0, `missing ${prefix}`);
  const end = html.indexOf(suffix, start + prefix.length); assert(end >= 0, `missing suffix ${suffix}`);
  return JSON.parse(html.slice(start + prefix.length, end));
}
function checkIframeScript(html) {
  const marker = '<script>\n(function(){';
  const start = html.indexOf(marker); assert(start >= 0, 'iframe script marker missing');
  const end = html.indexOf('</script>', start); assert(end > start, 'iframe closing script missing');
  const script = html.slice(start + '<script>\n'.length, end);
  new vm.Script(script, { filename: 'generated-viewer.js' });
}

const zone = {
  id:'front', facadeId:'front', label:'Ön Cephe', axis:'x', width:3620, height:2938,
  baseWidth:3620, baseHeight:2938, startRatio:0, endRatio:1, bottomRatio:0, topRatio:1,
  leftBoundaryId:'START', rightBoundaryId:'END', bottomBoundaryId:'BOTTOM', topBoundaryId:'TOP',
  bottomY:-1576, topY:1362, beamBottomY:1362, outerFaceV:-110,
  startBoundaryWidth:100, endBoundaryWidth:100, leftBoundaryWidth:100, rightBoundaryWidth:100,
  inward:1, cx:0, cz:-2990
};

// Roof/green panels master: independent from product states, 80-degree lamellas.
el('toolboxPanelMasterInput').checked = true;
el('toolboxPanelMasterInput').dispatch('change');
let html = viewerHtml();
assert(html.includes('const panelMasterOpen=true;'), 'panel master state not passed');
assert(html.includes('const lamellaOpenMode=panelMasterOpen;'), 'lamella master not connected');
assert(html.includes('const lamelOpenAngle=-80;'), '80-degree lamella contract missing');

// Add fixed joinery with exactly 4 vertical divisions and 3 horizontal divisions.
message({ source:'product-3d-viewer', type:'select-zone', zone });
el('zoneActionPlaceProductBtn').dispatch('click');
el('productTypeInput').value = 'fixed';
el('productTypeInput').dispatch('change');
assert(el('productSeriesWrap').hidden === true, 'fixed series must be hidden');
assert(el('productSubtypeWrap').hidden === true, 'fixed subtype must be hidden');
assert(el('productGlassThicknessWrap').hidden === false, 'fixed glass thickness missing');
assert(el('productGlassColorWrap').hidden === false, 'fixed glass color missing');
assert(el('productFixedVerticalCountWrap').hidden === false, 'fixed vertical divisions missing');
assert(el('productFixedHorizontalCountWrap').hidden === false, 'fixed horizontal divisions missing');
assert(el('productFixedVerticalCountInput').value === '3', 'automatic vertical division count should be 3 for test opening');
el('productFixedVerticalCountInput').value = '4';
el('productFixedHorizontalCountInput').value = '3';
el('productFixedHorizontalCountInput').dispatch('change');
const heightSegments = el('productFixedHorizontalHeightsInput').value.split(';').map(Number);
assert(heightSegments.length === 3, 'three horizontal divisions require three height segments');
assert(heightSegments.reduce((a,b)=>a+b,0) === 2933, 'height segments must total fitted outside height');
el('productGlassThicknessInput').value = '10 MM';
el('productGlassColorInput').value = 'GREY';
el('productForm').dispatch('submit');
html = viewerHtml();
let placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
let zipPlacements = extractJson(html, 'let zipPlacements=', ';\nlet facadeProfiles');
assert(placements.front && placements.front.type === 'fixed', 'fixed primary placement missing');
assert(placements.front.verticalDivisions === 4, 'manual vertical division count not stored');
assert(placements.front.horizontalDivisions === 3, 'manual horizontal division count not stored');
assert(Object.keys(zipPlacements).length === 0, 'zip overlay should initially be empty');
assert(html.includes('const verticalProfiles=Math.max(0,verticalDivisions-1);'), '4 divisions -> 3 profile contract missing');
assert(html.includes('const horizontalDivisions=Math.max(1,Math.min(10'), 'horizontal division contract missing');
checkIframeScript(html);

// Add Zip as a second/front overlay without replacing fixed joinery.
message({ source:'product-3d-viewer', type:'select-zone', zone });
el('zoneActionPlaceProductBtn').dispatch('click');
el('productTypeInput').value = 'zip';
el('productTypeInput').dispatch('change');
el('productPlacementInput').value = 'FRONT OF POSTS';
el('productPanelTypeInput').value = 'TOP';
el('productGlassColorInput').value = 'SOLTIS';
el('productMotorDirectionInput').value = 'RIGHT';
el('productForm').dispatch('submit');
html = viewerHtml();
placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
zipPlacements = extractJson(html, 'let zipPlacements=', ';\nlet facadeProfiles');
assert(placements.front && placements.front.type === 'fixed', 'adding zip must preserve primary fixed product');
assert(zipPlacements.front && zipPlacements.front.type === 'zip', 'zip front overlay missing');
assert(zipPlacements.front.placementLocation === 'FRONT OF POSTS', 'zip front-of-post placement missing');
assert(zipPlacements.front.cableDirection === 'TOP', 'zip top cable direction missing');
assert(html.includes("zone={...zone,inward:-originalInward,zipOriginalInward:originalInward};"), 'zip must be placed outside/front of system');
assert(html.includes("if(cable==='TOP')cableY=zone.topY-9;"), 'zip top cable geometry missing');
assert(el('toolboxProductOpenList').children.length === 2, 'product status list must show primary and zip overlay');
checkIframeScript(html);

console.log(JSON.stringify({ pass:true, checks:47, htmlBytes:html.length }));
