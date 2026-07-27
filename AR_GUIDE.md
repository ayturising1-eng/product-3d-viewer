# P3DV V3.32 — Mobil Gerçek Alan Yerleşimi

## Amaç

P3DV’de oluşturulan sistem, desteklenen mobil cihazda kamera açılarak gerçek zemine 1:1 fiziksel ölçekte yerleştirilir. P3DV ölçüleri milimetredir; AR dünya birimlerine aktarılırken `1000 mm = 1 m` dönüşümü uygulanır.

Örnek:

- P3DV genişliği: `4000 mm`
- AR genişliği: `4.00 m`
- Ölçek katsayısı: `0.001`

## Cihaz ve yayın gereksinimleri

- Android Chrome
- ARCore ve WebXR `immersive-ar` desteği
- Kamera izni
- HTTPS üzerinden yayın
- Iframe izinleri: `camera; xr-spatial-tracking; fullscreen`

`file://` üzerinden doğrudan açılan paketlerde veya güvenli olmayan ağ adreslerinde WebXR kullanılamayabilir. Canlı sunucunun HTTPS sertifikası olmalıdır.

## Kullanım

1. P3DV modelini oluşturun veya hızlı testlerden birini açın.
2. `Gerçek Alanda Gör` düğmesine dokunun.
3. Tarayıcı izin akışını doğrudan açamazsa 3D alan içindeki `Kamerayı Aç` düğmesine dokunun.
4. Telefonu yavaşça hareket ettirerek zemini tarayın.
5. Yeşil yerleştirme halkası görünür olduğunda `Yerleştir` düğmesine dokunun.
6. Gerekirse `↶ 15°` / `15° ↷` ile yönü değiştirin.
7. Konumu değiştirmek için `Yeniden Konumlandır` seçin.
8. `AR Kapat` ile normal 3D görünüme dönün.

## Ölçek ve derinlik davranışı

- P3DV model grubu AR oturumunda tam olarak `0.001` ölçeğine alınır.
- Modelin alt kotu algılanan zemin noktasına oturtulur.
- Ölçek pinch hareketiyle değiştirilemez.
- Kullanıcı kameraya yaklaştığında model ekranda doğal olarak büyür, uzaklaştığında küçülür; fiziksel dünya ölçüsü değişmez.
- Yerleştirme noktası ekran pikseline göre tahmin edilmez; WebXR hit-test sonucu kullanılır.
- Dikey veya aşırı eğimli yüzeyler pergola yerleşimi için reddedilir.

## Destek sınırı

Bu sürüm WebXR destekli Android cihazlara odaklanır. iPhone/iPad tarafında dinamik P3DV sahnesini USDZ’ye dönüştüren Quick Look akışı henüz yoktur. Destek bulunmadığında uygulama ölçeği tahmin eden sahte kamera modu açmaz; açık bir uyumluluk uyarısı verir.

## Test notu

Paket içindeki Node testleri, oluşturulan iframe kodunun sözdizimini, 4000 mm → 4 m dönüşümünü, hit-test sözleşmesini, sabit ölçeği ve kullanıcı arayüzünü doğrular. Gerçek kamera, ARCore yüzey algılama ve fiziksel metre karşılaştırması mutlaka desteklenen bir Android telefonda ayrıca yapılmalıdır.
