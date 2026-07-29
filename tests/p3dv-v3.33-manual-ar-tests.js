const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

for (const token of [
  'Manuel Gerçek Alan Yerleşimi',
  'id="arLockBtn"',
  'id="arRepositionBtn"',
  'id="arMoveForwardBtn"',
  'id="arMoveBackBtn"',
  'id="arMoveLeftBtn"',
  'id="arMoveRightBtn"',
  'id="arMoveDownBtn"',
  'id="arMoveUpBtn"',
  'id="arGroundOffsetInput"',
  'id="arGroundZeroBtn"',
  'id="arRotateFineLeftBtn"',
  'id="arRotateFineRightBtn"',
  'id="arLandscapeBtn"',
  'Konumu Sabitle',
  'Yeniden Konumlandır',
  'Yatay Kamera',
  'Zemin Kotu · 1 cm hassasiyet'
]) check(app.includes(token), `missing manual AR UI token: ${token}`);

for (const token of [
  'const AR_MOVE_STEP=.10;',
  'const AR_HEIGHT_STEP=.01;',
  'const AR_DEFAULT_EYE_HEIGHT=1.45;',
  'arManualPosition.copy(axes.position).addScaledVector(axes.forward,distance);',
  'arBaseGroundY=axes.position.y-AR_DEFAULT_EYE_HEIGHT;',
  'setArGhostMode(true);',
  'setArGhostMode(false);',
  "if(direction==='forward')arManualPosition.addScaledVector(axes.forward,amount);",
  "if(direction==='right')arManualPosition.addScaledVector(axes.right,amount);",
  'setArGroundOffset(Number(event.target.value)/100)',
  'rotateArModel(-Math.PI/180)',
  'rotateArModel(Math.PI/180)',
  'screen.orientation.lock',
  "screen.orientation.lock('landscape')",
  'document.documentElement.requestFullscreen()',
  "document.body.classList.add('ar-landscape')",
  "button.textContent='Dikey Kamera'",
  'await resetArOrientation();',
  'Ürün 1:1 ölçekte hemen çizilir; konumu ve zemin kotunu elle ayarlayın.'
]) check(app.includes(token), `missing manual AR behavior token: ${token}`);

check(!app.includes('Zemin aranıyor…'), 'manual AR must not show mandatory floor search');
check(!app.includes('Yeşil halka zemini bulduğunda'), 'manual AR must not wait for a reticle');
check(!app.includes('frame.getHitTestResults'), 'manual AR must not depend on frame hit-test results');
check((app.match(/AR_METERS_PER_MM/g) || []).length >= 4, 'real scale constant must be used throughout AR flow');

console.log(JSON.stringify({ pass: true, checks, manualMoveCm: 10, groundStepCm: 1, landscapeToggle: true }));
