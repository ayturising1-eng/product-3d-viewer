# PLMR Alan–Kural–3D Eşlemesi

| Girdi / Derived alan | PLMR kaynağı | 3D çıktısı |
|---|---|---|
| `systemCount`, `width` | Project Model + `normalizeInput` | Sistem/poz topolojisi, toplam nominal genişlik |
| `width` içinde `;` | `multiPositionRules.js` | Yan yana pozlar, PLMR fiziksel aralıkları |
| `width` içinde `:` | bağımsız grup parserı | Ayrı grup sınırları ve ayrı oluklar |
| `opening` | poz normalize verisi | Z ekseni açıklığı, ray sonları, ön profil/oluk konumu |
| `rearHeight`, `frontHeight` | poz normalize verisi | Arka/ön Y yüksekliği ve eğim |
| `angleRad`, `rayLength` | `sideAngleRadFor`, `rayLenFor` | Gerçek eğimli ray başlangıç/bitiş vektörü |
| `systems[].rays`, `K.rayW` | `drawTopRays` kuralları | Ray merkez aksları ve GLB ray profilleri |
| `postCenterXs`, `frontPostWidths` | PLMR dikme derived alanları | Gerçek GLB dikme ve ayak aksesuarları |
| `gutterBounds`, `gutterEditState` | `drawTopGutter` | Bağlı veya bağımsız grup bazlı oluk profilleri |
| `topBackWallGridState` | `drawTopWall` | Polygon tabanlı ekstrüde 3D arka duvar |
| çatı profil sabit/hareketli Z | `drawTopRoofProfiles` | Kumaş kayıt profilleri |
| kumaş seçimi | Project Model | Geriye toplanmış statik görsel kumaş metadata'sı |

Nominal proje genişliği `normalized.width` değeridir. Assembly dış zarfı ön oluk taşması nedeniyle nominal genişlikten 100 mm büyük olabilir; bu dış zarf proje giriş ölçüsünün yerine yazılmaz.
