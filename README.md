# Product 3d Viewer

Open-source browser-based 3D product viewer prototype.

The first included product is **B-CUBE FREEDOM 1 Module**, converted from the Excel macro workflow into a standalone JavaScript / Three.js application.

## Features

- Width, projection/depth, and height inputs in millimeters
- Automatic lamella count calculation based on the Excel lookup table logic
- Three.js 3D assembly animation
- Double-click corner posts to rotate them between 0 and 90 degrees
- Double-click lamellas to toggle open/closed visualization
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
