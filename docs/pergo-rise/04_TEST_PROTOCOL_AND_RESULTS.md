# Test Protokolü ve Sonuçları

## Node ve regresyon - PASS

18/18 JavaScript test paketi ve toplam 1288 kontrol geçti. V3.49 kontrat paketi 75 kontrol içerir. Ayrıca `app.js`, PDF/RAL/kumaş kaynakları, Pergo Rise product/derived/viewer/WebGL dosyaları ve PLMR runtime dosyaları `node --check` ile doğrulandı.

## Gerçek Chromium / WebGL2 - PASS

Xvfb altında headed Chromium, ANGLE/SwiftShader WebGL2 ile 32 kabul kontrolü çalıştırıldı:

- Tek sistemde 8 GLB template mapping ve 15 eksiksiz instance.
- İki pozlu canlı güncelleme.
- `:` bağımsız grup senaryosunda 3 sistem, 6 ray, 5 dikme ve 3 arka duvar.
- İframe/contentWindow/session ve kamera/target/zoom korunumu.
- Ana/ara teknik ölçü overlay'i ve kamera presetleri.
- Browser warning, page error ve request failure: 0.

## PDF - PASS

Gerçek Chromium indirme olayıyla 47,583 byte, 4 sayfalı A4 PDF üretildi. PDF parse edildi, 150 DPI'da dört sayfa render edildi ve görsel olarak incelendi. Kırpılma, taşma, üst üste binme veya bozuk sayfa görülmedi. Rapor panel dili kullanmaz; Pergo Rise sistem/poz/ray/dikme/component ve poz parametrelerini verir.

## AR - API PASS / fiziksel oturum NOT RUN

Capability API ve `startP3DVAR` yolu tarayıcıda çalıştı; mm→metre ölçeği tam `0.001` olarak doğrulandı. Test iframe'i secure-context sağlamadığı ve fiziksel ARCore cihaz bulunmadığı için immersive-ar kamera oturumu PASS sayılmamıştır. Android Chrome + ARCore + HTTPS saha testi açık kabul maddesidir.

## Paket kabulü

ZIP oluşturulduktan sonra CRC, SHA-256, temiz yeniden çıkarma ve aynı 18 Node paketinin re-extract kökünde yeniden çalıştırılması zorunludur. Sonuçlar `PACKAGE_MANIFEST.json` ve kök `TEST_RESULTS.txt` içinde tutulur.


## V3.49 file-mode hotfix kabulü

- Node: 19/19 suite, 1303 kontrol PASS.
- Embedded component binary, kanonik BIN ile byte ve SHA-256 olarak aynıdır.
- Chromium/WebGL testinde component JSON/BIN fetch uçları bilerek engellendi; viewer embedded payload ile controller ve gerçek canvas görüntüsü oluşturdu.
- Doğrudan file:// gezinmesi çalışma ortamı yönetici politikasıyla engellendiği için bu koşul eşdeğer fetch-denial senaryosuyla doğrulandı.

## V3.50 PLMR Studio arayüz kabulü

- 19/19 Node test paketi, toplam 1290 kontrol PASS.
- 32/32 JavaScript dosyası syntax PASS.
- Gerçek headed Chromium/WebGL2 testinde Pergo Rise başlangıcı, boş önizleme, model oluşturma, 15 component instance, büyüt/küçült ve hata sayaçları doğrulandı.
- Gerçek tarayıcı PDF indirmesi 4 A4 sayfa olarak parse edildi ve 150 DPI render ile incelendi.
- PLMR shell CSS/HTML sözleşmesi özel V3.50 testiyle doğrulandı.
