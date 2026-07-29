const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.46', 'id="productFormGrid"',
  'id="productFoldingViewInput"', 'id="productFoldingOpenDirectionInput"',
  '<option value="INSIDE VIEW" selected>İç Bakış</option>', '<option value="OUTSIDE VIEW">Dış Bakış</option>'
]) check(html.includes(token), `missing V3.41 HTML token: ${token}`);

for (const token of [
  "const facadeNames = { front: 'Arka Cephe', back: 'Ön Cephe', left: 'Sol Cephe', right: 'Sağ Cephe' };",
  "{id:'front',label:'Arka Cephe',axis:'x'",
  "{id:'back',label:'Ön Cephe',axis:'x'",
  "const freedomMotorFacade='front';",
  "const freedomMotorFacadeLabel='Arka Cephe';",
  'const freedomBackMotorBoxMinZ=lamelStartZ;',
  'const backStackMinZ=freedomBackMotorBoxMinZ+(lamelCount-1-i)*lamelOpenSpacing;',
  'setObjectByBounds(opened.pivot,{centerX:0,minZ:backStackMinZ,bottomY:lamelBottomY});',
  'motorFacadeLabel:freedomMotorFacadeLabel',
  'function applyProductFieldOrder(type) {',
  "if (type === 'folding') {",
  'grid.insertBefore(viewWrap, panelsWrap.nextSibling);',
  'grid.insertBefore(openWrap, viewWrap.nextSibling);',
  'grid.insertBefore(directionWrap, openWrap.nextSibling);',
  'applyProductFieldOrder(type);'
]) check(app.includes(token), `missing V3.41 app token: ${token}`);

for (const forbidden of [
  "const facadeNames = { front: 'Ön Cephe', back: 'Arka Cephe'",
  "const freedomMotorFacade='back';"
]) check(!app.includes(forbidden), `obsolete facade behavior remains: ${forbidden}`);

check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');
console.log(JSON.stringify({pass:true,checks,freedomOpenStack:'physical-front/minZ = user Arka Cephe',facadeSwap:true,fieldOrder:true}));
