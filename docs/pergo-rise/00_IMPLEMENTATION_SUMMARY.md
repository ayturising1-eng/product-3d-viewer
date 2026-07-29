# P3DV V3.50 — PLMR Studio Arayüzü ve Pergo Rise Parametrik 3D Assembly

## Sonuç

V3.50 ile PLMR.V.13.92(1) Studio arayüz kabuğu P3DV içine taşındı. Üst başlık, proje kontrol rayı, dört kartlı veri alanı ve sağ 3D ön izleme düzeni kaynak arayüz ölçü ve stil mantığıyla kuruldu. Hücrelerin nihai iş anlamları sonraki kullanıcı tariflerine bırakıldı.

P3DV V3.47 baseline üzerinde Pergo Rise için PLMR verisinden üretilen statik parametrik 3D assembly katmanı eklendi. Bütün `PergoRise.glb` modeli X/Y/Z yönlerinde tek parça ölçeklenmez. GLB içindeki doğrulanmış profil ve aksesuar meshleri component şablonlarına ayrılır; PLMR normalize ve derived geometry çıktısına göre instance edilir.

## Veri akışı

`PLMR Pergo Rise Project Model` → `PLMR normalizeInput/peri01Geometry` → `P3DV Pergo Rise Derived Geometry` → `Component Instance Listesi` → `GLB Component Templates` → `Static WebGL Assembly` → `Viewer / PDF / AR`

## Desteklenen kapsam

- Sistem ve poz adedi
- Yan yana sistemler ve 13 mm PLMR fiziksel sistem aralığı
- `:` sözdizimiyle bağımsız gruplar ve grup boşlukları
- Poz başına genişlik, açılım, arka/ön yükseklik ve eğim
- PLMR ray/dikme aksları ve GLB gerçek profil instance'ları
- Ön/arka profiller, grup bazlı oluklar, kumaş profilleri
- Geriye toplanmış statik kumaş
- PLMR arka duvar gridinden gerçek 3D katı duvar
- Görünür duvar bağlantı aksesuar adayı
- Ölçü değişiminde iframe, WebGL context, kamera ve Orbit state korunarak canlı assembly güncellemesi

## Bilinçli sınırlar

Animasyon eklenmedi. Freedom geometrisi kullanılmadı. PLMR 2D kaynak kuralları değiştirilmedi. Bilinmeyen kesit/ölçü uydurulmadı. Üretim güveni kesin olmayan componentler üretim geometrisi dışında işaretlendi.
