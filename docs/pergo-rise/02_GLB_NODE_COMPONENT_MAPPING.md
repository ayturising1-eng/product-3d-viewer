# GLB Node / Mesh / Component Eşleme Raporu

| Component şablonu | GLB node | Güven | Üretim geometrisi | Not |
|---|---|---:|---:|---|
| `pillar-profile` | `PergoRise_Pillar` | HIGH | Evet | Ön dikme gerçek kesiti |
| `foot-accessory` | `PergoRise_Foot` | HIGH | Evet | Tarayıcı için vertex-cluster sadeleştirme; kaynak GLB değişmeden pakette |
| `gutter-profile` | `PergoRise_Gutter` | HIGH | Evet | Ön oluk gerçek kesiti |
| `rail-profile` | `Shape274` | MEDIUM | Evet | Boyut/yön imzasına göre eğimli ray adayı |
| `rear-profile` | `Shape254` | MEDIUM | Evet | Boyut/yön imzasına göre arka/karşı profil |
| `fabric-profile` | `Shape117` | MEDIUM | Evet | Kumaş kayıt profili |
| `fabric-stack` | `Motor Yuvası Kapalı Kumaş002` | HIGH_VISUAL_ONLY | Hayır | Geriye toplanmış statik görsel temsil |
| `wall-connection-accessory` | `Shape005` | LOW_REVIEW_REQUIRED | Hayır | Görünür aday; kesin aksesuar doğrulaması bekliyor |

Geometri politikası: GLB node geometrisi world-transform uygulanmış ve merkezlenmiş şablon olarak saklanır. Lineer profillerde yalnız kaynak mesh'in en uzun ekseni instance boyuna göre ölçeklenir; kesit eksenleri 1:1 kalır. Tüm GLB assembly tek parça ölçeklenmez.
