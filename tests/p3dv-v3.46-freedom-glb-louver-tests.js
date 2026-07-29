const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const glbPath = path.join(root, 'assets', 'models', 'freedom-louver.glb');
const dataPath = path.join(root, 'assets', 'models', 'freedom-louver-data.js');
const glb = fs.readFileSync(glbPath);
const dataJs = fs.readFileSync(dataPath, 'utf8');
let checks = 0;
function check(condition, message) { checks += 1; if (!condition) throw new Error(message); }

check(html.includes('p3dv.v3.46'), 'V3.46 version token missing from HTML');
check(html.includes('./assets/models/freedom-louver-data.js'), 'embedded Freedom GLB data script missing');
check(html.indexOf('./assets/models/freedom-louver-data.js') < html.indexOf('./app.js'), 'Freedom GLB data must load before app.js');

check(glb.length === 4290412, 'Freedom GLB byte length changed unexpectedly');
check(glb.toString('ascii', 0, 4) === 'glTF', 'Freedom model is not a binary glTF file');
check(glb.readUInt32LE(4) === 2, 'Freedom GLB must be glTF 2.0');
check(glb.readUInt32LE(8) === glb.length, 'Freedom GLB header length mismatch');
const jsonLength = glb.readUInt32LE(12);
check(glb.toString('ascii', 16, 20) === 'JSON', 'Freedom GLB JSON chunk missing');
const gltfJson = JSON.parse(glb.toString('utf8', 20, 20 + jsonLength).replace(/\u0000+$/g, '').trim());
check(Array.isArray(gltfJson.meshes) && gltfJson.meshes.length === 15, 'Freedom GLB must preserve 15 source meshes');
check(gltfJson.asset && String(gltfJson.asset.version).startsWith('2'), 'Freedom GLB asset version is invalid');
const sha = crypto.createHash('sha256').update(glb).digest('hex');
check(sha === '0f4635f3f41d8a0ee420475988ae622f69eef240abd56544eb748e0242b1d4c1', 'Freedom GLB SHA-256 mismatch');

const sandbox = { window: {} };
vm.runInNewContext(dataJs, sandbox);
const decoded = Buffer.from(sandbox.window.P3DV_FREEDOM_LOUVER_GLB_BASE64, 'base64');
check(decoded.equals(glb), 'embedded Freedom GLB data does not match source GLB');
check(sandbox.window.P3DV_FREEDOM_LOUVER_GLB_META.meshCount === 15, 'embedded GLB metadata mesh count mismatch');
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
  glbBytes: glb.length,
  glbMeshes: gltfJson.meshes.length,
  sha256: sha,
  profile: 'Freedom GLB only',
  preserved: ['position','spacing','orientation','100deg','Bio-Rise']
}));
