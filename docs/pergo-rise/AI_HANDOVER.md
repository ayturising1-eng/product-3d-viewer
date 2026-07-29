# AI Handover — P3DV V3.52

Kanonik devam noktası `p3dv.v3.52.zip` paketidir. Önce `P3DV Development Protocol/00_START_HERE.md`, `PROJECT_STATE.md`, `DECISIONS.md` ve `TODO.md` okunmalıdır.

Pergo Rise kaynakları `products/pergo-rise/`, PLMR normalize runtime `products/pergo-rise/plmr-runtime/`, component şablonları `assets/pergo-rise/` altındadır. Ham `PergoRise.glb` teslim paketine dahil değildir; kaynak Library’de dış referans olarak korunur.

Veri zinciri: `P3DVPergoRiseProduct.create()` → `P3DVPergoRiseDerivedGeometry.build()` → component listesi → `P3DVPergoRiseWebGLViewer.mount()`.

V3.52 büyük önizleme kuralı: `Önizlemeyi Büyüt` yeni iframe oluşturmaz. `body.preview-expanded` ile mevcut preview paneli viewport’u kaplar; üst toolbar ve sağ toolbox görünür olur. Kamera, OrbitControls ve viewer session korunur.

V3.52 canlı renk kuralı: sistem/panel renkleri parent’tan `set-color-state` mesajıyla gönderilir. Pergo Rise yalnız mevcut instance materyallerini günceller. `setColorMode` veya `applyColorFinish` içinde `renderViewer()` kullanılması yasaktır.

Hücre seçenekleri ve toolbox komutlarının üretim/geometri anlamı kullanıcı tarafından açıkça tarif edilmeden uydurulmaz. Bekleyen maddeler Development Protocol `TODO.md` dosyasındadır.

Yeni parametre ekleme sırası:
1. PLMR Project Model/normalize alanını doğrula.
2. Derived Geometry component sözleşmesine taşı.
3. Mevcut component template ile instance et; bilinmeyen kesit uydurma.
4. Canlı postMessage, kamera ve iframe sahipliğini koru.
5. Node, headed Chromium/WebGL, PDF ve temiz re-extract testlerini çalıştır.

Yasak regresyonlar: bütün GLB ölçekleme, iframe srcdoc yenileme ile renk/ölçü güncelleme, Freedom geometrisi kopyalama, Pergo animasyonu, düşük güvenli componenti üretim geometrisi ilan etme, ham GLB’yi teslim ZIP’ine geri koyma.
