const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(value, message) { checks += 1; if (!value) throw new Error(message); }
for (const token of [
  'class="p3dv-plmr-interface"',
  'class="plmr-studio-header"',
  'class="plmr-project-rail"',
  'class="plmr-designer-layout"',
  'class="plmr-form-grid"',
  'class="plmr-form-card project-card"',
  'class="plmr-form-card system-card"',
  'class="plmr-form-card options-card"',
  'class="plmr-form-card extra-card"',
  'class="plmr-preview-panel"',
  'ÇİZİM ÖN İZLEME',
  'id="productGroupInput"',
  'id="pergoSystemCountInput"',
  'id="freedomWidthInput"',
  'id="freedomDepthInput"',
  'id="freedomHeightInput"',
  'id="pergoFrontHeightInput"',
  'id="pergoRayCountInput"',
  'id="pergoPostCountInput"',
  'id="viewerFrame"',
  'id="toolbarRefreshBtn"',
  'id="previewExpandBtn"',
  'id="toolbarPdfBtn"',
  'id="toolbarDxfBtn"',
  'p3dv.v3.53'
]) check(html.includes(token), `V3.50 PLMR studio HTML token missing: ${token}`);
for (const token of [
  '.p3dv-plmr-interface {',
  '.plmr-studio-header {',
  'grid-template-columns: 132px minmax(0,1fr);',
  '.plmr-designer-layout {',
  'grid-template-columns: 645px minmax(0,1fr);',
  '.plmr-form-column {',
  'grid-template-rows: 311px minmax(0,1fr);',
  '.plmr-preview-panel {',
  '.plmr-preview-head {',
  '.project-rail-exit {',
  'body.p3dv-plmr-interface.preview-expanded'
]) check(css.includes(token), `V3.50 PLMR studio CSS token missing: ${token}`);
for (const token of [
  "productGroup: 'b-cube'",
  "previewExpand: 'previewExpandBtn'",
  "toolbarRefresh: 'toolbarRefreshBtn'",
  "$(ids.toolbarRefresh).addEventListener('click', () => applyFreedomInputs());",
  "document.body.classList.toggle('preview-expanded', next);",
  'function buildEmptyViewerHtml(message)',
  'Önizleme için zorunlu ölçüleri doldurun.'
]) check(app.includes(token), `V3.50 PLMR studio app token missing: ${token}`);
check(html.includes("select.value = 'pergo-rise';"), 'Visible V3.50 shell must activate Pergo Rise after app bindings');
check(html.includes("select.dispatchEvent(new Event('change', { bubbles: true }));"), 'Pergo Rise bootstrap must use the canonical product change flow');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
check(ids.length === new Set(ids).size, 'V3.50 HTML IDs must remain unique');
check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'Functional quick-test ID count must remain 10');
console.log(JSON.stringify({pass:true, checks, interface:'PLMR.V.13.92 studio shell', viewer:'P3DV WebGL preserved'}));
