(function () {
  const defaults = {
    productGroup: 'b-cube',
    width: 0,
    depth: 0,
    height: 0,
    panelCount: 0,
    orientations: [0, 0, 0, 0],
    postSections: [
      { x: 100, z: 220 },
      { x: 100, z: 220 },
      { x: 100, z: 220 },
      { x: 100, z: 220 }
    ],
    beamSection: { vertical: 220, thickness: 100 },
    placements: {},
    zipPlacements: {},
    facadeProfiles: {},
    productsOpen: false,
    productOpenStates: {},
    panelStates: {},
    panelMasterOpen: false
  };

  const ids = {
    frame: 'viewerFrame',
    positionEdit: 'positionEditBtn',
    positionTitle: 'positionTitle',
    positionSummary: 'positionSummary',
    positionDialogTitle: 'positionDialogTitle',
    dialog: 'positionDialog',
    form: 'positionForm',
    width: 'widthInput',
    depth: 'depthInput',
    height: 'heightInput',
    dialogLamella: 'dialogLamellaCount',
    productGroup: 'productGroupInput',
    productSubgroup: 'productSubgroupValue',
    productFormula: 'productFormulaText',
    projectionOptions: 'projectionOptions',
    freedomForm: 'freedomInputForm',
    freedomWidth: 'freedomWidthInput',
    freedomDepth: 'freedomDepthInput',
    freedomHeight: 'freedomHeightInput',
    freedomPanelCount: 'freedomPanelCountInput',
    freedomValidation: 'freedomInputValidation',
    freedomApply: 'freedomApplyBtn',
    cancel: 'cancelPositionBtn',
    productStatus: 'productStatus',
    replay: 'replayAnimationBtn',
    clearProducts: 'clearProductsBtn',
    productDialog: 'productDialog',
    productForm: 'productForm',
    productZoneTitle: 'productZoneTitle',
    productZoneInfo: 'productZoneInfo',
    productType: 'productTypeInput',
    productSeriesWrap: 'productSeriesWrap',
    productSeries: 'productSeriesInput',
    productSubtypeWrap: 'productSubtypeWrap',
    productSubtype: 'productSubtypeInput',
    productPlacementWrap: 'productPlacementWrap',
    productPlacement: 'productPlacementInput',
    productMechanismWrap: 'productMechanismWrap',
    productMechanism: 'productMechanismInput',
    productOpeningWrap: 'productOpeningWrap',
    productOpening: 'productOpeningInput',
    productDirectionWrap: 'productDirectionWrap',
    productDirectionLabel: 'productDirectionLabel',
    productDirection: 'productDirectionInput',
    productGlassThicknessWrap: 'productGlassThicknessWrap',
    productGlassThickness: 'productGlassThicknessInput',
    productGlassColorWrap: 'productGlassColorWrap',
    productGlassColorLabel: 'productGlassColorLabel',
    productGlassColor: 'productGlassColorInput',
    productPanelsWrap: 'productPanelsWrap',
    productCustomGlassWrap: 'productCustomGlassWrap',
    productCustomGlassLabel: 'productCustomGlassLabel',
    productCustomGlass: 'productCustomGlassInput',
    productPanels: 'productPanelsInput',
    productPanelHint: 'productPanelHint',
    productFixedVerticalCountWrap: 'productFixedVerticalCountWrap',
    productFixedVerticalCount: 'productFixedVerticalCountInput',
    productFixedHorizontalCountWrap: 'productFixedHorizontalCountWrap',
    productFixedHorizontalCount: 'productFixedHorizontalCountInput',
    productFixedHorizontalHeightsWrap: 'productFixedHorizontalHeightsWrap',
    productFixedHorizontalHeights: 'productFixedHorizontalHeightsInput',
    productDoorTypeWrap: 'productDoorTypeWrap',
    productDoorType: 'productDoorTypeInput',
    productDoorTypeTrigger: 'productDoorTypeTrigger',
    productDoorTypeValue: 'productDoorTypeValue',
    productDoorTypePicker: 'productDoorTypePicker',
    productDoorTypePickerClose: 'productDoorTypePickerClose',
    productDoorTypeCards: 'productDoorTypeCards',
    productDoorHingeWrap: 'productDoorHingeWrap',
    productDoorHinge: 'productDoorHingeInput',
    productDoorActiveLeafWrap: 'productDoorActiveLeafWrap',
    productDoorActiveLeaf: 'productDoorActiveLeafInput',
    productDoorOpenDirectionWrap: 'productDoorOpenDirectionWrap',
    productDoorOpenDirection: 'productDoorOpenDirectionInput',
    productDoorHandleTypeWrap: 'productDoorHandleTypeWrap',
    productDoorHandleType: 'productDoorHandleTypeInput',
    productDoorTopFixedHeightWrap: 'productDoorTopFixedHeightWrap',
    productDoorTopFixedHeight: 'productDoorTopFixedHeightInput',
    productDoorHeightSummaryWrap: 'productDoorHeightSummaryWrap',
    productDoorFixedHeightValue: 'productDoorFixedHeightValue',
    productDoorMovingHeightValue: 'productDoorMovingHeightValue',
    productPanelTypeWrap: 'productPanelTypeWrap',
    productPanelTypeLabel: 'productPanelTypeLabel',
    productPanelType: 'productPanelTypeInput',
    productMotorDirectionWrap: 'productMotorDirectionWrap',
    productMotorDirection: 'productMotorDirectionInput',
    productViewWrap: 'productViewWrap',
    productView: 'productViewInput',
    productMotorTypeWrap: 'productMotorTypeWrap',
    productMotorType: 'productMotorTypeInput',
    productRemoteWrap: 'productRemoteWrap',
    productRemote: 'productRemoteInput',
    cleanableWindowSection: 'cleanableWindowSection',
    bottomPanelMode: 'bottomPanelModeInput',
    bottomPanelStateWrap: 'bottomPanelStateWrap',
    bottomPanelState: 'bottomPanelStateInput',
    bottomPanelHingeWrap: 'bottomPanelHingeWrap',
    bottomPanelHinge: 'bottomPanelHingeInput',
    slidingCollectionSection: 'slidingCollectionSection',
    slidingCollectionState: 'slidingCollectionStateInput',
    collectingDisplaySection: 'collectingDisplaySection',
    collectingDisplayState: 'collectingDisplayStateInput',
    collectingDisplayDirection: 'collectingDisplayDirection',
    toolboxIntermediateDimensions: 'toolboxIntermediateDimensionsInput',
    toolboxMainDimensions: 'toolboxMainDimensionsInput',
    productOpenList: 'toolboxProductOpenList',
    productOpenEmpty: 'toolboxProductOpenEmpty',
    panelMaster: 'toolboxPanelMasterInput',
    toolboxResetCamera: 'toolboxResetCameraBtn',
    multiProduct: 'multiProductBtn',
    multiDelete: 'multiDeleteBtn',
    multiProfileAdd: 'multiProfileAddBtn',
    multiProfileDelete: 'multiProfileDeleteBtn',
    fitProducts: 'fitProductsBtn',
    selectionBanner: 'toolboxSelectionBanner',
    selectionBannerTitle: 'toolboxSelectionBannerTitle',
    selectionBannerText: 'toolboxSelectionBannerText',
    selectionDone: 'toolboxSelectionDoneBtn',
    selectionCancel: 'toolboxSelectionCancelBtn',
    zoneActionDialog: 'zoneActionDialog',
    zoneActionTitle: 'zoneActionTitle',
    zoneActionInfo: 'zoneActionInfo',
    zoneActionAddProfile: 'zoneActionAddProfileBtn',
    zoneActionEditDimension: 'zoneActionEditDimensionBtn',
    zoneActionPlaceProduct: 'zoneActionPlaceProductBtn',
    zoneActionDeleteProduct: 'zoneActionDeleteProductBtn',
    zoneActionCancel: 'cancelZoneActionBtn',
    profileDialog: 'profileDialog',
    profileForm: 'profileForm',
    profileOrientation: 'profileOrientationInput',
    profileType: 'profileTypeInput',
    profileCustomFields: 'profileCustomFields',
    profileWidth: 'profileWidthInput',
    profileDepth: 'profileDepthInput',
    profileValidation: 'profileValidation',
    profileCancel: 'cancelProfileBtn',
    dividerProfileDialog: 'dividerProfileDialog',
    dividerProfileTitle: 'dividerProfileTitle',
    dividerProfileInfo: 'dividerProfileInfo',
    dividerProfileDelete: 'deleteDividerProfileBtn',
    dividerProfileCancel: 'cancelDividerProfileBtn',
    postActionDialog: 'postActionDialog',
    postActionTitle: 'postActionTitle',
    postActionInfo: 'postActionInfo',
    postChangeProfile: 'postChangeProfileBtn',
    postRotateProfile: 'postRotateProfileBtn',
    postActionCancel: 'cancelPostActionBtn',
    postProfileDialog: 'postProfileDialog',
    postProfileForm: 'postProfileForm',
    postProfileTitle: 'postProfileTitle',
    postProfileType: 'postProfileTypeInput',
    postCustomFields: 'postCustomFields',
    postX: 'postXInput',
    postZ: 'postZInput',
    postValidation: 'postValidation',
    postProfileCancel: 'cancelPostProfileBtn',
    zoneDimensionDialog: 'zoneDimensionDialog',
    zoneDimensionForm: 'zoneDimensionForm',
    zoneDimensionTitle: 'zoneDimensionTitle',
    zoneWidth: 'zoneWidthInput',
    zoneHeight: 'zoneHeightInput',
    zoneDimensionValidation: 'zoneDimensionValidation',
    zoneDimensionCancel: 'cancelZoneDimensionBtn',
    productValidation: 'productValidation',
    productCancel: 'cancelProductBtn',
    productRemove: 'removeProductBtn'
  };

  const $ = (id) => document.getElementById(id);
  const modelState = JSON.parse(JSON.stringify(defaults));
  let viewerCameraState = null;
  let selectedZone = null;
  let selectedZoneId = null;
  let dimensionVisibility = { intermediate: true, main: true };
  let profileSequence = 1;
  let selectedDividerProfile = null;
  let selectedPostIndex = null;
  let toolboxSelectionMode = null;
  let toolboxSelectionItems = new Map();
  let bulkProductZones = null;
  let bulkProfileZones = null;
  let activeProductSlot = 'primary';

  const PRODUCT_SPECS = {
    'b-cube': {
      groupLabel: 'B-Cube', subgroupLabel: 'Freedom', modelLabel: 'B-Cube Freedom',
      widthMin: 1000, widthMax: 4050,
      depthMin: 2038, depthMax: 7060, depthStep: 216, depthListStart: 2038,
      heightMin: 1600, heightMax: null,
      panelMin: 7, panelMax: 30, panelPitch: 216, projectionOffset: 580,
      postSection: { x: 100, z: 220 }, beamSection: { vertical: 220, thickness: 100 }, sideBeamThickness: 100
    },
    'bio-rise': {
      groupLabel: 'Bio-Rise', subgroupLabel: 'None', modelLabel: 'Bio-Rise',
      widthMin: 1000, widthMax: 4000,
      depthMin: 2070, depthMax: 6070, depthStep: 200, depthListStart: 2070,
      heightMin: 1600, heightMax: 3500,
      panelMin: 8, panelMax: 28, panelPitch: 200, projectionOffset: 470,
      postSection: { x: 150, z: 100 }, beamSection: { vertical: 218, thickness: 100 }, sideBeamThickness: 50
    }
  };

  function activeProductSpec(group = modelState.productGroup) {
    return PRODUCT_SPECS[group] || PRODUCT_SPECS['b-cube'];
  }

  function projectionFromPanelCount(panelCount, group = modelState.productGroup) {
    const spec = activeProductSpec(group);
    const count = Math.max(0, Math.min(spec.panelMax, Math.round(Number(panelCount) || 0)));
    return count > 0 ? count * spec.panelPitch + spec.projectionOffset : 0;
  }

  function panelCountFromProjection(depth, group = modelState.productGroup) {
    const spec = activeProductSpec(group);
    const projection = Number(depth) || 0;
    if (projection <= 0) return 0;
    return Math.max(spec.panelMin, Math.min(spec.panelMax, Math.round((projection - spec.projectionOffset) / spec.panelPitch)));
  }

  function lamellaCountFromProjection(depth, group = modelState.productGroup) {
    return panelCountFromProjection(depth, group);
  }

  function modelReady(model = modelState) {
    const spec = activeProductSpec(model.productGroup);
    const height = Number(model.height);
    return Number(model.width) >= spec.widthMin && Number(model.width) <= spec.widthMax &&
      Number(model.depth) >= spec.depthMin && Number(model.depth) <= spec.depthMax &&
      height >= spec.heightMin && (!spec.heightMax || height <= spec.heightMax) &&
      Number(model.panelCount) >= spec.panelMin && Number(model.panelCount) <= spec.panelMax;
  }

  function readModel() {
    return {
      productGroup: modelState.productGroup || 'b-cube',
      width: modelState.width,
      depth: modelState.depth,
      height: modelState.height,
      lamellaCount: Math.max(0, Math.min(activeProductSpec().panelMax, Math.round(Number(modelState.panelCount) || panelCountFromProjection(modelState.depth)))),
      panelCount: Math.max(0, Math.min(activeProductSpec().panelMax, Math.round(Number(modelState.panelCount) || 0))),
      orientations: [...modelState.orientations],
      postSections: modelState.postSections.map((section) => ({ ...section })),
      beamSection: { ...modelState.beamSection },
      placements: JSON.parse(JSON.stringify(modelState.placements || {})),
      zipPlacements: JSON.parse(JSON.stringify(modelState.zipPlacements || {})),
      facadeProfiles: JSON.parse(JSON.stringify(modelState.facadeProfiles || {})),
      productsOpen: Boolean(modelState.productsOpen),
      productOpenStates: JSON.parse(JSON.stringify(modelState.productOpenStates || {})),
      panelStates: JSON.parse(JSON.stringify(modelState.panelStates || {})),
      panelMasterOpen: Boolean(modelState.panelMasterOpen)
    };
  }

  function setText(id, text) {
    $(id).textContent = text;
  }

  function productModelLabel(group = modelState.productGroup) {
    return activeProductSpec(group).modelLabel;
  }

  function populateProjectionOptions() {
    const list = $(ids.projectionOptions);
    if (!list) return;
    const spec = activeProductSpec();
    list.innerHTML = '';
    let lastValue = null;
    for (let value = spec.depthListStart; value <= spec.depthMax; value += spec.depthStep) {
      const option = document.createElement('option');
      option.value = String(value);
      option.textContent = `${value} mm`;
      list.appendChild(option);
      lastValue = value;
    }
    if (lastValue !== spec.depthMax) {
      const option = document.createElement('option');
      option.value = String(spec.depthMax);
      option.textContent = `${spec.depthMax} mm · Maksimum`;
      list.appendChild(option);
    }
  }

  function updateProductInputUi() {
    const spec = activeProductSpec();
    if ($(ids.productGroup)) $(ids.productGroup).value = modelState.productGroup;
    setText(ids.productSubgroup, spec.subgroupLabel);
    setText(ids.positionTitle, `${spec.modelLabel} Poz1`);
    setText(ids.positionDialogTitle, `${spec.modelLabel} Poz1`);
    $(ids.frame).title = `${spec.modelLabel} 3D viewer`;

    $(ids.freedomWidth).min = String(spec.widthMin);
    $(ids.freedomWidth).max = String(spec.widthMax);
    $(ids.freedomWidth).placeholder = `Maks. ${spec.widthMax} mm`;
    $(ids.freedomDepth).min = String(spec.depthMin);
    $(ids.freedomDepth).max = String(spec.depthMax);
    $(ids.freedomDepth).placeholder = `${spec.depthMin}–${spec.depthMax} mm`;
    $(ids.freedomHeight).min = String(spec.heightMin);
    if (spec.heightMax) {
      $(ids.freedomHeight).max = String(spec.heightMax);
      $(ids.freedomHeight).placeholder = `Maks. ${spec.heightMax} mm`;
    } else {
      $(ids.freedomHeight).removeAttribute('max');
      $(ids.freedomHeight).placeholder = 'Yükseklik (mm)';
    }
    $(ids.freedomPanelCount).min = String(spec.panelMin);
    $(ids.freedomPanelCount).max = String(spec.panelMax);
    $(ids.freedomPanelCount).placeholder = `${spec.panelMin}–${spec.panelMax} adet`;
    setText(ids.productFormula, `Açılım = Panel Sayısı × ${spec.panelPitch} + ${spec.projectionOffset}`);

    $(ids.width).min = String(spec.widthMin);
    $(ids.width).max = String(spec.widthMax);
    $(ids.depth).min = String(spec.depthMin);
    $(ids.depth).max = String(spec.depthMax);
    $(ids.height).min = String(spec.heightMin);
    if (spec.heightMax) $(ids.height).max = String(spec.heightMax); else $(ids.height).removeAttribute('max');
    populateProjectionOptions();
  }

  function applyProductGroupDefaults(group) {
    const spec = activeProductSpec(group);
    modelState.productGroup = group;
    modelState.postSections = Array.from({ length: 4 }, () => ({ ...spec.postSection }));
    modelState.beamSection = { ...spec.beamSection };
  }

  function handleProductGroupChange() {
    const nextGroup = $(ids.productGroup).value === 'bio-rise' ? 'bio-rise' : 'b-cube';
    if (nextGroup !== modelState.productGroup) {
      applyProductGroupDefaults(nextGroup);
      modelState.depth = 0;
      modelState.panelCount = 0;
      $(ids.freedomDepth).value = '';
      $(ids.freedomPanelCount).value = '';
      const spec = activeProductSpec();
      if (Number(modelState.width) > spec.widthMax) {
        modelState.width = 0;
        $(ids.freedomWidth).value = '';
      }
      if (spec.heightMax && Number(modelState.height) > spec.heightMax) {
        modelState.height = 0;
        $(ids.freedomHeight).value = '';
      }
      viewerCameraState = null;
      selectedZone = null;
      selectedZoneId = null;
    }
    setFreedomValidation('');
    updateProductInputUi();
    renderViewer();
  }

  function updateReadouts() {
    const model = readModel();
    const spec = activeProductSpec(model.productGroup);
    setText(ids.positionTitle, `${spec.modelLabel} Poz1`);
    setText(ids.positionDialogTitle, `${spec.modelLabel} Poz1`);
    if (!modelReady(model)) {
      setText(ids.positionSummary, 'Ölçüleri girin');
      setText(ids.productStatus, '3D model için sol paneldeki ölçüleri tamamlayın');
      return model;
    }
    setText(ids.positionSummary, `Genişlik ${model.width} mm / Açılım ${model.depth} mm / Yükseklik ${model.height} mm / ${model.lamellaCount} panel`);
    const placementCount = Object.keys(model.placements || {}).length + Object.keys(model.zipPlacements || {}).length;
    const profileCount = Object.values(model.facadeProfiles || {}).reduce((total, list) => total + (Array.isArray(list) ? list.length : 0), 0);
    const statusParts = [];
    if (placementCount) statusParts.push(`${placementCount} ürün`);
    if (profileCount) statusParts.push(`${profileCount} ara profil`);
    setText(ids.productStatus, statusParts.length ? `${statusParts.join(' · ')} yerleştirildi` : 'Bir cephe alanı seçerek işleme başlayın');
    return model;
  }

  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object || {}, key);
  }

  function effectiveProductOpen(productKey) {
    return hasOwn(modelState.productOpenStates, productKey)
      ? Boolean(modelState.productOpenStates[productKey])
      : Boolean(modelState.productsOpen);
  }

  function zipProductKey(zoneId) {
    return `zip:${zoneId}`;
  }

  function primaryPlacement(zoneId) {
    return modelState.placements[zoneId] || null;
  }

  function zipPlacement(zoneId) {
    return modelState.zipPlacements[zoneId] || null;
  }

  function zoneHasAnyProduct(zoneId) {
    return Boolean(primaryPlacement(zoneId) || zipPlacement(zoneId));
  }

  function allProductEntries() {
    const entries = [];
    Object.entries(modelState.placements || {}).forEach(([zoneId, placement]) => {
      entries.push({ key: zoneId, zoneId, placement, slot: 'primary' });
    });
    Object.entries(modelState.zipPlacements || {}).forEach(([zoneId, placement]) => {
      entries.push({ key: zipProductKey(zoneId), zoneId, placement, slot: 'zip' });
    });
    return entries;
  }

  function productTypeLabel(placement) {
    if (!placement) return 'Ürün';
    if (placement.type === 'guillotine') return 'Giyotin';
    if (placement.type === 'zip') return 'Zip Perde';
    if (placement.type === 'fixed') return 'Sabit Doğrama';
    if (placement.type === 'door') return 'Kapı (Dış Bakış)';
    return 'Sürme';
  }

  function productZoneLabel(zoneId, placement, sameFacadeIndex) {
    const facadeId = String(zoneId || '').split('|')[0];
    const facadeNames = { front: 'Ön Cephe', back: 'Arka Cephe', left: 'Sol Cephe', right: 'Sağ Cephe' };
    const suffix = sameFacadeIndex > 0 ? ` · Alan ${sameFacadeIndex + 1}` : '';
    return `${facadeNames[facadeId] || facadeId}${suffix} · ${productTypeLabel(placement)}`;
  }

  function pruneProductStates() {
    // V3.4 migration: legacy Zip records are moved into the independent front overlay slot.
    Object.entries(modelState.placements || {}).forEach(([zoneId, placement]) => {
      if (placement && placement.type === 'zip') {
        if (!modelState.zipPlacements[zoneId]) modelState.zipPlacements[zoneId] = placement;
        delete modelState.placements[zoneId];
      }
    });
    const validKeys = new Set(allProductEntries().map((entry) => entry.key));
    Object.keys(modelState.productOpenStates || {}).forEach((key) => {
      if (!validKeys.has(key)) delete modelState.productOpenStates[key];
    });
    const validZipPanels = new Set();
    Object.keys(modelState.zipPlacements || {}).forEach((zoneId) => {
      const productKey = zipProductKey(zoneId);
      validZipPanels.add(productKey);
      if (!hasOwn(modelState.productOpenStates, productKey) && hasOwn(modelState.panelStates, productKey)) {
        modelState.productOpenStates[productKey] = Boolean(modelState.panelStates[productKey]);
      }
      modelState.panelStates[productKey] = effectiveProductOpen(productKey);
    });
    Object.keys(modelState.panelStates || {}).forEach((key) => {
      if (!validZipPanels.has(key)) delete modelState.panelStates[key];
    });
  }

  function buildEmptyViewerHtml(message) {
    const safe = String(message || 'Ölçüleri girin').replace(/[&<>"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
    return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{height:100%;margin:0}body{display:grid;place-items:center;background:radial-gradient(circle at top,#334155,#0f172a 60%);font-family:Segoe UI,Arial,sans-serif;color:#dbeafe}.empty{max-width:520px;padding:24px;text-align:center;border:1px solid rgba(125,211,252,.3);border-radius:14px;background:rgba(15,23,42,.7)}strong{display:block;margin-bottom:8px;font-size:20px}span{font-size:13px;line-height:1.5;color:#bfdbfe}</style></head><body><div class="empty"><strong>${productModelLabel()} · Modul 1</strong><span>${safe}</span></div></body></html>`;
  }

  function renderViewer() {
    pruneProductStates();
    const model = updateReadouts();
    if (!modelReady(model)) {
      $(ids.frame).srcdoc = buildEmptyViewerHtml('Sol taraftaki Genişlik, Açılım, Yükseklik ve Panel Sayısı alanlarını doldurun.');
      return;
    }
    $(ids.frame).srcdoc = buildViewerHtml({
      ...model,
      cameraState: viewerCameraState,
      selectedZoneId,
      dimensionVisibility: { ...dimensionVisibility },
      productsOpen: Boolean(modelState.productsOpen),
      productOpenStates: JSON.parse(JSON.stringify(modelState.productOpenStates || {})),
      panelStates: JSON.parse(JSON.stringify(modelState.panelStates || {})),
      panelMasterOpen: Boolean(modelState.panelMasterOpen),
      toolboxSelectionMode,
      toolboxSelectionKeys: [...toolboxSelectionItems.keys()]
    });
  }

  function setDialogValues() {
    $(ids.width).value = modelState.width || '';
    $(ids.depth).value = modelState.depth || '';
    $(ids.height).value = modelState.height || '';
    updateDialogLamella();
  }

  function updateDialogLamella() {
    const depth = Math.round(Number(String($(ids.depth).value || '').replace(',', '.')));
    $(ids.dialogLamella).textContent = String(panelCountFromProjection(Number.isFinite(depth) ? depth : modelState.depth));
  }

  function openPositionDialog() {
    $(ids.freedomWidth).focus();
    $(ids.freedomWidth).select();
  }

  function closePositionDialog() {
    $(ids.dialog).hidden = true;
  }

  function readDialogNumber(id, minimum) {
    const value = Math.round(Number(String($(id).value || '').replace(',', '.')));
    if (!Number.isFinite(value) || value < minimum) return null;
    return value;
  }

  function dimensionsFit(model) {
    return (
      model.postSections[0].x + model.postSections[1].x <= model.width - 120 &&
      model.postSections[2].x + model.postSections[3].x <= model.width - 120 &&
      model.postSections[0].z + model.postSections[2].z <= model.depth - 120 &&
      model.postSections[1].z + model.postSections[3].z <= model.depth - 120 &&
      model.beamSection.vertical < model.height - 200 &&
      model.beamSection.thickness < Math.min(model.width, model.depth) / 2
    );
  }

  function applyPositionForm() {
    const spec = activeProductSpec();
    const nextWidth = readDialogNumber(ids.width, spec.widthMin);
    const nextDepth = readDialogNumber(ids.depth, spec.depthMin);
    const nextHeight = readDialogNumber(ids.height, spec.heightMin);
    if (nextWidth === null || nextDepth === null || nextHeight === null || nextWidth > spec.widthMax || nextDepth > spec.depthMax || (spec.heightMax && nextHeight > spec.heightMax)) {
      alert('Please enter valid Width, Projection and Height values.');
      return;
    }
    const previous = { width: modelState.width, depth: modelState.depth, height: modelState.height, panelCount: modelState.panelCount };
    modelState.width = nextWidth;
    modelState.depth = nextDepth;
    modelState.height = nextHeight;
    modelState.panelCount = panelCountFromProjection(nextDepth);
    const model = readModel();
    if (!dimensionsFit(model)) {
      modelState.width = previous.width;
      modelState.depth = previous.depth;
      modelState.height = previous.height;
      modelState.panelCount = previous.panelCount;
      alert('This dimension is too small for the current post/profile sections.');
      return;
    }
    closePositionDialog();
    renderViewer();
  }

  function readFreedomNumber(id) {
    const raw = String($(id).value || '').trim().replace(',', '.');
    if (!raw) return null;
    const value = Math.round(Number(raw));
    return Number.isFinite(value) ? value : null;
  }

  function setFreedomValidation(message) {
    $(ids.freedomValidation).textContent = message || '';
  }

  function syncProjectionFromPanelCount() {
    const count = readFreedomNumber(ids.freedomPanelCount);
    const spec = activeProductSpec();
    setFreedomValidation('');
    if (count === null) return;
    if (count < spec.panelMin || count > spec.panelMax) {
      setFreedomValidation(`Panel sayısı ${spec.panelMin}–${spec.panelMax} arasında olmalıdır.`);
      return;
    }
    $(ids.freedomDepth).value = String(projectionFromPanelCount(count));
  }

  function syncPanelCountFromProjection() {
    const depth = readFreedomNumber(ids.freedomDepth);
    const spec = activeProductSpec();
    setFreedomValidation('');
    if (depth === null) return;
    if (depth < spec.depthMin || depth > spec.depthMax) {
      setFreedomValidation(`Açılım ${spec.depthMin}–${spec.depthMax} mm arasında olmalıdır.`);
      return;
    }
    $(ids.freedomPanelCount).value = String(panelCountFromProjection(depth));
  }

  function applyFreedomInputs() {
    const spec = activeProductSpec();
    const width = readFreedomNumber(ids.freedomWidth);
    const depth = readFreedomNumber(ids.freedomDepth);
    const height = readFreedomNumber(ids.freedomHeight);
    const panelCount = readFreedomNumber(ids.freedomPanelCount);
    if (width === null || depth === null || height === null || panelCount === null) {
      setFreedomValidation('Genişlik, Açılım, Yükseklik ve Panel Sayısı alanlarını doldurun.');
      return false;
    }
    if (width < spec.widthMin || width > spec.widthMax) {
      setFreedomValidation(`Genişlik ${spec.widthMin}–${spec.widthMax} mm arasında olmalıdır.`);
      return false;
    }
    if (depth < spec.depthMin || depth > spec.depthMax) {
      setFreedomValidation(`Açılım ${spec.depthMin}–${spec.depthMax} mm arasında olmalıdır.`);
      return false;
    }
    if (height < spec.heightMin || (spec.heightMax && height > spec.heightMax)) {
      setFreedomValidation(spec.heightMax ? `Yükseklik ${spec.heightMin}–${spec.heightMax} mm arasında olmalıdır.` : `Yükseklik en az ${spec.heightMin} mm olmalıdır.`);
      return false;
    }
    if (panelCount < spec.panelMin || panelCount > spec.panelMax) {
      setFreedomValidation(`Panel sayısı ${spec.panelMin}–${spec.panelMax} arasında olmalıdır.`);
      return false;
    }
    const previous = { width: modelState.width, depth: modelState.depth, height: modelState.height, panelCount: modelState.panelCount };
    modelState.width = width;
    modelState.depth = depth;
    modelState.height = height;
    modelState.panelCount = panelCount;
    if (!dimensionsFit(readModel())) {
      Object.assign(modelState, previous);
      setFreedomValidation('Bu ölçüler mevcut profil kesitleri için yetersiz.');
      return false;
    }
    setFreedomValidation('');
    renderViewer();
    return true;
  }

  function zonePlacement(zone) {
    return zone ? (primaryPlacement(zone.id) || zipPlacement(zone.id) || null) : null;
  }

  const TOOLBOX_SELECTION_CONFIG = {
    'multi-product': { title: 'Çoklu Ürün Ekleme', hint: 'Uygun alanları seçin. Zip Perde dolu alanlara da ön katman olarak eklenebilir. Enter veya sağ tıkla tamamlayın.', buttonId: ids.multiProduct },
    'multi-delete': { title: 'Çoklu Ürün Silme', hint: 'Ürün bulunan alanları seçin. Enter veya sağ tıkla tamamlayın.', buttonId: ids.multiDelete },
    'multi-profile-add': { title: 'Çoklu Profil Ekleme', hint: 'Ürünsüz ve yeterli büyüklükteki alanları seçin.', buttonId: ids.multiProfileAdd },
    'multi-profile-delete': { title: 'Çoklu Profil Silme', hint: 'Sonradan eklenen profilleri seçin.', buttonId: ids.multiProfileDelete },
    'fit-products': { title: 'Ürünleri Alana Uydur', hint: 'Ürün bulunan alanları seçin.', buttonId: ids.fitProducts }
  };

  function updateProductOpenList() {
    const list = $(ids.productOpenList);
    if (!list) return;
    list.innerHTML = '';
    const entries = allProductEntries().sort((a, b) => a.key.localeCompare(b.key, 'tr'));
    if ($(ids.productOpenEmpty)) $(ids.productOpenEmpty).hidden = entries.length > 0;
    const facadeCounts = {};
    entries.forEach(({ key, zoneId, placement }) => {
      const facadeId = String(zoneId).split('|')[0];
      const index = facadeCounts[facadeId] || 0;
      facadeCounts[facadeId] = index + 1;
      const label = document.createElement('label');
      label.className = 'product-open-row';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = effectiveProductOpen(key);
      input.addEventListener('change', () => {
        modelState.productOpenStates[key] = Boolean(input.checked);
        if (placement && placement.type === 'zip') modelState.panelStates[key] = Boolean(input.checked);
        updateToolbox();
        renderViewer();
      });
      const text = document.createElement('span');
      text.textContent = productZoneLabel(zoneId, placement, index);
      label.appendChild(input);
      label.appendChild(text);
      list.appendChild(label);
    });
  }

  function updateToolbox() {
    $(ids.toolboxIntermediateDimensions).checked = dimensionVisibility.intermediate !== false;
    $(ids.toolboxMainDimensions).checked = dimensionVisibility.main !== false;
    $(ids.replay).textContent = modelState.productsOpen ? 'Ürünler Açık' : 'Ürünler Kapalı';
    $(ids.replay).classList.toggle('is-open', Boolean(modelState.productsOpen));
    $(ids.replay).classList.toggle('is-closed', !modelState.productsOpen);
    if ($(ids.panelMaster)) $(ids.panelMaster).checked = Boolean(modelState.panelMasterOpen);
    updateProductOpenList();
    Object.entries(TOOLBOX_SELECTION_CONFIG).forEach(([mode, config]) => {
      const button = $(config.buttonId);
      if (button) button.classList.toggle('is-active-command', toolboxSelectionMode === mode);
    });
    const config = TOOLBOX_SELECTION_CONFIG[toolboxSelectionMode];
    $(ids.selectionBanner).hidden = !config;
    if (config) {
      $(ids.selectionBannerTitle).textContent = config.title;
      $(ids.selectionBannerText).textContent = `${config.hint} · ${toolboxSelectionItems.size} seçim`;
    }
  }

  function postToolboxSelectionState() {
    const frameWindow = $(ids.frame).contentWindow;
    if (!frameWindow) return;
    frameWindow.postMessage({
      source: 'product-3d-parent',
      type: 'set-toolbox-selection',
      mode: toolboxSelectionMode,
      keys: [...toolboxSelectionItems.keys()]
    }, '*');
  }

  function cancelToolboxSelection() {
    toolboxSelectionMode = null;
    toolboxSelectionItems = new Map();
    updateToolbox();
    postToolboxSelectionState();
  }

  function startToolboxSelection(mode) {
    if (!TOOLBOX_SELECTION_CONFIG[mode]) return;
    if (toolboxSelectionMode === mode) {
      cancelToolboxSelection();
      return;
    }
    closeZoneActionDialog();
    closeDividerProfileDialog();
    closePostActionDialog();
    toolboxSelectionMode = mode;
    toolboxSelectionItems = new Map();
    clearZoneSelection();
    updateToolbox();
    postToolboxSelectionState();
  }

  function toggleToolboxSelectionItem(item) {
    if (!toolboxSelectionMode || !item || !item.key) return;
    if (toolboxSelectionItems.has(item.key)) toolboxSelectionItems.delete(item.key);
    else toolboxSelectionItems.set(item.key, item);
    updateToolbox();
    postToolboxSelectionState();
  }

  function removeProfilesBatch(items) {
    const byFacade = new Map();
    items.forEach((item) => {
      const profile = item.profile;
      if (!profile || !profile.facadeId || !profile.id) return;
      if (!byFacade.has(profile.facadeId)) byFacade.set(profile.facadeId, new Set());
      byFacade.get(profile.facadeId).add(profile.id);
    });
    byFacade.forEach((removedIds, facadeId) => {
      const current = getFacadeProfiles(facadeId);
      current.forEach((profile) => {
        if (profile.orientation === 'horizontal' && (removedIds.has(profile.leftBoundaryId) || removedIds.has(profile.rightBoundaryId))) removedIds.add(profile.id);
      });
      modelState.facadeProfiles[facadeId] = current.filter((profile) => !removedIds.has(profile.id));
      [modelState.placements, modelState.zipPlacements].forEach((store) => {
        Object.keys(store || {}).forEach((zoneId) => {
          if (zoneId.startsWith(`${facadeId}|`) && [...removedIds].some((id) => zoneId.includes(id))) delete store[zoneId];
        });
      });
    });
  }

  function completeToolboxSelection() {
    const mode = toolboxSelectionMode;
    if (!mode) return;
    const items = [...toolboxSelectionItems.values()];
    if (!items.length) {
      $(ids.selectionBannerText).textContent = `${TOOLBOX_SELECTION_CONFIG[mode].hint} · En az bir hedef seçin.`;
      return;
    }
    if (mode === 'multi-product') {
      const zones = items.map((item) => item.zone).filter(Boolean);
      cancelToolboxSelection();
      openProductDialog(zones[0], zones);
      return;
    }
    if (mode === 'multi-profile-add') {
      const zones = items.map((item) => item.zone).filter(Boolean);
      cancelToolboxSelection();
      selectedZone = zones[0] || null;
      selectedZoneId = selectedZone ? selectedZone.id : null;
      openProfileDialog(zones);
      return;
    }
    if (mode === 'multi-delete') {
      if (!window.confirm(`${items.length} seçili ürün silinsin mi?`)) return;
      items.forEach((item) => { if (item.zone) { delete modelState.placements[item.zone.id]; delete modelState.zipPlacements[item.zone.id]; } });
    } else if (mode === 'multi-profile-delete') {
      if (!window.confirm(`${items.length} seçili profil ve bağlı ürünleri silinsin mi?`)) return;
      removeProfilesBatch(items);
    } else if (mode === 'fit-products') {
      items.forEach((item) => {
        if (item.zone && modelState.placements[item.zone.id]) modelState.placements[item.zone.id] = { ...modelState.placements[item.zone.id], fitRevision: Date.now() };
        if (item.zone && modelState.zipPlacements[item.zone.id]) modelState.zipPlacements[item.zone.id] = { ...modelState.zipPlacements[item.zone.id], fitRevision: Date.now() };
      });
    }
    cancelToolboxSelection();
    clearZoneSelection();
    renderViewer();
  }

  function closeZoneActionDialog() {
    $(ids.zoneActionDialog).hidden = true;
  }

  function openZoneActionDialog() {
    if (!selectedZone) return;
    const placement = zonePlacement(selectedZone);
    $(ids.zoneActionTitle).textContent = selectedZone.label;
    $(ids.zoneActionInfo).textContent = `${Math.round(selectedZone.width)} × ${Math.round(selectedZone.height)} mm net alan. Yapılacak işlemi seçin.`;
    $(ids.zoneActionAddProfile).disabled = Boolean(placement) || selectedZone.width < 600 || selectedZone.height < 600;
    const hasPrimary = Boolean(primaryPlacement(selectedZone.id));
    const hasZip = Boolean(zipPlacement(selectedZone.id));
    $(ids.zoneActionPlaceProduct).textContent = hasPrimary && hasZip ? 'Ürünleri Düzenle' : (placement ? 'Ürünü Düzenle / Ekle' : 'Ürün Yerleştir');
    $(ids.zoneActionDeleteProduct).disabled = !placement;
    $(ids.zoneActionDialog).hidden = false;
  }

  function selectZone(zone) {
    selectedZone = zone ? { ...zone } : null;
    selectedZoneId = selectedZone ? selectedZone.id : null;
    if (selectedZone) openZoneActionDialog();
  }

  function clearZoneSelection() {
    selectedZone = null;
    selectedZoneId = null;
    closeZoneActionDialog();
  }

  function getFacadeProfiles(facadeId) {
    if (!modelState.facadeProfiles[facadeId]) modelState.facadeProfiles[facadeId] = [];
    return modelState.facadeProfiles[facadeId];
  }

  function applyProfilePreset() {
    const custom = $(ids.profileType).value === 'CUSTOM';
    $(ids.profileCustomFields).hidden = !custom;
    if (!custom) {
      $(ids.profileWidth).value = '100';
      $(ids.profileDepth).value = '100';
    }
  }

  function openProfileDialog(zones) {
    const targets = Array.isArray(zones) && zones.length ? zones.map((zone) => ({ ...zone })) : (selectedZone ? [{ ...selectedZone }] : []);
    if (!targets.length) return;
    closeZoneActionDialog();
    if (targets.some((zone) => zonePlacement(zone))) {
      alert('Ürün bulunan alana profil eklenemez. Önce ürünü silin.');
      return;
    }
    bulkProfileZones = targets.length > 1 ? targets : null;
    selectedZone = targets[0];
    selectedZoneId = selectedZone.id;
    $(ids.profileOrientation).value = 'vertical';
    $(ids.profileType).value = '100x100';
    $(ids.profileWidth).value = '100';
    $(ids.profileDepth).value = '100';
    $(ids.profileCustomFields).hidden = true;
    $(ids.profileValidation).textContent = '';
    $(ids.profileDialog).hidden = false;
    $(ids.profileOrientation).focus();
  }

  function closeProfileDialog() {
    bulkProfileZones = null;
    $(ids.profileDialog).hidden = true;
    $(ids.profileValidation).textContent = '';
  }

  function verticalProfileLayoutFits(profiles, baseWidth) {
    const sorted = profiles
      .filter((profile) => (profile.orientation || 'vertical') === 'vertical')
      .sort((a, b) => a.positionRatio - b.positionRatio);
    let cursor = -baseWidth / 2;
    for (const profile of sorted) {
      const center = -baseWidth / 2 + profile.positionRatio * baseWidth;
      const left = center - profile.width / 2;
      const right = center + profile.width / 2;
      if (left - cursor < 250) return false;
      cursor = right;
    }
    return baseWidth / 2 - cursor >= 250;
  }

  function horizontalProfileLayoutFits(profiles, baseHeight, leftBoundaryId, rightBoundaryId) {
    const sorted = profiles
      .filter((profile) => profile.orientation === 'horizontal' && profile.leftBoundaryId === leftBoundaryId && profile.rightBoundaryId === rightBoundaryId)
      .sort((a, b) => a.positionYRatio - b.positionYRatio);
    let cursor = 0;
    for (const profile of sorted) {
      const center = profile.positionYRatio * baseHeight;
      const bottom = center - profile.width / 2;
      const top = center + profile.width / 2;
      if (bottom - cursor < 250) return false;
      cursor = top;
    }
    return baseHeight - cursor >= 250;
  }

  function buildProfileForZone(zone, orientation, width, depth, id, profiles) {
    const facadeId = zone.facadeId || zone.id.split('|')[0];
    const baseWidth = Number(zone.baseWidth || zone.width);
    const baseHeight = Number(zone.baseHeight || zone.height);
    const custom = $(ids.profileType).value === 'CUSTOM';
    if (orientation === 'vertical') {
      if (width > zone.width - 500) return { error: `${zone.label}: Dikey profil sonrasında iki tarafta en az 250 mm net alan kalmalıdır.` };
      const profile = {
        id,
        orientation: 'vertical',
        positionRatio: (Number(zone.startRatio || 0) + Number(zone.endRatio || 1)) / 2,
        width,
        depth,
        type: custom ? 'CUSTOM' : '100x100',
        label: `Dikey Profil ${width} × ${depth}`
      };
      if (!verticalProfileLayoutFits([...profiles, profile], baseWidth)) return { error: `${zone.label}: Profil yeterli iki açıklık bırakamıyor.` };
      return { facadeId, profile };
    }
    if (width > zone.height - 500) return { error: `${zone.label}: Yatay profil sonrasında üstte ve altta en az 250 mm net alan kalmalıdır.` };
    const leftBoundaryId = zone.leftBoundaryId || 'START';
    const rightBoundaryId = zone.rightBoundaryId || 'END';
    const profile = {
      id,
      orientation: 'horizontal',
      positionYRatio: (Number(zone.bottomRatio || 0) + Number(zone.topRatio || 1)) / 2,
      leftBoundaryId,
      rightBoundaryId,
      scopeStartRatio: Number(zone.startRatio || 0),
      scopeEndRatio: Number(zone.endRatio || 1),
      width,
      depth,
      type: custom ? 'CUSTOM' : '100x100',
      label: `Yatay Profil ${width} × ${depth}`
    };
    if (!horizontalProfileLayoutFits([...profiles, profile], baseHeight, leftBoundaryId, rightBoundaryId)) return { error: `${zone.label}: Yatay profil yeterli iki açıklık bırakamıyor.` };
    return { facadeId, profile };
  }

  function applyProfileForm() {
    const targets = bulkProfileZones && bulkProfileZones.length ? bulkProfileZones : (selectedZone ? [selectedZone] : []);
    if (!targets.length) return;
    const orientation = $(ids.profileOrientation).value === 'horizontal' ? 'horizontal' : 'vertical';
    const custom = $(ids.profileType).value === 'CUSTOM';
    const width = custom ? Math.round(Number($(ids.profileWidth).value)) : 100;
    const depth = custom ? Math.round(Number($(ids.profileDepth).value)) : 100;
    if (!Number.isFinite(width) || width < 40 || width > 300 || !Number.isFinite(depth) || depth < 30 || depth > 300) {
      $(ids.profileValidation).textContent = 'Profil kesiti belirtilen aralıklarda olmalıdır.';
      return;
    }
    const snapshot = JSON.parse(JSON.stringify(modelState.facadeProfiles || {}));
    const sequenceSnapshot = profileSequence;
    for (const zone of targets) {
      if (zonePlacement(zone)) {
        modelState.facadeProfiles = snapshot;
        profileSequence = sequenceSnapshot;
        $(ids.profileValidation).textContent = `${zone.label}: Ürün bulunan alana profil eklenemez.`;
        return;
      }
      const facadeId = zone.facadeId || zone.id.split('|')[0];
      const current = getFacadeProfiles(facadeId);
      const result = buildProfileForZone(zone, orientation, width, depth, `pf${profileSequence++}`, current);
      if (result.error) {
        modelState.facadeProfiles = snapshot;
        profileSequence = sequenceSnapshot;
        $(ids.profileValidation).textContent = result.error;
        return;
      }
      modelState.facadeProfiles[result.facadeId] = [...current, result.profile];
    }
    closeProfileDialog();
    clearZoneSelection();
    renderViewer();
  }

  function openDividerProfileDialog(profile) {
    selectedDividerProfile = profile ? { ...profile } : null;
    if (!selectedDividerProfile) return;
    const direction = selectedDividerProfile.orientation === 'horizontal' ? 'Yatay' : 'Dikey';
    $(ids.dividerProfileTitle).textContent = `${direction} Profil`;
    $(ids.dividerProfileInfo).textContent = `${selectedDividerProfile.label || 'Eklenen profil'} · Silme işlemi bu profile bağlı alt alanlardaki ürünleri de kaldırır.`;
    $(ids.dividerProfileDialog).hidden = false;
  }

  function closeDividerProfileDialog() {
    selectedDividerProfile = null;
    $(ids.dividerProfileDialog).hidden = true;
  }

  function deleteSelectedDividerProfile() {
    if (!selectedDividerProfile) return;
    if (!window.confirm('Profil ve bu profile bağlı alt alanlardaki ürünler silinsin mi?')) return;
    const facadeId = selectedDividerProfile.facadeId;
    const profileId = selectedDividerProfile.id;
    const currentProfiles = getFacadeProfiles(facadeId);
    const removedIds = new Set([profileId]);
    if (selectedDividerProfile.orientation !== 'horizontal') {
      currentProfiles.forEach((profile) => {
        if (profile.orientation === 'horizontal' && (profile.leftBoundaryId === profileId || profile.rightBoundaryId === profileId)) removedIds.add(profile.id);
      });
    }
    modelState.facadeProfiles[facadeId] = currentProfiles.filter((profile) => !removedIds.has(profile.id));
    Object.keys(modelState.placements).forEach((zoneId) => {
      if (zoneId.startsWith(`${facadeId}|`) && [...removedIds].some((id) => zoneId.includes(id))) delete modelState.placements[zoneId];
    });
    closeDividerProfileDialog();
    clearZoneSelection();
    renderViewer();
  }

  function postName(index) {
    return ['Ön Sol Dikme', 'Ön Sağ Dikme', 'Arka Sol Dikme', 'Arka Sağ Dikme'][index] || `Dikme ${index + 1}`;
  }

  function openPostActionDialog(index) {
    selectedPostIndex = Number(index);
    if (!Number.isInteger(selectedPostIndex) || selectedPostIndex < 0 || selectedPostIndex > 3) return;
    const section = modelState.postSections[selectedPostIndex];
    $(ids.postActionTitle).textContent = postName(selectedPostIndex);
    $(ids.postActionInfo).textContent = `Mevcut kesit ${section.x} × ${section.z} mm. Toplam sistem ölçüleri değişmeden bağlı parçalar ve ürünler uyarlanır.`;
    $(ids.postRotateProfile).disabled = section.x === section.z;
    $(ids.postActionDialog).hidden = false;
  }

  function closePostActionDialog() {
    selectedPostIndex = null;
    $(ids.postActionDialog).hidden = true;
  }

  function applyPostPreset() {
    const value = $(ids.postProfileType).value;
    const custom = value === 'CUSTOM';
    $(ids.postCustomFields).hidden = !custom;
    if (!custom) {
      const [x, z] = value.split('x').map(Number);
      $(ids.postX).value = String(x);
      $(ids.postZ).value = String(z);
    }
  }

  function openPostProfileDialog() {
    if (!Number.isInteger(selectedPostIndex)) return;
    const section = modelState.postSections[selectedPostIndex];
    const preset = section.x === 100 && section.z === 220 ? '100x220' : (section.x === 100 && section.z === 100 ? '100x100' : 'CUSTOM');
    $(ids.postProfileTitle).textContent = `${postName(selectedPostIndex)} Profilini Değiştir`;
    $(ids.postProfileType).value = preset;
    $(ids.postX).value = String(section.x);
    $(ids.postZ).value = String(section.z);
    $(ids.postCustomFields).hidden = preset !== 'CUSTOM';
    $(ids.postValidation).textContent = '';
    $(ids.postActionDialog).hidden = true;
    $(ids.postProfileDialog).hidden = false;
  }

  function closePostProfileDialog() {
    $(ids.postProfileDialog).hidden = true;
    $(ids.postValidation).textContent = '';
  }

  function applyPostProfileForm() {
    if (!Number.isInteger(selectedPostIndex)) return;
    const value = $(ids.postProfileType).value;
    let x;
    let z;
    if (value === 'CUSTOM') {
      x = Math.round(Number($(ids.postX).value));
      z = Math.round(Number($(ids.postZ).value));
    } else {
      [x, z] = value.split('x').map(Number);
    }
    if (!Number.isFinite(x) || !Number.isFinite(z) || x < 40 || z < 40 || x > 300 || z > 300) {
      $(ids.postValidation).textContent = 'Geçerli X ve Z profil ölçüleri girin.';
      return;
    }
    const previous = { ...modelState.postSections[selectedPostIndex] };
    modelState.postSections[selectedPostIndex] = { x, z };
    if (!dimensionsFit(readModel())) {
      modelState.postSections[selectedPostIndex] = previous;
      $(ids.postValidation).textContent = 'Bu profil mevcut toplam sistem ölçülerine sığmıyor.';
      return;
    }
    closePostProfileDialog();
    selectedPostIndex = null;
    clearZoneSelection();
    renderViewer();
  }

  function rotateSelectedPost() {
    if (!Number.isInteger(selectedPostIndex)) return;
    const current = modelState.postSections[selectedPostIndex];
    if (current.x === current.z) return;
    modelState.postSections[selectedPostIndex] = { x: current.z, z: current.x };
    if (!dimensionsFit(readModel())) {
      modelState.postSections[selectedPostIndex] = current;
      alert('Döndürülmüş profil mevcut toplam sistem ölçülerine sığmıyor.');
      return;
    }
    closePostActionDialog();
    clearZoneSelection();
    renderViewer();
  }

  function openZoneDimensionDialog() {
    if (!selectedZone) return;
    closeZoneActionDialog();
    $(ids.zoneDimensionTitle).textContent = `${selectedZone.label} Ölçüsü`;
    $(ids.zoneWidth).value = String(Math.round(selectedZone.width));
    $(ids.zoneHeight).value = String(Math.round(selectedZone.height));
    $(ids.zoneDimensionValidation).textContent = '';
    $(ids.zoneDimensionDialog).hidden = false;
    $(ids.zoneWidth).focus();
    $(ids.zoneWidth).select();
  }

  function closeZoneDimensionDialog() {
    $(ids.zoneDimensionDialog).hidden = true;
    $(ids.zoneDimensionValidation).textContent = '';
  }

  function applyZoneDimensionForm() {
    if (!selectedZone) return;
    const nextWidth = Math.round(Number($(ids.zoneWidth).value));
    const nextHeight = Math.round(Number($(ids.zoneHeight).value));
    if (!Number.isFinite(nextWidth) || nextWidth < 250 || !Number.isFinite(nextHeight) || nextHeight < 250) {
      $(ids.zoneDimensionValidation).textContent = 'Geçerli net genişlik ve yükseklik değerleri girin.';
      return;
    }

    const snapshot = {
      width: modelState.width,
      depth: modelState.depth,
      height: modelState.height,
      profiles: JSON.parse(JSON.stringify(modelState.facadeProfiles || {}))
    };
    const widthDelta = nextWidth - Number(selectedZone.width);
    const heightDelta = nextHeight - Number(selectedZone.height);
    const facadeId = selectedZone.facadeId || selectedZone.id.split('|')[0];
    const profiles = getFacadeProfiles(facadeId);
    const verticalProfiles = profiles.filter((profile) => (profile.orientation || 'vertical') === 'vertical');
    const horizontalProfiles = profiles.filter((profile) => profile.orientation === 'horizontal');

    if (Math.abs(widthDelta) >= 1) {
      const movableId = selectedZone.rightBoundaryId && selectedZone.rightBoundaryId !== 'END'
        ? selectedZone.rightBoundaryId
        : (selectedZone.leftBoundaryId && selectedZone.leftBoundaryId !== 'START' ? selectedZone.leftBoundaryId : null);
      const profile = verticalProfiles.find((item) => item.id === movableId);
      const baseWidth = Number(selectedZone.baseWidth || 0);
      if (profile && baseWidth) {
        const sign = movableId === selectedZone.rightBoundaryId ? 1 : -1;
        profile.positionRatio += sign * widthDelta / baseWidth;
        profile.positionRatio = Math.max(.01, Math.min(.99, profile.positionRatio));
        if (!verticalProfileLayoutFits(profiles, baseWidth)) {
          modelState.facadeProfiles = snapshot.profiles;
          $(ids.zoneDimensionValidation).textContent = 'Bu genişlik komşu alanı 250 mm sınırının altına düşürüyor.';
          return;
        }
      } else if (!verticalProfiles.length) {
        if (selectedZone.axis === 'x') modelState.width += widthDelta;
        else modelState.depth += widthDelta;
      } else {
        $(ids.zoneDimensionValidation).textContent = 'Bu alanın hareketli dikey profil sınırı bulunamadı.';
        return;
      }
    }

    if (Math.abs(heightDelta) >= 1) {
      const movableId = selectedZone.topBoundaryId && selectedZone.topBoundaryId !== 'TOP'
        ? selectedZone.topBoundaryId
        : (selectedZone.bottomBoundaryId && selectedZone.bottomBoundaryId !== 'BOTTOM' ? selectedZone.bottomBoundaryId : null);
      const profile = horizontalProfiles.find((item) => item.id === movableId);
      const baseHeight = Number(selectedZone.baseHeight || 0);
      if (profile && baseHeight) {
        const sign = movableId === selectedZone.topBoundaryId ? 1 : -1;
        profile.positionYRatio += sign * heightDelta / baseHeight;
        profile.positionYRatio = Math.max(.01, Math.min(.99, profile.positionYRatio));
        if (!horizontalProfileLayoutFits(profiles, baseHeight, profile.leftBoundaryId, profile.rightBoundaryId)) {
          modelState.facadeProfiles = snapshot.profiles;
          $(ids.zoneDimensionValidation).textContent = 'Bu yükseklik komşu alanı 250 mm sınırının altına düşürüyor.';
          return;
        }
      } else if (!horizontalProfiles.length) {
        modelState.height += heightDelta;
      } else {
        $(ids.zoneDimensionValidation).textContent = 'Bu alanın hareketli yatay profil sınırı bulunamadı.';
        return;
      }
    }

    if (!dimensionsFit(readModel())) {
      modelState.width = snapshot.width;
      modelState.depth = snapshot.depth;
      modelState.height = snapshot.height;
      modelState.facadeProfiles = snapshot.profiles;
      $(ids.zoneDimensionValidation).textContent = 'Bu ölçü mevcut dikme ve profil kesitleriyle uyumlu değil.';
      return;
    }

    closeZoneDimensionDialog();
    clearZoneSelection();
    renderViewer();
  }

  function openSelectedProduct() {
    if (!selectedZone) return;
    closeZoneActionDialog();
    openProductDialog(selectedZone);
  }

  function removeSelectedProduct() {
    if (!selectedZone || !zonePlacement(selectedZone)) return;
    if (!window.confirm('Seçili alandaki ürün silinsin mi?')) return;
    delete modelState.placements[selectedZone.id];
    delete modelState.zipPlacements[selectedZone.id];
    delete modelState.productOpenStates[selectedZone.id];
    delete modelState.productOpenStates[zipProductKey(selectedZone.id)];
    delete modelState.panelStates[zipProductKey(selectedZone.id)];
    closeZoneActionDialog();
    renderViewer();
  }

  function setDimensionVisibility(kind, visible) {
    if (!['intermediate', 'main'].includes(kind)) return;
    dimensionVisibility[kind] = Boolean(visible);
    updateToolbox();
    const frameWindow = $(ids.frame).contentWindow;
    if (frameWindow) frameWindow.postMessage({
      source: 'product-3d-parent',
      type: 'set-dimension-visibility',
      visibility: { ...dimensionVisibility }
    }, '*');
  }

  function resetViewerCamera() {
    viewerCameraState = null;
    const frameWindow = $(ids.frame).contentWindow;
    if (frameWindow) frameWindow.postMessage({ source: 'product-3d-parent', type: 'reset-camera' }, '*');
  }

  function toggleProductsOpen() {
    modelState.productsOpen = !modelState.productsOpen;
    updateToolbox();
    renderViewer();
  }

  let activeZone = null;

  const DOOR_TYPE_OPTIONS = [
    ['SINGLE', 'Tek Kanat', 'Hareketli'],
    ['DOUBLE', 'Çift Kanat', 'Hareketli'],
    ['LEFT_FIXED_RIGHT_MOVING', 'Tek Kanat', 'Sol Sabit'],
    ['RIGHT_FIXED_LEFT_MOVING', 'Tek Kanat', 'Sağ Sabit'],
    ['TOP_FIXED', 'Tek Kanat', 'Üst Sabit'],
    ['LEFT_FIXED_TOP', 'Tek Kanat', 'Sol–Üst Sabit'],
    ['RIGHT_FIXED_TOP', 'Tek Kanat', 'Sağ–Üst Sabit'],
    ['BOTH_FIXED_TOP', 'Tek Kanat', 'Sağ–Sol–Üst Sabit'],
    ['DOUBLE_TOP', 'Çift Kanat', 'Üst Sabit'],
    ['DOUBLE_LEFT_FIXED', 'Çift Kanat', 'Sol Sabit'],
    ['DOUBLE_LEFT_FIXED_TOP', 'Çift Kanat', 'Sol–Üst Sabit'],
    ['DOUBLE_RIGHT_FIXED_TOP', 'Çift Kanat', 'Sağ–Üst Sabit'],
    ['DOUBLE_BOTH_FIXED_TOP', 'Çift Kanat', 'Sağ–Sol–Üst Sabit']
  ];
  const DOOR_TYPE_VALUES = DOOR_TYPE_OPTIONS.map((item) => item[0]);
  const DOOR_TOP_FIXED_TYPES = new Set(['TOP_FIXED','LEFT_FIXED_TOP','RIGHT_FIXED_TOP','BOTH_FIXED_TOP','DOUBLE_TOP','DOUBLE_LEFT_FIXED_TOP','DOUBLE_RIGHT_FIXED_TOP','DOUBLE_BOTH_FIXED_TOP']);
  const DOOR_DOUBLE_TYPES = new Set(['DOUBLE','DOUBLE_TOP','DOUBLE_LEFT_FIXED','DOUBLE_LEFT_FIXED_TOP','DOUBLE_RIGHT_FIXED_TOP','DOUBLE_BOTH_FIXED_TOP']);

  const PRODUCT_OPTIONS = {
    sliding: {
      subtypes: [
        ['WITH THRESHOLD', 'Eşikli'],
        ['WITHOUT THRESHOLD', 'Eşiksiz']
      ],
      openings: [
        ['SIDE OPENING', 'Yana Açılım'],
        ['CENTER OPENING', 'Ortadan Açılım']
      ],
      sideDirections: [
        ['LEFT', 'Sol'],
        ['RIGHT', 'Sağ']
      ],
      centerLayers: [
        ['OUTSIDE', 'Dışta'],
        ['INSIDE', 'İçte']
      ],
      thicknessA: [
        ['8 MM', '8 mm'],
        ['10 MM', '10 mm'],
        ['INSULATED GLASS', 'Yalıtımlı Cam']
      ],
      thicknessK: [
        ['8 MM', '8 mm'],
        ['INSULATED GLASS', 'Yalıtımlı Cam']
      ]
    },
    guillotine: {
      subtypesA: [
        ['CLEANABLE', 'Temizlenebilir'],
        ['UPWARD COLLECTING', 'Yukarı Toplanan'],
        ['DOWNWARD COLLECTING', 'Aşağı Toplanan']
      ],
      subtypesK: [
        ['CLEANABLE', 'Temizlenebilir']
      ],
      mechanismsA: [
        ['CHAIN', 'Zincir'],
        ['BELT', 'Kayış']
      ],
      mechanismsK: [
        ['BELT', 'Kayış']
      ],
      thicknessA: [
        ['8 MM', '8 mm'],
        ['INSULATED GLASS', 'Yalıtımlı Cam']
      ],
      thicknessK: [
        ['INSULATED GLASS', 'Yalıtımlı Cam']
      ]
    },
    zip: {
      series: [
        ['G SERIES', 'G Serisi'],
        ['P SERIES', 'P Serisi']
      ],
      subtypesG: [
        ['100x100 BOX', '100x100 Kutu'],
        ['110x110 BOX', '110x110 Kutu'],
        ['HERCULE', 'Hercule']
      ],
      subtypesP: [
        ['115x115 BOX', '115x115 Kutu'],
        ['130x130 BOX', '130x130 Kutu']
      ],
      placements: [
        ['BETWEEN POSTS', 'Dikme Arası'],
        ['FRONT OF POSTS', 'Dikmenin Önü']
      ],
      fabricColors: [
        ['SOLTIS', 'Soltis'],
        ['OTHER', 'Diğer']
      ],
      cableDirections: [
        ['BACK', 'Arkadan'],
        ['TOP', 'Üstten'],
        ['SIDE', 'Yandan']
      ]
    },
    door: {
      types: DOOR_TYPE_OPTIONS,
      hinges: [['LEFT', 'Sol'], ['RIGHT', 'Sağ']],
      activeLeaves: [['RIGHT', 'Sağ Aktif'], ['LEFT', 'Sol Aktif']],
      openDirections: [['OUTWARD', 'Dışa'], ['INWARD', 'İçe']],
      handles: [['NORMAL', 'Normal Kapı Kolu'], ['PANIC', 'Panik Kapı Kolu']]
    }
  };

  function productDefaults(type) {
    if (type === 'zip') {
      return {
        type: 'zip',
        series: 'G SERIES',
        subtype: '100x100 BOX',
        placementLocation: 'BETWEEN POSTS',
        fabricColor: 'SOLTIS',
        customFabricColor: '',
        cableDirection: 'BACK',
        motorDirection: 'RIGHT',
        panels: 1,
        view: 'OUTSIDE VIEW',
        collectionState: 'NORMAL'
      };
    }
    if (type === 'door') {
      return {
        type: 'door',
        doorType: 'SINGLE',
        hingeDirection: 'LEFT',
        activeLeaf: 'RIGHT',
        doorOpenDirection: 'OUTWARD',
        handleType: 'NORMAL',
        topFixedHeight: 500,
        view: 'OUTSIDE VIEW',
        glassThickness: '10 MM',
        glassColor: 'TRANSPARENT',
        customGlassColor: ''
      };
    }
    if (type === 'fixed') {
      return {
        type: 'fixed',
        glassThickness: '10 MM',
        glassColor: 'TRANSPARENT',
        customGlassColor: '',
        verticalDivisions: 0,
        horizontalDivisions: 1,
        horizontalHeights: ''
      };
    }
    if (type === 'guillotine') {
      return {
        type: 'guillotine',
        series: 'A SERIES',
        subtype: 'CLEANABLE',
        mechanism: 'CHAIN',
        glassThickness: '8 MM',
        glassColor: 'TRANSPARENT',
        customGlassColor: '',
        panels: 3,
        panelType: '1+2',
        motorDirection: 'RIGHT',
        view: 'OUTSIDE VIEW',
        motorType: 'SOMFY RTS',
        remoteControl: '1 CHANNEL',
        bottomPanelMode: 'VASISTAS',
        bottomPanelState: 'OPEN',
        bottomPanelHinge: 'BOTTOM',
        collectionState: 'NORMAL'
      };
    }
    return {
      type: 'sliding',
      series: 'A SERIES',
      subtype: 'WITH THRESHOLD',
      openingType: 'SIDE OPENING',
      openingDirection: 'RIGHT',
      glassThickness: '10 MM',
      glassColor: 'TRANSPARENT',
      customGlassColor: '',
      panels: 4,
      collectionState: 'NORMAL'
    };
  }

  function normalizePlacement(placement, fallbackType) {
    const requestedType = placement && placement.type ? placement.type : fallbackType;
    const type = requestedType === 'guillotine' ? 'guillotine' : (requestedType === 'zip' ? 'zip' : (requestedType === 'fixed' ? 'fixed' : (requestedType === 'door' ? 'door' : 'sliding')));
    const normalized = { ...productDefaults(type), ...(placement || {}), type };
    if (placement && placement.opening && type === 'sliding' && !placement.openingType) {
      normalized.openingType = placement.opening === 'center' ? 'CENTER OPENING' : 'SIDE OPENING';
      normalized.openingDirection = String(placement.opening || '').toUpperCase();
    }
    if (placement && placement.opening && type === 'guillotine' && !placement.subtype) {
      normalized.subtype = placement.opening === 'up' ? 'UPWARD COLLECTING' : 'CLEANABLE';
    }
    normalized.panels = Math.round(Number(normalized.panels || normalized.panelCount || productDefaults(type).panels));
    if (type === 'zip') {
      normalized.series = normalized.series === 'P SERIES' ? 'P SERIES' : 'G SERIES';
      const validTypes = normalized.series === 'P SERIES'
        ? PRODUCT_OPTIONS.zip.subtypesP.map((item) => item[0])
        : PRODUCT_OPTIONS.zip.subtypesG.map((item) => item[0]);
      if (!validTypes.includes(normalized.subtype)) normalized.subtype = validTypes[0];
      normalized.placementLocation = ['FRONT OF POSTS','OUTSIDE POSTS'].includes(normalized.placementLocation) ? 'FRONT OF POSTS' : 'BETWEEN POSTS';
      normalized.fabricColor = normalized.fabricColor === 'OTHER' ? 'OTHER' : 'SOLTIS';
      normalized.customFabricColor = String(normalized.customFabricColor || '');
      normalized.cableDirection = ['BACK', 'TOP', 'SIDE'].includes(normalized.cableDirection) ? normalized.cableDirection : 'BACK';
      normalized.motorDirection = normalized.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
      normalized.panels = 1;
      normalized.view = 'OUTSIDE VIEW';
      normalized.collectionState = 'NORMAL';
    }
    if (type === 'guillotine' && normalized.subtype === 'STANDARD') normalized.subtype = 'CLEANABLE';
    if (type === 'guillotine' && normalized.bottomPanelMode === 'WINDOW') normalized.bottomPanelMode = 'VASISTAS';
    if (type === 'guillotine') {
      normalized.bottomPanelHinge = 'BOTTOM';
      normalized.view = 'OUTSIDE VIEW';
      if (normalized.subtype === 'CLEANABLE') {
        normalized.bottomPanelMode = 'VASISTAS';
        normalized.bottomPanelState = 'OPEN';
      }
    }
    if (type === 'sliding') {
      if (!['NORMAL', 'COLLECTED'].includes(normalized.collectionState)) normalized.collectionState = 'NORMAL';
      if (normalized.openingType === 'CENTER OPENING') {
        normalized.openingDirection = normalized.openingDirection === 'INSIDE' ? 'INSIDE' : 'OUTSIDE';
      } else {
        normalized.openingDirection = normalized.openingDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
      }
    }
    if (type === 'guillotine' && !['NORMAL', 'COLLECTED'].includes(normalized.collectionState)) normalized.collectionState = 'NORMAL';
    if (type === 'door') {
      normalized.doorType = DOOR_TYPE_VALUES.includes(normalized.doorType) ? normalized.doorType : 'SINGLE';
      normalized.hingeDirection = normalized.hingeDirection === 'RIGHT' ? 'RIGHT' : 'LEFT';
      normalized.activeLeaf = normalized.activeLeaf === 'LEFT' ? 'LEFT' : 'RIGHT';
      normalized.doorOpenDirection = normalized.doorOpenDirection === 'INWARD' ? 'INWARD' : 'OUTWARD';
      normalized.handleType = normalized.handleType === 'PANIC' ? 'PANIC' : 'NORMAL';
      normalized.topFixedHeight = Math.max(250, Math.min(1200, Math.round(Number(normalized.topFixedHeight) || 500)));
      normalized.view = 'OUTSIDE VIEW';
      normalized.glassThickness = ['8 MM','10 MM','INSULATED GLASS'].includes(String(normalized.glassThickness).toUpperCase()) ? String(normalized.glassThickness).toUpperCase() : '10 MM';
      normalized.glassColor = normalized.glassColor || 'TRANSPARENT';
      normalized.customGlassColor = String(normalized.customGlassColor || '');
      normalized.panels = 0;
      delete normalized.series;
      delete normalized.subtype;
    }
    if (type === 'fixed') {
      normalized.glassThickness = ['8 MM','10 MM','INSULATED GLASS'].includes(String(normalized.glassThickness).toUpperCase()) ? String(normalized.glassThickness).toUpperCase() : '10 MM';
      normalized.glassColor = normalized.glassColor || 'TRANSPARENT';
      normalized.customGlassColor = String(normalized.customGlassColor || '');
      normalized.verticalDivisions = Math.max(0, Math.min(20, Math.round(Number(normalized.verticalDivisions || (Number(normalized.verticalCount) ? Number(normalized.verticalCount) + 1 : 0)) || 0)));
      normalized.horizontalDivisions = Math.max(1, Math.min(10, Math.round(Number(normalized.horizontalDivisions || (Number.isFinite(Number(normalized.horizontalCount)) ? Number(normalized.horizontalCount) + 1 : 1)) || 1)));
      normalized.horizontalHeights = String(normalized.horizontalHeights || '');
      delete normalized.horizontalCount;
      delete normalized.horizontalMode;
      delete normalized.series;
      delete normalized.subtype;
    }
    return normalized;
  }

  function fillSelect(select, options, selected) {
    const safeOptions = Array.isArray(options) ? options : [];
    select.innerHTML = '';
    safeOptions.forEach((option) => {
      const value = Array.isArray(option) ? String(option[0]) : String(option);
      const label = Array.isArray(option) ? (option.length > 2 ? option[1] + ' · ' + option[2] : option[1]) : String(option);
      const element = document.createElement('option');
      element.value = value;
      element.textContent = label;
      if (String(selected) === value) element.selected = true;
      select.appendChild(element);
    });
    if (!select.value && safeOptions.length) select.value = String(Array.isArray(safeOptions[0]) ? safeOptions[0][0] : safeOptions[0]);
  }

  function doorTypeLabelParts(value) {
    const found = DOOR_TYPE_OPTIONS.find((item) => item[0] === value);
    return found ? { main: found[1], detail: found[2] } : { main: String(value || ''), detail: '' };
  }

  function doorTypeLabel(value) {
    const label = doorTypeLabelParts(value);
    return label.detail ? label.main + ' · ' + label.detail : label.main;
  }

  function doorTypeSilhouetteSvg(type) {
    const stroke = '#0f172a';
    const frame = '#475569';
    const fixed = '#cbd5e1';
    const moving = '#93c5fd';
    const accent = '#22c55e';
    const topFixedTypes = DOOR_TOP_FIXED_TYPES.has(type);
    const topBand = topFixedTypes ? '<rect x="12" y="10" width="136" height="14" rx="2" fill="'+fixed+'" stroke="'+stroke+'" stroke-width="1.5" />' : '';
    const usableY = topFixedTypes ? 28 : 10;
    const usableH = topFixedTypes ? 48 : 66;
    const swingArrow = (x,w,hinge) => {
      const startY = usableY + usableH - 8;
      const endY = usableY + 10;
      const radius = Math.max(18, Math.min(w * .62, usableH * .78));
      if (hinge === 'RIGHT') {
        const startX = x + w - 8;
        const endX = x + 10;
        return '<circle cx="'+startX+'" cy="'+startY+'" r="2.5" fill="'+accent+'" />'
          + '<path d="M '+startX+' '+startY+' A '+radius+' '+radius+' 0 0 0 '+endX+' '+endY+'" stroke="'+accent+'" stroke-width="3" stroke-linecap="round" fill="none" />'
          + '<path d="M '+endX+' '+endY+' L '+(endX+9)+' '+(endY-1)+' M '+endX+' '+endY+' L '+(endX+3)+' '+(endY+8)+'" stroke="'+accent+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />';
      }
      const startX = x + 8;
      const endX = x + w - 10;
      return '<circle cx="'+startX+'" cy="'+startY+'" r="2.5" fill="'+accent+'" />'
        + '<path d="M '+startX+' '+startY+' A '+radius+' '+radius+' 0 0 1 '+endX+' '+endY+'" stroke="'+accent+'" stroke-width="3" stroke-linecap="round" fill="none" />'
        + '<path d="M '+endX+' '+endY+' L '+(endX-9)+' '+(endY-1)+' M '+endX+' '+endY+' L '+(endX-3)+' '+(endY+8)+'" stroke="'+accent+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />';
    };
    const pane = (x,w,color,hinge='') => '<rect x="'+x+'" y="'+usableY+'" width="'+w+'" height="'+usableH+'" rx="2" fill="'+color+'" stroke="'+stroke+'" stroke-width="1.5" />'+(hinge ? swingArrow(x,w,hinge) : '');
    let panes = '';
    if (type === 'SINGLE' || type === 'TOP_FIXED') {
      panes = pane(12, 136, moving, 'LEFT');
    } else if (type === 'DOUBLE' || type === 'DOUBLE_TOP') {
      panes = pane(12, 67, moving, 'LEFT') + pane(81, 67, moving, 'RIGHT');
    } else if (type === 'LEFT_FIXED_RIGHT_MOVING' || type === 'LEFT_FIXED_TOP') {
      panes = pane(12, 48, fixed) + pane(62, 86, moving, 'RIGHT');
    } else if (type === 'RIGHT_FIXED_LEFT_MOVING' || type === 'RIGHT_FIXED_TOP') {
      panes = pane(12, 86, moving, 'LEFT') + pane(100, 48, fixed);
    } else if (type === 'BOTH_FIXED_TOP') {
      panes = pane(12, 34, fixed) + pane(48, 64, moving, 'LEFT') + pane(114, 34, fixed);
    } else if (type === 'DOUBLE_LEFT_FIXED' || type === 'DOUBLE_LEFT_FIXED_TOP') {
      panes = pane(12, 36, fixed) + pane(50, 47, moving, 'LEFT') + pane(99, 49, moving, 'RIGHT');
    } else if (type === 'DOUBLE_RIGHT_FIXED_TOP') {
      panes = pane(12, 49, moving, 'LEFT') + pane(63, 47, moving, 'RIGHT') + pane(112, 36, fixed);
    } else if (type === 'DOUBLE_BOTH_FIXED_TOP') {
      panes = pane(12, 28, fixed) + pane(42, 41, moving, 'LEFT') + pane(85, 41, moving, 'RIGHT') + pane(128, 20, fixed);
    } else {
      panes = pane(12, 136, moving, 'LEFT');
    }
    return '<svg viewBox="0 0 160 90" aria-hidden="true" focusable="false"><rect x="8" y="8" width="144" height="74" rx="4" fill="none" stroke="'+frame+'" stroke-width="3" />'+topBand+panes+'</svg>';
  }

  function closeDoorTypePicker() {
    const picker = $(ids.productDoorTypePicker);
    const trigger = $(ids.productDoorTypeTrigger);
    if (picker) picker.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function openDoorTypePicker() {
    const picker = $(ids.productDoorTypePicker);
    const trigger = $(ids.productDoorTypeTrigger);
    if (!picker || $(ids.productType).value !== 'door') return;
    renderDoorTypeCards($(ids.productDoorType).value);
    picker.hidden = false;
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    const selected = $(ids.productDoorTypeCards).querySelector('.door-type-card.is-selected');
    if (selected && selected.focus) selected.focus();
  }

  function renderDoorTypeCards(selected) {
    const container = $(ids.productDoorTypeCards);
    if (!container) return;
    container.innerHTML = '';
    DOOR_TYPE_OPTIONS.forEach(([value, main, detail]) => {
      const button = document.createElement('button');
      const fullLabel = detail ? main + ' · ' + detail : main;
      button.type = 'button';
      button.className = 'door-type-card' + (String(selected) === value ? ' is-selected' : '');
      button.setAttribute('data-value', value);
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(String(selected) === value));
      button.setAttribute('aria-label', fullLabel);
      button.innerHTML = doorTypeSilhouetteSvg(value) + '<span class="door-type-card-copy"><strong class="door-type-card-title">' + main + '</strong><span class="door-type-card-detail">' + detail + '</span></span>';
      button.addEventListener('click', () => {
        $(ids.productDoorType).value = value;
        $(ids.productDoorTypeValue).textContent = doorTypeLabel(value);
        closeDoorTypePicker();
        applyProductRules(currentProductDraft());
        $(ids.productDoorTypeTrigger).focus();
      });
      container.appendChild(button);
    });
  }

  function setHidden(id, hidden) {
    $(id).hidden = Boolean(hidden);
  }

  function setDoorFieldsHidden(hidden) {
    setHidden(ids.productDoorTypeWrap, hidden);
    setHidden(ids.productDoorHingeWrap, hidden);
    setHidden(ids.productDoorActiveLeafWrap, hidden);
    setHidden(ids.productDoorOpenDirectionWrap, hidden);
    setHidden(ids.productDoorHandleTypeWrap, hidden);
    setHidden(ids.productDoorTopFixedHeightWrap, hidden);
    setHidden(ids.productDoorHeightSummaryWrap, hidden);
  }

  function doorTopFixedMetrics(zone, topFixedHeight) {
    const fixedHeight = Math.max(250, Math.min(1200, Math.round(Number(topFixedHeight) || 500)));
    if (!zone) return { fixedHeight, movingHeight: null };
    const fittedHeight = Math.max(120, Number(zone.height || 0) - 5);
    const movingHeight = Math.max(600, Math.round(fittedHeight - 87 - fixedHeight));
    return { fixedHeight, movingHeight };
  }

  function updateDoorTopFixedSummary() {
    const isTopFixed = $(ids.productType).value === 'door' && DOOR_TOP_FIXED_TYPES.has($(ids.productDoorType).value);
    setHidden(ids.productDoorHeightSummaryWrap, !isTopFixed);
    if (!isTopFixed) return;
    const zone = activeZone || (bulkProductZones && bulkProductZones[0]) || null;
    const metrics = doorTopFixedMetrics(zone, $(ids.productDoorTopFixedHeight).value);
    $(ids.productDoorFixedHeightValue).textContent = `${metrics.fixedHeight} mm`;
    $(ids.productDoorMovingHeightValue).textContent = metrics.movingHeight === null ? '—' : `${metrics.movingHeight} mm`;
  }

  function currentProductDraft() {
    const type = $(ids.productType).value;
    const colorValue = $(ids.productGlassColor).value;
    return {
      type,
      series: $(ids.productSeries).value,
      subtype: $(ids.productSubtype).value,
      placementLocation: $(ids.productPlacement).value,
      mechanism: $(ids.productMechanism).value,
      openingType: $(ids.productOpening).value,
      openingDirection: $(ids.productDirection).value,
      glassThickness: $(ids.productGlassThickness).value,
      glassColor: colorValue,
      customGlassColor: $(ids.productCustomGlass).value,
      fabricColor: colorValue,
      customFabricColor: $(ids.productCustomGlass).value,
      panels: Number($(ids.productPanels).value),
      verticalDivisions: Number($(ids.productFixedVerticalCount).value),
      horizontalDivisions: Number($(ids.productFixedHorizontalCount).value),
      horizontalHeights: $(ids.productFixedHorizontalHeights).value,
      doorType: $(ids.productDoorType).value,
      hingeDirection: $(ids.productDoorHinge).value,
      activeLeaf: $(ids.productDoorActiveLeaf).value,
      doorOpenDirection: $(ids.productDoorOpenDirection).value,
      handleType: $(ids.productDoorHandleType).value,
      topFixedHeight: Number($(ids.productDoorTopFixedHeight).value),
      panelType: $(ids.productPanelType).value,
      cableDirection: $(ids.productPanelType).value,
      motorDirection: $(ids.productMotorDirection).value,
      view: $(ids.productView).value,
      motorType: $(ids.productMotorType).value,
      remoteControl: $(ids.productRemote).value,
      bottomPanelMode: $(ids.bottomPanelMode).value,
      bottomPanelState: $(ids.bottomPanelState).value,
      bottomPanelHinge: $(ids.bottomPanelHinge).value,
      collectionState: type === 'sliding' ? $(ids.slidingCollectionState).value : $(ids.collectingDisplayState).value
    };
  }

  function applyProductRules(seed) {
    const type = $(ids.productType).value;
    const draft = { ...productDefaults(type), ...(seed || currentProductDraft()), type };
    const isGuillotine = type === 'guillotine';
    const isZip = type === 'zip';
    const isFixed = type === 'fixed';
    const isDoor = type === 'door';
    const standardSeries = [
      ['A SERIES', 'A Serisi'],
      ['K SERIES', 'K Serisi']
    ];
    const glassColors = [
      ['TRANSPARENT', 'Şeffaf'],
      ['GREY', 'Gri'],
      ['BRONZE', 'Bronz'],
      ['LOW-E GLASS', 'Low-e Cam'],
      ['OTHER', 'Diğer']
    ];

    setDoorFieldsHidden(true);
    if ($(ids.productDoorTypeCards)) $(ids.productDoorTypeCards).innerHTML = '';

    if (isDoor) {
      fillSelect($(ids.productDoorType), PRODUCT_OPTIONS.door.types, draft.doorType);
      $(ids.productDoorTypeValue).textContent = doorTypeLabel($(ids.productDoorType).value);
      renderDoorTypeCards(draft.doorType);
      fillSelect($(ids.productDoorHinge), PRODUCT_OPTIONS.door.hinges, draft.hingeDirection);
      fillSelect($(ids.productDoorActiveLeaf), PRODUCT_OPTIONS.door.activeLeaves, draft.activeLeaf);
      fillSelect($(ids.productDoorOpenDirection), PRODUCT_OPTIONS.door.openDirections, draft.doorOpenDirection);
      fillSelect($(ids.productDoorHandleType), PRODUCT_OPTIONS.door.handles, draft.handleType);
      fillSelect($(ids.productGlassThickness), PRODUCT_OPTIONS.sliding.thicknessA, draft.glassThickness);
      fillSelect($(ids.productGlassColor), glassColors, draft.glassColor);
      const doorType = $(ids.productDoorType).value;
      $(ids.productDoorTopFixedHeight).value = String(Math.max(250, Math.min(1200, Math.round(Number(draft.topFixedHeight) || 500))));
      setHidden(ids.productSeriesWrap, true);
      setHidden(ids.productSubtypeWrap, true);
      setHidden(ids.productPlacementWrap, true);
      setHidden(ids.productMechanismWrap, true);
      setHidden(ids.productOpeningWrap, true);
      setHidden(ids.productDirectionWrap, true);
      setHidden(ids.productGlassThicknessWrap, false);
      setHidden(ids.productGlassColorWrap, false);
      setHidden(ids.productPanelsWrap, true);
      setHidden(ids.productFixedVerticalCountWrap, true);
      setHidden(ids.productFixedHorizontalCountWrap, true);
      setHidden(ids.productFixedHorizontalHeightsWrap, true);
      setHidden(ids.productPanelTypeWrap, true);
      setHidden(ids.productMotorDirectionWrap, true);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      setHidden(ids.cleanableWindowSection, true);
      setHidden(ids.collectingDisplaySection, true);
      setHidden(ids.slidingCollectionSection, true);
      setHidden(ids.productDoorTypeWrap, false);
      setHidden(ids.productDoorHingeWrap, DOOR_DOUBLE_TYPES.has(doorType));
      setHidden(ids.productDoorActiveLeafWrap, !DOOR_DOUBLE_TYPES.has(doorType));
      setHidden(ids.productDoorOpenDirectionWrap, false);
      setHidden(ids.productDoorHandleTypeWrap, false);
      setHidden(ids.productDoorTopFixedHeightWrap, !DOOR_TOP_FIXED_TYPES.has(doorType));
      $(ids.productView).value = 'OUTSIDE VIEW';
      updateDoorTopFixedSummary();
      $(ids.productGlassColorLabel).textContent = 'Cam Rengi';
      $(ids.productCustomGlassLabel).textContent = 'Özel Cam Rengi';
      $(ids.productPanels).disabled = true;
      $(ids.productPanels).value = '0';
      const lowE = $(ids.productGlassColor).querySelector('option[value="LOW-E GLASS"]');
      if (lowE) lowE.disabled = $(ids.productGlassThickness).value !== 'INSULATED GLASS';
      if ($(ids.productGlassThickness).value !== 'INSULATED GLASS' && $(ids.productGlassColor).value === 'LOW-E GLASS') $(ids.productGlassColor).value = 'TRANSPARENT';
      $(ids.productCustomGlass).value = draft.customGlassColor || '';
      setHidden(ids.productCustomGlassWrap, $(ids.productGlassColor).value !== 'OTHER');
      $(ids.productValidation).textContent = '';
      return;
    }

    if (isFixed) {
      fillSelect($(ids.productGlassThickness), PRODUCT_OPTIONS.sliding.thicknessA, draft.glassThickness);
      fillSelect($(ids.productGlassColor), glassColors, draft.glassColor);
      const fixedZone = activeZone || (bulkProductZones && bulkProductZones[0]) || null;
      const frame = 55;
      const innerWidth = fixedZone ? Math.max(80, fixedZone.width - 10 - frame * 2) : 0;
      const autoVerticalDivisions = Math.max(1, Math.ceil(innerWidth / 1200));
      const verticalDivisions = Math.max(1, Math.min(20, Math.round(Number(draft.verticalDivisions) || autoVerticalDivisions)));
      const horizontalDivisions = Math.max(1, Math.min(10, Math.round(Number(draft.horizontalDivisions) || 1)));
      $(ids.productFixedVerticalCount).value = String(verticalDivisions);
      $(ids.productFixedHorizontalCount).value = String(horizontalDivisions);
      const totalHeight = fixedZone ? Math.max(120, fixedZone.height - 5) : 0;
      const rawSegments = String(draft.horizontalHeights || '').split(/[;,]+/).map((item) => Number(String(item).trim())).filter((value) => Number.isFinite(value) && value > 0);
      if (rawSegments.length === horizontalDivisions) {
        $(ids.productFixedHorizontalHeights).value = rawSegments.map((value) => Math.round(value)).join(';');
      } else if (totalHeight > 0) {
        const base = Math.floor(totalHeight / horizontalDivisions);
        const segments = Array(horizontalDivisions).fill(base);
        segments[segments.length - 1] += Math.round(totalHeight - base * horizontalDivisions);
        $(ids.productFixedHorizontalHeights).value = segments.join(';');
      } else {
        $(ids.productFixedHorizontalHeights).value = '';
      }
      setHidden(ids.productSeriesWrap, true);
      setHidden(ids.productSubtypeWrap, true);
      setHidden(ids.productPlacementWrap, true);
      setHidden(ids.productMechanismWrap, true);
      setHidden(ids.productOpeningWrap, true);
      setHidden(ids.productDirectionWrap, true);
      setHidden(ids.productGlassThicknessWrap, false);
      setHidden(ids.productGlassColorWrap, false);
      setHidden(ids.productPanelsWrap, true);
      setHidden(ids.productFixedVerticalCountWrap, false);
      setHidden(ids.productFixedHorizontalCountWrap, false);
      setHidden(ids.productFixedHorizontalHeightsWrap, false);
      setHidden(ids.productPanelTypeWrap, true);
      setHidden(ids.productMotorDirectionWrap, true);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      setHidden(ids.cleanableWindowSection, true);
      setHidden(ids.collectingDisplaySection, true);
      setHidden(ids.slidingCollectionSection, true);
      $(ids.productGlassColorLabel).textContent = 'Cam Rengi';
      $(ids.productCustomGlassLabel).textContent = 'Özel Cam Rengi';
      $(ids.productPanels).disabled = true;
      $(ids.productPanels).value = '0';
      $(ids.productPanels).min = '0';
      $(ids.productPanels).max = '0';
      const lowE = $(ids.productGlassColor).querySelector('option[value="LOW-E GLASS"]');
      if (lowE) lowE.disabled = $(ids.productGlassThickness).value !== 'INSULATED GLASS';
      if ($(ids.productGlassThickness).value !== 'INSULATED GLASS' && $(ids.productGlassColor).value === 'LOW-E GLASS') $(ids.productGlassColor).value = 'TRANSPARENT';
      $(ids.productCustomGlass).value = draft.customGlassColor || '';
      setHidden(ids.productCustomGlassWrap, $(ids.productGlassColor).value !== 'OTHER');
      $(ids.productValidation).textContent = '';
      return;
    }

    setHidden(ids.productSeriesWrap, false);
    setHidden(ids.productSubtypeWrap, false);
    setHidden(ids.productFixedVerticalCountWrap, true);
    setHidden(ids.productFixedHorizontalCountWrap, true);
    setHidden(ids.productFixedHorizontalHeightsWrap, true);

    if (isZip) {
      fillSelect($(ids.productSeries), PRODUCT_OPTIONS.zip.series, draft.series);
      const series = $(ids.productSeries).value === 'P SERIES' ? 'P SERIES' : 'G SERIES';
      fillSelect(
        $(ids.productSubtype),
        series === 'P SERIES' ? PRODUCT_OPTIONS.zip.subtypesP : PRODUCT_OPTIONS.zip.subtypesG,
        draft.subtype
      );
      fillSelect($(ids.productPlacement), PRODUCT_OPTIONS.zip.placements, draft.placementLocation);
      fillSelect($(ids.productGlassColor), PRODUCT_OPTIONS.zip.fabricColors, draft.fabricColor);
      fillSelect($(ids.productPanelType), PRODUCT_OPTIONS.zip.cableDirections, draft.cableDirection);

      setHidden(ids.productPlacementWrap, false);
      setHidden(ids.productMechanismWrap, true);
      setHidden(ids.productOpeningWrap, true);
      setHidden(ids.productDirectionWrap, true);
      setHidden(ids.productGlassThicknessWrap, true);
      setHidden(ids.productGlassColorWrap, false);
      setHidden(ids.productPanelsWrap, true);
      setHidden(ids.productPanelTypeWrap, false);
      setHidden(ids.productMotorDirectionWrap, false);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      setHidden(ids.cleanableWindowSection, true);
      setHidden(ids.collectingDisplaySection, true);
      setHidden(ids.slidingCollectionSection, true);

      $(ids.productGlassColorLabel).textContent = 'Kumaş Rengi';
      $(ids.productCustomGlassLabel).textContent = 'Özel Kumaş Rengi';
      $(ids.productPanelTypeLabel).textContent = 'Kablo Çıkış Yönü';
      $(ids.productCustomGlass).value = draft.customFabricColor || '';
      $(ids.productMotorDirection).value = draft.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
      $(ids.productView).value = 'OUTSIDE VIEW';
      $(ids.productPanels).min = '1';
      $(ids.productPanels).max = '1';
      $(ids.productPanels).value = '1';
      $(ids.productPanels).disabled = true;
      setHidden(ids.productCustomGlassWrap, $(ids.productGlassColor).value !== 'OTHER');
      $(ids.productValidation).textContent = '';
      return;
    }

    $(ids.productPanels).disabled = false;
    $(ids.productPanels).min = '2';
    fillSelect($(ids.productSeries), standardSeries, draft.series);
    fillSelect($(ids.productGlassColor), glassColors, draft.glassColor);
    const series = $(ids.productSeries).value === 'K SERIES' ? 'K SERIES' : 'A SERIES';
    setHidden(ids.productPlacementWrap, true);
    setHidden(ids.productGlassThicknessWrap, false);
    setHidden(ids.productGlassColorWrap, false);
    $(ids.productGlassColorLabel).textContent = 'Cam Rengi';
    $(ids.productCustomGlassLabel).textContent = 'Özel Cam Rengi';

    if (isGuillotine) {
      fillSelect($(ids.productSubtype), series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.subtypesK : PRODUCT_OPTIONS.guillotine.subtypesA, draft.subtype);
      fillSelect($(ids.productMechanism), series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.mechanismsK : PRODUCT_OPTIONS.guillotine.mechanismsA, draft.mechanism);
      fillSelect($(ids.productGlassThickness), series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.thicknessK : PRODUCT_OPTIONS.guillotine.thicknessA, draft.glassThickness);
      fillSelect($(ids.productPanelType), [['1+1', '1+1'], ['1+2', '1+2']], draft.panelType);
      setHidden(ids.productMechanismWrap, false);
      setHidden(ids.productOpeningWrap, true);
      setHidden(ids.productDirectionWrap, true);
      setHidden(ids.productPanelsWrap, true);
      setHidden(ids.productPanelTypeWrap, false);
      setHidden(ids.productMotorDirectionWrap, false);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      $(ids.productPanelTypeLabel).textContent = 'Giyotin Panel Tipi';
      $(ids.productPanelType).value = ['1+1', '1+2'].includes(draft.panelType) ? draft.panelType : (Number(draft.panels) === 2 ? '1+1' : '1+2');
      $(ids.productPanels).value = $(ids.productPanelType).value === '1+1' ? '2' : '3';
      $(ids.productMotorDirection).value = draft.motorDirection || 'RIGHT';
      $(ids.productView).value = 'OUTSIDE VIEW';
      $(ids.productMotorType).value = draft.motorType || 'SOMFY RTS';
      $(ids.productRemote).value = draft.remoteControl || '1 CHANNEL';

      const cleanable = $(ids.productSubtype).value === 'CLEANABLE';
      setHidden(ids.cleanableWindowSection, true);
      $(ids.bottomPanelMode).value = cleanable ? 'VASISTAS' : 'FIXED';
      setHidden(ids.bottomPanelStateWrap, true);
      setHidden(ids.bottomPanelHingeWrap, true);
      $(ids.bottomPanelState).value = cleanable ? 'OPEN' : 'CLOSED';
      $(ids.bottomPanelHinge).value = 'BOTTOM';

      setHidden(ids.slidingCollectionSection, true);
      const collecting = ['UPWARD COLLECTING', 'DOWNWARD COLLECTING'].includes($(ids.productSubtype).value);
      setHidden(ids.collectingDisplaySection, !collecting);
      $(ids.collectingDisplayState).value = collecting && draft.collectionState === 'COLLECTED' ? 'COLLECTED' : 'NORMAL';
      $(ids.collectingDisplayDirection).textContent = $(ids.productSubtype).value === 'DOWNWARD COLLECTING' ? 'Aşağı toplanır' : 'Yukarı toplanır';
    } else {
      fillSelect($(ids.productSubtype), PRODUCT_OPTIONS.sliding.subtypes, draft.subtype);
      fillSelect($(ids.productOpening), PRODUCT_OPTIONS.sliding.openings, draft.openingType);
      const centerOpening = $(ids.productOpening).value === 'CENTER OPENING';
      $(ids.productDirectionLabel).textContent = centerOpening ? 'Dışta - İçte' : 'Açılım Yönü';
      fillSelect(
        $(ids.productDirection),
        centerOpening ? PRODUCT_OPTIONS.sliding.centerLayers : PRODUCT_OPTIONS.sliding.sideDirections,
        centerOpening ? (draft.openingDirection === 'INSIDE' ? 'INSIDE' : 'OUTSIDE') : (draft.openingDirection === 'LEFT' ? 'LEFT' : 'RIGHT')
      );
      fillSelect($(ids.productGlassThickness), series === 'K SERIES' ? PRODUCT_OPTIONS.sliding.thicknessK : PRODUCT_OPTIONS.sliding.thicknessA, draft.glassThickness);
      setHidden(ids.productMechanismWrap, true);
      setHidden(ids.productOpeningWrap, false);
      setHidden(ids.productDirectionWrap, false);
      setHidden(ids.productPanelsWrap, false);
      setHidden(ids.productPanelTypeWrap, true);
      setHidden(ids.productMotorDirectionWrap, true);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      setHidden(ids.cleanableWindowSection, true);
      setHidden(ids.collectingDisplaySection, true);
      setHidden(ids.slidingCollectionSection, false);
      $(ids.productPanelTypeLabel).textContent = 'Giyotin Panel Tipi';
      $(ids.slidingCollectionState).value = draft.collectionState === 'COLLECTED' ? 'COLLECTED' : 'NORMAL';
      $(ids.productPanels).min = '2';
      $(ids.productPanels).max = '12';
      $(ids.productPanelHint).textContent = centerOpening ? '2–12 panel · ortadan açılımda çift sayı' : '2–12 panel · manuel değer';
      $(ids.productPanels).value = String(Math.max(2, Math.min(12, Math.round(Number(draft.panels) || 4))));
    }

    const lowE = $(ids.productGlassColor).querySelector('option[value="LOW-E GLASS"]');
    if (lowE) lowE.disabled = $(ids.productGlassThickness).value !== 'INSULATED GLASS';
    if ($(ids.productGlassThickness).value !== 'INSULATED GLASS' && $(ids.productGlassColor).value === 'LOW-E GLASS') {
      $(ids.productGlassColor).value = 'TRANSPARENT';
    } else if (draft.glassColor) {
      $(ids.productGlassColor).value = draft.glassColor;
      if ($(ids.productGlassColor).value === 'LOW-E GLASS' && lowE && lowE.disabled) $(ids.productGlassColor).value = 'TRANSPARENT';
    }
    $(ids.productCustomGlass).value = draft.customGlassColor || '';
    setHidden(ids.productCustomGlassWrap, $(ids.productGlassColor).value !== 'OTHER');
    $(ids.productValidation).textContent = '';
  }

  function loadProductFields(placement) {
    const normalized = normalizePlacement(placement, placement && placement.type);
    $(ids.productType).value = normalized.type;
    $(ids.productSeries).value = normalized.series;
    $(ids.productGlassColor).value = normalized.type === 'zip' ? normalized.fabricColor : normalized.glassColor;
    applyProductRules(normalized);
  }

  function productForType(zoneId, type) {
    if (type === 'zip') return zipPlacement(zoneId);
    const primary = primaryPlacement(zoneId);
    return primary && primary.type === type ? primary : null;
  }

  function updateProductRemoveButton() {
    if (!activeZone || bulkProductZones) {
      $(ids.productRemove).hidden = true;
      return;
    }
    const type = $(ids.productType).value;
    activeProductSlot = type === 'zip' ? 'zip' : 'primary';
    const exists = activeProductSlot === 'zip' ? Boolean(zipPlacement(activeZone.id)) : Boolean(primaryPlacement(activeZone.id));
    $(ids.productRemove).hidden = !exists;
    $(ids.productRemove).textContent = activeProductSlot === 'zip' ? 'Zip Perdeyi Sil' : 'Ana Ürünü Sil';
  }

  function switchProductType(type) {
    if (!activeZone) return;
    closeDoorTypePicker();
    activeProductSlot = type === 'zip' ? 'zip' : 'primary';
    const candidate = activeProductSlot === 'zip' ? zipPlacement(activeZone.id) : primaryPlacement(activeZone.id);
    const existing = candidate && candidate.type === type ? candidate : null;
    loadProductFields(existing || productDefaults(type));
    updateProductRemoveButton();
  }

  function openProductDialog(zone, zones) {
    closeDoorTypePicker();
    activeZone = zone;
    bulkProductZones = Array.isArray(zones) && zones.length > 1 ? zones.map((item) => ({ ...item })) : null;
    const primary = primaryPlacement(zone.id);
    const zip = zipPlacement(zone.id);
    const placement = primary || null;
    activeProductSlot = 'primary';
    if (bulkProductZones) {
      $(ids.productZoneTitle).textContent = `${bulkProductZones.length} alana ürün yerleştir`;
      $(ids.productZoneInfo).textContent = 'Zip Perde dolu alanlara ön katman olarak eklenebilir. Diğer ürünler ana ürün katmanına uygulanır.';
    } else {
      $(ids.productZoneTitle).textContent = `${zone.label} · ${Math.round(zone.width)} × ${Math.round(zone.height)} mm`;
      if (primary && zip) $(ids.productZoneInfo).textContent = 'Bu alanda ana ürün ve ön katman Zip Perde birlikte bulunuyor. Ürün listesinden düzenlenecek katmanı seçin.';
      else if (zip) $(ids.productZoneInfo).textContent = 'Mevcut Zip Perdeyi düzenleyebilir veya aynı alana ana ürün ekleyebilirsiniz.';
      else if (primary) $(ids.productZoneInfo).textContent = 'Mevcut ana ürünü düzenleyebilir veya aynı alana ön katman Zip Perde ekleyebilirsiniz.';
      else $(ids.productZoneInfo).textContent = 'Sürme, giyotin, Sabit Doğrama, Kapı veya ön katman Zip Perde yerleştirin.';
    }
    loadProductFields(placement || productDefaults('sliding'));
    updateProductRemoveButton();
    $(ids.productDialog).hidden = false;
    $(ids.productType).focus();
  }

  function closeProductDialog() {
    closeDoorTypePicker();
    activeZone = null;
    bulkProductZones = null;
    $(ids.productDialog).hidden = true;
    $(ids.productValidation).textContent = '';
  }

  function validateProductDraft(draft) {
    if (draft.type === 'door') {
      if (!DOOR_TYPE_VALUES.includes(draft.doorType)) return 'Kapı tipini seçin.';
      if (!DOOR_DOUBLE_TYPES.has(draft.doorType) && !['LEFT','RIGHT'].includes(draft.hingeDirection)) return 'Menteşe yönünü seçin.';
      if (DOOR_DOUBLE_TYPES.has(draft.doorType) && !['LEFT','RIGHT'].includes(draft.activeLeaf)) return 'Aktif kanadı seçin.';
      if (!['OUTWARD','INWARD'].includes(draft.doorOpenDirection)) return 'Kapı açılma yönünü seçin.';
      if (!['NORMAL','PANIC'].includes(draft.handleType)) return 'Kapı kolu tipini seçin.';
      if (draft.glassColor === 'OTHER' && !String(draft.customGlassColor || '').trim()) return 'Diğer cam rengi seçildiğinde özel cam rengini yazın.';
      if (draft.glassColor === 'LOW-E GLASS' && draft.glassThickness !== 'INSULATED GLASS') return 'Low-e Cam yalnızca Yalıtımlı Cam ile kullanılabilir.';
    } else if (draft.type === 'fixed') {
      const verticalDivisions = Math.max(1, Math.min(20, Math.round(Number(draft.verticalDivisions) || 1)));
      const horizontalDivisions = Math.max(1, Math.min(10, Math.round(Number(draft.horizontalDivisions) || 1)));
      const parts = String(draft.horizontalHeights || '').split(/[,;]+/).map((item) => Number(String(item).trim())).filter((value) => Number.isFinite(value) && value > 0);
      if (!Number.isInteger(verticalDivisions) || verticalDivisions < 1) return 'Dikey bölme sayısı en az 1 olmalıdır.';
      if (!Number.isInteger(horizontalDivisions) || horizontalDivisions < 1) return 'Yatay bölme sayısı en az 1 olmalıdır.';
      if (parts.length !== horizontalDivisions) return 'Yatay bölme sayısı ile yükseklik adedi aynı olmalıdır.';
      if (draft.glassColor === 'OTHER' && !String(draft.customGlassColor || '').trim()) return 'Diğer cam rengi seçildiğinde özel cam rengini yazın.';
      if (draft.glassColor === 'LOW-E GLASS' && draft.glassThickness !== 'INSULATED GLASS') return 'Low-e Cam yalnızca Yalıtımlı Cam ile kullanılabilir.';
    } else if (draft.type !== 'zip') {
      const maxPanels = draft.type === 'guillotine' ? 8 : 12;
      if (!Number.isInteger(draft.panels) || draft.panels < 2 || draft.panels > maxPanels) {
        return `Panel sayısı 2–${maxPanels} arasında tam sayı olmalıdır.`;
      }
      if (draft.type === 'sliding' && draft.openingType === 'CENTER OPENING' && draft.panels % 2 !== 0) {
        return 'Ortadan açılım için panel sayısı çift olmalıdır.';
      }
      if (draft.glassColor === 'OTHER' && !String(draft.customGlassColor || '').trim()) {
        return 'Diğer cam rengi seçildiğinde özel cam rengini yazın.';
      }
      if (draft.glassColor === 'LOW-E GLASS' && draft.glassThickness !== 'INSULATED GLASS') {
        return 'Low-e Cam yalnızca Yalıtımlı Cam ile kullanılabilir.';
      }
    } else {
      if (draft.fabricColor === 'OTHER' && !String(draft.customFabricColor || '').trim()) {
        return 'Diğer kumaş rengi seçildiğinde özel kumaş rengini yazın.';
      }
      if (!['BETWEEN POSTS', 'FRONT OF POSTS'].includes(draft.placementLocation)) {
        return 'Zip Perde yerleşim yerini seçin.';
      }
    }

    const targetZones = bulkProductZones && bulkProductZones.length ? bulkProductZones : (activeZone ? [activeZone] : []);
    for (const zone of targetZones) {
      if (draft.type === 'zip') {
        if (zone.width < 300 || zone.height < 400) return `${zone.label}: Zip Perde için alan ölçüsü yetersiz.`;
        continue;
      }
      if (draft.type === 'door') {
        const wideDoor = !['SINGLE','TOP_FIXED'].includes(draft.doorType);
        const minWidth = DOOR_DOUBLE_TYPES.has(draft.doorType) ? 1200 : (wideDoor ? 1000 : 650);
        if (zone.width < minWidth || zone.height < 1800) return `${zone.label}: Seçilen Kapı tipi için alan ölçüsü yetersiz.`;
        if (DOOR_TOP_FIXED_TYPES.has(draft.doorType)) {
          const fixedHeight = Math.round(Number(draft.topFixedHeight) || 500);
          const movingHeight = Math.round(Math.max(120, Number(zone.height || 0) - 5) - 87 - fixedHeight);
          if (fixedHeight < 250 || fixedHeight > 1200 || movingHeight < 1200) return `${zone.label}: Üst sabit cam yüksekliği 250–1200 mm arasında olmalı ve kalan kapı kanadı en az 1200 mm olmalıdır.`;
        }
        continue;
      }
      if (draft.type === 'fixed') {
        if (zone.width < 350 || zone.height < 500) return `${zone.label}: Sabit Doğrama için alan ölçüsü yetersiz.`;
        const segments = String(draft.horizontalHeights || '').split(/[,;]+/).map((item) => Number(String(item).trim())).filter((value) => Number.isFinite(value) && value > 0);
        const expectedHeight = Math.max(120, zone.height - 5);
        const total = segments.reduce((sum, value) => sum + value, 0);
        if (Math.abs(total - expectedHeight) > 2) return `${zone.label}: Yatay bölme yükseklikleri toplamı ${Math.round(expectedHeight)} mm olmalıdır.`;
        continue;
      }
      const perPanel = draft.type === 'guillotine' ? zone.height / draft.panels : zone.width / draft.panels;
      const minimum = draft.type === 'guillotine' ? 240 : 180;
      if (perPanel < minimum) {
        return draft.type === 'guillotine'
          ? `${zone.label}: Bu yükseklikte ${draft.panels} panel çok sıkışık. Panel başına en az ${minimum} mm gerekir.`
          : `${zone.label}: Bu genişlikte ${draft.panels} panel çok sıkışık. Panel başına en az ${minimum} mm gerekir.`;
      }
    }
    return '';
  }

  function applyProductForm() {
    if (!activeZone) return;
    const draft = currentProductDraft();
    draft.panels = Math.round(Number(draft.panels));
    if (draft.type === 'door') {
      delete draft.series;
      delete draft.subtype;
      delete draft.placementLocation;
      delete draft.fabricColor;
      delete draft.customFabricColor;
      delete draft.cableDirection;
      delete draft.mechanism;
      delete draft.openingType;
      delete draft.openingDirection;
      delete draft.panelType;
      delete draft.motorDirection;
      draft.view = 'OUTSIDE VIEW';
      delete draft.motorType;
      delete draft.remoteControl;
      delete draft.bottomPanelMode;
      delete draft.bottomPanelState;
      delete draft.bottomPanelHinge;
      delete draft.collectionState;
      delete draft.verticalDivisions;
      delete draft.horizontalDivisions;
      delete draft.horizontalHeights;
      draft.doorType = DOOR_TYPE_VALUES.includes(draft.doorType) ? draft.doorType : 'SINGLE';
      draft.hingeDirection = draft.hingeDirection === 'RIGHT' ? 'RIGHT' : 'LEFT';
      draft.activeLeaf = draft.activeLeaf === 'LEFT' ? 'LEFT' : 'RIGHT';
      draft.doorOpenDirection = draft.doorOpenDirection === 'INWARD' ? 'INWARD' : 'OUTWARD';
      draft.handleType = draft.handleType === 'PANIC' ? 'PANIC' : 'NORMAL';
      draft.topFixedHeight = Math.max(250, Math.min(1200, Math.round(Number(draft.topFixedHeight) || 500)));
      draft.panels = 0;
    } else if (draft.type === 'fixed') {
      delete draft.series;
      delete draft.subtype;
      delete draft.placementLocation;
      delete draft.fabricColor;
      delete draft.customFabricColor;
      delete draft.cableDirection;
      delete draft.mechanism;
      delete draft.openingType;
      delete draft.openingDirection;
      delete draft.panelType;
      delete draft.motorDirection;
      delete draft.view;
      delete draft.motorType;
      delete draft.remoteControl;
      delete draft.bottomPanelMode;
      delete draft.bottomPanelState;
      delete draft.bottomPanelHinge;
      delete draft.collectionState;
      draft.verticalDivisions = Math.max(1, Math.min(20, Math.round(Number(draft.verticalDivisions) || 1)));
      draft.horizontalDivisions = Math.max(1, Math.min(10, Math.round(Number(draft.horizontalDivisions) || 1)));
      draft.horizontalHeights = String(draft.horizontalHeights || '');
      draft.panels = 0;
    } else if (draft.type === 'sliding') {
      delete draft.placementLocation;
      delete draft.fabricColor;
      delete draft.customFabricColor;
      delete draft.cableDirection;
      delete draft.mechanism;
      delete draft.panelType;
      delete draft.motorDirection;
      delete draft.view;
      delete draft.motorType;
      delete draft.remoteControl;
      delete draft.bottomPanelMode;
      delete draft.bottomPanelState;
      delete draft.bottomPanelHinge;
      draft.collectionState = draft.collectionState === 'COLLECTED' ? 'COLLECTED' : 'NORMAL';
    } else if (draft.type === 'guillotine') {
      delete draft.placementLocation;
      delete draft.fabricColor;
      delete draft.customFabricColor;
      delete draft.cableDirection;
      delete draft.openingType;
      delete draft.openingDirection;
      draft.view = 'OUTSIDE VIEW';
      draft.bottomPanelHinge = 'BOTTOM';
      draft.panels = draft.panelType === '1+1' ? 2 : 3;
      if (draft.subtype === 'CLEANABLE') {
        draft.bottomPanelMode = 'VASISTAS';
        draft.bottomPanelState = 'OPEN';
      } else {
        draft.bottomPanelMode = 'FIXED';
        draft.bottomPanelState = 'CLOSED';
      }
      if (!['UPWARD COLLECTING', 'DOWNWARD COLLECTING'].includes(draft.subtype)) {
        draft.collectionState = 'NORMAL';
      }
    } else {
      draft.placementLocation = ['FRONT OF POSTS','OUTSIDE POSTS'].includes(draft.placementLocation) ? 'FRONT OF POSTS' : 'BETWEEN POSTS';
      draft.fabricColor = draft.fabricColor === 'OTHER' ? 'OTHER' : 'SOLTIS';
      draft.customFabricColor = String(draft.customFabricColor || '');
      draft.cableDirection = ['BACK', 'TOP', 'SIDE'].includes(draft.cableDirection) ? draft.cableDirection : 'BACK';
      draft.motorDirection = draft.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
      draft.panels = 1;
      draft.view = 'OUTSIDE VIEW';
      draft.collectionState = 'NORMAL';
      delete draft.mechanism;
      delete draft.openingType;
      delete draft.openingDirection;
      delete draft.glassThickness;
      delete draft.glassColor;
      delete draft.customGlassColor;
      delete draft.panelType;
      delete draft.bottomPanelMode;
      delete draft.bottomPanelState;
      delete draft.bottomPanelHinge;
      delete draft.motorType;
      delete draft.remoteControl;
    }
    const error = validateProductDraft(draft);
    if (error) {
      $(ids.productValidation).textContent = error;
      return;
    }
    const targetZones = bulkProductZones && bulkProductZones.length ? bulkProductZones : [activeZone];
    targetZones.forEach((zone) => {
      if (draft.type === 'zip') {
        modelState.zipPlacements[zone.id] = JSON.parse(JSON.stringify(draft));
        const key = zipProductKey(zone.id);
        if (!hasOwn(modelState.productOpenStates, key)) modelState.productOpenStates[key] = Boolean(modelState.productsOpen);
        modelState.panelStates[key] = effectiveProductOpen(key);
      } else {
        modelState.placements[zone.id] = JSON.parse(JSON.stringify(draft));
        if (!hasOwn(modelState.productOpenStates, zone.id)) modelState.productOpenStates[zone.id] = Boolean(modelState.productsOpen);
      }
    });
    closeProductDialog();
    clearZoneSelection();
    updateToolbox();
    renderViewer();
  }

  function removeProduct() {
    if (!activeZone) return;
    const type = $(ids.productType).value;
    if (type === 'zip') {
      if (!zipPlacement(activeZone.id)) return;
      delete modelState.zipPlacements[activeZone.id];
      delete modelState.productOpenStates[zipProductKey(activeZone.id)];
      delete modelState.panelStates[zipProductKey(activeZone.id)];
    } else {
      if (!primaryPlacement(activeZone.id)) return;
      delete modelState.placements[activeZone.id];
      delete modelState.productOpenStates[activeZone.id];
    }
    closeProductDialog();
    updateToolbox();
    renderViewer();
  }

  function clearProducts() {
    const count = Object.keys(modelState.placements).length + Object.keys(modelState.zipPlacements).length;
    if (!count) return;
    if (!window.confirm('Yerleştirilmiş tüm sürme, giyotin, Zip Perde, Sabit Doğrama ve Kapı ürünleri silinsin mi?')) return;
    modelState.placements = {};
    modelState.zipPlacements = {};
    modelState.productOpenStates = {};
    modelState.panelStates = {};
    updateToolbox();
    renderViewer();
  }

  window.addEventListener('message', (event) => {
    if (!event.data || event.data.source !== 'product-3d-viewer') return;
    if (event.data.type === 'camera-state' && event.data.camera) {
      const camera = event.data.camera;
      const position = Array.isArray(camera.position) ? camera.position.map(Number) : [];
      const target = Array.isArray(camera.target) ? camera.target.map(Number) : [];
      if (position.length === 3 && target.length === 3 && [...position, ...target].every(Number.isFinite)) {
        viewerCameraState = { position, target, zoom: Number.isFinite(Number(camera.zoom)) ? Number(camera.zoom) : 1 };
      }
    }
    if (event.data.type === 'edit-dimension') openPositionDialog();
    if (event.data.type === 'toggle-toolbox-selection' && event.data.item) toggleToolboxSelectionItem(event.data.item);
    if (event.data.type === 'complete-toolbox-selection') completeToolboxSelection();
    if (event.data.type === 'cancel-toolbox-selection') cancelToolboxSelection();
    if (event.data.type === 'select-zone' && event.data.zone) selectZone(event.data.zone);
    if (event.data.type === 'select-divider-profile' && event.data.profile) openDividerProfileDialog(event.data.profile);
    if (event.data.type === 'select-post') openPostActionDialog(event.data.postIndex);
    if (event.data.type === 'toggle-panel-state' && event.data.zoneId) {
      const zoneId = String(event.data.zoneId);
      const key = String(event.data.productKey || event.data.panelKey || zoneId);
      modelState.productOpenStates[key] = Boolean(event.data.open);
      if (key === zipProductKey(zoneId)) modelState.panelStates[key] = Boolean(event.data.open);
      updateToolbox();
      renderViewer();
    }
  });

  function buildViewerHtml({ productGroup, width, depth, height, lamellaCount, orientations, postSections, beamSection, placements, zipPlacements, facadeProfiles, cameraState, selectedZoneId: activeZoneId, dimensionVisibility: showDimensionVisibility, productsOpen, productOpenStates, panelStates, panelMasterOpen, toolboxSelectionMode: activeSelectionMode, toolboxSelectionKeys: activeSelectionKeys }) {
    const W = width;
    const D = depth;
    const H = height;
    const LC = lamellaCount;
    const productGroupJson = JSON.stringify(productGroup === 'bio-rise' ? 'bio-rise' : 'b-cube');
    const productModelTitle = productGroup === 'bio-rise' ? 'BIO-RISE 3D' : 'B-CUBE FREEDOM 3D';
    const [O1, O2, O3, O4] = orientations;
    const postJson = JSON.stringify(postSections);
    const beamJson = JSON.stringify(beamSection);
    const placementsJson = JSON.stringify(placements || {});
    const zipPlacementsJson = JSON.stringify(zipPlacements || {});
    const facadeProfilesJson = JSON.stringify(facadeProfiles || {});
    const cameraStateJson = JSON.stringify(cameraState || null);
    const selectedZoneIdJson = JSON.stringify(activeZoneId || null);
    const dimensionVisibilityJson = JSON.stringify({
      intermediate: !showDimensionVisibility || showDimensionVisibility.intermediate !== false,
      main: !showDimensionVisibility || showDimensionVisibility.main !== false
    });
    const productsOpenJson = JSON.stringify(Boolean(productsOpen));
    const productOpenStatesJson = JSON.stringify(productOpenStates || {});
    const panelStatesJson = JSON.stringify(panelStates || {});
    const panelMasterOpenJson = JSON.stringify(Boolean(panelMasterOpen));
    const toolboxSelectionModeJson = JSON.stringify(activeSelectionMode || null);
    const toolboxSelectionKeysJson = JSON.stringify(Array.isArray(activeSelectionKeys) ? activeSelectionKeys : []);

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${productModelTitle}</title>
<style>
html,body{margin:0;height:100%;overflow:hidden;background:radial-gradient(circle at top,#334155,#0f172a 60%);font-family:Segoe UI,Arial,sans-serif;color:#e5eefb}
#viewerHint{position:absolute;left:14px;bottom:14px;z-index:25;max-width:min(470px,calc(100% - 28px));padding:8px 11px;border:1px solid rgba(125,211,252,.28);border-radius:9px;background:rgba(15,23,42,.76);color:#dbeafe;font-size:12px;line-height:1.4;pointer-events:none;backdrop-filter:blur(5px)}
#fallback{display:none;position:absolute;inset:0;place-items:center;padding:22px;text-align:center;line-height:1.5;background:#0f172a;color:#e5e7eb;z-index:50}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></scr` + `ipt>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></scr` + `ipt>
</head>
<body>
<div id="fallback">3D viewer could not load. Three.js is loaded from a CDN.</div>
<div id="viewerHint">Dikmeler arasındaki boşluğa tıklayın. Bir ürün panelini açıp kapatmak için çift tıklayın.</div>
<script>
(function(){
if(!window.THREE || !THREE.OrbitControls){
  document.getElementById('fallback').style.display='grid';
  return;
}

const W=${W}, D=${D}, H=${H};
const PRODUCT_GROUP=${productGroupJson};
const IS_BIO_RISE=PRODUCT_GROUP==='bio-rise';
const RW=W-208, RD=D-303;
const LC=${LC};
let orientations=[${O1},${O2},${O3},${O4}];
let postSections=${postJson};
let beamSection=${beamJson};
let placements=${placementsJson};
let zipPlacements=${zipPlacementsJson};
let facadeProfiles=${facadeProfilesJson};
let selectedZoneId=${selectedZoneIdJson};
let dimensionVisibility=${dimensionVisibilityJson};
const productsOpen=${productsOpenJson};
let productOpenStates=${productOpenStatesJson};
let panelStates=${panelStatesJson};
const panelMasterOpen=${panelMasterOpenJson};
const DOOR_TOP_FIXED_TYPES=new Set(['TOP_FIXED','LEFT_FIXED_TOP','RIGHT_FIXED_TOP','BOTH_FIXED_TOP','DOUBLE_TOP','DOUBLE_LEFT_FIXED_TOP','DOUBLE_RIGHT_FIXED_TOP','DOUBLE_BOTH_FIXED_TOP']);
let toolboxSelectionMode=${toolboxSelectionModeJson};
let toolboxSelectionKeys=new Set(${toolboxSelectionKeysJson});
const initialCameraState=${cameraStateJson};
const lamellaOpenMode=panelMasterOpen;
function productIsOpen(productKey){
  return Object.prototype.hasOwnProperty.call(productOpenStates||{},productKey)?Boolean(productOpenStates[productKey]):Boolean(productsOpen);
}
function markTogglePanel(mesh,zone,open,productKey){
  if(!mesh||!mesh.userData)return mesh;
  mesh.userData.isTogglePanel=true;
  mesh.userData.zoneId=zone.id;
  mesh.userData.productKey=productKey||zone.id;
  mesh.userData.panelOpen=Boolean(open);
  return mesh;
}

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,1,30000);
if(initialCameraState&&Array.isArray(initialCameraState.position)&&initialCameraState.position.length===3){
  camera.position.fromArray(initialCameraState.position);
  camera.zoom=Number(initialCameraState.zoom)||1;
  camera.updateProjectionMatrix();
}else{
  camera.position.set(W*0.92,H*0.82,D*1.08);
}

const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

const controls=new THREE.OrbitControls(camera,renderer.domElement);
if(initialCameraState&&Array.isArray(initialCameraState.target)&&initialCameraState.target.length===3){
  controls.target.fromArray(initialCameraState.target);
}else{
  controls.target.set(0,0,0);
}
controls.enableDamping=true;
controls.dampingFactor=.08;
let cameraStateTimer=null;
function publishCameraState(){
  parent.postMessage({
    source:'product-3d-viewer',
    type:'camera-state',
    camera:{position:camera.position.toArray(),target:controls.target.toArray(),zoom:camera.zoom}
  },'*');
}
controls.addEventListener('change',()=>{
  if(cameraStateTimer)clearTimeout(cameraStateTimer);
  cameraStateTimer=setTimeout(publishCameraState,80);
});
controls.addEventListener('end',publishCameraState);

scene.add(new THREE.AmbientLight(0xffffff,.72));
const dir=new THREE.DirectionalLight(0xffffff,.88);
dir.position.set(W*.35,H*1.1,D*.45);
dir.castShadow=true;
scene.add(dir);
const fill=new THREE.DirectionalLight(0x88aaff,.35);
fill.position.set(-W*.45,H*.55,-D*.5);
scene.add(fill);

const floorSize=Math.max(W,D)*1.7;
const floor=new THREE.Mesh(new THREE.PlaneGeometry(floorSize,floorSize),new THREE.ShadowMaterial({opacity:.32}));
floor.rotation.x=-Math.PI/2;
floor.position.y=-H/2-1;
floor.receiveShadow=true;
scene.add(floor);
const grid=new THREE.GridHelper(Math.max(W,D)*1.5,22,0x94a3b8,0x475569);
grid.position.y=-H/2;
scene.add(grid);

const box=new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(W,H,D)),
  new THREE.LineBasicMaterial({color:0x7dd3fc,transparent:true,opacity:.22})
);
scene.add(box);

const group=new THREE.Group();
scene.add(group);
const raycaster=new THREE.Raycaster();
const mouse=new THREE.Vector2();
let intermediateDimensionObjects=[];
let mainDimensionObjects=[];
let parts=[];
let interactiveObjects=[];
let zonePickers=[];
let hoveredZone=null;
let selectedZonePicker=null;
let pointerStart=null;
let animStep=0;
let timer=null;

function postDims(index){
  return postSections[index] || (IS_BIO_RISE?{x:150,z:100}:{x:100,z:220});
}

function parseSectionInput(raw){
  if(raw===null)return null;
  const parts=String(raw).toLowerCase().replace(/,/g,'.').split(/[x*\\/ ]+/).filter(Boolean);
  if(parts.length<2)return null;
  const a=Math.round(Number(parts[0]));
  const b=Math.round(Number(parts[1]));
  if(!Number.isFinite(a)||!Number.isFinite(b)||a<20||b<20)return null;
  return {a,b};
}

function postLayoutFits(sections){
  const minOpening=120;
  return (
    sections[0].x + sections[1].x <= W - minOpening &&
    sections[2].x + sections[3].x <= W - minOpening &&
    sections[0].z + sections[2].z <= D - minOpening &&
    sections[1].z + sections[3].z <= D - minOpening
  );
}

function editBeamSection(){
  const next=parseSectionInput(prompt('Blue profile section height x thickness (mm)', beamSection.vertical+'x'+beamSection.thickness));
  if(!next){
    alert('Enter section like 220x100.');
    return;
  }
  if(next.a >= H-200 || next.b >= Math.min(W,D)/2){
    alert('This blue profile section is too large for the current system dimensions.');
    return;
  }
  beamSection={vertical:next.a,thickness:next.b};
  buildModel(true);
}

function addBox(cfg,color,isPost){
  const geo=new THREE.BoxGeometry(cfg.sx,cfg.sy,cfg.sz);
  const mat=new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.18});
  const mesh=new THREE.Mesh(geo,mat);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.position.set(cfg.px,cfg.py,cfg.pz);
  mesh.userData={name:cfg.name,isPost,isBeam:Boolean(cfg.isBeam),postIndex:(cfg.idx===undefined?-1:cfg.idx),...(cfg.userData||{})};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x111111,transparent:true,opacity:.25})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  if(isPost)interactiveObjects.push(mesh);
  return mesh;
}

function gutterShape(sectionWidth,innerRun){
  const rise=58,height=120,topFlat=36,topInset=12;
  const valleyX=sectionWidth-innerRun;
  const s=new THREE.Shape();
  s.moveTo(0,0);
  s.lineTo(topInset,rise);
  s.lineTo(topInset+topFlat,rise);
  s.lineTo(valleyX,0);
  s.lineTo(sectionWidth,0);
  s.lineTo(sectionWidth,height);
  s.lineTo(sectionWidth-4,height);
  s.lineTo(sectionWidth-4,0);
  s.lineTo(0,0);
  s.closePath();
  return s;
}

function applyMiterCuts(geo,sectionWidth,length){
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i);
    let z=pos.getZ(i);
    const diag=sectionWidth-x;
    const startLimit=Math.max(0,diag);
    const endLimit=Math.min(length,length-diag);
    if(z<startLimit)z=startLimit;
    if(z>endLimit)z=endLimit;
    pos.setZ(i,z);
  }
  pos.needsUpdate=true;
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
}

function createExtrudedGutter(name,sectionWidth,innerRun,length,color,side,straightEnds){
  const geo=new THREE.ExtrudeGeometry(gutterShape(sectionWidth,innerRun),{depth:length,bevelEnabled:false,steps:1});
  if(!straightEnds)applyMiterCuts(geo,sectionWidth,length);
  let rotY=0;
  if(side==='front')rotY=-Math.PI/2;
  if(side==='back')rotY=Math.PI/2;
  if(side==='left')rotY=0;
  if(side==='right')rotY=Math.PI;
  geo.rotateY(rotY);
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.62,metalness:.16}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={name,isPost:false,postIndex:-1};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x1f2937,transparent:true,opacity:.28})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function lamelShape(narrowBy){
  const pts=[
    [249.334,27.759],[249.334,36.240],[236.642,43.568],[208.675,0.000],
    [0.138,0.000],[0.000,6.750],[19.817,40.493],[26.655,39.760],
    [32.954,35.990],[33.026,27.639],[35.746,27.639],[36.122,39.667],
    [106.399,36.106],[238.454,46.391],[251.343,46.391],[251.343,27.759]
  ];
  const fullWidth=251.343;
  const reduction=Math.max(0,Math.min(40,Number(narrowBy)||0));
  const scale=(fullWidth-reduction)/fullWidth;
  const cx=125.6715;
  const s=new THREE.Shape();
  s.moveTo((pts[0][0]-cx)*scale,pts[0][1]);
  for(let i=1;i<pts.length;i++)s.lineTo((pts[i][0]-cx)*scale,pts[i][1]);
  s.closePath();
  return s;
}

function createLamel(name,length,color,narrowBy){
  const geo=new THREE.ExtrudeGeometry(lamelShape(narrowBy),{depth:length,bevelEnabled:false,steps:1});
  geo.rotateY(Math.PI/2);
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.54,metalness:.12}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={name,isPost:false,postIndex:-1,isLamel:true,isOpenLamel:false};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x214d21,transparent:true,opacity:.25})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function lamelProfileSpan(narrowBy){
  const fullWidth=251.343;
  const reduction=Math.max(0,Math.min(40,Number(narrowBy)||0));
  return fullWidth-reduction;
}

function createFixedClosureLamel(name,length,color,targetDepth,narrowBy){
  const geo=new THREE.ExtrudeGeometry(lamelShape(narrowBy),{depth:length,bevelEnabled:false,steps:1});
  geo.rotateY(Math.PI/2);
  geo.computeBoundingBox();
  const bbox=geo.boundingBox;
  const naturalDepth=Math.max(1,bbox.max.z-bbox.min.z);
  const safeDepth=Math.max(8,Number(targetDepth)||8);
  geo.scale(1,1,safeDepth/naturalDepth);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.54,metalness:.12}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={name,isPost:false,postIndex:-1,isLamel:false,isOpenLamel:false,isRoofClosure:true};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x153e75,transparent:true,opacity:.34})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function createOpenedLamel(name,length,color,angleDeg,narrowBy){
  const geo=new THREE.ExtrudeGeometry(lamelShape(narrowBy),{depth:length,bevelEnabled:false,steps:1});
  geo.rotateY(Math.PI/2);
  // Açık lamel kesitini, uzun ekseni çevresinde bulunduğu yeri değiştirmeden 180° aynala.
  geo.rotateX(Math.PI);
  geo.computeBoundingBox();
  const bbox=geo.boundingBox.clone();
  const pivot=new THREE.Group();
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.54,metalness:.12}));
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.position.set(-((bbox.min.x+bbox.max.x)/2),-bbox.min.y,-bbox.max.z);
  mesh.userData={name,isPost:false,postIndex:-1,isLamel:true,isOpenLamel:true};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x214d21,transparent:true,opacity:.25})));
  mesh.visible=false;
  pivot.rotation.x=THREE.MathUtils.degToRad(angleDeg);
  pivot.add(mesh);
  group.add(pivot);
  parts.push(mesh);
  return {pivot,mesh,bounds:bbox};
}

function setMeshByBounds(mesh,opts){
  mesh.position.set(0,0,0);
  mesh.updateMatrixWorld(true);
  const bbox=new THREE.Box3().setFromObject(mesh);
  if(opts.bottomY!==undefined)mesh.position.y+=(opts.bottomY-bbox.min.y);
  if(opts.centerX!==undefined)mesh.position.x+=(opts.centerX-(bbox.min.x+bbox.max.x)/2);
  if(opts.centerZ!==undefined)mesh.position.z+=(opts.centerZ-(bbox.min.z+bbox.max.z)/2);
  if(opts.minX!==undefined)mesh.position.x+=(opts.minX-bbox.min.x);
  if(opts.maxX!==undefined)mesh.position.x+=(opts.maxX-bbox.max.x);
  if(opts.minZ!==undefined)mesh.position.z+=(opts.minZ-bbox.min.z);
  if(opts.maxZ!==undefined)mesh.position.z+=(opts.maxZ-bbox.max.z);
  mesh.updateMatrixWorld(true);
}

function setObjectByBounds(obj,opts){
  obj.position.set(0,0,0);
  obj.updateMatrixWorld(true);
  const bbox=new THREE.Box3().setFromObject(obj);
  if(opts.bottomY!==undefined)obj.position.y+=(opts.bottomY-bbox.min.y);
  if(opts.centerX!==undefined)obj.position.x+=(opts.centerX-(bbox.min.x+bbox.max.x)/2);
  if(opts.centerZ!==undefined)obj.position.z+=(opts.centerZ-(bbox.min.z+bbox.max.z)/2);
  if(opts.minX!==undefined)obj.position.x+=(opts.minX-bbox.min.x);
  if(opts.maxX!==undefined)obj.position.x+=(opts.maxX-bbox.max.x);
  if(opts.minZ!==undefined)obj.position.z+=(opts.minZ-bbox.min.z);
  if(opts.maxZ!==undefined)obj.position.z+=(opts.maxZ-bbox.max.z);
  obj.updateMatrixWorld(true);
}

function addProductBox(zone,cfg,color,opacity){
  const axisX=zone.axis==='x';
  const geo=new THREE.BoxGeometry(axisX?cfg.w:cfg.t,cfg.h,axisX?cfg.t:cfg.w);
  const mat=new THREE.MeshStandardMaterial({
    color,
    roughness:.42,
    metalness:.22,
    transparent:opacity<1,
    opacity,
    depthWrite:opacity>.55,
    side:THREE.DoubleSide
  });
  const mesh=new THREE.Mesh(geo,mat);
  mesh.castShadow=opacity>.5;
  mesh.receiveShadow=true;
  const x=axisX ? zone.cx+cfg.u : zone.cx+cfg.v;
  const z=axisX ? zone.cz+cfg.v : zone.cz+cfg.u;
  mesh.position.set(x,cfg.y,z);
  mesh.userData={name:cfg.name||'Product part',isProduct:true,zoneId:zone.id};
  mesh.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({color:opacity<.8?0x164e63:0x111827,transparent:true,opacity:.48})
  ));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  interactiveObjects.push(mesh);
  return mesh;
}

function addRotatedProductBox(zone,cfg,color,opacity,hingeU,angle){
  const relativeU=cfg.u-hingeU;
  const cos=Math.cos(angle);
  const sin=Math.sin(angle);
  const rotated={
    ...cfg,
    u:hingeU+cos*relativeU-sin*(cfg.v||0),
    v:sin*relativeU+cos*(cfg.v||0)
  };
  const mesh=addProductBox(zone,rotated,color,opacity);
  mesh.rotation.y=zone.axis==='x'?-angle:angle;
  return mesh;
}

function addBottomHungProductBox(zone,cfg,color,opacity,angle,hingeY){
  const axisX=zone.axis==='x';
  const geo=new THREE.BoxGeometry(axisX?cfg.w:cfg.t,cfg.h,axisX?cfg.t:cfg.w);
  const mat=new THREE.MeshStandardMaterial({
    color,
    roughness:.42,
    metalness:.22,
    transparent:opacity<1,
    opacity,
    depthWrite:opacity>.55,
    side:THREE.DoubleSide
  });
  const mesh=new THREE.Mesh(geo,mat);
  mesh.castShadow=opacity>.5;
  mesh.receiveShadow=true;
  mesh.userData={name:cfg.name||'Product part',isProduct:true,zoneId:zone.id};
  mesh.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({color:opacity<.8?0x164e63:0x111827,transparent:true,opacity:.48})
  ));
  const pivot=new THREE.Group();
  pivot.position.set(axisX?zone.cx+cfg.u:zone.cx+cfg.v,hingeY,axisX?zone.cz+cfg.v:zone.cz+cfg.u);
  mesh.position.set(0,cfg.y-hingeY,0);
  if(axisX){
    pivot.rotation.x=zone.inward*angle;
  }else{
    pivot.rotation.z=-zone.inward*angle;
  }
  pivot.add(mesh);
  mesh.visible=false;
  group.add(pivot);
  parts.push(mesh);
  interactiveObjects.push(mesh);
  return mesh;
}


function glazingSectionSpec(placement){
  const thickness=String(placement.glassThickness||'8 MM').toUpperCase();
  if(thickness==='10 MM')return {glassDepth:10,frameDepth:14};
  if(thickness==='INSULATED GLASS')return {glassDepth:20,frameDepth:24};
  return {glassDepth:8,frameDepth:12};
}

function createArrowGeometry(length,shaftWidth,headWidth,headLength,direction,vertical){
  const half=length/2;
  const shaftHalf=shaftWidth/2;
  const headHalf=headWidth/2;
  const bodyEnd=half-headLength;
  const shape=new THREE.Shape();
  shape.moveTo(-half,-shaftHalf);
  shape.lineTo(bodyEnd,-shaftHalf);
  shape.lineTo(bodyEnd,-headHalf);
  shape.lineTo(half,0);
  shape.lineTo(bodyEnd,headHalf);
  shape.lineTo(bodyEnd,shaftHalf);
  shape.lineTo(-half,shaftHalf);
  shape.closePath();
  const geo=new THREE.ExtrudeGeometry(shape,{depth:4,bevelEnabled:false,steps:1});
  geo.translate(0,0,-2);
  if(direction<0)geo.rotateZ(Math.PI);
  if(vertical)geo.rotateZ(Math.PI/2);
  return geo;
}

function addFacadeArrow(zone,cfg){
  const length=Math.max(80,Math.min(cfg.length,Math.max(80,cfg.maxLength||cfg.length)));
  const thick=Boolean(cfg.thick);
  const geo=createArrowGeometry(length,thick?26:10,thick?68:38,Math.min(length*.28,thick?82:54),cfg.direction||1,Boolean(cfg.vertical));
  if(zone.axis==='z')geo.rotateY(-Math.PI/2);
  const mat=new THREE.MeshStandardMaterial({color:thick?0xf97316:0xf8fafc,roughness:.45,metalness:.05,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geo,mat);
  const x=zone.axis==='x'?zone.cx+(cfg.u||0):zone.cx+(cfg.v||0);
  const z=zone.axis==='x'?zone.cz+(cfg.v||0):zone.cz+(cfg.u||0);
  mesh.position.set(x,cfg.y,z);
  mesh.userData={name:cfg.name||'Direction Arrow',isProduct:true,zoneId:zone.id};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x111827,transparent:true,opacity:.82})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function addFacadeText(zone,cfg){
  const canvas=document.createElement('canvas');
  canvas.width=512;
  canvas.height=160;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='rgba(15,23,42,.88)';
  ctx.fillRect(4,4,504,152);
  ctx.strokeStyle='#f8fafc';
  ctx.lineWidth=8;
  ctx.strokeRect(8,8,496,144);
  ctx.fillStyle='#f8fafc';
  ctx.font='bold 92px Segoe UI, Arial, sans-serif';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText(cfg.text||'',256,83);
  const texture=new THREE.CanvasTexture(canvas);
  texture.needsUpdate=true;
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(cfg.w,cfg.h),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide,depthTest:true}));
  if(zone.axis==='x')mesh.rotation.y=zone.inward===1?Math.PI:0;
  else mesh.rotation.y=-zone.inward*Math.PI/2;
  const x=zone.axis==='x'?zone.cx+(cfg.u||0):zone.cx+(cfg.v||0);
  const z=zone.axis==='x'?zone.cz+(cfg.v||0):zone.cz+(cfg.u||0);
  mesh.position.set(x,cfg.y,z);
  mesh.userData={name:cfg.name||cfg.text||'Label',isProduct:true,zoneId:zone.id};
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  return mesh;
}

function glassVisualColor(placement){
  const color=String(placement.glassColor||'TRANSPARENT').toUpperCase();
  if(color==='GREY')return 0x64748b;
  if(color==='BRONZE')return 0xb77945;
  if(color==='LOW-E GLASS')return 0x67e8f9;
  if(color==='OTHER')return 0x60a5fa;
  return 0x93c5fd;
}

function motorVisualColor(placement){
  const type=String(placement.motorType||'').toUpperCase();
  if(type==='SOMFY IO')return 0x312e81;
  if(type==='RISING')return 0x6b21a8;
  return 0x4c1d95;
}

function productDepthCenter(zone,depth,inset){
  const safeInset=Math.max(0,Number(inset)||0);
  return zone.outerFaceV+zone.inward*(depth/2+safeInset);
}

function productSurfaceCenter(zone,partCenter,partDepth,overlayDepth){
  const depth=Math.max(0,Number(overlayDepth)||0);
  return partCenter-zone.inward*(partDepth/2-depth/2);
}

function fitProductZone(zone,clearance){
  const total=Math.max(0,Number(clearance)||0);
  const half=total/2;
  return {
    ...zone,
    width:Math.max(80,zone.width-total),
    height:Math.max(120,zone.height-total),
    bottomY:zone.bottomY+half,
    topY:zone.topY-half
  };
}

function zipBoxSectionSpec(placement){
  const subtype=String(placement.subtype||'100x100 BOX').toUpperCase();
  if(subtype==='110x110 BOX')return {width:110,height:110,depth:110};
  if(subtype==='HERCULE')return {width:150,height:150,depth:150};
  if(subtype==='115x115 BOX')return {width:115,height:115,depth:115};
  if(subtype==='130x130 BOX')return {width:130,height:130,depth:130};
  return {width:100,height:100,depth:100};
}

function fitZipProductZone(zone,placement){
  const box=zipBoxSectionSpec(placement);
  if(String(placement.placementLocation||'BETWEEN POSTS')!=='FRONT OF POSTS'){
    const centered=fitProductZone(zone,3);
    const automaticFront=Boolean(placement.autoFrontOnly);
    return {
      ...centered,
      cx:zone.cx,
      cz:zone.cz,
      zipOutside:automaticFront,
      zipAutomaticFront:automaticFront,
      zipSideClearance:1.5,
      zipBox:box
    };
  }
  const left=Math.max(0,Number(zone.leftBoundaryWidth)||0);
  const right=Math.max(0,Number(zone.rightBoundaryWidth)||0);
  const shift=(right-left)/2;
  const adjusted={
    ...zone,
    width:Math.max(120,zone.width+left+right),
    height:Math.max(180,zone.height+150),
    bottomY:zone.bottomY,
    topY:zone.topY+150,
    zipOutside:true,
    zipHeightExtension:150,
    zipBox:box
  };
  if(zone.axis==='x')adjusted.cx=zone.cx+shift;
  else adjusted.cz=zone.cz+shift;
  return adjusted;
}

function addFrame(zone,span,height,depth,color){
  const frame=55;
  const v=productDepthCenter(zone,depth,0);
  const halfW=span/2;
  const halfH=height/2;
  addProductBox(zone,{name:'Frame Bottom',u:0,y:zone.bottomY+frame/2,v,w:span,h:frame,t:depth},color,1);
  addProductBox(zone,{name:'Frame Top',u:0,y:zone.topY-frame/2,v,w:span,h:frame,t:depth},color,1);
  addProductBox(zone,{name:'Frame Left',u:-halfW+frame/2,y:zone.bottomY+halfH,v,w:frame,h:height-frame*2,t:depth},color,1);
  addProductBox(zone,{name:'Frame Right',u:halfW-frame/2,y:zone.bottomY+halfH,v,w:frame,h:height-frame*2,t:depth},color,1);
  return {frame,innerW:span-frame*2,innerH:height-frame*2};
}




function createDoorPivot(zone,hingeU,hingeV,angle){
  const pivot=new THREE.Group();
  const x=zone.axis==='x'?zone.cx+hingeU:zone.cx+hingeV;
  const z=zone.axis==='x'?zone.cz+hingeV:zone.cz+hingeU;
  pivot.position.set(x,0,z);
  pivot.rotation.y=angle;
  group.add(pivot);
  return pivot;
}

function addDoorPivotPart(zone,pivot,cfg,color,opacity,hingeU,hingeV,productOpen){
  const axisX=zone.axis==='x';
  const geo=new THREE.BoxGeometry(axisX?cfg.w:cfg.t,cfg.h,axisX?cfg.t:cfg.w);
  const mat=new THREE.MeshStandardMaterial({
    color,
    roughness:.42,
    metalness:.22,
    transparent:opacity<1,
    opacity,
    depthWrite:opacity>.55,
    side:THREE.DoubleSide
  });
  const mesh=new THREE.Mesh(geo,mat);
  const du=cfg.u-hingeU;
  const dv=cfg.v-hingeV;
  mesh.position.set(axisX?du:dv,cfg.y,axisX?dv:du);
  mesh.castShadow=opacity>.5;
  mesh.receiveShadow=true;
  mesh.userData={name:cfg.name||'Door part',isProduct:true,zoneId:zone.id};
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:opacity<.8?0x164e63:0x111827,transparent:true,opacity:.48})));
  mesh.visible=false;
  pivot.add(mesh);
  parts.push(mesh);
  interactiveObjects.push(mesh);
  markTogglePanel(mesh,zone,productOpen,zone.id);
  return mesh;
}

function addDoorHingeParts(zone,pivot,cfg,hingeU,hingeV,productOpen){
  const hingeColor=0x9ca3af;
  const offset=cfg.hingeDirection==='LEFT'?18:-18;
  const heights=[cfg.bottomY+180, cfg.bottomY+cfg.height/2, cfg.bottomY+cfg.height-180].filter((v,i,a)=>v>cfg.bottomY+70 && v<cfg.bottomY+cfg.height-70 && a.indexOf(v)===i);
  heights.forEach((y,idx)=>{
    addDoorPivotPart(zone,pivot,{name:'Door Hinge '+(idx+1),u:hingeU+offset/2,y:y,v:hingeV,w:18,h:110,t:20},hingeColor,1,hingeU,hingeV,productOpen);
    addDoorPivotPart(zone,pivot,{name:'Door Hinge Plate '+(idx+1),u:hingeU+offset,y:y,v:hingeV,w:10,h:88,t:10},0xcbd5e1,1,hingeU,hingeV,productOpen);
  });
}

function addDimensionLabelScaled(zone,text,u,y,v,scaleFactor,mainDimension){
  const sprite=createDimensionSprite(text,Boolean(mainDimension));
  const scale=Math.max(0.2,Number(scaleFactor)||1);
  sprite.scale.set(sprite.scale.x*scale,sprite.scale.y*scale,1);
  sprite.position.copy(zoneWorldPoint(zone,u,y,v));
  return sprite;
}

function addFixedDoorLeaf(zone,cfg,placement,label){
  const face=50;
  const depth=55;
  const glazing=glazingSectionSpec(placement);
  const frameColor=0x475569;
  const glassColor=glassVisualColor(placement);
  const v=productDepthCenter(zone,depth,0);
  const glassV=productDepthCenter(zone,glazing.glassDepth,(depth-glazing.glassDepth)/2);
  addProductBox(zone,{name:label+' Left Stile',u:cfg.centerU-cfg.width/2+face/2,y:cfg.bottomY+cfg.height/2,v,w:face,h:cfg.height,t:depth},frameColor,1);
  addProductBox(zone,{name:label+' Right Stile',u:cfg.centerU+cfg.width/2-face/2,y:cfg.bottomY+cfg.height/2,v,w:face,h:cfg.height,t:depth},frameColor,1);
  addProductBox(zone,{name:label+' Top Rail',u:cfg.centerU,y:cfg.bottomY+cfg.height-face/2,v,w:cfg.width,h:face,t:depth},frameColor,1);
  addProductBox(zone,{name:label+' Bottom Rail',u:cfg.centerU,y:cfg.bottomY+face/2,v,w:cfg.width,h:face,t:depth},frameColor,1);
  addProductBox(zone,{name:label+' Glass',u:cfg.centerU,y:cfg.bottomY+cfg.height/2,v:glassV,w:Math.max(80,cfg.width-face*2-8),h:Math.max(100,cfg.height-face*2-8),t:glazing.glassDepth},glassColor,.34);
}

function addDoorHandleParts(zone,pivot,cfg,placement,hingeU,hingeV,productOpen){
  const handleY=zone.bottomY+900;
  const handleColor=0x111827;
  const lockSide=cfg.hingeDirection==='LEFT'?1:-1;
  const lockU=cfg.centerU+lockSide*(cfg.width/2-72);
  const outerV=productDepthCenter(zone,55,0)-zone.inward*18;
  const innerV=productDepthCenter(zone,55,0)+zone.inward*18;
  if(String(placement.handleType||'NORMAL')==='PANIC'){
    const barWidth=Math.max(120,cfg.width);
    addDoorPivotPart(zone,pivot,{name:'Panik Kapı Kolu',u:cfg.centerU,y:handleY,v:innerV,w:barWidth,h:34,t:26},handleColor,1,hingeU,hingeV,productOpen);
    addDoorPivotPart(zone,pivot,{name:'Panik Kol Sol Bağlantı',u:cfg.centerU-barWidth/2+26,y:handleY,v:innerV-zone.inward*12,w:24,h:86,t:24},handleColor,1,hingeU,hingeV,productOpen);
    addDoorPivotPart(zone,pivot,{name:'Panik Kol Sağ Bağlantı',u:cfg.centerU+barWidth/2-26,y:handleY,v:innerV-zone.inward*12,w:24,h:86,t:24},handleColor,1,hingeU,hingeV,productOpen);
  }else{
    addDoorPivotPart(zone,pivot,{name:'Normal Kapı Kolu Dış Rozeti',u:lockU,y:handleY,v:outerV,w:32,h:140,t:24},handleColor,1,hingeU,hingeV,productOpen);
    const outerLeverCenter=lockU-lockSide*58;
    addDoorPivotPart(zone,pivot,{name:'Normal Kapı Kolu Dış',u:outerLeverCenter,y:handleY,v:outerV-zone.inward*12,w:132,h:22,t:24},handleColor,1,hingeU,hingeV,productOpen);
    addDoorPivotPart(zone,pivot,{name:'Normal Kapı Kolu İç Rozeti',u:lockU,y:handleY,v:innerV,w:32,h:140,t:24},handleColor,1,hingeU,hingeV,productOpen);
    const innerLeverCenter=lockU+lockSide*58;
    addDoorPivotPart(zone,pivot,{name:'Normal Kapı Kolu İç',u:innerLeverCenter,y:handleY,v:innerV+zone.inward*12,w:132,h:22,t:24},handleColor,1,hingeU,hingeV,productOpen);
  }
}

function addMovingDoorLeaf(zone,cfg,placement,label,withHandle){
  const face=50;
  const depth=55;
  const glazing=glazingSectionSpec(placement);
  const frameColor=0x334155;
  const glassColor=glassVisualColor(placement);
  const productOpen=productIsOpen(zone.id);
  const hingeLeft=cfg.hingeDirection==='LEFT';
  const hingeU=cfg.centerU+(hingeLeft?-cfg.width/2:cfg.width/2);
  const hingeV=productDepthCenter(zone,depth,0);
  const leafDirection=hingeLeft?1:-1;
  const openV=String(placement.doorOpenDirection||'OUTWARD')==='INWARD'?zone.inward:-zone.inward;
  const axisSign=zone.axis==='x'?-1:1;
  const angle=productOpen?axisSign*openV*leafDirection*Math.PI/4:0;
  const pivot=createDoorPivot(zone,hingeU,hingeV,angle);
  const part=(partCfg,color,opacity)=>addDoorPivotPart(zone,pivot,partCfg,color,opacity,hingeU,hingeV,productOpen);
  part({name:label+' Left Stile',u:cfg.centerU-cfg.width/2+face/2,y:cfg.bottomY+cfg.height/2,v:hingeV,w:face,h:cfg.height,t:depth},frameColor,1);
  part({name:label+' Right Stile',u:cfg.centerU+cfg.width/2-face/2,y:cfg.bottomY+cfg.height/2,v:hingeV,w:face,h:cfg.height,t:depth},frameColor,1);
  part({name:label+' Top Rail',u:cfg.centerU,y:cfg.bottomY+cfg.height-face/2,v:hingeV,w:cfg.width,h:face,t:depth},frameColor,1);
  part({name:label+' Bottom Rail',u:cfg.centerU,y:cfg.bottomY+face/2,v:hingeV,w:cfg.width,h:face,t:depth},frameColor,1);
  const glassV=productDepthCenter(zone,glazing.glassDepth,(depth-glazing.glassDepth)/2);
  part({name:label+' Glass',u:cfg.centerU,y:cfg.bottomY+cfg.height/2,v:glassV,w:Math.max(80,cfg.width-face*2-8),h:Math.max(100,cfg.height-face*2-8),t:glazing.glassDepth},glassColor,.34);
  addDoorHingeParts(zone,pivot,cfg,hingeU,hingeV,productOpen);
  if(withHandle)addDoorHandleParts(zone,pivot,cfg,placement,hingeU,hingeV,productOpen);
}

function addDoorTopFixedDimensions(zone,fixedHeight,transomY,innerTop,bottom,leafTop,leafHeight){
  if(!dimensionVisibility.intermediate)return;
  const dimV=zone.outerFaceV-zone.inward*56;
  const dimU=0;
  const wing=18;
  const draw=(y1,y2,text)=>{
    addDimensionSegments(zone,[
      [dimU,y1,dimV,dimU,y2,dimV],
      [dimU-wing,y1+wing,dimV,dimU,y1,dimV],
      [dimU+wing,y1+wing,dimV,dimU,y1,dimV],
      [dimU-wing,y2-wing,dimV,dimU,y2,dimV],
      [dimU+wing,y2-wing,dimV,dimU,y2,dimV]
    ],false);
    addDimensionLabelScaled(zone,text,dimU,(y1+y2)/2,dimV,0.5,false);
  };
  draw(transomY,innerTop,'Sabit Cam '+Math.round(fixedHeight)+' mm');
  draw(bottom,leafTop,'Kapı Kanadı '+Math.round(leafHeight)+' mm');
}

function buildDoorProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const frameFace=50;
  const frameDepth=55;
  const frameColor=0x475569;
  const v=productDepthCenter(zone,frameDepth,0);
  const halfW=zone.width/2;
  addProductBox(zone,{name:'Door Outer Left Frame',u:-halfW+frameFace/2,y:(zone.bottomY+zone.topY)/2,v,w:frameFace,h:zone.height,t:frameDepth},frameColor,1);
  addProductBox(zone,{name:'Door Outer Right Frame',u:halfW-frameFace/2,y:(zone.bottomY+zone.topY)/2,v,w:frameFace,h:zone.height,t:frameDepth},frameColor,1);
  addProductBox(zone,{name:'Door Outer Top Frame',u:0,y:zone.topY-frameFace/2,v,w:zone.width,h:frameFace,t:frameDepth},frameColor,1);

  const innerW=Math.max(300,zone.width-frameFace*2);
  const innerTop=zone.topY-frameFace;
  const bottom=zone.bottomY+6;
  const type=String(placement.doorType||'SINGLE');
  const hasTopFixed=DOOR_TOP_FIXED_TYPES.has(type);
  let leafTop=innerTop;
  if(hasTopFixed){
    const fixedHeight=Math.max(250,Math.min(1200,Math.round(Number(placement.topFixedHeight)||500)));
    const transomY=innerTop-fixedHeight;
    addProductBox(zone,{name:'Door Top Fixed Transom',u:0,y:transomY,v,w:innerW,h:frameFace,t:frameDepth},frameColor,1);
    const glazing=glazingSectionSpec(placement);
    const glassV=productDepthCenter(zone,glazing.glassDepth,(frameDepth-glazing.glassDepth)/2);
    const topGlassBottom=transomY+frameFace/2+6;
    const topGlassH=Math.max(100,innerTop-topGlassBottom-6);
    addProductBox(zone,{name:'Door Upper Fixed Glass',u:0,y:topGlassBottom+topGlassH/2,v:glassV,w:Math.max(80,innerW-12),h:topGlassH,t:glazing.glassDepth},glassVisualColor(placement),.34);
    leafTop=transomY-frameFace/2-6;
    addDoorTopFixedDimensions(zone,fixedHeight,transomY,innerTop,bottom,leafTop,Math.max(600,leafTop-bottom));
  }
  const usableH=Math.max(600,leafTop-bottom);
  const total=innerW-12;
  const gap=2;
  const items=[];
  const addItem=(kind,label,opts={})=>items.push({kind,label,...opts});
  switch(type){
    case 'DOUBLE':
    case 'DOUBLE_TOP':
      addItem('moving','Door Left Leaf',{hingeDirection:'LEFT',activeKey:'LEFT'});
      addItem('moving','Door Right Leaf',{hingeDirection:'RIGHT',activeKey:'RIGHT'});
      break;
    case 'LEFT_FIXED_RIGHT_MOVING':
    case 'LEFT_FIXED_TOP':
      addItem('fixed','Door Left Fixed');
      addItem('moving','Door Right Moving',{hingeDirection:String(placement.hingeDirection||'RIGHT')});
      break;
    case 'RIGHT_FIXED_LEFT_MOVING':
    case 'RIGHT_FIXED_TOP':
      addItem('moving','Door Left Moving',{hingeDirection:String(placement.hingeDirection||'LEFT')});
      addItem('fixed','Door Right Fixed');
      break;
    case 'BOTH_FIXED_TOP':
      addItem('fixed','Door Left Fixed');
      addItem('moving','Door Center Moving',{hingeDirection:String(placement.hingeDirection||'LEFT')});
      addItem('fixed','Door Right Fixed');
      break;
    case 'DOUBLE_LEFT_FIXED':
    case 'DOUBLE_LEFT_FIXED_TOP':
      addItem('fixed','Door Left Fixed');
      addItem('moving','Door Center Left Leaf',{hingeDirection:'LEFT',activeKey:'LEFT'});
      addItem('moving','Door Center Right Leaf',{hingeDirection:'RIGHT',activeKey:'RIGHT'});
      break;
    case 'DOUBLE_RIGHT_FIXED_TOP':
      addItem('moving','Door Center Left Leaf',{hingeDirection:'LEFT',activeKey:'LEFT'});
      addItem('moving','Door Center Right Leaf',{hingeDirection:'RIGHT',activeKey:'RIGHT'});
      addItem('fixed','Door Right Fixed');
      break;
    case 'DOUBLE_BOTH_FIXED_TOP':
      addItem('fixed','Door Left Fixed');
      addItem('moving','Door Inner Left Leaf',{hingeDirection:'LEFT',activeKey:'LEFT'});
      addItem('moving','Door Inner Right Leaf',{hingeDirection:'RIGHT',activeKey:'RIGHT'});
      addItem('fixed','Door Right Fixed');
      break;
    case 'TOP_FIXED':
    case 'SINGLE':
    default:
      addItem('moving', type==='TOP_FIXED' ? 'Door Lower Leaf' : 'Door Single Leaf', {hingeDirection:String(placement.hingeDirection||'LEFT')});
      break;
  }
  const count=items.length;
  const segW=Math.max(220,(total-gap*Math.max(0,count-1))/count);
  const rowWidth=segW*count+gap*Math.max(0,count-1);
  let cursor=-rowWidth/2+segW/2;
  items.forEach((item)=>{
    item.centerU=cursor;
    item.width=segW;
    item.bottomY=bottom;
    item.height=usableH;
    cursor+=segW+gap;
  });
  items.forEach((item)=>{
    if(item.kind==='fixed') addFixedDoorLeaf(zone,item,placement,item.label);
    else addMovingDoorLeaf(zone,{centerU:item.centerU,bottomY:item.bottomY,width:item.width,height:item.height,hingeDirection:item.hingeDirection||String(placement.hingeDirection||'LEFT')},placement,item.label,item.activeKey ? String(placement.activeLeaf||'RIGHT')===item.activeKey : true);
  });
}

function fixedVerticalDivisionCount(innerW,manualValue){
  const automatic=Math.max(1,Math.ceil(Math.max(0,innerW)/1200));
  const manual=Math.round(Number(manualValue)||0);
  return Math.max(1,Math.min(20,manual||automatic));
}

function parseFixedHorizontalSegments(totalHeight,divisionCount,heightsRaw){
  const divisions=Math.max(1,Math.min(10,Math.round(Number(divisionCount)||1)));
  const values=String(heightsRaw||'').split(/[;,]+/).map(item=>Number(String(item).trim())).filter(value=>Number.isFinite(value)&&value>0);
  if(values.length===divisions&&Math.abs(values.reduce((sum,value)=>sum+value,0)-totalHeight)<=2)return values;
  const base=Math.floor(totalHeight/divisions);
  const segments=Array(divisions).fill(base);
  segments[segments.length-1]+=Math.round(totalHeight-base*divisions);
  return segments;
}

function fixedHorizontalCenters(zone,segments){
  const centers=[];
  let cursor=zone.bottomY;
  for(let i=0;i<segments.length-1;i++){
    cursor+=segments[i];
    centers.push(cursor);
  }
  return centers;
}

function addFixedHeightDimensions(zone,segments,centers){
  if(!dimensionVisibility.intermediate||segments.length<2)return;
  const outsideV=zone.outerFaceV-zone.inward*118;
  const dimU=0;
  const wing=22;
  const boundaries=[zone.bottomY,...centers,zone.topY];
  for(let i=0;i<segments.length;i++){
    const y1=boundaries[i],y2=boundaries[i+1];
    addDimensionSegments(zone,[
      [dimU,y1,outsideV,dimU,y2,outsideV],
      [dimU-wing,y1+wing,outsideV,dimU,y1,outsideV],
      [dimU+wing,y1+wing,outsideV,dimU,y1,outsideV],
      [dimU-wing,y2-wing,outsideV,dimU,y2,outsideV],
      [dimU+wing,y2-wing,outsideV,dimU,y2,outsideV]
    ],false);
    addDimensionLabel(zone,Math.round(segments[i])+' mm',dimU+105,(y1+y2)/2,outsideV);
  }
}

function buildFixedJoineryProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const frameColor=0x475569;
  const mullionColor=0x64748b;
  const glazing=glazingSectionSpec(placement);
  const glassColor=glassVisualColor(placement);
  const frameDepth=55;
  const dims=addFrame(zone,zone.width,zone.height,frameDepth,frameColor);
  const profile=55;
  const glassInset=Math.max(0,(frameDepth-glazing.glassDepth)/2);
  const glassV=productDepthCenter(zone,glazing.glassDepth,glassInset);

  const verticalDivisions=fixedVerticalDivisionCount(dims.innerW,placement.verticalDivisions);
  const verticalProfiles=Math.max(0,verticalDivisions-1);
  const cellW=(dims.innerW-verticalProfiles*profile)/verticalDivisions;
  const xIntervals=[];
  let xCursor=-dims.innerW/2;
  for(let i=0;i<verticalDivisions;i++){
    const left=xCursor;
    const right=left+cellW;
    xIntervals.push([left,right]);
    xCursor=right;
    if(i<verticalProfiles){
      const center=xCursor+profile/2;
      addProductBox(zone,{name:'Fixed Vertical Mullion '+(i+1),u:center,y:(zone.bottomY+zone.topY)/2,v:productDepthCenter(zone,frameDepth,0),w:profile,h:dims.innerH,t:frameDepth},mullionColor,1);
      xCursor+=profile;
    }
  }

  const horizontalDivisions=Math.max(1,Math.min(10,Math.round(Number(placement.horizontalDivisions)||1)));
  const segments=parseFixedHorizontalSegments(zone.height,horizontalDivisions,placement.horizontalHeights);
  const centers=fixedHorizontalCenters(zone,segments);
  const innerBottom=zone.bottomY+dims.frame;
  const innerTop=zone.topY-dims.frame;
  const yIntervals=[];
  let yCursor=innerBottom;
  centers.forEach((center,index)=>{
    const lower=Math.max(yCursor,center-profile/2);
    if(lower-yCursor>=60)yIntervals.push([yCursor,lower]);
    addProductBox(zone,{name:'Fixed Horizontal Mullion '+(index+1),u:0,y:center,v:productDepthCenter(zone,frameDepth,0),w:dims.innerW,h:profile,t:frameDepth},mullionColor,1);
    yCursor=Math.min(innerTop,center+profile/2);
  });
  if(innerTop-yCursor>=60)yIntervals.push([yCursor,innerTop]);
  if(!yIntervals.length)yIntervals.push([innerBottom,innerTop]);

  xIntervals.forEach((xInterval,xi)=>{
    yIntervals.forEach((yInterval,yi)=>{
      const left=xInterval[0],right=xInterval[1],bottom=yInterval[0],top=yInterval[1];
      addProductBox(zone,{name:'Fixed Glass Pane '+(xi+1)+'-'+(yi+1),u:(left+right)/2,y:(bottom+top)/2,v:glassV,w:Math.max(60,right-left-12),h:Math.max(60,top-bottom-12),t:glazing.glassDepth},glassColor,.34);
    });
  });
  addFixedHeightDimensions(zone,segments,centers);
}

function slidingTrackLevel(index,panels,openingType,direction){
  if(openingType==='CENTER OPENING'){
    const centerDistance=Math.floor(Math.abs(index-(panels-1)/2));
    const maxDistance=Math.max(0,Math.floor((panels-1)/2));
    return direction==='INSIDE'?maxDistance-centerDistance:centerDistance;
  }
  if(direction==='LEFT')return index;
  return panels-1-index;
}

function slidingPanelLayout(innerW,panels,overlap,openingType,collectionState,direction){
  const collected=collectionState==='COLLECTED';
  const positions=[];
  if(openingType==='CENTER OPENING'&&panels%2===0){
    const half=panels/2;
    const centerGap=2;
    const halfSpan=(innerW-centerGap)/2;
    const panelW=(halfSpan+overlap*(half-1))/half;
    for(let i=0;i<half;i++)positions.push(-innerW/2+panelW/2+i*(panelW-overlap));
    for(let i=0;i<half;i++)positions.push(centerGap/2+panelW/2+i*(panelW-overlap));
    if(collected){
      const maxReveal=half>1?Math.max(0,(halfSpan-panelW)/(half-1)):0;
      const reveal=half>1?Math.min(24,panelW*.06,maxReveal):0;
      for(let i=0;i<half;i++)positions[i]=-innerW/2+panelW/2+i*reveal;
      for(let i=0;i<half;i++)positions[half+i]=innerW/2-panelW/2-(half-1-i)*reveal;
    }
    return {panelW,positions,centerGap};
  }
  const panelW=(innerW+overlap*(panels-1))/panels;
  const start=-innerW/2+panelW/2;
  for(let i=0;i<panels;i++)positions.push(start+i*(panelW-overlap));
  if(collected){
    const maxReveal=panels>1?Math.max(0,(innerW-panelW)/(panels-1)):0;
    const reveal=panels>1?Math.min(24,panelW*.06,maxReveal):0;
    const stackLeft=direction==='RIGHT';
    for(let i=0;i<panels;i++){
      positions[i]=stackLeft
        ? -innerW/2+panelW/2+i*reveal
        : innerW/2-panelW/2-(panels-1-i)*reveal;
    }
  }
  return {panelW,positions,centerGap:0};
}

function buildSlidingProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const frameColor=String(placement.series||'A SERIES')==='K SERIES'?0x1e293b:0x334155;
  const panelColor=String(placement.series||'A SERIES')==='K SERIES'?0x0f766e:0x0d9488;
  const glassColor=glassVisualColor(placement);
  const glazing=glazingSectionSpec(placement);
  const frameDepth=String(placement.series||'A SERIES')==='K SERIES'?92:80;
  const dims=addFrame(zone,zone.width,zone.height,frameDepth,frameColor);
  const panels=Math.max(2,Math.min(12,Math.round(Number(placement.panels)||4)));
  const overlap=Math.max(38,Math.min(58,zone.width/(panels*5)));
  const openingType=String(placement.openingType||'SIDE OPENING');
  const direction=openingType==='CENTER OPENING'
    ?(String(placement.openingDirection||'OUTSIDE')==='INSIDE'?'INSIDE':'OUTSIDE')
    :(String(placement.openingDirection||'RIGHT')==='LEFT'?'LEFT':'RIGHT');
  const productOpen=productIsOpen(zone.id);
  const collectionState=productOpen?'COLLECTED':'NORMAL';
  const layout=slidingPanelLayout(dims.innerW,panels,overlap,openingType,collectionState,direction);
  const panelW=layout.panelW;
  const threshold=String(placement.subtype||'WITH THRESHOLD')==='WITH THRESHOLD';
  const thresholdH=threshold?42:15;
  const panelH=Math.max(240,dims.innerH-thresholdH-20);
  const stile=Math.max(24,Math.min(34,panelW*.08));
  const panelBottom=zone.bottomY+dims.frame+thresholdH;
  const trackStep=glazing.frameDepth+2;
  const insulated=String(placement.glassThickness||'').toUpperCase()==='INSULATED GLASS';
  const thresholdDepth=threshold&&openingType==='SIDE OPENING'&&panels>=6&&insulated?123+panels*24:123;
  const thresholdV=productDepthCenter(zone,thresholdDepth,0);

  addProductBox(zone,{name:threshold?'Sliding Threshold':'Sliding Flush Bottom Profile',u:0,y:zone.bottomY+dims.frame+thresholdH/2-4,v:thresholdV,w:dims.innerW,h:thresholdH,t:thresholdDepth},0x475569,1);

  const centerLeft=panels/2-1;
  const centerRight=panels/2;
  for(let i=0;i<panels;i++){
    const u=layout.positions[i];
    const trackLevel=slidingTrackLevel(i,panels,openingType,direction);
    const v=productDepthCenter(zone,glazing.frameDepth,trackLevel*trackStep);
    markTogglePanel(addProductBox(zone,{name:'Sliding Glass '+(i+1),u,y:panelBottom+panelH/2,v,w:Math.max(60,panelW-stile*2),h:Math.max(100,panelH-stile*2),t:glazing.glassDepth},glassColor,.34),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Sliding Left Stile '+(i+1),u:u-panelW/2+stile/2,y:panelBottom+panelH/2,v,w:stile,h:panelH,t:glazing.frameDepth},panelColor,1),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Sliding Right Stile '+(i+1),u:u+panelW/2-stile/2,y:panelBottom+panelH/2,v,w:stile,h:panelH,t:glazing.frameDepth},panelColor,1),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Sliding Top Rail '+(i+1),u,y:panelBottom+panelH-stile/2,v,w:panelW,h:stile,t:glazing.frameDepth},panelColor,1),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Sliding Bottom Rail '+(i+1),u,y:panelBottom+stile/2,v,w:panelW,h:stile,t:glazing.frameDepth},panelColor,1),zone,productOpen);

    if(openingType==='SIDE OPENING'){
      const thickIndex=direction==='LEFT'?0:panels-1;
      const thinIndex=direction==='LEFT'?panels-1:0;
      if(i===thickIndex||i===thinIndex){
        const thick=i===thickIndex;
        const arrowDirection=direction==='LEFT'?(thick?1:-1):(thick?-1:1);
        addFacadeArrow(zone,{
          name:(thick?'Primary':'Secondary')+' Sliding Direction Arrow',
          u,
          y:panelBottom+panelH/2,
          v:productSurfaceCenter(zone,v,glazing.frameDepth,4),
          length:Math.min(panelW-stile*2-20,420),
          maxLength:panelW-stile*2-20,
          direction:arrowDirection,
          vertical:false,
          thick
        });
      }
    }else if(i===centerLeft||i===centerRight){
      addFacadeArrow(zone,{
        name:(i===centerLeft?'Left':'Right')+' Center Sliding Direction Arrow',
        u,
        y:panelBottom+panelH/2,
        v:productSurfaceCenter(zone,v,glazing.frameDepth,4),
        length:Math.min(panelW-stile*2-20,420),
        maxLength:panelW-stile*2-20,
        direction:i===centerLeft?-1:1,
        vertical:false,
        thick:true
      });
    }
  }
}

function buildGuillotinePanel(zone,cfg,placement,index){
  const subtype=String(placement.subtype||'CLEANABLE');
  const vasistasOpen=Boolean(cfg.productOpen)&&index===0&&subtype==='CLEANABLE';
  const angle=vasistasOpen?THREE.MathUtils.degToRad(29):0;
  const hingeY=cfg.y-cfg.panelH/2;
  const addPart=(part,color,opacity)=>markTogglePanel(vasistasOpen
    ?addBottomHungProductBox(zone,part,color,opacity,angle,hingeY)
    :addProductBox(zone,part,color,opacity),zone,Boolean(cfg.productOpen));

  addPart({name:'Guillotine Glass '+(index+1),u:0,y:cfg.y,v:cfg.v,w:Math.max(60,cfg.panelW-cfg.stile*2),h:Math.max(100,cfg.panelH-cfg.stile*2),t:cfg.glassDepth},cfg.glassColor,.35);
  addPart({name:'Guillotine Left Stile '+(index+1),u:-cfg.panelW/2+cfg.stile/2,y:cfg.y,v:cfg.v,w:cfg.stile,h:cfg.panelH,t:cfg.frameDepth},cfg.panelColor,1);
  addPart({name:'Guillotine Right Stile '+(index+1),u:cfg.panelW/2-cfg.stile/2,y:cfg.y,v:cfg.v,w:cfg.stile,h:cfg.panelH,t:cfg.frameDepth},cfg.panelColor,1);
  addPart({name:'Guillotine Top Rail '+(index+1),u:0,y:cfg.y+cfg.panelH/2-cfg.stile/2,v:cfg.v,w:cfg.panelW,h:cfg.stile,t:cfg.frameDepth},cfg.panelColor,1);
  addPart({name:'Guillotine Bottom Rail '+(index+1),u:0,y:cfg.y-cfg.panelH/2+cfg.stile/2,v:cfg.v,w:cfg.panelW,h:cfg.stile,t:cfg.frameDepth},cfg.panelColor,1);

  if(vasistasOpen){
    addPart({name:'Cleanable Vasistas Hinge',u:0,y:cfg.y-cfg.panelH/2+8,v:cfg.v+zone.inward*6,w:Math.max(80,cfg.panelW*.6),h:12,t:18},0xf59e0b,1);
  }

  const downwardArrow=(subtype==='CLEANABLE'||subtype==='DOWNWARD COLLECTING')&&index>0;
  const upwardArrow=subtype==='UPWARD COLLECTING'&&index<cfg.panels-1;
  if(downwardArrow||upwardArrow){
    addFacadeArrow(zone,{
      name:(downwardArrow?'Downward':'Upward')+' Guillotine Direction Arrow '+(index+1),
      u:0,
      y:cfg.y,
      v:productSurfaceCenter(zone,cfg.v,cfg.frameDepth,4),
      length:Math.min(cfg.panelH-cfg.stile*2-24,320),
      maxLength:cfg.panelH-cfg.stile*2-24,
      direction:downwardArrow?-1:1,
      vertical:true,
      thick:true
    });
  }
}

function guillotinePanelLayerInset(index,panels,panelDepth,gap){
  const step=panelDepth+gap;
  return Math.max(0,(panels-1-index)*step);
}

function buildGuillotineProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const seriesK=String(placement.series||'A SERIES')==='K SERIES';
  const frameColor=seriesK?0x1e293b:0x334155;
  const panelColor=seriesK?0x6d28d9:0x7c3aed;
  const glassColor=glassVisualColor(placement);
  const glazing=glazingSectionSpec(placement);
  const dims=addFrame(zone,zone.width,zone.height,seriesK?96:86,frameColor);
  const motorH=Math.min(160,Math.max(100,zone.height*.08));
  const motorY=zone.topY-dims.frame-motorH/2;
  const motorBoxDepth=96;
  const motorBoxV=productDepthCenter(zone,motorBoxDepth,0);
  addProductBox(zone,{name:'Guillotine Motor Box',u:0,y:motorY,v:motorBoxV,w:dims.innerW,h:motorH,t:motorBoxDepth},motorVisualColor(placement),1);

  const facadeRightSign=zone.axis==='x'?-zone.zipOriginalInward:zone.zipOriginalInward;
  const motorSide=String(placement.motorDirection||'RIGHT')==='RIGHT'?facadeRightSign:-facadeRightSign;
  addFacadeText(zone,{name:'Guillotine Motor Label',text:'MOTOR',u:motorSide*(dims.innerW/2-150),y:motorY,v:zone.outerFaceV+zone.inward*.5,w:220,h:70});
  addProductBox(zone,{name:'Guillotine Motor Side',u:motorSide*(dims.innerW/2-32),y:motorY,v:productDepthCenter(zone,112,0),w:52,h:motorH*.72,t:112},0x111827,1);
  const panels=Math.max(2,Math.min(8,Math.round(Number(placement.panels)||3)));
  const usableH=Math.max(360,dims.innerH-motorH-16);
  const overlap=Math.max(42,Math.min(78,usableH/(panels*4)));
  const panelH=(usableH+overlap*(panels-1))/panels;
  const panelW=dims.innerW-34;
  const stile=Math.max(24,Math.min(32,panelW*.045));
  const bottom=zone.bottomY+dims.frame+8;
  const subtype=String(placement.subtype||'CLEANABLE');
  const productOpen=productIsOpen(zone.id);
  const collected=productOpen;
  const upward=subtype==='UPWARD COLLECTING'&&collected;
  const downward=subtype==='DOWNWARD COLLECTING'&&collected;
  const collectedStep=Math.max(34,overlap*.62);
  const guillotinePanelDepth=glazing.frameDepth;
  const guillotinePanelGap=2;

  for(let i=0;i<panels;i++){
    const y=upward
      ? zone.topY-dims.frame-motorH-panelH/2-i*collectedStep
      : downward
        ? bottom+panelH/2+i*collectedStep
        : bottom+panelH/2+i*(panelH-overlap);
    const layerInset=guillotinePanelLayerInset(i,panels,guillotinePanelDepth,guillotinePanelGap);
    const v=productDepthCenter(zone,guillotinePanelDepth,layerInset);
    buildGuillotinePanel(zone,{y,v,panelW,panelH,stile,panelColor,glassColor,glassDepth:glazing.glassDepth,frameDepth:glazing.frameDepth,panels,productOpen},placement,i);
  }
}

function zipFabricCssColor(placement){
  if(String(placement.fabricColor||'SOLTIS')!=='OTHER')return '#8b9096';
  const value=String(placement.customFabricColor||'').trim();
  if(/^#[0-9a-f]{6}$/i.test(value)||/^#[0-9a-f]{3}$/i.test(value))return value;
  return '#8b9096';
}

function createZipFabricMaterial(placement){
  const canvas=document.createElement('canvas');
  canvas.width=256;
  canvas.height=256;
  const ctx=canvas.getContext('2d');
  if(!ctx)return new THREE.MeshStandardMaterial({color:0x8b9096,roughness:.92,metalness:0,side:THREE.DoubleSide});
  ctx.fillStyle=zipFabricCssColor(placement);
  ctx.fillRect(0,0,256,256);
  ctx.fillStyle='rgba(17,24,39,.72)';
  for(let y=2;y<256;y+=4){
    for(let x=2;x<256;x+=4){
      ctx.beginPath();
      ctx.arc(x+(y%8?1:0),y,.52,0,Math.PI*2);
      ctx.fill();
    }
  }
  const texture=new THREE.CanvasTexture(canvas);
  texture.wrapS=THREE.RepeatWrapping;
  texture.wrapT=THREE.RepeatWrapping;
  texture.repeat.set(10,16);
  texture.needsUpdate=true;
  return new THREE.MeshStandardMaterial({map:texture,color:0xffffff,roughness:.9,metalness:0,transparent:false,side:THREE.DoubleSide});
}

function addZipFabricPanel(zone,cfg,placement,panelMeta){
  const axisX=zone.axis==='x';
  const geo=new THREE.BoxGeometry(axisX?cfg.w:cfg.t,cfg.h,axisX?cfg.t:cfg.w);
  const mesh=new THREE.Mesh(geo,createZipFabricMaterial(placement));
  const x=axisX?zone.cx+cfg.u:zone.cx+cfg.v;
  const z=axisX?zone.cz+cfg.v:zone.cz+cfg.u;
  mesh.position.set(x,cfg.y,z);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={
    name:'Zip Perde Kumaş Paneli',
    isProduct:true,
    isTogglePanel:true,
    panelKey:panelMeta.panelKey,
    productKey:panelMeta.panelKey,
    panelOpen:Boolean(panelMeta.panelOpen),
    zoneId:zone.id
  };
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x111827,transparent:true,opacity:.42})));
  mesh.visible=true;
  group.add(mesh);
  parts.push(mesh);
  interactiveObjects.push(mesh);
  return mesh;
}

function buildZipScreenProduct(zone,placement){
  const originalInward=zone.inward;
  zone=fitZipProductZone(zone,placement);
  const zipOutside=Boolean(zone.zipOutside);
  zone={...zone,inward:zipOutside?-originalInward:originalInward,zipOriginalInward:originalInward};
  const box=zone.zipBox||zipBoxSectionSpec(placement);
  const seriesP=String(placement.series||'G SERIES')==='P SERIES';
  const frameColor=seriesP?0x1e3a5f:0x374151;
  const accentColor=seriesP?0x0f766e:0x475569;
  const frameDepth=Math.max(72,Math.min(110,box.depth));
  const dims=addFrame(zone,zone.width,zone.height,frameDepth,frameColor);
  const topBoxY=zone.topY-dims.frame-box.height/2;
  const topBoxBottom=zone.topY-dims.frame-box.height;
  const topBoxV=productDepthCenter(zone,box.depth,0);
  addProductBox(zone,{name:'Zip Top Box',u:0,y:topBoxY,v:topBoxV,w:dims.innerW,h:box.height,t:box.depth},frameColor,1);

  const guideW=Math.max(28,Math.min(42,box.width*.34));
  const guideDepth=Math.max(26,Math.min(48,box.depth*.4));
  const panelBottom=zone.bottomY+dims.frame+8;
  const fullPanelH=Math.max(120,topBoxBottom-panelBottom-8);
  const guideY=panelBottom+fullPanelH/2;
  const guideV=productDepthCenter(zone,guideDepth,0);
  addProductBox(zone,{name:'Zip Left Guide',u:-dims.innerW/2+guideW/2,y:guideY,v:guideV,w:guideW,h:fullPanelH,t:guideDepth},accentColor,1);
  addProductBox(zone,{name:'Zip Right Guide',u:dims.innerW/2-guideW/2,y:guideY,v:guideV,w:guideW,h:fullPanelH,t:guideDepth},accentColor,1);

  const panelKey='zip:'+zone.id;
  const panelOpen=productIsOpen(panelKey);
  const bottomBarH=32;
  const fabricDepth=5;
  const fabricW=Math.max(80,dims.innerW-guideW*2);
  const guillotineReferenceDepth=12;
  const lowerFixedPanelInset=guillotinePanelLayerInset(0,3,guillotineReferenceDepth,2);
  const fabricV=productDepthCenter(zone,fabricDepth,lowerFixedPanelInset);
  const visibleFabricH=panelOpen?Math.max(18,Math.min(34,fullPanelH*.08)):Math.max(80,fullPanelH-bottomBarH);
  const fabricY=panelOpen
    ? topBoxBottom-visibleFabricH/2-4
    : panelBottom+visibleFabricH/2;
  const bottomBarY=panelOpen
    ? topBoxBottom-visibleFabricH-bottomBarH/2-4
    : panelBottom+visibleFabricH+bottomBarH/2;

  addZipFabricPanel(zone,{u:0,y:fabricY,v:fabricV,w:fabricW,h:visibleFabricH,t:fabricDepth},placement,{panelKey,panelOpen});
  const bottomBar=addProductBox(zone,{name:'Zip Bottom Bar',u:0,y:bottomBarY,v:productDepthCenter(zone,guideDepth,lowerFixedPanelInset),w:fabricW,h:bottomBarH,t:guideDepth},accentColor,1);
  bottomBar.userData.panelKey=panelKey;
  bottomBar.userData.productKey=panelKey;
  bottomBar.userData.panelOpen=panelOpen;

  const facadeRightSign=zone.axis==='x'?-zone.zipOriginalInward:zone.zipOriginalInward;
  const motorSide=String(placement.motorDirection||'RIGHT')==='RIGHT'?facadeRightSign:-facadeRightSign;
  addFacadeText(zone,{name:'Zip Motor Label',text:'MOTOR',u:motorSide*(dims.innerW/2-145),y:topBoxY,v:zone.outerFaceV+zone.inward*.5,w:210,h:64});

  const cable=String(placement.cableDirection||'BACK');
  let cableU=motorSide*(dims.innerW/2-24);
  let cableV=topBoxV;
  let cableY=topBoxY;
  if(cable==='BACK')cableV=productDepthCenter(zone,18,Math.max(0,box.depth-18));
  if(cable==='TOP')cableY=zone.topY-9;
  if(cable==='SIDE')cableU=motorSide*(dims.innerW/2-9);
  addProductBox(zone,{name:'Zip Cable Exit '+cable,u:cableU,y:cableY,v:cableV,w:18,h:18,t:18},0xf59e0b,1);
}

function buildZipFallbackProduct(zone,placement){
  const originalInward=zone.inward;
  zone=fitZipProductZone(zone,placement);
  const zipOutside=Boolean(zone.zipOutside);
  zone={...zone,inward:zipOutside?-originalInward:originalInward,zipOriginalInward:originalInward};
  const open=productIsOpen('zip:'+zone.id);
  const topBoxH=Math.max(100,Math.min(150,zipBoxSectionSpec(placement).height));
  const guide=34;
  const depth=36;
  const panelBottom=zone.bottomY+24;
  const panelTop=zone.topY-topBoxH-12;
  const fullH=Math.max(120,panelTop-panelBottom);
  const visibleH=open?24:fullH;
  const panelY=open?panelTop-visibleH/2:panelBottom+visibleH/2;
  addProductBox(zone,{name:'Zip Fallback Top Box',u:0,y:zone.topY-topBoxH/2,v:productDepthCenter(zone,topBoxH,0),w:zone.width,h:topBoxH,t:topBoxH},0x374151,1);
  addProductBox(zone,{name:'Zip Fallback Left Guide',u:-zone.width/2+guide/2,y:panelBottom+fullH/2,v:productDepthCenter(zone,depth,0),w:guide,h:fullH,t:depth},0x475569,1);
  addProductBox(zone,{name:'Zip Fallback Right Guide',u:zone.width/2-guide/2,y:panelBottom+fullH/2,v:productDepthCenter(zone,depth,0),w:guide,h:fullH,t:depth},0x475569,1);
  markTogglePanel(addProductBox(zone,{name:'Zip Perde Gri Panel',u:0,y:panelY,v:productDepthCenter(zone,5,guillotinePanelLayerInset(0,3,12,2)),w:Math.max(80,zone.width-guide*2),h:visibleH,t:5},0x8b9096,1),zone,open,'zip:'+zone.id);
}
function zoneWorldPoint(zone,u,y,v){
  return zone.axis==='x'
    ? new THREE.Vector3(zone.cx+u,y,zone.cz+v)
    : new THREE.Vector3(zone.cx+v,y,zone.cz+u);
}

function registerDimensionLine(points,mainDimension){
  const geo=new THREE.BufferGeometry().setFromPoints(points);
  const line=new THREE.LineSegments(geo,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:1,depthTest:false,linewidth:3}));
  line.renderOrder=50;
  const target=mainDimension?mainDimensionObjects:intermediateDimensionObjects;
  line.visible=mainDimension?dimensionVisibility.main:dimensionVisibility.intermediate;
  group.add(line);
  target.push(line);
  return line;
}

function addDimensionSegments(zone,segments,mainDimension){
  const points=[];
  segments.forEach(segment=>{
    points.push(zoneWorldPoint(zone,segment[0],segment[1],segment[2]));
    points.push(zoneWorldPoint(zone,segment[3],segment[4],segment[5]));
  });
  return registerDimensionLine(points,Boolean(mainDimension));
}

function addWorldDimensionSegments(segments,mainDimension){
  const points=[];
  segments.forEach(segment=>{
    points.push(new THREE.Vector3(segment[0],segment[1],segment[2]));
    points.push(new THREE.Vector3(segment[3],segment[4],segment[5]));
  });
  return registerDimensionLine(points,Boolean(mainDimension));
}

function createDimensionSprite(text,mainDimension){
  const isMain=Boolean(mainDimension);
  const canvas=document.createElement('canvas');
  canvas.width=4096;
  canvas.height=1024;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.font=(isMain?'900':'700')+' 368px Segoe UI, Arial, sans-serif';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.lineWidth=isMain?84:72;
  ctx.strokeStyle=isMain?'rgba(69,10,10,.98)':'rgba(15,23,42,.98)';
  ctx.strokeText(text,2048,528);
  ctx.fillStyle=isMain?'#ef4444':'#ffffff';
  ctx.fillText(text,2048,528);
  const texture=new THREE.CanvasTexture(canvas);
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));
  sprite.scale.set(isMain?2730:1950,isMain?686:490,1);
  sprite.renderOrder=55;
  const target=isMain?mainDimensionObjects:intermediateDimensionObjects;
  sprite.visible=isMain?dimensionVisibility.main:dimensionVisibility.intermediate;
  group.add(sprite);
  target.push(sprite);
  return sprite;
}

function addDimensionLabel(zone,text,u,y,v){
  const sprite=createDimensionSprite(text,false);
  sprite.position.copy(zoneWorldPoint(zone,u,y,v));
  return sprite;
}

function addWorldDimensionLabel(text,x,y,z,mainDimension){
  const sprite=createDimensionSprite(text,mainDimension);
  sprite.position.set(x,y,z);
  return sprite;
}

function addZoneWidthDimension(zone,rowIndex){
  const dimY=-H/2-155-rowIndex*105;
  const outsideV=zone.outerFaceV-zone.inward*80;
  const half=zone.width/2;
  const arrow=42;
  const wing=26;
  addDimensionSegments(zone,[
    [-half,zone.bottomY,outsideV,-half,dimY-24,outsideV],
    [half,zone.bottomY,outsideV,half,dimY-24,outsideV],
    [-half,dimY,outsideV,half,dimY,outsideV],
    [-half,dimY,outsideV,-half+arrow,dimY+wing,outsideV],
    [-half,dimY,outsideV,-half+arrow,dimY-wing,outsideV],
    [half,dimY,outsideV,half-arrow,dimY+wing,outsideV],
    [half,dimY,outsideV,half-arrow,dimY-wing,outsideV]
  ]);
  addDimensionLabel(zone,Math.round(zone.width)+' mm',0,dimY,outsideV);
}

function addZoneHeightDimension(zone,rowIndex){
  const outsideV=zone.outerFaceV-zone.inward*92;
  const dimU=-zone.width/2-120-rowIndex*72;
  const arrow=42;
  const wing=26;
  addDimensionSegments(zone,[
    [-zone.width/2,zone.bottomY,outsideV,dimU+24,zone.bottomY,outsideV],
    [-zone.width/2,zone.topY,outsideV,dimU+24,zone.topY,outsideV],
    [dimU,zone.bottomY,outsideV,dimU,zone.topY,outsideV],
    [dimU,zone.bottomY,outsideV,dimU-wing,zone.bottomY+arrow,outsideV],
    [dimU,zone.bottomY,outsideV,dimU+wing,zone.bottomY+arrow,outsideV],
    [dimU,zone.topY,outsideV,dimU-wing,zone.topY-arrow,outsideV],
    [dimU,zone.topY,outsideV,dimU+wing,zone.topY-arrow,outsideV]
  ]);
  addDimensionLabel(zone,Math.round(zone.height)+' mm',dimU,(zone.bottomY+zone.topY)/2,outsideV);
}

function addSystemDimensions(beamBottomY){
  const arrow=55;
  const wing=32;

  const backZ=D/2+310;
  const widthY=-H/2-470;
  addWorldDimensionSegments([
    [-W/2,-H/2,backZ,-W/2,widthY-28,backZ],
    [W/2,-H/2,backZ,W/2,widthY-28,backZ],
    [-W/2,widthY,backZ,W/2,widthY,backZ],
    [-W/2,widthY,backZ,-W/2+arrow,widthY+wing,backZ],
    [-W/2,widthY,backZ,-W/2+arrow,widthY-wing,backZ],
    [W/2,widthY,backZ,W/2-arrow,widthY+wing,backZ],
    [W/2,widthY,backZ,W/2-arrow,widthY-wing,backZ]
  ],true);
  addWorldDimensionLabel(Math.round(W)+' mm',0,widthY,backZ,true);

  const heightX=-W/2-360;
  const heightZ=D/2+210;
  addWorldDimensionSegments([
    [-W/2,-H/2,heightZ,heightX-28,-H/2,heightZ],
    [-W/2,H/2,heightZ,heightX-28,H/2,heightZ],
    [heightX,-H/2,heightZ,heightX,H/2,heightZ],
    [heightX,-H/2,heightZ,heightX-wing,-H/2+arrow,heightZ],
    [heightX,-H/2,heightZ,heightX+wing,-H/2+arrow,heightZ],
    [heightX,H/2,heightZ,heightX-wing,H/2-arrow,heightZ],
    [heightX,H/2,heightZ,heightX+wing,H/2-arrow,heightZ]
  ],true);
  addWorldDimensionLabel(Math.round(H)+' mm',heightX,0,heightZ,true);

  const depthX=-W/2-360;
  const depthY=H/2+250;
  addWorldDimensionSegments([
    [depthX,depthY,-D/2,depthX,depthY,D/2],
    [depthX,depthY,-D/2,depthX,depthY-28,-D/2],
    [depthX,depthY,D/2,depthX,depthY-28,D/2],
    [depthX,depthY,-D/2,depthX,depthY,-D/2+arrow],
    [depthX,depthY,-D/2,depthX,depthY-wing,-D/2+arrow],
    [depthX,depthY,D/2,depthX,depthY,D/2-arrow],
    [depthX,depthY,D/2,depthX,depthY-wing,D/2-arrow]
  ],true);
  addWorldDimensionLabel(Math.round(D)+' mm',depthX,depthY,0,true);

  const localX=-W/2-185;
  const localZ=-D/2-190;
  addWorldDimensionSegments([
    [-W/2,-H/2,localZ,localX-20,-H/2,localZ],
    [-W/2,beamBottomY,localZ,localX-20,beamBottomY,localZ],
    [localX,-H/2,localZ,localX,beamBottomY,localZ],
    [localX,-H/2,localZ,localX-wing,-H/2+arrow,localZ],
    [localX,-H/2,localZ,localX+wing,-H/2+arrow,localZ],
    [localX,beamBottomY,localZ,localX-wing,beamBottomY-arrow,localZ],
    [localX,beamBottomY,localZ,localX+wing,beamBottomY-arrow,localZ]
  ]);
  addWorldDimensionLabel(Math.round(beamBottomY+H/2)+' mm',localX,(-H/2+beamBottomY)/2,localZ,false);
}

function setDimensionVisibility(visibility){
  if(visibility&&typeof visibility==='object'){
    dimensionVisibility={
      intermediate:visibility.intermediate!==false,
      main:visibility.main!==false
    };
  }
  intermediateDimensionObjects.forEach(object=>{object.visible=dimensionVisibility.intermediate;});
  mainDimensionObjects.forEach(object=>{object.visible=dimensionVisibility.main;});
}

function addDividerProfileMesh(base,profile,opts){
  const depth=Math.max(30,Number(profile.depth)||100);
  const face=Math.max(40,Number(profile.width)||100);
  const axisX=base.axis==='x';
  const vertical=profile.orientation!=='horizontal';
  const span=Math.max(80,Number(opts.span)||base.width);
  const height=vertical?Math.max(200,H-beamSection.vertical):face;
  const geo=vertical
    ?new THREE.BoxGeometry(axisX?face:depth,height,axisX?depth:face)
    :new THREE.BoxGeometry(axisX?span:depth,face,axisX?depth:span);
  const mat=new THREE.MeshStandardMaterial({color:0x0ea5e9,roughness:.46,metalness:.26});
  const mesh=new THREE.Mesh(geo,mat);
  const v=productDepthCenter(base,depth,0);
  const centerY=vertical?(-H/2+height/2):Number(opts.y);
  const point=zoneWorldPoint(base,Number(opts.u)||0,centerY,v);
  mesh.position.copy(point);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  mesh.userData={
    name:profile.label||'Ara Profil',
    isDividerProfile:true,
    profileId:profile.id,
    facadeId:base.id,
    toolboxKey:'profile:'+base.id+':'+profile.id,
    profile:{...profile,facadeId:base.id}
  };
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x082f49,transparent:true,opacity:.72})));
  mesh.visible=false;
  group.add(mesh);
  parts.push(mesh);
  interactiveObjects.push(mesh);
  return mesh;
}

function createSubZone(base,startU,endU,bottomY,topY,index,total,leftBoundaryId,rightBoundaryId,bottomBoundaryId,topBoundaryId,leftBoundaryWidth,rightBoundaryWidth){
  const centerU=(startU+endU)/2;
  const width=Math.max(0,endU-startU);
  const height=Math.max(0,topY-bottomY);
  const noProfiles=leftBoundaryId==='START'&&rightBoundaryId==='END'&&bottomBoundaryId==='BOTTOM'&&topBoundaryId==='TOP';
  const id=noProfiles?base.id:base.id+'|'+leftBoundaryId+'-'+rightBoundaryId+'|'+bottomBoundaryId+'-'+topBoundaryId;
  const cx=base.axis==='x'?base.cx+centerU:base.cx;
  const cz=base.axis==='x'?base.cz:base.cz+centerU;
  return {
    ...base,
    id,
    facadeId:base.id,
    label:noProfiles?base.label:base.label+' · Alan '+(index+1),
    cx,
    cz,
    width,
    height,
    bottomY,
    topY,
    baseWidth:base.width,
    baseHeight:base.height,
    startRatio:(startU+base.width/2)/base.width,
    endRatio:(endU+base.width/2)/base.width,
    bottomRatio:(bottomY-base.bottomY)/base.height,
    topRatio:(topY-base.bottomY)/base.height,
    leftBoundaryId,
    rightBoundaryId,
    leftBoundaryWidth:Math.max(0,Number(leftBoundaryWidth)||0),
    rightBoundaryWidth:Math.max(0,Number(rightBoundaryWidth)||0),
    bottomBoundaryId,
    topBoundaryId,
    areaIndex:index,
    areaCount:total
  };
}

function splitFacadeZones(base){
  const raw=Array.isArray(facadeProfiles[base.id])?facadeProfiles[base.id]:[];
  const profiles=raw.map(profile=>({
    ...profile,
    orientation:profile.orientation==='horizontal'?'horizontal':'vertical',
    width:Math.max(40,Number(profile.width)||100),
    depth:Math.max(30,Number(profile.depth)||100),
    positionRatio:Math.max(.01,Math.min(.99,Number(profile.positionRatio)||.5)),
    positionYRatio:Math.max(.01,Math.min(.99,Number(profile.positionYRatio)||.5))
  }));
  const verticals=profiles.filter(profile=>profile.orientation==='vertical').sort((a,b)=>a.positionRatio-b.positionRatio);
  const horizontals=profiles.filter(profile=>profile.orientation==='horizontal');
  const boundaryWidthMap=Object.fromEntries(verticals.map(profile=>[profile.id,profile.width]));
  boundaryWidthMap.START=Math.max(0,Number(base.startBoundaryWidth)||0);
  boundaryWidthMap.END=Math.max(0,Number(base.endBoundaryWidth)||0);
  const strips=[];
  let cursor=-base.width/2;
  let leftId='START';

  verticals.forEach(profile=>{
    const center=-base.width/2+profile.positionRatio*base.width;
    const left=Math.max(cursor,center-profile.width/2);
    const right=Math.min(base.width/2,center+profile.width/2);
    strips.push({start:cursor,end:left,leftId,rightId:profile.id});
    addDividerProfileMesh(base,profile,{u:center,span:base.width,y:(base.bottomY+base.topY)/2});
    cursor=right;
    leftId=profile.id;
  });
  strips.push({start:cursor,end:base.width/2,leftId,rightId:'END'});

  const cells=[];
  strips.filter(strip=>strip.end-strip.start>=80).forEach(strip=>{
    const stripStartRatio=(strip.start+base.width/2)/base.width;
    const stripEndRatio=(strip.end+base.width/2)/base.width;
    const scoped=horizontals
      .filter(profile=>{
        const start=Number.isFinite(Number(profile.scopeStartRatio))?Number(profile.scopeStartRatio):0;
        const end=Number.isFinite(Number(profile.scopeEndRatio))?Number(profile.scopeEndRatio):1;
        return stripStartRatio>=start-.0001&&stripEndRatio<=end+.0001;
      })
      .sort((a,b)=>a.positionYRatio-b.positionYRatio);
    let bottom=base.bottomY;
    let bottomId='BOTTOM';
    scoped.forEach(profile=>{
      const centerY=base.bottomY+profile.positionYRatio*base.height;
      const profileBottom=Math.max(bottom,centerY-profile.width/2);
      const profileTop=Math.min(base.topY,centerY+profile.width/2);
      cells.push({startU:strip.start,endU:strip.end,bottomY:bottom,topY:profileBottom,leftId:strip.leftId,rightId:strip.rightId,bottomId,topId:profile.id});
      addDividerProfileMesh(base,profile,{u:(strip.start+strip.end)/2,span:strip.end-strip.start,y:centerY});
      bottom=profileTop;
      bottomId=profile.id;
    });
    cells.push({startU:strip.start,endU:strip.end,bottomY:bottom,topY:base.topY,leftId:strip.leftId,rightId:strip.rightId,bottomId,topId:'TOP'});
  });

  const valid=cells.filter(cell=>cell.endU-cell.startU>=80&&cell.topY-cell.bottomY>=80);
  return valid.map((cell,index)=>createSubZone(
    base,cell.startU,cell.endU,cell.bottomY,cell.topY,index,valid.length,
    cell.leftId,cell.rightId,cell.bottomId,cell.topId,
    boundaryWidthMap[cell.leftId]||0,boundaryWidthMap[cell.rightId]||0
  ));
}

function toolboxZoneKey(zone){
  return 'zone:'+zone.id;
}

function toolboxProfileKey(profile){
  return 'profile:'+profile.facadeId+':'+profile.id;
}

function isToolboxZoneEligible(zone,occupied){
  if(toolboxSelectionMode==='multi-product')return true;
  if(toolboxSelectionMode==='multi-delete'||toolboxSelectionMode==='fit-products')return occupied;
  if(toolboxSelectionMode==='multi-profile-add')return !occupied&&zone.width>=600&&zone.height>=600;
  return false;
}

function isToolboxProfileEligible(profile){
  return toolboxSelectionMode==='multi-profile-delete'&&profile&&profile.id;
}

function refreshToolboxSelectionVisuals(){
  zonePickers.forEach(mesh=>{
    const key=toolboxZoneKey(mesh.userData.zone);
    const eligible=isToolboxZoneEligible(mesh.userData.zone,mesh.userData.occupied);
    const selected=toolboxSelectionKeys.has(key);
    mesh.userData.toolboxEligible=eligible;
    mesh.userData.toolboxSelected=selected;
    if(toolboxSelectionMode){
      mesh.material.color.setHex(selected?0x16a34a:(eligible?0x38bdf8:0x64748b));
      mesh.material.opacity=selected?.30:(eligible?.13:.002);
    }else{
      setZoneHighlight(mesh,false);
    }
  });
  interactiveObjects.forEach(obj=>{
    if(!obj.userData||!obj.userData.isDividerProfile||!obj.material)return;
    const profile=obj.userData.profile;
    const key=toolboxProfileKey(profile);
    const eligible=isToolboxProfileEligible(profile);
    const selected=toolboxSelectionKeys.has(key);
    obj.userData.toolboxEligible=eligible;
    obj.userData.toolboxSelected=selected;
    if(toolboxSelectionMode){
      obj.material.color.setHex(selected?0x16a34a:(eligible?0x38bdf8:0x334155));
      if(obj.material.emissive)obj.material.emissive.setHex(selected?0x14532d:(eligible?0x0c4a6e:0x000000));
      obj.material.transparent=true;
      obj.material.opacity=eligible?1:.22;
    }else{
      obj.material.color.setHex(0x0ea5e9);
      if(obj.material.emissive)obj.material.emissive.setHex(0x000000);
      obj.material.opacity=1;
    }
  });
  const hint=document.getElementById('viewerHint');
  if(hint){
    hint.textContent=toolboxSelectionMode
      ? 'Çoklu seçim: uygun hedeflere tıklayın. Enter veya sağ tıkla tamamlayın, Esc ile iptal edin.'
      : 'Dikmeler arasındaki boşluğa tıklayın. Bir ürün panelini açıp kapatmak için çift tıklayın.';
  }
}

function addZonePicker(zone,occupied){
  const axisX=zone.axis==='x';
  const geo=new THREE.BoxGeometry(axisX?zone.width:64,zone.height,axisX?64:zone.width);
  const selected=zone.id===selectedZoneId;
  const mat=new THREE.MeshBasicMaterial({
    color:selected?0xf59e0b:(occupied?0x22c55e:0x38bdf8),
    transparent:true,
    opacity:selected?.18:(occupied?.025:.018),
    depthWrite:false,
    side:THREE.DoubleSide
  });
  const mesh=new THREE.Mesh(geo,mat);
  mesh.position.set(zone.cx,(zone.bottomY+zone.topY)/2,zone.cz);
  mesh.userData={isZone:true,zone,occupied,selected};
  group.add(mesh);
  zonePickers.push(mesh);
  interactiveObjects.push(mesh);
  if(selected)selectedZonePicker=mesh;
}

function setZoneHighlight(mesh,active){
  if(!mesh||!mesh.material)return;
  if(toolboxSelectionMode){
    const eligible=Boolean(mesh.userData.toolboxEligible);
    const selected=Boolean(mesh.userData.toolboxSelected);
    mesh.material.opacity=selected?.30:(eligible?(active?.22:.13):.002);
    mesh.material.color.setHex(selected?0x16a34a:(eligible?0x38bdf8:0x64748b));
    return;
  }
  const selected=Boolean(mesh.userData.selected);
  if(selected){
    mesh.material.opacity=.18;
    mesh.material.color.setHex(0xf59e0b);
    return;
  }
  mesh.material.opacity=active?(mesh.userData.occupied?.20:.16):(mesh.userData.occupied?.025:.018);
  mesh.material.color.setHex(mesh.userData.occupied?0x22c55e:0x38bdf8);
}

function buildFacadeProducts(p,beamBottomY){
  const bottomY=-H/2+24;
  const topY=beamBottomY-18;
  const height=Math.max(400,topY-bottomY);
  const frontStart=-W/2+p[0].x;
  const frontEnd=W/2-p[1].x;
  const backStart=-W/2+p[2].x;
  const backEnd=W/2-p[3].x;
  const leftStart=-D/2+p[0].z;
  const leftEnd=D/2-p[2].z;
  const rightStart=-D/2+p[1].z;
  const rightEnd=D/2-p[3].z;
  const frontFaceDepth=Math.max(p[0].z,p[1].z);
  const backFaceDepth=Math.max(p[2].z,p[3].z);
  const leftFaceDepth=Math.max(p[0].x,p[2].x);
  const rightFaceDepth=Math.max(p[1].x,p[3].x);
  const facades=[
    {id:'front',label:'Ön Cephe',axis:'x',cx:(frontStart+frontEnd)/2,cz:-D/2+frontFaceDepth/2,width:frontEnd-frontStart,height,bottomY,topY,beamBottomY,inward:1,outerFaceV:-frontFaceDepth/2,startBoundaryWidth:p[0].x,endBoundaryWidth:p[1].x},
    {id:'back',label:'Arka Cephe',axis:'x',cx:(backStart+backEnd)/2,cz:D/2-backFaceDepth/2,width:backEnd-backStart,height,bottomY,topY,beamBottomY,inward:-1,outerFaceV:backFaceDepth/2,startBoundaryWidth:p[2].x,endBoundaryWidth:p[3].x},
    {id:'left',label:'Sol Cephe',axis:'z',cx:-W/2+leftFaceDepth/2,cz:(leftStart+leftEnd)/2,width:leftEnd-leftStart,height,bottomY,topY,beamBottomY,inward:1,outerFaceV:-leftFaceDepth/2,startBoundaryWidth:p[0].z,endBoundaryWidth:p[2].z},
    {id:'right',label:'Sağ Cephe',axis:'z',cx:W/2-rightFaceDepth/2,cz:(rightStart+rightEnd)/2,width:rightEnd-rightStart,height,bottomY,topY,beamBottomY,inward:-1,outerFaceV:rightFaceDepth/2,startBoundaryWidth:p[1].z,endBoundaryWidth:p[3].z}
  ];

  facades.forEach(facade=>{
    const zones=splitFacadeZones(facade);
    zones.forEach((zone,index)=>{
      const placement=placements[zone.id];
      const zipPlacement=zipPlacements[zone.id];
      if(placement){
        try{
          if(placement.type==='guillotine')buildGuillotineProduct(zone,placement);
          else if(placement.type==='fixed')buildFixedJoineryProduct(zone,placement);
          else if(placement.type==='door')buildDoorProduct(zone,placement);
          else buildSlidingProduct(zone,placement);
        }catch(error){
          console.error('Primary product build failed',zone.id,placement.type,error);
        }
      }
      if(zipPlacement){
        const effectiveZipPlacement={...zipPlacement,autoFrontOnly:Boolean(placement)&&String(zipPlacement.placementLocation||'BETWEEN POSTS')==='BETWEEN POSTS'};
        try{buildZipScreenProduct(zone,effectiveZipPlacement);}
        catch(error){console.error('Zip overlay build failed',zone.id,error);buildZipFallbackProduct(zone,effectiveZipPlacement);}
      }
      addZonePicker(zone,Boolean(placement||zipPlacement));
      if(zone.bottomBoundaryId==='BOTTOM')addZoneWidthDimension(zone,index%3);
      if(zone.bottomBoundaryId!=='BOTTOM'||zone.topBoundaryId!=='TOP')addZoneHeightDimension(zone,index%3);
    });
  });
  addSystemDimensions(beamBottomY);
  setDimensionVisibility(dimensionVisibility);
}

function buildModel(showAll){
  while(group.children.length)group.remove(group.children[0]);
  parts=[];
  intermediateDimensionObjects=[];
  mainDimensionObjects=[];
  interactiveObjects=[];
  zonePickers=[];
  hoveredZone=null;
  selectedZonePicker=null;
  const p=[postDims(0),postDims(1),postDims(2),postDims(3)];
  const magenta=0xff00ff,blue=0x2563eb,orange=0xff8c00,amber=0xffb347,grass=0x7cfc00;
  const beamVertical=beamSection.vertical;
  const frontBackBeamThickness=beamSection.thickness;
  const sideBeamThickness=IS_BIO_RISE?50:beamSection.thickness;

  addBox({name:'Front Left Post',px:-W/2+p[0].x/2,py:0,pz:-D/2+p[0].z/2,sx:p[0].x,sy:H,sz:p[0].z,idx:0},magenta,true);
  addBox({name:'Front Right Post',px:W/2-p[1].x/2,py:0,pz:-D/2+p[1].z/2,sx:p[1].x,sy:H,sz:p[1].z,idx:1},magenta,true);
  addBox({name:'Back Left Post',px:-W/2+p[2].x/2,py:0,pz:D/2-p[2].z/2,sx:p[2].x,sy:H,sz:p[2].z,idx:2},magenta,true);
  addBox({name:'Back Right Post',px:W/2-p[3].x/2,py:0,pz:D/2-p[3].z/2,sx:p[3].x,sy:H,sz:p[3].z,idx:3},magenta,true);

  const beamCenterY=H/2-beamVertical/2;
  const beamBottomY=beamCenterY-beamVertical/2;
  addBox({name:'Front Beam',px:((-W/2+p[0].x)+(W/2-p[1].x))/2,py:beamCenterY,pz:-D/2+frontBackBeamThickness/2,sx:W-p[0].x-p[1].x,sy:beamVertical,sz:frontBackBeamThickness,isBeam:true,userData:{beamKind:'front-back'}},blue,false);
  addBox({name:'Back Beam',px:((-W/2+p[2].x)+(W/2-p[3].x))/2,py:beamCenterY,pz:D/2-frontBackBeamThickness/2,sx:W-p[2].x-p[3].x,sy:beamVertical,sz:frontBackBeamThickness,isBeam:true,userData:{beamKind:'front-back'}},blue,false);
  addBox({name:'Left Beam',px:-W/2+sideBeamThickness/2,py:beamCenterY,pz:((-D/2+p[0].z)+(D/2-p[2].z))/2,sx:sideBeamThickness,sy:beamVertical,sz:D-p[0].z-p[2].z,isBeam:true,userData:{beamKind:'side'}},blue,false);
  addBox({name:'Right Beam',px:W/2-sideBeamThickness/2,py:beamCenterY,pz:((-D/2+p[1].z)+(D/2-p[3].z))/2,sx:sideBeamThickness,sy:beamVertical,sz:D-p[1].z-p[3].z,isBeam:true,userData:{beamKind:'side'}},blue,false);

  let railTop=151;
  let railBottom=30;
  let railOffsetFrom151=-92;

  const bioSideGutterWidth=98;
  const bioGutterBeamClearance=2;
  const bioLeftBeamInnerX=-W/2+sideBeamThickness;
  const bioRightBeamInnerX=W/2-sideBeamThickness;
  const bioLeftGutterOuterX=bioLeftBeamInnerX+bioGutterBeamClearance;
  const bioRightGutterOuterX=bioRightBeamInnerX-bioGutterBeamClearance;
  const bioLeftGutterInnerX=bioLeftGutterOuterX+bioSideGutterWidth;
  const bioRightGutterInnerX=bioRightGutterOuterX-bioSideGutterWidth;

  if(IS_BIO_RISE){
    const sideGutterWidth=bioSideGutterWidth;
    const sideGutterInnerRun=62;
    const sideGutterLength=Math.max(200,D-100);
    const leftG=createExtrudedGutter('Left Gutter',sideGutterWidth,sideGutterInnerRun,sideGutterLength,orange,'right',true);
    setMeshByBounds(leftG,{minX:bioLeftGutterOuterX,centerZ:0,bottomY:beamBottomY});
    const rightG=createExtrudedGutter('Right Gutter',sideGutterWidth,sideGutterInnerRun,sideGutterLength,orange,'left',true);
    setMeshByBounds(rightG,{maxX:bioRightGutterOuterX,centerZ:0,bottomY:beamBottomY});
  }else{
    const gutterFrameWidth=Math.max(200,W-204);
    const gutterFrameDepth=Math.max(200,D-204);
    const gutterHalfWidth=gutterFrameWidth/2;
    const gutterHalfDepth=gutterFrameDepth/2;
    const frontG=createExtrudedGutter('Front Gutter',210,172,gutterFrameWidth,orange,'back');
    setMeshByBounds(frontG,{centerX:0,minZ:-gutterHalfDepth,bottomY:beamBottomY});
    const backG=createExtrudedGutter('Back Gutter',210,172,gutterFrameWidth,orange,'front');
    setMeshByBounds(backG,{centerX:0,maxZ:gutterHalfDepth,bottomY:beamBottomY});
    const leftG=createExtrudedGutter('Left Gutter',210,172,gutterFrameDepth,orange,'right');
    setMeshByBounds(leftG,{minX:-gutterHalfWidth,centerZ:0,bottomY:beamBottomY});
    const rightG=createExtrudedGutter('Right Gutter',210,172,gutterFrameDepth,orange,'left');
    setMeshByBounds(rightG,{maxX:gutterHalfWidth,centerZ:0,bottomY:beamBottomY});

    const railBottomY=beamBottomY+4;
    const railHeight=128;
    const railSide=50;
    const railCenterZ=((-RD/2+railTop+RD/2-railBottom)/2)+railOffsetFrom151;
    addBox({name:'Rail Top',px:0,py:railBottomY+railHeight/2,pz:(-RD/2+railTop/2)+railOffsetFrom151,sx:RW,sy:railHeight,sz:railTop},amber,false);
    addBox({name:'Rail Bottom',px:0,py:railBottomY+railHeight/2,pz:(RD/2-railBottom/2)+railOffsetFrom151,sx:RW,sy:railHeight,sz:railBottom},amber,false);
    addBox({name:'Rail Left',px:-RW/2+railSide/2,py:railBottomY+railHeight/2,pz:railCenterZ,sx:railSide,sy:railHeight,sz:RD-railTop-railBottom},amber,false);
    addBox({name:'Rail Right',px:RW/2-railSide/2,py:railBottomY+railHeight/2,pz:railCenterZ,sx:railSide,sy:railHeight,sz:RD-railTop-railBottom},amber,false);
  }

  const lamelBottomY=beamBottomY+61;
  const bioRiseInnerWidth=Math.max(200,bioRightGutterInnerX-bioLeftGutterInnerX);
  const lamelLength=IS_BIO_RISE?bioRiseInnerWidth:W-385;
  const lamelOpenAngle=-80;
  const lamelCount=Math.max(0,Math.floor(LC||0));
  const lamelNarrowBy=IS_BIO_RISE?16:0;

  if(IS_BIO_RISE){
    const rearFirstPanelMaxZ=D/2-216;
    const bioPanelSpacing=200;
    const bioPanelDepth=lamelProfileSpan(lamelNarrowBy);
    const frontRoofInnerZ=-D/2+frontBackBeamThickness;
    const backRoofInnerZ=D/2-frontBackBeamThickness;
    const frontMovingPanelMaxZ=rearFirstPanelMaxZ-Math.max(0,lamelCount-1)*bioPanelSpacing;
    const frontMovingPanelMinZ=frontMovingPanelMaxZ-bioPanelDepth;
    const frontClosureGap=Math.max(0,frontMovingPanelMinZ-frontRoofInnerZ);
    const backClosureGap=Math.max(0,backRoofInnerZ-rearFirstPanelMaxZ);
    const closureClearance=2;

    if(frontClosureGap>closureClearance+8){
      const frontClosure=createFixedClosureLamel('Bio-Rise Front Fixed Closure',lamelLength,blue,frontClosureGap-closureClearance,lamelNarrowBy);
      setMeshByBounds(frontClosure,{centerX:0,minZ:frontRoofInnerZ+closureClearance/2,bottomY:lamelBottomY});
    }
    if(backClosureGap>closureClearance+8){
      const backClosure=createFixedClosureLamel('Bio-Rise Back Fixed Closure',lamelLength,blue,backClosureGap-closureClearance,lamelNarrowBy);
      setMeshByBounds(backClosure,{centerX:0,maxZ:backRoofInnerZ-closureClearance/2,bottomY:lamelBottomY});
    }

    if(lamellaOpenMode){
      for(let i=0;i<lamelCount;i++){
        const opened=createOpenedLamel('Lamella '+(i+1),lamelLength,grass,lamelOpenAngle,lamelNarrowBy);
        const rearStackMaxZ=rearFirstPanelMaxZ-(lamelCount-1-i)*bioPanelSpacing;
        setObjectByBounds(opened.pivot,{centerX:0,maxZ:rearStackMaxZ,bottomY:lamelBottomY});
      }
    }else{
      for(let i=0;i<lamelCount;i++){
        const lamel=createLamel('Lamella '+(i+1),lamelLength,grass,lamelNarrowBy);
        const panelMaxZ=rearFirstPanelMaxZ-(lamelCount-1-i)*bioPanelSpacing;
        setMeshByBounds(lamel,{centerX:0,maxZ:panelMaxZ,bottomY:lamelBottomY});
      }
    }
  }else{
    const lamelInsetFrom151=50;
    const lamelStartZ=(-RD/2+railTop+railOffsetFrom151)+lamelInsetFrom151;
    const lamelSpacing=216;
    const lamelOpenSpacing=65;
    if(lamellaOpenMode){
      const lamelRearMaxZ=(RD/2-railBottom+railOffsetFrom151)-50;
      for(let i=0;i<lamelCount;i++){
        const opened=createOpenedLamel('Lamella '+(i+1),lamelLength,grass,lamelOpenAngle,lamelNarrowBy);
        const rearStackMaxZ=lamelRearMaxZ-(lamelCount-1-i)*lamelOpenSpacing;
        setObjectByBounds(opened.pivot,{centerX:0,maxZ:rearStackMaxZ,bottomY:lamelBottomY});
      }
    }else{
      for(let i=0;i<lamelCount;i++){
        const lamel=createLamel('Lamella '+(i+1),lamelLength,grass,lamelNarrowBy);
        setMeshByBounds(lamel,{centerX:0,minZ:lamelStartZ+i*lamelSpacing,bottomY:lamelBottomY});
      }
    }
  }

  buildFacadeProducts(p,beamBottomY);
  refreshToolboxSelectionVisuals();

  if(showAll){
    parts.forEach(part=>part.visible=true);
  }else{
    window.replayAnimation();
  }
}

window.replayAnimation=function replayAnimation(){
  animStep=0;
  parts.forEach(part=>part.visible=false);
  if(timer)clearInterval(timer);
  timer=setInterval(()=>{
    if(animStep<parts.length){
      parts[animStep].visible=true;
      animStep++;
    }else{
      clearInterval(timer);
    }
  },120);
};

function updateMouse(event){
  mouse.x=event.clientX/innerWidth*2-1;
  mouse.y=-(event.clientY/innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
}

function pickInteractive(event){
  updateMouse(event);
  const hits=raycaster.intersectObjects(interactiveObjects.filter(obj=>obj.visible!==false),true);
  return hits.length?hits[0].object:null;
}

function pickVisiblePart(event){
  updateMouse(event);
  const hits=raycaster.intersectObjects(parts.filter(part=>part.visible),true);
  return hits.length?hits[0].object:null;
}

function zoneFromObject(obj){
  let current=obj;
  while(current){
    if(current.userData&&current.userData.isZone)return current.userData.zone;
    if(current.userData&&current.userData.zoneId){
      const picker=zonePickers.find(item=>item.userData.zone.id===current.userData.zoneId);
      return picker?picker.userData.zone:null;
    }
    current=current.parent;
  }
  return null;
}

function partFromObject(obj){
  let current=obj;
  while(current&&current!==group){
    if(current.userData&&(current.userData.isPost||current.userData.isBeam||current.userData.isProduct||current.userData.isDividerProfile))return current;
    current=current.parent;
  }
  return obj;
}

renderer.domElement.addEventListener('pointerdown',event=>{
  pointerStart={x:event.clientX,y:event.clientY};
});

renderer.domElement.addEventListener('pointermove',event=>{
  if(pointerStart&&Math.hypot(event.clientX-pointerStart.x,event.clientY-pointerStart.y)>6)return;
  const obj=pickInteractive(event);
  const zone=zoneFromObject(obj);
  const next=zone?zonePickers.find(item=>item.userData.zone.id===zone.id):null;
  const part=partFromObject(obj);
  const profilePointer=Boolean(part&&part.userData&&part.userData.isDividerProfile&&(!toolboxSelectionMode||part.userData.toolboxEligible));
  const postPointer=Boolean(part&&part.userData&&part.userData.isPost&&!toolboxSelectionMode);
  const zonePointer=Boolean(next&&(!toolboxSelectionMode||next.userData.toolboxEligible));
  const directPointer=profilePointer||postPointer;
  if(next===hoveredZone&&!directPointer)return;
  if(hoveredZone)setZoneHighlight(hoveredZone,false);
  hoveredZone=next||null;
  if(hoveredZone)setZoneHighlight(hoveredZone,true);
  renderer.domElement.style.cursor=(zonePointer||directPointer)?'pointer':'grab';
});

renderer.domElement.addEventListener('pointerleave',()=>{
  if(hoveredZone)setZoneHighlight(hoveredZone,false);
  hoveredZone=null;
  pointerStart=null;
});

renderer.domElement.addEventListener('pointerup',event=>{
  const start=pointerStart;
  pointerStart=null;
  if(!start||Math.hypot(event.clientX-start.x,event.clientY-start.y)>6)return;
  const interactive=pickInteractive(event);
  const interactivePart=partFromObject(interactive);
  const zone=zoneFromObject(interactive);
  const obj=partFromObject(pickVisiblePart(event));

  if(!toolboxSelectionMode&&interactivePart&&interactivePart.userData&&interactivePart.userData.isTogglePanel){
    return;
  }

  if(toolboxSelectionMode){
    if(zone){
      const picker=zonePickers.find(item=>item.userData.zone.id===zone.id)||null;
      if(picker&&isToolboxZoneEligible(zone,picker.userData.occupied)){
        parent.postMessage({
          source:'product-3d-viewer',
          type:'toggle-toolbox-selection',
          item:{kind:'zone',key:toolboxZoneKey(zone),zone:{...zone},occupied:Boolean(picker.userData.occupied)}
        },'*');
      }
      return;
    }
    if(obj&&obj.userData.isDividerProfile&&isToolboxProfileEligible(obj.userData.profile)){
      const profile={...obj.userData.profile};
      parent.postMessage({
        source:'product-3d-viewer',
        type:'toggle-toolbox-selection',
        item:{kind:'profile',key:toolboxProfileKey(profile),profile}
      },'*');
    }
    return;
  }

  if(zone){
    if(selectedZonePicker){
      selectedZonePicker.userData.selected=false;
      setZoneHighlight(selectedZonePicker,false);
    }
    selectedZoneId=zone.id;
    selectedZonePicker=zonePickers.find(item=>item.userData.zone.id===zone.id)||null;
    if(selectedZonePicker){
      selectedZonePicker.userData.selected=true;
      setZoneHighlight(selectedZonePicker,true);
    }
    parent.postMessage({source:'product-3d-viewer',type:'select-zone',zone:{...zone}},'*');
    return;
  }
  if(obj&&obj.userData.isDividerProfile){
    parent.postMessage({source:'product-3d-viewer',type:'select-divider-profile',profile:{...obj.userData.profile}},'*');
    return;
  }
  if(obj&&obj.userData.isPost){
    parent.postMessage({source:'product-3d-viewer',type:'select-post',postIndex:obj.userData.postIndex},'*');
  }
});

renderer.domElement.addEventListener('contextmenu',event=>{
  if(!toolboxSelectionMode)return;
  event.preventDefault();
  parent.postMessage({source:'product-3d-viewer',type:'complete-toolbox-selection'},'*');
});

window.addEventListener('keydown',event=>{
  if(!toolboxSelectionMode)return;
  if(event.key==='Escape'){
    event.preventDefault();
    parent.postMessage({source:'product-3d-viewer',type:'cancel-toolbox-selection'},'*');
  }else if(event.key==='Enter'){
    event.preventDefault();
    parent.postMessage({source:'product-3d-viewer',type:'complete-toolbox-selection'},'*');
  }
});

window.addEventListener('dblclick',event=>{
  const obj=partFromObject(pickVisiblePart(event));
  if(!obj)return;
  if(obj.userData.isTogglePanel&&obj.userData.zoneId){
    parent.postMessage({
      source:'product-3d-viewer',
      type:'toggle-panel-state',
      panelKey:obj.userData.panelKey||obj.userData.productKey||obj.userData.zoneId,
      productKey:obj.userData.productKey||obj.userData.panelKey||obj.userData.zoneId,
      zoneId:obj.userData.zoneId,
      open:!Boolean(obj.userData.panelOpen)
    },'*');
    return;
  }
  if(obj.userData.isBeam)editBeamSection();
});

window.addEventListener('message',event=>{
  if(!event.data||event.data.source!=='product-3d-parent')return;
  if(event.data.type==='replay-animation')window.replayAnimation();
  if(event.data.type==='set-dimension-visibility')setDimensionVisibility(event.data.visibility);
  if(event.data.type==='set-dimensions-visible')setDimensionVisibility({intermediate:Boolean(event.data.visible),main:Boolean(event.data.visible)});
  if(event.data.type==='set-toolbox-selection'){
    toolboxSelectionMode=event.data.mode||null;
    toolboxSelectionKeys=new Set(Array.isArray(event.data.keys)?event.data.keys:[]);
    refreshToolboxSelectionVisuals();
  }
  if(event.data.type==='reset-camera'){
    camera.position.set(W*.92,H*.82,D*1.08);
    controls.target.set(0,0,0);
    camera.zoom=1;
    camera.updateProjectionMatrix();
    controls.update();
    publishCameraState();
  }
});

window.captureFreedom3D=function(){
  if(timer)clearInterval(timer);
  parts.forEach(part=>part.visible=true);
  const savedPosition=camera.position.clone();
  const savedTarget=controls.target.clone();
  const savedZoom=camera.zoom;
  camera.position.set(W*.92,H*.82,D*1.08);
  controls.target.set(0,0,0);
  camera.zoom=1;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.render(scene,camera);
  const result={
    dataUrl:renderer.domElement.toDataURL('image/jpeg',.88),
    width:renderer.domElement.width,
    height:renderer.domElement.height
  };
  camera.position.copy(savedPosition);
  controls.target.copy(savedTarget);
  camera.zoom=savedZoom;
  camera.updateProjectionMatrix();
  controls.update();
  publishCameraState();
  return result;
};

window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
}

buildModel(true);
animate();
})();
</scr` + `ipt>
</body>
</html>`;
  }

  function bindEvents() {
    $(ids.productGroup).addEventListener('change', handleProductGroupChange);
    $(ids.freedomPanelCount).addEventListener('input', syncProjectionFromPanelCount);
    $(ids.freedomDepth).addEventListener('input', syncPanelCountFromProjection);
    [ids.freedomWidth, ids.freedomHeight].forEach((id) => $(id).addEventListener('input', () => setFreedomValidation('')));
    $(ids.freedomForm).addEventListener('submit', (event) => { event.preventDefault(); applyFreedomInputs(); });
    $(ids.positionEdit).addEventListener('click', openPositionDialog);
    $(ids.cancel).addEventListener('click', closePositionDialog);
    $(ids.replay).addEventListener('click', toggleProductsOpen);
    $(ids.clearProducts).addEventListener('click', clearProducts);
    $(ids.dialog).addEventListener('click', (event) => {
      if (event.target === $(ids.dialog)) closePositionDialog();
    });
    [ids.width, ids.depth, ids.height].forEach((id) => {
      $(id).addEventListener('input', updateDialogLamella);
    });
    $(ids.form).addEventListener('submit', (event) => {
      event.preventDefault();
      applyPositionForm();
    });
    $(ids.productType).addEventListener('change', () => switchProductType($(ids.productType).value));
    $(ids.productSeries).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productSubtype).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productDoorType).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productDoorTypeTrigger).addEventListener('click', openDoorTypePicker);
    $(ids.productDoorTypePickerClose).addEventListener('click', closeDoorTypePicker);
    $(ids.productDoorHinge).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorActiveLeaf).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorOpenDirection).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorHandleType).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorTopFixedHeight).addEventListener('input', () => {
      updateDoorTopFixedSummary();
      $(ids.productValidation).textContent = '';
    });
    $(ids.productPlacement).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productOpening).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productGlassThickness).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productGlassColor).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.bottomPanelMode).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productPanelType).addEventListener('change', () => {
      const panelType = $(ids.productPanelType).value;
      if (panelType === '1+1') $(ids.productPanels).value = '2';
      if (panelType === '1+2') $(ids.productPanels).value = '3';
      $(ids.productValidation).textContent = '';
    });
    $(ids.productPanels).addEventListener('input', () => {
      $(ids.productValidation).textContent = '';
    });
    $(ids.productFixedVerticalCount).addEventListener('input', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productFixedHorizontalCount).addEventListener('change', () => {
      if (!activeZone) return;
      const divisions = Math.max(1, Math.min(10, Math.round(Number($(ids.productFixedHorizontalCount).value) || 1)));
      const totalHeight = Math.max(120, activeZone.height - 5);
      const base = Math.floor(totalHeight / divisions);
      const segments = Array(divisions).fill(base);
      segments[segments.length - 1] += Math.round(totalHeight - base * divisions);
      $(ids.productFixedHorizontalHeights).value = segments.join(';');
      $(ids.productValidation).textContent = '';
    });
    $(ids.productFixedHorizontalHeights).addEventListener('input', () => { $(ids.productValidation).textContent = ''; });
    $(ids.slidingCollectionState).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.collectingDisplayState).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productCustomGlass).addEventListener('input', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productCancel).addEventListener('click', closeProductDialog);
    $(ids.productRemove).addEventListener('click', removeProduct);
    $(ids.productDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.productDialog)) closeProductDialog();
    });
    $(ids.productForm).addEventListener('submit', (event) => {
      event.preventDefault();
      applyProductForm();
    });

    $(ids.zoneActionAddProfile).addEventListener('click', openProfileDialog);
    $(ids.zoneActionEditDimension).addEventListener('click', openZoneDimensionDialog);
    $(ids.zoneActionPlaceProduct).addEventListener('click', openSelectedProduct);
    $(ids.zoneActionDeleteProduct).addEventListener('click', removeSelectedProduct);
    $(ids.zoneActionCancel).addEventListener('click', closeZoneActionDialog);
    $(ids.zoneActionDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.zoneActionDialog)) closeZoneActionDialog();
    });

    $(ids.toolboxIntermediateDimensions).addEventListener('change', (event) => setDimensionVisibility('intermediate', event.target.checked));
    $(ids.toolboxMainDimensions).addEventListener('change', (event) => setDimensionVisibility('main', event.target.checked));
    $(ids.toolboxResetCamera).addEventListener('click', resetViewerCamera);
    $(ids.panelMaster).addEventListener('change', (event) => {
      modelState.panelMasterOpen = Boolean(event.target.checked);
      updateToolbox();
      renderViewer();
    });
    $(ids.multiProduct).addEventListener('click', () => startToolboxSelection('multi-product'));
    $(ids.multiDelete).addEventListener('click', () => startToolboxSelection('multi-delete'));
    $(ids.multiProfileAdd).addEventListener('click', () => startToolboxSelection('multi-profile-add'));
    $(ids.multiProfileDelete).addEventListener('click', () => startToolboxSelection('multi-profile-delete'));
    $(ids.fitProducts).addEventListener('click', () => startToolboxSelection('fit-products'));
    $(ids.selectionDone).addEventListener('click', completeToolboxSelection);
    $(ids.selectionCancel).addEventListener('click', cancelToolboxSelection);
    window.addEventListener('keydown', (event) => {
      if (!toolboxSelectionMode) return;
      const tag = event.target && event.target.tagName ? String(event.target.tagName).toUpperCase() : '';
      const isField = ['INPUT', 'SELECT', 'TEXTAREA'].includes(tag);
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelToolboxSelection();
      } else if (event.key === 'Enter' && !isField) {
        event.preventDefault();
        completeToolboxSelection();
      }
    });

    $(ids.profileType).addEventListener('change', applyProfilePreset);
    $(ids.profileOrientation).addEventListener('change', () => { $(ids.profileValidation).textContent = ''; });
    $(ids.profileCancel).addEventListener('click', closeProfileDialog);
    $(ids.profileDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.profileDialog)) closeProfileDialog();
    });
    $(ids.profileForm).addEventListener('submit', (event) => {
      event.preventDefault();
      applyProfileForm();
    });


    $(ids.dividerProfileDelete).addEventListener('click', deleteSelectedDividerProfile);
    $(ids.dividerProfileCancel).addEventListener('click', closeDividerProfileDialog);
    $(ids.dividerProfileDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.dividerProfileDialog)) closeDividerProfileDialog();
    });

    $(ids.postChangeProfile).addEventListener('click', openPostProfileDialog);
    $(ids.postRotateProfile).addEventListener('click', rotateSelectedPost);
    $(ids.postActionCancel).addEventListener('click', closePostActionDialog);
    $(ids.postActionDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.postActionDialog)) closePostActionDialog();
    });
    $(ids.postProfileType).addEventListener('change', applyPostPreset);
    $(ids.postProfileCancel).addEventListener('click', closePostProfileDialog);
    $(ids.postProfileDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.postProfileDialog)) closePostProfileDialog();
    });
    $(ids.postProfileForm).addEventListener('submit', (event) => {
      event.preventDefault();
      applyPostProfileForm();
    });

    $(ids.zoneDimensionCancel).addEventListener('click', closeZoneDimensionDialog);
    $(ids.zoneDimensionDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.zoneDimensionDialog)) closeZoneDimensionDialog();
    });
    $(ids.zoneDimensionForm).addEventListener('submit', (event) => {
      event.preventDefault();
      applyZoneDimensionForm();
    });
  }

  updateProductInputUi();
  bindEvents();
  updateToolbox();
  renderViewer();
})();
