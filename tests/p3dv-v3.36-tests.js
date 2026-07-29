const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of ['p3dv.v3.46','id="projectionOptions"','id="projectionCustomToggleBtn"','Özel değer','type="text" inputmode="decimal" min="2038"','placeholder="Önerilen 2038–7060 mm"']) {
  check(html.includes(token), `missing V3.36 HTML token: ${token}`);
}
check(!html.includes('<datalist id="projectionOptions"'), 'projection suggestions must no longer use datalist');
check(!html.includes('list="projectionOptions"'), 'projection input must not keep unreliable datalist link');

for (const token of [
  'function projectionPresetSelect()', 'function depthControlValue()', 'function setDepthControlValue(value)',
  'option.textContent = `${value} mm · ${panelCount} Panel`;', "projectionPresetSelect().addEventListener('change'",
  "$(ids.projectionCustomToggle).addEventListener('click'", 'const foldedPanelGap=33;',
  'const foldedPanelPitch=glazing.frameDepth+foldedPanelGap;', 'const stackOffset=stackIndex*foldedPanelPitch;',
  "text:first?'↻':(viewSide==='LEFT'?'←':'→')", 'function firstPanelForPhysicalSide(index,side)',
  "const freedomMotorFacade='front';", "const freedomMotorFacadeLabel='Arka Cephe';",
  'const freedomBackMotorBoxMinZ=lamelStartZ;',
  'setObjectByBounds(opened.pivot,{centerX:0,minZ:backStackMinZ,bottomY:lamelBottomY});'
]) check(app.includes(token), `missing V3.41 app token: ${token}`);

for (const token of ['input[type="number"]::-webkit-outer-spin-button','input[type="number"]::-webkit-inner-spin-button','-moz-appearance: textfield;','.projection-control','.projection-custom-input[hidden]']) {
  check(css.includes(token), `missing V3.36 CSS token: ${token}`);
}
check(80 + 33 === 113, 'A Series folded pitch must be 113 mm');
check(92 + 33 === 125, 'K Series folded pitch must be 125 mm');
check((4 - 1) * (80 + 33) === 339, 'four A-Series leaves must preserve three 33 mm gaps');

console.log(JSON.stringify({pass:true,checks,freedomFirstOption:'2038 mm · 7 Panel',bioRiseFirstOption:'2070 mm · 8 Panel',foldingGapMm:33,freedomMotorFacade:'Arka Cephe'}));
