const fs=require('fs');
const path=require('path');
const vm=require('vm');
const crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const dataJs=fs.readFileSync(path.join(root,'assets/models/freedom-louver-data.js'),'utf8');
let checks=0;
function check(condition,message){checks+=1;if(!condition)throw new Error(message);}
function range(start,end){const a=app.indexOf(start);const b=app.indexOf(end,a);check(a>=0&&b>a,`range missing ${start}`);return app.slice(a,b);}
check(html.includes('p3dv.v3.54'),'V3.54 version token missing');
check(html.includes('id="previewInputGuidance"'),'automatic preview guidance missing');
check(app.includes('function scheduleAutomaticPreview()'),'automatic preview scheduler missing');
check(app.includes("autoPreviewTimer = window.setTimeout"),'automatic preview debounce missing');
check(app.includes("applyFreedomInputs();"),'automatic preview does not apply inputs');
check(app.includes("liveModelState:!IS_PERGO_RISE"),'viewer generic live model capability missing');
check(app.includes("event.data.type==='set-model-state'"),'viewer set-model-state handler missing');
check(app.includes("postViewerMessage('set-model-state'"),'parent set-model-state sender missing');
check(app.includes('function applyLiveModelPayload(payload)'),'live model payload function missing');
check(app.includes('function refreshSceneEnvelope()'),'live dimension envelope refresh missing');
check(app.includes("buildModel(true,{atomicSwap:true})"),'atomic scene swap missing');
check((app.match(/let arDeferredModelRebuild=false;/g)||[]).length===1,'AR deferred rebuild state duplicated');
for(const reason of ['position-dimensions','system-inputs','toolbox-bulk-operation','profile-add','profile-delete','beam-section-change','post-profile-change','post-profile-rotate','zone-dimension-change','product-delete-zone','quick-test','product-upsert','product-remove','products-clear']){
  check(app.includes(`commitModelChangeLive('${reason}')`),`live commit reason missing: ${reason}`);
}
check((app.match(/\n\s*renderViewer\(\);/g)||[]).length===5,'unexpected direct renderViewer call path added');
for(const [start,end,reason] of [
 ['  function applyProfileForm() {','  function openDividerProfileDialog','profile-add'],
 ['  function deleteSelectedDividerProfile() {','  function normalizeBeamSectionChange','profile-delete'],
 ['  function applyZoneDimensionForm() {','  function openSelectedProduct','zone-dimension-change'],
 ['  function applyProductForm() {','  function removeProduct()','product-upsert'],
 ['  function removeProduct() {','  function clearProducts()','product-remove'],
 ['  function clearProducts() {','  window.addEventListener(\'message\'','products-clear']
]){
 const src=range(start,end);
 check(src.includes(`commitModelChangeLive('${reason}')`),`${reason} does not use live commit`);
 check(!src.includes('\n    renderViewer();'),`${reason} still reloads iframe`);
}
const order=['largePreviewMultiProfileAddBtn','largePreviewMultiProfileDeleteBtn','largePreviewMultiProductBtn','largePreviewMultiDeleteBtn'].map(id=>html.indexOf(id));
check(order.every((n,i)=>n>=0&&(i===0||n>order[i-1])),'large toolbox command order incorrect');
check(!html.includes('id="largePreviewResetCameraBtn"'),'large reset-camera button must be removed');
const fitTag=(html.match(/<button[^>]*id="largePreviewFitProductsBtn"[^>]*>/)||[])[0]||'';
check(/\sdisabled(?:=|\s|>)/.test(fitTag),'fit-products button must be disabled');
check(app.includes('const panicV=innerV+zone.inward*42;'),'panic bar forward offset missing');
check(app.includes('v:zone.outerFaceV-zone.inward*34,w:220,h:70'),'guillotine motor label forward offset missing');
check(app.includes('v:zone.outerFaceV-zone.inward*34,w:210,h:64'),'zip motor label forward offset missing');
const sandbox={window:{}};vm.runInNewContext(dataJs,sandbox);
const raw=Buffer.from(sandbox.window.P3DV_FREEDOM_LOUVER_GLB_BASE64,'base64');
const meta=sandbox.window.P3DV_FREEDOM_LOUVER_GLB_META;
check(raw.length===526740,'optimized Freedom GLB byte length mismatch');
check(raw.length<700000,'optimized Freedom GLB is not sufficiently lightweight');
check(meta.meshCount===4,'optimized Freedom GLB must contain four shell/cap meshes');
check(meta.optimization.includes('pins-removed'),'optimization metadata missing pin removal');
check(crypto.createHash('sha256').update(raw).digest('hex')===meta.sha256,'optimized Freedom GLB hash mismatch');
const jsonLength=raw.readUInt32LE(12);
const gltf=JSON.parse(raw.toString('utf8',20,20+jsonLength).replace(/\0+$/,'').trim());
const names=gltf.meshes.map(m=>m.name);
for(const name of ['Freedom_Louver_Outer_Shell','Freedom_Louver_Cover_Strip','Freedom_Louver_End_Cap_R','Freedom_Louver_End_Cap_L'])check(names.includes(name),`optimized mesh missing ${name}`);
check(!names.some(name=>/Cylinder|Circle|Pin/i.test(name)),'pin/cylinder meshes remain in optimized panel');
console.log(JSON.stringify({pass:true,checks,glbBytes:raw.length,meshCount:names.length,liveProtocol:'set-model-state',autoPreview:true}));
