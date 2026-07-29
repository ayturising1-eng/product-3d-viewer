const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const pdfSource = fs.readFileSync(path.join(root, 'p3dv-pdf.js'), 'utf8');
function assert(condition, message) { if (!condition) throw new Error(message); }
let checks = 0;
function check(condition, message) { checks += 1; assert(condition, message); }

check(indexSource.includes('p3dv.v3.46'), 'V3.31 version missing');
check(indexSource.includes('<script src="./p3dv-pdf.js"></script>'), 'local PDF engine script missing');
check(!indexSource.includes('cdn.jsdelivr.net/npm/jspdf'), 'external jsPDF CDN must be removed');
check(indexSource.includes('Hızlı Testler'), 'quick-test section missing');
check(indexSource.includes('quickTestStatus'), 'quick-test status missing');
for (let index = 1; index <= 10; index += 1) {
  check(indexSource.includes(`id="quickTestBtn${index}"`), `Test ${index} button missing`);
  check(indexSource.includes(`>Test ${index}<`), `Test ${index} label missing`);
}

for (const token of [
  'function quickTestScenario(index)',
  'function applyQuickTestScenario(index)',
  'function resetQuickTestState(config)',
  'function assignQuickTestProducts(config)',
  'function quickTestProfile(',
  'function quickTestPlacement(',
  'function fallbackPdfView(preset)',
  'function drawContainedImage(',
  'function drawSectionTable(',
  "for (let quickIndex = 1; quickIndex <= 10; quickIndex += 1)",
  "window.jspdf && window.jspdf.jsPDF"
]) check(appSource.includes(token), `missing app token: ${token}`);

for (const token of [
  'class P3DVPdf',
  'buildBlob()',
  'addImage(dataUrl',
  'save(filename)',
  'window.jspdf = { jsPDF: P3DVPdf }'
]) check(pdfSource.includes(token), `missing PDF engine token: ${token}`);

const ids = [...indexSource.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(new Set(ids).size === ids.length, 'duplicate HTML id found');
check((indexSource.match(/id="quickTestBtn\d+"/g) || []).length === 10, 'quick-test button count must be exactly 10');

console.log(JSON.stringify({ pass: true, checks, quickButtons: 10, localPdfEngineBytes: Buffer.byteLength(pdfSource) }));
