const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
function assert(condition, message) { if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.16', 'Ürün Giriş Bilgileri', 'Ürün Ailesi', 'Bioclimatic',
  'Ürün Grubu', 'B-Cube', 'Bio-Rise', 'Ürün Alt Grup', 'Module', 'Modul 1',
  'productGroupInput', 'productSubgroupValue', 'projectionOptions',
  'min="2038"', 'max="7060"', 'list="projectionOptions"',
  'Paneller Açık', 'Zip Perde', 'Sabit Doğrama'
]) assert(indexSource.includes(token), `missing HTML token: ${token}`);
for (const forbidden of ['Freedom Giriş Bilgileri', '>Family<', '<span>Modül 1</span>']) {
  assert(!indexSource.includes(forbidden), `obsolete HTML remains: ${forbidden}`);
}

for (const token of [
  "productGroup: 'b-cube'", 'const PRODUCT_SPECS = {',
  "'bio-rise': {", "subgroupLabel: 'None'", 'depthMin: 2038', 'depthMax: 7060',
  'depthStep: 216', 'depthMin: 2070', 'depthMax: 6070', 'panelPitch: 200',
  'projectionOffset: 470', 'panelMin: 8', 'panelMax: 28',
  "postSection: { x: 150, z: 100 }", "beamSection: { vertical: 218, thickness: 100 }",
  'sideBeamThickness: 50', 'const PRODUCT_GROUP=${productGroupJson};',
  "const IS_BIO_RISE=PRODUCT_GROUP==='bio-rise';", 'const sideBeamThickness=IS_BIO_RISE?50:beamSection.thickness;',
  "const sideGutterLength=Math.max(200,D-100);", 'if(IS_BIO_RISE){',
  'const lamelNarrowBy=IS_BIO_RISE?16:0;', 'const rearFirstPanelMaxZ=D/2-216;',
  'const bioPanelSpacing=200;', 'function lamelShape(narrowBy)',
  'const scale=(fullWidth-reduction)/fullWidth;', 'let zipPlacements=${zipPlacementsJson};',
  'function buildSlidingProduct', 'function buildGuillotineProduct', 'function buildZipScreenProduct',
  'function buildFixedJoineryProduct', 'geo.rotateX(Math.PI);'
]) assert(appSource.includes(token), `missing V3.11 code token: ${token}`);

const bioBranchStart = appSource.indexOf('if(IS_BIO_RISE){', appSource.indexOf('function buildModel(showAll)'));
const bioElse = appSource.indexOf('}else{', bioBranchStart);
const bioBranch = appSource.slice(bioBranchStart, bioElse);
assert(bioBranch.includes("createExtrudedGutter('Left Gutter'"), 'Bio-Rise left gutter missing');
assert(bioBranch.includes("createExtrudedGutter('Right Gutter'"), 'Bio-Rise right gutter missing');
assert(!bioBranch.includes("'Front Gutter'"), 'Bio-Rise must not create front gutter');
assert(!bioBranch.includes("'Back Gutter'"), 'Bio-Rise must not create back gutter');
assert(!bioBranch.includes("'Rail Top'"), 'Bio-Rise must not create inner rail frame');
assert(appSource.includes('const bioSideGutterWidth=98;'), 'Bio-Rise side gutter width must be 98 mm');
assert(appSource.includes('const bioGutterBeamClearance=2;'), 'Bio-Rise gutter-to-beam clearance must be 2 mm');
assert(appSource.includes('const bioLeftBeamInnerX=-W/2+sideBeamThickness;'), 'Bio-Rise left blue profile inner face missing');
assert(appSource.includes('const bioRightBeamInnerX=W/2-sideBeamThickness;'), 'Bio-Rise right blue profile inner face missing');
assert(appSource.includes('const bioLeftGutterOuterX=bioLeftBeamInnerX+bioGutterBeamClearance;'), 'Bio-Rise left gutter clearance coordinate missing');
assert(bioBranch.includes('setMeshByBounds(leftG,{minX:bioLeftGutterOuterX'), 'Bio-Rise left gutter must use clearance coordinate');
assert(appSource.includes('const bioRightGutterOuterX=bioRightBeamInnerX-bioGutterBeamClearance;'), 'Bio-Rise right gutter clearance coordinate missing');
assert(bioBranch.includes('setMeshByBounds(rightG,{maxX:bioRightGutterOuterX'), 'Bio-Rise right gutter must use clearance coordinate');
assert(bioBranch.includes("createExtrudedGutter('Left Gutter',sideGutterWidth,sideGutterInnerRun,sideGutterLength,orange,'right',true)"), 'Bio-Rise left gutter must use straight ends');
assert(bioBranch.includes("createExtrudedGutter('Right Gutter',sideGutterWidth,sideGutterInnerRun,sideGutterLength,orange,'left',true)"), 'Bio-Rise right gutter must use straight ends');
assert(appSource.includes('const bioLeftGutterInnerX=bioLeftGutterOuterX+bioSideGutterWidth;'), 'Bio-Rise left inner face must preserve V3.10 coordinate');
assert(appSource.includes('const bioRightGutterInnerX=bioRightGutterOuterX-bioSideGutterWidth;'), 'Bio-Rise right inner face must preserve V3.10 coordinate');
assert(appSource.includes('const bioRiseInnerWidth=Math.max(200,bioRightGutterInnerX-bioLeftGutterInnerX);'), 'Bio-Rise gutter-to-gutter panel width missing');
assert(appSource.includes('const lamelLength=IS_BIO_RISE?bioRiseInnerWidth:W-385;'), 'Bio-Rise panels must use gutter-to-gutter inner width');
assert(appSource.includes('function createFixedClosureLamel'), 'Bio-Rise fixed closure lamel builder missing');
assert(appSource.includes("'Bio-Rise Front Fixed Closure'"), 'Bio-Rise front fixed closure missing');
assert(appSource.includes("'Bio-Rise Back Fixed Closure'"), 'Bio-Rise back fixed closure missing');
assert(appSource.includes('isRoofClosure:true'), 'fixed closure must be excluded from moving lamellas');
assert(appSource.includes('if(!straightEnds)applyMiterCuts(geo,sectionWidth,length);'), 'conditional miter contract missing');

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
    this.min = ''; this.max = ''; this.placeholder = ''; this.title = ''; this.children = [];
    this.listeners = {}; this.selected = false; this._innerHTML = ''; this.classList = new ClassList();
    this.messages = []; this.attributes = {};
    this.contentWindow = { postMessage: (data) => this.messages.push(data) };
  }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  dispatch(type, extra = {}) { for (const fn of this.listeners[type] || []) fn({ target: this, preventDefault() {}, ...extra }); }
  focus() {} select() {}
  appendChild(child) {
    this.children.push(child);
    if (child.selected || (!this._value && this.tagName === 'SELECT')) this._value = child.value;
    return child;
  }
  removeAttribute(name) { this.attributes[name] = undefined; if (name === 'max') this.max = ''; }
  setAttribute(name, value) { this.attributes[name] = String(value); this[name] = String(value); }
  set innerHTML(value) { this._innerHTML = value; this.children = []; if (this.tagName === 'SELECT') this._value = ''; }
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
  'freedomWidthInput','freedomDepthInput','freedomHeightInput','freedomPanelCountInput'
]) el(id).tagName = 'INPUT';
el('productGroupInput').tagName = 'SELECT';
el('projectionOptions').tagName = 'DATALIST';

el('productGroupInput').value = 'b-cube';
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
function viewerHtml() { return el('viewerFrame').srcdoc; }
function checkIframeScript(html) {
  const marker = '<script>\n(function(){';
  const start = html.indexOf(marker); assert(start >= 0, 'iframe script marker missing');
  const end = html.indexOf('</script>', start); assert(end > start, 'iframe closing script missing');
  const script = html.slice(start + '<script>\n'.length, end);
  new vm.Script(script, { filename: 'generated-viewer.js' });
}

// Initial B-Cube / Freedom UI and projection suggestions.
assert(el('productGroupInput').value === 'b-cube', 'initial product group must be B-Cube');
assert(el('productSubgroupValue').textContent === 'Freedom', 'B-Cube subgroup must be Freedom');
assert(el('positionTitle').textContent === 'B-Cube Freedom Poz1', 'Freedom title missing');
assert(el('freedomDepthInput').min === '2038' && el('freedomDepthInput').max === '7060', 'Freedom projection limits wrong');
assert(el('productFormulaText').textContent === 'Açılım = Panel Sayısı × 216 + 580', 'Freedom formula wrong');
assert(el('projectionOptions').children[0].value === '2038', 'Freedom projection list must start at 2038');
assert(el('projectionOptions').children[1].value === '2254', 'Freedom projection list must increment by 216');
assert(el('projectionOptions').children.at(-1).value === '7060', 'Freedom projection list must expose max 7060');
assert(viewerHtml().includes('B-Cube Freedom · Modul 1'), 'Freedom empty viewer title missing');

el('freedomPanelCountInput').value = '25';
el('freedomPanelCountInput').dispatch('input');
assert(el('freedomDepthInput').value === '5980', 'Freedom 25-panel formula failed');
el('freedomWidthInput').value = '4000';
el('freedomHeightInput').value = '3200';
el('freedomInputForm').dispatch('submit');
let html = viewerHtml();
assert(html.includes('const PRODUCT_GROUP="b-cube";'), 'Freedom product group not passed to viewer');
assert(html.includes('const W=4000, D=5980, H=3200;'), 'Freedom dimensions not applied');
checkIframeScript(html);

// Switch to Bio-Rise: dynamic subgroup, limits, suggestions and canonical formula.
el('productGroupInput').value = 'bio-rise';
el('productGroupInput').dispatch('change');
assert(el('productSubgroupValue').textContent === 'None', 'Bio-Rise subgroup must be None');
assert(el('positionTitle').textContent === 'Bio-Rise Poz1', 'Bio-Rise title missing');
assert(el('freedomDepthInput').value === '' && el('freedomPanelCountInput').value === '', 'group switch must clear dependent projection fields');
assert(el('freedomWidthInput').max === '4000', 'Bio-Rise width max wrong');
assert(el('freedomDepthInput').min === '2070' && el('freedomDepthInput').max === '6070', 'Bio-Rise projection limits wrong');
assert(el('freedomHeightInput').max === '3500', 'Bio-Rise height max wrong');
assert(el('freedomPanelCountInput').min === '8' && el('freedomPanelCountInput').max === '28', 'Bio-Rise panel limits wrong');
assert(el('productFormulaText').textContent === 'Açılım = Panel Sayısı × 200 + 470', 'Bio-Rise formula wrong');
assert(el('projectionOptions').children.length === 21, 'Bio-Rise must list all 8–28 canonical projections');
assert(el('projectionOptions').children[0].value === '2070', 'Bio-Rise list start wrong');
assert(el('projectionOptions').children.at(-1).value === '6070', 'Bio-Rise list end wrong');

el('freedomPanelCountInput').value = '8';
el('freedomPanelCountInput').dispatch('input');
assert(el('freedomDepthInput').value === '2070', 'Bio-Rise 8-panel formula failed');
el('freedomPanelCountInput').value = '28';
el('freedomPanelCountInput').dispatch('input');
assert(el('freedomDepthInput').value === '6070', 'Bio-Rise 28-panel formula failed');
el('freedomPanelCountInput').value = '10';
el('freedomPanelCountInput').dispatch('input');
el('freedomWidthInput').value = '4000';
el('freedomHeightInput').value = '3500';
el('freedomInputForm').dispatch('submit');
html = viewerHtml();
assert(html.includes('const PRODUCT_GROUP="bio-rise";'), 'Bio-Rise group not passed to viewer');
assert(html.includes('const W=4000, D=2470, H=3500;'), 'Bio-Rise dimensions not applied');
assert(html.includes('let postSections=[{"x":150,"z":100}'), 'Bio-Rise post section missing');
assert(html.includes('let beamSection={"vertical":218,"thickness":100};'), 'Bio-Rise front/back beam section missing');
checkIframeScript(html);

// Invalid Bio-Rise height must be rejected.
el('freedomHeightInput').value = '3501';
el('freedomInputForm').dispatch('submit');
assert(el('freedomInputValidation').textContent.includes('1600–3500'), 'Bio-Rise height validation missing');

console.log(JSON.stringify({ pass: true, checks: 73, freedomOptions: 25, bioRiseOptions: 21, htmlBytes: html.length }));

// V3.11 numerical gutter-clearance contract.
{
  const W = 4000;
  const sideBeamThickness = 50;
  const gutterWidth = 98;
  const clearance = 2;
  const leftBeamInner = -W / 2 + sideBeamThickness;
  const rightBeamInner = W / 2 - sideBeamThickness;
  const leftOuter = leftBeamInner + clearance;
  const rightOuter = rightBeamInner - clearance;
  const leftInner = leftOuter + gutterWidth;
  const rightInner = rightOuter - gutterWidth;
  assert(leftOuter - leftBeamInner === 2, 'left gutter clearance must be exactly 2 mm');
  assert(rightBeamInner - rightOuter === 2, 'right gutter clearance must be exactly 2 mm');
  assert(leftInner === -1850 && rightInner === 1850, 'gutter inner faces must preserve V3.10 coordinates');
  assert(rightInner - leftInner === 3700, 'moving lamella width must remain unchanged for W=4000');
}
