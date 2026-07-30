const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

check(html.includes('p3dv.v3.53'), 'V3.43 HTML version token missing');

for (const token of [
  'let viewerLivePanelMasterReady = false;',
  'function postLivePanelMasterOpen()',
  "postViewerMessage('set-panel-master-open'",
  'open: Boolean(modelState.panelMasterOpen)',
  'function applyPanelMasterOpenLive()',
  'if (!postLivePanelMasterOpen()) pendingLivePanelMasterState = true;',
  'viewerLivePanelMasterReady = Boolean(event.data.livePanelMaster);',
  'flushPendingViewerState();',
  'let panelMasterOpen=${panelMasterOpenJson};',
  'let lamellaOpenMode=panelMasterOpen;',
  "if(event.data.type==='set-panel-master-open')",
  'panelMasterOpen=Boolean(event.data.open);',
  'lamellaOpenMode=panelMasterOpen;',
  'rebuildModelWithoutFrameReload(revision);',
  "postParent('panel-master-open-applied',{open:panelMasterOpen,revision});",
  "postParent('viewer-ready',{",
  "liveProductState:true,",
  "livePanelMaster:true,"
]) check(app.includes(token), `V3.43 live-panel token missing: ${token}`);

const handlerStart = app.indexOf("$(ids.panelMaster).addEventListener('change'");
const handlerEnd = app.indexOf('\n    });', handlerStart) + 8;
const handlerBlock = app.slice(handlerStart, handlerEnd);
check(handlerStart >= 0, 'panel master change handler missing');
check(handlerBlock.includes('modelState.panelMasterOpen = Boolean(event.target.checked);'), 'panel handler must persist the checkbox state');
check(handlerBlock.includes('applyPanelMasterOpenLive();'), 'panel handler must use live panel sync');
check(!handlerBlock.includes('renderViewer();'), 'panel handler must not reload the iframe');
check(!handlerBlock.includes('updateToolbox();'), 'panel handler must delegate toolbox refresh to the live helper');

const liveStart = app.indexOf('  function postLivePanelMasterOpen()');
const liveEnd = app.indexOf('\n  const TOOLBOX_SELECTION_CONFIG', liveStart);
const liveBlock = app.slice(liveStart, liveEnd);
check(liveBlock.includes('viewerLivePanelMasterReady'), 'live panel sender must require viewer capability');
check(liveBlock.includes("postViewerMessage('set-panel-master-open'"), 'live panel sender must post the dedicated message');
check(liveBlock.includes('applyPanelMasterOpenLive'), 'live panel apply helper missing');
check(liveBlock.includes('updateToolbox();'), 'live panel helper must refresh the checkbox/toolbox');

const viewerHandlerStart = app.indexOf("if(event.data.type==='set-panel-master-open')");
const viewerHandlerEnd = app.indexOf('\n  }', viewerHandlerStart) + 4;
const viewerHandler = app.slice(viewerHandlerStart, viewerHandlerEnd);
check(viewerHandler.includes('panelMasterOpen=Boolean(event.data.open);'), 'viewer must update mutable panel state');
check(viewerHandler.includes('lamellaOpenMode=panelMasterOpen;'), 'viewer must update lamella mode');
check(viewerHandler.includes('rebuildModelWithoutFrameReload(revision);'), 'viewer must use atomic no-reload rebuild');
check(!viewerHandler.includes('location.reload'), 'viewer must not reload itself');
check(!viewerHandler.includes('srcdoc'), 'viewer panel handler must not touch iframe srcdoc');

const buildStart = app.indexOf('function buildModel(showAll,options)');
const buildEnd = app.indexOf('function rebuildModelWithoutFrameReload(revision)', buildStart);
const buildBlock = app.slice(buildStart, buildEnd);
check(buildBlock.includes('const atomicSwap=Boolean(options&&options.atomicSwap);'), 'panel rebuild must use existing atomic group swap');
check(buildBlock.includes('previousParent.add(group);'), 'new model group must be attached before old group removal');
check(buildBlock.includes('if(previousGroup.parent)previousGroup.parent.remove(previousGroup);'), 'old model group must be removed after swap');
check(buildBlock.includes('group.position.copy(previousPosition);'), 'group position must be preserved');
check(buildBlock.includes('group.rotation.copy(previousRotation);'), 'group rotation must be preserved');
check(buildBlock.includes('group.scale.copy(previousScale);'), 'group scale must be preserved');

check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test count must remain exactly 10');

console.log(JSON.stringify({
  pass: true,
  checks,
  iframeReloadOnPanelToggle: false,
  cameraPreserved: true,
  panelStateLiveMessage: true,
  atomicGroupSwap: true
}));
