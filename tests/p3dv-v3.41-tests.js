const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

const helperStart = app.indexOf('function foldingPositiveUAppearsRight(zone,foldingView){');
const helperEnd = app.indexOf('function doorTurnDirection(hingeDirection,doorOpenDirection){');
check(helperStart >= 0 && helperEnd > helperStart, 'zone-aware folding helper range missing');
const source = app.slice(helperStart, helperEnd);
const ctx = { result: null };
vm.runInNewContext(`${source}\nresult={positive:foldingPositiveUAppearsRight,physical:foldingPhysicalSideFromView,viewSide:foldingViewSideFromPhysical,foldV:foldingFoldV,arrow:foldingFirstTurnDirection};`, ctx);

const zones = {
  rear:  { id:'front', label:'Arka Cephe', axis:'x', inward: 1 },
  front: { id:'back',  label:'Ön Cephe',  axis:'x', inward:-1 },
  left:  { id:'left',  label:'Sol Cephe',  axis:'z', inward: 1 },
  right: { id:'right', label:'Sağ Cephe',  axis:'z', inward:-1 }
};
const expected = {
  rear:  { 'OUTSIDE VIEW': {LEFT:'RIGHT',RIGHT:'LEFT'}, 'INSIDE VIEW': {LEFT:'LEFT',RIGHT:'RIGHT'} },
  front: { 'OUTSIDE VIEW': {LEFT:'LEFT',RIGHT:'RIGHT'}, 'INSIDE VIEW': {LEFT:'RIGHT',RIGHT:'LEFT'} },
  left:  { 'OUTSIDE VIEW': {LEFT:'LEFT',RIGHT:'RIGHT'}, 'INSIDE VIEW': {LEFT:'RIGHT',RIGHT:'LEFT'} },
  right: { 'OUTSIDE VIEW': {LEFT:'RIGHT',RIGHT:'LEFT'}, 'INSIDE VIEW': {LEFT:'LEFT',RIGHT:'RIGHT'} }
};
for (const [zoneName, zone] of Object.entries(zones)) {
  for (const view of ['OUTSIDE VIEW','INSIDE VIEW']) {
    for (const side of ['LEFT','RIGHT']) {
      const actual = ctx.result.physical(side, zone, view);
      check(actual === expected[zoneName][view][side], `${zoneName}/${view}/${side} physical side mismatch: ${actual}`);
      check(ctx.result.viewSide(actual, zone, view) === side, `${zoneName}/${view}/${side} reverse mapping mismatch`);
    }
    check(ctx.result.physical('BOTH', zone, view) === 'BOTH', `${zoneName}/${view}/BOTH must remain BOTH`);
  }
}

// User-facing 12 combinations on displayed Arka Cephe: 2 views x 2 open directions x 3 collection directions.
const rear = zones.rear;
let matrixCount = 0;
for (const view of ['INSIDE VIEW','OUTSIDE VIEW']) {
  for (const open of ['INWARD','OUTWARD']) {
    for (const collect of ['LEFT','RIGHT','BOTH']) {
      const physical = ctx.result.physical(collect, rear, view);
      check(['LEFT','RIGHT','BOTH'].includes(physical), `${view}/${open}/${collect} invalid physical side`);
      const foldV = ctx.result.foldV(rear, open);
      check(foldV === (open === 'INWARD' ? rear.inward : -rear.inward), `${view}/${open}/${collect} fold depth must be system-relative`);
      if (physical !== 'BOTH') {
        const arrow = ctx.result.arrow(physical, rear, view, open);
        check(['LEFT','RIGHT'].includes(arrow), `${view}/${open}/${collect} invalid first arrow`);
      }
      matrixCount += 1;
    }
  }
}
check(matrixCount === 12, '12 folding combinations were not covered');

const openHelperStart = app.indexOf('  function foldingOpenDirectionValue(value) {');
const openHelperEnd = app.indexOf('  function foldingAdvisory(zone, draft) {');
check(openHelperStart >= 0 && openHelperEnd > openHelperStart, 'open-direction helper range missing');
const openCtx = { result:null };
vm.runInNewContext(`${app.slice(openHelperStart, openHelperEnd)}\nresult={out:foldingOpenDirectionValue('OUTWARD'),inside:foldingOpenDirectionValue('INWARD'),bad:foldingOpenDirectionValue('')};`, openCtx);
check(openCtx.result.out === 'OUTWARD', 'OUTWARD selection must remain OUTWARD');
check(openCtx.result.inside === 'INWARD', 'INWARD selection must remain INWARD');
check(openCtx.result.bad === 'INWARD', 'invalid open direction must fall back to INWARD');

const applyStart = app.indexOf('  function applyProductForm() {');
const foldingBranchStart = app.indexOf("} else if (draft.type === 'folding') {", applyStart);
const foldingBranchEnd = app.indexOf("} else if (draft.type === 'sliding') {", foldingBranchStart);
const foldingBranch = app.slice(foldingBranchStart, foldingBranchEnd);
check(!foldingBranch.includes('delete draft.foldingOpenDirection'), 'applyProductForm must preserve selected folding open direction');
check(foldingBranch.includes('draft.foldingOpenDirection = foldingOpenDirectionValue(draft.foldingOpenDirection);'), 'applyProductForm must normalize preserved open direction');

check(html.includes('id="productFormGrid"'), 'product grid id missing');
check(app.includes('applyProductFieldOrder(type);'), 'field order must run when product form rules load');
check(app.includes('grid.insertBefore(viewWrap, panelsWrap.nextSibling);'), 'Bakış Yönü must move after panel count');
check(app.includes('grid.insertBefore(openWrap, viewWrap.nextSibling);'), 'Açılma Yönü must follow Bakış Yönü');
check(app.includes('grid.insertBefore(directionWrap, openWrap.nextSibling);'), 'Katlanma Yönü must follow Açılma Yönü');

console.log(JSON.stringify({pass:true,checks,matrixCount,facades:Object.keys(zones),outwardPreserved:true}));
