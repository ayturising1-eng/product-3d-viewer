(function () {
  const defaults = {
    width: 3820,
    depth: 5980,
    height: 3200,
    orientations: [0, 0, 0, 0],
    postSections: [
      { x: 100, z: 220 },
      { x: 100, z: 220 },
      { x: 100, z: 220 },
      { x: 100, z: 220 }
    ],
    beamSection: { vertical: 220, thickness: 100 }
  };

  const ids = {
    frame: 'viewerFrame',
    labels: {
      width: 'widthLabel',
      depth: 'depthLabel',
      height: 'heightLabel',
      count: 'countLabel'
    }
  };

  const $ = (id) => document.getElementById(id);
  const modelState = JSON.parse(JSON.stringify(defaults));

  function lamellaCountFromProjection(depth) {
    const raw = Math.floor((depth - 796) / 216) + 1;
    return Math.max(1, Math.min(30, raw));
  }

  function readModel() {
    return {
      width: modelState.width,
      depth: modelState.depth,
      height: modelState.height,
      lamellaCount: lamellaCountFromProjection(modelState.depth),
      orientations: [...modelState.orientations],
      postSections: modelState.postSections.map((section) => ({ ...section })),
      beamSection: { ...modelState.beamSection }
    };
  }

  function setText(id, text) {
    $(id).textContent = text;
  }

  function updateReadouts() {
    const model = readModel();
    setText(ids.labels.width, `Width ${model.width} mm`);
    setText(ids.labels.depth, `Projection ${model.depth} mm`);
    setText(ids.labels.height, `Height ${model.height} mm`);
    setText(ids.labels.count, `${model.lamellaCount} lamellas`);
    return model;
  }

  function renderViewer() {
    const model = updateReadouts();
    $(ids.frame).srcdoc = buildViewerHtml(model);
  }

  function numberFromPrompt(message, currentValue, minValue) {
    const raw = prompt(message, String(currentValue));
    if (raw === null) return null;
    const value = Math.round(Number(String(raw).replace(',', '.')));
    if (!Number.isFinite(value) || value < minValue) {
      alert(`Please enter a value of ${minValue} mm or more.`);
      return null;
    }
    return value;
  }

  function editDimension(dimension) {
    const labels = {
      width: 'Width (mm)',
      depth: 'Projection / Depth (mm)',
      height: 'Height (mm)'
    };
    const minimums = { width: 1000, depth: 796, height: 1600 };
    const value = numberFromPrompt(labels[dimension], modelState[dimension], minimums[dimension]);
    if (value === null) return;
    const previousValue = modelState[dimension];
    modelState[dimension] = value;
    const model = readModel();
    const tooTight =
      !(
        model.postSections[0].x + model.postSections[1].x <= model.width - 120 &&
        model.postSections[2].x + model.postSections[3].x <= model.width - 120 &&
        model.postSections[0].z + model.postSections[2].z <= model.depth - 120 &&
        model.postSections[1].z + model.postSections[3].z <= model.depth - 120
      ) ||
      model.beamSection.vertical >= model.height - 200 ||
      model.beamSection.thickness >= Math.min(model.width, model.depth) / 2;
    if (tooTight) {
      modelState[dimension] = previousValue;
      alert('This dimension is too small for the current post/profile sections.');
      return;
    }
    renderViewer();
  }

  window.addEventListener('message', (event) => {
    if (!event.data || event.data.source !== 'product-3d-viewer') return;
    if (event.data.type === 'edit-dimension') editDimension(event.data.dimension);
  });

  function buildViewerHtml({ width, depth, height, lamellaCount, orientations, postSections, beamSection }) {
    const W = width;
    const D = depth;
    const H = height;
    const LC = lamellaCount;
    const [O1, O2, O3, O4] = orientations;
    const postJson = JSON.stringify(postSections);
    const beamJson = JSON.stringify(beamSection);

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>B-CUBE FREEDOM 3D</title>
<style>
html,body{margin:0;height:100%;overflow:hidden;background:radial-gradient(circle at top,#334155,#0f172a 60%);font-family:Segoe UI,Arial,sans-serif;color:#e5eefb}
.dim{position:absolute;padding:4px 8px;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.15);border-radius:8px;font-size:11px;white-space:nowrap;pointer-events:auto;z-index:30;cursor:pointer}
#fallback{display:none;position:absolute;inset:0;place-items:center;padding:22px;text-align:center;line-height:1.5;background:#0f172a;color:#e5e7eb;z-index:50}
@media(max-width:640px){.dim{font-size:10px}}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></scr` + `ipt>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></scr` + `ipt>
</head>
<body>
<div id="fallback">3D viewer could not load. Three.js is loaded from a CDN.</div>
<div class="dim" id="dimW"></div>
<div class="dim" id="dimD"></div>
<div class="dim" id="dimH"></div>
<script>
(function(){
if(!window.THREE || !THREE.OrbitControls){
  document.getElementById('fallback').style.display='grid';
  return;
}

const W=${W}, D=${D}, H=${H};
const GW=W-200, GD=D-200;
const RW=W-208, RD=D-303;
const LC=${LC};
let orientations=[${O1},${O2},${O3},${O4}];
let postSections=${postJson};
let beamSection=${beamJson};
const lamellaOpenMode=true;

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,1,30000);
camera.position.set(W*0.92,H*0.82,D*1.08);

const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.target.set(0,0,0);
controls.enableDamping=true;
controls.dampingFactor=.08;

scene.add(new THREE.AmbientLight(0xffffff,.72));
const dir=new THREE.DirectionalLight(0xffffff,.88);
dir.position.set(W*.35,H*1.1,D*.45);
dir.castShadow=true;
scene.add(dir);
const fill=new THREE.DirectionalLight(0x88aaff,.35);
fill.position.set(-W*.45,H*.55,-D*.5);
scene.add(fill);

const floorSize=Math.max(W,D)*1.7;
const floor=new THREE.Mesh(new THREE.PlaneGeometry(floorSize,floorSize),new THREE.ShadowMaterial({opacity:.32}));
floor.rotation.x=-Math.PI/2;
floor.position.y=-H/2-1;
floor.receiveShadow=true;
scene.add(floor);
const grid=new THREE.GridHelper(Math.max(W,D)*1.5,22,0x94a3b8,0x475569);
grid.position.y=-H/2;
scene.add(grid);

const box=new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(W,H,D)),
  new THREE.LineBasicMaterial({color:0x7dd3fc,transparent:true,opacity:.22})
);
scene.add(box);

const group=new THREE.Group();
scene.add(group);
const raycaster=new THREE.Raycaster();
const mouse=new THREE.Vector2();
const dimEls={w:document.getElementById('dimW'),d:document.getElementById('dimD'),h:document.getElementById('dimH')};

let parts=[];
let animStep=0;
let timer=null;

function postDims(index){
  return postSections[index] || {x:100,z:220};
}

function parseSectionInput(raw){
  if(raw===null)return null;
  const parts=String(raw).toLowerCase().replace(/,/g,'.').split(/[x*\\/ ]+/).filter(Boolean);
  if(parts.length<2)return null;
  const a=Math.round(Number(parts[0]));
  const b=Math.round(Number(parts[1]));
  if(!Number.isFinite(a)||!Number.isFinite(b)||a<20||b<20)return null;
  return {a,b};
}

function postLayoutFits(sections){
  const minOpening=120;
  return (
    sections[0].x + sections[1].x <= W - minOpening &&
    sections[2].x + sections[3].x <= W - minOpening &&
    sections[0].z + sections[2].z <= D - minOpening &&
    sections[1].z + sections[3].z <= D - minOpening
  );
}

function editPostSection(index){
  const current=postDims(index);
  const next=parseSectionInput(prompt('Post section X x Z (mm)', current.x+'x'+current.z));
  if(!next){
    alert('Enter section like 100x220.');
    return;
  }
  const sections=postSections.map(section=>({...section}));
  sections[index]={x:next.a,z:next.b};
  if(!postLayoutFits(sections)){
    alert('This post section does not fit inside the current total width/projection.');
    return;
  }
  postSections=sections;
  buildModel(true);
}

function editBeamSection(){
  const next=parseSectionInput(prompt('Blue profile section height x thickness (mm)', beamSection.vertical+'x'+beamSection.thickness));
  if(!next){
    alert('Enter section like 220x100.');
    return;
  }
  if(next.a >= H-200 || next.b >= Math.min(W,D)/2){
    alert('This blue profile section is too large for the current system dimensions.');
    return;
  }
  beamSection={vertical:next.a,thickness:next.b};
  buildModel(true);
}

function addBox(cfg,color,isPost){
  const geo=new THREE.BoxGeometry(cfg.sx,cfg.sy,cfg.sz);
  const mat=new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.18});
  const mesh=new THREE.Mesh(geo,mat);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.position.set(cfg.px,cfg.py,cfg.pz);
  mesh.userData={name:cfg.name,isPost,isBeam:Boolean(cfg.isBeam),postIndex:(cfg.idx===undefined?-1:cfg.idx)};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x111111,transparent:true,opacity:.25})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function gutterShape(sectionWidth,innerRun){
  const rise=58,height=120,topFlat=36,topInset=12;
  const valleyX=sectionWidth-innerRun;
  const s=new THREE.Shape();
  s.moveTo(0,0);
  s.lineTo(topInset,rise);
  s.lineTo(topInset+topFlat,rise);
  s.lineTo(valleyX,0);
  s.lineTo(sectionWidth,0);
  s.lineTo(sectionWidth,height);
  s.lineTo(sectionWidth-4,height);
  s.lineTo(sectionWidth-4,0);
  s.lineTo(0,0);
  s.closePath();
  return s;
}

function applyMiterCuts(geo,sectionWidth,length){
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i);
    let z=pos.getZ(i);
    const diag=sectionWidth-x;
    const startLimit=Math.max(0,diag);
    const endLimit=Math.min(length,length-diag);
    if(z<startLimit)z=startLimit;
    if(z>endLimit)z=endLimit;
    pos.setZ(i,z);
  }
  pos.needsUpdate=true;
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
}

function createExtrudedGutter(name,sectionWidth,innerRun,length,color,side){
  const geo=new THREE.ExtrudeGeometry(gutterShape(sectionWidth,innerRun),{depth:length,bevelEnabled:false,steps:1});
  applyMiterCuts(geo,sectionWidth,length);
  let rotY=0;
  if(side==='front')rotY=-Math.PI/2;
  if(side==='back')rotY=Math.PI/2;
  if(side==='left')rotY=0;
  if(side==='right')rotY=Math.PI;
  geo.rotateY(rotY);
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.62,metalness:.16}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={name,isPost:false,postIndex:-1};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x1f2937,transparent:true,opacity:.28})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function lamelShape(){
  const pts=[
    [249.334,27.759],[249.334,36.240],[236.642,43.568],[208.675,0.000],
    [0.138,0.000],[0.000,6.750],[19.817,40.493],[26.655,39.760],
    [32.954,35.990],[33.026,27.639],[35.746,27.639],[36.122,39.667],
    [106.399,36.106],[238.454,46.391],[251.343,46.391],[251.343,27.759]
  ];
  const cx=125.6715;
  const s=new THREE.Shape();
  s.moveTo(pts[0][0]-cx,pts[0][1]);
  for(let i=1;i<pts.length;i++)s.lineTo(pts[i][0]-cx,pts[i][1]);
  s.closePath();
  return s;
}

function createLamel(name,length,color){
  const geo=new THREE.ExtrudeGeometry(lamelShape(),{depth:length,bevelEnabled:false,steps:1});
  geo.rotateY(Math.PI/2);
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.54,metalness:.12}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={name,isPost:false,postIndex:-1,isLamel:true,isOpenLamel:false};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x214d21,transparent:true,opacity:.25})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function createOpenedLamel(name,length,color,angleDeg){
  const geo=new THREE.ExtrudeGeometry(lamelShape(),{depth:length,bevelEnabled:false,steps:1});
  geo.rotateY(Math.PI/2);
  geo.computeBoundingBox();
  const bbox=geo.boundingBox.clone();
  const pivot=new THREE.Group();
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.54,metalness:.12}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.position.set(-((bbox.min.x+bbox.max.x)/2),-bbox.min.y,-bbox.max.z);
  mesh.userData={name,isPost:false,postIndex:-1,isLamel:true,isOpenLamel:true};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x214d21,transparent:true,opacity:.25})));
  mesh.visible=false;
  pivot.rotation.x=THREE.MathUtils.degToRad(angleDeg);
  pivot.add(mesh);
  group.add(pivot);
  parts.push(mesh);
  return {pivot,mesh,bounds:bbox};
}

function setMeshByBounds(mesh,opts){
  mesh.position.set(0,0,0);
  mesh.updateMatrixWorld(true);
  const bbox=new THREE.Box3().setFromObject(mesh);
  if(opts.bottomY!==undefined)mesh.position.y+=(opts.bottomY-bbox.min.y);
  if(opts.centerX!==undefined)mesh.position.x+=(opts.centerX-(bbox.min.x+bbox.max.x)/2);
  if(opts.centerZ!==undefined)mesh.position.z+=(opts.centerZ-(bbox.min.z+bbox.max.z)/2);
  if(opts.minX!==undefined)mesh.position.x+=(opts.minX-bbox.min.x);
  if(opts.maxX!==undefined)mesh.position.x+=(opts.maxX-bbox.max.x);
  if(opts.minZ!==undefined)mesh.position.z+=(opts.minZ-bbox.min.z);
  if(opts.maxZ!==undefined)mesh.position.z+=(opts.maxZ-bbox.max.z);
  mesh.updateMatrixWorld(true);
}

function setObjectByBounds(obj,opts){
  obj.position.set(0,0,0);
  obj.updateMatrixWorld(true);
  const bbox=new THREE.Box3().setFromObject(obj);
  if(opts.bottomY!==undefined)obj.position.y+=(opts.bottomY-bbox.min.y);
  if(opts.centerX!==undefined)obj.position.x+=(opts.centerX-(bbox.min.x+bbox.max.x)/2);
  if(opts.centerZ!==undefined)obj.position.z+=(opts.centerZ-(bbox.min.z+bbox.max.z)/2);
  if(opts.minX!==undefined)obj.position.x+=(opts.minX-bbox.min.x);
  if(opts.maxX!==undefined)obj.position.x+=(opts.maxX-bbox.max.x);
  if(opts.minZ!==undefined)obj.position.z+=(opts.minZ-bbox.min.z);
  if(opts.maxZ!==undefined)obj.position.z+=(opts.maxZ-bbox.max.z);
  obj.updateMatrixWorld(true);
}

function buildModel(showAll){
  while(group.children.length)group.remove(group.children[0]);
  parts=[];
  const p=[postDims(0),postDims(1),postDims(2),postDims(3)];
  const magenta=0xff00ff,blue=0x2563eb,orange=0xff8c00,amber=0xffb347,grass=0x7cfc00;
  const beamVertical=beamSection.vertical;
  const beamThickness=beamSection.thickness;

  addBox({name:'Front Left Post',px:-W/2+p[0].x/2,py:0,pz:-D/2+p[0].z/2,sx:p[0].x,sy:H,sz:p[0].z,idx:0},magenta,true);
  addBox({name:'Front Right Post',px:W/2-p[1].x/2,py:0,pz:-D/2+p[1].z/2,sx:p[1].x,sy:H,sz:p[1].z,idx:1},magenta,true);
  addBox({name:'Back Left Post',px:-W/2+p[2].x/2,py:0,pz:D/2-p[2].z/2,sx:p[2].x,sy:H,sz:p[2].z,idx:2},magenta,true);
  addBox({name:'Back Right Post',px:W/2-p[3].x/2,py:0,pz:D/2-p[3].z/2,sx:p[3].x,sy:H,sz:p[3].z,idx:3},magenta,true);

  const beamCenterY=H/2-beamVertical/2;
  const beamBottomY=beamCenterY-beamVertical/2;
  addBox({name:'Front Beam',px:((-W/2+p[0].x)+(W/2-p[1].x))/2,py:beamCenterY,pz:-D/2+beamThickness/2,sx:W-p[0].x-p[1].x,sy:beamVertical,sz:beamThickness,isBeam:true},blue,false);
  addBox({name:'Back Beam',px:((-W/2+p[2].x)+(W/2-p[3].x))/2,py:beamCenterY,pz:D/2-beamThickness/2,sx:W-p[2].x-p[3].x,sy:beamVertical,sz:beamThickness,isBeam:true},blue,false);
  addBox({name:'Left Beam',px:-W/2+beamThickness/2,py:beamCenterY,pz:((-D/2+p[0].z)+(D/2-p[2].z))/2,sx:beamThickness,sy:beamVertical,sz:D-p[0].z-p[2].z,isBeam:true},blue,false);
  addBox({name:'Right Beam',px:W/2-beamThickness/2,py:beamCenterY,pz:((-D/2+p[1].z)+(D/2-p[3].z))/2,sx:beamThickness,sy:beamVertical,sz:D-p[1].z-p[3].z,isBeam:true},blue,false);

  const frontG=createExtrudedGutter('Front Gutter',210,172,GW,orange,'back');
  setMeshByBounds(frontG,{centerX:0,minZ:-GD/2,bottomY:beamBottomY});
  const backG=createExtrudedGutter('Back Gutter',210,172,GW,orange,'front');
  setMeshByBounds(backG,{centerX:0,maxZ:GD/2,bottomY:beamBottomY});
  const leftG=createExtrudedGutter('Left Gutter',210,172,GD,orange,'right');
  setMeshByBounds(leftG,{minX:-GW/2,centerZ:0,bottomY:beamBottomY});
  const rightG=createExtrudedGutter('Right Gutter',210,172,GD,orange,'left');
  setMeshByBounds(rightG,{maxX:GW/2,centerZ:0,bottomY:beamBottomY});

  const railBottomY=beamBottomY+4;
  const railHeight=128;
  const railSide=50;
  const railTop=151;
  const railBottom=30;
  const railOffsetFrom151=-92;
  const railCenterZ=((-RD/2+railTop+RD/2-railBottom)/2)+railOffsetFrom151;
  addBox({name:'Rail Top',px:0,py:railBottomY+railHeight/2,pz:(-RD/2+railTop/2)+railOffsetFrom151,sx:RW,sy:railHeight,sz:railTop},amber,false);
  addBox({name:'Rail Bottom',px:0,py:railBottomY+railHeight/2,pz:(RD/2-railBottom/2)+railOffsetFrom151,sx:RW,sy:railHeight,sz:railBottom},amber,false);
  addBox({name:'Rail Left',px:-RW/2+railSide/2,py:railBottomY+railHeight/2,pz:railCenterZ,sx:railSide,sy:railHeight,sz:RD-railTop-railBottom},amber,false);
  addBox({name:'Rail Right',px:RW/2-railSide/2,py:railBottomY+railHeight/2,pz:railCenterZ,sx:railSide,sy:railHeight,sz:RD-railTop-railBottom},amber,false);

  const lamelBottomY=beamBottomY+61;
  const lamelLength=W-385;
  const lamelInsetFrom151=50;
  const lamelStartZ=(-RD/2+railTop+railOffsetFrom151)+lamelInsetFrom151;
  const lamelSpacing=216;
  const lamelOpenSpacing=45;
  const lamelOpenAngle=-85;
  const lamelCount=Math.max(0,Math.floor(LC||0));

  if(lamellaOpenMode){
    for(let i=0;i<lamelCount;i++){
      const opened=createOpenedLamel('Lamella '+(i+1),lamelLength,grass,lamelOpenAngle);
      setObjectByBounds(opened.pivot,{centerX:0,minZ:lamelStartZ+i*lamelOpenSpacing,bottomY:lamelBottomY});
    }
  }else{
    for(let i=0;i<lamelCount;i++){
      const lamel=createLamel('Lamella '+(i+1),lamelLength,grass);
      setMeshByBounds(lamel,{centerX:0,minZ:lamelStartZ+i*lamelSpacing,bottomY:lamelBottomY});
    }
  }

  if(showAll){
    parts.forEach(part=>part.visible=true);
  }else{
    window.replayAnimation();
  }
}

window.replayAnimation=function replayAnimation(){
  animStep=0;
  parts.forEach(part=>part.visible=false);
  if(timer)clearInterval(timer);
  timer=setInterval(()=>{
    if(animStep<parts.length){
      parts[animStep].visible=true;
      animStep++;
    }else{
      clearInterval(timer);
    }
  },120);
};

function worldToScreen(v){
  const p=v.clone().project(camera);
  return {x:(p.x*.5+.5)*innerWidth,y:(p.y*-.5+.5)*innerHeight,vis:p.z<1};
}

function setDim(key,vec,text){
  const s=worldToScreen(vec),el=dimEls[key];
  if(!s.vis){el.style.display='none';return;}
  el.style.display='block';
  el.textContent=text;
  el.style.left=s.x+'px';
  el.style.top=s.y+'px';
}

function updateDims(){
  setDim('w',new THREE.Vector3(0,-H/2-10,-D/2-130),'Width '+W+' mm');
  setDim('d',new THREE.Vector3(-W/2-145,-H/2-10,0),'Projection '+D+' mm');
  setDim('h',new THREE.Vector3(W/2+135,0,D/2+135),'Height '+H+' mm');
}

dimEls.w.addEventListener('click',()=>parent.postMessage({source:'product-3d-viewer',type:'edit-dimension',dimension:'width'},'*'));
dimEls.d.addEventListener('click',()=>parent.postMessage({source:'product-3d-viewer',type:'edit-dimension',dimension:'depth'},'*'));
dimEls.h.addEventListener('click',()=>parent.postMessage({source:'product-3d-viewer',type:'edit-dimension',dimension:'height'},'*'));

function pickVisibleObject(event){
  mouse.x=event.clientX/innerWidth*2-1;
  mouse.y=-(event.clientY/innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hits=raycaster.intersectObjects(parts.filter(part=>part.visible));
  return hits.length ? hits[0].object : null;
}

window.addEventListener('click',event=>{
  const obj=pickVisibleObject(event);
  if(obj && obj.userData.isPost){
    editPostSection(obj.userData.postIndex);
  }
});

window.addEventListener('dblclick',event=>{
  const obj=pickVisibleObject(event);
  if(!obj)return;
  if(obj.userData.isBeam){
    editBeamSection();
  }
});

window.captureFreedom3D=function(){
  if(timer)clearInterval(timer);
  parts.forEach(part=>part.visible=true);
  camera.position.set(W*.92,H*.82,D*1.08);
  controls.target.set(0,0,0);
  controls.update();
  renderer.render(scene,camera);
  return {
    dataUrl: renderer.domElement.toDataURL('image/jpeg',.88),
    width: renderer.domElement.width,
    height: renderer.domElement.height
  };
};

window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  updateDims();
  renderer.render(scene,camera);
}

buildModel(false);
animate();
})();
</scr` + `ipt>
</body>
</html>`;
  }

  function bindEvents() {
    document.querySelectorAll('[data-edit-dimension]').forEach((button) => {
      button.addEventListener('click', () => editDimension(button.dataset.editDimension));
    });
  }

  bindEvents();
  renderViewer();
})();
