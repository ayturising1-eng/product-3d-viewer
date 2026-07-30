const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const glbPath = path.join(root, 'assets', 'models', 'freedom-louver.glb');
const dataPath = path.join(root, 'assets', 'models', 'freedom-louver-data.js');
const dataJs = fs.readFileSync(dataPath, 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

check(html.includes('p3dv.v3.54'), 'V3.46 version token missing from HTML');
check(html.includes('./assets/models/freedom-louver-data.js'), 'embedded Freedom GLB data script missing');
check(html.indexOf('./assets/models/freedom-louver-data.js') < html.indexOf('./app.js'), 'Freedom GLB data must load before app.js');

check(!fs.existsSync(glbPath), 'Raw Freedom GLB must not be packaged after embedded template extraction');
const sandbox = { window: {} };
vm.runInNewContext(dataJs, sandbox);
const decoded = Buffer.from(sandbox.window.P3DV_FREEDOM_LOUVER_GLB_BASE64, 'base64');
check(decoded.length === 526740, 'Embedded Freedom GLB byte length changed unexpectedly');
check(decoded.toString('ascii', 0, 4) === 'glTF', 'Embedded Freedom model is not a binary glTF file');
check(decoded.readUInt32LE(4) === 2, 'Embedded Freedom GLB must be glTF 2.0');
check(decoded.readUInt32LE(8) === decoded.length, 'Embedded Freedom GLB header length mismatch');
const jsonLength = decoded.readUInt32LE(12);
check(decoded.toString('ascii', 16, 20) === 'JSON', 'Embedded Freedom GLB JSON chunk missing');
const gltfJson = JSON.parse(decoded.toString('utf8', 20, 20 + jsonLength).replace(/\u0000+$/g, '').trim());
check(Array.isArray(gltfJson.meshes) && gltfJson.meshes.length === 4, 'Embedded Freedom GLB must contain the 4 optimized shell/cap meshes');
check(gltfJson.asset && String(gltfJson.asset.version).startsWith('2'), 'Embedded Freedom GLB asset version is invalid');
const sha = crypto.createHash('sha256').update(decoded).digest('hex');
check(sha === '7a0206e0de88e235cae06cfbd76c9da347d0e8d673454d00c695f1f488ea5f55', 'Embedded Freedom GLB SHA-256 mismatch');
check(sandbox.window.P3DV_FREEDOM_LOUVER_GLB_META.meshCount === 4, 'embedded GLB metadata mesh count mismatch');
check(sandbox.window.P3DV_FREEDOM_LOUVER_GLB_META.sha256 === sha, 'embedded GLB metadata SHA mismatch');

for (const token of [
  'function freedomLouverBlobUrl()',
  "new Blob([bytes], { type: 'model/gltf-binary' })",
  "freedomLouverUrl: model.productGroup === 'b-cube' ? freedomLouverBlobUrl() : '',",
  'const FREEDOM_LOUVER_GLB_URL=',
  'examples/js/loaders/GLTFLoader.js',
  'function loadFreedomLouverTemplate()',
  'function prepareFreedomLouverTemplate(sourceScene)',
  'source.scale.multiplyScalar(1000);',
  'source.rotateY(Math.PI/2);',
  "window.P3DV_FREEDOM_LOUVER_GLB_BASE64 = '';",
  'function cloneFreedomLouverObject(name,length,isOpen)',
  'object.scale.x=Math.max(1,Number(length)||nativeLength)/nativeLength;',
  'function createFreedomLamel(name,length,color)',
  'function createOpenedFreedomLamel(name,length,color,angleDeg)',
  "freedomLouverProfile:freedomLouverTemplate?'glb':'procedural-fallback'",
  "if(material.userData.p3dvShared)return;",
  'obj.geometry.userData.p3dvShared'
]) check(app.includes(token), `V3.46 GLB implementation token missing: ${token}`);

// Freedom uses GLB clones, while Bio-Rise keeps its proven procedural profile.
check(app.includes("const opened=createOpenedFreedomLamel('Lamella '+(i+1),lamelLength,grass,lamelOpenAngle);"), 'Freedom open lamel does not use GLB profile');
check(app.includes("const lamel=createFreedomLamel('Lamella '+(i+1),lamelLength,grass);"), 'Freedom closed lamel does not use GLB profile');
check(app.includes("const opened=createOpenedLamel('Lamella '+(i+1),lamelLength,grass,lamelOpenAngle,lamelNarrowBy,true);"), 'Bio-Rise open lamel procedural path changed');
check(app.includes("const lamel=createLamel('Lamella '+(i+1),lamelLength,grass,lamelNarrowBy);"), 'Bio-Rise closed lamel procedural path changed');

// Position, spacing, direction and 100° effective opening contracts must remain unchanged.
for (const token of [
  'const freedomEffectiveOpenAngle=100;',
  'const freedomLamelOpenAngle=freedomEffectiveOpenAngle-180;',
  'const freedomMotorFacade=\'front\';',
  "const freedomMotorFacadeLabel='Arka Cephe';",
  'const lamelSpacing=216;',
  'const lamelOpenSpacing=65;',
  'const backStackMinZ=freedomBackMotorBoxMinZ+(lamelCount-1-i)*lamelOpenSpacing;',
  'opened.pivot.rotation.y=Math.PI;',
  'setObjectByBounds(opened.pivot,{centerX:0,minZ:backStackMinZ,bottomY:lamelBottomY});',
  'lamel.rotation.y=Math.PI;',
  'const mirroredRearMaxZ=-lamelStartZ-i*lamelSpacing;',
  'setMeshByBounds(lamel,{centerX:0,maxZ:mirroredRearMaxZ,bottomY:lamelBottomY});'
]) check(app.includes(token), `Freedom placement/orientation contract changed: ${token}`);

check(app.includes("if(!object)return createLamel(name,length,color,0);"), 'closed lamel procedural fallback missing');
check(app.includes("if(!object)return createOpenedLamel(name,length,color,angleDeg,0,false);"), 'open lamel procedural fallback missing');

console.log(JSON.stringify({
  pass: true,
  checks,
  glbBytes: decoded.length,
  glbMeshes: gltfJson.meshes.length,
  sha256: sha,
  profile: 'Freedom GLB only',
  preserved: ['position','spacing','orientation','100deg','Bio-Rise']
}));
