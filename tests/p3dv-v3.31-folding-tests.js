const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const pdf = fs.readFileSync(path.join(root, 'p3dv-pdf.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.53', '<option value="folding">Katlanır Cam</option>',
  'productFoldingViewWrap', 'productFoldingViewInput',
  'productFoldingOpenDirectionWrap', 'productFoldingOpenDirectionInput',
  'İç Bakış', 'Dış Bakış', 'İçeri', 'Dışarı',
  'foldingCollectionSection', 'foldingCollectionStateInput', 'foldingRuleNote',
  'id="productFormGrid"'
]) check(html.includes(token), `missing folding HTML token: ${token}`);

for (const token of [
  'folding: {', "['STANDARD', 'Standard']", "['TOP-HUNG', 'Top-Hung']",
  "['BOTH', 'İki Yana']", "['INSIDE VIEW', 'İç Bakış']", "['OUTSIDE VIEW', 'Dış Bakış']",
  "['INWARD', 'İçeri']", "['OUTWARD', 'Dışarı']", "['12 MM', '12 mm']",
  'function foldingPanelCountForWidth(width)', 'function foldingDirectionForPanels(panels, requestedDirection)',
  'function foldingOpenDirectionValue(value)', 'function foldingAdvisory(zone, draft)',
  'normalized.thresholdProfile = 70', 'normalized.openingDirection = foldingDirectionForPanels',
  'normalized.foldingOpenDirection = foldingOpenDirectionValue(normalized.foldingOpenDirection);',
  'draft.foldingOpenDirection = foldingOpenDirectionValue(draft.foldingOpenDirection);',
  'function buildFoldingProduct(zone,placement)', 'Folding Bottom Threshold 70 mm', 'Math.PI/2',
  'const foldedPanelGap=33;', 'const foldedPanelPitch=glazing.frameDepth+foldedPanelGap;',
  "const foldingView=String(placement.foldingView||'INSIDE VIEW')==='OUTSIDE VIEW'?'OUTSIDE VIEW':'INSIDE VIEW';",
  "const foldingOpenDirection=String(placement.foldingOpenDirection||'INWARD')==='OUTWARD'?'OUTWARD':'INWARD';",
  'function foldingPositiveUAppearsRight(zone,foldingView)',
  'function foldingMirrorSideByView(side,zone,foldingView)',
  'function foldingPhysicalSideFromView(side,zone,foldingView)',
  'function foldingFoldV(zone,foldingOpenDirection)',
  'function foldingTowardViewer(foldingView,foldingOpenDirection)',
  'function foldingFirstTurnDirection(physicalSide,zone,foldingView,foldingOpenDirection)',
  "text:first?'↻':(viewSide==='LEFT'?'←':'→')",
  'turnDirection:first?foldingFirstTurnDirection(physicalSide,zone,foldingView,foldingOpenDirection):null',
  "return 'Katlanır Cam'", 'Katlanma Yönü', 'Bakış Yönü', 'Açılma Yönü',
  "Alt Profil', value: '70 mm · Eşikli'"
]) check(app.includes(token), `missing folding app token: ${token}`);

const helperStart = app.indexOf('  function foldingPanelCountForWidth(width) {');
const helperEnd = app.indexOf('  function foldingAdvisory(zone, draft) {');
check(helperStart >= 0 && helperEnd > helperStart, 'folding helper source range missing');
const helperSource = app.slice(helperStart, helperEnd);
const context = { Math, Number, result: null };
vm.runInNewContext(`${helperSource}\nresult={p600:foldingPanelCountForWidth(600),p601:foldingPanelCountForWidth(601),p4800:foldingPanelCountForWidth(4800),p5000:foldingPanelCountForWidth(5000),left8:foldingDirectionForPanels(8,'LEFT'),right8:foldingDirectionForPanels(8,'RIGHT'),both9:foldingDirectionForPanels(9,'RIGHT'),out:foldingOpenDirectionValue('OUTWARD'),inside:foldingOpenDirectionValue('INVALID')};`, context);
check(context.result.p600 === 2, '600 mm must keep physical minimum 2 panels');
check(context.result.p601 === 2, '601 mm must calculate 2 panels');
check(context.result.p4800 === 8, '4800 mm must calculate 8 panels');
check(context.result.p5000 === 9, '5000 mm must calculate 9 panels');
check(context.result.left8 === 'LEFT', '8 panels must permit left stacking');
check(context.result.right8 === 'RIGHT', '8 panels must permit right stacking');
check(context.result.both9 === 'BOTH', '9 panels must auto-switch to both sides');
check(context.result.out === 'OUTWARD', 'OUTWARD must survive normalization');
check(context.result.inside === 'INWARD', 'invalid open direction must fall back to INWARD');

const applyStart = app.indexOf('  function applyProductForm() {');
const foldingBranchStart = app.indexOf("} else if (draft.type === 'folding') {", applyStart);
const foldingBranchEnd = app.indexOf("} else if (draft.type === 'sliding') {", foldingBranchStart);
check(foldingBranchStart >= 0 && foldingBranchEnd > foldingBranchStart, 'folding apply branch missing');
const foldingBranch = app.slice(foldingBranchStart, foldingBranchEnd);
check(!foldingBranch.includes('delete draft.foldingOpenDirection'), 'folding apply branch must not delete selected open direction');

check(!html.includes('productFoldingPassage'), 'folding passage-door control must be removed');
check(!app.includes('PRODUCT_OPTIONS.folding.passageDoors'), 'folding passage-door options must be removed');
check(pdf.includes(".replace(/·/g, ' - ')"), 'PDF safe text must replace middle-dot separators');
check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');
check(!html.includes('pdf-request-panel'), 'extra PDF request form must stay removed');

console.log(JSON.stringify({ pass: true, checks, autoPanels5000: context.result.p5000, outwardPreserved: context.result.out }));
