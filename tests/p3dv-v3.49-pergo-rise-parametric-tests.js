const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
let pass = 0;
function check(value, message) { if (!value) throw new Error(message); pass += 1; }

require(path.join(root, 'products/pergo-rise/plmr-runtime/multiPositionRules.js'));
require(path.join(root, 'products/pergo-rise/plmr-runtime/peri01ExcelBridge.js'));
require(path.join(root, 'products/pergo-rise/plmr-runtime/peri01Geometry.js'));
const product = require(path.join(root, 'products/pergo-rise/pergo-rise-product.js'));
const derivedGeometry = require(path.join(root, 'products/pergo-rise/pergo-rise-derived-geometry.js'));

check(html.includes('p3dv.v3.53'), 'V3.49 token is missing');
for (const id of ['pergoSystemCountInput','pergoFrontHeightInput','pergoRayCountInput','pergoPostCountInput']) {
  check(html.includes(`id="${id}"`), `Missing Pergo Rise field ${id}`);
}
for (const script of ['multiPositionRules.js','peri01ExcelBridge.js','peri01Geometry.js','pergo-rise-product.js','pergo-rise-derived-geometry.js']) {
  check(html.includes(script), `Missing runtime script ${script}`);
}
check(app.includes("type==='set-pergo-rise-project'"), 'Live Pergo Rise update message is missing');
check(app.includes('livePergoRise:IS_PERGO_RISE'), 'Viewer live Pergo capability is missing');
check(app.includes('P3DVPergoRiseViewer.buildAssembly'), 'Parametric GLB component assembly is not connected');
check(!app.includes('assembly.scale.set(scaleX,scaleY,scaleZ)'), 'Whole-GLB XYZ scaling regression detected');
check(!app.includes('clonePergoRiseObject'), 'Whole-GLB clone path must not exist');
check(app.includes("event.data.type==='replay-animation'&&!IS_PERGO_RISE"), 'Pergo Rise animation must remain disabled');

check(app.includes('modelState.width = Math.round(Number(canonical.normalized.width) || derived.envelope.width)'), 'PLMR nominal width must not be replaced by the gutter envelope');
check(app.includes("model.productGroup === 'pergo-rise'"), 'Pergo Rise PDF/report branch is missing');
check(app.includes('pergoCounts.systems'), 'Pergo Rise PDF system counts are missing');

const one = product.create({ systemCount:'1', width:'4000', opening:'4500', rearHeight:'3200', frontHeight:'2600', rayCount:'', postCount:'' });
const oneDerived = derivedGeometry.build(one);
check(oneDerived.schema === 'p3dv-static-assembly-v1', 'Assembly schema mismatch');
check(one.normalized.width === 4000, 'PLMR nominal width mismatch');
check(oneDerived.envelope.width === 4100, 'Documented gutter envelope must be nominal width +100 mm');
check(oneDerived.staticState === 'STATIC_OPEN_REAR_STACKED', 'Pergo Rise must remain static/open/rear-stacked');
check(oneDerived.coordinateSystem.x === 'width' && oneDerived.coordinateSystem.y === 'height' && oneDerived.coordinateSystem.z === 'opening', 'Coordinate contract mismatch');
check(new Set(oneDerived.components.map(item => item.id)).size === oneDerived.components.length, 'Component instance IDs must be unique');
check(oneDerived.components.every(item => Array.isArray(item.sourceRuleIds) && item.sourceRuleIds.length), 'Every component must retain PLMR/GLB rule provenance');
check(oneDerived.counts.systems === 1 && oneDerived.counts.rails === 2 && oneDerived.counts.posts === 2, 'Single-system PLMR parity mismatch');
check(oneDerived.components.filter(item => item.kind === 'rail').every(item => item.template === 'rail-profile'), 'Rails must use GLB profile templates');
check(oneDerived.components.filter(item => item.kind === 'post').every(item => item.template === 'pillar-profile'), 'Posts must use GLB pillar template');
check(oneDerived.components.some(item => item.kind === 'rear-wall' && item.template === 'canonical-wall-solid'), 'Canonical 3D rear wall solid missing');
check(oneDerived.components.some(item => item.kind === 'fabric-stack' && item.productionGeometry === false), 'Static fabric visual separation missing');
check(oneDerived.systems[0].width === one.normalized.positions[0].width && oneDerived.systems[0].opening === one.normalized.positions[0].opening, 'Width/opening 2D-3D parity mismatch');
check(oneDerived.systems[0].rearHeight === one.normalized.positions[0].rearHeight && oneDerived.systems[0].frontHeight === one.normalized.positions[0].frontHeight, 'Front/rear height 2D-3D parity mismatch');
check(Math.abs(oneDerived.systems[0].slopeDegrees - Math.abs(one.normalized.positions[0].angleRad) * 180 / Math.PI) < 1e-9, 'Slope 2D-3D parity mismatch');
const sourceOriginX = (one.normalized.systems[0].outerStartX + one.normalized.systems[0].outerEndX) / 2;
check(JSON.stringify(oneDerived.systems[0].railAxes) === JSON.stringify(one.normalized.systems[0].rays.map(axis => axis + global.PulumurGeometry.K.rayW / 2 - sourceOriginX)), 'Rail axis 2D-3D parity mismatch');
check(JSON.stringify(oneDerived.components.filter(item => item.kind === 'post').map(item => item.axisX)) === JSON.stringify(one.normalized.postCenterXs.map(axis => axis - sourceOriginX)), 'Post axis 2D-3D parity mismatch');
check(oneDerived.components.filter(item => item.kind === 'rail').every(item => item.sourceRuleIds.includes('PLMR.drawTopRays')), 'Rail source rule trace is missing');
check(oneDerived.components.filter(item => item.kind === 'rear-wall').every(item => item.productionGeometry === true && item.sourceRuleIds.includes('PLMR.topBackWallGridState')), 'Rear wall source/production contract mismatch');
check(oneDerived.unresolvedProductionFields.length === 3, 'Unresolved production-field disclosure changed unexpectedly');
check(oneDerived.components.filter(item => item.kind === 'wall-connection').every(item => item.productionGeometry === false && item.reviewRequired === true), 'Uncertain wall connection mapping must stay visible-only/review-required');
check(oneDerived.components.filter(item => item.kind === 'foot').every(item => item.template === 'foot-accessory' && item.productionGeometry === true), 'Front feet must use GLB accessory templates');
check(oneDerived.components.filter(item => item.kind === 'gutter').every(item => item.template === 'gutter-profile'), 'Gutters must use GLB profile templates');
check(oneDerived.components.filter(item => item.kind === 'fabric-profile').every(item => item.template === 'fabric-profile'), 'Fabric registration profiles must use GLB templates');
check(oneDerived.counts.wallConnections === oneDerived.counts.rails, 'Each rail rear start requires one visible wall-connection candidate');
check(oneDerived.counts.fabricProfiles === 2, 'Single two-rail position requires fixed and moving fabric profiles');

const multiple = product.create({ systemCount:'2', width:'4000;3000', opening:'4500;4000', rearHeight:'3200;3100', frontHeight:'2600', rayCount:'', postCount:'' });
const multipleDerived = derivedGeometry.build(multiple);
check(multipleDerived.counts.systems === 2, 'Multi-position system count mismatch');
check(multipleDerived.counts.rails === 4 && multipleDerived.counts.posts === 3, 'Multi-position ray/post count mismatch');
check(Math.round(multiple.normalized.systems[0].gapAfter) === 13, 'PLMR physical system gap mismatch');

const independent = product.create({ width:'4000:800:3000;13;2500', opening:'4500;4000;3800', rearHeight:'3200;3100;3000', frontHeight:'2600;2500;2400', rayCount:'', postCount:'' });
const independentDerived = derivedGeometry.build(independent);
check(independent.normalized.independentMode === true, 'Independent-group mode was not activated');
check(independentDerived.independentGroups.length === 2, 'Independent group topology mismatch');
check(independentDerived.counts.systems === 3, 'Independent group position count mismatch');
check(independentDerived.components.filter(item => item.kind === 'gutter').length === 2, 'Independent groups require separate gutters');
check(independentDerived.counts.rails === 6 && independentDerived.counts.posts === 5, 'Independent-group rail/post topology mismatch');
check(independentDerived.components.filter(item => item.kind === 'rear-wall').length === 3, 'Each independent position must retain its PLMR rear wall solid');
check(independentDerived.systems.every(item => item.slopeDegrees > 0), 'Per-position PLMR slope must be retained in 3D');


const serialized = product.serialize(one);
const loaded = product.load(serialized);
check(loaded.stale === false && loaded.currentHash === one.hash, 'Save/load round-trip hash mismatch');
const tampered = JSON.parse(serialized);
tampered.input.width = '4200';
const stale = product.load(tampered);
check(stale.stale === true && stale.currentHash !== stale.savedHash, 'Stale-model detection did not detect changed canonical input');
check(app.includes('Pergo Rise · Parametrik Proje') && app.includes('Gerçek GLB Ray Profilleri'), 'Pergo-specific PDF report sections are missing');
check(app.includes('dimensionVisibility: showDimensionVisibility'), 'Pergo dimension visibility is not passed into viewer');
const webglViewer = fs.readFileSync(path.join(root, 'products/pergo-rise/pergo-rise-webgl-viewer.js'), 'utf8');
check(webglViewer.includes('root.setP3DVCameraPreset = setCameraPreset'), 'Camera preset API is missing');
check(webglViewer.includes("data.type === 'set-dimension-visibility'"), 'Live dimension visibility handler is missing');
check(webglViewer.includes("gl.clearColor(0.035, 0.055, 0.085, transparent ? 0 : 1)"), 'Opaque technical viewer background is missing');

const glbPath = path.join(root, 'assets/models/pergo-rise.glb');
check(!fs.existsSync(glbPath), 'Raw PergoRise.glb must not be packaged after component extraction');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/pergo-rise/component-templates.json'), 'utf8'));
const templateBin = fs.readFileSync(path.join(root, 'assets/pergo-rise/component-templates.bin'));
check(manifest.schema === 'p3dv-pergo-rise-component-templates-v1', 'Template manifest schema mismatch');
check(Object.keys(manifest.templates).length === 8, 'Eight GLB component templates are required');
check(manifest.templates['pillar-profile'].sourceNode === 'PergoRise_Pillar' && manifest.templates['pillar-profile'].confidence === 'HIGH', 'Pillar mapping mismatch');
check(manifest.templates['gutter-profile'].sourceNode === 'PergoRise_Gutter' && manifest.templates['gutter-profile'].confidence === 'HIGH', 'Gutter mapping mismatch');
check(manifest.templates['rail-profile'].sourceNode === 'Shape274' && manifest.templates['rail-profile'].confidence === 'MEDIUM', 'Rail mapping/confidence mismatch');
check(manifest.templates['wall-connection-accessory'].confidence === 'LOW_REVIEW_REQUIRED' && manifest.templates['wall-connection-accessory'].productionGeometry === false, 'Shape005 uncertainty policy mismatch');
check(manifest.templates['fabric-stack'].productionGeometry === false, 'Static fabric template must be non-production');
check(manifest.geometryPolicy.includes('only longest source axis may scale'), 'Whole-profile scaling policy is missing');
check(templateBin.length === manifest.binary.byteLength, 'Template binary byte length mismatch');
const crypto = require('crypto');
check(manifest.sourceGlbSha256 === 'b68cca77d439f17a18bbe3cf3365c9884daadc516b85628bfa6417e5b262eded', 'Canonical source GLB provenance hash mismatch');
check(crypto.createHash('sha256').update(templateBin).digest('hex') === manifest.binary.sha256, 'Template binary hash mismatch');
console.log(`${pass} PASS`);
