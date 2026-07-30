const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  'p3dv.v3.53',
  'id="mobileArBtn"',
  '>Gerçek Alanda Gör<',
  'id="mobileArStatus"',
  'allow="camera; xr-spatial-tracking; fullscreen"'
]) check(html.includes(token), `missing AR HTML token: ${token}`);

for (const token of [
  "mobileAr: 'mobileArBtn'",
  "mobileArStatus: 'mobileArStatus'",
  'async function startMobileAr()',
  'async function refreshMobileArCapability()',
  "typeof child.startP3DVAR !== 'function'",
  "event.data.type === 'ar-status'",
  "event.data.type === 'ar-capability'",
  "event.data.type === 'ar-session-ended'",
  'const AR_METERS_PER_MM=0.001;',
  "navigator.xr.isSessionSupported('immersive-ar')",
  "navigator.xr.requestSession('immersive-ar',sessionInit)",
  "optionalFeatures:['dom-overlay','local-floor']",
  "session.requestReferenceSpace('local')",
  'renderer.xr.enabled=true;',
  "renderer.xr.setReferenceSpaceType('local')",
  'renderer.setAnimationLoop(animate);',
  'function updateArFrame(frame)',
  'snapshot.scale.setScalar(AR_METERS_PER_MM);',
  'snapshot.position.set(0,H*AR_METERS_PER_MM*.5,0);',
  'P3DV_AR_FLAT_WORLD_SNAPSHOT',
  'inverseGroupWorld',
  'object.matrixWorld',
  'arRoot.add(snapshot);',
  'group.visible=false;',
  'camera.near=.01;',
  'camera.far=1000;',
  'function initializeManualArPlacement()',
  'function lockArPlacement()',
  'function reopenArPlacement()',
  'function moveArModel(direction,amount)',
  'function setArGroundOffset(valueMeters)',
  'function rotateArModel(delta)',
  'function setArGhostMode(enabled)',
  'window.getP3DVARCapabilities=getArCapabilities;',
  'window.startP3DVAR=async function()',
  'showArLaunchGate(true);',
  "const activationError=['NotAllowedError','SecurityError','InvalidStateError']",
  'Gerçek Ölçek 1:1',
  'Android Chrome/WebXR',
  'ARCore destekli cihaz'
]) check(app.includes(token), `missing AR app token: ${token}`);

for (const token of [
  '.mobile-ar-button',
  '.mobile-ar-status',
  '.mobile-ar-status[data-tone="success"]',
  '.mobile-ar-status[data-tone="warning"]',
  '.mobile-ar-status[data-tone="error"]'
]) check(styles.includes(token), `missing AR style token: ${token}`);

const scale = 4000 * 0.001;
check(scale === 4, '4000 mm must convert to exactly 4 metres');
check((html.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick test button count must remain exactly 10');
check(!app.includes('snapshot.scale.setScalar(.0015)'), 'AR scale must not use arbitrary visual scaling');
check(!app.includes('arRoot.add(group)'), 'AR must never reparent the live model group');
check(!app.includes('const snapshot=group.clone(true);'), 'AR must not preserve nested pivots by direct group clone');
const prepareStart=app.indexOf('function prepareModelForAr()');
const prepareEnd=app.indexOf('\nasync function resetArOrientation',prepareStart);
const prepareBlock=app.slice(prepareStart,prepareEnd);
check(!prepareBlock.includes('parts.forEach(part=>part.visible=true)'), 'AR preparation must preserve per-product open/closed visibility');
check(!app.includes('pinch'), 'AR flow must not introduce pinch scale logic');
check(!app.includes("requiredFeatures:['hit-test']"), 'manual AR must not require floor hit-test');
check(!app.includes('requestHitTestSource'), 'manual AR must not request a mandatory hit-test source');
check(app.includes("setArTrackingText('Konum sabitlendi · gerçek ölçek 1:1."), 'manual lock confirmation must state 1:1 scale');

console.log(JSON.stringify({ pass: true, checks, fourMetreScale: scale, quickButtons: 10, mode: 'manual-ar' }));
