(function (root) {
  'use strict';

  const PRODUCT_ID = 'pergo-rise-3d-v1';
  const PROJECT_SCHEMA = 'p3dv-parametric-product-v1';
  const ASSEMBLY_SCHEMA = 'p3dv-static-assembly-v1';

  const DEFAULT_RAW = Object.freeze({
    product: 'Pergo Rise',
    systemCount: '1',
    width: '4000',
    opening: '4500',
    rearHeight: '3200',
    frontHeight: '2600',
    rayCount: '',
    postCount: '',
    parapet: 'HAYIR',
    parapetHeight: 0,
    glassTrack: 'HAYIR',
    sideTrack: 'HAYIR',
    structureColor: 'RAL 7016 TEXT.',
    fabric: 'C 1602 - M (8116-1622)',
    fabricProfiles: 'RAL 1013',
    motor: 'RISING MOTOR',
    remote: 'RISING 6 CHANNELS',
    led: 'YES',
    dimmer: 'NO',
    extras: 'THE MOTOR IS ON RIGHT',
    triangleJoinery: 'HAYIR',
    waterStandard: 'EVET',
    waterOutletPlacement: 'BOTH',
    __rearSupport: { type: 'wall' }
  });

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function asText(value, fallback) {
    const text = String(value === undefined || value === null ? '' : value).trim();
    return text || String(fallback === undefined ? '' : fallback);
  }
  function stableStringify(value) {
    if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
    if (value && typeof value === 'object') {
      return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
    }
    return JSON.stringify(value);
  }
  function hashString(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
  }

  function normalizeRaw(raw) {
    const source = { ...clone(DEFAULT_RAW), ...(raw || {}) };
    source.systemCount = asText(source.systemCount, '1');
    source.width = asText(source.width, '4000');
    source.opening = asText(source.opening, '4500');
    source.rearHeight = asText(source.rearHeight, '3200');
    source.frontHeight = asText(source.frontHeight, '2600');
    source.rayCount = String(source.rayCount || '').trim();
    source.postCount = String(source.postCount || '').trim();
    source.__rearSupport = source.__rearSupport && typeof source.__rearSupport === 'object'
      ? clone(source.__rearSupport) : { type: 'wall' };
    return source;
  }

  function create(raw) {
    if (!root.PulumurGeometry || typeof root.PulumurGeometry.normalizeInput !== 'function') {
      throw new Error('PLMR Pergo Rise geometry runtime is not loaded.');
    }
    const input = normalizeRaw(raw);
    const normalized = root.PulumurGeometry.normalizeInput(input);
    const project = {
      schema: PROJECT_SCHEMA,
      productId: PRODUCT_ID,
      staticState: 'STATIC_OPEN_REAR_STACKED',
      source: {
        projectModel: 'PLMR Pergo Rise Project Model',
        rules: 'PLMR.V.13.92(1)/peri01Geometry.js',
        multiPositionRules: 'PLMR.V.13.92(1)/core/multiPositionRules.js'
      },
      input,
      normalized
    };
    project.hash = hashString(stableStringify({ input, normalized: {
      systems: normalized.systems,
      positions: normalized.positions,
      postCenterXs: normalized.postCenterXs,
      frontPostWidths: normalized.frontPostWidths,
      independentPergoRiseGroups: normalized.independentPergoRiseGroups,
      rearSupport: normalized.rearSupport,
      backWallState: normalized.backWallState,
      topBackWallGridState: normalized.topBackWallGridState,
      gutterEditState: normalized.gutterEditState
    } }));
    return project;
  }

  function serialize(project) {
    if (!project || project.schema !== PROJECT_SCHEMA || project.productId !== PRODUCT_ID) {
      throw new Error('Pergo Rise project schema is invalid.');
    }
    return JSON.stringify({
      schema: PROJECT_SCHEMA,
      productId: PRODUCT_ID,
      staticState: project.staticState || 'STATIC_OPEN_REAR_STACKED',
      source: clone(project.source || {}),
      input: clone(project.input || {}),
      hash: String(project.hash || '')
    });
  }

  function load(serialized) {
    const saved = typeof serialized === 'string' ? JSON.parse(serialized) : clone(serialized || {});
    if (saved.schema !== PROJECT_SCHEMA || saved.productId !== PRODUCT_ID || !saved.input) {
      throw new Error('Saved Pergo Rise project is incompatible.');
    }
    const project = create(saved.input);
    const savedHash = String(saved.hash || '');
    return {
      project,
      savedHash,
      currentHash: project.hash,
      stale: Boolean(savedHash && savedHash !== project.hash)
    };
  }

  root.P3DVPergoRiseProduct = Object.freeze({
    PRODUCT_ID,
    PROJECT_SCHEMA,
    ASSEMBLY_SCHEMA,
    DEFAULT_RAW,
    create,
    serialize,
    load,
    normalizeRaw,
    stableStringify,
    hashString
  });
  if (typeof module !== 'undefined') module.exports = root.P3DVPergoRiseProduct;
})(typeof window !== 'undefined' ? window : globalThis);
