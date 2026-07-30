'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
let checks = 0;
function check(value, message) { checks += 1; if (!value) throw new Error(message); }
function sha(buffer) { return crypto.createHash('sha256').update(buffer).digest('hex'); }

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const viewer = fs.readFileSync(path.join(root, 'products/pergo-rise/pergo-rise-webgl-viewer.js'), 'utf8');
const dataPath = path.join(root, 'assets/pergo-rise/component-templates-data.js');
const dataSource = fs.readFileSync(dataPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/pergo-rise/component-templates.json'), 'utf8'));
const binary = fs.readFileSync(path.join(root, 'assets/pergo-rise/component-templates.bin'));

check(html.includes('p3dv.v3.53'), 'V3.49 HTML token is missing');
check(fs.existsSync(dataPath) && fs.statSync(dataPath).size > 2_800_000, 'Embedded component data asset is missing or unexpectedly small');
check(app.includes('./assets/pergo-rise/component-templates-data.js'), 'Embedded component data script is not injected into the Pergo iframe');
check(app.indexOf('./assets/pergo-rise/component-templates-data.js') < app.indexOf('./products/pergo-rise/pergo-rise-webgl-viewer.js'), 'Embedded data must load before the WebGL viewer');
check(viewer.includes('root.P3DVPergoRiseTemplateData'), 'Viewer does not inspect the embedded template payload');
check(viewer.includes("source: 'embedded-script'"), 'Embedded-script source marker is missing');
check(viewer.includes("source: 'fetch'"), 'HTTP/HTTPS fetch fallback marker is missing');
check(viewer.indexOf('root.P3DVPergoRiseTemplateData') < viewer.indexOf('fetch(opts.manifestUrl'), 'Embedded data must be preferred before fetch fallback');
check(viewer.includes('decodeBase64ArrayBuffer'), 'Base64 binary decoder is missing');
check(viewer.includes('new Float32Array(binary, descriptor.positionOffsetBytes'), 'Decoded binary is not connected to component template positions');
check(viewer.includes('new Uint32Array(binary, descriptor.indexOffsetBytes'), 'Decoded binary is not connected to component template indices');

const sandbox = { globalThis: {}, window: undefined };
vm.createContext(sandbox);
vm.runInContext(dataSource, sandbox, { filename: 'component-templates-data.js', timeout: 10000 });
const embedded = sandbox.globalThis.P3DVPergoRiseTemplateData;
check(Boolean(embedded && embedded.manifest && embedded.binaryBase64), 'Embedded payload did not publish its global contract');
check(embedded.manifest.schema === manifest.schema && Object.keys(embedded.manifest.templates).length === 8, 'Embedded manifest does not match the canonical eight-template contract');
const decoded = Buffer.from(embedded.binaryBase64, 'base64');
check(decoded.length === binary.length, 'Embedded component binary byte length differs from the canonical binary');
check(sha(decoded) === sha(binary), 'Embedded component binary is not lossless');

console.log(JSON.stringify({ pass: true, checks, embeddedBytes: decoded.length, embeddedSha256: sha(decoded), mode: 'file-safe embedded-first / fetch-fallback' }));
