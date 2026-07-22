# Product 3d Viewer

Open-source browser-based 3D product viewer prototype.

The first included product is **B-CUBE FREEDOM 1 Module**, converted from the Excel macro workflow into a standalone JavaScript / Three.js application.

## Features

- Width, projection/depth, and height inputs in millimeters
- Automatic lamella count calculation based on the Excel lookup table logic
- Three.js technical 3D product open/closed display
- Click a corner post to change or rotate its X × Z section while preserving total system dimensions
- Double-click a blue beam to edit its height × thickness section
- Mobile responsive layout
- Static hosting friendly: no backend, no database, no build step

## Lamella Count Logic

The Excel file calculates lamella count from projection/depth with a lookup table:

| Projection / Depth (mm) | Lamella Count |
| ---: | ---: |
| 796 | 1 |
| 1012 | 2 |
| 1228 | 3 |
| ... | ... |
| 5980 | 25 |
| 7060 | 30 |

In JavaScript this is represented as:

```js
Math.floor((depth - 796) / 216) + 1
```

The result is clamped between 1 and 30 for this first module.

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

Current package: **p3dv.v3.6**


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

- Genişlik: en fazla 4050 mm
- Açılım: en fazla 7060 mm
- Panel sayısı: en fazla 30
- Kanonik hesap: `Açılım = Panel Sayısı × 216 + 580`

Panel sayısı girildiğinde açılım otomatik hesaplanır. Açılım elle girildiğinde en yakın panel sayısı önerilir; elle girilen açılım korunur.

Zip Perde, Dikme Arası seçiliyken aynı bölmede ana ürün bulunursa ölçüleri değişmeden yalnız ön montaj katmanına alınır. Dikmenin Önü seçimi ise dıştan dışa genişlik ve +150 mm yükseklik kuralını kullanır.
