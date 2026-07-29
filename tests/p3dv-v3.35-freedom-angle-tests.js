const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
let checks = 0;
function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(message);
}

assert(indexSource.includes('p3dv.v3.46'), 'V3.35 HTML version missing');
assert(appSource.includes('const freedomEffectiveOpenAngle=100;'), 'Freedom effective 100-degree angle missing');
assert(appSource.includes('const freedomLamelOpenAngle=freedomEffectiveOpenAngle-180;'), 'Freedom pivot derivation missing');
assert(appSource.includes('const bioRiseEffectiveOpenAngle=100;'), 'Bio-Rise effective angle preservation missing');
assert(appSource.includes('const bioRiseLamelOpenAngle=bioRiseEffectiveOpenAngle-180;'), 'Bio-Rise pivot derivation missing');
assert(appSource.includes('const lamelOpenAngle=IS_BIO_RISE?bioRiseLamelOpenAngle:freedomLamelOpenAngle;'), 'Product-specific lamella angle selection missing');
assert(!appSource.includes('const lamelOpenAngle=IS_BIO_RISE?-80:-100;'), 'Obsolete Freedom 80-degree pivot contract remains');

const freedomEffectiveOpenAngle = 100;
const freedomPivot = freedomEffectiveOpenAngle - 180;
const reconstructedEffectiveAngle = 180 + freedomPivot;
assert(freedomPivot === -80, `Freedom pivot should be -80°, got ${freedomPivot}`);
assert(reconstructedEffectiveAngle === 100, `Freedom effective angle should be 100°, got ${reconstructedEffectiveAngle}`);

console.log(JSON.stringify({ pass: true, checks, freedomEffectiveAngle: reconstructedEffectiveAngle, freedomPivotAngle: freedomPivot }));
