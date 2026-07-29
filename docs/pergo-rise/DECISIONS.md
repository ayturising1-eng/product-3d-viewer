# Decisions

1. PLMR normalize/derived output is canonical; P3DV does not reinterpret 2D topology.
2. `PergoRise.glb` is retained untouched as source evidence and separately distilled into browser component templates.
3. Source meshes are world-transform baked and centered. Only the longest source axis may scale for a linear instance.
4. Component mapping confidence is part of the contract and appears in viewer test state/PDF notes.
5. Live dimension updates replace component instances in the existing WebGL context; iframe and camera are not rebuilt.
6. PDF snapshots are capped at 1024 px and JPEG 0.78 to prevent Chromium memory termination while preserving A4 readability.
7. Save/load persists canonical input and hash; load recomputes geometry and reports stale input/hash mismatch.
8. AR uses millimetres internally and a fixed 0.001 root scale in WebXR.
