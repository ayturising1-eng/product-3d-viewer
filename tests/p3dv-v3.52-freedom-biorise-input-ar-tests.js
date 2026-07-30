const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const htmlText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

check(html.includes('p3dv.v3.53'), 'version token missing');
check(/id="projectCodeValue">-<\/strong>/.test(html), 'project code must display dash');

for (const id of [
  'pergoSystemCountInput','freedomWidthInput','freedomDepthInput','freedomHeightInput',
  'projectionCombo','projectionCustomToggleBtn','projectionComboMenu','freedomSystemCardSpacer',
  'parapetInput','parapetHeightInput','panelColorIndependentInput','panelColorTrigger',
  'panelFillInput','motorCombo','motorInput','remoteCombo','remoteInput','ledCombo','ledInput',
  'dimmerInput','extrasInput','waterStandardInput'
]) check(html.includes(`id="${id}"`), `Freedom/Bio input contract missing: ${id}`);

for (const label of [
  'Sistem Adedi','Genişlik','Açılım','Yükseklik','Parapet','Parapet H',
  'Taşıyıcı Rengi','Panel Rengi','Panel Dolgusu','Motor','Kumanda','LED','Dimmer',
  'Ekstralar / Notlar','Su Çıkışı Standart mı?'
]) check(htmlText.includes(label), `input label missing: ${label}`);

for (const id of ['pergoGlassTrackRow','pergoFabricProfilesRow','pergoTriangleJoineryRow']) {
  check(html.includes(`id="${id}"`) && html.includes('pergo-option-row'), `Pergo-only input must remain available: ${id}`);
}
check(css.includes('body.is-freedom-family .pergo-option-row'), 'Pergo-only rows must be hidden only for Freedom/Bio-Rise');

check(/id="pergoSystemCountInput"[^>]*inputmode="numeric"[^>]*pattern="\[0-9\]\*"/.test(html), 'system count numeric input contract missing');
check(/id="freedomWidthInput"[^>]*type="text"/.test(html), 'width must remain manual text input');
check(/id="freedomDepthInput"[^>]*type="text"/.test(html), 'opening must remain manual text input');
check(/id="freedomHeightInput"[^>]*type="text"/.test(html), 'height must remain manual text input');

for (const token of [
  'function sanitizeDigitsOnly(value, maxLength = 2)',
  'function sanitizeSemicolonNumbers(value)',
  'function sanitizeWidthTopology(value)',
  "if (char === 'N' && noState === 0",
  "if (char === 'O' && noState === 1)",
  "event.target.value=sanitizeDigitsOnly(event.target.value,6)",
  'event.target.value=sanitizeWidthTopology(event.target.value)',
  'event.target.value=sanitizeSemicolonNumbers(event.target.value)'
]) check(app.includes(token), `input sanitizer contract missing: ${token}`);

for (const token of [
  "Object.freeze(['Yok', 'Somfy Rts', 'Somfy IO'])",
  "'SOMFY RTS': ['-', 'SITUO 2 RTS', 'SITUO 5 RTS', 'TELIS 16 RTS']",
  "'SOMFY IO': ['-', 'SITUO 2 IO', 'SITUO 5 IO']",
  "Object.freeze(['YES', 'NO'])",
  'function remoteOptionsForMotor()',
  'function renderMotorComboMenu()',
  'function renderRemoteComboMenu()',
  'function renderLedComboMenu()'
]) check(app.includes(token), `motor/remote/LED contract missing: ${token}`);

check(html.includes('<option>EVET</option><option>HAYIR</option></select></label>'), 'Evet/Hayır select contract missing');
check(app.includes('modelState.panelColorIndependent'), 'panel color independence state missing');
check(app.includes('if (!modelState.panelColorIndependent) modelState.panelColor = { ...modelState.systemColor };'), 'unchecked panel color must follow system color');
check(app.includes('applyColorStateLive();'), 'panel color link must update live');

for (const id of ['pergoRayCountRow','pergoPostCountRow']) check(html.includes(`id="${id}"`), `${id} must remain structurally available for Pergo Rise`);
for (const token of [
  'body.is-freedom-family .pergo-only-row',
  'body.is-freedom-family .system-card-spacer',
  '.system-card-spacer'
]) check(css.includes(token), `fixed system-card layout contract missing: ${token}`);

for (const id of ['toolbarZoomInBtn','toolbarZoomOutBtn','toolbarFitBtn','toolbarArBtn']) check(html.includes(`id="${id}"`), `expanded camera toolbar control missing: ${id}`);
for (const removed of ['largePreviewGlassTrackBtn','largePreviewRayBoundaryBtn','largePreviewTriangleJoineryBtn','largePreviewWaterStandardBtn']) check(!html.includes(`id="${removed}"`), `removed toolbox control remains: ${removed}`);
for (const id of ['largePreviewProductStateControl','largePreviewProductStateBtn','largePreviewProductStateMenuBtn','largePreviewProductStateMenu']) check(html.includes(`id="${id}"`), `product state control missing: ${id}`);
for (const token of [
  'function renderLargeProductStateMenu()',
  'function updateLargeProductStateControl()',
  'function toggleProductsOpen()',
  'modelState.productOpenStates[key] = open;',
  'applyProductOpenStateLive();'
]) check(app.includes(token), `product-state behavior missing: ${token}`);

// Nonfunctional controls must be explicitly disabled rather than silently clickable.
for (const id of [
  'largePreviewMultiDimensionBtn','largePreviewEqualizeGapsBtn','largePreviewPostSettingsBtn',
  'largePreviewBulkExtendBtn','largePreviewBulkPostProfileBtn','largePreviewConvertProductBtn',
  'largePreviewDetailCopyBtn','toolbarDxfBtn','toolbarMeasureBtn','toolbarLayersBtn','toolbarViewBtn'
]) {
  const match = html.match(new RegExp(`<button[^>]*id="${id}"[^>]*>`, 'i'));
  check(match && /disabled/.test(match[0]) && /aria-disabled="true"/.test(match[0]), `nonfunctional button must be disabled: ${id}`);
}
for (const text of ['Yönetim','Yardım','Proje Dosyası İndir']) {
  const matches = [...html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/gi)].filter(m => m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim() === text);
  check(matches.length > 0 && matches.every(m => /disabled/.test(m[1])), `nonfunctional text button must be disabled: ${text}`);
}

// AR must use an isolated clone, preserve source hierarchy and source open/closed visibility.
for (const token of [
  'P3DV_AR_FLAT_WORLD_SNAPSHOT','inverseGroupWorld','object.matrixWorld',
  'snapshot.scale.setScalar(AR_METERS_PER_MM);','arRoot.add(snapshot);',
  'group.visible=false;','disposeArSnapshot();','originalPartVisibilityPreserved',
  'restoredPartVisibility','snapshotVisibleMeshCount','flatSnapshot'
]) check(app.includes(token), `AR isolation contract missing: ${token}`);
check(!app.includes('arRoot.add(group)'), 'AR must not reparent the live model');
check(!app.includes('const snapshot=group.clone(true);'), 'AR must not clone nested pivot hierarchy directly');
const arPrepareStart=app.indexOf('function prepareModelForAr()');
const arPrepareEnd=app.indexOf('\nasync function resetArOrientation',arPrepareStart);
const arPrepareBlock=app.slice(arPrepareStart,arPrepareEnd);
check(arPrepareBlock.includes('if(liveRebuildTimer)') && arPrepareBlock.includes('buildModel(true,{atomicSwap:true})'), 'AR must flush a pending live rebuild');
check(!arPrepareBlock.includes('parts.forEach(part=>part.visible=true)'), 'AR preparation must preserve product visibility states');
const arVisibilityStart=app.indexOf('function isVisibleInsideModel(object)');
const arVisibilityEnd=app.indexOf('\nfunction cloneArRenderable',arVisibilityStart);
const arVisibilityBlock=app.slice(arVisibilityStart,arVisibilityEnd);
check(arVisibilityBlock.includes('return current===group;'), 'AR snapshot must ignore only the intentionally hidden live root');
check(!arVisibilityBlock.includes('group.visible!==false'), 'AR snapshot must not become empty when the live root is hidden');
check(html.includes('maxlength="6"'), 'system count allows six numeric characters');

const glbs = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.glb$/i.test(entry.name)) glbs.push(full);
  }
})(root);
check(glbs.length === 0, `raw GLB files must be absent: ${glbs.join(', ')}`);

const protocol = path.join(root, 'P3DV Development Protocol');
for (const doc of ['PROJECT_STATE.md','CHANGELOG.md','DECISIONS.md','TODO.md','REGRESSION_RULES.md','TEST_PROTOCOL.md','AI_HANDOVER.md']) check(fs.existsSync(path.join(protocol,doc)), `protocol document missing: ${doc}`);

console.log(JSON.stringify({
  pass:true,
  checks,
  input:'Freedom/Bio Rise constrained editable combo cells',
  panelColor:'linked/unlinked live state',
  motorRemote:'PLMR-dependent options',
  productState:'global + per-product live control',
  ar:'isolated clone / source state preserved',
  rawGlb:0
}));
