# Bilinen Konular ve Kararlar

## Açık doğrulamalar

1. `Shape005` duvar/ray bağlantı aksesuarı eşlemesi `LOW_REVIEW_REQUIRED` seviyesindedir. Viewer'da görünürdür, fakat `productionGeometry=false` kalır.
2. `Shape274`, `Shape254` ve `Shape117` semantik ad taşımadığı için boyut/yön imzasıyla `MEDIUM` güvenle eşlenir. Üretim kullanımı için CAD/profile doğrulaması önerilir.
3. Kumaş geriye toplanmış statik görsel temsildir; animasyon ve üretim geometrisi değildir.
4. Fiziksel WebXR immersive-ar kabulü Android Chrome + ARCore + HTTPS cihazında NOT RUN'dır.

## Kesin kararlar

- Bütün GLB tek parça X/Y/Z ölçeklenmez.
- Lineer componentte yalnız kaynak uzunluk ekseni ölçeklenir; kesit eksenleri 1:1 kalır.
- PLMR 2D runtime, Freedom geometrisi ve diğer ürünler değiştirilmez.
- Arka duvar, GLB'den uydurulmuş profil yerine PLMR wall-grid polygonundan gerçek 3D katı olarak üretilir.
- Kesin olmayan mesh/component rolü güven seviyesi ve `productionGeometry` ile açıkça işaretlenir.
- Pergo Rise statiktir; replay ve ürün aç/kapat animasyonu eklenmez.
