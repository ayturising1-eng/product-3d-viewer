const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const htmlText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const pergoViewer = fs.readFileSync(path.join(root, 'products/pergo-rise/pergo-rise-webgl-viewer.js'), 'utf8');
let checks = 0;
function assert(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  'expandedPreviewWorkspace', 'largePreviewToolbox', 'largePreviewToolboxToggleBtn',
  'largePreviewToolboxPinBtn', 'previewUndoBtn', 'previewRedoBtn',
  'toolbarZoomInBtn', 'toolbarZoomOutBtn', 'toolbarFitBtn', 'toolbarArBtn',
  'largePreviewShowAllDimsBtn', 'largePreviewShowMainDimsBtn',
  'largePreviewProductStateControl', 'largePreviewProductStateBtn',
  'largePreviewProductStateMenuBtn', 'largePreviewProductStateMenu',
  'largePreviewMultiProductBtn', 'largePreviewQuickTest1Btn', 'largePreviewQuickTest10Btn',
  'largePreviewMultiDimensionBtn', 'largePreviewEqualizeGapsBtn',
  'largePreviewPostSettingsBtn', 'largePreviewBulkExtendBtn',
  'largePreviewBulkPostProfileBtn', 'largePreviewConvertProductBtn',
  'largePreviewFitProductsBtn', 'largePreviewDetailCopyBtn',
  'largePreviewMultiDeleteBtn', 'largePreviewDeleteAllBtn'
]) assert(html.includes(`id="${token}"`), `large-preview HTML contract missing: ${token}`);

for (const removed of [
  'largePreviewGlassTrackBtn', 'largePreviewRayBoundaryBtn',
  'largePreviewTriangleJoineryBtn', 'largePreviewWaterStandardBtn',
  'largePreviewParapetInput'
]) assert(!html.includes(`id="${removed}"`), `obsolete right-toolbox control remains: ${removed}`);

for (const label of [
  'Önizlemeyi Yenile', 'Önizlemeyi Büyüt', 'Geri Al', 'İleri Al',
  'Yakınlaştır', 'Uzaklaştır', 'Sığdır', 'AR Gerçek Alan',
  'Çizimi Kontrol Et', 'Proje Dosyası İndir', 'PDF İndir', 'DXF İndir',
  'Tüm ölçüleri göster', 'Ana ölçüleri göster', 'Ürün Durumları',
  'Çoklu Ürün Ekleme', 'Çoklu Ölçü Düzenleme', 'Aralıkları Eşitle',
  'Dikme Ayarları', 'Çoklu Profil Uzat', 'Dikme Profilini Toplu Değiştir',
  'Ürün Tipini Değiştir', 'Ürünü Alana Uydur', 'Detay Kopyala',
  'Çoklu Ürün Silme', 'Tüm Ürünleri Sil'
]) assert(htmlText.includes(label), `large-preview label missing: ${label}`);

for (const id of [
  'largePreviewMultiDimensionBtn','largePreviewEqualizeGapsBtn','largePreviewPostSettingsBtn',
  'largePreviewBulkExtendBtn','largePreviewBulkPostProfileBtn','largePreviewConvertProductBtn',
  'largePreviewDetailCopyBtn'
]) {
  const match = html.match(new RegExp(`<button[^>]*id="${id}"[^>]*>`, 'i'));
  assert(match && /disabled/.test(match[0]), `nonfunctional large-preview command must be disabled: ${id}`);
}

for (const token of [
  'body.p3dv-plmr-interface.preview-expanded .plmr-preview-panel',
  'position: fixed;', 'inset: 0;', 'width: 100vw;', 'height: 100vh;',
  'grid-template-rows: 47px minmax(0,1fr);',
  'grid-template-columns: minmax(0,1fr) clamp(300px,18vw,330px);',
  '.preview-toolbar-axis', 'justify-content: space-between;',
  '.preview-actions-left', '.preview-actions-right', '.preview-camera-actions',
  '.large-preview-toolbox-grid', '.large-preview-product-state'
]) assert(css.includes(token), `large-preview CSS contract missing: ${token}`);

assert(app.includes("setText(ids.previewExpandLabel, next ? 'Önizlemeyi Küçült' : 'Önizlemeyi Büyüt');"), 'expanded preview button label contract missing');
assert(app.includes("document.body.classList.toggle('preview-expanded', next);"), 'expanded preview body state missing');
assert(app.includes('function setLargePreviewToolboxOpen(open)'), 'toolbox collapse controller missing');
assert(app.includes('function runDrawingCheck()'), 'drawing check controller missing');
assert(app.includes('function renderLargeProductStateMenu()'), 'per-product state menu controller missing');
assert(app.includes('function updateLargeProductStateControl()'), 'global product-state visual controller missing');
assert(app.includes('function toggleProductsOpen()'), 'global product-state toggle missing');

// V3.51 live color contract: parent posts state, viewer applies it without iframe replacement.
assert(app.includes("postViewerMessage('set-color-state'"), 'parent live color postMessage missing');
assert(app.includes('viewerLiveColorStateReady'), 'live color readiness state missing');
assert(app.includes('pendingLiveColorState'), 'live color ready-queue missing');
for (const fnName of ['function setColorMode(', 'function applyColorFinish(']) {
  const start = app.indexOf(fnName);
  const end = app.indexOf('\n  function ', start + fnName.length);
  const body = app.slice(start, end > start ? end : start + 2400);
  assert(body.includes('applyColorStateLive();'), `${fnName} must use live color state`);
  assert(!body.includes('renderViewer();'), `${fnName} must not rebuild iframe`);
}
assert(app.includes("if(event.data.type==='set-color-state')"), 'generic viewer color message handler missing');
assert(app.includes('rebuildModelWithoutFrameReload(revision)'), 'generic viewer must atomically refresh geometry in the same iframe');
assert(app.includes('let SYSTEM_COLOR='), 'generic viewer system palette must be mutable');
assert(app.includes('let PANEL_COLOR='), 'generic viewer panel palette must be mutable');
assert(app.includes('let DEFAULT_COLOR_MODE='), 'generic viewer color mode must be mutable');

assert(pergoViewer.includes('function updateColors(systemColor, panelColor)'), 'Pergo live material update method missing');
assert(pergoViewer.includes("data.type === 'set-color-state'"), 'Pergo color message handler missing');
assert(pergoViewer.includes('updateColors(systemColor, panelColor);'), 'Pergo message must call live material update');
const updateStart = pergoViewer.indexOf('function updateColors(systemColor, panelColor)');
const updateEnd = pergoViewer.indexOf('\n    function ', updateStart + 20);
const updateBody = pergoViewer.slice(updateStart, updateEnd > updateStart ? updateEnd : updateStart + 3000);
assert(updateBody.includes('requestRender();'), 'Pergo live color update must request render');
assert(!updateBody.includes('deriveProject'), 'Pergo live color must not re-derive project geometry');
assert(!updateBody.includes('window.location'), 'Pergo live color must not reload viewer');

// Isolated AR snapshot: never reparent/scale the live scene group.
for (const token of [
  'P3DV_AR_FLAT_WORLD_SNAPSHOT', 'inverseGroupWorld', 'object.matrixWorld',
  'snapshot.scale.setScalar(AR_METERS_PER_MM);',
  'arRoot.add(snapshot);', 'disposeArSnapshot();', 'group.visible=false;',
  'originalPartVisibilityPreserved', 'restoredPartVisibility'
]) assert(app.includes(token), `AR snapshot contract missing: ${token}`);
assert(!app.includes('arRoot.add(group)'), 'live model group must never be reparented into AR root');
assert(!app.includes('const snapshot=group.clone(true);'), 'AR snapshot must flatten world transforms instead of cloning nested pivots');
const arPrepareStart=app.indexOf('function prepareModelForAr()');
const arPrepareEnd=app.indexOf('\nasync function resetArOrientation',arPrepareStart);
const arPrepareBlock=app.slice(arPrepareStart,arPrepareEnd);
assert(!arPrepareBlock.includes('parts.forEach(part=>part.visible=true)'), 'AR preparation must not overwrite product visibility state');

for (const raw of ['assets/models/pergo-rise.glb', 'assets/models/freedom-louver.glb']) {
  assert(!fs.existsSync(path.join(root, raw)), `raw GLB must be omitted: ${raw}`);
}
for (const embedded of [
  'assets/pergo-rise/component-templates-data.js',
  'assets/pergo-rise/component-templates.bin',
  'assets/pergo-rise/component-templates.json',
  'assets/models/freedom-louver-data.js'
]) assert(fs.existsSync(path.join(root, embedded)), `embedded component source missing: ${embedded}`);

const protocol = path.join(root, 'P3DV Development Protocol');
for (const doc of [
  '00_START_HERE.md', 'PROJECT_STATE.md', 'CHANGELOG.md', 'DECISIONS.md', 'TODO.md',
  'KNOWN_ISSUES.md', 'REGRESSION_RULES.md', 'TEST_PROTOCOL.md', 'TEST_RESULTS.md',
  'RELEASE_PROTOCOL.md', 'AI_HANDOVER.md', 'REMOVED_FILES.md'
]) assert(fs.existsSync(path.join(protocol, doc)), `development protocol document missing: ${doc}`);

console.log(JSON.stringify({
  pass: true,
  checks,
  expandedPreview: 'viewport-fixed + aligned top toolbar + right toolbox',
  liveColors: 'postMessage / same iframe',
  ar: 'isolated snapshot / source-state preserved',
  rawGlbInPackage: false,
  protocol: 'P3DV Development Protocol'
}));
