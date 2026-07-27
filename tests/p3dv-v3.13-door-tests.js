const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const colorSource = fs.readFileSync(path.join(root, 'ral-colors.js'), 'utf8');
const zipTextureSource = fs.readFileSync(path.join(root, 'zip-fabric-textures.js'), 'utf8');
const styleSource = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
let checkCount = 0;
function assert(condition, message) { checkCount += 1; if (!condition) throw new Error(message); }

const catalogProbe = { window: {} };
vm.runInNewContext(colorSource, catalogProbe, { filename: 'ral-colors.js' });
const ralCatalog = catalogProbe.window.P3DV_RAL_CATALOG;
assert(Boolean(ralCatalog), 'RAL catalog global missing');
assert(Array.isArray(ralCatalog.all) && ralCatalog.all.length === 193, 'all RAL catalog must contain 193 strict RAL codes');
assert(Array.isArray(ralCatalog.risingStandardCodes) && ralCatalog.risingStandardCodes.length === 11, 'Rising standard catalog must contain 11 strict RAL codes');
assert(ralCatalog.all.every((option) => /^RAL \d{4}$/.test(option.code)), 'non-RAL code leaked into the catalog');
assert(ralCatalog.all.every((option) => /^#[0-9A-F]{6}$/.test(option.hex)), 'RAL hex mapping is invalid');
assert(ralCatalog.all.every((option) => fs.existsSync(path.join(root, option.image))), 'RAL color asset is missing');
const zipTextureProbe = { window: {} };
vm.runInNewContext(zipTextureSource, zipTextureProbe, { filename: 'zip-fabric-textures.js' });
const embeddedZipTextures = zipTextureProbe.window.P3DV_ZIP_FABRIC_TEXTURES;
assert(Boolean(embeddedZipTextures), 'embedded Zip texture map missing');
assert(Object.keys(embeddedZipTextures).length === 23, 'embedded Zip texture map must contain 23 catalog samples');
assert(Object.values(embeddedZipTextures).every((value) => /^data:image\/jpeg;base64,/.test(value)), 'embedded Zip texture entries must be JPEG data URIs');

for (const token of [
  'p3dv.v3.26', 'Ürün Giriş Bilgileri', 'Bioclimatic', 'B-Cube', 'Freedom', 'Modul 1',
  'placeholder="Önerilen maks. 4050 mm"', 'placeholder="Önerilen 2038–7060 mm"', 'projectionOptions', 'Paneller Açık', 'toolboxPanelMasterInput', 'Sabit Doğrama',
  'Dikey Bölme Sayısı', 'Yatay Bölme Sayısı', 'Yatay Bölme Yükseklikleri (mm)',
  'Dikmenin Önü', 'Kapı (Dış Bakış)', 'productDoorTypeInput', 'productDoorTypeTrigger', 'productDoorTypePicker',
  'productDoorTypeCards', 'productDoorHandleTypeInput', 'productDoorTopFixedHeightInput',
  'Dış Bakış', 'productDoorHeightSummaryWrap', 'Hareketli Kapı Kanadı Yüksekliği',
  'systemColorTrigger', 'panelColorTrigger', 'defaultColorModeBtn', 'ralColorModeBtn', 'colorPickerDialog', 'colorCatalogRisingBtn',
  'colorCatalogAllBtn', 'colorSearchInput', 'colorOptionGrid', './ral-colors.js', './zip-fabric-textures.js'
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
  "try{buildZipScreenProduct(zone,effectiveZipPlacement);}",
  'autoFrontOnly:Boolean(placement)', 'zipOutside:automaticFront',
  'const lamelRearMaxZ=', 'rearStackMaxZ',
  'function projectionFromPanelCount', 'function panelCountFromProjection', 'function modelReady',
  "const zipOutside=Boolean(zone.zipOutside);",
  "zone={...zone,inward:zipOutside?-originalInward:originalInward,zipOriginalInward:originalInward};",
  "zipSideClearance:1.5",
  "width:Math.max(120,zone.width+left+right)",
  "height:Math.max(180,zone.height+150)",
  "topY:zone.topY+150",
  "if(cable==='TOP')cableY=zone.topY-9;",
  "if(toolboxSelectionMode==='multi-product')return true;",
  'function buildDoorProduct', 'function addMovingDoorLeaf', 'function addFixedDoorLeaf',
  "const handleY=zone.bottomY+900;", "const frameFace=50;", "const frameDepth=55;",
  "else if(placement.type==='door')buildDoorProduct(zone,placement);",
  "const SYSTEM_COLOR=${systemColorValue};", "const PANEL_COLOR=${panelColorValue};",
  "const DEFAULT_COLOR_MODE=${JSON.stringify(colorMode !== 'ral')};",
  "const magenta=profileColor(0xff00ff),blue=profileColor(0x2563eb),orange=profileColor(0xff8c00),amber=profileColor(0xffb347),grass=panelColor(0x7cfc00);",
  "function profileColor(defaultHex){", "function panelColor(defaultHex){",
  "const leafWidth = 1000;", "const sideFixedWidth = 1000;", "const leafHeight = 2500;", "const topFixedHeight = 500;",
  "function facadeRightDirectionSign(zone){", "const facadeRightSign=facadeRightDirectionSign(zone);",
  "normalized.motorDirection = normalized.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';",
  "const bottomY=-H/2;", "const topY=beamBottomY;",
  "const centered=fitProductZone(zone,3);", "zone=fitProductZone(zone,5);",
  "movingLeafHeight: 2200", "function doorTopFixedAvailableHeight(zone)"
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
  removeAttribute(name) { if (name === 'max') this.max = ''; }
  setAttribute(name, value) { this[name] = String(value); }
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
  'toolboxPanelMasterInput','toolboxIntermediateDimensionsInput','toolboxMainDimensionsInput',
  'freedomWidthInput','freedomDepthInput','freedomHeightInput','freedomPanelCountInput',
  'productDoorTopFixedHeightInput'
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
el('productGroupInput').tagName = 'SELECT';
el('productGroupInput').value = 'b-cube';
el('projectionOptions').tagName = 'DATALIST';

const alerts = [];
const windowListeners = {};
const document = { getElementById: el, createElement(tag) { return new El('', tag); } };
const window = {
  addEventListener(type, fn) { (windowListeners[type] ??= []).push(fn); },
  confirm() { return true; }, alert(message) { alerts.push(message); }
};
const context = { document, window, alert(message) { alerts.push(message); }, console, JSON, Math, Number, String, Array, Object, Date, setTimeout, clearTimeout };
context.global = context;
vm.runInNewContext(colorSource, context, { filename: 'ral-colors.js' });
vm.runInNewContext(zipTextureSource, context, { filename: 'zip-fabric-textures.js' });
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

function checkDoorBuilderRuntime(html) {
  const constantStart = html.indexOf("const DOOR_TOP_FIXED_TYPES=new Set(");
  assert(constantStart >= 0, 'iframe-local door type set is missing');
  const constantEnd = html.indexOf(';\n', constantStart);
  assert(constantEnd > constantStart, 'iframe-local door type set is incomplete');
  const builderStart = html.indexOf('function buildDoorProduct(zone,placement){');
  const builderEnd = html.indexOf('function fixedVerticalDivisionCount', builderStart);
  assert(builderStart >= 0 && builderEnd > builderStart, 'door builder extraction failed');
  const probe = html.slice(constantStart, constantEnd + 1) + '\n'
    + html.slice(builderStart, builderEnd) + '\n'
    + "const zone={width:1800,height:2500,bottomY:-1250,topY:1250};"
    + "buildDoorProduct(zone,{doorType:'SINGLE',hingeDirection:'LEFT'});"
    + "buildDoorProduct(zone,{doorType:'TOP_FIXED',hingeDirection:'RIGHT',topFixedHeight:500});";
  vm.runInNewContext(probe, {
    Math, Number, String, SYSTEM_COLOR: 0x7c7d7f,
    profileColor: (defaultHex) => defaultHex,
    fitProductZone: (zone) => zone,
    productDepthCenter: () => 0,
    addProductBox: () => {},
    glazingSectionSpec: () => ({ glassDepth: 10 }),
    glassVisualColor: () => 0,
    addDoorTopFixedDimensions: () => {},
    addFixedDoorLeaf: () => {},
    addMovingDoorLeaf: () => {}
  }, { filename: 'door-builder-runtime-probe.js' });
}


function checkGuillotineMotorDirectionRuntime(html) {
  const helperStart = html.indexOf('function facadeRightDirectionSign(zone){');
  const helperEnd = html.indexOf('function buildGuillotineProduct(zone,placement){', helperStart);
  assert(helperStart >= 0 && helperEnd > helperStart, 'facade motor direction helper extraction failed');
  const probe = html.slice(helperStart, helperEnd)
    + "\nresult={"
    + "front:facadeRightDirectionSign({axis:'x',inward:1}),"
    + "back:facadeRightDirectionSign({axis:'x',inward:-1}),"
    + "left:facadeRightDirectionSign({axis:'z',inward:1}),"
    + "right:facadeRightDirectionSign({axis:'z',inward:-1}),"
    + "zipFront:facadeRightDirectionSign({axis:'x',inward:-1,zipOriginalInward:1})"
    + "};";
  const context = { Number };
  vm.runInNewContext(probe, context, { filename: 'guillotine-motor-direction-probe.js' });
  assert(context.result.front === -1, 'front facade outside-view right sign must be -1');
  assert(context.result.back === 1, 'back facade outside-view right sign must be 1');
  assert(context.result.left === 1, 'left facade outside-view right sign must be 1');
  assert(context.result.right === -1, 'right facade outside-view right sign must be -1');
  assert(context.result.zipFront === -1, 'Zip flipped depth must preserve original facade right sign');
}

function checkInnerDoorHandleRuntime(html) {
  const start = html.indexOf('function addDoorHandleParts(zone,pivot,cfg,placement,hingeU,hingeV,productOpen){');
  const end = html.indexOf('function addMovingDoorLeaf', start);
  assert(start >= 0 && end > start, 'inner door handle helper extraction failed');
  const source = html.slice(start, end)
    + "\nconst calls=[];"
    + "function productDepthCenter(){return 0;}"
    + "function addDoorPivotPart(zone,pivot,cfg){calls.push(cfg);return cfg;}"
    + "const zone={bottomY:0,inward:1};"
    + "addDoorHandleParts(zone,null,{hingeDirection:'LEFT',centerU:0,width:1000},{handleType:'NORMAL'},0,0,false);"
    + "result=calls;";
  const runtime = { result:null };
  vm.runInNewContext(source, runtime, { filename:'inner-door-handle-probe.js' });
  const outer = runtime.result.find((item) => item.name === 'Normal Kapı Kolu Dış');
  const inner = runtime.result.find((item) => item.name === 'Normal Kapı Kolu İç');
  assert(Boolean(outer && inner), 'inner/outer normal handle geometry missing');
  assert(inner.u === outer.u, 'inner handle must be rotated 180 degrees around the rosette and point in the same physical direction as outer handle');
  assert(inner.v !== outer.v, 'inner and outer handles must remain on opposite door faces');
}

function checkDoorSilhouetteRuntime() {
  const fnStart = appSource.indexOf('function doorTypeSilhouetteSvg(type) {');
  const fnEnd = appSource.indexOf('function closeDoorTypePicker()', fnStart);
  assert(fnStart >= 0 && fnEnd > fnStart, 'door silhouette helper extraction failed');
  const probe = { result: null };
  vm.runInNewContext(
    "const DOOR_TOP_FIXED_TYPES=new Set(['TOP_FIXED','LEFT_FIXED_TOP','RIGHT_FIXED_TOP','BOTH_FIXED_TOP','DOUBLE_TOP','DOUBLE_LEFT_FIXED_TOP','DOUBLE_RIGHT_FIXED_TOP','DOUBLE_BOTH_FIXED_TOP']);\n"
      + appSource.slice(fnStart, fnEnd)
      + "\nresult={single:doorTypeSilhouetteSvg('SINGLE'),top:doorTypeSilhouetteSvg('TOP_FIXED'),wide:doorTypeSilhouetteSvg('DOUBLE_BOTH_FIXED_TOP')};",
    probe,
    { filename: 'door-silhouette-runtime-probe.js' }
  );
  assert(probe.result.single.includes('viewBox="0 0 4280 3280"'), 'door silhouette canonical viewBox missing');
  assert(probe.result.single.includes('width="1000" height="2500"'), 'single door must use 1000x2500 proportion');
  assert(probe.result.top.includes('width="1000" height="3000"'), 'top-fixed door must use 1000x3000 overall proportion');
  assert(probe.result.wide.includes('width="4000" height="3000"'), 'double both-fixed door must use 4000x3000 overall proportion');
  assert(probe.result.top.includes('height="410"'), '500 mm top fixed band must retain proportional inset geometry');
}

// Initial state must be blank and must not create the Three.js model.
assert(el('freedomWidthInput').value === '', 'initial width must be blank');
assert(el('freedomDepthInput').value === '', 'initial projection must be blank');
assert(el('freedomHeightInput').value === '', 'initial height must be blank');
assert(el('freedomPanelCountInput').value === '', 'initial panel count must be blank');
assert(viewerHtml().includes('Sol taraftaki Genişlik'), 'initial empty viewer prompt missing');

// Panel count -> projection canonical formula.
el('freedomPanelCountInput').value = '25';
el('freedomPanelCountInput').dispatch('input');
assert(el('freedomDepthInput').value === '5980', '25 panels must calculate 5980 mm projection');

// Recommended maximum projection remains available in the canonical suggestion list.
el('freedomDepthInput').value = '7060';
el('freedomDepthInput').dispatch('input');
assert(el('freedomPanelCountInput').value === '30', '7060 mm projection must suggest 30 panels');

// V3.26 soft limits: values above recommendations remain drawable and unclamped.
el('freedomWidthInput').value = '5200';
el('freedomPanelCountInput').value = '36';
el('freedomPanelCountInput').dispatch('input');
assert(el('freedomDepthInput').value === '8356', '36-panel projection must remain unclamped');
el('freedomHeightInput').value = '3200';
el('freedomInputForm').dispatch('submit');
let oversizedHtml = viewerHtml();
assert(oversizedHtml.includes('const W=5200, D=8356, H=3200;'), 'oversized model must render');
assert(oversizedHtml.includes('const LC=36;'), 'oversized model panel count must remain unclamped');
assert(el('freedomInputValidation').classList.contains('is-warning'), 'oversized model must show an advisory warning');
checkIframeScript(oversizedHtml);

// Apply a valid model using a canonical 25-panel projection.
el('freedomWidthInput').value = '4050';
el('freedomPanelCountInput').value = '25';
el('freedomPanelCountInput').dispatch('input');
el('freedomHeightInput').value = '3200';
el('freedomInputForm').dispatch('submit');
let initialModelHtml = viewerHtml();
assert(initialModelHtml.includes('const W=4050, D=5980, H=3200;'), 'left panel dimensions not applied');
assert(initialModelHtml.includes('const LC=25;'), 'manual panel count not passed to viewer');
assert(initialModelHtml.includes('const lamelRearMaxZ='), 'rear facade lamella stack contract missing');
checkIframeScript(initialModelHtml);
checkDoorBuilderRuntime(initialModelHtml);
checkInnerDoorHandleRuntime(initialModelHtml);
checkGuillotineMotorDirectionRuntime(initialModelHtml);
checkDoorSilhouetteRuntime();


// V3.25 default startup contract and RAL selector flow.
assert(el('systemColorValue').textContent === 'Klasik Sistem Paleti', 'startup system color must use the classic default palette');
assert(el('panelColorValue').textContent === 'Klasik Panel Yeşili', 'startup panel color must use the classic default green');
assert(el('defaultColorModeBtn').classList.contains('is-active'), 'Default color button must be active on startup');
assert(!el('ralColorModeBtn').classList.contains('is-active'), 'RAL color button must be inactive on startup');
assert(initialModelHtml.includes('const DEFAULT_COLOR_MODE=true;'), 'classic default color mode not passed to viewer');
assert(initialModelHtml.includes(`const SYSTEM_COLOR=${parseInt(ralCatalog.all.find((item) => item.code === 'RAL 9006').hex.slice(1), 16)};`), 'stored RAL system color must remain available');
assert(initialModelHtml.includes(`const PANEL_COLOR=${parseInt(ralCatalog.all.find((item) => item.code === 'RAL 6018').hex.slice(1), 16)};`), 'stored RAL panel color must remain available');
assert(initialModelHtml.includes(`const SYSTEM_FINISH=${JSON.stringify('MATTE')};`), 'stored system finish not passed to viewer');
assert(initialModelHtml.includes(`const PANEL_FINISH=${JSON.stringify('MATTE')};`), 'stored panel finish not passed to viewer');
assert(initialModelHtml.includes('const magenta=profileColor(0xff00ff)'), 'classic magenta post color missing');
assert(initialModelHtml.includes('blue=profileColor(0x2563eb)'), 'classic blue beam color missing');
assert(initialModelHtml.includes('orange=profileColor(0xff8c00)'), 'classic orange gutter color missing');
assert(initialModelHtml.includes('amber=profileColor(0xffb347)'), 'classic amber inner rail color missing');
assert(initialModelHtml.includes('grass=panelColor(0x7cfc00)'), 'classic green panel color missing');
assert(el('toolboxPanelMasterInput').checked === true, 'panels must start open');
assert(el('toolboxIntermediateDimensionsInput').checked === false, 'intermediate dimensions must start hidden');
assert(el('toolboxMainDimensionsInput').checked === true, 'main dimensions must start visible');
assert(el('replayAnimationBtn').textContent === 'Ürünler Açık', 'products must start open');
assert(initialModelHtml.includes('const productsOpen=true;'), 'global product state must start open in viewer');
assert(initialModelHtml.includes('let dimensionVisibility={"intermediate":false,"main":true};'), 'viewer must start with only main dimensions visible');
el('systemColorTrigger').dispatch('click');
assert(el('colorPickerDialog').hidden === false, 'system color picker must open');
assert(el('colorPickerTitle').textContent === 'Sistem Rengi Seçin', 'system color picker title mismatch');
assert(el('colorOptionGrid').children.length === 11, 'Rising standard filter must render 11 RAL cards');
const system7016 = el('colorOptionGrid').children.find((card) => card.value === 'RAL 7016');
assert(Boolean(system7016), 'RAL 7016 system card missing');
system7016.dispatch('click');
assert(el('colorFinishDialog').hidden === false, 'finish dialog must open after RAL selection');
const systemGloss = el('colorFinishOptions').children.find((card) => card.innerHTML.includes('Parlak'));
assert(Boolean(systemGloss), 'Parlak finish option missing');
systemGloss.dispatch('click');
assert(el('colorPickerDialog').hidden === true, 'color picker must close after finish selection');
assert(el('colorFinishDialog').hidden === true, 'finish dialog must close after finish selection');
assert(el('systemColorValue').textContent === 'RAL 7016 · Parlak', 'system color selection not stored in UI');
assert(el('ralColorModeBtn').classList.contains('is-active'), 'RAL mode must activate after a RAL finish is selected');
assert(viewerHtml().includes('const DEFAULT_COLOR_MODE=false;'), 'viewer must switch from classic colors to RAL mode');
let colorHtml = viewerHtml();
const ral7016 = ralCatalog.all.find((item) => item.code === 'RAL 7016');
assert(colorHtml.includes(`const SYSTEM_COLOR=${parseInt(ral7016.hex.slice(1), 16)};`), 'selected system color not propagated to viewer');
assert(colorHtml.includes(`const SYSTEM_FINISH=${JSON.stringify('GLOSS')};`), 'selected system finish not propagated to viewer');
assert(colorHtml.includes(`const PANEL_COLOR=${parseInt(ralCatalog.all.find((item) => item.code === 'RAL 6018').hex.slice(1), 16)};`), 'system selection must not alter panel color');
el('panelColorTrigger').dispatch('click');
el('colorCatalogAllBtn').dispatch('click');
assert(el('colorOptionGrid').children.length === 193, 'all RAL filter must render 193 cards');
el('colorSearchInput').value = '9016';
el('colorSearchInput').dispatch('input');
assert(el('colorOptionGrid').children.length === 1, 'RAL search must isolate one matching code');
const panel9016 = el('colorOptionGrid').children[0];
assert(panel9016.value === 'RAL 9016', 'RAL search returned the wrong code');
panel9016.dispatch('click');
assert(el('colorFinishDialog').hidden === false, 'panel finish dialog must open');
const panelTexture = el('colorFinishOptions').children.find((card) => card.innerHTML.includes('Texture'));
assert(Boolean(panelTexture), 'Texture finish option missing');
panelTexture.dispatch('click');
assert(el('panelColorValue').textContent === 'RAL 9016 · Texture', 'panel color selection not stored in UI');
colorHtml = viewerHtml();
const ral9016 = ralCatalog.all.find((item) => item.code === 'RAL 9016');
assert(colorHtml.includes(`const PANEL_COLOR=${parseInt(ral9016.hex.slice(1), 16)};`), 'selected panel color not propagated to viewer');
assert(colorHtml.includes(`const PANEL_FINISH=${JSON.stringify('TEXTURE')};`), 'selected panel finish not propagated to viewer');
assert(colorHtml.includes(`const SYSTEM_COLOR=${parseInt(ral7016.hex.slice(1), 16)};`), 'panel selection must not alter system color');
checkIframeScript(colorHtml);
el('defaultColorModeBtn').dispatch('click');
assert(el('systemColorValue').textContent === 'Klasik Sistem Paleti', 'Default button must restore classic system palette');
assert(el('panelColorValue').textContent === 'Klasik Panel Yeşili', 'Default button must restore classic panel palette');
assert(viewerHtml().includes('const DEFAULT_COLOR_MODE=true;'), 'Default button must restore classic viewer colors');
el('ralColorModeBtn').dispatch('click');
assert(el('systemColorValue').textContent === 'RAL 7016 · Parlak', 'RAL button must restore the last selected system RAL');
assert(el('panelColorValue').textContent === 'RAL 9016 · Texture', 'RAL button must restore the last selected panel RAL');
assert(viewerHtml().includes('const DEFAULT_COLOR_MODE=false;'), 'RAL button must restore RAL viewer colors');

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
assert(appSource.includes('geo.rotateX(Math.PI);'), 'open lamella 180-degree local mirror missing');
const closedLamelSource = appSource.slice(appSource.indexOf('function createLamel('), appSource.indexOf('function createOpenedLamel('));
const openedLamelSource = appSource.slice(appSource.indexOf('function createOpenedLamel('), appSource.indexOf('function setMeshByBounds('));
assert(!closedLamelSource.includes('geo.rotateX(Math.PI);'), 'closed lamella must not be mirrored');
assert(openedLamelSource.includes('geo.rotateX(Math.PI);'), 'open lamella mirror must be local to opened builder');
assert(openedLamelSource.indexOf('geo.rotateX(Math.PI);') < openedLamelSource.indexOf('geo.computeBoundingBox();'), 'mirror must run before bounds/pivot calculation');


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
el('productGlassColorInput').value = 'FUME';
el('productForm').dispatch('submit');
html = viewerHtml();
let placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
let zipPlacements = extractJson(html, 'let zipPlacements=', ';\nlet facadeProfiles');
assert(placements.front && placements.front.type === 'fixed', 'fixed primary placement missing');
let openStatesAfterFixed = extractJson(html, 'let productOpenStates=', ';\nlet panelStates');
assert(openStatesAfterFixed.front === true, 'newly placed primary product must start open');
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
const openStatesAfterZip = extractJson(html, 'let productOpenStates=', ';\nlet panelStates');
assert(openStatesAfterZip['zip:front'] === true, 'newly placed Zip product must start open');
assert(zipPlacements.front.placementLocation === 'FRONT OF POSTS', 'zip front-of-post placement missing');
assert(zipPlacements.front.cableDirection === 'TOP', 'zip top cable direction missing');
assert(html.includes("zone={...zone,inward:zipOutside?-originalInward:originalInward,zipOriginalInward:originalInward};"), 'zip direction must depend on placement mode');
assert(html.includes("if(cable==='TOP')cableY=zone.topY-9;"), 'zip top cable geometry missing');
assert(el('toolboxProductOpenList').children.length === 2, 'product status list must show primary and zip overlay');
checkIframeScript(html);

// Zip first, then a primary guillotine: both slots must survive and between-post Zip moves only in depth.
const backZone = { ...zone, id:'back', facadeId:'back', label:'Arka Cephe', inward:-1, cz:2774, outerFaceV:110 };
message({ source:'product-3d-viewer', type:'select-zone', zone:backZone });
el('zoneActionPlaceProductBtn').dispatch('click');
el('productTypeInput').value = 'zip';
el('productTypeInput').dispatch('change');
el('productPlacementInput').value = 'BETWEEN POSTS';
el('productGroupInput').tagName = 'SELECT';
el('productGroupInput').value = 'b-cube';
el('projectionOptions').tagName = 'DATALIST';
el('productPanelTypeInput').value = 'BACK';
el('productGlassColorInput').value = 'SOLTIS';
el('productForm').dispatch('submit');
html = viewerHtml();
zipPlacements = extractJson(html, 'let zipPlacements=', ';\nlet facadeProfiles');
assert(zipPlacements.back && zipPlacements.back.placementLocation === 'BETWEEN POSTS', 'zip-first between-post state missing');

message({ source:'product-3d-viewer', type:'select-zone', zone:backZone });
el('zoneActionPlaceProductBtn').dispatch('click');
assert(el('productTypeInput').value === 'sliding', 'zip-only zone must open on primary product slot');
el('productTypeInput').value = 'guillotine';
el('productTypeInput').dispatch('change');
el('productPanelTypeInput').value = '1+2';
el('productGlassColorInput').value = 'TRANSPARENT';
el('productMotorDirectionInput').value = 'LEFT';
el('productMotorDirectionInput').dispatch('change');
el('productForm').dispatch('submit');
html = viewerHtml();
placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
zipPlacements = extractJson(html, 'let zipPlacements=', ';\nlet facadeProfiles');
assert(placements.back && placements.back.type === 'guillotine', 'guillotine after zip was not stored');
assert(placements.back.motorDirection === 'LEFT', 'guillotine left motor direction was not preserved');
assert(zipPlacements.back && zipPlacements.back.type === 'zip', 'zip was lost when guillotine was added');
assert(zipPlacements.back.placementLocation === 'BETWEEN POSTS', 'automatic front collision rule must not rewrite user placement');
assert(html.includes("autoFrontOnly:Boolean(placement)"), 'automatic front-only collision flag missing');
assert(html.includes('zipOutside:automaticFront'), 'automatic front-only depth rule missing');
checkIframeScript(html);

assert(html.includes('zipSideClearance:1.5'), 'between-post equal 1.5 mm side clearance missing');
assert(html.includes('width:Math.max(120,zone.width+left+right)'), 'front-of-post outside-to-outside width missing');
assert(html.includes('height:Math.max(180,zone.height+150)'), 'front-of-post +150 height missing');
assert(html.includes('topY:zone.topY+150'), 'front-of-post top extension missing');


// Door product: isolated primary slot, 50x55 profiles, no threshold and handle at 900 mm.
const doorZone = { ...zone, id:'right', facadeId:'right', label:'Sağ Cephe', axis:'z', width:1800, height:2500, bottomY:-1250, topY:1250, inward:-1, cx:1975, cz:0, outerFaceV:50 };
message({ source:'product-3d-viewer', type:'select-zone', zone:doorZone });
el('zoneActionPlaceProductBtn').dispatch('click');
el('productTypeInput').value = 'door';
el('productTypeInput').dispatch('change');
assert(el('productDoorTypeWrap').hidden === false, 'door type field must be visible');
assert(el('productDoorHingeWrap').hidden === false, 'single door hinge field must be visible');
assert(el('productDoorHandleTypeWrap').hidden === false, 'door handle field must be visible');
assert(el('productDoorOpenDirectionWrap').hidden === false, 'door opening direction field must be visible');
assert(el('productDoorTypePicker').hidden === true, 'door silhouettes must stay hidden until the type field is clicked');
el('productDoorTypeTrigger').dispatch('click');
assert(el('productDoorTypePicker').hidden === false, 'door type picker must open from the type field');
assert(el('productDoorTypeCards').children.length === 13, 'door type picker must render all 13 silhouette cards');
el('productDoorTypePickerClose').dispatch('click');
assert(el('productDoorTypePicker').hidden === true, 'door type picker back action must close the selection page');
assert(el('productSeriesWrap').hidden === true, 'door must hide series');
assert(el('productPanelsWrap').hidden === true, 'door must hide panel count');
assert(el('productFixedVerticalCountWrap').hidden === true, 'door must hide fixed-joinery divisions');
el('productDoorTypeInput').value = 'SINGLE';
el('productDoorHingeInput').value = 'LEFT';
el('productDoorOpenDirectionInput').value = 'INWARD';
el('productDoorHandleTypeInput').value = 'NORMAL';
el('productGlassThicknessInput').value = '10 MM';
el('productGlassColorInput').value = 'FUME';
el('productForm').dispatch('submit');
html = viewerHtml();
placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
assert(placements.right && placements.right.type === 'door', 'door placement missing');
assert(placements.right.doorType === 'SINGLE', 'single door type not stored');
assert(placements.right.hingeDirection === 'LEFT', 'door hinge not stored');
assert(placements.right.doorOpenDirection === 'INWARD', 'inward door opening direction not stored');
assert(placements.right.handleType === 'NORMAL', 'normal handle not stored');
assert(placements.right.view === 'OUTSIDE VIEW', 'door outside-view state not stored');
assert(html.includes("name:'Door Outer Left Frame'"), 'door outer left frame missing');
assert(html.includes("name:'Door Outer Right Frame'"), 'door outer right frame missing');
assert(html.includes("name:'Door Outer Top Frame'"), 'door outer top frame missing');
assert(!html.includes("Door Outer Bottom Frame"), 'door must not have a bottom threshold');
assert(html.includes('const handleY=zone.bottomY+900;'), 'door handle must remain 900 mm above ground');
checkIframeScript(html);

// Product state opens the moving door 90 degrees without moving the hinge pivot.
message({ source:'product-3d-viewer', type:'toggle-panel-state', zoneId:'right', productKey:'right', open:true });
html = viewerHtml();
const doorStates = extractJson(html, 'let productOpenStates=', ';\nlet panelStates');
assert(doorStates.right === true, 'door open state was not stored');
assert(html.includes('Math.PI/4:0;'), 'door open angle must be 45 degrees');
assert(html.includes('const pivot=createDoorPivot(zone,hingeU,hingeV,angle);'), 'door must rotate at a fixed hinge pivot');

// Top-fixed variant exposes its height field and retains a moving lower leaf.
const topDoorZone = { ...zone, id:'left', facadeId:'left', label:'Sol Cephe', axis:'z', width:1500, height:2600, bottomY:-1300, topY:1300, inward:1, cx:-1975, cz:0, outerFaceV:-50 };
message({ source:'product-3d-viewer', type:'select-zone', zone:topDoorZone });
el('zoneActionPlaceProductBtn').dispatch('click');
el('productTypeInput').value = 'door';
el('productTypeInput').dispatch('change');
el('productDoorTypeTrigger').dispatch('click');
const topFixedCard = el('productDoorTypeCards').children.find((card) => card['data-value'] === 'TOP_FIXED');
assert(Boolean(topFixedCard), 'top-fixed silhouette card missing');
topFixedCard.dispatch('click');
assert(el('productDoorTypePicker').hidden === true, 'silhouette selection must return to the product form');
assert(el('productDoorTypeInput').value === 'TOP_FIXED', 'silhouette selection must update the hidden canonical door type');
assert(el('productDoorTypeValue').textContent === 'Tek Kanat · Üst Sabit', 'door type field must show the selected short label');
assert(el('productDoorTopFixedHeightWrap').hidden === false, 'moving leaf height field must be visible for top-fixed doors');
assert(el('productDoorHeightSummaryWrap').hidden === false, 'moving leaf height summary must be visible');
el('productDoorTopFixedHeightInput').value = '2008';
el('productDoorTopFixedHeightInput').dispatch('input');
assert(el('productDoorMovingHeightValue').textContent === '2008 mm', 'moving-leaf height summary must match the user input');
assert(el('productDoorFixedHeightValue').textContent === '500 mm', 'upper fixed height must be derived from the remaining real geometry');
el('productDoorHingeInput').value = 'RIGHT';
el('productDoorHandleTypeInput').value = 'PANIC';
el('productGlassThicknessInput').value = '8 MM';
el('productGlassColorInput').value = 'TRANSPARENT';
el('productForm').dispatch('submit');
html = viewerHtml();
placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
assert(placements.left && placements.left.doorType === 'TOP_FIXED', 'top-fixed door placement missing');
assert(placements.left.movingLeafHeight === 2008, 'moving leaf height not stored');
assert(placements.left.topFixedHeight === 500, 'derived top-fixed height not stored for geometry compatibility');
assert(placements.left.handleType === 'PANIC', 'panic handle not stored');
assert(html.includes("name:'Door Upper Fixed Glass'"), 'upper fixed glass geometry missing');
assert(html.includes("Door Lower Leaf"), 'lower moving leaf geometry missing');
assert(html.includes("name:'Panik Kapı Kolu'"), 'panic handle geometry missing');
assert(appSource.includes('const barWidth=Math.max(120,cfg.width);'), 'panic bar must equal the related leaf width');
assert(!appSource.includes('Math.min(cfg.width-180,520)'), 'legacy 520 mm panic-bar clamp must be removed');
assert(!html.includes("'Sabit Cam '+Math.round(fixedHeight)+' mm'"), 'fixed-glass 3D dimension label must be removed');
assert(html.includes("'Kapı Kanadı '+Math.round(leafHeight)+' mm'"), 'moving-leaf 3D dimension label missing');
assert(html.includes('addDoorTopFixedDimensions(zone,bottom,leafTop,movingHeight);'), 'top-fixed moving-leaf-only dimension call missing');
checkIframeScript(html);

const doorBuilder = appSource.slice(appSource.indexOf('function buildDoorProduct'), appSource.indexOf('function fixedVerticalDivisionCount'));
assert(doorBuilder.includes("LEFT_FIXED_TOP"), 'left-fixed top branch missing');
assert(doorBuilder.includes("RIGHT_FIXED_TOP"), 'right-fixed top branch missing');
assert(doorBuilder.includes("DOUBLE_LEFT_FIXED"), 'double left-fixed branch missing');
assert(doorBuilder.includes("DOUBLE_RIGHT_FIXED_TOP"), 'double right-fixed top branch missing');
assert(doorBuilder.includes("DOUBLE_BOTH_FIXED_TOP"), 'double both-fixed top branch missing');
assert(appSource.includes('function addDoorHingeParts'), 'door hinge helper missing');
assert(appSource.includes("name:'Door Hinge '"), 'door hinge geometry naming missing');
assert(appSource.includes("name:'Normal Kapı Kolu İç'"), 'mirrored inner normal handle missing');
assert(appSource.includes("const innerLeverCenter=lockU-lockSide*58;"), 'inner normal handle must be rotated 180 degrees around its rosette');
assert(!appSource.includes("const innerLeverCenter=lockU+lockSide*58;"), 'reversed inner handle direction must not remain');
assert(appSource.includes("const innerV=productDepthCenter(zone,55,0)+zone.inward*18;"), 'panic bar / inner handle must live on inner face');
assert(appSource.includes("normalized.doorOpenDirection = normalized.doorOpenDirection === 'INWARD' ? 'INWARD' : 'OUTWARD';"), 'door opening normalization must preserve inward and outward states');
assert(appSource.includes("openDirections: [['OUTWARD', 'Dışa'], ['INWARD', 'İçe']]"), 'door form must expose inward and outward choices');
assert(appSource.includes('const DOOR_TOP_FIXED_TYPES=new Set('), 'door top-fixed type set must exist inside the iframe runtime');
assert(appSource.includes('A ${radius} ${radius} 0 0 ${sweep}'), 'silhouettes must use curved angular swing arrows');
assert(appSource.includes("addDimensionLabelScaled(zone,'Kapı Kanadı '+Math.round(leafHeight)+' mm',dimU,(bottom+leafTop)/2,dimV,0.5,false);"), 'door dimension label scale reduction missing');



// V3.21: color/thickness preferences are remembered across new product types,
// while unsupported 10 mm glass falls back to 8 mm only for guillotine.
assert(!indexSource.includes('defaultGlassColorInput'), 'main-page default glass control must be removed');
const preferenceZone = { ...zone, id:'pref-test', facadeId:'front', label:'Tercih Testi', axis:'x', width:2400, height:2400, bottomY:-1200, topY:1200, inward:1, cx:0, cz:-1900, outerFaceV:-50 };
message({ source:'product-3d-viewer', type:'select-zone', zone:preferenceZone });
el('zoneActionPlaceProductBtn').dispatch('click');
el('productTypeInput').value = 'sliding';
el('productTypeInput').dispatch('change');
el('productGlassThicknessInput').value = '10 MM';
el('productGlassThicknessInput').dispatch('change');
el('productGlassColorInput').value = 'BRONZE';
el('productGlassColorInput').dispatch('change');
el('productTypeInput').value = 'guillotine';
el('productTypeInput').dispatch('change');
assert(el('productGlassThicknessInput').value === '8 MM', 'remembered 10 mm must fall back to 8 mm in A-series guillotine');
assert(el('productGlassColorInput').value === 'BRONZE', 'remembered glass color must carry into guillotine');
el('productTypeInput').value = 'fixed';
el('productTypeInput').dispatch('change');
assert(el('productGlassThicknessInput').value === '10 MM', 'guillotine compatibility fallback must not overwrite remembered 10 mm preference');
assert(el('productGlassColorInput').value === 'BRONZE', 'remembered glass color must carry into fixed joinery');
el('productGlassThicknessInput').value = 'INSULATED GLASS';
el('productGlassThicknessInput').dispatch('change');
el('productGlassColorInput').value = 'FUME';
el('productGlassColorInput').dispatch('change');
el('productTypeInput').value = 'door';
el('productTypeInput').dispatch('change');
assert(el('productGlassThicknessInput').value === 'INSULATED GLASS', 'remembered insulated glass must carry into door');
assert(el('productGlassColorInput').value === 'FUME', 'remembered Fume glass must carry into door');
el('productCancelBtn').dispatch('click');

// V3.21: hotspot controls remain transparent and texture finish uses r128-safe material fields.
assert(styleSource.includes('.dialog-card button.fabric-page-hotspot'), 'Sun-Store hotspot must override generic dialog button styling');
assert(styleSource.includes('background: transparent;'), 'Sun-Store hotspot must remain transparent');
assert(appSource.includes('const ZIP_FABRIC_META=${zipFabricMetaJson};'), 'Sun-Store metadata must be passed into iframe');
assert(appSource.includes('cropCtx.drawImage('), 'selected Sun-Store sample must be cropped into the 3D fabric texture');
assert(!appSource.includes('specularIntensity'), 'r128-incompatible specularIntensity must be removed');
assert(!appSource.includes('sheen:.08'), 'numeric r128-incompatible sheen must be removed');
assert(appSource.includes('bumpMap:finishTextureMap'), 'texture finish bump map missing');
assert(appSource.includes('catch(error){'), 'finish material safety fallback missing');
assert(!appSource.includes('<span>${option.hex}</span>'), 'RAL cards must not display HEX text');

// V3.22: actual Sun-Store swatch textures are bundled and mapped without stretching.
const sunStoreTextureRefs = [...appSource.matchAll(/texture: 'assets\/fabric-pages\/sun-store\/textures\/([^']+\.png)'/g)].map((match) => match[1]);
assert(new Set(sunStoreTextureRefs).size === 23, 'all 23 Sun-Store samples must have pre-cropped texture assets');
for (const filename of new Set(sunStoreTextureRefs)) {
  const texturePath = path.join(root, 'assets', 'fabric-pages', 'sun-store', 'textures', filename);
  assert(fs.existsSync(texturePath), `Sun-Store texture asset missing: ${filename}`);
  assert(fs.statSync(texturePath).size > 1000, `Sun-Store texture asset is unexpectedly small: ${filename}`);
}
assert(appSource.includes('THREE.MirroredRepeatWrapping'), 'Sun-Store textures must use mirrored repeat to reduce visible tile seams');
assert(appSource.includes('texture.repeat.set(Math.max(1,width/tile),Math.max(1,height/tile));'), 'Zip fabric repeat must preserve physical panel aspect ratio');
assert(appSource.includes('createZipFabricMaterial(placement,cfg.w,cfg.h)'), 'Zip fabric material must receive panel dimensions for proportional pattern scale');
assert(appSource.includes('new THREE.MeshBasicMaterial({'), 'Zip fabric must use an unlit material so catalog colors cannot collapse to black');
assert(appSource.includes('textureData: embeddedTextureMap[item.value] ||'), 'embedded Sun-Store texture data must be passed into the iframe');
assert(appSource.includes('if(meta&&meta.textureData)'), 'embedded texture data must be the primary Zip fabric source');
assert(viewerHtml().includes('data:image/jpeg;base64,'), 'generated iframe must contain embedded Zip texture data');
assert(!appSource.includes('material.emissiveMap=texture;'), 'Zip fabric must not reuse the color texture as emissiveMap');
assert(!appSource.includes('catalogTexture.repeat.set(2.2,4.8)'), 'old stretched Zip fabric repeat must be removed');

// V3.24: execute the actual iframe split/fit helpers for a Freedom 4000 × 3000 sample.
const splitStart = html.indexOf('function createSubZone(');
const splitEnd = html.indexOf('function toolboxZoneKey(', splitStart);
assert(splitStart >= 0 && splitEnd > splitStart, 'facade split helper source missing');
const splitContext = {
  Math,
  facadeProfiles: {
    front: [
      { id:'v1', orientation:'vertical', width:100, depth:100, positionRatio:.5 },
      { id:'h1', orientation:'horizontal', width:100, depth:100, positionYRatio:.5, scopeStartRatio:0, scopeEndRatio:.5 }
    ]
  },
  addDividerProfileMesh() {}
};
vm.runInNewContext(html.slice(splitStart, splitEnd) + ';this.result=splitFacadeZones({id:"front",label:"Ön Cephe",axis:"x",cx:0,cz:0,width:3800,height:2780,bottomY:-1500,topY:1280,startBoundaryWidth:100,endBoundaryWidth:100});', splitContext);
const splitZones = splitContext.result;
assert(Array.isArray(splitZones) && splitZones.length === 3, 'vertical + scoped horizontal profiles must create three product areas');
const sortedWidths = splitZones.map((item) => Math.round(item.width)).sort((a,b) => a-b);
const sortedHeights = splitZones.map((item) => Math.round(item.height)).sort((a,b) => a-b);
assert(sortedWidths.join(',') === '1850,1850,1850', 'profile width must be subtracted from both side openings');
assert(sortedHeights.join(',') === '1340,1340,2780', 'horizontal profile must split only its scoped side into exact clear heights');

const fitStart = html.indexOf('function fitProductZone(');
const fitEnd = html.indexOf('function addFrame(', fitStart);
assert(fitStart >= 0 && fitEnd > fitStart, 'product fit helper source missing');
const fitContext = { Math };
vm.runInNewContext(html.slice(fitStart, fitEnd) + ';this.normal=fitProductZone({width:3800,height:2780,bottomY:-1500,topY:1280},5);this.zip=fitZipProductZone({width:3800,height:2780,bottomY:-1500,topY:1280,cx:0,cz:0,axis:"x"},{placementLocation:"BETWEEN POSTS",subtype:"100x100 BOX"});', fitContext);
assert(fitContext.normal.width === 3795 && fitContext.normal.height === 2775, 'normal products must use opening minus 5 mm');
assert(fitContext.zip.width === 3797 && fitContext.zip.height === 2777, 'between-post Zip must use opening minus 3 mm');

// V3.24: facade openings use the real post/beam clear area and cleaned fabric tiles cannot repeat white catalog borders.
assert(appSource.includes('const frontStart=-W/2+p[0].x;'), 'front clear width must start at the inner face of the left post');
assert(appSource.includes('const frontEnd=W/2-p[1].x;'), 'front clear width must end at the inner face of the right post');
assert(appSource.includes('const leftStart=-D/2+p[0].z;'), 'left facade clear width must use real post depth');
assert(appSource.includes('const rightEnd=D/2-p[3].z;'), 'right facade clear width must use real post depth');
assert(!appSource.includes('const bottomY=-H/2+24;'), 'legacy 24 mm facade floor offset must be removed');
assert(!appSource.includes('const topY=beamBottomY-18;'), 'legacy 18 mm beam offset must be removed');
assert(appSource.includes('const width=Math.max(0,endU-startU);'), 'profile-split subzone width must remain canonical');
assert(appSource.includes('const height=Math.max(0,topY-bottomY);'), 'profile-split subzone height must remain canonical');
assert(appSource.includes('addDividerProfileMesh(base,profile'), 'inserted profiles must remain visible in the generated facade');
assert(appSource.includes('texture.repeat.set(Math.max(1,width/tile),Math.max(1,height/tile));'), 'clean Zip texture must keep proportional repeats');

console.log(JSON.stringify({ pass:true, checks:checkCount, htmlBytes:html.length }));
