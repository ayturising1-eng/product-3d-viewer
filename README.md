# Product 3d Viewer

## P3DV V3.46 Freedom GLB Louver Profile

V3.46 preserves the successful V3.45 PLMR interface and all V3.44 stabilization work while replacing only the B-Cube Freedom louver drawing with the supplied binary glTF panel model. The model is loaded once, cloned for all Freedom panels, scaled only along its length axis, and uses the existing panel positions, spacing, rear-facade package location and 100-degree effective opening. Bio-Rise keeps its existing procedural louver geometry. A procedural Freedom fallback remains available if GLTFLoader or the GLB model cannot be loaded.

## Features

- Width, projection/depth, and height inputs in millimeters
- Automatic lamella count calculation based on the Excel lookup table logic
- Three.js technical 3D product open/closed display
- Click a corner post to change or rotate its X × Z section while preserving total system dimensions
- Double-click a blue beam to edit its height × thickness section
- Mobile responsive layout
- Static hosting friendly: no backend, no database, no build step

## Product and Panel Logic

### B-Cube / Freedom

- Recommended width maximum: 4050 mm; larger values show a warning but remain drawable
- Projection suggestions begin at 2038 mm and increase by 216 mm up to the recommended 7060 mm value; larger manual values remain drawable
- Panel relation: `Projection = Panel Count × 216 + 580`
- Recommended panel count maximum: 30; larger counts continue the same formula without clamping
- Existing four-sided gutter frame, inner rail frame, product placement, Zip overlay and toolbox behavior are preserved

### Bio-Rise

- Recommended width maximum: 4000 mm; larger values show a warning but remain drawable
- Recommended projection range: 2070–6070 mm; larger values show a warning but remain drawable
- Height: maximum 3500 mm
- Recommended panel count range: 8–28; larger counts continue the same formula without clamping
- Panel relation: `Projection = Panel Count × 200 + 470`
- Front/rear posts: 150 × 100 mm
- Front/rear blue beams: 218 × 100 mm
- Side blue beams: 218 × 50 mm
- No front or rear gutters; the two side gutters are `Projection − 100 mm` long
- No inner four-sided box/rail frame
- Lamella section is 16 mm narrower, closed and open spacing is 200 mm, and the first rear panel is positioned 216 mm inward from the rear system exterior

Both product groups use the same facade selection, profile editing, sliding, guillotine, Zip Perde, fixed-joinery, multi-selection, dimensions, camera and toolbox workflows.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

The 3D viewer loads Three.js from public CDNs, so internet access is required for the 3D scene.

## Suggested GitHub Repo

Repository slug: `product-3d-viewer`

Display title: `Product 3d Viewer`

## Interactive Sliding, Guillotine and Zip Screen Placement

The viewer includes selectable front, rear, left, and right facade openings. Click an opening without dragging to place or edit a simplified sliding, guillotine, or Zip Perde product. This prototype remains independent from PLMR.

### Sliding system

- A Series / K Series
- With-threshold / flush-bottom type
- Side opening / center opening
- Side opening: left or right direction
- Center opening: middle pair outside or inside
- Manual panel count from 2 to 12
- 8 mm glass with 12 mm surrounding frame depth
- 10 mm glass with 14 mm surrounding frame depth
- 12 mm glass with 16 mm surrounding frame depth
- 20 mm insulated glass with 24 mm surrounding frame depth
- 42 mm lower-profile height for threshold systems
- 15 mm lower-profile height for flush-bottom systems
- Standard lower-profile depth of 123 mm
- For threshold + side-opening + six or more insulated panels, lower-profile depth becomes `123 + panel count × 24 mm`
- Side-opening direction arrows are drawn on the outer facade: a thick primary arrow on the leading sash and a thinner reverse arrow on the opposite sash
- Center-opening systems draw thick arrows from the middle pair toward the outer edges
- Center-opening halves keep a 2 mm meeting gap so the middle sashes do not intersect
- Sliding products support normal and collected 3D display states

### Guillotine system

- Cleanable / upward-collecting / downward-collecting types; the former Standard option is removed
- Chain / belt mechanism subject to the series rule
- 1+1 or 1+2 panel arrangement
- Left / right motor direction
- Always rendered from the outside-view product convention
- 8 mm glass with 12 mm surrounding frame depth
- 20 mm insulated glass with 24 mm surrounding frame depth
- Cleanable lower sash is automatically rendered as an inward-opening, bottom-hinged vasistas at 29°
- Cleanable and downward-collecting products show thick downward arrows on every panel except the lowest panel
- Upward-collecting products show thick upward arrows on every panel except the fixed upper panel
- The upper motor box displays a `MOTOR` label on the corrected selected side


### Zip Perde

- Separate product type with its own form; guillotine/sliding-only fields remain hidden
- Placement: **Between Posts** or **Outside Posts**
- Between-post placement is centered at `zone width − 3 mm` and `zone height − 3 mm` (3 mm total clearance)
- Outside-post placement uses `net zone width + connected left/right profile widths − 5 mm`
- Outside-post upper-box bottom aligns with the lower edge of the blue beam
- G Series: 100×100 Box, 110×110 Box, Hercule
- P Series: 115×115 Box, 130×130 Box
- Fabric color: Soltis or custom Other
- Cable exit: Rear, Front, or Side
- Motor side: Right or Left
- One full-area grey perforated technical-screen panel using the same depth layer as the fixed lower panel of a downward-collecting guillotine

### Viewer state and Freedom frame

- Camera position, OrbitControls target, and zoom are preserved when products are added, updated, removed, or the iframe is rebuilt
- Screenshot capture restores the user's camera after capture
- Freedom gutter frame dimensions are centered at `Width − 204 mm` and `Projection − 204 mm`
- Open lamellas remain at 80° with 65 mm spacing

Placed products are stored in the page-level model state and rebuilt together with the B-Cube frame when Width, Projection, or Height changes. Click an occupied facade again to edit or remove its product.

The product models intentionally use simplified technical geometry with outlined profiles and translucent glass. They are visual prototypes and are not production profile models or PLMR geometry records.

## Version

Current package: **p3dv.v3.46**

## P3DV V3.16 Kapı Seçimi ve Çizim Düzeltmesi

- Ürün seçimindeki ad **Kapı (Dış Bakış)** olarak güncellendi; ayrı Bakış Yönü hücresi kaldırıldı.
- Kapı tipleri form açılır açılmaz toplu olarak gösterilmez. **Kapı Tipi** seçim hücresine tıklanınca ayrı seçim görünümü açılır.
- Seçim görünümünde 13 kapı tipi masaüstünde dört sütunlu kart düzeninde listelenir; dar ekranlarda iki ve tek sütuna uyarlanır.
- Kart adları ana tip ve kısa sabit-alan detayı olarak iki satıra ayrılır: örneğin **Tek Kanat / Sol–Üst Sabit**.
- Hareketli kanatlar düz yön oku yerine yeşil kavisli açılım oku ile gösterilir.
- Kapı açılma yönü state zinciri **OUTWARD / INWARD** değerlerini korur; formda Dışa ve İçe seçenekleri bulunur.
- V3.15'te kapı builder'ının iframe dışındaki `DOOR_TOP_FIXED_TYPES` sabitine erişmesi nedeniyle oluşan çalışma zamanı hatası giderildi. Sabit artık Three.js iframe çalışma kapsamındadır.
- Kapı builder'ının iframe kapsamında tek ve üst sabitli kapılar için gerçekten çağrıldığı regresyon kontrolü eklendi.
- Freedom, Bio-Rise, Sürme, Giyotin, Zip Perde ve Sabit Doğrama geometri/state sözleşmeleri değiştirilmedi.


## V2.8 Notes

- Freedom gutter frame is centered at `Width − 204 mm` and `Projection − 204 mm`.
- The fixed toolbox now contains only global viewer controls; selected-zone editing actions remain in the contextual area menu.
- The contextual area menu includes **Profil Ekle**, **Ölçüyü Düzenle**, **Ürün Yerleştir / Düzenle**, and a product-aware **Ürünü Sil** action.
- Divider profile choices are limited to **100 × 100 mm** and **Özel Kesit**.
- Divider profiles can be vertical or horizontal. Vertical divider height is always `system height − 220 mm`; horizontal dividers split only their selected sub-zone.
- Clicking an inserted divider profile opens a delete action. Dependent sub-zone products are removed safely when their profile boundary is deleted.
- Clicking a main corner post opens a menu to change the profile or rotate it. `100 × 220 mm` rotates to `220 × 100 mm`; `100 × 100 mm` and custom sections are also supported.
- Main post changes do not alter total Width, Projection, or Height. Connected beams, facade openings, divider spans, and installed products rebuild to the new net opening.
- Dimension graphics use larger labels and arrowheads. Total Width is shown at the rear, total Height at the rear-left post, total Projection above the left side, net lower openings below the products, and the front-left post-bottom to blue-beam-bottom dimension is shown once.
- The former assembly button is now a global product-state toggle: red for closed and green for open. It controls lamellas, sliding collection, guillotine collection, and the cleanable vasistas state.


## V2.7 Notes

- Freedom gutter frame is centered at `Width − 102 mm` and `Projection − 102 mm`.
- Sliding and guillotine products are centered in their selected zone at `zone width − 5 mm` and `zone height − 5 mm`.
- Clicking a facade area now opens a contextual action menu with **Different Profile**, **Edit Dimension**, and **Place Product** actions.
- The large-preview toolbox is fixed to the right of the animation area on desktop and remains available below the viewer on narrow screens.
- A vertical divider profile can be selected from presets or entered as a custom section; it is placed automatically at the exact center of the selected area.
- Divider profiles split a facade into stable, independently selectable sub-zones. Each sub-zone can hold its own sliding or guillotine placement.
- Zone dimensions are rendered as technical 3D dimension lines with extension lines, arrowheads, and centered values rather than floating note cards.
- Editing a divided-zone width moves its nearest divider profile; editing an undivided-zone width updates the related system width or projection.
- Toolbox controls can show/hide dimensions, reset the camera, replay assembly animation, and clear products.

## V2.6 Notes

- Center-opening sliding systems now use separate outside/inside layer choices.
- The center sash pair has a 2 mm meeting clearance and thick outward arrows.
- Side opening offers only left/right directions.
- Sliding systems now support a collected 3D display.
- Guillotine motor-side label mapping is corrected.
- Freedom gutter dimensions are centered at Width/Projection minus 2 mm.
- Sliding and guillotine components are depth-positioned from the system exterior face and extend only inward.

## V2.5 Notes

- Preserves the last camera angle and zoom across product rebuilds.
- Adds physical glass/frame depth mappings for sliding and guillotine products.
- Adds sliding and guillotine movement-direction arrows.
- Makes cleanable vasistas automatic and removes its visible configuration fields.
- Removes the guillotine Standard type and visible View field.
- Adds outside-facing MOTOR labels to the selected side of the upper box.
- Resolves Freedom gutter overlap with 2 mm internal clearance.




## V3.2 Notes

- The toolbox now lists every placed sliding, guillotine, and Zip Perde product with its own open/closed checkbox.
- Product checkboxes and panel double-click actions share one per-zone state, so both controls remain synchronized.
- The global product button remains a default state for products without an individual override; individually controlled products are not overwritten.
- Sliding and guillotine panels can also be double-clicked to change the open/closed state of their own product.
- Zip Perde placement now disables the hidden panel-count input while Zip is selected, preventing the native `min=2` validation from blocking the one-panel product submit.
- Zip Perde placement clears the selected-zone overlay after a successful save.
- The Zip builder creates a single grey perforated fabric panel on the depth layer of the fixed lower panel of a 1+2 downward-collecting guillotine.
- A guarded grey single-panel fallback is rendered if the detailed Zip texture builder fails, preventing an empty red selection area.
- Horizontal divider profiles now produce separate vertical dimensions for the net upper and lower openings. These measurements belong to the **Ara Ölçüler** filter.


## V3.1 Notes

- Zip Perde was rebuilt from the verified guillotine facade/depth convention instead of the previous custom placement path.
- The Zip fabric is a single full-area panel located on the depth layer used by the fixed lower panel of a 1+2 downward-collecting guillotine.
- The fabric is opaque grey and uses a dense needle-point perforation texture rather than translucent glass.
- Double-clicking a Zip fabric panel toggles that panel independently between closed/down and open/collected-up states.
- The global **Ürünler Açık / Ürünler Kapalı** switch does not overwrite manually controlled Zip panel states.
- Dimension visibility is split into two independent checkbox filters: **Ara Ölçüler** and **Ana Ölçüler**.
- Main Width/Height/Projection dimensions and intermediate opening/local dimensions are stored and shown as separate 3D object groups.

## V3.0 Notes

- Net/sub-zone dimension text is 2.5× the V2.9 visual size; dimension lines and arrowheads are unchanged.
- Main Width, Height, and Projection values are 3.5× the V2.9 visual size, bold, and red.
- The obsolete orange internal guillotine mechanism/profile mesh is removed.
- Zip Perde is added as an independent product builder with G/P series, box type, placement location, fabric color, cable exit, and motor-side choices.
- Between-post Zip Perde uses 3 mm total width/height clearance.
- Outside-post Zip Perde spans the connected boundary profiles minus 5 mm and aligns the upper-box bottom with the blue-beam bottom.
- Zip fabric uses a repeating perforated screen texture rather than translucent glass.

## V2.9 Notes

- Dimension lines and arrow geometry are unchanged; only dimension text is rendered at twice the previous visual size.
- The Freedom gutter frame is centered at `Width − 204 mm` and `Projection − 204 mm`, leaving 102 mm on every opposite side.
- The contextual divider command is named **Profil Ekle**.
- The fixed toolbox now follows the PLMR multiple-selection contract:
  - Multiple Product Placement
  - Delete Multiple Products
  - Add Multiple Profiles
  - Delete Multiple Profiles
  - Fit Products to Openings
  - Delete All Products
- Eligible targets are filtered by command. Click toggles a target; Enter or right-click completes; Escape cancels.
- Multiple product and profile operations validate all selected targets before committing, preventing partial application.


## P3DV V3.4

- Zip Perde kablo çıkış yönleri Arkadan, Üstten ve Yandan olarak düzenlendi.
- Dikmenin Dışı adı Dikmenin Önü olarak değiştirildi.
- Zip Perde, bütün yerleşim seçeneklerinde cephe dış tarafında çizilir.
- Aynı cephe bölmesinde Sürme, Giyotin veya Sabit Doğrama ile birlikte ön katman Zip Perde kullanılabilir.
- Ürün Durumları panelindeki sabit Paneller Açık kutusu, yeşil çatı panellerini 80 derece açık veya kapalı gösterir.
- Sabit Doğrama dikey ve yatay bölme sayıları gerçek cam bölme adedidir.
- Dikey bölme sayısı ölçüye göre otomatik gelir ve manuel değiştirilebilir.
- Yatay bölme sayısı varsayılan 1'dir; profil adedi bölme sayısının bir eksiğidir.
- Yatay bölme yükseklikleri alt dış uçtan başlayarak segment ölçüleri olarak girilir ve toplamı ürün dış yüksekliğine eşit olmalıdır.
- Yatay ölçüler doğramanın orta aksında alt dış uç → profil merkezi, merkez → merkez ve son merkez → üst dış uç biçiminde gösterilir.


## P3DV V3.6 Freedom Giriş Paneli

Sayfanın sol tarafındaki sabit panelden Genişlik, Açılım, Yükseklik ve Panel Sayısı girilir. İlk açılışta hücreler boştur ve geçerli ölçüler uygulanmadan 3D model oluşturulmaz.

- Genişlik için önerilen maksimum: 4050 mm; üzeri yalnız uyarılır ve çizim engellenmez
- Açılım için önerilen maksimum: 7060 mm; üzeri yalnız uyarılır ve çizim engellenmez
- Panel sayısı için önerilen maksimum: 30; üzerindeki değerler formül üzerinden clamping olmadan hesaplanır
- Kanonik hesap: `Açılım = Panel Sayısı × 216 + 580`

Panel sayısı girildiğinde açılım otomatik hesaplanır. Açılım elle girildiğinde en yakın panel sayısı önerilir; elle girilen açılım korunur.

Zip Perde, Dikme Arası seçiliyken aynı bölmede ana ürün bulunursa ölçüleri değişmeden yalnız ön montaj katmanına alınır. Dikmenin Önü seçimi ise dıştan dışa genişlik ve +150 mm yükseklik kuralını kullanır.


## P3DV V3.10 Bio-Rise Roof Closure

- Bio-Rise side gutters are fully inside the system. Their outer faces are tangent to the inner faces of the left and right 218×50 mm blue beams.
- Moving lamella length is calculated between the true inner faces of those gutters.
- Blue lamella-profile closure pieces fill the front and rear roof gaps.
- Front and rear closures remain fixed when green lamellas open and keep 1 mm clearance from the moving lamella envelope.


## P3DV V3.11 Bio-Rise Gutter Clearance

- Bio-Rise side gutter section width is 98 mm.
- Each gutter is separated 2 mm from the inner face of the adjacent 218×50 mm blue side beam.
- The gutter inner faces remain at their V3.10 coordinates, so moving lamella length and roof closure geometry do not change.
- The clearance removes coplanar surfaces and prevents z-fighting/flicker.


## P3DV V3.12 Kapı

Ürün listesine ana ürün katmanında **Kapı** eklendi.

- Kasa ve kanat profilleri 50 mm yüz genişliği ve 55 mm derinlik kullanır.
- Dış kasada alt eşik bulunmaz; yalnız sol, sağ ve üst kasa profilleri çizilir.
- Kapı tipleri: Tek Açılır, Çift Açılır, Sol Sabit–Sağ Hareketli, Sağ Sabit–Sol Hareketli ve Üst Sabit Cam–Alt Hareketli Kanat.
- Tek ve sabit/hareketli tiplerde menteşe yönü seçilebilir.
- Çift açılır tipte aktif kanat seçilebilir; kol yalnız aktif kanatta gösterilir.
- Kapı açılma yönü **Dışa** veya **İçe** seçilebilir. Açık 3D gösterim açısı 45 derecedir.
- Normal Kapı Kolu ve Panik Kapı Kolu seçenekleri bulunur.
- Bütün kol eksenleri ürün alt seviyesinden/zeminden 900 mm yüksektedir.
- Cam kalınlığı ve cam rengi mevcut ürün seçimleriyle aynı mantıkta korunur.
- Üst sabit cam yüksekliği 250–1200 mm arasında düzenlenebilir; alt hareketli kanat en az 1200 mm kalır.
- Hareketli kanatlar çift tıklama ve Ürün Durumları kontrolüyle açılıp kapanır; sabit cam ve sabit kanatlar hareket etmez.
- Kapı ana ürün katmanında çalışır; aynı alanda ön katman Zip Perde kullanılabilir.

## P3DV V3.14 Kapı Varyasyonları ve Açılımı

- Panik Kapı Kolu seçildiğinde panik bar genişliği, kolun bulunduğu hareketli/aktif kanadın tam dış genişliğine eşittir; önceki 520 mm sınırı kullanılmaz.
- Ürün adı **Kapı (Dış Bakış)** olarak gösterilir. Ayrı Bakış Yönü hücresi kullanılmaz; placement verisindeki `OUTSIDE VIEW` sözleşmesi korunur.
- **Üst Sabit Cam – Alt Hareketli Kanat** seçildiğinde formda iki canlı değer görünür:
  - Sabit Cam Yüksekliği
  - Kalan Kapı Kanadı Yüksekliği
- Kalan kanat yüksekliği, formdaki alan yüksekliği ile gerçek 3D kapı profil/boşluk sözleşmesinden hesaplanır ve üst sabit cam girişi değiştiğinde otomatik güncellenir.
- 3D modelde aynı iki yükseklik, **Ara Ölçüler** filtresine bağlı düşey ölçüler olarak `Sabit Cam ... mm` ve `Kapı Kanadı ... mm` etiketleriyle gösterilir.
- Alt hareketli kanat için 1200 mm minimum doğrulaması artık gösterilen gerçek kanat yüksekliğini kullanır.



## P3DV V3.17 Kapı Silüet Oranları ve RAL Renkleri

- Kapı tipi silüetleri 1000 mm hareketli kanat genişliği, 2500 mm kanat yüksekliği, 1000 mm yan sabit genişliği ve 500 mm üst sabit yüksekliği esas alınarak ölçeklenir.
- Bütün kapı varyasyonları aynı karşılaştırma alanında gösterildiği için tek kanat, çift kanat ve sabitli tipler arasındaki gerçek oran farkı korunur.
- Sol sabit giriş panelinde iki bağımsız renk alanı vardır: **Sistem Rengi** ve **Panel Rengi**.
- Katalog yalnız `RAL ####` kodlarını içerir. **Rising Standart** 11 kod, **Tüm RAL Renkleri** 193 kod sunar.
- Arama alanında doğrudan RAL numarasıyla filtreleme yapılabilir.
- Sistem Rengi; çatı paneli, cam ve perde kumaşı dışındaki ana sistem ve cephe ürün profillerine uygulanır.
- Panel Rengi yalnız hareketli çatı panellerini değiştirir. Bio-Rise sabit kapatma profilleri Sistem Rengi kullanır.
- Varsayılanlar: Sistem Rengi `RAL 9006`, Panel Rengi `RAL 6018`.


## P3DV V3.21 Sun-Store, Texture ve Cam Tercihi Hafızası

- Sun-Store katalog seçim alanları şeffaftır ve gerçek katalog numunelerini kapatmaz.
- Seçilen kumaş kodunun gerçek katalog numunesi 3D Zip Perde dokusuna aktarılır; yükleme başarısızlığında güvenli procedural doku kullanılır.
- RAL kartlarında yalnız RAL kodları gösterilir; HEX metinleri kullanıcı arayüzünden kaldırılmıştır.
- Parlak, Mat ve Texture finish malzemeleri Three.js r128 uyumlu alanlarla çalışır.
- Ana sayfadaki varsayılan cam rengi alanı kaldırılmıştır.
- Son seçilen cam rengi ve kalınlığı yeni cephe ürünlerinde hatırlanır.
- 10 mm cam tercihi Giyotin A Serisinde geçici olarak 8 mm'ye uyarlanır; uygun başka ürün açıldığında 10 mm tercihi geri gelir.


## P3DV V3.22 Kapı İç Kolu ve Sun-Store Doku Eşleşmesi

- Normal kapının iç kolu, rozet ekseni etrafında önceki yönüne göre 180° çevrilmiştir; kapı kanadının dışına doğru ters uzanmaz.
- Dış ve iç kollar kapının iki farklı yüzünde kalır, ancak fiziksel olarak aynı doğru yöne uzanır.
- Sun-Store kataloğundaki 23 kumaşın her biri gerçek numune alanından ayrı 512×512 doku varlığı olarak hazırlanmıştır.
- Kıvrılmış numune köşeleri, ürün kodu ve beyaz sayfa alanları dokuya alınmaz.
- Zip Perde dokuları panelin fiziksel genişlik/yükseklik oranına göre ölçeklenir; eski 2.2×4.8 gerilmiş tekrar kaldırılmıştır.
- Mirrored repeat ile görünür doku birleşim çizgileri azaltılır.
- Doku rengi katalog görüntüsüne yaklaşması için sRGB, düşük emissive katkısı ve gerçek numuneden çıkarılmış fallback tonu birlikte kullanılır.


## P3DV V3.23 Zip Perde Siyah Doku Düzeltmesi

- Sun-Store kumaşları gömülü JPEG data URI kaynaklarıyla iframe içine taşınır.
- Zip kumaşı ışık bağımsız `MeshBasicMaterial` kullanır.
- Kaynak sırası gömülü veri, paket dokusu, katalog kırpması ve procedural fallback şeklindedir.
- Kumaş dokusu `emissiveMap` olarak tekrar kullanılmaz.


## P3DV V3.24 Net Cephe Açıklıkları ve Kapı Kanat Yüksekliği

- Cephe ürün alanları gerçek dikme iç yüzleri ve üst profil alt yüzü arasında hesaplanır.
- Dikme arası Zip Perde net açıklıktan toplam 3 mm, diğer cephe ürünleri toplam 5 mm küçük yerleşir.
- Ön/arka cephelerde post X kesiti; yan cephelerde post Z kesiti kullanılır.
- Ek dikey/yatay profiller gerçek yüz genişlikleri kadar açıklığı böler ve alt alan ölçülerini yeniden üretir.
- Üst sabitli kapıda kullanıcı yalnız hareketli kanat yüksekliğini girer; sabit üst cam kalan alandan türetilir.
- 3D ölçülendirmede üst sabit cam etiketi kaldırılmış, yalnız hareketli kapı kanadı yüksekliği bırakılmıştır.
- Sun-Store dokularındaki tekrarlanan beyaz katalog kenarları temizlenmiştir.


## P3DV V3.25 Klasik Default Renkler ve Başlangıç Durumları

- Uygulama ilk açıldığında RAL yerine klasik teknik renk paleti kullanılır.
- Dikmeler magenta, ana kayıt/kirişler mavi, hareketli paneller yeşil, oluklar turuncu ve iç ray çerçevesi amber görünür.
- Renk Seçimi başlığındaki `Default` ve `RAL` düğmeleri arasında geçiş yapılabilir.
- RAL modunda son seçilen sistem ve panel renkleri ile yüzey tipleri korunur; Default düğmesi klasik paleti geri getirir.
- Çatı panelleri ilk açılışta açık gelir.
- Yalnız Ana Ölçüler görünür; Ara Ölçüler başlangıçta kapalıdır.
- Global ürün durumu başlangıçta açıktır ve yeni yerleştirilen ürünler ilk anda açık state ile kaydedilir.


## P3DV V3.26 Soft Recommended Limits

- B-Cube Freedom ve Bio-Rise genişlik/açılım üst sınırları artık zorunlu doğrulama engeli değildir.
- Önerilen maksimum değerler sol giriş panelinde kalıcı olarak gösterilir.
- Önerilen maksimum aşıldığında turuncu bir bilgilendirme mesajı gösterilir; `3D Modeli Oluştur` işlemi devam eder.
- Panel sayısı ve açılım dönüşümü önerilen panel maksimumunda clamp edilmez.
- Minimum genişlik/açılım, geçerli yükseklik ve mevcut profil kesitlerinin fiziksel olarak sığması gibi gerçek geometri kontrolleri korunur.


## P3DV V3.30 Yerel PDF Motoru ve Hızlı Testler

- PDF üretimi artık harici jsPDF CDN bağlantısına bağlı değildir; `p3dv-pdf.js` paket içinde bulunur.
- `Ürün Listesi PDF` düğmesi gerçek Chromium tarayıcıda Freedom ve Bio-Rise senaryolarıyla dosya indirerek doğrulanmıştır.
- Three.js görüntüsü alınamazsa PDF indirmeyi iptal etmek yerine güvenli yedek görünüş oluşturulur.
- Toolbox içinde `Test 1`–`Test 10` hazır senaryo butonları bulunur.
- Senaryolar; dikey/yatay ara profil, merkez dışına alınmış profil konumları, düzenlenmiş alan aralıkları, RAL renk ve yüzeyler, dört cephe, tüm yan ürün tipleri, ana ürün + zip katmanı, ürün/panel açık-kapalı durumları ve stres ölçülerini kapsar.
- Bir test seçildiğinde model, cephe profilleri, ürünler, renkler ve görünürlük durumları tek tıklamayla hazırlanır.


## P3DV V3.31 Katlanır Cam

- Yeni cephe ürünü olarak **Katlanır Cam** eklendi.
- Product Request Form mantığındaki `Folding A Series - Premium` ve `Folding K Series - Smart` seçenekleri P3DV seçim ekranına uyarlandı.
- A Serisi `Standard` ve `Top-Hung`; K Serisi `Standard` tipini kullanır.
- Katlanma yönleri sola, sağa ve iki yana seçilebilir.
- İlk kanat isteğe bağlı bağımsız geçiş kapısı olarak tanımlanabilir.
- Panel sayısı net açıklık / 600 mm formülüyle otomatik hesaplanır.
- Tek tarafa önerilen maksimum 8 panel aşılırsa yön otomatik olarak iki yana çevrilir; çizim engellenmez.
- 2800 mm üzeri yükseklik öneri uyarısı verir fakat ürün yerleşimini engellemez.
- Katlanır cam tek tip eşikli kabul edilir ve alt profil yüksekliği 70 mm'dir.
- Açık görünümde kanatlar 90 derece dönerek seçilen tarafta paketlenir; açılım noktaları oklarla gösterilir.
- A Serisi cam seçenekleri 8 mm, 10 mm, 12 mm ve yalıtımlı camdır; K Serisi yalıtımlı cam kullanır.
- PDF raporunda seri, tip, katlanma yönü, panel sayısı, yaklaşık panel genişliği, geçiş kapısı, 70 mm alt profil, cam ve görünüm bilgileri yer alır.
- Test 1 sola katlanma, Test 2 sağa katlanma ve geçiş kapısı, Test 3 dokuz panelde otomatik iki yana geçiş, Test 10 ise iki yana yoğun senaryoyu hazırlar.
- PDF ayırıcı karakterleri yerel PDF motorunda ASCII uyumlu hale getirildi.


## P3DV V3.33 Manuel Mobil Gerçek Alan Yerleşimi

- Toolbox içindeki `Gerçek Alanda Gör` düğmesi korunmuştur.
- Zorunlu WebXR hit-test ve zemin tarama bekleme akışı kaldırılmıştır.
- Kamera açıldığında ürün gerçek ölçekte ve yarı saydam olarak kameranın önüne otomatik çizilir.
- P3DV milimetre geometrisi AR sahnesinde `0.001` katsayısıyla metreye çevrilir; 4000 mm genişlik tam 4,00 metre olur.
- Kullanıcı ürünü 10 cm adımlarla ileri, geri, sola ve sağa taşıyabilir.
- Zemin kotu sürgüyle veya 1 cm düğmeleriyle manuel ayarlanabilir.
- Yön 1 derece ve 15 derece adımlarla değiştirilebilir.
- `Konumu Sabitle` ve `Yeniden Konumlandır` durumları yarı saydam/normal görünümle ayrılmıştır.
- `Yatay Kamera` düğmesi tam ekran ve landscape yön kilidini dener; izin verilmezse telefonu yatay çevirme yönlendirmesi gösterilir.
- Yatay/dikey geçişte ürün konumu, dönüşü ve 1:1 ölçek korunur.
- Pinch veya serbest ölçeklendirme bulunmaz.
- AR oturumu doğrudan açılamazsa kullanıcı aktivasyonu için 3D alan içinde ikinci bir `Kamerayı Aç` düğmesi gösterilir.
- Uygulamanın HTTPS üzerinden açılması gerekir. WebXR/ARCore desteklemeyen tarayıcılarda açıklayıcı uyarı gösterilir.
- iPhone/iPad için bu sürümde USDZ/Quick Look dışa aktarımı bulunmaz; desteklenmeyen cihazlarda gerçek ölçek taklidi yapılmaz.
- Mevcut `Test 1`-`Test 10` hızlı test yapısı ve yerel PDF motoru korunmuştur.

## P3DV V3.34 Freedom Lamel Yönü

- Freedom üst görünüş lamel grubu sistem merkezi etrafında karşı tarafa alınmıştır.
- Lameller motor kutusunun bulunduğu arka cephe tarafında konumlanır.
- Bio-Rise lamel geometrisi etkilenmez.


## P3DV V3.35 Freedom Efektif Panel Açısı

- Freedom açık lamellerinin efektif açısı 100 derece olarak tanımlanmıştır.
- Geometri içindeki 180 derece aynalama nedeniyle pivot dönüşü -80 derecedir.
- Bio-Rise mevcut 100 derece efektif açısını korur.


## P3DV V3.36 Freedom Arka Cephe ve Ölçü Kontrolleri

- Freedom motor kutusunun toplandığı taraf Arka Cephe olarak tanımlanmıştır.
- Katlanır cam paketlerinde panel profil derinliğine ek 33 mm net boşluk uygulanır.
- Freedom ve Bio-Rise açılım listeleri ölçü ile karşılık gelen panel sayısını birlikte gösterir.
- Açılım kontrolü seçimden sonra tekrar açılabilen select yapısına geçirilmiştir.
- Genişlik, açılım ve yükseklik sayı alanlarındaki tarayıcı spinner okları kaldırılmıştır.


## P3DV V3.37 Katlanır Cam Bakış Yönü ve Kapı Açılım İşaretleri

- Katlanır Cam içindeki Geçiş Kapısı seçeneği kaldırılmıştır.
- Katlanır Cam için `İç Bakış` ve `Dış Bakış` seçenekleri eklenmiştir; varsayılan `İç Bakış`tır.
- Katlanma yönündeki ilk panelde büyük, merkezli `↻` işareti bulunur.
- İki yana katlanmada her iki uçtaki ilk panelde `↻` gösterilir; diğer panellerde yalnız toplanma yönü oku bulunur.
- Kapı kanatlarının tamamına büyük ve merkezli `↻` açılım işareti eklenmiştir.
- Çift kanat kapıda aktif kanat işareti tam görünür, pasif kanat işareti daha siliktir.
- Kapı tipi seçim kartlarındaki yeşil açılım oku kaldırılmıştır.

## P3DV V3.38 Katlanır Cam Açılma Yönü

- Katlanır Cam seçimleri `Bakış Yönü`, `Panellerin Toplanma Yönü` ve `Panellerin Açılma Yönü` olarak ayrılmıştır.
- Açılma yönü `İçeri` veya `Dışarı` seçilebilir; varsayılan `İçeri`dir.
- İki yana toplamada iki uçtaki ilk panellerin `↻` işaretleri simetrik hesaplanır.
- Freedom açık lamellerinin ters duran kesit yönü düzeltilmiş, 100 derece efektif açı korunmuştur.

## P3DV V3.41 Kanonik Cephe ve Dinamik Katlanır Cam Bakışı

- V3.41 temiz olarak V3.39 baseline üzerinden hazırlanmıştır; V3.40 baseline olarak kullanılmamıştır.
- Fiziksel `front` tarafı kullanıcıya `Arka Cephe`, fiziksel `back` tarafı kullanıcıya `Ön Cephe` olarak gösterilir.
- Freedom açık panel paketi fiziksel `minZ` tarafında kalır; bu taraf yeni terminolojide Arka Cephedir. Panel yönü, alt/üst orientasyonu, 100 derece efektif açı ve paket aralıkları değişmez.
- Katlanır Cam sol/sağ eşlemesi artık cephe ekseni, cephe iç yönü ve seçilen Bakış Yönüne göre dinamik hesaplanır.
- `İçeri` her zaman sistemin içine, `Dışarı` her zaman sistemin dışına katlanır; bakış seçimi bu fiziksel anlamı değiştirmez.
- Katlanır Cam kaydetme akışındaki `Dışarı` değerini silen hata kaldırılmıştır.
- Katlanır Cam form sırası: Bakış Yönü -> Panellerin Açılma Yönü -> Katlanma Yönü.
- Gerçek Chromium testinde `Dış Bakış + Dışarı + Sağ` kaydedilmiş, ürün yeniden açıldığında üç değer de korunmuştur.
- Dört cephe ve 12 temel bakış/açılma/toplanma kombinasyonu sözleşme testleriyle doğrulanmıştır.

## P3DV V3.42 Kesintisiz Ürün Aç/Kapat

- Ürünlerin açık/kapalı durumu değiştirilirken 3D iframe artık yeniden yüklenmez.
- Ana uygulama yeni durumu viewer'a `postMessage` ile gönderir.
- Viewer yeni modeli görünmeyen bir grupta senkron olarak hazırlar ve eski grupla tek işlemde değiştirir; boş veya karanlık ara kare oluşturmaz.
- Kamera konumu, OrbitControls hedefi, zoom, pan ve seçili görünüş aynı iframe oturumunda korunur.
- Bireysel ürün checkbox'ları, 3D modelde çift tıklama ve genel `Ürünler Açık/Kapalı` düğmesi aynı canlı güncelleme hattını kullanır.
- Genel aç/kapat düğmesi tüm yerleştirilmiş ürünlerin bireysel durumlarını da aynı değere getirir.
- AR oturumu sırasında grup konumu, dönüşü, 1:1 ölçeği ve yarı saydam yerleştirme görünümü korunur.
- Viewer henüz hazır değilse güvenli geriye uyumluluk olarak normal render akışı kullanılır.
## P3DV V3.46 Kesintisiz Çatı Paneli Aç/Kapat

- Toolbox içindeki `Paneller Açık / Kapalı` kontrolü artık 3D iframe'i yeniden yüklemez.
- Ana uygulama panel ana durumunu viewer'a `set-panel-master-open` mesajıyla gönderir.
- Viewer içindeki `panelMasterOpen` ve `lamellaOpenMode` değerleri canlı olarak güncellenir.
- Freedom ve Bio-Rise çatı panel geometrisi mevcut iframe içinde atomik `THREE.Group` değişimiyle yeniden hazırlanır.
- Eski grup, yeni grup tamamen hazır olana kadar sahnede kaldığı için boş veya karanlık ara kare oluşmaz.
- Kamera konumu, OrbitControls hedefi, zoom, pan, görünüş ve AR yerleşimi korunur.
- Viewer canlı panel güncellemesini desteklemiyorsa güvenli fallback olarak normal render akışı kullanılır.
- Gerçek Chromium testinde panel kontrolü kapalı ve tekrar açık yapılmış; iframe `srcdoc`, child window ve kamera marker verisi değişmeden iki canlı mesaj alınmıştır.


## P3DV V3.46 - PLMR Ortak Arayüzü

- Tarayıcı ve mobil uygulama adı `PLMR | 3D Designer` olarak güncellendi.
- PLMR logo, favicon, Apple Touch ve manifest ikonları eklendi.
- Normal çalışma düzeni solda veri kartları, sağda 3D çizim / ön izleme biçimindedir.
- `Önizlemeyi Büyüt` modunda veri paneli gizlenir ve P3DV toolbox sağ tarafta sabit çalışma paneli olarak açılır.
- Henüz veri modeli bulunmayan PLMR araçları ve ek opsiyonlar pasif olarak gösterilir; mevcut P3DV motoruna müdahale etmez.
