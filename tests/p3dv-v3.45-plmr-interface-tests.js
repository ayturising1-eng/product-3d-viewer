const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  '<title>PLMR | 3D Designer</title>',
  'apple-mobile-web-app-title" content="PLMR 3D"',
  'rel="manifest" href="./manifest.webmanifest"',
  'rel="apple-touch-icon" href="./assets/branding/apple-touch-icon.png"',
  'rel="icon" href="./assets/branding/favicon.ico"',
  'class="plmr-brand-logo"',
  'src="./assets/branding/plmr-logo.png"',
  '1. Proje Bilgileri',
  '2. Ürün ve Opsiyonlar',
  '3. Sistem Ölçüleri (mm)',
  '4. Renk ve Malzeme',
  '5. Ek Opsiyonlar',
  '6. <span id="previewProductLabel">B-Cube Freedom</span> Ürün Çizimi (Ön İzleme)',
  'id="previewExpandBtn"',
  'id="previewExpandLabel">Önizlemeyi Büyüt',
  'id="toolbarPdfBtn"',
  'id="toolbarZoomInBtn"',
  'id="toolbarZoomOutBtn"',
  'id="toolbarFitBtn"',
  'id="toolbarFullscreenBtn"',
  'id="toolbarDxfBtn" class="plmr-tool-button" type="button" disabled',
  'id="viewerFrame"',
  'id="toolboxPanelMasterInput"',
  'p3dv.v3.46'
]) check(html.includes(token), `missing V3.45 HTML contract: ${token}`);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, 'HTML IDs must be unique');
check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');

for (const token of [
  '.plmr-brandbar.topbar',
  '.plmr-commandbar',
  '.plmr-input-card',
  'grid-template-columns: minmax(330px, 390px) minmax(0, 1fr);',
  '.viewer-toolbox {\n  display: none !important;',
  'body.preview-expanded .viewer-toolbox',
  'body.preview-expanded .freedom-input-panel {\n  display: none;',
  'body.preview-expanded .viewer-workspace',
  '@media (max-width: 820px)',
  '@media (max-width: 560px)'
]) check(css.includes(token), `missing V3.45 CSS contract: ${token}`);

for (const token of [
  "previewProductLabel: 'previewProductLabel'",
  "previewExpand: 'previewExpandBtn'",
  "toolbarPdf: 'toolbarPdfBtn'",
  'function setPreviewExpanded(expanded)',
  "document.body.classList.toggle('preview-expanded', next);",
  "setText(ids.previewExpandLabel, next ? 'Veri Girişine Dön' : 'Önizlemeyi Büyüt');",
  'function zoomViewerCamera(factor)',
  "postViewerMessage('zoom-camera', { factor: safeFactor });",
  "if(event.data.type==='zoom-camera')",
  "if(event.data.type==='viewport-resized')",
  "$(ids.toolbarPdf).addEventListener('click', () => { exportProductListPdf(); });",
  "$(ids.toolbarAr).addEventListener('click', () => { startMobileAr(); });",
  'function setInitialProjectDate()',
  'setText(ids.previewProductLabel, spec.modelLabel);'
]) check(app.includes(token), `missing V3.45 app contract: ${token}`);

check(manifest.name === 'PLMR | 3D Designer', 'manifest full name mismatch');
check(manifest.short_name === 'PLMR 3D', 'manifest short name mismatch');
check(manifest.display === 'standalone', 'manifest display mode mismatch');
check(Array.isArray(manifest.icons) && manifest.icons.length === 2, 'manifest icon contract mismatch');

for (const file of [
  'assets/branding/plmr-logo.png',
  'assets/branding/favicon.ico',
  'assets/branding/favicon-32.png',
  'assets/branding/apple-touch-icon.png',
  'assets/branding/icon-192.png',
  'assets/branding/icon-512.png'
]) {
  const stat = fs.statSync(path.join(root, file));
  check(stat.isFile() && stat.size > 300, `branding asset missing or empty: ${file}`);
}

console.log(JSON.stringify({
  pass: true,
  checks,
  title: 'PLMR | 3D Designer',
  leftCards: 5,
  toolbarButtons: 15,
  previewToolboxMode: 'expanded-only',
  mobileInstallAssets: true
}));
