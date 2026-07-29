const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }
function sourceRange(startToken, endToken) {
  const start = app.indexOf(startToken);
  const end = app.indexOf(endToken, start);
  check(start >= 0, `missing source start: ${startToken}`);
  check(end > start, `missing source end: ${endToken}`);
  return app.slice(start, end);
}

check(html.includes('p3dv.v3.46'), 'V3.44 HTML version token missing');

// 1) Canonical 12 mm glazing contract.
for (const token of [
  "'12 MM': Object.freeze({ glassDepth: 12, frameDepth: 16 })",
  'const GLAZING_SECTION_SPECS=${glazingSectionSpecsJson};',
  "const spec=GLAZING_SECTION_SPECS[thickness]||GLAZING_SECTION_SPECS['8 MM'];"
]) check(app.includes(token), `12 mm glazing contract missing: ${token}`);

const glazingSource = sourceRange('function glazingSectionSpec(placement){', 'function createArrowGeometry(');
const glazingContext = {
  GLAZING_SECTION_SPECS: {
    '8 MM': { glassDepth: 8, frameDepth: 12 },
    '10 MM': { glassDepth: 10, frameDepth: 14 },
    '12 MM': { glassDepth: 12, frameDepth: 16 },
    'INSULATED GLASS': { glassDepth: 20, frameDepth: 24 }
  },
  result: null
};
vm.runInNewContext(`${glazingSource}\nresult=glazingSectionSpec({glassThickness:'12 MM'});`, glazingContext);
check(glazingContext.result.glassDepth === 12, '12 mm glass must render at 12 mm depth');
check(glazingContext.result.frameDepth === 16, '12 mm glass frame/track depth must be 16 mm');

// 2) Safe inline-script JSON serialization.
const serializerSource = sourceRange('  function safeScriptJson(value) {', '  function freedomLouverBlobUrl(');
const serializerContext = { JSON, result: null };
vm.runInNewContext(`${serializerSource}\nresult=safeScriptJson({text:'</script><script>boom</script>&\\u2028'});`, serializerContext);
check(!serializerContext.result.toLowerCase().includes('</script>'), 'safe serializer must not emit a script-closing token');
check(serializerContext.result.includes('\\u003C/script\\u003E'), 'safe serializer must escape angle brackets');
check(serializerContext.result.includes('\\u0026'), 'safe serializer must escape ampersand');
check(app.includes('const placementsJson = safeScriptJson(placements || {});'), 'placements must use safe serializer');
check(app.includes('const zipFabricMetaJson = safeScriptJson(zipFabricMeta);'), 'texture metadata must use safe serializer');

// 3) Canonical post naming after front/back terminology swap.
check(app.includes("return ['Arka Sol Dikme', 'Arka Sağ Dikme', 'Ön Sol Dikme', 'Ön Sağ Dikme'][index]"), 'parent post names must follow canonical facade terminology');
for (const token of ["name:'Arka Sol Dikme'", "name:'Arka Sağ Dikme'", "name:'Ön Sol Dikme'", "name:'Ön Sağ Dikme'"]) {
  check(app.includes(token), `viewer post metadata missing: ${token}`);
}

// 4) Beam state ownership: viewer requests; parent validates and persists.
const editBeamSource = sourceRange('function editBeamSection(){', 'function profileColor(');
check(editBeamSource.includes("postParent('beam-section-change-request'"), 'viewer beam editor must send a parent request');
check(!editBeamSource.includes('beamSection={'), 'viewer must not mutate its own beam section');
check(!editBeamSource.includes('buildModel(true)'), 'viewer beam editor must not locally rebuild stale state');

const beamHelpers = sourceRange('  function normalizeBeamSectionChange(value) {', '  function postName(index) {');
const beamModelState = { beamSection: { vertical: 220, thickness: 100 } };
let beamRenderCount = 0;
let beamPdfCount = 0;
const beamContext = {
  Math, Number, Array, Object,
  modelState: beamModelState,
  viewerCameraState: null,
  window: { alert() {} },
  readModel() {
    return {
      width: 4000, depth: 5980, height: 3000,
      postSections: [{x:100,z:220},{x:100,z:220},{x:100,z:220},{x:100,z:220}],
      beamSection: { ...beamModelState.beamSection }
    };
  },
  dimensionsFit(model) {
    return model.beamSection.vertical < model.height - 200 && model.beamSection.thickness < Math.min(model.width, model.depth) / 2;
  },
  renderViewer() { beamRenderCount += 1; },
  renderPdfRequestForm() { beamPdfCount += 1; },
  valid: null,
  invalid: null
};
vm.createContext(beamContext);
vm.runInContext(`${beamHelpers}\nvalid=applyBeamSectionChangeFromViewer({vertical:240,thickness:120},{position:[1,2,3],target:[0,0,0],zoom:1.2});\ninvalid=normalizeBeamSectionChange({vertical:2900,thickness:120});`, beamContext);
check(beamContext.valid === true, 'valid beam section change must be accepted');
check(beamContext.modelState.beamSection.vertical === 240 && beamContext.modelState.beamSection.thickness === 120, 'parent modelState must own the changed beam section');
check(beamRenderCount === 1 && beamPdfCount === 1, 'beam change must refresh viewer and PDF state once');
check(beamContext.invalid === null, 'invalid beam section must be rejected');
check(Array.isArray(beamContext.viewerCameraState.position), 'beam request must preserve camera state before parent render');

// 5) Viewer-ready queue: no fallback full render while loading.
const liveSource = sourceRange('  function postViewerMessage(type, payload = {}) {', '  const TOOLBOX_SELECTION_CONFIG');
const sent = [];
const frameWindow = { postMessage(message) { sent.push(message); } };
const liveContext = {
  JSON, Boolean, Object,
  ids: { frame: 'viewerFrame' },
  frameWindow,
  activeViewerSessionId: 'session-44',
  viewerLiveProductStateReady: false,
  viewerLivePanelMasterReady: false,
  pendingLiveProductState: false,
  pendingLivePanelMasterState: false,
  liveStateRevision: 0,
  modelState: {
    productsOpen: false,
    productOpenStates: { front: false },
    panelStates: {},
    panelMasterOpen: false
  },
  updateCount: 0,
  updateToolbox() { this.updateCount += 1; },
  $(id) { return id === 'viewerFrame' ? { contentWindow: frameWindow } : null; },
  result: null
};
vm.createContext(liveContext);
vm.runInContext(`${liveSource}\napplyProductOpenStateLive();\napplyPanelMasterOpenLive();\nresult={pendingProduct:pendingLiveProductState,pendingPanel:pendingLivePanelMasterState};`, liveContext);
check(liveContext.result.pendingProduct === true && liveContext.result.pendingPanel === true, 'loading viewer must queue the latest product and panel states');
check(sent.length === 0, 'loading viewer queue must not post early or force a full render');
liveContext.viewerLiveProductStateReady = true;
liveContext.viewerLivePanelMasterReady = true;
vm.runInContext('flushPendingViewerState();', liveContext);
check(sent.length === 2, 'viewer-ready must flush both canonical pending states');
check(sent.every((message) => message.sessionId === 'session-44'), 'queued messages must carry the active viewer session');
check(sent[0].revision < sent[1].revision, 'live state messages must have increasing revisions');

// 6) Source/session protocol guards.
for (const token of [
  'if (!frame || event.source !== frame.contentWindow) return;',
  "if (event.data.sessionId !== activeViewerSessionId) return;",
  'if(event.source!==parent)return;',
  'if(event.data.sessionId!==VIEWER_SESSION_ID)return;'
]) check(app.includes(token), `message protocol guard missing: ${token}`);

// 7) Texture and model lifecycle.
for (const token of [
  'finishTextureMap.userData.p3dvShared=true;',
  "const textureKeys=['map','alphaMap'",
  'material.userData.p3dvDisposed=true;',
  'function materialGenerationActive(material,generation)',
  'generation===modelGeneration',
  'const detachedGroup=!atomicSwap&&group.children.length?new THREE.Group():null;',
  'if(detachedGroup)disposeModelGroup(detachedGroup);'
]) check(app.includes(token), `resource lifecycle token missing: ${token}`);

const disposeSource = sourceRange('function disposeModelGroup(root){', 'function buildModel(showAll,options){');
let geometryDisposed = 0;
let materialDisposed = 0;
let ownedDisposed = 0;
let sharedDisposed = 0;
const ownedTexture = { userData: { p3dvOwned: true }, dispose() { ownedDisposed += 1; } };
const sharedTexture = { userData: { p3dvShared: true }, dispose() { sharedDisposed += 1; } };
const material = { userData: {}, map: ownedTexture, bumpMap: sharedTexture, dispose() { materialDisposed += 1; } };
const mesh = { geometry: { dispose() { geometryDisposed += 1; } }, material };
const disposeContext = { Set, Array, result: null, root: { traverse(fn) { fn(mesh); } } };
vm.runInNewContext(`${disposeSource}\ndisposeModelGroup(root);`, disposeContext);
check(geometryDisposed === 1, 'detached geometry must be disposed exactly once');
check(materialDisposed === 1, 'detached material must be disposed exactly once');
check(ownedDisposed === 1, 'owned texture must be disposed');
check(sharedDisposed === 0, 'shared finish texture must not be disposed by a model group');
check(material.userData.p3dvDisposed === true, 'disposed material must be marked for async callback guards');

const ownedSource = sourceRange('function markOwnedTexture(texture){', 'function createZipFabricMaterial(');
let staleDisposed = 0;
let previousDisposed = 0;
const ownedContext = {
  modelGeneration: 5,
  activeMaterial: { userData: {}, map: { userData: { p3dvOwned: true }, dispose() { previousDisposed += 1; } }, needsUpdate: false },
  staleTexture: { userData: {}, dispose() { staleDisposed += 1; } },
  freshTexture: { userData: {}, dispose() {} },
  staleResult: null,
  freshResult: null
};
vm.runInNewContext(`${ownedSource}\nstaleResult=applyOwnedMaterialTexture(activeMaterial,staleTexture,4);\nfreshResult=applyOwnedMaterialTexture(activeMaterial,freshTexture,5);`, ownedContext);
check(ownedContext.staleResult === false && staleDisposed === 1, 'stale async texture must be rejected and disposed');
check(ownedContext.freshResult === true, 'current-generation texture must be applied');
check(previousDisposed === 1, 'replaced owned fallback texture must be disposed');
check(ownedContext.activeMaterial.map === ownedContext.freshTexture, 'fresh texture must become the material map');

check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');

console.log(JSON.stringify({
  pass: true,
  checks,
  glazing12mm: { glassDepth: 12, frameDepth: 16 },
  safeSerialization: true,
  beamStateOwner: 'parent',
  readyQueue: true,
  sessionGuard: true,
  ownedTextureDispose: true
}));
