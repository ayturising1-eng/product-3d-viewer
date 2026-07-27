# P3DV V3.33 - Manuel Mobil Gerçek Alan Yerleşimi

## Amaç

P3DV'de oluşturulan sistem, desteklenen mobil cihazda kamera açılarak gerçek dünya koordinatlarında 1:1 fiziksel ölçekte gösterilir. P3DV ölçüleri milimetredir; AR dünya birimlerine aktarılırken `1000 mm = 1 m` dönüşümü uygulanır.

Örnek:

- P3DV genişliği: `4000 mm`
- AR genişliği: `4.00 m`
- Ölçek katsayısı: `0.001`

## V3.33 yaklaşımı

V3.32'deki zorunlu zemin bulma ve hit-test bekleme akışı kaldırılmıştır. Kamera açıldığında ürün ilk uygun XR karesinde gerçek ölçekte kameranın önüne çizilir. Kullanıcı son konumu ve zemin kotunu kendisi ayarlar.

- Zemin taraması zorunlu değildir.
- Model yarı saydam bir ön yerleşim görünümüyle başlar.
- `Konumu Sabitle` seçildiğinde ürün normal görünür ve konum kilitlenir.
- `Yeniden Konumlandır` ile yarı saydam ayar moduna dönülür.
- Ölçek hiçbir aşamada kullanıcı tarafından değiştirilemez.

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
4. Ürün gerçek ölçekte kameranın önüne otomatik çizilir.
5. Konum düğmeleriyle ürünü 10 cm adımlarla ileri, geri, sola veya sağa taşıyın.
6. Zemin kotunu sürgüyle veya `-1 cm` / `+1 cm` düğmeleriyle ayarlayın.
7. Yönü 1 derece veya 15 derece adımlarla değiştirin.
8. `Konumu Sabitle` düğmesine dokunun.
9. Geniş kadraj için `Yatay Kamera` düğmesini kullanın.
10. `AR Kapat` ile normal 3D görünüme dönün.

## Yatay kamera davranışı

- `Yatay Kamera` düğmesi önce tam ekran isteği gönderir, ardından `screen.orientation.lock('landscape')` çağrısını dener.
- Tarayıcı yön kilidine izin vermezse arayüz yatay yerleşime geçer ve kullanıcıdan telefonu elle yatay çevirmesi istenir.
- Yön değişimi sırasında ürün konumu, dönüş açısı ve 1:1 ölçek korunur.
- Düğme yatay modda `Dikey Kamera` olarak değişir.

## Manuel konumlandırma

- İlk kamera konumundan ürünün diyagonaline göre güvenli bir başlangıç mesafesi hesaplanır.
- Başlangıç zemin kotu kamera yüksekliğinden yaklaşık `1.45 m` aşağıda varsayılır.
- Bu değer yalnız başlangıç önerisidir; kullanıcı zemin kotunu manuel olarak düzeltir.
- Sağ/sol ve ileri/geri hareketler kameranın yatay yönüne göre uygulanır.
- Zemin kotu `-150 cm` ile `+150 cm` arasında 1 cm hassasiyetle ayarlanır.
- Pinch veya serbest ölçeklendirme bulunmaz.

## Ölçek davranışı

- P3DV model grubu AR oturumunda tam olarak `0.001` ölçeğine alınır.
- `4000 mm` genişlik AR koordinatında tam `4.00 m` olur.
- Kullanıcı kameraya yaklaştığında ürün ekranda doğal olarak büyür, uzaklaştığında küçülür; fiziksel dünya ölçüsü değişmez.
- Konum kontrolleri yalnız dünya koordinatlarını değiştirir; model ölçeğini değiştirmez.

## Destek sınırı

Bu sürüm WebXR destekli Android cihazlara odaklanır. iPhone/iPad tarafında dinamik P3DV sahnesini USDZ'ye dönüştüren Quick Look akışı henüz yoktur. Destek bulunmadığında uygulama ölçeği tahmin eden sahte kamera modu açmaz; açık bir uyumluluk uyarısı verir.

## Test notu

Paket içindeki Node testleri, oluşturulan iframe kodunun sözdizimini, 4000 mm -> 4 m dönüşümünü, manuel hareket adımlarını, zemin kotu kontrolünü, yarı saydam/sabit durumlarını ve yatay kamera sözleşmesini doğrular. Gerçek kamera, ARCore takip kararlılığı, fiziksel metre karşılaştırması ve yön kilidi davranışı mutlaka desteklenen bir Android telefonda ayrıca test edilmelidir.
