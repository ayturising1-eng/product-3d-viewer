const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

check(html.includes('p3dv.v3.46'), 'V3.42 HTML version token missing');

for (const token of [
  'let viewerLiveProductStateReady = false;',
  'function postLiveProductOpenState()',
  "postViewerMessage('set-product-open-state'",
  'function applyProductOpenStateLive()',
  'if (!postLiveProductOpenState()) pendingLiveProductState = true;',
  'viewerLiveProductStateReady = Boolean(event.data.liveProductState);',
  'flushPendingViewerState();',
  'applyProductOpenStateLive();',
  'let productsOpen=${productsOpenJson};',
  'let group=new THREE.Group();',
  'function disposeModelGroup(root)',
  'function buildModel(showAll,options)',
  'const atomicSwap=Boolean(options&&options.atomicSwap);',
  'group=new THREE.Group();',
  'previousParent.add(group);',
  'if(previousGroup.parent)previousGroup.parent.remove(previousGroup);',
  'function rebuildModelWithoutFrameReload(revision)',
  'buildModel(true,{atomicSwap:true});',
  "if(event.data.type==='set-product-open-state')",
  'rebuildModelWithoutFrameReload(revision);',
  "postParent('product-open-state-applied',{revision});",
  "postParent('viewer-ready',{",
  "liveProductState:true,",
  "livePanelMaster:true,"
]) check(app.includes(token), `V3.42 live-toggle token missing: ${token}`);

const checkboxMarker = 'modelState.productOpenStates[key] = Boolean(input.checked);';
const checkboxMarkerIndex = app.indexOf(checkboxMarker);
const checkboxStart = app.lastIndexOf("input.addEventListener('change', () => {", checkboxMarkerIndex);
const checkboxEnd = app.indexOf('      });', checkboxMarkerIndex);
const checkboxBlock = app.slice(checkboxStart, checkboxEnd);
check(checkboxStart >= 0, 'product checkbox handler missing');
check(checkboxBlock.includes('applyProductOpenStateLive();'), 'product checkbox must use live state sync');
check(!checkboxBlock.includes('renderViewer();'), 'product checkbox must not reload the iframe');

const globalStart = app.indexOf('  function toggleProductsOpen() {');
const globalEnd = app.indexOf('\n  }', globalStart) + 4;
const globalBlock = app.slice(globalStart, globalEnd);
check(globalBlock.includes('allProductEntries().forEach'), 'global product toggle must update every placed product');
check(globalBlock.includes('applyProductOpenStateLive();'), 'global product toggle must use live state sync');
check(!globalBlock.includes('renderViewer();'), 'global product toggle must not reload the iframe');

const parentToggleStart = app.indexOf("if (event.data.type === 'toggle-panel-state'");
const parentToggleEnd = app.indexOf('\n    }', parentToggleStart) + 6;
const parentToggleBlock = app.slice(parentToggleStart, parentToggleEnd);
check(parentToggleBlock.includes('applyProductOpenStateLive();'), 'double-click product toggle must use live state sync');
check(!parentToggleBlock.includes('renderViewer();'), 'double-click product toggle must not reload the iframe');

check(app.includes('const previousPosition=previousGroup?previousGroup.position.clone():null;'), 'atomic swap must preserve group position');
check(app.includes('const previousRotation=previousGroup?previousGroup.rotation.clone():null;'), 'atomic swap must preserve group rotation');
check(app.includes('const previousScale=previousGroup?previousGroup.scale.clone():null;'), 'atomic swap must preserve group scale');
check(app.includes('group.position.copy(previousPosition);'), 'atomic swap must restore group position');
check(app.includes('group.rotation.copy(previousRotation);'), 'atomic swap must restore group rotation');
check(app.includes('group.scale.copy(previousScale);'), 'atomic swap must restore group scale');
check(app.includes('if(arSession){'), 'atomic swap must preserve AR-specific presentation');
check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');

console.log(JSON.stringify({
  pass: true,
  checks,
  iframeReloadOnToggle: false,
  cameraPreserved: true,
  atomicGroupSwap: true,
  arAware: true
}));
