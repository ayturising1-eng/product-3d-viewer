(function (root) {
  'use strict';

  const TEMPLATE_MAP = Object.freeze({
    'pillar-profile': { names: ['PergoRise_Pillar'], confidence: 'HIGH', role: 'Front post profile' },
    'foot-accessory': { names: ['PergoRise_Foot'], confidence: 'HIGH', role: 'Front post foot' },
    'gutter-profile': { names: ['PergoRise_Gutter'], confidence: 'HIGH', role: 'Front gutter profile sample' },
    'rail-profile': { names: ['Shape274', 'Shape112', 'Shape133'], confidence: 'MEDIUM', role: 'Sloped rail profile; selected by 3.70 m × 71 mm × 93 mm signature' },
    'rear-profile': { names: ['Shape254', 'Shape101', 'Shape126'], confidence: 'MEDIUM', role: 'Rear/opposite transverse profile; same 71 mm × 93 mm profile family' },
    'fabric-profile': { names: ['Shape117', 'Shape124', 'Shape129'], confidence: 'MEDIUM', role: 'Fabric registration profile; selected by 3.69 m × 66 mm × 57 mm signature' },
    'fabric-stack': { names: ['Motor Yuvası Kapalı Kumaş002'], confidence: 'HIGH_VISUAL_ONLY', role: 'Rear-stacked static fabric visual; excluded from production geometry' },
    'wall-connection-accessory': { names: ['Shape005'], confidence: 'LOW_REVIEW_REQUIRED', role: 'Candidate rear wall/rail connection accessory; visible-only until manufacturing validation' }
  });

  function findMesh(scene, names) {
    let found = null;
    const wanted = new Set(names || []);
    scene.traverse(object => {
      if (!found && object && object.isMesh && wanted.has(String(object.name || ''))) found = object;
    });
    return found;
  }

  function bakeGeometry(mesh, THREE) {
    if (!mesh || !mesh.geometry) return null;
    mesh.updateWorldMatrix(true, false);
    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);
    geometry.computeBoundingBox();
    const box = geometry.boundingBox.clone();
    const center = box.getCenter(new THREE.Vector3());
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    geometry.userData = { ...(geometry.userData || {}), p3dvShared: true, p3dvSourceNode: mesh.name };
    return geometry;
  }

  function longestAxis(size) {
    if (size.y >= size.x && size.y >= size.z) return 'y';
    if (size.z >= size.x && size.z >= size.y) return 'z';
    return 'x';
  }

  function createLibrary(scene, options) {
    const THREE = options && options.THREE || root.THREE;
    if (!THREE || !scene) throw new Error('THREE and GLB scene are required.');
    scene.updateMatrixWorld(true);
    const templates = {};
    const mapping = [];
    Object.keys(TEMPLATE_MAP).forEach(key => {
      const descriptor = TEMPLATE_MAP[key];
      const mesh = findMesh(scene, descriptor.names);
      if (!mesh) {
        mapping.push({ key, status: 'MISSING', sourceNode: '', confidence: descriptor.confidence, role: descriptor.role });
        return;
      }
      const geometry = bakeGeometry(mesh, THREE);
      if (!geometry) return;
      const size = geometry.boundingBox.getSize(new THREE.Vector3());
      const axis = longestAxis(size);
      templates[key] = { geometry, axis, size, sourceNode: mesh.name, descriptor };
      mapping.push({
        key, status: 'MAPPED', sourceNode: mesh.name, confidence: descriptor.confidence, role: descriptor.role,
        sourceSizeMm: [size.x * 1000, size.y * 1000, size.z * 1000]
      });
    });
    return { templates, mapping, unitsToMm: 1000 };
  }

  function materialFor(component, materials) {
    if (component.kind === 'fabric-stack') return materials.fabric;
    if (component.kind === 'rear-wall') return materials.wall;
    if (component.kind === 'fabric-profile') return materials.fabricProfile || materials.system;
    return materials.system;
  }

  function makeLinearInstance(library, component, materials, THREE) {
    const template = library.templates[component.template];
    if (!template || !component.start || !component.end) return null;
    const start = new THREE.Vector3().fromArray(component.start);
    const end = new THREE.Vector3().fromArray(component.end);
    const direction = end.clone().sub(start);
    const targetLength = direction.length();
    if (!(targetLength > 0.001)) return null;
    const geometry = template.geometry;
    const mesh = new THREE.Mesh(geometry, materialFor(component, materials));
    const sourceLengthMm = Math.max(0.001, Number(template.size[template.axis]) * library.unitsToMm);
    const scale = library.unitsToMm;
    mesh.scale.set(scale, scale, scale);
    mesh.scale[template.axis] = scale * targetLength / sourceLengthMm;
    const axisVector = template.axis === 'y' ? new THREE.Vector3(0, 1, 0) : (template.axis === 'z' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0));
    mesh.quaternion.setFromUnitVectors(axisVector, direction.clone().normalize());
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.name = component.id;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = {
      ...(mesh.userData || {}),
      p3dvPergoRiseComponent: true,
      componentId: component.id,
      componentKind: component.kind,
      templateKey: component.template,
      sourceNode: template.sourceNode,
      sourceRuleIds: component.sourceRuleIds || [],
      longitudinalScaleOnly: true,
      productionGeometry: component.productionGeometry !== false
    };
    return mesh;
  }

  function makeAccessory(library, component, materials, THREE) {
    const template = library.templates[component.template];
    if (!template || !component.position) return null;
    const mesh = new THREE.Mesh(template.geometry, materialFor(component, materials));
    mesh.scale.setScalar(library.unitsToMm);
    mesh.position.fromArray(component.position);
    const rotation = component.rotation || [0, 0, 0];
    mesh.rotation.set(Number(rotation[0]) || 0, Number(rotation[1]) || 0, Number(rotation[2]) || 0);
    mesh.name = component.id;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = {
      ...(mesh.userData || {}),
      p3dvPergoRiseComponent: true,
      componentId: component.id,
      componentKind: component.kind,
      templateKey: component.template,
      sourceNode: template.sourceNode,
      sourceRuleIds: component.sourceRuleIds || [],
      productionGeometry: component.productionGeometry !== false
    };
    return mesh;
  }

  function makeFabricStack(library, component, materials, THREE) {
    const template = library.templates[component.template];
    if (!template || !component.position) return null;
    const mesh = new THREE.Mesh(template.geometry, materialFor(component, materials));
    const sourceWidthMm = Math.max(1, Number(template.size[template.axis]) * library.unitsToMm);
    mesh.scale.setScalar(library.unitsToMm);
    mesh.scale[template.axis] = library.unitsToMm * Math.max(1, Number(component.width) || sourceWidthMm) / sourceWidthMm;
    mesh.position.fromArray(component.position);
    mesh.name = component.id;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.userData = {
      ...(mesh.userData || {}),
      p3dvPergoRiseComponent: true,
      componentId: component.id,
      componentKind: component.kind,
      templateKey: component.template,
      sourceNode: template.sourceNode,
      sourceRuleIds: component.sourceRuleIds || [],
      longitudinalScaleOnly: true,
      representation: 'STATIC_VISUAL_REPRESENTATION',
      productionGeometry: false
    };
    return mesh;
  }

  function makeWall(component, materials, THREE) {
    const points = Array.isArray(component.polygonXZ) ? component.polygonXZ : [];
    if (points.length < 3) return null;
    const shape = new THREE.Shape();
    points.forEach((point, index) => {
      const x = Number(point[0]) || 0;
      const z = Number(point[1]) || 0;
      if (index === 0) shape.moveTo(x, -z); else shape.lineTo(x, -z);
    });
    shape.closePath();
    const height = Math.max(1, Number(component.topY) - Number(component.bottomY));
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 1, steps: 1 });
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, Number(component.bottomY) || 0, 0);
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, materialFor(component, materials));
    mesh.name = component.id;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = {
      p3dvPergoRiseComponent: true,
      componentId: component.id,
      componentKind: component.kind,
      templateKey: component.template,
      sourceRuleIds: component.sourceRuleIds || [],
      canonicalWallSolid: true,
      productionGeometry: true
    };
    return mesh;
  }

  function buildAssembly(library, derived, options) {
    const THREE = options && options.THREE || root.THREE;
    if (!THREE || !library || !derived) throw new Error('Pergo Rise library and derived assembly are required.');
    const materials = options && options.materials || {};
    const group = new THREE.Group();
    group.name = 'Pergo Rise Parametric Static Assembly';
    group.userData = {
      p3dvPergoRiseAssembly: true,
      schema: derived.schema,
      productId: derived.productId,
      projectHash: derived.projectHash,
      staticState: derived.staticState,
      counts: derived.counts
    };
    const built = [];
    const missing = [];
    (derived.components || []).forEach(component => {
      let object = null;
      if (component.kind === 'rear-wall') object = makeWall(component, materials, THREE);
      else if (component.kind === 'fabric-stack') object = makeFabricStack(library, component, materials, THREE);
      else if (component.start && component.end) object = makeLinearInstance(library, component, materials, THREE);
      else object = makeAccessory(library, component, materials, THREE);
      if (object) {
        group.add(object);
        built.push(component.id);
      } else {
        missing.push({ id: component.id, kind: component.kind, template: component.template });
      }
    });
    group.userData.buildReport = { builtCount: built.length, missing, mapping: library.mapping };
    return group;
  }

  root.P3DVPergoRiseViewer = Object.freeze({ TEMPLATE_MAP, createLibrary, buildAssembly });
})(typeof window !== 'undefined' ? window : globalThis);
