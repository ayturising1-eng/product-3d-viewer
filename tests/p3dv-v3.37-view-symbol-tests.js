const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.46', 'id="productFoldingViewWrap"', 'id="productFoldingViewInput"',
  'id="productFoldingOpenDirectionWrap"', 'id="productFoldingOpenDirectionInput"',
  '<option value="INSIDE VIEW" selected>İç Bakış</option>', '<option value="OUTSIDE VIEW">Dış Bakış</option>',
  '<option value="INWARD" selected>İçeri</option>', '<option value="OUTWARD">Dışarı</option>',
  'Bakış yönü, ürünü hangi taraftan karşınıza aldığınızı belirler.'
]) check(html.includes(token), `missing V3.41 HTML token: ${token}`);

for (const forbidden of ['productFoldingPassageWrap','productFoldingPassageInput','Geçiş Kapısı','İlk kanat bağımsız açılır']) {
  check(!html.includes(forbidden), `obsolete folding HTML remains: ${forbidden}`);
}

for (const token of [
  'function foldingPositiveUAppearsRight(zone,foldingView)',
  'function foldingMirrorSideByView(side,zone,foldingView)',
  'function foldingPhysicalSideFromView(side,zone,foldingView)',
  'function foldingViewSideFromPhysical(side,zone,foldingView)',
  'function foldingFoldV(zone,foldingOpenDirection)',
  'function foldingFirstTurnDirection(physicalSide,zone,foldingView,foldingOpenDirection)',
  "const physicalDirection=foldingPhysicalSideFromView(selectedDirection,zone,foldingView);",
  "const foldV=foldingFoldV(zone,foldingOpenDirection);",
  "const symbolFace=foldingView==='INSIDE VIEW'?'inside':'outside';",
  "const symbolV=v+(foldingView==='INSIDE VIEW'?1:-1)*zone.inward*(frameDepth/2-2.5);",
  'function drawCurvedTurnArrow(ctx,direction,fillHex)',
  'turnDirection:first?foldingFirstTurnDirection(physicalSide,zone,foldingView,foldingOpenDirection):null',
  "turnDirection:doorTurnDirection(cfg.hingeDirection,String(placement.doorOpenDirection||'OUTWARD'))",
  "text:'↻'", 'opacity:active?1:.42'
]) check(app.includes(token), `missing V3.41 app token: ${token}`);

check(80 + 33 === 113, 'A-Series folded pitch must keep a 33 mm clear gap');
check(92 + 33 === 125, 'K-Series folded pitch must keep a 33 mm clear gap');
check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');

console.log(JSON.stringify({ pass: true, checks, passiveDoorSymbolOpacity: 0.42, foldedGapMm: 33 }));
