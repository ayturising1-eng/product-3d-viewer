const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checkCount = 0;
function assert(condition, message) { checkCount += 1; if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.16', 'Ürün Giriş Bilgileri', 'Bioclimatic', 'B-Cube', 'Freedom', 'Modul 1',
  'placeholder="Maks. 4050 mm"', 'placeholder="2038–7060 mm"', 'projectionOptions', 'Paneller Açık', 'toolboxPanelMasterInput', 'Sabit Doğrama',
  'Dikey Bölme Sayısı', 'Yatay Bölme Sayısı', 'Yatay Bölme Yükseklikleri (mm)',
  'Dikmenin Önü', 'Kapı (Dış Bakış)', 'productDoorTypeInput', 'productDoorTypeTrigger', 'productDoorTypePicker',
  'productDoorTypeCards', 'productDoorHandleTypeInput', 'productDoorTopFixedHeightInput',
  'Dış Bakış', 'productDoorHeightSummaryWrap', 'Kalan Kapı Kanadı Yüksekliği'
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
  "else if(placement.type==='door')buildDoorProduct(zone,placement);"
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
    Math, Number, String,
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

// Manual maximum projection is preserved; panel suggestion is clamped to 30.
el('freedomDepthInput').value = '7060';
el('freedomDepthInput').dispatch('input');
assert(el('freedomPanelCountInput').value === '30', '7060 mm projection must suggest maximum 30 panels');

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
el('productMotorDirectionInput').value = 'RIGHT';
el('productForm').dispatch('submit');
html = viewerHtml();
placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
zipPlacements = extractJson(html, 'let zipPlacements=', ';\nlet facadeProfiles');
assert(placements.back && placements.back.type === 'guillotine', 'guillotine after zip was not stored');
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
el('productGlassColorInput').value = 'GREY';
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
assert(el('productDoorTopFixedHeightWrap').hidden === false, 'top fixed height field must be visible');
assert(el('productDoorHeightSummaryWrap').hidden === false, 'top fixed height summary must be visible');
el('productDoorTopFixedHeightInput').value = '500';
el('productDoorTopFixedHeightInput').dispatch('input');
assert(el('productDoorFixedHeightValue').textContent === '500 mm', 'fixed-glass height summary must match the input');
assert(el('productDoorMovingHeightValue').textContent === '2008 mm', 'remaining moving-leaf height summary must use the real door geometry');
el('productDoorHingeInput').value = 'RIGHT';
el('productDoorHandleTypeInput').value = 'PANIC';
el('productGlassThicknessInput').value = '8 MM';
el('productGlassColorInput').value = 'TRANSPARENT';
el('productForm').dispatch('submit');
html = viewerHtml();
placements = extractJson(html, 'let placements=', ';\nlet zipPlacements');
assert(placements.left && placements.left.doorType === 'TOP_FIXED', 'top-fixed door placement missing');
assert(placements.left.topFixedHeight === 500, 'top-fixed height not stored');
assert(placements.left.handleType === 'PANIC', 'panic handle not stored');
assert(html.includes("name:'Door Upper Fixed Glass'"), 'upper fixed glass geometry missing');
assert(html.includes("Door Lower Leaf"), 'lower moving leaf geometry missing');
assert(html.includes("name:'Panik Kapı Kolu'"), 'panic handle geometry missing');
assert(appSource.includes('const barWidth=Math.max(120,cfg.width);'), 'panic bar must equal the related leaf width');
assert(!appSource.includes('Math.min(cfg.width-180,520)'), 'legacy 520 mm panic-bar clamp must be removed');
assert(html.includes("'Sabit Cam '+Math.round(fixedHeight)+' mm'"), 'fixed-glass 3D dimension label missing');
assert(html.includes("'Kapı Kanadı '+Math.round(leafHeight)+' mm'"), 'moving-leaf 3D dimension label missing');
assert(html.includes('addDoorTopFixedDimensions(zone,fixedHeight,transomY,innerTop,bottom,leafTop,Math.max(600,leafTop-bottom));'), 'top-fixed two-height dimension call missing');
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
assert(appSource.includes("const innerV=productDepthCenter(zone,55,0)+zone.inward*18;"), 'panic bar / inner handle must live on inner face');
assert(appSource.includes("normalized.doorOpenDirection = normalized.doorOpenDirection === 'INWARD' ? 'INWARD' : 'OUTWARD';"), 'door opening normalization must preserve inward and outward states');
assert(appSource.includes("openDirections: [['OUTWARD', 'Dışa'], ['INWARD', 'İçe']]"), 'door form must expose inward and outward choices');
assert(appSource.includes('const DOOR_TOP_FIXED_TYPES=new Set('), 'door top-fixed type set must exist inside the iframe runtime');
assert(appSource.includes("A '+radius+' '+radius+'"), 'silhouettes must use curved angular swing arrows');
assert(appSource.includes("addDimensionLabelScaled(zone,text,dimU,(y1+y2)/2,dimV,0.5,false);"), 'door dimension label scale reduction missing');

console.log(JSON.stringify({ pass:true, checks:checkCount, htmlBytes:html.length }));
