(function (root) {
  'use strict';

  const EPS = 1e-8;
  const AXES = {
    x: [1, 0, 0],
    y: [0, 1, 0],
    z: [0, 0, 1]
  };

  function number(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : (fallback == null ? 0 : fallback);
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function copy3(value, fallback) {
    const source = Array.isArray(value) ? value : (fallback || [0, 0, 0]);
    return [number(source[0]), number(source[1]), number(source[2])];
  }
  function add3(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function scale3(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function length3(a) { return Math.hypot(a[0], a[1], a[2]); }
  function normalize3(a) {
    const len = length3(a);
    return len > EPS ? scale3(a, 1 / len) : [0, 1, 0];
  }
  function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross3(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }

  function mat4Identity() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  function mat4Multiply(a, b) {
    const out = new Float32Array(16);
    for (let c = 0; c < 4; c += 1) {
      const bi0 = b[c * 4], bi1 = b[c * 4 + 1], bi2 = b[c * 4 + 2], bi3 = b[c * 4 + 3];
      out[c * 4] = a[0] * bi0 + a[4] * bi1 + a[8] * bi2 + a[12] * bi3;
      out[c * 4 + 1] = a[1] * bi0 + a[5] * bi1 + a[9] * bi2 + a[13] * bi3;
      out[c * 4 + 2] = a[2] * bi0 + a[6] * bi1 + a[10] * bi2 + a[14] * bi3;
      out[c * 4 + 3] = a[3] * bi0 + a[7] * bi1 + a[11] * bi2 + a[15] * bi3;
    }
    return out;
  }
  function mat4Translation(x, y, z) {
    const out = mat4Identity(); out[12] = x; out[13] = y; out[14] = z; return out;
  }
  function mat4Scale(x, y, z) {
    const out = mat4Identity(); out[0] = x; out[5] = y; out[10] = z; return out;
  }
  function mat4RotationX(r) {
    const c = Math.cos(r), s = Math.sin(r); const out = mat4Identity();
    out[5] = c; out[6] = s; out[9] = -s; out[10] = c; return out;
  }
  function mat4RotationY(r) {
    const c = Math.cos(r), s = Math.sin(r); const out = mat4Identity();
    out[0] = c; out[2] = -s; out[8] = s; out[10] = c; return out;
  }
  function mat4RotationZ(r) {
    const c = Math.cos(r), s = Math.sin(r); const out = mat4Identity();
    out[0] = c; out[1] = s; out[4] = -s; out[5] = c; return out;
  }
  function mat4Euler(rotation) {
    const r = copy3(rotation, [0, 0, 0]);
    return mat4Multiply(mat4Multiply(mat4RotationZ(r[2]), mat4RotationY(r[1])), mat4RotationX(r[0]));
  }
  function mat4Perspective(fovY, aspect, near, far) {
    const f = 1 / Math.tan(fovY / 2), nf = 1 / (near - far);
    const out = new Float32Array(16);
    out[0] = f / Math.max(EPS, aspect); out[5] = f; out[10] = (far + near) * nf;
    out[11] = -1; out[14] = 2 * far * near * nf;
    return out;
  }
  function mat4LookAt(eye, target, up) {
    const z = normalize3(sub3(eye, target));
    let x = normalize3(cross3(up || [0, 1, 0], z));
    if (length3(x) < EPS) x = [1, 0, 0];
    const y = cross3(z, x);
    const out = mat4Identity();
    out[0] = x[0]; out[1] = y[0]; out[2] = z[0];
    out[4] = x[1]; out[5] = y[1]; out[6] = z[1];
    out[8] = x[2]; out[9] = y[2]; out[10] = z[2];
    out[12] = -dot3(x, eye); out[13] = -dot3(y, eye); out[14] = -dot3(z, eye);
    return out;
  }
  function mat4FromQuaternion(q) {
    const x = q[0], y = q[1], z = q[2], w = q[3];
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    return new Float32Array([
      1 - (yy + zz), xy + wz, xz - wy, 0,
      xy - wz, 1 - (xx + zz), yz + wx, 0,
      xz + wy, yz - wx, 1 - (xx + yy), 0,
      0, 0, 0, 1
    ]);
  }
  function rotationFromTo(from, to) {
    const a = normalize3(from), b = normalize3(to);
    const d = clamp(dot3(a, b), -1, 1);
    if (d > 0.999999) return mat4Identity();
    if (d < -0.999999) {
      let axis = cross3(a, [1, 0, 0]);
      if (length3(axis) < EPS) axis = cross3(a, [0, 1, 0]);
      axis = normalize3(axis);
      return mat4FromQuaternion([axis[0], axis[1], axis[2], 0]);
    }
    const axis = cross3(a, b);
    const q = [axis[0], axis[1], axis[2], 1 + d];
    const len = Math.hypot(q[0], q[1], q[2], q[3]);
    return mat4FromQuaternion(q.map(value => value / len));
  }
  function normalMatrix3(model) {
    const a00 = model[0], a01 = model[4], a02 = model[8];
    const a10 = model[1], a11 = model[5], a12 = model[9];
    const a20 = model[2], a21 = model[6], a22 = model[10];
    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (Math.abs(det) < EPS) return new Float32Array([1,0,0,0,1,0,0,0,1]);
    det = 1 / det;
    const inv = [
      b01 * det,
      (-a22 * a01 + a02 * a21) * det,
      (a12 * a01 - a02 * a11) * det,
      b11 * det,
      (a22 * a00 - a02 * a20) * det,
      (-a12 * a00 + a02 * a10) * det,
      b21 * det,
      (-a21 * a00 + a01 * a20) * det,
      (a11 * a00 - a01 * a10) * det
    ];
    return new Float32Array([inv[0],inv[3],inv[6],inv[1],inv[4],inv[7],inv[2],inv[5],inv[8]]);
  }

  function parseColor(value, fallback) {
    if (Array.isArray(value) && value.length >= 3) return [number(value[0]), number(value[1]), number(value[2]), value.length > 3 ? number(value[3], 1) : 1];
    let hex = null;
    if (typeof value === 'number' && Number.isFinite(value)) hex = Math.max(0, Math.min(0xffffff, Math.floor(value)));
    if (typeof value === 'string') {
      const text = value.trim().replace(/^#/, '').replace(/^0x/i, '');
      if (/^[0-9a-f]{6}$/i.test(text)) hex = parseInt(text, 16);
    }
    if (hex == null) return fallback || [0.19, 0.24, 0.31, 1];
    return [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255, 1];
  }

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Shader compilation failed.';
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  }
  function createProgram(gl) {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, [
      'attribute vec3 aPosition;',
      'attribute vec3 aNormal;',
      'uniform mat4 uViewProjection;',
      'uniform mat4 uModel;',
      'uniform mat3 uNormalMatrix;',
      'varying vec3 vNormal;',
      'varying vec3 vWorldPosition;',
      'void main(){',
      '  vec4 world=uModel*vec4(aPosition,1.0);',
      '  vWorldPosition=world.xyz;',
      '  vNormal=normalize(uNormalMatrix*aNormal);',
      '  gl_Position=uViewProjection*world;',
      '}'
    ].join('\n'));
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, [
      'precision highp float;',
      'uniform vec4 uColor;',
      'varying vec3 vNormal;',
      'varying vec3 vWorldPosition;',
      'void main(){',
      '  vec3 n=normalize(vNormal);',
      '  vec3 light=normalize(vec3(0.38,0.86,0.42));',
      '  float diffuse=max(dot(n,light),0.0)*0.62+max(dot(n,-light),0.0)*0.16;',
      '  float rim=pow(1.0-max(abs(n.z),0.0),2.0)*0.14;',
      '  vec3 color=uColor.rgb*(0.48+0.52*diffuse)+rim;',
      '  gl_FragColor=vec4(color,uColor.a);',
      '}'
    ].join('\n'));
    const program = gl.createProgram();
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    gl.deleteShader(vertex); gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || 'Program link failed.';
      gl.deleteProgram(program); throw new Error(message);
    }
    return program;
  }

  function createGeometry(gl, positions, normals, indices, label) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return { positionBuffer, normalBuffer, indexBuffer, indexCount: indices.length, label: label || '', dynamic: false };
  }
  function deleteGeometry(gl, geometry) {
    if (!geometry) return;
    if (geometry.positionBuffer) gl.deleteBuffer(geometry.positionBuffer);
    if (geometry.normalBuffer) gl.deleteBuffer(geometry.normalBuffer);
    if (geometry.indexBuffer) gl.deleteBuffer(geometry.indexBuffer);
  }

  function faceNormals(positions, indices) {
    const normals = new Float32Array(positions.length);
    for (let i = 0; i < indices.length; i += 3) {
      const ia = indices[i] * 3, ib = indices[i + 1] * 3, ic = indices[i + 2] * 3;
      const a = [positions[ia], positions[ia + 1], positions[ia + 2]];
      const b = [positions[ib], positions[ib + 1], positions[ib + 2]];
      const c = [positions[ic], positions[ic + 1], positions[ic + 2]];
      const n = normalize3(cross3(sub3(b, a), sub3(c, a)));
      for (const index of [ia, ib, ic]) { normals[index] += n[0]; normals[index + 1] += n[1]; normals[index + 2] += n[2]; }
    }
    for (let i = 0; i < normals.length; i += 3) {
      const n = normalize3([normals[i], normals[i + 1], normals[i + 2]]);
      normals[i] = n[0]; normals[i + 1] = n[1]; normals[i + 2] = n[2];
    }
    return normals;
  }

  function wallGeometry(gl, component) {
    const polygon = Array.isArray(component.polygonXZ) ? component.polygonXZ : [];
    if (polygon.length !== 4) return null;
    const y0 = number(component.bottomY), y1 = Math.max(y0 + 1, number(component.topY));
    const p = polygon.map(point => [number(point[0]), number(point[1])]);
    const positions = new Float32Array([
      p[0][0], y0, p[0][1], p[1][0], y0, p[1][1], p[2][0], y0, p[2][1], p[3][0], y0, p[3][1],
      p[0][0], y1, p[0][1], p[1][0], y1, p[1][1], p[2][0], y1, p[2][1], p[3][0], y1, p[3][1]
    ]);
    const indices = new Uint32Array([
      0,2,1, 0,3,2, 4,5,6, 4,6,7,
      0,1,5, 0,5,4, 1,2,6, 1,6,5,
      2,3,7, 2,7,6, 3,0,4, 3,4,7
    ]);
    const geometry = createGeometry(gl, positions, faceNormals(positions, indices), indices, component.id);
    geometry.dynamic = true;
    return geometry;
  }

  function componentColor(component, palette) {
    if (component.kind === 'rear-wall') return palette.wall;
    if (component.kind === 'fabric-stack') return palette.fabric;
    if (component.kind === 'wall-connection') return palette.review;
    if (component.kind === 'foot') return palette.accessory;
    if (component.kind === 'fabric-profile') return palette.fabricProfile;
    return palette.system;
  }

  function linearModel(component, template) {
    const start = copy3(component.start), end = copy3(component.end);
    const direction = sub3(end, start), targetLength = length3(direction);
    if (!(targetLength > EPS)) return null;
    const sourceAxis = AXES[template.sourceAxis] || AXES.x;
    const sourceLength = Math.max(EPS, number(template.sourceSizeMm[template.sourceAxisIndex], 1));
    const scale = [1, 1, 1]; scale[template.sourceAxisIndex] = targetLength / sourceLength;
    const midpoint = scale3(add3(start, end), 0.5);
    return mat4Multiply(mat4Multiply(mat4Translation(midpoint[0], midpoint[1], midpoint[2]), rotationFromTo(sourceAxis, direction)), mat4Scale(scale[0], scale[1], scale[2]));
  }

  function accessoryModel(component, template) {
    const position = copy3(component.position);
    let rotation = mat4Euler(component.rotation || [0, 0, 0]);
    if (component.alignVector && length3(component.alignVector) > EPS) {
      rotation = rotationFromTo(AXES[template.sourceAxis] || AXES.z, component.alignVector);
    }
    let localOffset = mat4Identity();
    if (component.anchor === 'source-min') {
      const axis = template.sourceAxisIndex;
      const offset = [0, 0, 0]; offset[axis] = number(template.sourceSizeMm[axis]) / 2;
      localOffset = mat4Translation(offset[0], offset[1], offset[2]);
    }
    return mat4Multiply(mat4Multiply(mat4Translation(position[0], position[1], position[2]), rotation), localOffset);
  }

  function fabricStackModel(component, template) {
    const position = copy3(component.position);
    const scale = [1, 1, 1];
    const sourceLength = Math.max(1, number(template.sourceSizeMm[template.sourceAxisIndex], 1));
    scale[template.sourceAxisIndex] = Math.max(1, number(component.width, sourceLength)) / sourceLength;
    return mat4Multiply(mat4Multiply(mat4Translation(position[0], position[1], position[2]), mat4Euler(component.rotation || [0, 0, 0])), mat4Scale(scale[0], scale[1], scale[2]));
  }

  function rendererString(gl) {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return gl.getParameter(gl.RENDERER) || 'WebGL';
    return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || gl.getParameter(gl.RENDERER) || 'WebGL';
  }

  async function mount(options) {
    const opts = options || {};
    const canvas = opts.canvas;
    if (!canvas) throw new Error('Pergo Rise WebGL canvas is required.');
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, preserveDrawingBuffer: true, depth: true }) ||
      canvas.getContext('webgl', { antialias: true, alpha: true, preserveDrawingBuffer: true, depth: true });
    if (!gl) throw new Error('WebGL context could not be created.');
    const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
    if (!isWebGL2 && !gl.getExtension('OES_element_index_uint')) throw new Error('32-bit WebGL indices are not supported.');

    const program = createProgram(gl);
    const locations = {
      position: gl.getAttribLocation(program, 'aPosition'), normal: gl.getAttribLocation(program, 'aNormal'),
      viewProjection: gl.getUniformLocation(program, 'uViewProjection'), model: gl.getUniformLocation(program, 'uModel'),
      normalMatrix: gl.getUniformLocation(program, 'uNormalMatrix'), color: gl.getUniformLocation(program, 'uColor')
    };
    gl.useProgram(program); gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.disable(gl.CULL_FACE);

    function decodeBase64ArrayBuffer(value) {
      const text = String(value || '');
      if (!text) throw new Error('Embedded component binary is empty.');
      const decoded = root.atob(text);
      const bytes = new Uint8Array(decoded.length);
      for (let index = 0; index < decoded.length; index += 1) bytes[index] = decoded.charCodeAt(index);
      return bytes.buffer;
    }

    async function loadTemplateAssets() {
      const embedded = root.P3DVPergoRiseTemplateData;
      if (embedded && embedded.manifest && embedded.binaryBase64) {
        return { manifest: embedded.manifest, binary: decodeBase64ArrayBuffer(embedded.binaryBase64), source: 'embedded-script' };
      }
      const [manifestResponse, binaryResponse] = await Promise.all([
        fetch(opts.manifestUrl, { cache: 'no-store' }),
        fetch(opts.binaryUrl, { cache: 'no-store' })
      ]);
      if (!manifestResponse.ok) throw new Error('Component manifest could not be loaded: ' + manifestResponse.status);
      if (!binaryResponse.ok) throw new Error('Component binary could not be loaded: ' + binaryResponse.status);
      return { manifest: await manifestResponse.json(), binary: await binaryResponse.arrayBuffer(), source: 'fetch' };
    }

    const templateAssets = await loadTemplateAssets();
    const manifest = templateAssets.manifest;
    const binary = templateAssets.binary;
    const templates = {};
    Object.keys(manifest.templates || {}).forEach(key => {
      const descriptor = manifest.templates[key];
      const positions = new Float32Array(binary, descriptor.positionOffsetBytes, descriptor.vertexCount * 3);
      const normals = new Float32Array(binary, descriptor.normalOffsetBytes, descriptor.vertexCount * 3);
      const indices = new Uint32Array(binary, descriptor.indexOffsetBytes, descriptor.indexCount);
      templates[key] = { descriptor, geometry: createGeometry(gl, positions, normals, indices, key), sourceAxis: descriptor.sourceAxis, sourceAxisIndex: descriptor.sourceAxisIndex, sourceSizeMm: descriptor.sourceSizeMm };
    });

    const palette = {
      system: parseColor(opts.systemColor, [0.24, 0.29, 0.36, 1]),
      fabricProfile: parseColor(opts.systemColor, [0.24, 0.29, 0.36, 1]),
      fabric: parseColor(opts.panelColor, [0.70, 0.72, 0.75, 1]),
      wall: [0.50, 0.53, 0.57, 1], accessory: [0.12, 0.14, 0.17, 1], review: [0.92, 0.47, 0.10, 1]
    };

    let project = opts.project || null;
    let derived = project && project.derived ? project.derived : project;
    let instances = [];
    let dynamicGeometries = [];
    let missing = [];
    let assemblyRevision = 0;
    let framePending = false;
    let captureOverride = null;
    let destroyed = false;
    let xrSession = null;
    let xrReferenceSpace = null;
    let arPosition = [0, -1.45, -3.0];
    let arYaw = 0;
    let dimensionVisibility = {
      main: !(opts.dimensionVisibility && opts.dimensionVisibility.main === false),
      intermediate: Boolean(opts.dimensionVisibility && opts.dimensionVisibility.intermediate)
    };
    const dimensionElement = root.document.getElementById('pergoDimensions');

    const envelope = () => derived && derived.envelope || { width: 4000, depth: 4000, height: 3000 };
    function formattedMm(value) { return Math.round(number(value)).toLocaleString('tr-TR') + ' mm'; }
    function updateDimensionOverlay() {
      if (!dimensionElement) return;
      dimensionElement.textContent = '';
      dimensionElement.hidden = !dimensionVisibility.main && !dimensionVisibility.intermediate;
      if (dimensionElement.hidden) return;
      const env = envelope();
      const systems = derived && Array.isArray(derived.systems) ? derived.systems : [];
      const add = (className, text) => {
        const element = root.document.createElement('div');
        element.className = 'pergo-dim ' + className; element.textContent = text;
        dimensionElement.appendChild(element);
      };
      if (dimensionVisibility.main) {
        add('width', 'TOPLAM GENİŞLİK · ' + formattedMm(env.width));
        add('depth', 'MAKS. AÇILIM · ' + formattedMm(env.depth));
        add('rear', 'ARKA H · ' + formattedMm(env.height));
        add('front', 'ÖN H · ' + formattedMm(Math.max.apply(null, systems.map(item => number(item.frontHeight)).concat([0]))));
      }
      if (dimensionVisibility.intermediate && systems.length) {
        add('intermediate', systems.map((item, index) => 'P' + (index + 1) + ': ' + formattedMm(item.width) + ' × ' + formattedMm(item.opening) + ' · ' + number(item.slopeDegrees).toFixed(2) + '° · ray aksları ' + (item.railAxes || []).map(axis => Math.round(number(axis))).join(', ') + ' mm').join('  |  '));
      }
    }
    function defaultCamera() {
      const env = envelope(), span = Math.max(number(env.width, 4000), number(env.depth, 4000), number(env.height, 3000));
      const target = [0, number(env.height) * 0.42, number(env.depth) * 0.42];
      return { target, yaw: -0.82, pitch: 0.43, radius: Math.max(1800, span * 1.62), zoom: 1 };
    }
    let camera = defaultCamera();

    function cameraFromSnapshot(snapshot) {
      if (!snapshot || !Array.isArray(snapshot.position) || !Array.isArray(snapshot.target)) return;
      const target = copy3(snapshot.target), delta = sub3(copy3(snapshot.position), target), radius = Math.max(10, length3(delta));
      camera.target = target; camera.radius = radius; camera.pitch = Math.asin(clamp(delta[1] / radius, -1, 1));
      camera.yaw = Math.atan2(delta[0], delta[2]); camera.zoom = clamp(number(snapshot.zoom, 1), 0.35, 3.5);
    }
    cameraFromSnapshot(opts.cameraState);

    function cameraPosition() {
      const cp = Math.cos(camera.pitch);
      return [
        camera.target[0] + camera.radius * cp * Math.sin(camera.yaw),
        camera.target[1] + camera.radius * Math.sin(camera.pitch),
        camera.target[2] + camera.radius * cp * Math.cos(camera.yaw)
      ];
    }
    function cameraSnapshot() { return { position: cameraPosition(), target: camera.target.slice(), zoom: camera.zoom }; }
    function post(type, payload) {
      if (root.parent === root) return;
      root.parent.postMessage({ source: 'product-3d-viewer', type, sessionId: String(opts.sessionId || ''), ...(payload || {}) }, '*');
    }
    function publishCameraState() { post('camera-state', { cameraState: cameraSnapshot() }); }

    function clearDynamic() { dynamicGeometries.forEach(item => deleteGeometry(gl, item)); dynamicGeometries = []; }
    function buildInstances(revision) {
      clearDynamic(); instances = []; missing = [];
      derived = project && project.derived ? project.derived : project;
      if (!derived || !Array.isArray(derived.components)) { requestRender(); return; }
      derived.components.forEach(component => {
        let geometry = null, model = null, template = null;
        if (component.kind === 'rear-wall') {
          geometry = wallGeometry(gl, component); model = mat4Identity(); if (geometry) dynamicGeometries.push(geometry);
        } else {
          template = templates[component.template];
          if (template) {
            geometry = template.geometry;
            if (component.kind === 'fabric-stack') model = fabricStackModel(component, template);
            else if (component.start && component.end) model = linearModel(component, template);
            else model = accessoryModel(component, template);
          }
        }
        if (!geometry || !model) {
          missing.push({ id: component.id, kind: component.kind, template: component.template }); return;
        }
        instances.push({ component, geometry, model, color: componentColor(component, palette), normalMatrix: normalMatrix3(model) });
      });
      assemblyRevision = Math.max(assemblyRevision + 1, number(revision, assemblyRevision + 1));
      updateDimensionOverlay(); updateTestState(); requestRender();
    }

    function bindGeometry(geometry) {
      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.positionBuffer);
      gl.enableVertexAttribArray(locations.position); gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.normalBuffer);
      gl.enableVertexAttribArray(locations.normal); gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
    }
    function draw(viewProjection, rootMatrix, transparent) {
      if (destroyed) return;
      gl.useProgram(program);
      gl.clearColor(0.035, 0.055, 0.085, transparent ? 0 : 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(locations.viewProjection, false, viewProjection);
      let lastGeometry = null;
      instances.forEach(instance => {
        if (instance.geometry !== lastGeometry) { bindGeometry(instance.geometry); lastGeometry = instance.geometry; }
        const model = rootMatrix ? mat4Multiply(rootMatrix, instance.model) : instance.model;
        gl.uniformMatrix4fv(locations.model, false, model);
        gl.uniformMatrix3fv(locations.normalMatrix, false, normalMatrix3(model));
        gl.uniform4fv(locations.color, instance.color);
        gl.drawElements(gl.TRIANGLES, instance.geometry.indexCount, gl.UNSIGNED_INT, 0);
      });
    }
    function resize() {
      if (xrSession) return;
      const dpr = Math.min(2, Math.max(1, root.devicePixelRatio || 1));
      const width = captureOverride ? captureOverride.width : Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = captureOverride ? captureOverride.height : Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height);
    }
    function render() {
      framePending = false; if (xrSession) return;
      resize();
      const env = envelope();
      const far = Math.max(10000, Math.max(number(env.width), number(env.depth), number(env.height)) * 12);
      const projection = mat4Perspective(Math.PI / (3 * camera.zoom), canvas.width / Math.max(1, canvas.height), 10, far);
      const view = mat4LookAt(cameraPosition(), camera.target, [0, 1, 0]);
      draw(mat4Multiply(projection, view), null, false);
    }
    function requestRender() {
      if (framePending || destroyed || xrSession) return;
      framePending = true; root.requestAnimationFrame(render);
    }

    function updateColors(systemColor, panelColor) {
      palette.system = parseColor(systemColor, palette.system);
      palette.fabricProfile = parseColor(systemColor, palette.fabricProfile);
      palette.fabric = parseColor(panelColor, palette.fabric);
      instances.forEach(instance => { instance.color = componentColor(instance.component, palette); });
      updateTestState();
      requestRender();
    }

    const pointer = { active: false, mode: 'rotate', x: 0, y: 0, id: null };
    canvas.addEventListener('pointerdown', event => {
      pointer.active = true; pointer.id = event.pointerId; pointer.x = event.clientX; pointer.y = event.clientY;
      pointer.mode = (event.button === 1 || event.button === 2 || event.shiftKey) ? 'pan' : 'rotate';
      canvas.setPointerCapture(event.pointerId); event.preventDefault();
    });
    canvas.addEventListener('pointermove', event => {
      if (!pointer.active || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y; pointer.x = event.clientX; pointer.y = event.clientY;
      if (pointer.mode === 'rotate') {
        camera.yaw -= dx * 0.007; camera.pitch = clamp(camera.pitch + dy * 0.006, -1.25, 1.35);
      } else {
        const speed = camera.radius / Math.max(320, canvas.clientHeight) * 0.9;
        const eye = cameraPosition(), forward = normalize3(sub3(camera.target, eye)), right = normalize3(cross3(forward, [0, 1, 0])), up = normalize3(cross3(right, forward));
        camera.target = add3(camera.target, add3(scale3(right, -dx * speed), scale3(up, dy * speed)));
      }
      requestRender();
    });
    function endPointer(event) {
      if (!pointer.active || event.pointerId !== pointer.id) return;
      pointer.active = false; try { canvas.releasePointerCapture(event.pointerId); } catch (error) {} publishCameraState();
    }
    canvas.addEventListener('pointerup', endPointer); canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('contextmenu', event => event.preventDefault());
    canvas.addEventListener('wheel', event => {
      camera.radius = clamp(camera.radius * Math.exp(event.deltaY * 0.001), 150, 100000); requestRender(); publishCameraState(); event.preventDefault();
    }, { passive: false });

    function resetCamera() { camera = defaultCamera(); requestRender(); publishCameraState(); }
    function zoomCamera(factor) { camera.zoom = clamp(camera.zoom * number(factor, 1), 0.35, 3.5); requestRender(); publishCameraState(); }
    function setCameraPreset(name) {
      const env = envelope(), w = number(env.width), d = number(env.depth), h = number(env.height), span = Math.max(w, d, h);
      const target = [0, h * 0.42, d * 0.42];
      const positions = {
        perspective: [w * 1.0, h * 0.84, d * 1.22],
        isometric: [w * 1.15, h * 1.12, d * 1.35],
        front: [0, h * 0.48, d * 1.82],
        rear: [0, h * 0.48, -d * 1.42],
        left: [-w * 1.65, h * 0.48, d * 0.42],
        right: [w * 1.65, h * 0.48, d * 0.42],
        top: [0, Math.max(h * 2.15, span * 1.72), d * 0.42]
      };
      const position = positions[String(name || '').toLowerCase()] || positions.perspective;
      const delta = sub3(position, target); camera.target = target; camera.radius = Math.max(span, length3(delta));
      camera.pitch = Math.asin(clamp(delta[1] / camera.radius, -1, 1)); camera.yaw = Math.atan2(delta[0], delta[2]); camera.zoom = 0.94;
      requestRender(); publishCameraState(); return cameraSnapshot();
    }
    root.setP3DVCameraPreset = setCameraPreset;

    function capture(preset) {
      const saved = { target: camera.target.slice(), yaw: camera.yaw, pitch: camera.pitch, radius: camera.radius, zoom: camera.zoom };
      const env = envelope(), w = number(env.width), d = number(env.depth), h = number(env.height), span = Math.max(w, d, h);
      const target = [0, h * 0.4, d * 0.42];
      const definitions = {
        'front-left': [-w * 1.15, h * 0.86, -d * 1.12], 'front-right': [w * 1.15, h * 0.86, -d * 1.12],
        'back-left': [-w * 1.15, h * 0.86, d * 1.38], 'back-right': [w * 1.15, h * 0.86, d * 1.38],
        'default': [w * 1.0, h * 0.84, d * 1.22]
      };
      const pos = definitions[preset] || definitions.default;
      camera.target = target; const delta = sub3(pos, target); camera.radius = Math.max(span, length3(delta));
      camera.pitch = Math.asin(clamp(delta[1] / camera.radius, -1, 1)); camera.yaw = Math.atan2(delta[0], delta[2]); camera.zoom = 0.94;
      const cssAspect = Math.max(0.5, canvas.clientWidth / Math.max(1, canvas.clientHeight));
      // PDF captures are intentionally bounded. Four WebGL snapshots are retained until
      // the PDF blob is built; oversized drawing buffers can terminate Chromium on
      // memory-constrained devices. 1024 px preserves A4 print clarity without
      // changing assembly geometry, camera state or the live viewer resolution.
      const captureWidth = Math.min(1024, Math.max(800, Math.round(canvas.clientWidth)));
      captureOverride = { width: captureWidth, height: Math.max(540, Math.round(captureWidth / cssAspect)) };
      render();
      const result = { dataUrl: canvas.toDataURL('image/jpeg', 0.78), width: canvas.width, height: canvas.height, preset: String(preset || 'default') };
      captureOverride = null; camera = saved; render(); publishCameraState(); return result;
    }
    root.captureFreedom3D = capture;

    async function getArCapabilities() {
      if (!root.isSecureContext) return { supported: false, reason: 'secure-context', message: 'AR için uygulama HTTPS üzerinden açılmalıdır.' };
      if (!root.navigator.xr || typeof root.navigator.xr.isSessionSupported !== 'function') return { supported: false, reason: 'webxr-missing', message: 'Bu tarayıcı WebXR artırılmış gerçeklik özelliğini desteklemiyor.' };
      try {
        const supported = await root.navigator.xr.isSessionSupported('immersive-ar');
        const env = envelope();
        return { supported: Boolean(supported), reason: supported ? '' : 'immersive-ar-unsupported', message: supported ? ('AR hazır · ' + Math.round(number(env.width)) + ' mm gerçek ölçekte 1:1 yerleştirilir.') : 'Cihaz immersive-ar oturumunu desteklemiyor.' };
      } catch (error) { return { supported: false, reason: 'capability-error', message: 'AR desteği denetlenemedi: ' + error.message }; }
    }
    root.getP3DVARCapabilities = getArCapabilities;

    function arRootMatrix() {
      return mat4Multiply(mat4Multiply(mat4Translation(arPosition[0], arPosition[1], arPosition[2]), mat4RotationY(arYaw)), mat4Scale(0.001, 0.001, 0.001));
    }
    function onXRFrame(time, frame) {
      if (!xrSession) return;
      xrSession.requestAnimationFrame(onXRFrame);
      const pose = frame.getViewerPose(xrReferenceSpace); if (!pose) return;
      const layer = xrSession.renderState.baseLayer; gl.bindFramebuffer(gl.FRAMEBUFFER, layer.framebuffer);
      pose.views.forEach(view => {
        const viewport = layer.getViewport(view); gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        const viewProjection = mat4Multiply(new Float32Array(view.projectionMatrix), new Float32Array(view.transform.inverse.matrix));
        draw(viewProjection, arRootMatrix(), true);
      });
    }
    async function startAR() {
      if (xrSession) return { ok: true, message: 'AR oturumu zaten açık.' };
      const capability = await getArCapabilities(); if (!capability.supported) return { ok: false, message: capability.message };
      try {
        if (gl.makeXRCompatible) await gl.makeXRCompatible();
        xrSession = await root.navigator.xr.requestSession('immersive-ar', { optionalFeatures: ['local-floor', 'dom-overlay'], domOverlay: { root: root.document.body } });
        const layer = new XRWebGLLayer(xrSession, gl, { alpha: true, antialias: true });
        xrSession.updateRenderState({ baseLayer: layer }); xrReferenceSpace = await xrSession.requestReferenceSpace('local');
        const env = envelope(); arPosition = [0, -1.45, -Math.max(2.2, number(env.width) * 0.0007 + number(env.depth) * 0.00035)]; arYaw = 0;
        root.document.body.classList.add('p3dv-ar-active');
        xrSession.addEventListener('end', () => { xrSession = null; xrReferenceSpace = null; root.document.body.classList.remove('p3dv-ar-active'); requestRender(); post('ar-session-ended'); }, { once: true });
        xrSession.requestAnimationFrame(onXRFrame); post('ar-status', { message: 'Pergo Rise parametrik assembly gerçek ölçekte 1:1 yerleştirildi.', tone: 'success' });
        return { ok: true, message: 'Kamera açıldı. Pergo Rise assembly 1:1 ölçekte çizilir; konumu AR kontrolleriyle ayarlayın.' };
      } catch (error) {
        xrSession = null; xrReferenceSpace = null;
        return { ok: false, retryInsideViewer: ['NotAllowedError','SecurityError','InvalidStateError'].includes(error && error.name), message: 'AR oturumu başlatılamadı: ' + (error && error.message || error) };
      }
    }
    root.startP3DVAR = startAR;

    const arControls = root.document.getElementById('pergoArControls');
    function bindAr(id, fn) { const el = root.document.getElementById(id); if (el) el.addEventListener('click', fn); }
    bindAr('pergoArForward', () => { arPosition[2] -= 0.1; }); bindAr('pergoArBack', () => { arPosition[2] += 0.1; });
    bindAr('pergoArLeft', () => { arPosition[0] -= 0.1; }); bindAr('pergoArRight', () => { arPosition[0] += 0.1; });
    bindAr('pergoArUp', () => { arPosition[1] += 0.02; }); bindAr('pergoArDown', () => { arPosition[1] -= 0.02; });
    bindAr('pergoArRotateLeft', () => { arYaw -= Math.PI / 36; }); bindAr('pergoArRotateRight', () => { arYaw += Math.PI / 36; });
    bindAr('pergoArExit', () => { if (xrSession) xrSession.end(); });
    if (arControls) arControls.hidden = false;

    function updateTestState() {
      root.__P3DV_PERGO_TEST__ = {
        ready: true,
        renderer: rendererString(gl),
        webglVersion: isWebGL2 ? 'WebGL2' : 'WebGL1',
        projectHash: derived && derived.projectHash || '',
        counts: derived && derived.counts || {},
        instanceCount: instances.length,
        assemblyRevision,
        missing: missing.slice(),
        camera: cameraSnapshot(),
        sessionId: String(opts.sessionId || ''),
        staticState: derived && derived.staticState || '',
        templateMapping: Object.keys(manifest.templates || {}).map(key => ({ key, sourceNode: manifest.templates[key].sourceNode, confidence: manifest.templates[key].confidence, productionGeometry: manifest.templates[key].productionGeometry })),
        crossSectionPolicy: manifest.geometryPolicy,
        iframeStableUpdates: true,
        animationEnabled: false,
        dimensionVisibility: { ...dimensionVisibility },
        palette: { system: palette.system.slice(), panel: palette.fabric.slice(), fabricProfile: palette.fabricProfile.slice() },
        dimensionSummary: {
          width: number(envelope().width), depth: number(envelope().depth), height: number(envelope().height),
          systems: derived && Array.isArray(derived.systems) ? derived.systems.map(item => ({ width: number(item.width), opening: number(item.opening), rearHeight: number(item.rearHeight), frontHeight: number(item.frontHeight), slopeDegrees: number(item.slopeDegrees), railAxes: (item.railAxes || []).slice() })) : []
        },
        cameraPresets: ['perspective','isometric','front','rear','left','right','top'],
        arScaleMetersPerMillimeter: 0.001
      };
    }

    root.addEventListener('message', event => {
      if (event.source !== root.parent || !event.data || event.data.source !== 'product-3d-parent' || event.data.sessionId !== String(opts.sessionId || '')) return;
      const data = event.data;
      if (data.type === 'set-pergo-rise-project') {
        project = data.project || null; buildInstances(data.revision); post('pergo-rise-project-applied', { revision: number(data.revision), projectHash: derived && derived.projectHash || '' });
      } else if (data.type === 'reset-camera') resetCamera();
      else if (data.type === 'zoom-camera') zoomCamera(data.factor);
      else if (data.type === 'set-camera-preset') setCameraPreset(data.preset);
      else if (data.type === 'set-dimension-visibility') {
        dimensionVisibility = { main: !(data.visibility && data.visibility.main === false), intermediate: Boolean(data.visibility && data.visibility.intermediate) };
        updateDimensionOverlay(); updateTestState();
      }
      else if (data.type === 'set-color-state') {
        const systemColor = data.systemColor && data.systemColor.hex ? data.systemColor.hex : data.systemColor;
        const panelColor = data.panelColor && data.panelColor.hex ? data.panelColor.hex : data.panelColor;
        updateColors(systemColor, panelColor);
        post('color-state-applied', { revision: number(data.revision), colorMode: data.colorMode === 'ral' ? 'ral' : 'default' });
      }
      else if (data.type === 'viewport-resized') { resize(); requestRender(); }
      else if (data.type === 'set-product-open-state') post('product-open-state-applied', { revision: number(data.revision) });
      else if (data.type === 'set-panel-master-open') post('panel-master-open-applied', { revision: number(data.revision), open: Boolean(data.open) });
    });

    root.addEventListener('resize', () => { resize(); requestRender(); });
    buildInstances(1); resize(); render(); updateTestState();
    const capability = await getArCapabilities(); post('ar-capability', capability);
    post('viewer-ready', {
      liveProductState: true, livePanelMaster: true, liveColorState: true, livePergoRise: true,
      pergoRiseLoadStatus: 'ready-offline-webgl', pergoRiseProjectHash: derived && derived.projectHash || '',
      pergoRiseComponentMapping: root.__P3DV_PERGO_TEST__.templateMapping,
      webgl: { version: isWebGL2 ? 'WebGL2' : 'WebGL1', renderer: rendererString(gl) },
      staticAssembly: true, animationEnabled: false, iframeStableUpdates: true
    });

    return {
      setProject(nextProject, revision) { project = nextProject; buildInstances(revision); },
      setColors(systemColor, panelColor) { updateColors(systemColor, panelColor); },
      render, capture, setCameraPreset, getTestState() { return root.__P3DV_PERGO_TEST__; },
      destroy() {
        destroyed = true; clearDynamic(); Object.keys(templates).forEach(key => deleteGeometry(gl, templates[key].geometry));
        gl.deleteProgram(program); if (xrSession) xrSession.end();
      }
    };
  }

  root.P3DVPergoRiseWebGLViewer = Object.freeze({ mount });
})(typeof window !== 'undefined' ? window : globalThis);
