# Parametrik Static Assembly Sözleşmesi

## Şemalar

- Project: `p3dv-parametric-product-v1`
- Assembly: `p3dv-static-assembly-v1`
- Template manifest: `p3dv-pergo-rise-component-templates-v1`
- Birim: millimetre
- Eksenler: X genişlik, Y yükseklik, Z açılım

Her component instance benzersiz `id`, `kind`, `template` ve `sourceRuleIds` taşır. Lineer componentler `start`/`end`; aksesuarlar `position`; duvarlar `polygonXZ`, `bottomY`, `topY` ile tanımlanır.

## Canlı güncelleme

Parent yalnız `set-pergo-rise-project` mesajı gönderir. Viewer mevcut iframe ve WebGL context içinde instance buffer'larını yeniden kurar. Kamera, Orbit state, viewer session ve AR ölçek sözleşmesi korunur. Pergo Rise için replay/ürün animasyonu devre dışıdır.

## Üretim güvenliği

`productionGeometry: false` olan kumaş görseli ve `Shape005` bağlantı adayı kesim/üretim verisi değildir. Arka duvar PLMR grid/polygon verisinden katı olarak oluşturulur; doğrulanmamış GLB duvar profili uydurulmaz.
