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
    productsOpen: true,
    productOpenStates: {},
    panelStates: {},
    panelMasterOpen: true,
    glassPreferences: { color: 'TRANSPARENT', customColor: '', thickness: '10 MM' },
    colorMode: 'default',
    systemColor: { code: 'RAL 9006', hex: '#7C7D7F', finish: 'MATTE' },
    panelColor: { code: 'RAL 6018', hex: '#397A36', finish: 'MATTE' }
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
    freedomWidthLimitNote: 'freedomWidthLimitNote',
    freedomDepth: 'freedomDepthInput',
    freedomDepthLimitNote: 'freedomDepthLimitNote',
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
    productFoldingPassageWrap: 'productFoldingPassageWrap',
    productFoldingPassage: 'productFoldingPassageInput',
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
    foldingCollectionSection: 'foldingCollectionSection',
    foldingCollectionState: 'foldingCollectionStateInput',
    foldingRuleNote: 'foldingRuleNote',
    collectingDisplaySection: 'collectingDisplaySection',
    collectingDisplayState: 'collectingDisplayStateInput',
    collectingDisplayDirection: 'collectingDisplayDirection',
    toolboxIntermediateDimensions: 'toolboxIntermediateDimensionsInput',
    toolboxMainDimensions: 'toolboxMainDimensionsInput',
    productOpenList: 'toolboxProductOpenList',
    productOpenEmpty: 'toolboxProductOpenEmpty',
    panelMaster: 'toolboxPanelMasterInput',
    toolboxResetCamera: 'toolboxResetCameraBtn',
    exportProductListPdf: 'exportProductListPdfBtn',
    mobileAr: 'mobileArBtn',
    mobileArStatus: 'mobileArStatus',
    quickTestStatus: 'quickTestStatus',
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
    productRemove: 'removeProductBtn',
    systemColorTrigger: 'systemColorTrigger',
    systemColorSwatch: 'systemColorSwatch',
    systemColorValue: 'systemColorValue',
    panelColorTrigger: 'panelColorTrigger',
    panelColorSwatch: 'panelColorSwatch',
    panelColorValue: 'panelColorValue',
    defaultColorMode: 'defaultColorModeBtn',
    ralColorMode: 'ralColorModeBtn',
    colorPickerDialog: 'colorPickerDialog',
    colorPickerTitle: 'colorPickerTitle',
    colorPickerDescription: 'colorPickerDescription',
    colorPickerClose: 'colorPickerCloseBtn',
    colorCatalogRising: 'colorCatalogRisingBtn',
    colorCatalogAll: 'colorCatalogAllBtn',
    colorSearch: 'colorSearchInput',
    colorResultCount: 'colorResultCount',
    colorOptionGrid: 'colorOptionGrid',
    colorFinishDialog: 'colorFinishDialog',
    colorFinishTitle: 'colorFinishTitle',
    colorFinishDescription: 'colorFinishDescription',
    colorFinishClose: 'colorFinishCloseBtn',
    colorFinishSummary: 'colorFinishSummary',
    colorFinishOptions: 'colorFinishOptions',
    productFabricWrap: 'productFabricWrap',
    productFabric: 'productFabricInput',
    productFabricTrigger: 'productFabricTrigger',
    productFabricValue: 'productFabricValue',
    productFabricPicker: 'productFabricPicker',
    productFabricPickerClose: 'productFabricPickerClose',
    productFabricCards: 'productFabricCards',
    pdfRequestFormMeta: 'pdfRequestFormMeta',
    pdfRequestFormFields: 'pdfRequestFormFields'
  };

  const $ = (id) => document.getElementById(id);
  const modelState = JSON.parse(JSON.stringify(defaults));
  let viewerCameraState = null;
  let selectedZone = null;
  let selectedZoneId = null;
  let dimensionVisibility = { intermediate: false, main: true };
  let profileSequence = 1;
  let selectedDividerProfile = null;
  let selectedPostIndex = null;
  let toolboxSelectionMode = null;
  let toolboxSelectionItems = new Map();
  let bulkProductZones = null;
  let bulkProfileZones = null;
  let activeProductSlot = 'primary';
  let activeColorTarget = 'system';
  let activeColorCatalog = 'rising';
  let pendingColorSelection = null;
  let pdfRequestState = { 'b-cube': null, 'bio-rise': null };

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

  const PDF_REQUEST_SCHEMAS = {
    'b-cube': {
      familyLabel: 'Bioclimatic',
      groupLabel: 'B-Cube',
      subGroupLabel: 'Freedom',
      productLabel: 'B-Cube Freedom',
      sections: [
        {
          title: 'Project Details',
          hint: 'Main request form dimensions',
          fields: [
            { id: 'width', label: 'Width', type: 'auto-mm', source: 'width' },
            { id: 'projection', label: 'Projection', type: 'auto-mm', source: 'depth' },
            { id: 'heightTopOfGutter', label: 'Height (Top of The Gutter)', type: 'auto-mm', source: 'height' },
            { id: 'systemQuantity', label: 'System Quantity', type: 'number' }
          ]
        },
        {
          title: 'Color Details',
          hint: 'Taken from current 3D color selections',
          fields: [
            { id: 'systemColor', label: 'System Color', type: 'auto-text', source: 'systemColor' },
            { id: 'systemColorFinish', label: 'Finish', type: 'auto-text', source: 'systemColorFinish' },
            { id: 'panelColor', label: 'Panel Color', type: 'auto-text', source: 'panelColor' },
            { id: 'panelColorFinish', label: 'Finish', type: 'auto-text', source: 'panelColorFinish' }
          ]
        },
        {
          title: 'Motor & Remote Control',
          fields: [
            { id: 'motor', label: 'Motor', type: 'select', options: ['T-Motion 350 (Somfy Rts) (120°)', 'T-Motion 300 (Somfy Rts) (90°)'] },
            { id: 'remoteControlSomfyRts', label: 'Remote Control', type: 'select', options: ['1 Channel', '2 Channels', '4 Channels', '16 Channels'], showWhen: { field: 'motor', values: ['T-Motion 350 (Somfy Rts) (120°)', 'T-Motion 300 (Somfy Rts) (90°)'] } }
          ]
        },
        {
          title: 'Panel Options',
          fields: [
            { id: 'panelIsolation', label: 'Panel Isolation', type: 'select', options: ['Yes', 'No'] }
          ]
        },
        {
          title: 'Lighting & Dimmers',
          fields: [
            { id: 'lightingSelections', label: 'Lighting', type: 'multi', options: ['Linear LED', 'Linear RGB', 'Linear Rgb+White', 'Other'], fullWidth: true },
            { id: 'lightingOther', label: 'Other Lighting', type: 'text', fullWidth: true, showWhen: { field: 'lightingSelections', values: ['Other'] } },
            { id: 'lightDimmerLinear', label: 'Light Dimmer (For Linear LED)', type: 'select', options: ['Yes', 'No'] }
          ]
        },
        {
          title: 'Sensors',
          fields: [
            { id: 'rainSensor', label: 'Rain Sensor', type: 'select', options: ['Yes', 'No'] },
            { id: 'vibrationSensor', label: 'Vibration Sensor', type: 'select', options: ['Yes', 'No'] },
            { id: 'windSensor', label: 'Wind Sensor', type: 'select', options: ['Yes', 'No'] },
            { id: 'windSunSensor', label: 'Wind & Sun Sensor', type: 'select', options: ['Yes', 'No'] }
          ]
        },
        {
          title: 'Heater & Sound & Packing',
          fields: [
            { id: 'heater2000Quantity', label: 'Heater 2000W 220V Quantity', type: 'number', unitAuto: 'pcs' },
            { id: 'heater3000Quantity', label: 'Heater 3000W 220V Quantity', type: 'number', unitAuto: 'pcs' },
            { id: 'soundSystemQuantity', label: 'Sound System Quantity', type: 'number', unitAuto: 'pcs' },
            { id: 'dimmerHeater', label: 'Dimmer Heater', type: 'select', options: ['Yes', 'No'] },
            { id: 'packagingType', label: 'Packaging Type', type: 'select', options: ['Wooden Box', 'Heavy-Duty Nylon'] },
            { id: 'loadingType', label: 'Loading', type: 'select', options: ['Truck', 'Container'] }
          ]
        }
      ]
    },
    'bio-rise': {
      familyLabel: 'Bioclimatic',
      groupLabel: 'Bio-Rise',
      subGroupLabel: 'None',
      productLabel: 'Bio-Rise',
      sections: [
        {
          title: 'Project Details',
          hint: 'Main request form dimensions',
          fields: [
            { id: 'width', label: 'Width', type: 'auto-mm', source: 'width' },
            { id: 'projection', label: 'Projection', type: 'auto-mm', source: 'depth' },
            { id: 'heightTopOfGutter', label: 'Height (Top of The Gutter)', type: 'auto-mm', source: 'height' },
            { id: 'systemQuantity', label: 'System Quantity', type: 'number' },
            { id: 'motorDirection', label: 'Motor Direction', type: 'select', options: ['Left', 'Right'] }
          ]
        },
        {
          title: 'Color Details',
          hint: 'Taken from current 3D color selections',
          fields: [
            { id: 'systemColor', label: 'System Color', type: 'auto-text', source: 'systemColor' },
            { id: 'systemColorFinish', label: 'Finish', type: 'auto-text', source: 'systemColorFinish' },
            { id: 'panelColor', label: 'Panel Color', type: 'auto-text', source: 'panelColor' },
            { id: 'panelColorFinish', label: 'Finish', type: 'auto-text', source: 'panelColorFinish' }
          ]
        },
        {
          title: 'Motor & Remote Control',
          fields: [
            { id: 'motor', label: 'Motor', type: 'select', options: ['Somfy RTS', 'Somfy IO', 'Rising Motor'] },
            { id: 'remoteControlSomfyRts', label: 'Remote Control', type: 'select', options: ['1 Channel', '2 Channels', '4 Channels', '16 Channels'], showWhen: { field: 'motor', values: ['Somfy RTS'] } },
            { id: 'remoteControlSomfyIo', label: 'Remote Control', type: 'select', options: ['1 Channel', '2 Channels', '4 Channels', '40 Channels'], showWhen: { field: 'motor', values: ['Somfy IO'] } },
            { id: 'remoteControlRising', label: 'Remote Control', type: 'select', options: ['1 Channel', '6 Channels'], showWhen: { field: 'motor', values: ['Rising Motor'] } }
          ]
        },
        {
          title: 'Panel Options',
          fields: [
            { id: 'panelIsolation', label: 'Panel Isolation', type: 'select', options: ['Yes', 'No'] }
          ]
        },
        {
          title: 'Lighting & Dimmers',
          fields: [
            { id: 'lightingSelections', label: 'Lighting', type: 'multi', options: ['Linear LED', 'Linear RGB', 'Linear Rgb+White', 'Spot LED', 'Other'], fullWidth: true },
            { id: 'lightingOther', label: 'Other Lighting', type: 'text', fullWidth: true, showWhen: { field: 'lightingSelections', values: ['Other'] } },
            { id: 'lightDimmerLinear', label: 'Light Dimmer (For Linear LED)', type: 'select', options: ['Yes', 'No'] },
            { id: 'lightDimmerSpot', label: 'Light Dimmer (For Spot LED)', type: 'select', options: ['Yes', 'No'], showWhen: { field: 'lightingSelections', values: ['Spot LED'] } }
          ]
        },
        {
          title: 'Sensors',
          fields: [
            { id: 'rainSensor', label: 'Rain Sensor', type: 'select', options: ['Yes', 'No'] },
            { id: 'vibrationSensor', label: 'Vibration Sensor', type: 'select', options: ['Yes', 'No'] },
            { id: 'windSensor', label: 'Wind Sensor', type: 'select', options: ['Yes', 'No'] },
            { id: 'windSunSensor', label: 'Wind & Sun Sensor', type: 'select', options: ['Yes', 'No'] }
          ]
        },
        {
          title: 'Heater & Sound & Packing',
          fields: [
            { id: 'heater2000Quantity', label: 'Heater 2000W 220V Quantity', type: 'number', unitAuto: 'pcs' },
            { id: 'heater3000Quantity', label: 'Heater 3000W 220V Quantity', type: 'number', unitAuto: 'pcs' },
            { id: 'soundSystemQuantity', label: 'Sound System Quantity', type: 'number', unitAuto: 'pcs' },
            { id: 'dimmerHeater', label: 'Dimmer Heater', type: 'select', options: ['Yes', 'No'] },
            { id: 'packagingType', label: 'Packaging Type', type: 'select', options: ['Wooden Box', 'Heavy-Duty Nylon'] },
            { id: 'loadingType', label: 'Loading', type: 'select', options: ['Truck', 'Container'] }
          ]
        }
      ]
    }
  };

  function requestSchemaForGroup(group = modelState.productGroup) {
    return PDF_REQUEST_SCHEMAS[group] || PDF_REQUEST_SCHEMAS['b-cube'];
  }

  function createPdfRequestState(group = modelState.productGroup) {
    const schema = requestSchemaForGroup(group);
    const next = {};
    (schema.sections || []).forEach((section) => {
      (section.fields || []).forEach((field) => {
        if (field.type === 'multi') next[field.id] = Array.isArray(field.default) ? [...field.default] : [];
        else next[field.id] = field.default != null ? field.default : '';
      });
    });
    return next;
  }

  function ensurePdfRequestState(group = modelState.productGroup) {
    const key = group === 'bio-rise' ? 'bio-rise' : 'b-cube';
    if (!pdfRequestState[key]) pdfRequestState[key] = createPdfRequestState(key);
    return pdfRequestState[key];
  }

  function currentPdfRequestState(group = modelState.productGroup) {
    return ensurePdfRequestState(group);
  }

  function isPdfRequestFieldVisible(field, values) {
    if (!field || !field.showWhen) return true;
    const current = values ? values[field.showWhen.field] : null;
    const allowed = Array.isArray(field.showWhen.values) ? field.showWhen.values.map(String) : [];
    if (Array.isArray(current)) return current.map(String).some((item) => allowed.includes(item));
    return allowed.includes(String(current == null ? '' : current));
  }

  function pdfRequestAutoValue(field, model = readModel()) {
    if (!field) return '';
    switch (field.source) {
      case 'width': return Number(model.width) || 0;
      case 'depth': return Number(model.depth) || 0;
      case 'height': return Number(model.height) || 0;
      case 'systemColor': return model.colorMode === 'ral' ? (model.systemColor && model.systemColor.code) || '—' : 'Default / Teknik Palet';
      case 'systemColorFinish': return model.colorMode === 'ral' ? finishLabel(model.systemColor && model.systemColor.finish) : 'Default';
      case 'panelColor': return model.colorMode === 'ral' ? (model.panelColor && model.panelColor.code) || '—' : 'Default / Teknik Palet';
      case 'panelColorFinish': return model.colorMode === 'ral' ? finishLabel(model.panelColor && model.panelColor.finish) : 'Default';
      default: return '';
    }
  }

  function formatPdfRequestValue(field, value, model = readModel()) {
    if (field && String(field.type).startsWith('auto-')) value = pdfRequestAutoValue(field, model);
    if (field && field.type === 'multi') {
      const items = Array.isArray(value) ? value.filter(Boolean) : [];
      return items.length ? items.join(', ') : '—';
    }
    if (field && (field.type === 'auto-mm' || field.unit === 'mm')) {
      const number = Number(value) || 0;
      return number > 0 ? `${Math.round(number)} mm` : '—';
    }
    if (field && field.unitAuto === 'pcs') {
      const number = Number(value);
      return Number.isFinite(number) && number > 0 ? `${Math.round(number)} pcs` : '—';
    }
    const text = String(value == null ? '' : value).trim();
    return text || '—';
  }

  function renderPdfRequestForm() {
    const meta = $(ids.pdfRequestFormMeta);
    const container = $(ids.pdfRequestFormFields);
    if (!meta || !container) return;
    const schema = requestSchemaForGroup();
    const values = currentPdfRequestState();
    const model = readModel();
    meta.textContent = `${schema.familyLabel} · ${schema.groupLabel} · ${schema.productLabel} · PDF bu form mantığıyla hazırlanır.`;
    container.innerHTML = '';
    (schema.sections || []).forEach((section) => {
      const sectionEl = document.createElement('section');
      sectionEl.className = 'pdf-request-section';
      const head = document.createElement('div');
      head.className = 'pdf-request-section-head';
      head.innerHTML = `<strong>${section.title}</strong>${section.hint ? `<span>${section.hint}</span>` : ''}`;
      sectionEl.appendChild(head);
      const grid = document.createElement('div');
      grid.className = 'pdf-request-grid';
      (section.fields || []).forEach((field) => {
        if (!isPdfRequestFieldVisible(field, values)) return;
        const wrap = document.createElement('div');
        wrap.className = 'pdf-request-field' + (field.fullWidth ? ' is-full' : '');
        const label = document.createElement(field.type === 'multi' ? 'span' : 'label');
        label.textContent = field.label;
        wrap.appendChild(label);
        if (String(field.type).startsWith('auto-')) {
          const readonly = document.createElement('div');
          readonly.className = 'pdf-request-readonly';
          readonly.textContent = formatPdfRequestValue(field, pdfRequestAutoValue(field, model), model);
          wrap.appendChild(readonly);
          const note = document.createElement('div');
          note.className = 'pdf-request-auto-note';
          note.textContent = '3D modelden otomatik alınır.';
          wrap.appendChild(note);
        } else if (field.type === 'select') {
          const select = document.createElement('select');
          const empty = document.createElement('option');
          empty.value = '';
          empty.textContent = 'Seçin';
          select.appendChild(empty);
          (field.options || []).forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            if (String(values[field.id] || '') === String(option)) opt.selected = true;
            select.appendChild(opt);
          });
          select.addEventListener('change', () => {
            values[field.id] = select.value;
            renderPdfRequestForm();
          });
          wrap.appendChild(select);
        } else if (field.type === 'number' || field.type === 'text') {
          const input = document.createElement('input');
          input.type = field.type === 'number' ? 'number' : 'text';
          input.value = values[field.id] == null ? '' : values[field.id];
          input.placeholder = field.unit === 'mm' ? 'mm' : '';
          input.addEventListener('input', () => {
            values[field.id] = input.value;
          });
          wrap.appendChild(input);
          if (field.unitAuto === 'pcs') {
            const note = document.createElement('div');
            note.className = 'pdf-request-field-help';
            note.textContent = 'Adet girin.';
            wrap.appendChild(note);
          }
        } else if (field.type === 'multi') {
          const choiceGrid = document.createElement('div');
          choiceGrid.className = 'pdf-request-choice-grid';
          const current = Array.isArray(values[field.id]) ? values[field.id] : [];
          (field.options || []).forEach((option) => {
            const choice = document.createElement('label');
            choice.className = 'pdf-request-choice';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = current.includes(option);
            input.addEventListener('change', () => {
              const source = new Set(Array.isArray(values[field.id]) ? values[field.id] : []);
              if (input.checked) source.add(option); else source.delete(option);
              values[field.id] = Array.from(source);
              renderPdfRequestForm();
            });
            const text = document.createElement('span');
            text.textContent = option;
            choice.appendChild(input);
            choice.appendChild(text);
            choiceGrid.appendChild(choice);
          });
          wrap.appendChild(choiceGrid);
        }
        grid.appendChild(wrap);
      });
      sectionEl.appendChild(grid);
      container.appendChild(sectionEl);
    });
  }

  function pdfRequestPayload(model = readModel()) {
    const schema = requestSchemaForGroup(model.productGroup);
    const values = { ...currentPdfRequestState(model.productGroup) };
    return {
      familyLabel: schema.familyLabel,
      groupLabel: schema.groupLabel,
      subGroupLabel: schema.subGroupLabel,
      productLabel: schema.productLabel,
      sections: (schema.sections || []).map((section) => ({
        title: section.title,
        rows: (section.fields || []).filter((field) => isPdfRequestFieldVisible(field, values)).map((field) => ({
          label: field.label,
          value: formatPdfRequestValue(field, values[field.id], model)
        }))
      }))
    };
  }

  function activeProductSpec(group = modelState.productGroup) {
    return PRODUCT_SPECS[group] || PRODUCT_SPECS['b-cube'];
  }

  function projectionFromPanelCount(panelCount, group = modelState.productGroup) {
    const spec = activeProductSpec(group);
    const count = Math.max(0, Math.round(Number(panelCount) || 0));
    return count > 0 ? count * spec.panelPitch + spec.projectionOffset : 0;
  }

  function panelCountFromProjection(depth, group = modelState.productGroup) {
    const spec = activeProductSpec(group);
    const projection = Number(depth) || 0;
    if (projection <= 0) return 0;
    return Math.max(spec.panelMin, Math.round((projection - spec.projectionOffset) / spec.panelPitch));
  }

  function lamellaCountFromProjection(depth, group = modelState.productGroup) {
    return panelCountFromProjection(depth, group);
  }

  function modelReady(model = modelState) {
    const spec = activeProductSpec(model.productGroup);
    const height = Number(model.height);
    return Number(model.width) >= spec.widthMin &&
      Number(model.depth) >= spec.depthMin &&
      height >= spec.heightMin && (!spec.heightMax || height <= spec.heightMax) &&
      Number(model.panelCount) >= spec.panelMin;
  }

  function readModel() {
    return {
      productGroup: modelState.productGroup || 'b-cube',
      width: modelState.width,
      depth: modelState.depth,
      height: modelState.height,
      lamellaCount: Math.max(0, Math.round(Number(modelState.panelCount) || panelCountFromProjection(modelState.depth))),
      panelCount: Math.max(0, Math.round(Number(modelState.panelCount) || 0)),
      orientations: [...modelState.orientations],
      postSections: modelState.postSections.map((section) => ({ ...section })),
      beamSection: { ...modelState.beamSection },
      placements: JSON.parse(JSON.stringify(modelState.placements || {})),
      zipPlacements: JSON.parse(JSON.stringify(modelState.zipPlacements || {})),
      facadeProfiles: JSON.parse(JSON.stringify(modelState.facadeProfiles || {})),
      productsOpen: Boolean(modelState.productsOpen),
      productOpenStates: JSON.parse(JSON.stringify(modelState.productOpenStates || {})),
      panelStates: JSON.parse(JSON.stringify(modelState.panelStates || {})),
      panelMasterOpen: Boolean(modelState.panelMasterOpen),
      glassPreferences: { ...glassPreferenceState() },
      colorMode: modelState.colorMode === 'ral' ? 'ral' : 'default',
      systemColor: { ...(modelState.systemColor || defaults.systemColor) },
      panelColor: { ...(modelState.panelColor || defaults.panelColor) },
      pdfRequest: pdfRequestPayload({
        productGroup: modelState.productGroup || 'b-cube',
        width: modelState.width, depth: modelState.depth, height: modelState.height, panelCount: Math.max(0, Math.round(Number(modelState.panelCount) || 0)), lamellaCount: Math.max(0, Math.round(Number(modelState.panelCount) || panelCountFromProjection(modelState.depth))), orientations: [...modelState.orientations], postSections: modelState.postSections.map((section) => ({ ...section })), beamSection: { ...modelState.beamSection }, placements: JSON.parse(JSON.stringify(modelState.placements || {})), zipPlacements: JSON.parse(JSON.stringify(modelState.zipPlacements || {})), facadeProfiles: JSON.parse(JSON.stringify(modelState.facadeProfiles || {})), productsOpen: Boolean(modelState.productsOpen), productOpenStates: JSON.parse(JSON.stringify(modelState.productOpenStates || {})), panelStates: JSON.parse(JSON.stringify(modelState.panelStates || {})), panelMasterOpen: Boolean(modelState.panelMasterOpen), glassPreferences: { ...glassPreferenceState() }, colorMode: modelState.colorMode === 'ral' ? 'ral' : 'default', systemColor: { ...(modelState.systemColor || defaults.systemColor) }, panelColor: { ...(modelState.panelColor || defaults.panelColor) }
      })
    };
  }

  function setText(id, text) {
    $(id).textContent = text;
  }

  function ralCatalogData() {
    const source = window.P3DV_RAL_CATALOG;
    if (source && Array.isArray(source.all) && source.all.length) return source;
    return {
      risingStandardCodes: ['RAL 9006', 'RAL 9016'],
      all: [
        { code: 'RAL 9006', hex: '#7C7D7F', image: '' },
        { code: 'RAL 9016', hex: '#E7E8E2', image: '' },
        { code: 'RAL 6018', hex: '#397A36', image: '' }
      ]
    };
  }

  function normalizeHexColor(value, fallback) {
    const text = String(value || '').trim();
    return /^#[0-9a-f]{6}$/i.test(text) ? text.toUpperCase() : fallback;
  }

  function ralColorOption(code, fallback) {
    const catalog = ralCatalogData();
    const found = catalog.all.find((option) => option.code === code);
    const base = found ? { code: found.code, hex: normalizeHexColor(found.hex, fallback.hex), image: found.image || '' } : { ...fallback };
    return { ...base, finish: normalizeColorFinish((fallback && fallback.finish) || 'MATTE') };
  }

  function normalizeModelColors() {
    const systemFinish = normalizeColorFinish(modelState.systemColor && modelState.systemColor.finish, defaults.systemColor.finish);
    const panelFinish = normalizeColorFinish(modelState.panelColor && modelState.panelColor.finish, defaults.panelColor.finish);
    modelState.systemColor = { ...ralColorOption(modelState.systemColor && modelState.systemColor.code, defaults.systemColor), finish: systemFinish };
    modelState.panelColor = { ...ralColorOption(modelState.panelColor && modelState.panelColor.code, defaults.panelColor), finish: panelFinish };
    glassPreferenceState();
  }

  function setColorSwatch(id, hex) {
    const swatch = $(id);
    if (swatch) swatch.setAttribute('style', `background:${normalizeHexColor(hex, '#94A3B8')}`);
  }

  function normalizeColorMode(value = modelState.colorMode) {
    return value === 'ral' ? 'ral' : 'default';
  }

  function updateColorControls() {
    normalizeModelColors();
    modelState.colorMode = normalizeColorMode();
    const defaultMode = modelState.colorMode === 'default';
    setText(ids.systemColorValue, defaultMode ? 'Klasik Sistem Paleti' : `${modelState.systemColor.code} · ${finishLabel(modelState.systemColor.finish)}`);
    setText(ids.panelColorValue, defaultMode ? 'Klasik Panel Yeşili' : `${modelState.panelColor.code} · ${finishLabel(modelState.panelColor.finish)}`);
    setColorSwatch(ids.systemColorSwatch, defaultMode ? '#FF00FF' : modelState.systemColor.hex);
    setColorSwatch(ids.panelColorSwatch, defaultMode ? '#7CFC00' : modelState.panelColor.hex);
    const defaultButton = $(ids.defaultColorMode);
    const ralButton = $(ids.ralColorMode);
    if (defaultButton) {
      defaultButton.classList.toggle('is-active', defaultMode);
      defaultButton.setAttribute('aria-pressed', String(defaultMode));
    }
    if (ralButton) {
      ralButton.classList.toggle('is-active', !defaultMode);
      ralButton.setAttribute('aria-pressed', String(!defaultMode));
    }
    renderPdfRequestForm();
  }

  function setColorMode(mode) {
    modelState.colorMode = normalizeColorMode(mode);
    updateColorControls();
    renderViewer();
  }

  function colorTargetLabel(target = activeColorTarget) {
    return target === 'panel' ? 'Panel Rengi' : 'Sistem Rengi';
  }

  function selectedColorForTarget(target = activeColorTarget) {
    return target === 'panel' ? modelState.panelColor : modelState.systemColor;
  }

  function setActiveColorCatalog(catalog) {
    activeColorCatalog = catalog === 'all' ? 'all' : 'rising';
    $(ids.colorCatalogRising).classList.toggle('is-active', activeColorCatalog === 'rising');
    $(ids.colorCatalogAll).classList.toggle('is-active', activeColorCatalog === 'all');
    $(ids.colorCatalogRising).setAttribute('aria-selected', String(activeColorCatalog === 'rising'));
    $(ids.colorCatalogAll).setAttribute('aria-selected', String(activeColorCatalog === 'all'));
    renderRalColorOptions();
  }

  function renderColorFinishOptions() {
    const container = $(ids.colorFinishOptions);
    if (!container) return;
    container.innerHTML = '';
    const current = pendingColorSelection ? normalizeColorFinish(pendingColorSelection.finish) : normalizeColorFinish(selectedColorForTarget().finish);
    COLOR_FINISHES.forEach((finish) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'finish-option-card' + (current === finish.value ? ' is-selected' : '');
      const sampleStyle = finish.value === 'GLOSS'
        ? 'background:linear-gradient(135deg, rgba(255,255,255,.92), rgba(255,255,255,.18) 35%, rgba(15,23,42,.08) 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.65);'
        : (finish.value === 'TEXTURE'
          ? 'background-image: radial-gradient(circle at 3px 3px, rgba(15,23,42,.14) 1px, transparent 1.2px), linear-gradient(135deg, rgba(255,255,255,.35), rgba(255,255,255,.12)); background-size: 9px 9px, cover;'
          : 'background:linear-gradient(135deg, rgba(255,255,255,.55), rgba(255,255,255,.12));');
      button.innerHTML = `<span class="finish-option-sample" style="${sampleStyle}"></span><span class="finish-option-copy"><strong>${finish.label}</strong><span>${finish.detail}</span></span>`;
      button.addEventListener('click', () => applyColorFinish(finish.value));
      container.appendChild(button);
    });
  }

  function openColorFinishDialog(selectedCode, selectedHex, selectedImage) {
    const current = selectedColorForTarget();
    pendingColorSelection = {
      code: selectedCode,
      hex: normalizeHexColor(selectedHex, current.hex),
      image: selectedImage || '',
      finish: normalizeColorFinish(current.finish)
    };
    setText(ids.colorFinishTitle, `${colorTargetLabel()} · Yüzey Tipi`);
    setText(ids.colorFinishDescription, `${selectedCode} için parlak, mat veya texture yüzey tipini seçin.`);
    setText(ids.colorFinishSummary, `${selectedCode} · ${finishLabel(pendingColorSelection.finish)}`);
    renderColorFinishOptions();
    $(ids.colorFinishDialog).hidden = false;
  }

  function closeColorFinishDialog() {
    $(ids.colorFinishDialog).hidden = true;
    pendingColorSelection = null;
  }

  function applyColorFinish(finishValue) {
    if (!pendingColorSelection) return;
    const next = { ...pendingColorSelection, finish: normalizeColorFinish(finishValue, pendingColorSelection.finish) };
    modelState.colorMode = 'ral';
    if (activeColorTarget === 'panel') modelState.panelColor = next; else modelState.systemColor = next;
    closeColorFinishDialog();
    closeColorPicker();
    updateColorControls();
    renderViewer();
  }

  function renderRalColorOptions() {
    const grid = $(ids.colorOptionGrid);
    if (!grid) return;
    const catalog = ralCatalogData();
    const risingCodes = new Set(catalog.risingStandardCodes || []);
    const query = String($(ids.colorSearch).value || '').trim().toUpperCase().replace(/\s+/g, ' ');
    const options = catalog.all.filter((option) => {
      if (activeColorCatalog === 'rising' && !risingCodes.has(option.code)) return false;
      if (!query) return true;
      const compact = option.code.toUpperCase().replace(/\s+/g, '');
      return option.code.toUpperCase().includes(query) || compact.includes(query.replace(/\s+/g, ''));
    });
    grid.innerHTML = '';
    const selected = selectedColorForTarget();
    options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ral-color-option' + (selected && selected.code === option.code ? ' is-selected' : '');
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(Boolean(selected && selected.code === option.code)));
      button.setAttribute('aria-label', option.code);
      const image = option.image ? `<img src="${option.image}" alt="" loading="lazy" />` : `<span style="display:block;width:100%;height:100%;background:${option.hex}"></span>`;
      button.innerHTML = `<span class="ral-color-option-image">${image}</span><span class="ral-color-option-copy"><strong>${option.code}</strong><small>Yüzey tipi sonraki adımda seçilir</small></span>`;
      button.value = option.code;
      button.addEventListener('click', () => openColorFinishDialog(option.code, option.hex, option.image || ''));
      grid.appendChild(button);
    });
    setText(ids.colorResultCount, `${options.length} renk`);
  }

  function openColorPicker(target) {
    activeColorTarget = target === 'panel' ? 'panel' : 'system';
    setText(ids.colorPickerTitle, `${colorTargetLabel()} Seçin`);
    setText(ids.colorPickerDescription, activeColorTarget === 'panel'
      ? 'Seçilen RAL kodu yalnız hareketli çatı panellerine uygulanır. Ardından yüzey tipi seçilir.'
      : 'Seçilen RAL kodu cam ve perde kumaşı hariç tüm sistem ve cephe profillerine uygulanır. Ardından yüzey tipi seçilir.');
    $(ids.colorSearch).value = '';
    $(ids.colorPickerDialog).hidden = false;
    setActiveColorCatalog(activeColorCatalog);
    $(ids.colorSearch).focus();
  }

  function closeColorPicker() {
    $(ids.colorPickerDialog).hidden = true;
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
    $(ids.freedomWidth).removeAttribute('max');
    $(ids.freedomWidth).placeholder = `Önerilen maks. ${spec.widthMax} mm`;
    setText(ids.freedomWidthLimitNote, `Önerilen maksimum: ${spec.widthMax} mm · Üzeri uyarıyla çizilir.`);
    $(ids.freedomDepth).min = String(spec.depthMin);
    $(ids.freedomDepth).removeAttribute('max');
    $(ids.freedomDepth).placeholder = `Önerilen ${spec.depthMin}–${spec.depthMax} mm`;
    setText(ids.freedomDepthLimitNote, `Önerilen maksimum: ${spec.depthMax} mm · Üzeri uyarıyla çizilir.`);
    $(ids.freedomHeight).min = String(spec.heightMin);
    if (spec.heightMax) {
      $(ids.freedomHeight).max = String(spec.heightMax);
      $(ids.freedomHeight).placeholder = `Maks. ${spec.heightMax} mm`;
    } else {
      $(ids.freedomHeight).removeAttribute('max');
      $(ids.freedomHeight).placeholder = 'Yükseklik (mm)';
    }
    $(ids.freedomPanelCount).min = String(spec.panelMin);
    $(ids.freedomPanelCount).removeAttribute('max');
    $(ids.freedomPanelCount).placeholder = `Önerilen ${spec.panelMin}–${spec.panelMax} adet`;
    setText(ids.productFormula, `Açılım = Panel Sayısı × ${spec.panelPitch} + ${spec.projectionOffset}`);

    $(ids.width).min = String(spec.widthMin);
    $(ids.width).removeAttribute('max');
    $(ids.depth).min = String(spec.depthMin);
    $(ids.depth).removeAttribute('max');
    $(ids.height).min = String(spec.heightMin);
    if (spec.heightMax) $(ids.height).max = String(spec.heightMax); else $(ids.height).removeAttribute('max');
    populateProjectionOptions();
    ensurePdfRequestState(modelState.productGroup);
    renderPdfRequestForm();
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
    showRecommendedLimitWarnings({
      width: readFreedomNumber(ids.freedomWidth),
      depth: readFreedomNumber(ids.freedomDepth),
      panelCount: readFreedomNumber(ids.freedomPanelCount)
    });
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
    if (placement.type === 'folding') return 'Katlanır Cam';
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
    const arButton = $(ids.mobileAr);
    if (!modelReady(model)) {
      if (arButton) arButton.disabled = true;
      setMobileArStatus('Gerçek alan görünümü için önce geçerli bir 3D model oluşturun.', 'warning');
      $(ids.frame).srcdoc = buildEmptyViewerHtml('Sol taraftaki Genişlik, Açılım, Yükseklik ve Panel Sayısı alanlarını doldurun.');
      return;
    }
    if (arButton) arButton.disabled = false;
    setMobileArStatus('3D sahne hazırlanıyor. Mobil AR desteği cihazda otomatik kontrol edilir.');
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

  function setMobileArStatus(message, tone = '') {
    const status = $(ids.mobileArStatus);
    if (!status) return;
    status.textContent = String(message || '');
    if (tone) status.setAttribute('data-tone', tone); else status.removeAttribute('data-tone');
  }

  async function refreshMobileArCapability() {
    const button = $(ids.mobileAr);
    const frame = $(ids.frame);
    if (!button || !frame || !modelReady(readModel())) return;
    const child = frame.contentWindow;
    if (!child || typeof child.getP3DVARCapabilities !== 'function') {
      setMobileArStatus('3D sahne yükleniyor; AR denetimi henüz hazır değil.');
      return;
    }
    try {
      const capability = await child.getP3DVARCapabilities();
      if (capability && capability.supported) {
        button.disabled = false;
        setMobileArStatus(`AR hazır · Gerçek ölçek 1:1 · ${Math.round(modelState.width)} mm genişlik ${(Number(modelState.width) / 1000).toFixed(2)} m olarak yerleşir.`, 'success');
      } else {
        button.disabled = false;
        setMobileArStatus((capability && capability.message) || 'Bu cihazda WebXR AR desteği bulunamadı.', 'warning');
      }
    } catch (error) {
      button.disabled = false;
      setMobileArStatus(`AR desteği denetlenemedi: ${error.message}`, 'warning');
    }
  }

  async function startMobileAr() {
    const model = readModel();
    if (!modelReady(model)) {
      setMobileArStatus('Önce geçerli bir 3D model oluşturun.', 'warning');
      return;
    }
    const frame = $(ids.frame);
    const child = frame && frame.contentWindow;
    if (!child || typeof child.startP3DVAR !== 'function') {
      setMobileArStatus('3D viewer henüz hazır değil. Birkaç saniye sonra tekrar dokunun.', 'warning');
      return;
    }
    const button = $(ids.mobileAr);
    const original = button ? button.textContent : '';
    if (button) {
      button.disabled = true;
      button.textContent = 'AR Hazırlanıyor…';
    }
    setMobileArStatus('Kamera ve manuel gerçek ölçekli yerleşim başlatılıyor…');
    try {
      const result = await child.startP3DVAR();
      if (result && result.ok) {
        setMobileArStatus(result.message || 'AR oturumu başlatıldı. Ürün gerçek ölçekte çizildi; konumunu elle ayarlayın.', 'success');
      } else {
        setMobileArStatus((result && result.message) || 'AR oturumu başlatılamadı.', (result && result.retryInsideViewer) ? 'warning' : 'error');
      }
    } catch (error) {
      setMobileArStatus(`AR başlatılamadı: ${error.message}`, 'error');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = original || 'Gerçek Alanda Gör';
      }
    }
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
    if (nextWidth === null || nextDepth === null || nextHeight === null || (spec.heightMax && nextHeight > spec.heightMax)) {
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
    $(ids.freedomWidth).value = String(nextWidth);
    $(ids.freedomDepth).value = String(nextDepth);
    $(ids.freedomHeight).value = String(nextHeight);
    $(ids.freedomPanelCount).value = String(modelState.panelCount);
    closePositionDialog();
    renderViewer();
    showRecommendedLimitWarnings({ width: nextWidth, depth: nextDepth, panelCount: modelState.panelCount });
  }

  function readFreedomNumber(id) {
    const raw = String($(id).value || '').trim().replace(',', '.');
    if (!raw) return null;
    const value = Math.round(Number(raw));
    return Number.isFinite(value) ? value : null;
  }

  function setFreedomValidation(message, tone = 'error') {
    const element = $(ids.freedomValidation);
    element.textContent = message || '';
    element.classList.toggle('is-warning', Boolean(message) && tone === 'warning');
    element.classList.toggle('is-error', Boolean(message) && tone !== 'warning');
  }

  function recommendedLimitWarnings(values, group = modelState.productGroup) {
    const spec = activeProductSpec(group);
    const warnings = [];
    const width = Number(values && values.width);
    const depth = Number(values && values.depth);
    const panelCount = Number(values && values.panelCount);
    if (Number.isFinite(width) && width > spec.widthMax) {
      warnings.push(`Önerilen maksimum genişlik ${spec.widthMax} mm'dir; ${Math.round(width)} mm standart sınır dışıdır; çizime engel olmaz.`);
    }
    if (Number.isFinite(depth) && depth > spec.depthMax) {
      warnings.push(`Önerilen maksimum açılım ${spec.depthMax} mm'dir; ${Math.round(depth)} mm standart sınır dışıdır; çizime engel olmaz.`);
    }
    if (Number.isFinite(panelCount) && panelCount > spec.panelMax && !(Number.isFinite(depth) && depth > spec.depthMax)) {
      warnings.push(`Önerilen maksimum panel sayısı ${spec.panelMax}'tir; ${Math.round(panelCount)} panel standart önerinin üzerindedir; çizime engel olmaz.`);
    }
    return warnings;
  }

  function showRecommendedLimitWarnings(values, group = modelState.productGroup) {
    const warnings = recommendedLimitWarnings(values, group);
    setFreedomValidation(warnings.join(' '), warnings.length ? 'warning' : 'error');
    return warnings;
  }

  function syncProjectionFromPanelCount() {
    const count = readFreedomNumber(ids.freedomPanelCount);
    const spec = activeProductSpec();
    setFreedomValidation('');
    if (count === null) return;
    if (count < spec.panelMin) {
      setFreedomValidation(`Panel sayısı en az ${spec.panelMin} olmalıdır.`);
      return;
    }
    const depth = projectionFromPanelCount(count);
    $(ids.freedomDepth).value = String(depth);
    showRecommendedLimitWarnings({ width: readFreedomNumber(ids.freedomWidth), depth, panelCount: count });
  }

  function syncPanelCountFromProjection() {
    const depth = readFreedomNumber(ids.freedomDepth);
    const spec = activeProductSpec();
    setFreedomValidation('');
    if (depth === null) return;
    if (depth < spec.depthMin) {
      setFreedomValidation(`Açılım en az ${spec.depthMin} mm olmalıdır.`);
      return;
    }
    const panelCount = panelCountFromProjection(depth);
    $(ids.freedomPanelCount).value = String(panelCount);
    showRecommendedLimitWarnings({ width: readFreedomNumber(ids.freedomWidth), depth, panelCount });
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
    if (width < spec.widthMin) {
      setFreedomValidation(`Genişlik en az ${spec.widthMin} mm olmalıdır.`);
      return false;
    }
    if (depth < spec.depthMin) {
      setFreedomValidation(`Açılım en az ${spec.depthMin} mm olmalıdır.`);
      return false;
    }
    if (height < spec.heightMin || (spec.heightMax && height > spec.heightMax)) {
      setFreedomValidation(spec.heightMax ? `Yükseklik ${spec.heightMin}–${spec.heightMax} mm arasında olmalıdır.` : `Yükseklik en az ${spec.heightMin} mm olmalıdır.`);
      return false;
    }
    if (panelCount < spec.panelMin) {
      setFreedomValidation(`Panel sayısı en az ${spec.panelMin} olmalıdır.`);
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
    renderViewer();
    renderPdfRequestForm();
    showRecommendedLimitWarnings({ width, depth, panelCount });
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
    folding: {
      subtypesA: [
        ['STANDARD', 'Standard'],
        ['TOP-HUNG', 'Top-Hung']
      ],
      subtypesK: [
        ['STANDARD', 'Standard']
      ],
      directions: [
        ['LEFT', 'Sola'],
        ['RIGHT', 'Sağa'],
        ['BOTH', 'İki Yana']
      ],
      passageDoors: [
        ['NO', 'Yok'],
        ['YES', 'Var · İlk Kanat']
      ],
      thicknessA: [
        ['8 MM', '8 mm'],
        ['10 MM', '10 mm'],
        ['12 MM', '12 mm'],
        ['INSULATED GLASS', 'Yalıtımlı Cam']
      ],
      thicknessK: [
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
      fabricColors: [['7635-52101', '7635-52101']],
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

  const COLOR_FINISHES = [
    { value: 'GLOSS', label: 'Parlak', detail: 'Daha belirgin yansıma', roughness: 0.16, metalness: 0.28 },
    { value: 'MATTE', label: 'Mat', detail: 'Daha yumuşak yansıma', roughness: 0.48, metalness: 0.16 },
    { value: 'TEXTURE', label: 'Texture', detail: 'Daha pütürlü yüzey görünümü', roughness: 0.84, metalness: 0.08 }
  ];

  const GLASS_COLOR_OPTIONS = [
    ['TRANSPARENT', 'Şeffaf'],
    ['FUME', 'Füme'],
    ['BRONZE', 'Bronz'],
    ['LOW-E GLASS', 'Low-e Cam'],
    ['OTHER', 'Diğer']
  ];

  const ZIP_FABRIC_CATALOG = [
    {
      title: 'Sun-Store',
      pages: [
        {
          image: 'assets/fabric-pages/sun-store/sun-store-page-1.jpg',
          items: [
            { value: '7635-52101', left: '52.0362%', top: '2.2805%', width: '39.7059%', height: '14.1961%', tone: '#f7f8f1', texture: 'assets/fabric-pages/sun-store/textures/7635-52101.png', tileMm: 520 },
            { value: '7635-52102', left: '8.2579%', top: '16.5336%', width: '39.5928%', height: '13.9681%', tone: '#cfd1cc', texture: 'assets/fabric-pages/sun-store/textures/7635-52102.png', tileMm: 520 },
            { value: '7635-52103', left: '52.4887%', top: '16.5336%', width: '39.5928%', height: '14.1391%', tone: '#a1a39e', texture: 'assets/fabric-pages/sun-store/textures/7635-52103.png', tileMm: 520 },
            { value: '7635-52105', left: '8.2579%', top: '30.7868%', width: '39.5928%', height: '14.1961%', tone: '#5d6568', texture: 'assets/fabric-pages/sun-store/textures/7635-52105.png', tileMm: 520 },
            { value: '7635-52106', left: '52.2624%', top: '30.7868%', width: '39.5928%', height: '14.1961%', tone: '#4f575a', texture: 'assets/fabric-pages/sun-store/textures/7635-52106.png', tileMm: 520 },
            { value: '7635-52107', left: '8.1448%', top: '45.2680%', width: '39.5928%', height: '14.1391%', tone: '#33373a', texture: 'assets/fabric-pages/sun-store/textures/7635-52107.png', tileMm: 520 },
            { value: '7635-52173', left: '52.0362%', top: '45.2109%', width: '39.5928%', height: '14.0251%', tone: '#f7f7d7', texture: 'assets/fabric-pages/sun-store/textures/7635-52173.png', tileMm: 520 },
            { value: '7635-52174', left: '8.3710%', top: '60.0342%', width: '39.5928%', height: '14.0251%', tone: '#f9f9e8', texture: 'assets/fabric-pages/sun-store/textures/7635-52174.png', tileMm: 520 },
            { value: '7635-52176', left: '51.6968%', top: '60.0342%', width: '39.7059%', height: '14.0251%', tone: '#b9ac8a', texture: 'assets/fabric-pages/sun-store/textures/7635-52176.png', tileMm: 520 },
            { value: '7635-52142', left: '8.3710%', top: '76.6819%', width: '38.6878%', height: '14.8233%', tone: '#696f72', texture: 'assets/fabric-pages/sun-store/textures/7635-52142.png', tileMm: 520 },
            { value: '7635-52144', left: '51.6968%', top: '76.6819%', width: '39.5928%', height: '14.1391%', tone: '#323639', texture: 'assets/fabric-pages/sun-store/textures/7635-52144.png', tileMm: 520 }
          ]
        },
        {
          image: 'assets/fabric-pages/sun-store/sun-store-page-2.jpg',
          items: [
            { value: '92-2044', left: '53.6830%', top: '0.7412%', width: '39.2857%', height: '12.5428%', tone: '#f7f6f1', texture: 'assets/fabric-pages/sun-store/textures/92-2044.png', tileMm: 460 },
            { value: '92-2135', left: '7.2545%', top: '13.0559%', width: '39.0625%', height: '12.8848%', tone: '#9e988d', texture: 'assets/fabric-pages/sun-store/textures/92-2135.png', tileMm: 460 },
            { value: '92-2171', left: '53.7946%', top: '13.0559%', width: '39.0625%', height: '12.8278%', tone: '#909899', texture: 'assets/fabric-pages/sun-store/textures/92-2171.png', tileMm: 460 },
            { value: '92-2043', left: '7.0312%', top: '25.7127%', width: '38.9509%', height: '12.8848%', tone: '#343635', texture: 'assets/fabric-pages/sun-store/textures/92-2043.png', tileMm: 460 },
            { value: '92-2047', left: '53.3482%', top: '25.6556%', width: '38.9509%', height: '12.8848%', tone: '#2c3135', texture: 'assets/fabric-pages/sun-store/textures/92-2047.png', tileMm: 460 },
            { value: '86-2044', left: '53.5714%', top: '38.3694%', width: '39.0625%', height: '12.9418%', tone: '#f5f4e9', texture: 'assets/fabric-pages/sun-store/textures/86-2044.png', tileMm: 420 },
            { value: '86-2135', left: '7.1429%', top: '51.0832%', width: '39.0625%', height: '12.8278%', tone: '#9a958a', texture: 'assets/fabric-pages/sun-store/textures/86-2135.png', tileMm: 420 },
            { value: '86-2171', left: '53.5714%', top: '51.0262%', width: '38.9509%', height: '12.8848%', tone: '#8f9899', texture: 'assets/fabric-pages/sun-store/textures/86-2171.png', tileMm: 420 },
            { value: '86-2043', left: '7.1429%', top: '64.2531%', width: '39.0625%', height: '12.8848%', tone: '#393c3b', texture: 'assets/fabric-pages/sun-store/textures/86-2043.png', tileMm: 420 },
            { value: '86-2047', left: '53.3482%', top: '64.2531%', width: '39.0625%', height: '12.8848%', tone: '#31363a', texture: 'assets/fabric-pages/sun-store/textures/86-2047.png', tileMm: 420 },
            { value: 'W88-8102', left: '7.1429%', top: '78.1072%', width: '39.0625%', height: '16.1345%', tone: '#f7f6e2', texture: 'assets/fabric-pages/sun-store/textures/W88-8102.png', tileMm: 420 },
            { value: 'W88-2047', left: '53.3482%', top: '78.1072%', width: '39.0625%', height: '16.2486%', tone: '#262b33', texture: 'assets/fabric-pages/sun-store/textures/W88-2047.png', tileMm: 420 }
          ]
        }
      ]
    }
  ];

  const ZIP_FABRIC_OPTIONS = ZIP_FABRIC_CATALOG.flatMap((section) => section.pages.flatMap((page) => page.items.map((item) => ({
    value: item.value,
    label: item.value,
    line: section.title,
    hex: item.tone || '#8b9096'
  }))));

  function normalizeColorFinish(value, fallback = 'MATTE') {
    return COLOR_FINISHES.some((item) => item.value === value) ? value : fallback;
  }

  function finishMeta(value) {
    return COLOR_FINISHES.find((item) => item.value === normalizeColorFinish(value)) || COLOR_FINISHES[1];
  }

  function finishLabel(value) {
    return finishMeta(value).label;
  }

  function normalizeGlassColor(value) {
    const raw = String(value || '').toUpperCase();
    if (raw === 'GREY') return 'FUME';
    if (['TRANSPARENT', 'FUME', 'BRONZE', 'LOW-E GLASS', 'OTHER'].includes(raw)) return raw;
    return 'TRANSPARENT';
  }

  function normalizeGlassThickness(value) {
    const raw = String(value || '').toUpperCase();
    return ['8 MM', '10 MM', '12 MM', 'INSULATED GLASS'].includes(raw) ? raw : '10 MM';
  }

  function glassPreferenceState() {
    const current = modelState.glassPreferences || defaults.glassPreferences;
    const normalized = {
      color: normalizeGlassColor(current && current.color),
      customColor: String(current && current.customColor || ''),
      thickness: normalizeGlassThickness(current && current.thickness)
    };
    if (normalized.color !== 'OTHER') normalized.customColor = '';
    modelState.glassPreferences = normalized;
    return normalized;
  }

  function glassThicknessValues(type, series) {
    if (type === 'guillotine') {
      return (series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.thicknessK : PRODUCT_OPTIONS.guillotine.thicknessA).map((item) => item[0]);
    }
    if (type === 'sliding') {
      return (series === 'K SERIES' ? PRODUCT_OPTIONS.sliding.thicknessK : PRODUCT_OPTIONS.sliding.thicknessA).map((item) => item[0]);
    }
    if (type === 'folding') {
      return (series === 'K SERIES' ? PRODUCT_OPTIONS.folding.thicknessK : PRODUCT_OPTIONS.folding.thicknessA).map((item) => item[0]);
    }
    if (type === 'door' || type === 'fixed') return PRODUCT_OPTIONS.sliding.thicknessA.map((item) => item[0]);
    return [];
  }

  function compatibleGlassThickness(type, series, preferredThickness, glassColor) {
    const values = glassThicknessValues(type, series);
    if (!values.length) return '';
    const preferred = normalizeGlassThickness(preferredThickness);
    if (normalizeGlassColor(glassColor) === 'LOW-E GLASS' && values.includes('INSULATED GLASS')) return 'INSULATED GLASS';
    if (values.includes(preferred)) return preferred;
    if (preferred === '10 MM' && values.includes('8 MM')) return '8 MM';
    if (preferred === '8 MM' && values.includes('INSULATED GLASS')) return 'INSULATED GLASS';
    if (values.includes('INSULATED GLASS')) return 'INSULATED GLASS';
    return values[0];
  }

  function glassSeriesForDraft(draft) {
    if (draft && (draft.type === 'sliding' || draft.type === 'folding' || draft.type === 'guillotine')) return draft.series === 'K SERIES' ? 'K SERIES' : 'A SERIES';
    return 'A SERIES';
  }

  function rememberGlassColorFromForm() {
    const preference = glassPreferenceState();
    const color = normalizeGlassColor($(ids.productGlassColor).value);
    preference.color = color;
    preference.customColor = color === 'OTHER' ? String($(ids.productCustomGlass).value || '') : '';
    if (color === 'LOW-E GLASS') {
      const type = $(ids.productType).value;
      const series = glassSeriesForDraft({ type, series: $(ids.productSeries).value });
      const compatible = compatibleGlassThickness(type, series, 'INSULATED GLASS', color);
      if (compatible) {
        preference.thickness = compatible;
        $(ids.productGlassThickness).value = compatible;
      }
    }
    modelState.glassPreferences = preference;
  }

  function rememberGlassThicknessFromForm() {
    const preference = glassPreferenceState();
    preference.thickness = normalizeGlassThickness($(ids.productGlassThickness).value);
    modelState.glassPreferences = preference;
  }

  function rememberGlassPreferencesFromDraft(draft) {
    if (!draft || draft.type === 'zip') return;
    const preference = glassPreferenceState();
    preference.color = normalizeGlassColor(draft.glassColor);
    preference.customColor = preference.color === 'OTHER' ? String(draft.customGlassColor || '') : '';
    const series = glassSeriesForDraft(draft);
    const automaticFallback = compatibleGlassThickness(draft.type, series, preference.thickness, preference.color);
    const supported = glassThicknessValues(draft.type, series);
    if (supported.includes(preference.thickness) || draft.glassThickness !== automaticFallback) {
      preference.thickness = normalizeGlassThickness(draft.glassThickness);
    }
    modelState.glassPreferences = preference;
  }

  function zipFabricByCode(value) {
    return ZIP_FABRIC_OPTIONS.find((item) => item.value === value) || ZIP_FABRIC_OPTIONS[0];
  }

  function setProductFabricValue(value) {
    const option = zipFabricByCode(value);
    if ($(ids.productFabric)) $(ids.productFabric).value = option.value;
    setText(ids.productFabricValue, option.label);
  }

  function createFabricHotspotButton(item, selectedValue) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'fabric-page-hotspot' + (selectedValue === item.value ? ' is-selected' : '');
    button.setAttribute('style', `left:${item.left};top:${item.top};width:${item.width};height:${item.height};`);
    button.setAttribute('data-value', item.value);
    button.title = item.value;
    button.setAttribute('aria-label', item.value);
    button.innerHTML = `<span>${item.value}</span>`;
    button.addEventListener('click', () => {
      setProductFabricValue(item.value);
      closeProductFabricCatalog();
      $(ids.productValidation).textContent = '';
    });
    return button;
  }

  function renderFabricCards(selectedValue) {
    const container = $(ids.productFabricCards);
    if (!container) return;
    container.innerHTML = '';
    const selected = zipFabricByCode(selectedValue).value;
    ZIP_FABRIC_CATALOG.forEach((section) => {
      const sectionEl = document.createElement('section');
      sectionEl.className = 'fabric-page-section';
      const heading = document.createElement('div');
      heading.className = 'fabric-page-section-head';
      heading.innerHTML = `<strong>${section.title}</strong><span>Gerçek katalog sayfası üzerinden seçim yapın</span>`;
      sectionEl.appendChild(heading);
      const stack = document.createElement('div');
      stack.className = 'fabric-page-stack-inner';
      section.pages.forEach((page, index) => {
        const card = document.createElement('article');
        card.className = 'fabric-page-card';
        const overlay = document.createElement('div');
        overlay.className = 'fabric-page-overlay';
        const img = document.createElement('img');
        img.src = page.image;
        img.alt = `${section.title} sayfa ${index + 1}`;
        img.loading = 'lazy';
        overlay.appendChild(img);
        page.items.forEach((item) => overlay.appendChild(createFabricHotspotButton(item, selected)));
        card.appendChild(overlay);
        stack.appendChild(card);
      });
      sectionEl.appendChild(stack);
      container.appendChild(sectionEl);
    });
  }

  function foldingPanelCountForWidth(width) {
    const value = Number(width) || 0;
    return value > 0 ? Math.max(2, Math.ceil(value / 600)) : 4;
  }

  function foldingDirectionForPanels(panels, requestedDirection) {
    const count = Math.max(2, Math.round(Number(panels) || 2));
    if (count > 8) return 'BOTH';
    return ['LEFT', 'RIGHT', 'BOTH'].includes(requestedDirection) ? requestedDirection : 'RIGHT';
  }

  function foldingAdvisory(zone, draft) {
    const warnings = [];
    const count = Math.max(2, Math.round(Number(draft && draft.panels) || 2));
    const height = Number(zone && zone.height) || 0;
    const width = Number(zone && zone.width) || 0;
    if (height > 2800) warnings.push(`Önerilen maksimum yükseklik 2800 mm; mevcut ${Math.round(height)} mm. Çizime engel olmaz.`);
    if (count > 8) warnings.push(`${count} panel tek tarafa önerilen 8 paneli aştığı için otomatik iki yana toplanır.`);
    if (width > 0 && width / count > 600) warnings.push(`Panel genişliği yaklaşık ${Math.round(width / count)} mm; önerilen maksimum 600 mm. Çizime engel olmaz.`);
    return warnings;
  }

  function productDefaults(type) {
    const preference = glassPreferenceState();
    const defaultGlass = preference.color;
    const customGlass = preference.color === 'OTHER' ? preference.customColor : '';
    if (type === 'zip') {
      return {
        type: 'zip',
        series: 'G SERIES',
        subtype: '100x100 BOX',
        placementLocation: 'BETWEEN POSTS',
        fabricColor: ZIP_FABRIC_OPTIONS[0].value,
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
        movingLeafHeight: 2200,
        topFixedHeight: 500,
        view: 'OUTSIDE VIEW',
        glassThickness: compatibleGlassThickness('door', 'A SERIES', preference.thickness, defaultGlass),
        glassColor: defaultGlass,
        customGlassColor: customGlass
      };
    }
    if (type === 'fixed') {
      return {
        type: 'fixed',
        glassThickness: compatibleGlassThickness('fixed', 'A SERIES', preference.thickness, defaultGlass),
        glassColor: defaultGlass,
        customGlassColor: customGlass,
        verticalDivisions: 0,
        horizontalDivisions: 1,
        horizontalHeights: ''
      };
    }
    if (type === 'folding') {
      return {
        type: 'folding',
        series: 'A SERIES',
        subtype: 'STANDARD',
        openingType: 'FOLDING',
        openingDirection: 'RIGHT',
        glassThickness: compatibleGlassThickness('folding', 'A SERIES', preference.thickness, defaultGlass),
        glassColor: defaultGlass,
        customGlassColor: customGlass,
        panels: 4,
        passageDoor: 'NO',
        collectionState: 'NORMAL',
        thresholdProfile: 70
      };
    }
    if (type === 'guillotine') {
      return {
        type: 'guillotine',
        series: 'A SERIES',
        subtype: 'CLEANABLE',
        mechanism: 'CHAIN',
        glassThickness: compatibleGlassThickness('guillotine', 'A SERIES', preference.thickness, defaultGlass),
        glassColor: defaultGlass,
        customGlassColor: customGlass,
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
      glassThickness: compatibleGlassThickness('sliding', 'A SERIES', preference.thickness, defaultGlass),
      glassColor: defaultGlass,
      customGlassColor: customGlass,
      panels: 4,
      collectionState: 'NORMAL'
    };
  }

  function normalizePlacement(placement, fallbackType) {
    const requestedType = placement && placement.type ? placement.type : fallbackType;
    const type = requestedType === 'folding' ? 'folding' : (requestedType === 'guillotine' ? 'guillotine' : (requestedType === 'zip' ? 'zip' : (requestedType === 'fixed' ? 'fixed' : (requestedType === 'door' ? 'door' : 'sliding'))));
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
      normalized.fabricColor = zipFabricByCode(normalized.fabricColor).value;
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
      normalized.motorDirection = normalized.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
      normalized.bottomPanelHinge = 'BOTTOM';
      normalized.view = 'OUTSIDE VIEW';
      if (normalized.subtype === 'CLEANABLE') {
        normalized.bottomPanelMode = 'VASISTAS';
        normalized.bottomPanelState = 'OPEN';
      }
    }
    if (type === 'folding') {
      normalized.series = normalized.series === 'K SERIES' ? 'K SERIES' : 'A SERIES';
      const validSubtypes = normalized.series === 'K SERIES'
        ? PRODUCT_OPTIONS.folding.subtypesK.map((item) => item[0])
        : PRODUCT_OPTIONS.folding.subtypesA.map((item) => item[0]);
      if (!validSubtypes.includes(normalized.subtype)) normalized.subtype = validSubtypes[0];
      normalized.panels = Math.max(2, Math.round(Number(normalized.panels) || 4));
      normalized.openingType = 'FOLDING';
      normalized.openingDirection = foldingDirectionForPanels(normalized.panels, normalized.openingDirection);
      normalized.passageDoor = normalized.passageDoor === 'YES' ? 'YES' : 'NO';
      normalized.collectionState = normalized.collectionState === 'COLLECTED' ? 'COLLECTED' : 'NORMAL';
      normalized.thresholdProfile = 70;
      normalized.glassThickness = compatibleGlassThickness('folding', normalized.series, normalized.glassThickness, normalized.glassColor);
      normalized.glassColor = normalizeGlassColor(normalized.glassColor || glassPreferenceState().color);
      normalized.customGlassColor = String(normalized.customGlassColor || '');
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
      const hasStoredMovingHeight = placement && Number.isFinite(Number(placement.movingLeafHeight));
      normalized.movingLeafHeight = hasStoredMovingHeight ? Math.max(1200, Math.round(Number(placement.movingLeafHeight))) : null;
      normalized.topFixedHeight = Math.max(250, Math.min(1200, Math.round(Number(normalized.topFixedHeight) || 500)));
      normalized.view = 'OUTSIDE VIEW';
      normalized.glassThickness = compatibleGlassThickness('door', 'A SERIES', normalized.glassThickness, normalized.glassColor);
      normalized.glassColor = normalizeGlassColor(normalized.glassColor || glassPreferenceState().color);
      normalized.customGlassColor = String(normalized.customGlassColor || '');
      normalized.panels = 0;
      delete normalized.series;
      delete normalized.subtype;
    }
    if (type === 'fixed') {
      normalized.glassThickness = compatibleGlassThickness('fixed', 'A SERIES', normalized.glassThickness, normalized.glassColor);
      normalized.glassColor = normalizeGlassColor(normalized.glassColor || glassPreferenceState().color);
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

  function lookupOptionLabel(options, value) {
    const list = Array.isArray(options) ? options : [];
    const found = list.find((option) => Array.isArray(option)
      ? String(option[0]) === String(value)
      : String(option) === String(value));
    if (!found) return value == null || value === '' ? '—' : String(value);
    return Array.isArray(found) ? String(found[1] || found[0]) : String(found);
  }

  function mmText(value) {
    const number = Math.round(Number(value) || 0);
    return `${number} mm`;
  }

  function glassColorLabel(value, customValue) {
    const normalized = normalizeGlassColor(value);
    if (normalized === 'OTHER') {
      const custom = String(customValue || '').trim();
      return custom ? `Diğer · ${custom}` : 'Diğer';
    }
    return lookupOptionLabel(GLASS_COLOR_OPTIONS, normalized);
  }

  function fabricColorLabel(value, customValue) {
    const found = ZIP_FABRIC_OPTIONS.find((item) => item.value === value);
    if (found) return `${found.label} · ${found.line}`;
    const custom = String(customValue || '').trim();
    return custom ? `Özel kumaş · ${custom}` : (value ? String(value) : '—');
  }

  function openingDirectionLabel(placement) {
    const normalized = normalizePlacement(placement, placement && placement.type);
    if (normalized.type === 'sliding') {
      if (normalized.openingType === 'CENTER OPENING') return lookupOptionLabel(PRODUCT_OPTIONS.sliding.centerLayers, normalized.openingDirection);
      return lookupOptionLabel(PRODUCT_OPTIONS.sliding.sideDirections, normalized.openingDirection);
    }
    if (normalized.type === 'folding') return lookupOptionLabel(PRODUCT_OPTIONS.folding.directions, normalized.openingDirection);
    if (normalized.type === 'guillotine') return lookupOptionLabel([['LEFT', 'Sol'], ['RIGHT', 'Sağ']], normalized.motorDirection);
    return '—';
  }

  function seriesLabel(value) {
    return lookupOptionLabel([['A SERIES', 'A Serisi'], ['K SERIES', 'K Serisi'], ['G SERIES', 'G Serisi'], ['P SERIES', 'P Serisi']], value);
  }

  function collectionStateLabel(value) {
    return String(value) === 'COLLECTED' ? 'Toplanmış göster' : 'Kapalı / normal görünüm';
  }

  function placementDetailLines(placement, zone) {
    const normalized = normalizePlacement(placement, placement && placement.type);
    const lines = [
      { label: 'Ürün', value: productTypeLabel(normalized) },
      { label: 'Net Alan', value: `${mmText(zone.width)} × ${mmText(zone.height)}` }
    ];
    if (normalized.type === 'folding') {
      lines.push(
        { label: 'Seri', value: seriesLabel(normalized.series) },
        { label: 'Tip', value: lookupOptionLabel(normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.folding.subtypesK : PRODUCT_OPTIONS.folding.subtypesA, normalized.subtype) },
        { label: 'Katlanma Yönü', value: openingDirectionLabel(normalized) },
        { label: 'Panel Sayısı', value: String(normalized.panels) },
        { label: 'Yaklaşık Panel Genişliği', value: mmText(zone.width / Math.max(1, normalized.panels)) },
        { label: 'Geçiş Kapısı', value: lookupOptionLabel(PRODUCT_OPTIONS.folding.passageDoors, normalized.passageDoor) },
        { label: 'Alt Profil', value: '70 mm · Eşikli' },
        { label: 'Cam Kalınlığı', value: lookupOptionLabel(normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.folding.thicknessK : PRODUCT_OPTIONS.folding.thicknessA, normalized.glassThickness) },
        { label: 'Cam Rengi', value: glassColorLabel(normalized.glassColor, normalized.customGlassColor) },
        { label: '3D Gösterim', value: collectionStateLabel(normalized.collectionState) }
      );
      foldingAdvisory(zone, normalized).forEach((warning) => lines.push({ label: 'Öneri Uyarısı', value: warning }));
    } else if (normalized.type === 'sliding') {
      lines.push(
        { label: 'Seri', value: seriesLabel(normalized.series) },
        { label: 'Tip', value: lookupOptionLabel(PRODUCT_OPTIONS.sliding.subtypes, normalized.subtype) },
        { label: 'Açılım Tipi', value: lookupOptionLabel(PRODUCT_OPTIONS.sliding.openings, normalized.openingType) },
        { label: normalized.openingType === 'CENTER OPENING' ? 'Dışta / İçte' : 'Açılım Yönü', value: openingDirectionLabel(normalized) },
        { label: 'Panel Sayısı', value: String(normalized.panels) },
        { label: 'Cam Kalınlığı', value: lookupOptionLabel((normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.sliding.thicknessK : PRODUCT_OPTIONS.sliding.thicknessA), normalized.glassThickness) },
        { label: 'Cam Rengi', value: glassColorLabel(normalized.glassColor, normalized.customGlassColor) },
        { label: '3D Gösterim', value: collectionStateLabel(normalized.collectionState) }
      );
    } else if (normalized.type === 'guillotine') {
      lines.push(
        { label: 'Seri', value: seriesLabel(normalized.series) },
        { label: 'Tip', value: lookupOptionLabel((normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.subtypesK : PRODUCT_OPTIONS.guillotine.subtypesA), normalized.subtype) },
        { label: 'Mekanizma', value: lookupOptionLabel((normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.mechanismsK : PRODUCT_OPTIONS.guillotine.mechanismsA), normalized.mechanism) },
        { label: 'Panel Tipi', value: String(normalized.panelType || '1+2') },
        { label: 'Motor Yönü', value: lookupOptionLabel([['LEFT', 'Sol'], ['RIGHT', 'Sağ']], normalized.motorDirection) },
        { label: 'Cam Kalınlığı', value: lookupOptionLabel((normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.thicknessK : PRODUCT_OPTIONS.guillotine.thicknessA), normalized.glassThickness) },
        { label: 'Cam Rengi', value: glassColorLabel(normalized.glassColor, normalized.customGlassColor) }
      );
      if (String(normalized.subtype) === 'CLEANABLE') {
        lines.push({ label: 'Alt Panel Modu', value: 'Vasistas' });
      }
      if (['UPWARD COLLECTING', 'DOWNWARD COLLECTING'].includes(String(normalized.subtype))) {
        lines.push({ label: '3D Gösterim', value: collectionStateLabel(normalized.collectionState) });
      }
    } else if (normalized.type === 'zip') {
      lines.push(
        { label: 'Seri', value: seriesLabel(normalized.series) },
        { label: 'Tip', value: lookupOptionLabel(normalized.series === 'P SERIES' ? PRODUCT_OPTIONS.zip.subtypesP : PRODUCT_OPTIONS.zip.subtypesG, normalized.subtype) },
        { label: 'Yerleşim', value: lookupOptionLabel(PRODUCT_OPTIONS.zip.placements, normalized.placementLocation) },
        { label: 'Kumaş', value: fabricColorLabel(normalized.fabricColor, normalized.customFabricColor) },
        { label: 'Kablo Yönü', value: lookupOptionLabel(PRODUCT_OPTIONS.zip.cableDirections, normalized.cableDirection) },
        { label: 'Motor Yönü', value: lookupOptionLabel([['LEFT', 'Sol'], ['RIGHT', 'Sağ']], normalized.motorDirection) }
      );
    } else if (normalized.type === 'fixed') {
      lines.push(
        { label: 'Cam Kalınlığı', value: lookupOptionLabel(PRODUCT_OPTIONS.sliding.thicknessA, normalized.glassThickness) },
        { label: 'Cam Rengi', value: glassColorLabel(normalized.glassColor, normalized.customGlassColor) },
        { label: 'Dikey Bölme', value: String(normalized.verticalDivisions) },
        { label: 'Yatay Bölme', value: String(normalized.horizontalDivisions) }
      );
      if (String(normalized.horizontalHeights || '').trim()) lines.push({ label: 'Yatay Dağılım', value: String(normalized.horizontalHeights) });
    } else if (normalized.type === 'door') {
      lines.push(
        { label: 'Kapı Tipi', value: doorTypeLabel(normalized.doorType) },
        { label: 'Menteşe', value: lookupOptionLabel(PRODUCT_OPTIONS.door.hinges, normalized.hingeDirection) },
        { label: 'Aktif Kanat', value: lookupOptionLabel(PRODUCT_OPTIONS.door.activeLeaves, normalized.activeLeaf) },
        { label: 'Açılım Yönü', value: lookupOptionLabel(PRODUCT_OPTIONS.door.openDirections, normalized.doorOpenDirection) },
        { label: 'Kol Tipi', value: lookupOptionLabel(PRODUCT_OPTIONS.door.handles, normalized.handleType) },
        { label: 'Cam Kalınlığı', value: lookupOptionLabel(PRODUCT_OPTIONS.sliding.thicknessA, normalized.glassThickness) },
        { label: 'Cam Rengi', value: glassColorLabel(normalized.glassColor, normalized.customGlassColor) }
      );
      if (DOOR_TOP_FIXED_TYPES.has(normalized.doorType)) lines.push({ label: 'Üst Sabit Yüksekliği', value: mmText(normalized.topFixedHeight) });
      if (Number(normalized.movingLeafHeight)) lines.push({ label: 'Hareketli Kanat Yüksekliği', value: mmText(normalized.movingLeafHeight) });
    }
    return lines;
  }

  function placementChangeLines(placement) {
    const normalized = normalizePlacement(placement, placement && placement.type);
    const defaultsForType = normalizePlacement(productDefaults(normalized.type), normalized.type);
    const diffs = [];
    const pushIfChanged = (label, currentValue, defaultValue) => {
      if (String(currentValue) !== String(defaultValue)) diffs.push(`${label}: ${currentValue}`);
    };
    if (normalized.type === 'folding') {
      pushIfChanged('Seri', seriesLabel(normalized.series), seriesLabel(defaultsForType.series));
      pushIfChanged('Tip', lookupOptionLabel(normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.folding.subtypesK : PRODUCT_OPTIONS.folding.subtypesA, normalized.subtype), lookupOptionLabel(PRODUCT_OPTIONS.folding.subtypesA, defaultsForType.subtype));
      pushIfChanged('Katlanma yönü', openingDirectionLabel(normalized), openingDirectionLabel(defaultsForType));
      pushIfChanged('Panel sayısı', normalized.panels, defaultsForType.panels);
      pushIfChanged('Geçiş kapısı', lookupOptionLabel(PRODUCT_OPTIONS.folding.passageDoors, normalized.passageDoor), lookupOptionLabel(PRODUCT_OPTIONS.folding.passageDoors, defaultsForType.passageDoor));
      pushIfChanged('Cam kalınlığı', normalized.glassThickness, defaultsForType.glassThickness);
      pushIfChanged('Cam rengi', glassColorLabel(normalized.glassColor, normalized.customGlassColor), glassColorLabel(defaultsForType.glassColor, defaultsForType.customGlassColor));
      pushIfChanged('3D gösterim', collectionStateLabel(normalized.collectionState), collectionStateLabel(defaultsForType.collectionState));
    } else if (normalized.type === 'sliding') {
      pushIfChanged('Seri', seriesLabel(normalized.series), seriesLabel(defaultsForType.series));
      pushIfChanged('Tip', lookupOptionLabel(PRODUCT_OPTIONS.sliding.subtypes, normalized.subtype), lookupOptionLabel(PRODUCT_OPTIONS.sliding.subtypes, defaultsForType.subtype));
      pushIfChanged('Açılım tipi', lookupOptionLabel(PRODUCT_OPTIONS.sliding.openings, normalized.openingType), lookupOptionLabel(PRODUCT_OPTIONS.sliding.openings, defaultsForType.openingType));
      pushIfChanged('Açılım yönü', openingDirectionLabel(normalized), openingDirectionLabel(defaultsForType));
      pushIfChanged('Panel sayısı', normalized.panels, defaultsForType.panels);
      pushIfChanged('Cam kalınlığı', normalized.glassThickness, defaultsForType.glassThickness);
      pushIfChanged('Cam rengi', glassColorLabel(normalized.glassColor, normalized.customGlassColor), glassColorLabel(defaultsForType.glassColor, defaultsForType.customGlassColor));
      pushIfChanged('3D gösterim', collectionStateLabel(normalized.collectionState), collectionStateLabel(defaultsForType.collectionState));
    } else if (normalized.type === 'guillotine') {
      pushIfChanged('Seri', seriesLabel(normalized.series), seriesLabel(defaultsForType.series));
      pushIfChanged('Tip', lookupOptionLabel((normalized.series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.subtypesK : PRODUCT_OPTIONS.guillotine.subtypesA), normalized.subtype), lookupOptionLabel(PRODUCT_OPTIONS.guillotine.subtypesA, defaultsForType.subtype));
      pushIfChanged('Mekanizma', normalized.mechanism, defaultsForType.mechanism);
      pushIfChanged('Panel tipi', normalized.panelType, defaultsForType.panelType);
      pushIfChanged('Motor yönü', normalized.motorDirection, defaultsForType.motorDirection);
      pushIfChanged('Cam kalınlığı', normalized.glassThickness, defaultsForType.glassThickness);
      pushIfChanged('Cam rengi', glassColorLabel(normalized.glassColor, normalized.customGlassColor), glassColorLabel(defaultsForType.glassColor, defaultsForType.customGlassColor));
      pushIfChanged('3D gösterim', collectionStateLabel(normalized.collectionState), collectionStateLabel(defaultsForType.collectionState));
    } else if (normalized.type === 'zip') {
      pushIfChanged('Seri', seriesLabel(normalized.series), seriesLabel(defaultsForType.series));
      pushIfChanged('Tip', normalized.subtype, defaultsForType.subtype);
      pushIfChanged('Yerleşim', lookupOptionLabel(PRODUCT_OPTIONS.zip.placements, normalized.placementLocation), lookupOptionLabel(PRODUCT_OPTIONS.zip.placements, defaultsForType.placementLocation));
      pushIfChanged('Kumaş', fabricColorLabel(normalized.fabricColor, normalized.customFabricColor), fabricColorLabel(defaultsForType.fabricColor, defaultsForType.customFabricColor));
      pushIfChanged('Kablo yönü', lookupOptionLabel(PRODUCT_OPTIONS.zip.cableDirections, normalized.cableDirection), lookupOptionLabel(PRODUCT_OPTIONS.zip.cableDirections, defaultsForType.cableDirection));
      pushIfChanged('Motor yönü', normalized.motorDirection, defaultsForType.motorDirection);
    } else if (normalized.type === 'fixed') {
      pushIfChanged('Cam kalınlığı', normalized.glassThickness, defaultsForType.glassThickness);
      pushIfChanged('Cam rengi', glassColorLabel(normalized.glassColor, normalized.customGlassColor), glassColorLabel(defaultsForType.glassColor, defaultsForType.customGlassColor));
      pushIfChanged('Dikey bölme', normalized.verticalDivisions, defaultsForType.verticalDivisions);
      pushIfChanged('Yatay bölme', normalized.horizontalDivisions, defaultsForType.horizontalDivisions);
      if (String(normalized.horizontalHeights || '') !== String(defaultsForType.horizontalHeights || '')) diffs.push(`Yatay dağılım: ${normalized.horizontalHeights || 'özel'}`);
    } else if (normalized.type === 'door') {
      pushIfChanged('Kapı tipi', doorTypeLabel(normalized.doorType), doorTypeLabel(defaultsForType.doorType));
      pushIfChanged('Menteşe', normalized.hingeDirection, defaultsForType.hingeDirection);
      pushIfChanged('Aktif kanat', normalized.activeLeaf, defaultsForType.activeLeaf);
      pushIfChanged('Açılım yönü', normalized.doorOpenDirection, defaultsForType.doorOpenDirection);
      pushIfChanged('Kol tipi', normalized.handleType, defaultsForType.handleType);
      pushIfChanged('Üst sabit yüksekliği', normalized.topFixedHeight, defaultsForType.topFixedHeight);
      pushIfChanged('Hareketli kanat yüksekliği', normalized.movingLeafHeight, defaultsForType.movingLeafHeight);
      pushIfChanged('Cam kalınlığı', normalized.glassThickness, defaultsForType.glassThickness);
      pushIfChanged('Cam rengi', glassColorLabel(normalized.glassColor, normalized.customGlassColor), glassColorLabel(defaultsForType.glassColor, defaultsForType.customGlassColor));
    }
    return diffs;
  }

  function createSubZoneReport(base, startU, endU, bottomY, topY, index, total, leftBoundaryId, rightBoundaryId, bottomBoundaryId, topBoundaryId, leftBoundaryWidth, rightBoundaryWidth) {
    const centerU = (startU + endU) / 2;
    const width = Math.max(0, endU - startU);
    const height = Math.max(0, topY - bottomY);
    const noProfiles = leftBoundaryId === 'START' && rightBoundaryId === 'END' && bottomBoundaryId === 'BOTTOM' && topBoundaryId === 'TOP';
    const id = noProfiles ? base.id : `${base.id}|${leftBoundaryId}-${rightBoundaryId}|${bottomBoundaryId}-${topBoundaryId}`;
    const cx = base.axis === 'x' ? base.cx + centerU : base.cx;
    const cz = base.axis === 'x' ? base.cz : base.cz + centerU;
    return {
      ...base,
      id,
      facadeId: base.id,
      label: noProfiles ? base.label : `${base.label} · Alan ${index + 1}`,
      cx,
      cz,
      width,
      height,
      bottomY,
      topY,
      baseWidth: base.width,
      baseHeight: base.height,
      startRatio: (startU + base.width / 2) / base.width,
      endRatio: (endU + base.width / 2) / base.width,
      bottomRatio: (bottomY - base.bottomY) / base.height,
      topRatio: (topY - base.bottomY) / base.height,
      leftBoundaryId,
      rightBoundaryId,
      leftBoundaryWidth: Math.max(0, Number(leftBoundaryWidth) || 0),
      rightBoundaryWidth: Math.max(0, Number(rightBoundaryWidth) || 0),
      bottomBoundaryId,
      topBoundaryId,
      areaIndex: index,
      areaCount: total
    };
  }

  function splitFacadeZonesForReport(base, facadeProfilesMap) {
    const raw = Array.isArray((facadeProfilesMap || {})[base.id]) ? (facadeProfilesMap || {})[base.id] : [];
    const profiles = raw.map((profile) => ({
      ...profile,
      orientation: profile.orientation === 'horizontal' ? 'horizontal' : 'vertical',
      width: Math.max(40, Number(profile.width) || 100),
      depth: Math.max(30, Number(profile.depth) || 100),
      positionRatio: Math.max(0.01, Math.min(0.99, Number(profile.positionRatio) || 0.5)),
      positionYRatio: Math.max(0.01, Math.min(0.99, Number(profile.positionYRatio) || 0.5))
    }));
    const verticals = profiles.filter((profile) => profile.orientation === 'vertical').sort((a, b) => a.positionRatio - b.positionRatio);
    const horizontals = profiles.filter((profile) => profile.orientation === 'horizontal');
    const boundaryWidthMap = Object.fromEntries(verticals.map((profile) => [profile.id, profile.width]));
    boundaryWidthMap.START = Math.max(0, Number(base.startBoundaryWidth) || 0);
    boundaryWidthMap.END = Math.max(0, Number(base.endBoundaryWidth) || 0);
    const strips = [];
    let cursor = -base.width / 2;
    let leftId = 'START';
    verticals.forEach((profile) => {
      const center = -base.width / 2 + profile.positionRatio * base.width;
      const left = Math.max(cursor, center - profile.width / 2);
      const right = Math.min(base.width / 2, center + profile.width / 2);
      strips.push({ start: cursor, end: left, leftId, rightId: profile.id });
      cursor = right;
      leftId = profile.id;
    });
    strips.push({ start: cursor, end: base.width / 2, leftId, rightId: 'END' });
    const cells = [];
    strips.filter((strip) => strip.end - strip.start >= 80).forEach((strip) => {
      const stripStartRatio = (strip.start + base.width / 2) / base.width;
      const stripEndRatio = (strip.end + base.width / 2) / base.width;
      const scoped = horizontals
        .filter((profile) => {
          const start = Number.isFinite(Number(profile.scopeStartRatio)) ? Number(profile.scopeStartRatio) : 0;
          const end = Number.isFinite(Number(profile.scopeEndRatio)) ? Number(profile.scopeEndRatio) : 1;
          return stripStartRatio >= start - 0.0001 && stripEndRatio <= end + 0.0001;
        })
        .sort((a, b) => a.positionYRatio - b.positionYRatio);
      let bottom = base.bottomY;
      let bottomId = 'BOTTOM';
      scoped.forEach((profile) => {
        const centerY = base.bottomY + profile.positionYRatio * base.height;
        const profileBottom = Math.max(bottom, centerY - profile.width / 2);
        const profileTop = Math.min(base.topY, centerY + profile.width / 2);
        cells.push({ startU: strip.start, endU: strip.end, bottomY: bottom, topY: profileBottom, leftId: strip.leftId, rightId: strip.rightId, bottomId, topId: profile.id });
        bottom = profileTop;
        bottomId = profile.id;
      });
      cells.push({ startU: strip.start, endU: strip.end, bottomY: bottom, topY: base.topY, leftId: strip.leftId, rightId: strip.rightId, bottomId, topId: 'TOP' });
    });
    const valid = cells.filter((cell) => cell.endU - cell.startU >= 80 && cell.topY - cell.bottomY >= 80);
    return valid.map((cell, index) => createSubZoneReport(base, cell.startU, cell.endU, cell.bottomY, cell.topY, index, valid.length, cell.leftId, cell.rightId, cell.bottomId, cell.topId, boundaryWidthMap[cell.leftId] || 0, boundaryWidthMap[cell.rightId] || 0));
  }

  function buildReportFacades(model) {
    const W = Number(model.width) || 0;
    const D = Number(model.depth) || 0;
    const H = Number(model.height) || 0;
    const p = Array.isArray(model.postSections) ? model.postSections.map((section) => ({ x: Number(section.x) || 0, z: Number(section.z) || 0 })) : [];
    const beamVertical = Number(model.beamSection && model.beamSection.vertical) || 0;
    const beamBottomY = H / 2 - beamVertical;
    const bottomY = -H / 2;
    const topY = beamBottomY;
    const height = Math.max(400, topY - bottomY);
    const frontStart = -W / 2 + p[0].x;
    const frontEnd = W / 2 - p[1].x;
    const backStart = -W / 2 + p[2].x;
    const backEnd = W / 2 - p[3].x;
    const leftStart = -D / 2 + p[0].z;
    const leftEnd = D / 2 - p[2].z;
    const rightStart = -D / 2 + p[1].z;
    const rightEnd = D / 2 - p[3].z;
    const frontFaceDepth = Math.max(p[0].z, p[1].z);
    const backFaceDepth = Math.max(p[2].z, p[3].z);
    const leftFaceDepth = Math.max(p[0].x, p[2].x);
    const rightFaceDepth = Math.max(p[1].x, p[3].x);
    const facades = [
      { id: 'front', label: 'Ön Cephe', axis: 'x', cx: (frontStart + frontEnd) / 2, cz: -D / 2 + frontFaceDepth / 2, width: frontEnd - frontStart, height, bottomY, topY, beamBottomY, startBoundaryWidth: p[0].x, endBoundaryWidth: p[1].x },
      { id: 'back', label: 'Arka Cephe', axis: 'x', cx: (backStart + backEnd) / 2, cz: D / 2 - backFaceDepth / 2, width: backEnd - backStart, height, bottomY, topY, beamBottomY, startBoundaryWidth: p[2].x, endBoundaryWidth: p[3].x },
      { id: 'left', label: 'Sol Cephe', axis: 'z', cx: -W / 2 + leftFaceDepth / 2, cz: (leftStart + leftEnd) / 2, width: leftEnd - leftStart, height, bottomY, topY, beamBottomY, startBoundaryWidth: p[0].z, endBoundaryWidth: p[2].z },
      { id: 'right', label: 'Sağ Cephe', axis: 'z', cx: W / 2 - rightFaceDepth / 2, cz: (rightStart + rightEnd) / 2, width: rightEnd - rightStart, height, bottomY, topY, beamBottomY, startBoundaryWidth: p[1].z, endBoundaryWidth: p[3].z }
    ];
    return facades.map((facade) => ({
      ...facade,
      zones: splitFacadeZonesForReport(facade, model.facadeProfiles || {}),
      profiles: Array.isArray((model.facadeProfiles || {})[facade.id]) ? (model.facadeProfiles || {})[facade.id].map((profile) => ({ ...profile })) : []
    }));
  }

  function quickTestProfile(id, orientation, positionRatio, options = {}) {
    if (orientation === 'horizontal') {
      return {
        id,
        orientation: 'horizontal',
        positionYRatio: Number(positionRatio),
        leftBoundaryId: options.leftBoundaryId || 'START',
        rightBoundaryId: options.rightBoundaryId || 'END',
        scopeStartRatio: Number.isFinite(Number(options.scopeStartRatio)) ? Number(options.scopeStartRatio) : 0,
        scopeEndRatio: Number.isFinite(Number(options.scopeEndRatio)) ? Number(options.scopeEndRatio) : 1,
        width: Number(options.width) || 100,
        depth: Number(options.depth) || 100,
        type: options.type || '100x100',
        label: options.label || `Yatay Profil ${Number(options.width) || 100} × ${Number(options.depth) || 100}`
      };
    }
    return {
      id,
      orientation: 'vertical',
      positionRatio: Number(positionRatio),
      width: Number(options.width) || 100,
      depth: Number(options.depth) || 100,
      type: options.type || '100x100',
      label: options.label || `Dikey Profil ${Number(options.width) || 100} × ${Number(options.depth) || 100}`
    };
  }

  function quickTestPlacement(type, overrides = {}) {
    return normalizePlacement({ ...productDefaults(type), ...overrides, type }, type);
  }

  function quickTestScenario(index) {
    const scenarios = {
      1: {
        description: 'Freedom · ön cephede merkez dışı dikey profil, katlanır cam + giyotin + zip ve dört cephe ürün kontrolü.',
        group: 'b-cube', width: 4000, panelCount: 25, height: 2700,
        systemColor: { code: 'RAL 7016', hex: '#383E42', finish: 'TEXTURE' },
        panelColor: { code: 'RAL 9016', hex: '#E7E8E2', finish: 'MATTE' },
        profiles: { front: [quickTestProfile('qt1v1', 'vertical', 0.34)] },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('folding', { series: 'A SERIES', subtype: 'STANDARD', openingDirection: 'LEFT', panels: 4, passageDoor: 'NO', glassColor: 'FUME', collectionState: 'NORMAL' }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('guillotine', { subtype: 'CLEANABLE', mechanism: 'CHAIN', panelType: '1+2', panels: 3, motorDirection: 'LEFT', glassColor: 'TRANSPARENT' }), zip: quickTestPlacement('zip', { series: 'G SERIES', subtype: '110x110 BOX', placementLocation: 'FRONT OF POSTS', motorDirection: 'RIGHT', cableDirection: 'TOP', fabricColor: '7635-52142' }) },
          { facade: 'back', zone: 0, primary: quickTestPlacement('sliding', { openingType: 'CENTER OPENING', openingDirection: 'OUTSIDE', panels: 6, glassColor: 'BRONZE' }) },
          { facade: 'left', zone: 0, primary: quickTestPlacement('fixed', { verticalDivisions: 2, horizontalDivisions: 2, horizontalHeights: '1050;1050', glassColor: 'FUME' }) },
          { facade: 'right', zone: 0, primary: quickTestPlacement('door', { doorType: 'TOP_FIXED', hingeDirection: 'RIGHT', doorOpenDirection: 'OUTWARD', topFixedHeight: 450, movingLeafHeight: 1900 }) }
        ]
      },
      2: {
        description: 'Freedom · yatay profil, K Seri katlanır cam sağa toplama ve geçiş kapısı, üst sabit kapı ve sabit doğrama.',
        group: 'b-cube', width: 3600, panelCount: 20, height: 2800,
        systemColor: { code: 'RAL 9005', hex: '#0A0A0D', finish: 'GLOSS' },
        panelColor: { code: 'RAL 1013', hex: '#E9E5CE', finish: 'TEXTURE' },
        profiles: { front: [quickTestProfile('qt2h1', 'horizontal', 0.58)] },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('door', { doorType: 'DOUBLE_TOP', activeLeaf: 'LEFT', doorOpenDirection: 'INWARD', handleType: 'PANIC', topFixedHeight: 520, movingLeafHeight: 1750, glassColor: 'BRONZE' }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('fixed', { verticalDivisions: 3, horizontalDivisions: 1, glassColor: 'TRANSPARENT' }) },
          { facade: 'back', zone: 0, zip: quickTestPlacement('zip', { series: 'P SERIES', subtype: '130x130 BOX', placementLocation: 'BETWEEN POSTS', cableDirection: 'BACK', motorDirection: 'LEFT', fabricColor: '92-2047' }) },
          { facade: 'left', zone: 0, primary: quickTestPlacement('folding', { series: 'K SERIES', subtype: 'STANDARD', panels: 5, openingDirection: 'RIGHT', passageDoor: 'YES', glassThickness: 'INSULATED GLASS', collectionState: 'COLLECTED' }) }
        ]
      },
      3: {
        description: 'Freedom · profilsiz dört cephe; 9 panelli otomatik iki yana katlanır cam, toplanan giyotin, P seri zip ve çift kanat üst sabit kapı.',
        group: 'b-cube', width: 4100, panelCount: 27, height: 2900,
        systemColor: { code: 'RAL 7035', hex: '#C5C7C4', finish: 'MATTE' },
        panelColor: { code: 'RAL 3005', hex: '#5E2028', finish: 'GLOSS' },
        profiles: {},
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('guillotine', { subtype: 'UPWARD COLLECTING', mechanism: 'BELT', panelType: '1+2', panels: 3, collectionState: 'COLLECTED', motorDirection: 'RIGHT', glassColor: 'LOW-E GLASS', glassThickness: 'INSULATED GLASS' }) },
          { facade: 'back', zone: 0, primary: quickTestPlacement('folding', { series: 'A SERIES', subtype: 'TOP-HUNG', openingDirection: 'RIGHT', panels: 9, passageDoor: 'YES', glassColor: 'FUME', collectionState: 'COLLECTED' }) },
          { facade: 'left', zone: 0, zip: quickTestPlacement('zip', { series: 'P SERIES', subtype: '115x115 BOX', placementLocation: 'FRONT OF POSTS', cableDirection: 'SIDE', motorDirection: 'LEFT', fabricColor: '86-2043' }) },
          { facade: 'right', zone: 0, primary: quickTestPlacement('door', { doorType: 'DOUBLE_BOTH_FIXED_TOP', activeLeaf: 'RIGHT', doorOpenDirection: 'OUTWARD', topFixedHeight: 500, movingLeafHeight: 1950, glassColor: 'FUME' }) }
        ]
      },
      4: {
        description: 'Freedom · iki dikey profil ve orta alanda yatay profil; profil sonrası genişlik/yükseklik aralıkları düzenlenmiş çok alan testi.',
        group: 'b-cube', width: 4600, panelCount: 30, height: 3000,
        systemColor: { code: 'RAL 8019', hex: '#3B3332', finish: 'TEXTURE' },
        panelColor: { code: 'RAL 9006', hex: '#7C7D7F', finish: 'GLOSS' },
        profiles: {
          front: [
            quickTestProfile('qt4v1', 'vertical', 0.27),
            quickTestProfile('qt4v2', 'vertical', 0.68),
            quickTestProfile('qt4h1', 'horizontal', 0.61, { leftBoundaryId: 'qt4v1', rightBoundaryId: 'qt4v2', scopeStartRatio: 0.27, scopeEndRatio: 0.68 })
          ]
        },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('sliding', { panels: 3, openingDirection: 'LEFT', glassColor: 'BRONZE' }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('fixed', { verticalDivisions: 1, horizontalDivisions: 2, horizontalHeights: '950;850' }) },
          { facade: 'front', zone: 2, primary: quickTestPlacement('door', { doorType: 'SINGLE', hingeDirection: 'LEFT', movingLeafHeight: 2100 }) },
          { facade: 'front', zone: 3, primary: quickTestPlacement('guillotine', { subtype: 'DOWNWARD COLLECTING', panelType: '1+1', panels: 2, collectionState: 'COLLECTED', motorDirection: 'LEFT' }) },
          { facade: 'back', zone: 0, zip: quickTestPlacement('zip', { subtype: 'HERCULE', placementLocation: 'FRONT OF POSTS', fabricColor: '7635-52107' }) }
        ]
      },
      5: {
        description: 'Freedom · özel/döndürülmüş dikmeler, sol ve sağ cephede düzenlenmiş profil aralıkları, tüm ürün tipleri.',
        group: 'b-cube', width: 4300, panelCount: 26, height: 2750,
        systemColor: { code: 'RAL 6005', hex: '#0F4336', finish: 'MATTE' },
        panelColor: { code: 'RAL 9010', hex: '#F1ECE1', finish: 'TEXTURE' },
        postSections: [{ x: 220, z: 100 }, { x: 100, z: 100 }, { x: 120, z: 180 }, { x: 180, z: 120 }],
        profiles: { left: [quickTestProfile('qt5lv1', 'vertical', 0.42)], right: [quickTestProfile('qt5rv1', 'vertical', 0.63)] },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('guillotine', { subtype: 'CLEANABLE', mechanism: 'BELT', motorDirection: 'RIGHT', glassColor: 'FUME' }) },
          { facade: 'back', zone: 0, primary: quickTestPlacement('sliding', { openingType: 'CENTER OPENING', openingDirection: 'OUTSIDE', panels: 8 }) },
          { facade: 'left', zone: 0, primary: quickTestPlacement('door', { doorType: 'LEFT_FIXED_TOP', hingeDirection: 'RIGHT', topFixedHeight: 400, movingLeafHeight: 1950 }) },
          { facade: 'left', zone: 1, zip: quickTestPlacement('zip', { subtype: '110x110 BOX', motorDirection: 'LEFT', fabricColor: '7635-52176' }) },
          { facade: 'right', zone: 0, primary: quickTestPlacement('fixed', { verticalDivisions: 2, horizontalDivisions: 3, horizontalHeights: '700;700;700' }) },
          { facade: 'right', zone: 1, primary: quickTestPlacement('sliding', { panels: 2, openingDirection: 'RIGHT' }) }
        ]
      },
      6: {
        description: 'Bio-Rise · ön cephede merkez dışı dikey profil, sürme ve giyotin; arka/yan cephelerde kapı, sabit ve zip.',
        group: 'bio-rise', width: 3800, panelCount: 25, height: 3000,
        systemColor: { code: 'RAL 7024', hex: '#45494E', finish: 'TEXTURE' },
        panelColor: { code: 'RAL 9016', hex: '#E7E8E2', finish: 'GLOSS' },
        profiles: { front: [quickTestProfile('qt6v1', 'vertical', 0.41)] },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('sliding', { subtype: 'WITHOUT THRESHOLD', panels: 3, openingDirection: 'LEFT', glassColor: 'TRANSPARENT' }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('guillotine', { subtype: 'CLEANABLE', mechanism: 'CHAIN', motorDirection: 'RIGHT', glassColor: 'BRONZE' }) },
          { facade: 'back', zone: 0, primary: quickTestPlacement('door', { doorType: 'RIGHT_FIXED_TOP', hingeDirection: 'LEFT', topFixedHeight: 480, movingLeafHeight: 2050 }) },
          { facade: 'left', zone: 0, primary: quickTestPlacement('fixed', { verticalDivisions: 2, horizontalDivisions: 2, horizontalHeights: '1100;1100' }) },
          { facade: 'right', zone: 0, zip: quickTestPlacement('zip', { series: 'G SERIES', subtype: '100x100 BOX', placementLocation: 'BETWEEN POSTS', motorDirection: 'LEFT', fabricColor: '92-2171' }) }
        ]
      },
      7: {
        description: 'Bio-Rise · ön cephede ayarlanmış yatay profil; üst sabit kapı, sabit doğrama ve dört cephede motor/yön kontrolleri.',
        group: 'bio-rise', width: 4000, panelCount: 28, height: 3200,
        systemColor: { code: 'RAL 9007', hex: '#8F8B81', finish: 'GLOSS' },
        panelColor: { code: 'RAL 7032', hex: '#B5B0A1', finish: 'MATTE' },
        profiles: { front: [quickTestProfile('qt7h1', 'horizontal', 0.64)] },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('door', { doorType: 'BOTH_FIXED_TOP', doorOpenDirection: 'INWARD', handleType: 'PANIC', topFixedHeight: 520, movingLeafHeight: 1900 }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('fixed', { verticalDivisions: 3, horizontalDivisions: 1, glassColor: 'FUME' }) },
          { facade: 'back', zone: 0, zip: quickTestPlacement('zip', { series: 'P SERIES', subtype: '130x130 BOX', cableDirection: 'TOP', motorDirection: 'RIGHT', fabricColor: 'W88-2047' }) },
          { facade: 'left', zone: 0, primary: quickTestPlacement('guillotine', { subtype: 'UPWARD COLLECTING', mechanism: 'BELT', collectionState: 'COLLECTED', motorDirection: 'LEFT' }) },
          { facade: 'right', zone: 0, primary: quickTestPlacement('sliding', { openingType: 'CENTER OPENING', openingDirection: 'INSIDE', panels: 6, glassColor: 'BRONZE' }) }
        ]
      },
      8: {
        description: 'Bio-Rise · iki dikey ve bir yatay ara profil; düzenlenmiş çoklu alt alanlarda sürme, kapı, giyotin, sabit ve zip.',
        group: 'bio-rise', width: 4500, panelCount: 32, height: 3400,
        systemColor: { code: 'RAL 5008', hex: '#293133', finish: 'TEXTURE' },
        panelColor: { code: 'RAL 1015', hex: '#E6D2B5', finish: 'GLOSS' },
        profiles: {
          front: [
            quickTestProfile('qt8v1', 'vertical', 0.31),
            quickTestProfile('qt8v2', 'vertical', 0.73),
            quickTestProfile('qt8h1', 'horizontal', 0.55, { leftBoundaryId: 'qt8v1', rightBoundaryId: 'qt8v2', scopeStartRatio: 0.31, scopeEndRatio: 0.73 })
          ]
        },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('sliding', { panels: 4, openingDirection: 'RIGHT' }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('door', { doorType: 'TOP_FIXED', topFixedHeight: 450, movingLeafHeight: 2000 }) },
          { facade: 'front', zone: 2, primary: quickTestPlacement('guillotine', { subtype: 'CLEANABLE', motorDirection: 'LEFT', glassColor: 'FUME' }) },
          { facade: 'front', zone: 3, primary: quickTestPlacement('fixed', { verticalDivisions: 1, horizontalDivisions: 2, horizontalHeights: '1000;900' }), zip: quickTestPlacement('zip', { placementLocation: 'FRONT OF POSTS', fabricColor: '7635-52105' }) },
          { facade: 'back', zone: 0, primary: quickTestPlacement('sliding', { openingType: 'CENTER OPENING', openingDirection: 'OUTSIDE', panels: 8 }) }
        ]
      },
      9: {
        description: 'Freedom · ürün açık/kapalı ve panel durumları; toplanmış sürme/giyotin ile zip panel görünürlüğü hızlı kontrolü.',
        group: 'b-cube', width: 3900, panelCount: 24, height: 2650,
        systemColor: { code: 'RAL 3020', hex: '#CC0605', finish: 'GLOSS' },
        panelColor: { code: 'RAL 9005', hex: '#0A0A0D', finish: 'TEXTURE' },
        profiles: { front: [quickTestProfile('qt9v1', 'vertical', 0.5)] },
        panelMasterOpen: false,
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('sliding', { panels: 5, collectionState: 'COLLECTED', openingDirection: 'LEFT' }), open: false },
          { facade: 'front', zone: 1, primary: quickTestPlacement('guillotine', { subtype: 'DOWNWARD COLLECTING', collectionState: 'COLLECTED', motorDirection: 'RIGHT' }), zip: quickTestPlacement('zip', { placementLocation: 'FRONT OF POSTS', fabricColor: '86-2171' }), zipOpen: false },
          { facade: 'back', zone: 0, primary: quickTestPlacement('door', { doorType: 'DOUBLE', activeLeaf: 'LEFT', doorOpenDirection: 'INWARD' }) }
        ]
      },
      10: {
        description: 'Bio-Rise maksimum üstü stres senaryosu · tüm cephelerde profiller, düzenlenmiş aralıklar, renk/yüzey ve yoğun ürün yerleşimi.',
        group: 'bio-rise', width: 4700, panelCount: 34, height: 3500,
        systemColor: { code: 'RAL 6018', hex: '#397A36', finish: 'MATTE' },
        panelColor: { code: 'RAL 2004', hex: '#E25303', finish: 'TEXTURE' },
        profiles: {
          front: [quickTestProfile('qt10fv1', 'vertical', 0.36), quickTestProfile('qt10fh1', 'horizontal', 0.6, { leftBoundaryId: 'qt10fv1', rightBoundaryId: 'END', scopeStartRatio: 0.36, scopeEndRatio: 1 })],
          back: [quickTestProfile('qt10bv1', 'vertical', 0.58)],
          left: [quickTestProfile('qt10lv1', 'vertical', 0.44)],
          right: [quickTestProfile('qt10rv1', 'vertical', 0.67)]
        },
        assignments: [
          { facade: 'front', zone: 0, primary: quickTestPlacement('folding', { series: 'A SERIES', subtype: 'STANDARD', panels: 7, openingDirection: 'BOTH', passageDoor: 'YES', glassColor: 'BRONZE', collectionState: 'COLLECTED' }) },
          { facade: 'front', zone: 1, primary: quickTestPlacement('guillotine', { subtype: 'UPWARD COLLECTING', collectionState: 'COLLECTED', motorDirection: 'LEFT' }) },
          { facade: 'front', zone: 2, primary: quickTestPlacement('door', { doorType: 'DOUBLE_TOP', topFixedHeight: 500, movingLeafHeight: 2100 }) },
          { facade: 'back', zone: 0, primary: quickTestPlacement('fixed', { verticalDivisions: 2, horizontalDivisions: 2, horizontalHeights: '1200;1000' }) },
          { facade: 'back', zone: 1, zip: quickTestPlacement('zip', { series: 'P SERIES', subtype: '115x115 BOX', placementLocation: 'FRONT OF POSTS', cableDirection: 'SIDE', fabricColor: 'W88-8102' }) },
          { facade: 'left', zone: 0, primary: quickTestPlacement('door', { doorType: 'LEFT_FIXED_RIGHT_MOVING', hingeDirection: 'RIGHT' }) },
          { facade: 'left', zone: 1, primary: quickTestPlacement('sliding', { openingType: 'CENTER OPENING', panels: 6 }) },
          { facade: 'right', zone: 0, primary: quickTestPlacement('guillotine', { subtype: 'CLEANABLE', mechanism: 'BELT', motorDirection: 'RIGHT' }) },
          { facade: 'right', zone: 1, primary: quickTestPlacement('fixed', { verticalDivisions: 3, horizontalDivisions: 1 }), zip: quickTestPlacement('zip', { subtype: 'HERCULE', placementLocation: 'FRONT OF POSTS', fabricColor: '7635-52144' }) }
        ]
      }
    };
    return scenarios[index] || scenarios[1];
  }

  function resetQuickTestState(config) {
    const spec = activeProductSpec(config.group);
    modelState.productGroup = config.group;
    modelState.width = Math.round(Number(config.width));
    modelState.panelCount = Math.round(Number(config.panelCount));
    modelState.depth = projectionFromPanelCount(modelState.panelCount, config.group);
    modelState.height = Math.round(Number(config.height));
    modelState.orientations = [0, 0, 0, 0];
    modelState.postSections = Array.isArray(config.postSections)
      ? config.postSections.map((section) => ({ x: Number(section.x), z: Number(section.z) }))
      : Array.from({ length: 4 }, () => ({ ...spec.postSection }));
    modelState.beamSection = { ...spec.beamSection };
    modelState.placements = {};
    modelState.zipPlacements = {};
    modelState.facadeProfiles = JSON.parse(JSON.stringify(config.profiles || {}));
    modelState.productsOpen = true;
    modelState.productOpenStates = {};
    modelState.panelStates = {};
    modelState.panelMasterOpen = config.panelMasterOpen !== false;
    modelState.colorMode = 'ral';
    modelState.systemColor = { ...config.systemColor };
    modelState.panelColor = { ...config.panelColor };
    selectedZone = null;
    selectedZoneId = null;
    viewerCameraState = null;
    toolboxSelectionMode = null;
    toolboxSelectionItems.clear();
    dimensionVisibility = { intermediate: true, main: true };
    profileSequence = 1000 + Number(config.index || 0) * 10;
  }

  function assignQuickTestProducts(config) {
    const facades = buildReportFacades(readModel());
    (config.assignments || []).forEach((assignment) => {
      const facade = facades.find((item) => item.id === assignment.facade);
      if (!facade || !facade.zones.length) return;
      const zone = facade.zones[Math.max(0, Math.min(facade.zones.length - 1, Number(assignment.zone) || 0))];
      if (assignment.primary) {
        modelState.placements[zone.id] = JSON.parse(JSON.stringify(assignment.primary));
        if (assignment.open === false) modelState.productOpenStates[zone.id] = false;
      }
      if (assignment.zip) {
        modelState.zipPlacements[zone.id] = JSON.parse(JSON.stringify(assignment.zip));
        const key = zipProductKey(zone.id);
        if (assignment.zipOpen === false) modelState.productOpenStates[key] = false;
        modelState.panelStates[key] = assignment.zipOpen !== false;
      }
    });
  }

  function syncQuickTestControls() {
    if ($(ids.productGroup)) $(ids.productGroup).value = modelState.productGroup;
    $(ids.freedomWidth).value = String(modelState.width);
    $(ids.freedomDepth).value = String(modelState.depth);
    $(ids.freedomHeight).value = String(modelState.height);
    $(ids.freedomPanelCount).value = String(modelState.panelCount);
    $(ids.toolboxIntermediateDimensions).checked = Boolean(dimensionVisibility.intermediate);
    $(ids.toolboxMainDimensions).checked = Boolean(dimensionVisibility.main);
    $(ids.panelMaster).checked = Boolean(modelState.panelMasterOpen);
    updateProductInputUi();
    updateColorControls();
    updateToolbox();
  }

  function applyQuickTestScenario(index) {
    const config = { ...quickTestScenario(index), index };
    cancelToolboxSelection();
    resetQuickTestState(config);
    assignQuickTestProducts(config);
    syncQuickTestControls();
    renderViewer();
    document.querySelectorAll('.quick-test-grid button').forEach((button) => button.classList.toggle('is-active', button.id === `quickTestBtn${index}`));
    if ($(ids.quickTestStatus)) {
      $(ids.quickTestStatus).textContent = `Test ${index} hazır: ${config.description}`;
    }
    showRecommendedLimitWarnings({ width: modelState.width, depth: modelState.depth, panelCount: modelState.panelCount });
  }

  function profileSummary(profile) {
    if (!profile) return 'Ara profil';
    const direction = profile.orientation === 'horizontal' ? 'Yatay' : 'Dikey';
    return `${direction} · ${Number(profile.width) || 0} × ${Number(profile.depth) || 0} mm`;
  }

  function modelChangeLines(model) {
    const spec = activeProductSpec(model.productGroup);
    const postDefault = spec.postSection;
    const changes = [];
    (model.postSections || []).forEach((section, index) => {
      if (!section) return;
      if (Number(section.x) !== Number(postDefault.x) || Number(section.z) !== Number(postDefault.z)) {
        changes.push(`${postName(index)}: ${Number(section.x)} × ${Number(section.z)} mm`);
      }
    });
    const entryMap = new Map(allProductEntries().map((entry) => [entry.key, entry]));
    Object.entries(model.productOpenStates || {}).forEach(([key, open]) => {
      if (Boolean(open) === Boolean(model.productsOpen)) return;
      const entry = entryMap.get(key);
      if (!entry) return;
      changes.push(`${productZoneLabel(entry.zoneId, entry.placement, 0)} görünümü: ${open ? 'Açık' : 'Kapalı'}`);
    });
    if (model.colorMode === 'ral') {
      changes.push(`Sistem rengi: ${model.systemColor.code} · ${finishLabel(model.systemColor.finish)}`);
      changes.push(`Panel rengi: ${model.panelColor.code} · ${finishLabel(model.panelColor.finish)}`);
    }
    return changes;
  }

  function fallbackPdfView(preset) {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const context = canvas.getContext('2d');
    const model = readModel();
    const labels = {
      'front-left': 'Ön Sol Üst Görünüş',
      'front-right': 'Ön Sağ Üst Görünüş',
      'back-left': 'Arka Sol Üst Görünüş',
      'back-right': 'Arka Sağ Üst Görünüş'
    };
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#334155');
    gradient.addColorStop(1, '#0f172a');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#7dd3fc';
    context.lineWidth = 4;
    context.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);
    context.fillStyle = '#e0f2fe';
    context.font = '700 44px Segoe UI, Arial';
    context.fillText(labels[preset] || '3D Görünüş', 85, 135);
    context.fillStyle = '#bfdbfe';
    context.font = '600 31px Segoe UI, Arial';
    context.fillText(productModelLabel(model.productGroup), 85, 205);
    context.font = '500 27px Segoe UI, Arial';
    context.fillText(`Genişlik ${model.width} mm · Açılım ${model.depth} mm · Yükseklik ${model.height} mm`, 85, 260);
    context.fillText(`${model.panelCount || model.lamellaCount} panel · 3D viewer görüntüsü yüklenemediğinde güvenli PDF yedeği`, 85, 310);
    context.fillStyle = '#94a3b8';
    context.font = '500 22px Segoe UI, Arial';
    context.fillText('Gerçek 3D görüntü, viewer hazır olduğunda otomatik olarak bu alanın yerine alınır.', 85, 625);
    return { preset, dataUrl: canvas.toDataURL('image/jpeg', 0.9), width: canvas.width, height: canvas.height, fallback: true };
  }

  function collectPdfViews() {
    const frame = $(ids.frame);
    const viewerWindow = frame && frame.contentWindow;
    const presets = ['front-left', 'front-right', 'back-left', 'back-right'];
    return presets.map((preset) => {
      try {
        if (viewerWindow && typeof viewerWindow.captureFreedom3D === 'function') {
          const capture = viewerWindow.captureFreedom3D(preset);
          if (capture && capture.dataUrl) return { preset, ...capture };
        }
      } catch (error) {
        console.warn('PDF görünüşü yedek görselle oluşturuldu.', preset, error);
      }
      return fallbackPdfView(preset);
    });
  }

  function pdfFileName(model) {
    const spec = activeProductSpec(model.productGroup);
    return `${spec.modelLabel.replace(/\s+/g, '-')}-${model.width}x${model.depth}x${model.height}-urun-listesi.pdf`;
  }

  function hasMeaningfulReportValue(value) {
    if (Array.isArray(value)) return value.some((item) => hasMeaningfulReportValue(item));
    if (value == null) return false;
    const text = String(value).trim();
    if (!text) return false;
    return !['—', 'Yok', 'None'].includes(text);
  }

  function filterReportRows(rows) {
    return (Array.isArray(rows) ? rows : []).filter((row) => row && hasMeaningfulReportValue(row.value));
  }

  function systemInfoSections(model) {
    const spec = activeProductSpec(model.productGroup);
    const sections = [];
    sections.push({
      title: 'Ana Sistem · Project Details',
      rows: filterReportRows([
        { label: 'Ürün Ailesi', value: 'Bioclimatic' },
        { label: 'Ürün Grubu', value: spec.groupLabel },
        { label: 'Ürün Alt Grup', value: spec.subgroupLabel },
        { label: 'Module', value: 'Modul 1' },
        { label: 'Width', value: mmText(model.width) },
        { label: 'Projection', value: mmText(model.depth) },
        { label: 'Height', value: mmText(model.height) },
        { label: 'Panel Sayısı', value: String(model.panelCount || model.lamellaCount || '') }
      ])
    });
    sections.push({
      title: 'Ana Sistem · Color Details',
      rows: filterReportRows([
        { label: 'Renk Modu', value: model.colorMode === 'ral' ? 'RAL' : 'Default' },
        { label: 'Sistem Rengi', value: model.colorMode === 'ral' ? `${model.systemColor.code} · ${finishLabel(model.systemColor.finish)}` : 'Klasik Sistem Paleti' },
        { label: 'Panel Rengi', value: model.colorMode === 'ral' ? `${model.panelColor.code} · ${finishLabel(model.panelColor.finish)}` : 'Klasik Panel Yeşili' },
        { label: 'Paneller', value: model.panelMasterOpen ? 'Açık' : 'Kapalı' },
        { label: 'Ürünler', value: model.productsOpen ? 'Açık' : 'Kapalı' }
      ])
    });
    const changes = modelChangeLines(model);
    if (changes.length) {
      sections.push({
        title: 'Ana Sistem · Değişiklik Özeti',
        rows: [{ label: 'Değişiklikler', value: changes.join(' | ') }]
      });
    }
    return sections;
  }

  function placementReportRows(placement, zone, prefix) {
    const lines = placementDetailLines(placement, zone).map((line) => ({ label: line.label, value: line.value }));
    const rows = filterReportRows(lines);
    const changes = placementChangeLines(placement);
    if (changes.length) rows.push({ label: 'Yapılan Değişiklikler', value: changes.join(' | ') });
    return rows.map((row, index) => ({
      label: index === 0 && prefix ? `${prefix} · ${row.label}` : row.label,
      value: row.value
    }));
  }

  function buildFacadeSections(model) {
    const sections = [];
    buildReportFacades(model).forEach((facade) => {
      const zoneSections = [];
      facade.zones.forEach((zone) => {
        const primary = model.placements[zone.id];
        const zip = model.zipPlacements[zone.id];
        if (!primary && !zip) return;
        const baseRows = filterReportRows([
          { label: 'Cephe', value: facade.label },
          { label: 'Alan', value: zone.label },
          { label: 'Cephe Net Ölçüsü', value: `${mmText(facade.width)} × ${mmText(facade.height)}` },
          { label: 'Net Alan', value: `${mmText(zone.width)} × ${mmText(zone.height)}` },
          { label: 'Ara Profiller', value: facade.profiles.length ? facade.profiles.map((profile) => profileSummary(profile)).join(' | ') : '' }
        ]);
        if (primary) {
          zoneSections.push({
            title: `${zone.label} · Ana Ürün`,
            rows: baseRows.concat(placementReportRows(primary, zone, 'Ana Ürün'))
          });
        }
        if (zip) {
          zoneSections.push({
            title: `${zone.label} · Zip Perde`,
            rows: baseRows.concat(placementReportRows({ ...zip, type: 'zip' }, zone, 'Zip Perde'))
          });
        }
      });
      sections.push(...zoneSections);
    });
    if (!sections.length) {
      sections.push({
        title: 'Cephe Ürünleri',
        rows: [{ label: 'Durum', value: 'Yerleştirilmiş cephe ürünü bulunmuyor.' }]
      });
    }
    return sections;
  }

  function drawContainedImage(pdf, view, boxX, boxY, boxW, boxH) {
    pdf.setDrawColor(206, 216, 230);
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(boxX, boxY, boxW, boxH, 3, 3, 'FD');
    if (!view || !view.dataUrl || !view.width || !view.height) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(71, 85, 105);
      pdf.text('Görsel alınamadı', boxX + 8, boxY + 12);
      return;
    }
    const scale = Math.min(boxW / view.width, boxH / view.height);
    const drawW = view.width * scale;
    const drawH = view.height * scale;
    const drawX = boxX + (boxW - drawW) / 2;
    const drawY = boxY + (boxH - drawH) / 2;
    pdf.addImage(view.dataUrl, 'JPEG', drawX, drawY, drawW, drawH);
  }

  function estimateSectionHeight(pdf, rows, width, labelWidth) {
    let total = 10;
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      const value = row && row.value != null && row.value !== '' ? String(row.value) : '—';
      const valueLines = pdf.splitTextToSize(value, width - labelWidth - 8);
      total += Math.max(7, valueLines.length * 4.4 + 2);
    });
    return total + 6;
  }

  function drawSectionTable(pdf, title, rows, y, margin, width) {
    const safeRows = filterReportRows(rows);
    if (!safeRows.length) return y;
    const labelWidth = 58;
    const contentWidth = width - 10;
    const estimatedHeight = estimateSectionHeight(pdf, safeRows, contentWidth, labelWidth);
    if (y + estimatedHeight > 285) {
      pdf.addPage();
      y = 14;
    }
    pdf.setFillColor(234, 241, 250);
    pdf.setDrawColor(196, 210, 227);
    pdf.roundedRect(margin, y, width, estimatedHeight, 3, 3, 'FD');
    pdf.setFillColor(219, 231, 247);
    pdf.roundedRect(margin, y, width, 10, 3, 3, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(19, 48, 84);
    pdf.text(title, margin + 4, y + 6.7);
    let cursorY = y + 15;
    safeRows.forEach((row, index) => {
      const valueText = String(row.value);
      const valueLines = pdf.splitTextToSize(valueText, contentWidth - labelWidth - 8);
      const rowHeight = Math.max(7, valueLines.length * 4.4 + 2);
      if (index > 0) {
        pdf.setDrawColor(212, 222, 235);
        pdf.line(margin + 4, cursorY - 2, margin + width - 4, cursorY - 2);
      }
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.2);
      pdf.setTextColor(15, 23, 42);
      pdf.text(String(row.label || 'Bilgi'), margin + 4, cursorY + 2.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(31, 41, 55);
      pdf.text(valueLines, margin + 4 + labelWidth, cursorY + 2.5);
      cursorY += rowHeight;
    });
    return y + estimatedHeight + 6;
  }

  async function exportProductListPdf() {
    pruneProductStates();
    const model = readModel();
    if (!modelReady(model)) {
      window.alert('Önce geçerli bir 3D model oluşturun.');
      return;
    }
    const button = $(ids.exportProductListPdf);
    const originalLabel = button ? button.textContent : '';
    if (button) {
      button.disabled = true;
      button.textContent = 'PDF Hazırlanıyor…';
    }
    try {
      const jsPdfApi = window.jspdf && window.jspdf.jsPDF;
      if (!jsPdfApi) throw new Error('jsPDF yüklenemedi. İnternet bağlantısını kontrol edin.');
      const pdf = new jsPdfApi({ orientation: 'p', unit: 'mm', format: 'a4' });
      const margin = 10;
      const pageWidth = 210;
      const usableWidth = pageWidth - margin * 2;
      const views = collectPdfViews();
      const captions = {
        'front-left': 'Ön sol üst görünüş',
        'front-right': 'Ön sağ üst görünüş',
        'back-left': 'Arka sol üst görünüş',
        'back-right': 'Arka sağ üst görünüş'
      };
      const groups = [views.slice(0, 2), views.slice(2, 4)];
      groups.forEach((group, pageIndex) => {
        if (pageIndex > 0) pdf.addPage();
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(17, 36, 66);
        pdf.text('Ürün Listesi PDF', margin, 14);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(31, 41, 55);
        const subtitle = `${productModelLabel(model.productGroup)} · ${mmText(model.width)} × ${mmText(model.depth)} × ${mmText(model.height)} · ${model.panelCount || model.lamellaCount} panel`;
        pdf.text(subtitle, margin, 20);
        let y = 28;
        group.forEach((view) => {
          const boxX = margin;
          const boxY = y;
          const boxW = usableWidth;
          const boxH = 104;
          drawContainedImage(pdf, view, boxX, boxY, boxW, boxH);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9.4);
          pdf.setTextColor(15, 23, 42);
          pdf.text(captions[view.preset] || 'Görünüş', boxX + 2, boxY + boxH + 5);
          y += boxH + 12;
        });
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8.5);
        pdf.text(`Görsel sayfa ${pageIndex + 1} · Görseller daha geniş açı ve oran korunarak yerleştirildi.`, margin, 288);
      });

      pdf.addPage();
      let y = 14;
      systemInfoSections(model).forEach((section) => {
        y = drawSectionTable(pdf, section.title, section.rows, y, margin, usableWidth);
      });
      buildFacadeSections(model).forEach((section) => {
        y = drawSectionTable(pdf, section.title, section.rows, y, margin, usableWidth);
      });
      pdf.save(pdfFileName(model));
    } catch (error) {
      console.error('Ürün listesi PDF üretimi başarısız oldu.', error);
      window.alert(`Ürün listesi PDF oluşturulamadı: ${error.message}`);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalLabel || 'Ürün Listesi PDF';
      }
    }
  }

  function doorTypeSilhouetteSvg(type) {
    const stroke = '#0f172a';
    const frame = '#475569';
    const fixed = '#cbd5e1';
    const moving = '#93c5fd';
    const accent = '#22c55e';
    const leafWidth = 1000;
    const sideFixedWidth = 1000;
    const leafHeight = 2500;
    const topFixedHeight = 500;
    const maxWidth = 4000;
    const maxHeight = leafHeight + topFixedHeight;
    const margin = 140;
    const hasTopFixed = DOOR_TOP_FIXED_TYPES.has(type);
    const segments = [];
    const addMoving = (hinge) => segments.push({ width: leafWidth, kind: 'moving', hinge });
    const addFixed = () => segments.push({ width: sideFixedWidth, kind: 'fixed' });

    if (type === 'SINGLE' || type === 'TOP_FIXED') {
      addMoving('LEFT');
    } else if (type === 'DOUBLE' || type === 'DOUBLE_TOP') {
      addMoving('LEFT'); addMoving('RIGHT');
    } else if (type === 'LEFT_FIXED_RIGHT_MOVING' || type === 'LEFT_FIXED_TOP') {
      addFixed(); addMoving('RIGHT');
    } else if (type === 'RIGHT_FIXED_LEFT_MOVING' || type === 'RIGHT_FIXED_TOP') {
      addMoving('LEFT'); addFixed();
    } else if (type === 'BOTH_FIXED_TOP') {
      addFixed(); addMoving('LEFT'); addFixed();
    } else if (type === 'DOUBLE_LEFT_FIXED' || type === 'DOUBLE_LEFT_FIXED_TOP') {
      addFixed(); addMoving('LEFT'); addMoving('RIGHT');
    } else if (type === 'DOUBLE_RIGHT_FIXED_TOP') {
      addMoving('LEFT'); addMoving('RIGHT'); addFixed();
    } else if (type === 'DOUBLE_BOTH_FIXED_TOP') {
      addFixed(); addMoving('LEFT'); addMoving('RIGHT'); addFixed();
    } else {
      addMoving('LEFT');
    }

    const totalWidth = segments.reduce((sum, segment) => sum + segment.width, 0);
    const totalHeight = leafHeight + (hasTopFixed ? topFixedHeight : 0);
    const originX = margin + (maxWidth - totalWidth) / 2;
    const originY = margin + (maxHeight - totalHeight);
    const leafY = originY + (hasTopFixed ? topFixedHeight : 0);
    const inset = 45;
    const strokeWidth = 58;

    const swingArrow = (x, width, hinge) => {
      const insetX = Math.max(120, width * 0.18);
      const startX = hinge === 'RIGHT' ? x + width - insetX : x + insetX;
      const endX = hinge === 'RIGHT' ? x + insetX + 40 : x + width - insetX - 40;
      const startY = leafY + leafHeight - 300;
      const endY = leafY + 520;
      const radius = Math.max(320, Math.min(560, width * .46));
      const sweep = hinge === 'RIGHT' ? 0 : 1;
      const head = hinge === 'RIGHT'
        ? `<path d="M ${endX} ${endY} l 92 -14 M ${endX} ${endY} l 34 84" stroke="${accent}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none" />`
        : `<path d="M ${endX} ${endY} l -92 -14 M ${endX} ${endY} l -34 84" stroke="${accent}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none" />`;
      return `<circle cx="${startX}" cy="${startY}" r="34" fill="${accent}" />`
        + `<path d="M ${startX} ${startY} A ${radius} ${radius} 0 0 ${sweep} ${endX} ${endY}" stroke="${accent}" stroke-width="40" stroke-linecap="round" fill="none" />`
        + head;
    };

    let panes = '';
    let cursor = originX;
    segments.forEach((segment) => {
      const fill = segment.kind === 'moving' ? moving : fixed;
      panes += `<rect x="${cursor + inset}" y="${leafY + inset}" width="${segment.width - inset * 2}" height="${leafHeight - inset * 2}" rx="42" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
      if (segment.kind === 'moving') panes += swingArrow(cursor, segment.width, segment.hinge);
      cursor += segment.width;
    });

    const topBand = hasTopFixed
      ? `<rect x="${originX + inset}" y="${originY + inset}" width="${totalWidth - inset * 2}" height="${topFixedHeight - inset * 2}" rx="42" fill="${fixed}" stroke="${stroke}" stroke-width="${strokeWidth}" />`
      : '';
    return `<svg viewBox="0 0 ${maxWidth + margin * 2} ${maxHeight + margin * 2}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">`
      + `<rect x="${originX}" y="${originY}" width="${totalWidth}" height="${totalHeight}" rx="55" fill="none" stroke="${frame}" stroke-width="82" />`
      + topBand + panes + '</svg>';
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

  function openProductFabricCatalog() {
    const picker = $(ids.productFabricPicker);
    const trigger = $(ids.productFabricTrigger);
    if (!picker || $(ids.productType).value !== 'zip') return;
    renderFabricCards($(ids.productFabric).value);
    picker.hidden = false;
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    const first = $(ids.productFabricCards).querySelector('.fabric-page-hotspot.is-selected') || $(ids.productFabricCards).querySelector('.fabric-page-hotspot');
    if (first && first.focus) first.focus();
  }

  function closeProductFabricCatalog() {
    const picker = $(ids.productFabricPicker);
    const trigger = $(ids.productFabricTrigger);
    if (picker) picker.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
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

  function doorTopFixedAvailableHeight(zone) {
    if (!zone) return null;
    const fittedHeight = Math.max(120, Number(zone.height || 0) - 5);
    return Math.max(0, Math.round(fittedHeight - 87));
  }

  function doorTopFixedMetrics(zone, movingLeafHeight, fallbackTopFixedHeight = 500) {
    const availableHeight = doorTopFixedAvailableHeight(zone);
    const fallbackFixed = Math.max(250, Math.min(1200, Math.round(Number(fallbackTopFixedHeight) || 500)));
    const fallbackMoving = availableHeight === null ? 2200 : Math.max(600, availableHeight - fallbackFixed);
    const requestedMoving = Number.isFinite(Number(movingLeafHeight)) ? Math.round(Number(movingLeafHeight)) : fallbackMoving;
    if (availableHeight === null) {
      return {
        fixedHeight: fallbackFixed,
        movingHeight: Math.max(1200, requestedMoving),
        minMovingHeight: 1200,
        maxMovingHeight: null,
        availableHeight: null
      };
    }
    const minMovingHeight = Math.max(1200, availableHeight - 1200);
    const maxMovingHeight = Math.max(minMovingHeight, availableHeight - 250);
    const movingHeight = Math.max(minMovingHeight, Math.min(maxMovingHeight, requestedMoving));
    const fixedHeight = Math.max(250, availableHeight - movingHeight);
    return { fixedHeight, movingHeight, minMovingHeight, maxMovingHeight, availableHeight };
  }

  function updateDoorTopFixedSummary() {
    const isTopFixed = $(ids.productType).value === 'door' && DOOR_TOP_FIXED_TYPES.has($(ids.productDoorType).value);
    setHidden(ids.productDoorHeightSummaryWrap, !isTopFixed);
    if (!isTopFixed) return;
    const zone = activeZone || (bulkProductZones && bulkProductZones[0]) || null;
    const seed = currentProductDraft();
    const metrics = doorTopFixedMetrics(zone, $(ids.productDoorTopFixedHeight).value, seed.topFixedHeight);
    $(ids.productDoorTopFixedHeight).min = String(metrics.minMovingHeight);
    if (metrics.maxMovingHeight === null) $(ids.productDoorTopFixedHeight).removeAttribute('max');
    else $(ids.productDoorTopFixedHeight).max = String(metrics.maxMovingHeight);
    $(ids.productDoorTopFixedHeight).value = String(metrics.movingHeight);
    $(ids.productDoorFixedHeightValue).textContent = `${metrics.fixedHeight} mm`;
    $(ids.productDoorMovingHeightValue).textContent = `${metrics.movingHeight} mm`;
  }

  function currentProductDraft() {
    const type = $(ids.productType).value;
    const colorValue = normalizeGlassColor($(ids.productGlassColor).value);
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
      fabricColor: $(ids.productFabric).value,
      customFabricColor: '',
      panels: Number($(ids.productPanels).value),
      passageDoor: $(ids.productFoldingPassage).value,
      verticalDivisions: Number($(ids.productFixedVerticalCount).value),
      horizontalDivisions: Number($(ids.productFixedHorizontalCount).value),
      horizontalHeights: $(ids.productFixedHorizontalHeights).value,
      doorType: $(ids.productDoorType).value,
      hingeDirection: $(ids.productDoorHinge).value,
      activeLeaf: $(ids.productDoorActiveLeaf).value,
      doorOpenDirection: $(ids.productDoorOpenDirection).value,
      handleType: $(ids.productDoorHandleType).value,
      movingLeafHeight: Number($(ids.productDoorTopFixedHeight).value),
      topFixedHeight: null,
      panelType: $(ids.productPanelType).value,
      cableDirection: $(ids.productPanelType).value,
      motorDirection: $(ids.productMotorDirection).value,
      view: $(ids.productView).value,
      motorType: $(ids.productMotorType).value,
      remoteControl: $(ids.productRemote).value,
      bottomPanelMode: $(ids.bottomPanelMode).value,
      bottomPanelState: $(ids.bottomPanelState).value,
      bottomPanelHinge: $(ids.bottomPanelHinge).value,
      collectionState: type === 'folding' ? $(ids.foldingCollectionState).value : (type === 'sliding' ? $(ids.slidingCollectionState).value : $(ids.collectingDisplayState).value)
    };
  }

  function updateFoldingFormAdvisory() {
    if ($(ids.productType).value !== 'folding') return;
    const panels = Math.max(2, Math.round(Number($(ids.productPanels).value) || 2));
    const zone = activeZone || (bulkProductZones && bulkProductZones[0]) || null;
    if (panels > 8) {
      $(ids.productDirection).value = 'BOTH';
      $(ids.productDirection).disabled = true;
    } else {
      $(ids.productDirection).disabled = false;
    }
    const draft = { type: 'folding', panels, openingDirection: $(ids.productDirection).value };
    const warnings = foldingAdvisory(zone, draft);
    if ($(ids.foldingRuleNote)) {
      $(ids.foldingRuleNote).textContent = warnings.length
        ? warnings.join(' ')
        : 'Otomatik hedef panel genişliği 600 mm. Tek tarafa önerilen maksimum 8 paneldir.';
    }
  }

  function applyProductRules(seed) {
    const type = $(ids.productType).value;
    const draft = { ...productDefaults(type), ...(seed || currentProductDraft()), type };
    const isFolding = type === 'folding';
    const isGuillotine = type === 'guillotine';
    const isZip = type === 'zip';
    const isFixed = type === 'fixed';
    const isDoor = type === 'door';
    const standardSeries = [
      ['A SERIES', 'A Serisi'],
      ['K SERIES', 'K Serisi']
    ];
    const glassColors = GLASS_COLOR_OPTIONS;

    setDoorFieldsHidden(true);
    setHidden(ids.productFoldingPassageWrap, true);
    setHidden(ids.foldingCollectionSection, true);
    if ($(ids.productDirection)) $(ids.productDirection).disabled = false;
    if ($(ids.productDoorTypeCards)) $(ids.productDoorTypeCards).innerHTML = '';

    if (isDoor) {
      fillSelect($(ids.productDoorType), PRODUCT_OPTIONS.door.types, draft.doorType);
      $(ids.productDoorTypeValue).textContent = doorTypeLabel($(ids.productDoorType).value);
      renderDoorTypeCards(draft.doorType);
      fillSelect($(ids.productDoorHinge), PRODUCT_OPTIONS.door.hinges, draft.hingeDirection);
      fillSelect($(ids.productDoorActiveLeaf), PRODUCT_OPTIONS.door.activeLeaves, draft.activeLeaf);
      fillSelect($(ids.productDoorOpenDirection), PRODUCT_OPTIONS.door.openDirections, draft.doorOpenDirection);
      fillSelect($(ids.productDoorHandleType), PRODUCT_OPTIONS.door.handles, draft.handleType);
      fillSelect($(ids.productGlassThickness), PRODUCT_OPTIONS.sliding.thicknessA, compatibleGlassThickness('door', 'A SERIES', draft.glassThickness, draft.glassColor));
      fillSelect($(ids.productGlassColor), glassColors, draft.glassColor);
      const doorType = $(ids.productDoorType).value;
      const doorZone = activeZone || (bulkProductZones && bulkProductZones[0]) || null;
      const doorMetrics = doorTopFixedMetrics(doorZone, draft.movingLeafHeight, draft.topFixedHeight);
      $(ids.productDoorTopFixedHeight).value = String(doorMetrics.movingHeight);
      $(ids.productDoorTopFixedHeight).min = String(doorMetrics.minMovingHeight);
      if (doorMetrics.maxMovingHeight === null) $(ids.productDoorTopFixedHeight).removeAttribute('max');
      else $(ids.productDoorTopFixedHeight).max = String(doorMetrics.maxMovingHeight);
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
      fillSelect($(ids.productGlassThickness), PRODUCT_OPTIONS.sliding.thicknessA, compatibleGlassThickness('fixed', 'A SERIES', draft.glassThickness, draft.glassColor));
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
      fillSelect($(ids.productPanelType), PRODUCT_OPTIONS.zip.cableDirections, draft.cableDirection);

      setHidden(ids.productPlacementWrap, false);
      setHidden(ids.productMechanismWrap, true);
      setHidden(ids.productOpeningWrap, true);
      setHidden(ids.productDirectionWrap, true);
      setHidden(ids.productGlassThicknessWrap, true);
      setHidden(ids.productGlassColorWrap, true);
      setHidden(ids.productFabricWrap, false);
      setHidden(ids.productPanelsWrap, true);
      setHidden(ids.productPanelTypeWrap, false);
      setHidden(ids.productMotorDirectionWrap, false);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      setHidden(ids.cleanableWindowSection, true);
      setHidden(ids.collectingDisplaySection, true);
      setHidden(ids.slidingCollectionSection, true);
      setHidden(ids.productCustomGlassWrap, true);

      $(ids.productPanelTypeLabel).textContent = 'Kablo Çıkış Yönü';
      setProductFabricValue(draft.fabricColor);
      renderFabricCards(draft.fabricColor);
      $(ids.productMotorDirection).value = draft.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
      $(ids.productView).value = 'OUTSIDE VIEW';
      $(ids.productPanels).min = '1';
      $(ids.productPanels).max = '1';
      $(ids.productPanels).value = '1';
      $(ids.productPanels).disabled = true;
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
    setHidden(ids.productFabricWrap, true);
    $(ids.productGlassColorLabel).textContent = 'Cam Rengi';
    $(ids.productCustomGlassLabel).textContent = 'Özel Cam Rengi';

    if (isFolding) {
      const foldingZone = activeZone || (bulkProductZones && bulkProductZones[0]) || null;
      const existingFolding = activeZone && primaryPlacement(activeZone.id) && primaryPlacement(activeZone.id).type === 'folding'
        ? primaryPlacement(activeZone.id)
        : null;
      const automaticPanels = foldingPanelCountForWidth(foldingZone && foldingZone.width);
      const selectedPanels = existingFolding
        ? Math.max(2, Math.round(Number(draft.panels) || automaticPanels))
        : automaticPanels;
      fillSelect($(ids.productSubtype), series === 'K SERIES' ? PRODUCT_OPTIONS.folding.subtypesK : PRODUCT_OPTIONS.folding.subtypesA, draft.subtype);
      fillSelect($(ids.productDirection), PRODUCT_OPTIONS.folding.directions, foldingDirectionForPanels(selectedPanels, draft.openingDirection));
      fillSelect($(ids.productGlassThickness), series === 'K SERIES' ? PRODUCT_OPTIONS.folding.thicknessK : PRODUCT_OPTIONS.folding.thicknessA, compatibleGlassThickness('folding', series, draft.glassThickness, draft.glassColor));
      fillSelect($(ids.productFoldingPassage), PRODUCT_OPTIONS.folding.passageDoors, draft.passageDoor);
      setHidden(ids.productMechanismWrap, true);
      setHidden(ids.productOpeningWrap, true);
      setHidden(ids.productDirectionWrap, false);
      setHidden(ids.productPanelsWrap, false);
      setHidden(ids.productFoldingPassageWrap, false);
      setHidden(ids.productPanelTypeWrap, true);
      setHidden(ids.productMotorDirectionWrap, true);
      setHidden(ids.productViewWrap, true);
      setHidden(ids.productMotorTypeWrap, true);
      setHidden(ids.productRemoteWrap, true);
      setHidden(ids.cleanableWindowSection, true);
      setHidden(ids.collectingDisplaySection, true);
      setHidden(ids.slidingCollectionSection, true);
      setHidden(ids.foldingCollectionSection, false);
      $(ids.productDirectionLabel).textContent = 'Katlanma Yönü';
      $(ids.productPanels).min = '2';
      $(ids.productPanels).removeAttribute('max');
      $(ids.productPanels).value = String(selectedPanels);
      $(ids.productPanelHint).textContent = 'Otomatik: net genişlik / 600 mm · önerilen tek taraf maksimum 8 panel';
      $(ids.foldingCollectionState).value = draft.collectionState === 'COLLECTED' ? 'COLLECTED' : 'NORMAL';
      updateFoldingFormAdvisory();
    } else if (isGuillotine) {
      fillSelect($(ids.productSubtype), series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.subtypesK : PRODUCT_OPTIONS.guillotine.subtypesA, draft.subtype);
      fillSelect($(ids.productMechanism), series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.mechanismsK : PRODUCT_OPTIONS.guillotine.mechanismsA, draft.mechanism);
      fillSelect($(ids.productGlassThickness), series === 'K SERIES' ? PRODUCT_OPTIONS.guillotine.thicknessK : PRODUCT_OPTIONS.guillotine.thicknessA, compatibleGlassThickness('guillotine', series, draft.glassThickness, draft.glassColor));
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
      $(ids.productMotorDirection).value = draft.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
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
      fillSelect($(ids.productGlassThickness), series === 'K SERIES' ? PRODUCT_OPTIONS.sliding.thicknessK : PRODUCT_OPTIONS.sliding.thicknessA, compatibleGlassThickness('sliding', series, draft.glassThickness, draft.glassColor));
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
    $(ids.productGlassColor).value = normalized.glassColor;
    setProductFabricValue(normalized.fabricColor);
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
    closeProductFabricCatalog();
    activeProductSlot = type === 'zip' ? 'zip' : 'primary';
    const candidate = activeProductSlot === 'zip' ? zipPlacement(activeZone.id) : primaryPlacement(activeZone.id);
    const existing = candidate && candidate.type === type ? candidate : null;
    loadProductFields(existing || productDefaults(type));
    updateProductRemoveButton();
  }

  function openProductDialog(zone, zones) {
    closeDoorTypePicker();
    closeProductFabricCatalog();
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
    closeProductFabricCatalog();
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
    } else if (draft.type === 'folding') {
      if (!Number.isInteger(draft.panels) || draft.panels < 2) return 'Katlanır cam panel sayısı en az 2 ve tam sayı olmalıdır.';
      if (!['LEFT', 'RIGHT', 'BOTH'].includes(draft.openingDirection)) return 'Katlanma yönünü seçin.';
      if (draft.panels > 8 && draft.openingDirection !== 'BOTH') draft.openingDirection = 'BOTH';
      if (!['YES', 'NO'].includes(draft.passageDoor)) return 'Geçiş kapısı seçimini yapın.';
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
      if (!zipFabricByCode(draft.fabricColor)) return 'Zip Perde kumaşı seçin.';
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
          const availableHeight = doorTopFixedAvailableHeight(zone);
          const movingHeight = Math.round(Number(draft.movingLeafHeight));
          const fixedHeight = availableHeight === null ? NaN : availableHeight - movingHeight;
          if (!Number.isFinite(movingHeight) || movingHeight < 1200 || fixedHeight < 250 || fixedHeight > 1200) {
            const minMoving = availableHeight === null ? 1200 : Math.max(1200, availableHeight - 1200);
            const maxMoving = availableHeight === null ? '—' : Math.max(minMoving, availableHeight - 250);
            return `${zone.label}: Hareketli kapı kanadı yüksekliği ${minMoving}–${maxMoving} mm arasında olmalıdır.`;
          }
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
      draft.movingLeafHeight = Math.max(1200, Math.round(Number(draft.movingLeafHeight) || 2200));
      draft.topFixedHeight = null;
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
    } else if (draft.type === 'folding') {
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
      delete draft.verticalDivisions;
      delete draft.horizontalDivisions;
      delete draft.horizontalHeights;
      draft.openingType = 'FOLDING';
      draft.openingDirection = foldingDirectionForPanels(draft.panels, draft.openingDirection);
      draft.passageDoor = draft.passageDoor === 'YES' ? 'YES' : 'NO';
      draft.collectionState = draft.collectionState === 'COLLECTED' ? 'COLLECTED' : 'NORMAL';
      draft.thresholdProfile = 70;
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
      draft.motorDirection = draft.motorDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
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
      draft.fabricColor = zipFabricByCode(draft.fabricColor).value;
      draft.customFabricColor = '';
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
    rememberGlassPreferencesFromDraft(draft);
    const targetZones = bulkProductZones && bulkProductZones.length ? bulkProductZones : [activeZone];
    targetZones.forEach((zone) => {
      if (draft.type === 'zip') {
        modelState.zipPlacements[zone.id] = JSON.parse(JSON.stringify(draft));
        const key = zipProductKey(zone.id);
        if (!hasOwn(modelState.productOpenStates, key)) modelState.productOpenStates[key] = true;
        modelState.panelStates[key] = effectiveProductOpen(key);
      } else {
        const placementDraft = JSON.parse(JSON.stringify(draft));
        if (placementDraft.type === 'door' && DOOR_TOP_FIXED_TYPES.has(placementDraft.doorType)) {
          const metrics = doorTopFixedMetrics(zone, placementDraft.movingLeafHeight, placementDraft.topFixedHeight);
          placementDraft.movingLeafHeight = metrics.movingHeight;
          placementDraft.topFixedHeight = metrics.fixedHeight;
        }
        modelState.placements[zone.id] = placementDraft;
        if (!hasOwn(modelState.productOpenStates, zone.id)) modelState.productOpenStates[zone.id] = true;
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
    if (!window.confirm('Yerleştirilmiş tüm sürme, katlanır cam, giyotin, Zip Perde, Sabit Doğrama ve Kapı ürünleri silinsin mi?')) return;
    modelState.placements = {};
    modelState.zipPlacements = {};
    modelState.productOpenStates = {};
    modelState.panelStates = {};
    updateToolbox();
    renderViewer();
  }

  window.addEventListener('message', (event) => {
    if (!event.data || event.data.source !== 'product-3d-viewer') return;
    if (event.data.type === 'ar-status') {
      setMobileArStatus(event.data.message || 'AR durumu güncellendi.', event.data.tone || '');
    }
    if (event.data.type === 'ar-capability') {
      const button = $(ids.mobileAr);
      if (button) button.disabled = false;
      setMobileArStatus(event.data.message || (event.data.supported ? 'AR hazır.' : 'AR desteği bulunamadı.'), event.data.supported ? 'success' : 'warning');
    }
    if (event.data.type === 'ar-session-ended') {
      const button = $(ids.mobileAr);
      if (button) button.disabled = false;
      setMobileArStatus('AR oturumu kapatıldı. 3D model görünümüne dönüldü.');
    }
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

  function buildViewerHtml({ productGroup, width, depth, height, lamellaCount, orientations, postSections, beamSection, placements, zipPlacements, facadeProfiles, colorMode, systemColor, panelColor, cameraState, selectedZoneId: activeZoneId, dimensionVisibility: showDimensionVisibility, productsOpen, productOpenStates, panelStates, panelMasterOpen, toolboxSelectionMode: activeSelectionMode, toolboxSelectionKeys: activeSelectionKeys }) {
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
    const zipFabricMeta = {};
    ZIP_FABRIC_CATALOG.forEach((section) => section.pages.forEach((page) => page.items.forEach((item) => {
      const embeddedTextureMap = window.P3DV_ZIP_FABRIC_TEXTURES || {};
      zipFabricMeta[item.value] = {
        image: page.image,
        texture: item.texture || '',
        textureData: embeddedTextureMap[item.value] || '',
        tone: item.tone || '',
        tileMm: Number(item.tileMm) || 500,
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height
      };
    })));
    const zipFabricMetaJson = JSON.stringify(zipFabricMeta);
    const systemColorValue = Number.parseInt(normalizeHexColor(systemColor && systemColor.hex, defaults.systemColor.hex).slice(1), 16);
    const panelColorValue = Number.parseInt(normalizeHexColor(panelColor && panelColor.hex, defaults.panelColor.hex).slice(1), 16);

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
[hidden]{display:none!important}
body.ar-active{background:transparent}
body.ar-active #viewerHint{display:none}
#arLaunchGate{position:absolute;inset:0;z-index:70;display:grid;place-items:center;padding:24px;background:rgba(5,15,25,.82);backdrop-filter:blur(8px)}
#arLaunchGate .ar-gate-card{width:min(430px,calc(100% - 32px));padding:20px;border:1px solid rgba(125,211,252,.4);border-radius:16px;background:rgba(15,23,42,.94);box-shadow:0 18px 60px rgba(0,0,0,.35);text-align:center}
#arLaunchGate strong{display:block;margin-bottom:8px;font-size:18px;color:#f8fafc}
#arLaunchGate p{margin:0 0 14px;color:#bfdbfe;font-size:13px;line-height:1.55}
#arLaunchGate button,#arOverlay button{border:1px solid rgba(255,255,255,.26);border-radius:9px;background:#0f766e;color:#fff;padding:9px 10px;font:600 12px Segoe UI,Arial,sans-serif;touch-action:manipulation}
#arLaunchGate button.ghost,#arOverlay button.ghost{background:rgba(15,23,42,.78)}
#arOverlay{position:absolute;inset:0;z-index:65;pointer-events:none;color:#f8fafc}
#arScaleBadge{position:absolute;left:12px;top:12px;max-width:calc(100% - 24px);padding:9px 11px;border:1px solid rgba(94,234,212,.5);border-radius:10px;background:rgba(6,78,75,.82);font-size:12px;line-height:1.4;backdrop-filter:blur(5px)}
#arTrackingStatus{position:absolute;left:12px;right:12px;top:58px;padding:9px 11px;border:1px solid rgba(125,211,252,.35);border-radius:10px;background:rgba(15,23,42,.78);font-size:12px;line-height:1.45;text-align:center;backdrop-filter:blur(5px)}
#arControlPanel{position:absolute;left:8px;right:8px;bottom:8px;max-height:56%;padding:9px;border:1px solid rgba(125,211,252,.28);border-radius:13px;background:rgba(15,23,42,.84);backdrop-filter:blur(8px);pointer-events:auto;overflow:auto}
.ar-control-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;justify-content:center}
.ar-control-row+ .ar-control-row{margin-top:7px}
.ar-control-row button{flex:1 1 82px;min-width:68px}
.ar-control-row button.primary{background:#0f766e}
.ar-control-row button.warning{background:#92400e}
.ar-control-row button:disabled{opacity:.45}
.ar-rotate-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}
.ar-rotate-row button{min-width:0}
.ar-control-section{margin-top:8px;padding-top:8px;border-top:1px solid rgba(148,163,184,.22)}
.ar-control-section>strong{display:block;margin-bottom:6px;color:#bfdbfe;font-size:11px;text-align:center}
.ar-move-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;max-width:330px;margin:0 auto}
.ar-move-grid .blank{visibility:hidden}
#arGroundRow{display:grid;grid-template-columns:auto 1fr auto auto;gap:6px;align-items:center}
#arGroundOffsetInput{width:100%;accent-color:#2dd4bf}
#arGroundValue{min-width:52px;text-align:center;font:700 11px Segoe UI,Arial,sans-serif;color:#ccfbf1}
@media (orientation:landscape){
  #arTrackingStatus{left:12px;right:338px;top:58px}
  #arControlPanel{left:auto;right:8px;top:8px;bottom:8px;width:310px;max-height:none}
  #arScaleBadge{max-width:calc(100% - 350px)}
}
body.ar-landscape #arTrackingStatus{left:12px;right:338px;top:58px}
body.ar-landscape #arControlPanel{left:auto;right:8px;top:8px;bottom:8px;width:310px;max-height:none}
body.ar-landscape #arScaleBadge{max-width:calc(100% - 350px)}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></scr` + `ipt>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></scr` + `ipt>
</head>
<body>
<div id="fallback">3D viewer could not load. Three.js is loaded from a CDN.</div>
<div id="viewerHint">Dikmeler arasındaki boşluğa tıklayın. Bir ürün panelini açıp kapatmak için çift tıklayın.</div>
<div id="arLaunchGate" hidden>
  <div class="ar-gate-card">
    <strong>Manuel Gerçek Alan Yerleşimi</strong>
    <p>Kamera açıldığında ürün 1:1 ölçekte hemen çizilir. Zemin kotunu, mesafeyi, yönü ve konumu ekrandaki kontrollerle kendiniz ayarlarsınız.</p>
    <button id="arLaunchGateBtn" type="button">Kamerayı Aç</button>
    <button id="arLaunchGateCancelBtn" class="ghost" type="button">Vazgeç</button>
  </div>
</div>
<div id="arOverlay" hidden>
  <div id="arScaleBadge">Gerçek Ölçek 1:1</div>
  <div id="arTrackingStatus">Ürün hazırlanıyor; gerçek ölçekte kameranın önüne çizilecek.</div>
  <div id="arControlPanel">
    <div class="ar-control-row">
      <button id="arLockBtn" class="primary" type="button">Konumu Sabitle</button>
      <button id="arRepositionBtn" type="button" disabled>Yeniden Konumlandır</button>
      <button id="arLandscapeBtn" type="button">Yatay Kamera</button>
    </div>
    <div class="ar-control-section">
      <strong>Konum · Her dokunuş 10 cm</strong>
      <div class="ar-move-grid">
        <span class="blank"></span><button id="arMoveForwardBtn" type="button">↑ İleri</button><span class="blank"></span>
        <button id="arMoveLeftBtn" type="button">← Sol</button><button id="arMoveBackBtn" type="button">↓ Geri</button><button id="arMoveRightBtn" type="button">Sağ →</button>
      </div>
    </div>
    <div class="ar-control-section">
      <strong>Zemin Kotu · 1 cm hassasiyet</strong>
      <div id="arGroundRow">
        <button id="arMoveDownBtn" type="button">-1 cm</button>
        <input id="arGroundOffsetInput" type="range" min="-150" max="150" step="1" value="0" aria-label="Zemin kotu santimetre" />
        <span id="arGroundValue">0 cm</span>
        <button id="arMoveUpBtn" type="button">+1 cm</button>
      </div>
      <div class="ar-control-row"><button id="arGroundZeroBtn" type="button">Zemin Kotunu Sıfırla</button></div>
    </div>
    <div class="ar-control-section">
      <strong>Döndürme</strong>
      <div class="ar-control-row ar-rotate-row">
        <button id="arRotateFineLeftBtn" type="button">↶ 1°</button>
        <button id="arRotateLeftBtn" type="button">↶ 15°</button>
        <button id="arRotateRightBtn" type="button">15° ↷</button>
        <button id="arRotateFineRightBtn" type="button">1° ↷</button>
      </div>
    </div>
    <div class="ar-control-section"><div class="ar-control-row"><button id="arExitBtn" class="warning" type="button">AR Kapat</button></div></div>
  </div>
</div>
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
const SYSTEM_COLOR=${systemColorValue};
const PANEL_COLOR=${panelColorValue};
const DEFAULT_COLOR_MODE=${JSON.stringify(colorMode !== 'ral')};
const SYSTEM_FINISH=${JSON.stringify(modelState.systemColor.finish)};
const PANEL_FINISH=${JSON.stringify(modelState.panelColor.finish)};
const ZIP_FABRIC_META=${zipFabricMetaJson};
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
if('outputColorSpace' in renderer && THREE.SRGBColorSpace)renderer.outputColorSpace=THREE.SRGBColorSpace;
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

scene.add(new THREE.AmbientLight(0xffffff,.6));
scene.add(new THREE.HemisphereLight(0xe8f0ff,0x102033,.36));
const dir=new THREE.DirectionalLight(0xffffff,1.02);
dir.position.set(W*.35,H*1.1,D*.45);
dir.castShadow=true;
scene.add(dir);
const fill=new THREE.DirectionalLight(0x88aaff,.42);
fill.position.set(-W*.45,H*.55,-D*.5);
scene.add(fill);
const rim=new THREE.DirectionalLight(0xffffff,.45);
rim.position.set(-W*.7,H*.85,D*.9);
scene.add(rim);
const warm=new THREE.DirectionalLight(0xffe8c9,.18);
warm.position.set(W*.1,H*.35,-D*.95);
scene.add(warm);

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

const AR_METERS_PER_MM=0.001;
const AR_DEFAULT_EYE_HEIGHT=1.45;
const AR_MOVE_STEP=.10;
const AR_HEIGHT_STEP=.01;
const arRoot=new THREE.Group();
arRoot.visible=false;
scene.add(arRoot);
let arSession=null;
let arReferenceSpace=null;
let arPlacementInitialized=false;
let arPlacementLocked=false;
let arBaseYaw=0;
let arYawOffset=0;
let arBaseGroundY=0;
let arGroundOffset=0;
let arLastStatusAt=0;
let arLandscapeMode=false;
const arManualPosition=new THREE.Vector3();
const arLastCameraPosition=new THREE.Vector3();
const arCameraForward=new THREE.Vector3();
const arCameraRight=new THREE.Vector3();
let arRestoreCameraNear=camera.near;
let arRestoreCameraFar=camera.far;

function postArStatus(message,tone){
  parent.postMessage({source:'product-3d-viewer',type:'ar-status',message:String(message||''),tone:tone||''},'*');
}

function isLikelyIosDevice(){
  return /iPad|iPhone|iPod/i.test(navigator.userAgent||'') || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);
}

async function getArCapabilities(){
  if(!window.isSecureContext){
    return {supported:false,reason:'secure-context',message:'AR için uygulama HTTPS üzerinden açılmalıdır. Dosyayı doğrudan file:// ile açmak yeterli değildir.'};
  }
  if(!navigator.xr || typeof navigator.xr.isSessionSupported!=='function'){
    const ios=isLikelyIosDevice();
    return {supported:false,reason:ios?'ios-webxr':'webxr-missing',message:ios?'Bu iPhone/iPad tarayıcısında WebXR AR desteği bulunamadı. Bu sürümde manuel gerçek ölçekli yerleştirme Android Chrome/WebXR cihazlarında çalışır.':'Bu tarayıcı WebXR artırılmış gerçeklik özelliğini desteklemiyor. Android Chrome ve ARCore destekli cihaz kullanın.'};
  }
  try{
    const supported=await navigator.xr.isSessionSupported('immersive-ar');
    return {supported:Boolean(supported),reason:supported?'':'immersive-ar-unsupported',message:supported?('AR hazır · '+Math.round(W)+' mm = '+(W/1000).toFixed(2)+' m · manuel konum · ölçek kilitli 1:1'):'Cihaz WebXR kullanıyor ancak immersive-ar oturumunu desteklemiyor.'};
  }catch(error){
    return {supported:false,reason:'capability-error',message:'AR desteği denetlenemedi: '+error.message};
  }
}

window.getP3DVARCapabilities=getArCapabilities;

function setArTrackingText(message){
  const element=document.getElementById('arTrackingStatus');
  if(element)element.textContent=String(message||'');
}

function setArScaleBadge(){
  const element=document.getElementById('arScaleBadge');
  if(element)element.textContent='Gerçek Ölçek 1:1 · '+Math.round(W)+' mm × '+Math.round(D)+' mm · '+(W/1000).toFixed(2)+' m × '+(D/1000).toFixed(2)+' m';
}

function showArLaunchGate(show){
  const gate=document.getElementById('arLaunchGate');
  if(gate)gate.hidden=!show;
}

function eachArMaterial(callback){
  group.traverse(object=>{
    const materials=Array.isArray(object.material)?object.material:[object.material];
    materials.filter(Boolean).forEach(callback);
  });
}

function setArGhostMode(enabled){
  eachArMaterial(material=>{
    material.userData=material.userData||{};
    if(enabled){
      if(!material.userData.p3dvArSaved){
        material.userData.p3dvArSaved={opacity:material.opacity,transparent:material.transparent,depthWrite:material.depthWrite};
      }
      const saved=material.userData.p3dvArSaved;
      material.transparent=true;
      material.opacity=Math.max(.08,Number(saved.opacity||1)*.46);
      material.depthWrite=false;
    }else if(material.userData.p3dvArSaved){
      const saved=material.userData.p3dvArSaved;
      material.opacity=saved.opacity;
      material.transparent=saved.transparent;
      material.depthWrite=saved.depthWrite;
      delete material.userData.p3dvArSaved;
    }
    material.needsUpdate=true;
  });
}

function updateArControlState(){
  const lock=document.getElementById('arLockBtn');
  const reposition=document.getElementById('arRepositionBtn');
  if(lock)lock.disabled=!arPlacementInitialized||arPlacementLocked;
  if(reposition)reposition.disabled=!arPlacementInitialized||!arPlacementLocked;
  const ground=document.getElementById('arGroundOffsetInput');
  const groundValue=document.getElementById('arGroundValue');
  if(ground)ground.value=String(Math.round(arGroundOffset*100));
  if(groundValue)groundValue.textContent=(arGroundOffset>=0?'+':'')+Math.round(arGroundOffset*100)+' cm';
}

function prepareModelForAr(){
  if(timer)clearInterval(timer);
  parts.forEach(part=>part.visible=true);
  intermediateDimensionObjects.forEach(item=>item.visible=false);
  mainDimensionObjects.forEach(item=>item.visible=false);
  zonePickers.forEach(item=>item.visible=false);
  floor.visible=false;
  grid.visible=false;
  box.visible=false;
  if(group.parent)group.parent.remove(group);
  arRoot.add(group);
  group.scale.setScalar(AR_METERS_PER_MM);
  group.position.set(0,H*AR_METERS_PER_MM*.5,0);
  group.rotation.set(0,0,0);
  arRoot.position.set(0,0,0);
  arRoot.rotation.set(0,0,0);
  arRoot.visible=false;
  setArGhostMode(true);
  controls.enabled=false;
  arRestoreCameraNear=camera.near;
  arRestoreCameraFar=camera.far;
  camera.near=.01;
  camera.far=1000;
  camera.updateProjectionMatrix();
  document.body.classList.add('ar-active');
  document.getElementById('arOverlay').hidden=false;
  setArScaleBadge();
  updateArControlState();
}

async function resetArOrientation(){
  arLandscapeMode=false;
  document.body.classList.remove('ar-landscape');
  const button=document.getElementById('arLandscapeBtn');
  if(button)button.textContent='Yatay Kamera';
  try{if(screen.orientation&&typeof screen.orientation.unlock==='function')screen.orientation.unlock();}catch(error){}
  try{if(document.fullscreenElement&&document.exitFullscreen)await document.exitFullscreen();}catch(error){}
}

function restoreModelAfterAr(){
  arRoot.visible=false;
  setArGhostMode(false);
  if(group.parent)group.parent.remove(group);
  scene.add(group);
  group.scale.set(1,1,1);
  group.position.set(0,0,0);
  group.rotation.set(0,0,0);
  floor.visible=true;
  grid.visible=true;
  box.visible=true;
  controls.enabled=true;
  camera.near=arRestoreCameraNear;
  camera.far=arRestoreCameraFar;
  camera.updateProjectionMatrix();
  document.body.classList.remove('ar-active');
  const overlay=document.getElementById('arOverlay');
  if(overlay)overlay.hidden=true;
  showArLaunchGate(false);
  buildModel(true);
}

function applyArPlacementTransform(){
  arRoot.position.set(arManualPosition.x,arBaseGroundY+arGroundOffset,arManualPosition.z);
  arRoot.rotation.set(0,arBaseYaw+arYawOffset,0);
  arRoot.visible=arPlacementInitialized;
  updateArControlState();
}

function arDefaultDistance(){
  return Math.max(3,Math.hypot(W,D)*AR_METERS_PER_MM*.68);
}

function getArCameraAxes(){
  const xrCamera=renderer.xr.getCamera(camera);
  xrCamera.getWorldPosition(arLastCameraPosition);
  xrCamera.getWorldDirection(arCameraForward);
  arCameraForward.y=0;
  if(arCameraForward.lengthSq()<.0001)arCameraForward.set(0,0,-1);
  arCameraForward.normalize();
  arCameraRight.crossVectors(arCameraForward,new THREE.Vector3(0,1,0)).normalize();
  return {camera:xrCamera,position:arLastCameraPosition,forward:arCameraForward,right:arCameraRight};
}

function initializeManualArPlacement(){
  if(arPlacementInitialized)return true;
  const axes=getArCameraAxes();
  const distance=arDefaultDistance();
  arManualPosition.copy(axes.position).addScaledVector(axes.forward,distance);
  arBaseGroundY=axes.position.y-AR_DEFAULT_EYE_HEIGHT;
  arGroundOffset=0;
  const dx=axes.position.x-arManualPosition.x;
  const dz=axes.position.z-arManualPosition.z;
  arBaseYaw=Math.atan2(-dx,-dz);
  arYawOffset=0;
  arPlacementInitialized=true;
  arPlacementLocked=false;
  setArGhostMode(true);
  applyArPlacementTransform();
  setArTrackingText('Ürün '+distance.toFixed(1)+' m öne gerçek ölçekte çizildi. Oklarla konumu, zemin kotunu ve yönü ayarlayın; ardından Konumu Sabitleyin.');
  postArStatus('Ürün kameranın önüne 1:1 ölçekte çizildi; manuel konumlandırma hazır.','success');
  return true;
}

function lockArPlacement(){
  if(!arPlacementInitialized)return false;
  arPlacementLocked=true;
  setArGhostMode(false);
  updateArControlState();
  setArTrackingText('Konum sabitlendi · gerçek ölçek 1:1. İnce ayar düğmeleri ölçeği değiştirmeden çalışır.');
  postArStatus('Manuel AR konumu sabitlendi.','success');
  return true;
}

function reopenArPlacement(){
  if(!arPlacementInitialized)return false;
  arPlacementLocked=false;
  setArGhostMode(true);
  updateArControlState();
  setArTrackingText('Yeniden konumlandırma açık · ürün yarı saydamdır. Taşıyın ve tekrar sabitleyin.');
  return true;
}

function moveArModel(direction,amount){
  if(!arPlacementInitialized)return;
  const axes=getArCameraAxes();
  if(direction==='forward')arManualPosition.addScaledVector(axes.forward,amount);
  if(direction==='right')arManualPosition.addScaledVector(axes.right,amount);
  applyArPlacementTransform();
  const distance=axes.position.distanceTo(arRoot.position);
  setArTrackingText('Konum ayarlandı · kamera mesafesi yaklaşık '+distance.toFixed(1)+' m · ölçek 1:1.');
}

function setArGroundOffset(valueMeters){
  arGroundOffset=Math.max(-1.5,Math.min(1.5,Number(valueMeters)||0));
  applyArPlacementTransform();
  setArTrackingText('Zemin kotu '+(arGroundOffset>=0?'+':'')+Math.round(arGroundOffset*100)+' cm · gerçek ürün yüksekliği değişmedi.');
}

function adjustArGround(delta){
  setArGroundOffset(arGroundOffset+delta);
}

function rotateArModel(delta){
  if(!arPlacementInitialized)return;
  arYawOffset+=delta;
  applyArPlacementTransform();
  setArTrackingText('Yön '+Math.round(arYawOffset*180/Math.PI)+'° ayarlandı · gerçek ölçek değişmedi.');
}

async function setArLandscapeMode(enable){
  const requested=Boolean(enable);
  let fullscreenOk=Boolean(document.fullscreenElement);
  let lockOk=false;
  if(requested){
    try{
      if(!document.fullscreenElement&&document.documentElement.requestFullscreen){
        await document.documentElement.requestFullscreen();
        fullscreenOk=true;
      }
    }catch(error){}
    try{
      if(screen.orientation&&typeof screen.orientation.lock==='function'){
        await screen.orientation.lock('landscape');
        lockOk=true;
      }
    }catch(error){}
    arLandscapeMode=true;
    document.body.classList.add('ar-landscape');
    const button=document.getElementById('arLandscapeBtn');
    if(button)button.textContent='Dikey Kamera';
    const message=lockOk?'Yatay kamera kilitlendi · ürün konumu ve 1:1 ölçek korundu.':'Yatay kilit tarayıcı tarafından verilmedi. Telefonu yatay çevirin; geniş arayüz hazır.';
    setArTrackingText(message);
    postArStatus(message,lockOk?'success':'warning');
  }else{
    await resetArOrientation();
    setArTrackingText('Dikey kamera düzenine dönüldü · ürün konumu ve ölçek korundu.');
    postArStatus('Dikey kamera düzenine dönüldü.','success');
  }
  return {fullscreen:fullscreenOk,locked:lockOk};
}

async function cleanupArSession(){
  arReferenceSpace=null;
  arSession=null;
  arPlacementInitialized=false;
  arPlacementLocked=false;
  arYawOffset=0;
  arGroundOffset=0;
  await resetArOrientation();
  restoreModelAfterAr();
  parent.postMessage({source:'product-3d-viewer',type:'ar-session-ended'},'*');
}

async function beginArSession(){
  if(arSession)return {ok:true,message:'AR oturumu zaten açık.'};
  const capability=await getArCapabilities();
  if(!capability.supported)return {ok:false,message:capability.message};
  renderer.xr.enabled=true;
  renderer.xr.setReferenceSpaceType('local');
  const sessionInit={
    optionalFeatures:['dom-overlay','local-floor'],
    domOverlay:{root:document.body}
  };
  const session=await navigator.xr.requestSession('immersive-ar',sessionInit);
  arSession=session;
  session.addEventListener('end',cleanupArSession,{once:true});
  try{
    await renderer.xr.setSession(session);
    arReferenceSpace=await session.requestReferenceSpace('local');
    prepareModelForAr();
    showArLaunchGate(false);
    setArTrackingText('Kamera açık · ürün ilk karede gerçek ölçekte çizilecek. Zemin araması zorunlu değildir.');
    postArStatus('Kamera açıldı · '+Math.round(W)+' mm ürün '+(W/1000).toFixed(2)+' m gerçek genişlikte tutuluyor.','success');
    session.addEventListener('select',()=>{if(!arPlacementLocked)lockArPlacement();});
    return {ok:true,message:'Kamera açıldı. Ürün 1:1 ölçekte hemen çizilir; konumu ve zemin kotunu elle ayarlayın.'};
  }catch(error){
    try{await session.end();}catch(endError){}
    throw error;
  }
}

window.startP3DVAR=async function(){
  const capability=await getArCapabilities();
  if(!capability.supported){
    postArStatus(capability.message,'warning');
    return {ok:false,message:capability.message};
  }
  try{
    return await beginArSession();
  }catch(error){
    const activationError=['NotAllowedError','SecurityError','InvalidStateError'].includes(error&&error.name);
    if(activationError){
      showArLaunchGate(true);
      const message='Kamera izni için 3D alanın içindeki Kamerayı Aç düğmesine dokunun.';
      postArStatus(message,'warning');
      return {ok:false,retryInsideViewer:true,message};
    }
    const message='AR oturumu başlatılamadı: '+(error&&error.message?error.message:String(error));
    postArStatus(message,'error');
    return {ok:false,message};
  }
};

function updateArFrame(frame){
  if(!arSession||!frame)return;
  if(!arPlacementInitialized){
    initializeManualArPlacement();
    return;
  }
  arRoot.visible=true;
  const now=performance.now();
  if(now-arLastStatusAt>900&&!arPlacementLocked){
    const axes=getArCameraAxes();
    const distance=axes.position.distanceTo(arRoot.position);
    const suggested=arDefaultDistance();
    const guidance=distance<suggested*.72?' · ürünün tamamını görmek için Geri düğmesiyle uzaklaştırın.':' · konumu elle ayarlayın.';
    setArTrackingText('Manuel yerleşim açık · kamera mesafesi '+distance.toFixed(1)+' m'+guidance);
    arLastStatusAt=now;
  }
}

const arLaunchGateBtn=document.getElementById('arLaunchGateBtn');
if(arLaunchGateBtn)arLaunchGateBtn.addEventListener('click',async()=>{
  try{await beginArSession();}
  catch(error){postArStatus('AR başlatılamadı: '+error.message,'error');setArTrackingText('AR başlatılamadı: '+error.message);}
});
const arLaunchGateCancelBtn=document.getElementById('arLaunchGateCancelBtn');
if(arLaunchGateCancelBtn)arLaunchGateCancelBtn.addEventListener('click',()=>showArLaunchGate(false));
const arLockBtn=document.getElementById('arLockBtn');
if(arLockBtn)arLockBtn.addEventListener('click',lockArPlacement);
const arRepositionBtn=document.getElementById('arRepositionBtn');
if(arRepositionBtn)arRepositionBtn.addEventListener('click',reopenArPlacement);
const arMoveForwardBtn=document.getElementById('arMoveForwardBtn');
if(arMoveForwardBtn)arMoveForwardBtn.addEventListener('click',()=>moveArModel('forward',AR_MOVE_STEP));
const arMoveBackBtn=document.getElementById('arMoveBackBtn');
if(arMoveBackBtn)arMoveBackBtn.addEventListener('click',()=>moveArModel('forward',-AR_MOVE_STEP));
const arMoveLeftBtn=document.getElementById('arMoveLeftBtn');
if(arMoveLeftBtn)arMoveLeftBtn.addEventListener('click',()=>moveArModel('right',-AR_MOVE_STEP));
const arMoveRightBtn=document.getElementById('arMoveRightBtn');
if(arMoveRightBtn)arMoveRightBtn.addEventListener('click',()=>moveArModel('right',AR_MOVE_STEP));
const arMoveDownBtn=document.getElementById('arMoveDownBtn');
if(arMoveDownBtn)arMoveDownBtn.addEventListener('click',()=>adjustArGround(-AR_HEIGHT_STEP));
const arMoveUpBtn=document.getElementById('arMoveUpBtn');
if(arMoveUpBtn)arMoveUpBtn.addEventListener('click',()=>adjustArGround(AR_HEIGHT_STEP));
const arGroundZeroBtn=document.getElementById('arGroundZeroBtn');
if(arGroundZeroBtn)arGroundZeroBtn.addEventListener('click',()=>setArGroundOffset(0));
const arGroundOffsetInput=document.getElementById('arGroundOffsetInput');
if(arGroundOffsetInput)arGroundOffsetInput.addEventListener('input',event=>setArGroundOffset(Number(event.target.value)/100));
const arRotateFineLeftBtn=document.getElementById('arRotateFineLeftBtn');
if(arRotateFineLeftBtn)arRotateFineLeftBtn.addEventListener('click',()=>rotateArModel(-Math.PI/180));
const arRotateFineRightBtn=document.getElementById('arRotateFineRightBtn');
if(arRotateFineRightBtn)arRotateFineRightBtn.addEventListener('click',()=>rotateArModel(Math.PI/180));
const arRotateLeftBtn=document.getElementById('arRotateLeftBtn');
if(arRotateLeftBtn)arRotateLeftBtn.addEventListener('click',()=>rotateArModel(-Math.PI/12));
const arRotateRightBtn=document.getElementById('arRotateRightBtn');
if(arRotateRightBtn)arRotateRightBtn.addEventListener('click',()=>rotateArModel(Math.PI/12));
const arLandscapeBtn=document.getElementById('arLandscapeBtn');
if(arLandscapeBtn)arLandscapeBtn.addEventListener('click',()=>setArLandscapeMode(!arLandscapeMode));
const arExitBtn=document.getElementById('arExitBtn');
if(arExitBtn)arExitBtn.addEventListener('click',()=>{if(arSession)arSession.end();});

getArCapabilities().then(capability=>{
  parent.postMessage({source:'product-3d-viewer',type:'ar-capability',supported:capability.supported,message:capability.message},'*');
});

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

function profileColor(defaultHex){
  return DEFAULT_COLOR_MODE ? defaultHex : SYSTEM_COLOR;
}

function panelColor(defaultHex){
  return DEFAULT_COLOR_MODE ? defaultHex : PANEL_COLOR;
}

function createTextureFinishMap(){
  const canvas=document.createElement('canvas');
  canvas.width=128;
  canvas.height=128;
  const ctx=canvas.getContext('2d');
  if(!ctx)return null;
  ctx.fillStyle='rgb(128,128,128)';
  ctx.fillRect(0,0,128,128);
  for(let y=0;y<128;y+=4){
    for(let x=0;x<128;x+=4){
      const wave=(Math.sin((x+y)*0.55)+Math.cos((x-y)*0.32))*0.5;
      const grain=(wave*34)+((x*y)%17)-8;
      const shade=Math.max(82,Math.min(176,128+grain));
      ctx.fillStyle='rgb(' + shade + ',' + shade + ',' + shade + ')';
      ctx.fillRect(x,y,4,4);
    }
  }
  const texture=new THREE.CanvasTexture(canvas);
  texture.wrapS=THREE.RepeatWrapping;
  texture.wrapT=THREE.RepeatWrapping;
  texture.repeat.set(3.5,3.5);
  texture.needsUpdate=true;
  return texture;
}

const finishTextureMap=createTextureFinishMap();

function finishMaterialSettings(finish,opacity,color){
  const normalized=(finish==='GLOSS'||finish==='TEXTURE'||finish==='MATTE')?finish:'MATTE';
  const base={
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity > .55,
    side: THREE.DoubleSide
  };
  if(normalized==='GLOSS'){
    return {
      ...base,
      roughness:.08,
      metalness:.2,
      clearcoat:1,
      clearcoatRoughness:.06,
      reflectivity:1
    };
  }
  if(normalized==='TEXTURE'){
    const textureSettings=finishTextureMap?{
      bumpMap:finishTextureMap,
      bumpScale:.72,
      roughnessMap:finishTextureMap
    }:{};
    return {
      ...base,
      roughness:.88,
      metalness:.035,
      clearcoat:0,
      clearcoatRoughness:1,
      reflectivity:.28,
      ...textureSettings
    };
  }
  return {
    ...base,
    roughness:.62,
    metalness:.08,
    clearcoat:.08,
    clearcoatRoughness:.74,
    reflectivity:.45
  };
}

function autoFinishForColor(color){
  if(DEFAULT_COLOR_MODE)return 'MATTE';
  return Number(color) === Number(PANEL_COLOR) ? PANEL_FINISH : SYSTEM_FINISH;
}

function createSolidMaterial(color,opacity,finish){
  const settings={color,...finishMaterialSettings(finish||autoFinishForColor(color),opacity,color)};
  try{
    return new THREE.MeshPhysicalMaterial(settings);
  }catch(error){
    return new THREE.MeshStandardMaterial({
      color,
      roughness:settings.roughness===undefined?.62:settings.roughness,
      metalness:settings.metalness===undefined?.08:settings.metalness,
      transparent:Boolean(settings.transparent),
      opacity:settings.opacity===undefined?1:settings.opacity,
      depthWrite:settings.depthWrite!==false,
      side:THREE.DoubleSide
    });
  }
}

function createGlassMaterial(color,opacity){
  const glassish = Number(color) === 0x8be7ff ? {roughness:.06, metalness:.08} : (Number(color)===0xb68055 ? {roughness:.14, metalness:.04} : {roughness:.1, metalness:.03});
  return new THREE.MeshStandardMaterial({
    color,
    roughness: glassish.roughness,
    metalness: glassish.metalness,
    transparent: true,
    opacity,
    transmission: 0,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

function addBox(cfg,color,isPost){
  const geo=new THREE.BoxGeometry(cfg.sx,cfg.sy,cfg.sz);
  const mat=createSolidMaterial(color,1,autoFinishForColor(color));
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
  const mesh=new THREE.Mesh(geo,createSolidMaterial(color,1,autoFinishForColor(color)));
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
  const mesh=new THREE.Mesh(geo,createSolidMaterial(color,1,autoFinishForColor(color)));
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
  const mesh=new THREE.Mesh(geo,createSolidMaterial(color,1,autoFinishForColor(color)));
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
  const mesh=new THREE.Mesh(geo,createSolidMaterial(color,1,autoFinishForColor(color)));
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
  const mat=(opacity<.7?createGlassMaterial(color,opacity):createSolidMaterial(color,opacity,autoFinishForColor(color)));
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
  const mat=(opacity<.7?createGlassMaterial(color,opacity):createSolidMaterial(color,opacity,autoFinishForColor(color)));
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
  if(color==='FUME' || color==='GREY')return 0x6b7280;
  if(color==='BRONZE')return 0xb68055;
  if(color==='LOW-E GLASS')return 0x8be7ff;
  if(color==='OTHER')return 0x93c5fd;
  return 0xb7ddff;
}

function motorVisualColor(placement){
  if(!DEFAULT_COLOR_MODE)return SYSTEM_COLOR;
  const type=String((placement&&placement.motorType)||'').toUpperCase();
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
  const mat=(opacity<.7?createGlassMaterial(color,opacity):createSolidMaterial(color,opacity,autoFinishForColor(color)));
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
  const frameColor=profileColor(0x475569);
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
    // İç kol, rozet ekseni etrafında önceki yönüne göre 180° çevrilir.
    const innerLeverCenter=lockU-lockSide*58;
    addDoorPivotPart(zone,pivot,{name:'Normal Kapı Kolu İç',u:innerLeverCenter,y:handleY,v:innerV+zone.inward*12,w:132,h:22,t:24},handleColor,1,hingeU,hingeV,productOpen);
  }
}

function addMovingDoorLeaf(zone,cfg,placement,label,withHandle){
  const face=50;
  const depth=55;
  const glazing=glazingSectionSpec(placement);
  const frameColor=profileColor(0x334155);
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

function addDoorTopFixedDimensions(zone,bottom,leafTop,leafHeight){
  if(!dimensionVisibility.intermediate)return;
  const dimV=zone.outerFaceV-zone.inward*56;
  const dimU=0;
  const wing=18;
  addDimensionSegments(zone,[
    [dimU,bottom,dimV,dimU,leafTop,dimV],
    [dimU-wing,bottom+wing,dimV,dimU,bottom,dimV],
    [dimU+wing,bottom+wing,dimV,dimU,bottom,dimV],
    [dimU-wing,leafTop-wing,dimV,dimU,leafTop,dimV],
    [dimU+wing,leafTop-wing,dimV,dimU,leafTop,dimV]
  ],false);
  addDimensionLabelScaled(zone,'Kapı Kanadı '+Math.round(leafHeight)+' mm',dimU,(bottom+leafTop)/2,dimV,0.5,false);
}

function buildDoorProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const frameFace=50;
  const frameDepth=55;
  const frameColor=profileColor(0x475569);
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
    const availableHeight=Math.max(0,Math.round(zone.height-87));
    const legacyFixedHeight=Math.max(250,Math.min(1200,Math.round(Number(placement.topFixedHeight)||500)));
    const requestedMoving=Number.isFinite(Number(placement.movingLeafHeight))
      ? Math.round(Number(placement.movingLeafHeight))
      : Math.max(600,availableHeight-legacyFixedHeight);
    const minMoving=Math.max(1200,availableHeight-1200);
    const maxMoving=Math.max(minMoving,availableHeight-250);
    const movingHeight=Math.max(minMoving,Math.min(maxMoving,requestedMoving));
    const fixedHeight=Math.max(250,availableHeight-movingHeight);
    const transomY=innerTop-fixedHeight;
    addProductBox(zone,{name:'Door Top Fixed Transom',u:0,y:transomY,v,w:innerW,h:frameFace,t:frameDepth},frameColor,1);
    const glazing=glazingSectionSpec(placement);
    const glassV=productDepthCenter(zone,glazing.glassDepth,(frameDepth-glazing.glassDepth)/2);
    const topGlassBottom=transomY+frameFace/2+6;
    const topGlassH=Math.max(100,innerTop-topGlassBottom-6);
    addProductBox(zone,{name:'Door Upper Fixed Glass',u:0,y:topGlassBottom+topGlassH/2,v:glassV,w:Math.max(80,innerW-12),h:topGlassH,t:glazing.glassDepth},glassVisualColor(placement),.34);
    leafTop=bottom+movingHeight;
    addDoorTopFixedDimensions(zone,bottom,leafTop,movingHeight);
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
  const frameColor=profileColor(0x475569);
  const mullionColor=profileColor(0x64748b);
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

function buildFoldingProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const series=String(placement.series||'A SERIES')==='K SERIES'?'K SERIES':'A SERIES';
  const frameColor=DEFAULT_COLOR_MODE?(series==='K SERIES'?0x1e293b:0x334155):SYSTEM_COLOR;
  const panelColor=DEFAULT_COLOR_MODE?(series==='K SERIES'?0x0f766e:0x0d9488):SYSTEM_COLOR;
  const glassColor=glassVisualColor(placement);
  const glazing=glazingSectionSpec(placement);
  const frameDepth=series==='K SERIES'?92:80;
  const frameFace=55;
  const bottomProfile=70;
  const v=productDepthCenter(zone,frameDepth,0);
  const halfW=zone.width/2;
  addProductBox(zone,{name:'Folding Bottom Threshold 70 mm',u:0,y:zone.bottomY+bottomProfile/2,v,w:zone.width,h:bottomProfile,t:frameDepth},frameColor,1);
  addProductBox(zone,{name:'Folding Top Frame',u:0,y:zone.topY-frameFace/2,v,w:zone.width,h:frameFace,t:frameDepth},frameColor,1);
  addProductBox(zone,{name:'Folding Left Frame',u:-halfW+frameFace/2,y:(zone.bottomY+bottomProfile+zone.topY-frameFace)/2,v,w:frameFace,h:Math.max(100,zone.height-bottomProfile-frameFace),t:frameDepth},frameColor,1);
  addProductBox(zone,{name:'Folding Right Frame',u:halfW-frameFace/2,y:(zone.bottomY+bottomProfile+zone.topY-frameFace)/2,v,w:frameFace,h:Math.max(100,zone.height-bottomProfile-frameFace),t:frameDepth},frameColor,1);

  const innerW=Math.max(160,zone.width-frameFace*2);
  const innerBottom=zone.bottomY+bottomProfile;
  const innerTop=zone.topY-frameFace;
  const innerH=Math.max(180,innerTop-innerBottom);
  const panels=Math.max(2,Math.round(Number(placement.panels)||Math.ceil(innerW/600)));
  const direction=panels>8?'BOTH':(['LEFT','RIGHT','BOTH'].includes(String(placement.openingDirection))?String(placement.openingDirection):'RIGHT');
  const passageDoor=String(placement.passageDoor||'NO')==='YES';
  const panelW=Math.max(80,innerW/panels);
  const stile=Math.max(24,Math.min(34,panelW*.075));
  const panelH=Math.max(160,innerH-8);
  const panelY=innerBottom+innerH/2;
  const glassV=productDepthCenter(zone,glazing.glassDepth,(frameDepth-glazing.glassDepth)/2);
  const productOpen=productIsOpen(zone.id);

  function addClosedLeaf(index,u){
    markTogglePanel(addProductBox(zone,{name:'Folding Glass '+(index+1),u,y:panelY,v:glassV,w:Math.max(50,panelW-stile*2),h:Math.max(80,panelH-stile*2),t:glazing.glassDepth},glassColor,.34),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Folding Left Stile '+(index+1),u:u-panelW/2+stile/2,y:panelY,v,w:stile,h:panelH,t:glazing.frameDepth},panelColor,1),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Folding Right Stile '+(index+1),u:u+panelW/2-stile/2,y:panelY,v,w:stile,h:panelH,t:glazing.frameDepth},panelColor,1),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Folding Top Rail '+(index+1),u,y:innerTop-stile/2,v,w:panelW,h:stile,t:glazing.frameDepth},panelColor,1),zone,productOpen);
    markTogglePanel(addProductBox(zone,{name:'Folding Bottom Rail '+(index+1),u,y:innerBottom+stile/2,v,w:panelW,h:stile,t:glazing.frameDepth},panelColor,1),zone,productOpen);
  }

  function addFoldedLeaf(index,side,stackIndex){
    const leftSide=side==='LEFT';
    const hingeU=leftSide?-innerW/2:innerW/2;
    const centerU=leftSide?hingeU+panelW/2:hingeU-panelW/2;
    const outward=-zone.inward;
    const hingeV=v+outward*stackIndex*(glazing.frameDepth+8);
    const axisSign=zone.axis==='x'?-1:1;
    const leafDirection=leftSide?1:-1;
    const angle=axisSign*outward*leafDirection*Math.PI/2;
    const pivot=createDoorPivot(zone,hingeU,hingeV,angle);
    const part=(cfg,color,opacity)=>addDoorPivotPart(zone,pivot,cfg,color,opacity,hingeU,hingeV,productOpen);
    part({name:'Folded Glass '+(index+1),u:centerU,y:panelY,v:hingeV,w:Math.max(50,panelW-stile*2),h:Math.max(80,panelH-stile*2),t:glazing.glassDepth},glassColor,.34);
    part({name:'Folded Left Stile '+(index+1),u:centerU-panelW/2+stile/2,y:panelY,v:hingeV,w:stile,h:panelH,t:glazing.frameDepth},panelColor,1);
    part({name:'Folded Right Stile '+(index+1),u:centerU+panelW/2-stile/2,y:panelY,v:hingeV,w:stile,h:panelH,t:glazing.frameDepth},panelColor,1);
    part({name:'Folded Top Rail '+(index+1),u:centerU,y:innerTop-stile/2,v:hingeV,w:panelW,h:stile,t:glazing.frameDepth},panelColor,1);
    part({name:'Folded Bottom Rail '+(index+1),u:centerU,y:innerBottom+stile/2,v:hingeV,w:panelW,h:stile,t:glazing.frameDepth},panelColor,1);
  }

  if(productOpen){
    let leftCount=0;
    let rightCount=0;
    if(direction==='LEFT')leftCount=panels;
    else if(direction==='RIGHT')rightCount=panels;
    else{
      leftCount=Math.floor(panels/2);
      rightCount=panels-leftCount;
    }
    for(let i=0;i<leftCount;i++)addFoldedLeaf(i,'LEFT',i);
    for(let i=0;i<rightCount;i++)addFoldedLeaf(leftCount+i,'RIGHT',i);
  }else{
    for(let i=0;i<panels;i++){
      const u=-innerW/2+panelW/2+i*panelW;
      addClosedLeaf(i,u);
    }
  }

  const arrowV=productSurfaceCenter(zone,v,frameDepth,5);
  if(direction==='BOTH'){
    addFacadeArrow(zone,{name:'Folding Left Direction Arrow',u:-panelW/2,y:panelY,v:arrowV,length:Math.min(420,Math.max(120,panelW*1.4)),maxLength:Math.max(120,innerW/2-30),direction:-1,vertical:false,thick:true});
    addFacadeArrow(zone,{name:'Folding Right Direction Arrow',u:panelW/2,y:panelY,v:arrowV,length:Math.min(420,Math.max(120,panelW*1.4)),maxLength:Math.max(120,innerW/2-30),direction:1,vertical:false,thick:true});
  }else{
    addFacadeArrow(zone,{name:'Folding Direction Arrow',u:0,y:panelY,v:arrowV,length:Math.min(520,Math.max(140,innerW*.35)),maxLength:Math.max(140,innerW-60),direction:direction==='LEFT'?-1:1,vertical:false,thick:true});
  }
  if(passageDoor){
    const doorU=direction==='LEFT'?-innerW/2+panelW/2:innerW/2-panelW/2;
    addFacadeArrow(zone,{name:'Folding Passage Door Arrow',u:doorU,y:panelY-panelH*.22,v:arrowV,length:Math.min(260,Math.max(100,panelW*.55)),maxLength:Math.max(100,panelW-stile*2-10),direction:direction==='LEFT'?1:-1,vertical:false,thick:false});
  }
}

function buildSlidingProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const frameColor=DEFAULT_COLOR_MODE?(String(placement.series||'A SERIES')==='K SERIES'?0x1e293b:0x334155):SYSTEM_COLOR;
  const panelColor=DEFAULT_COLOR_MODE?(String(placement.series||'A SERIES')==='K SERIES'?0x0f766e:0x0d9488):SYSTEM_COLOR;
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

  addProductBox(zone,{name:threshold?'Sliding Threshold':'Sliding Flush Bottom Profile',u:0,y:zone.bottomY+dims.frame+thresholdH/2-4,v:thresholdV,w:dims.innerW,h:thresholdH,t:thresholdDepth},profileColor(0x475569),1);

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

function facadeRightDirectionSign(zone){
  const originalInward=Number.isFinite(Number(zone&&zone.zipOriginalInward))
    ? Number(zone.zipOriginalInward)
    : (Number.isFinite(Number(zone&&zone.inward)) ? Number(zone.inward) : 1);
  return zone&&zone.axis==='x'?-originalInward:originalInward;
}

function buildGuillotineProduct(zone,placement){
  zone=fitProductZone(zone,5);
  const seriesK=String(placement.series||'A SERIES')==='K SERIES';
  const frameColor=DEFAULT_COLOR_MODE?(seriesK?0x1e293b:0x334155):SYSTEM_COLOR;
  const panelColor=DEFAULT_COLOR_MODE?(seriesK?0x6d28d9:0x7c3aed):SYSTEM_COLOR;
  const glassColor=glassVisualColor(placement);
  const glazing=glazingSectionSpec(placement);
  const dims=addFrame(zone,zone.width,zone.height,seriesK?96:86,frameColor);
  const motorH=Math.min(160,Math.max(100,zone.height*.08));
  const motorY=zone.topY-dims.frame-motorH/2;
  const motorBoxDepth=96;
  const motorBoxV=productDepthCenter(zone,motorBoxDepth,0);
  addProductBox(zone,{name:'Guillotine Motor Box',u:0,y:motorY,v:motorBoxV,w:dims.innerW,h:motorH,t:motorBoxDepth},motorVisualColor(placement),1);

  const facadeRightSign=facadeRightDirectionSign(zone);
  const motorSide=String(placement.motorDirection||'RIGHT')==='RIGHT'?facadeRightSign:-facadeRightSign;
  addFacadeText(zone,{name:'Guillotine Motor Label',text:'MOTOR',u:motorSide*(dims.innerW/2-150),y:motorY,v:zone.outerFaceV+zone.inward*.5,w:220,h:70});
  addProductBox(zone,{name:'Guillotine Motor Side',u:motorSide*(dims.innerW/2-32),y:motorY,v:productDepthCenter(zone,112,0),w:52,h:motorH*.72,t:112},profileColor(0x111827),1);
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
  const code=String(placement.fabricColor||'');
  const map={'7635-52101':'#f7f8f1','7635-52102':'#cfd1cc','7635-52103':'#a1a39e','7635-52105':'#5d6568','7635-52106':'#4f575a','7635-52107':'#33373a','7635-52173':'#f7f7d7','7635-52174':'#f9f9e8','7635-52176':'#b9ac8a','7635-52142':'#696f72','7635-52144':'#323639','92-2044':'#f7f6f1','92-2135':'#9e988d','92-2171':'#909899','92-2043':'#343635','92-2047':'#2c3135','86-2044':'#f5f4e9','86-2135':'#9a958a','86-2171':'#8f9899','86-2043':'#393c3b','86-2047':'#31363a','W88-8102':'#f7f6e2','W88-2047':'#262b33'};
  if(map[code])return map[code];
  const meta=ZIP_FABRIC_META&&ZIP_FABRIC_META[code];
  if(meta&&/^#[0-9a-f]{6}$/i.test(String(meta.tone||'')))return meta.tone;
  return '#8b9096';
}

function configureZipFabricTexture(texture,panelWidth,panelHeight,tileMm){
  if(!texture)return texture;
  texture.wrapS=THREE.MirroredRepeatWrapping;
  texture.wrapT=THREE.MirroredRepeatWrapping;
  const tile=Math.max(240,Number(tileMm)||500);
  const width=Math.max(80,Number(panelWidth)||tile);
  const height=Math.max(120,Number(panelHeight)||tile);
  texture.repeat.set(Math.max(1,width/tile),Math.max(1,height/tile));
  if(texture.center)texture.center.set(.5,.5);
  if(THREE.sRGBEncoding!==undefined)texture.encoding=THREE.sRGBEncoding;
  if(renderer&&renderer.capabilities&&renderer.capabilities.getMaxAnisotropy){
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  }
  texture.needsUpdate=true;
  return texture;
}

function createZipFallbackTexture(fallbackColor,panelWidth,panelHeight,tileMm){
  const canvas=document.createElement('canvas');
  canvas.width=256;
  canvas.height=256;
  const ctx=canvas.getContext('2d');
  if(!ctx)return null;
  ctx.fillStyle=fallbackColor;
  ctx.fillRect(0,0,256,256);
  ctx.fillStyle='rgba(17,24,39,.46)';
  for(let y=3;y<256;y+=7){
    for(let x=3;x<256;x+=7){
      ctx.beginPath();
      ctx.arc(x+(y%14?1.4:0),y,.72,0,Math.PI*2);
      ctx.fill();
    }
  }
  return configureZipFabricTexture(new THREE.CanvasTexture(canvas),panelWidth,panelHeight,tileMm);
}

function createZipFabricMaterial(placement,panelWidth,panelHeight){
  const code=String(placement.fabricColor||'');
  const meta=ZIP_FABRIC_META&&ZIP_FABRIC_META[code];
  const fallbackColor=zipFabricCssColor(placement);
  const tileMm=meta&&Number(meta.tileMm)>0?Number(meta.tileMm):500;
  const fallbackTexture=createZipFallbackTexture(fallbackColor,panelWidth,panelHeight,tileMm);
  const material=new THREE.MeshBasicMaterial({
    map:fallbackTexture,
    color:fallbackTexture?0xffffff:Number('0x'+fallbackColor.replace('#','')),
    transparent:false,
    opacity:1,
    side:THREE.DoubleSide,
    toneMapped:false
  });

  const applyImageTexture=(image)=>{
    try{
      const texture=configureZipFabricTexture(new THREE.Texture(image),panelWidth,panelHeight,tileMm);
      material.map=texture;
      material.color.setHex(0xffffff);
      material.opacity=1;
      material.transparent=false;
      material.needsUpdate=true;
    }catch(error){
      material.map=fallbackTexture;
      material.color.setHex(fallbackTexture?0xffffff:Number('0x'+fallbackColor.replace('#','')));
      material.needsUpdate=true;
    }
  };

  const loadCatalogCrop=()=>{
    if(!meta||!meta.image||typeof Image!=='function')return;
    const sourceImage=new Image();
    sourceImage.onload=()=>{
      try{
        const left=parseFloat(meta.left)/100;
        const top=parseFloat(meta.top)/100;
        const width=parseFloat(meta.width)/100;
        const height=parseFloat(meta.height)/100;
        if(![left,top,width,height].every(Number.isFinite)||width<=0||height<=0)return;
        const sampleX=sourceImage.naturalWidth*(left+width*.05);
        const sampleY=sourceImage.naturalHeight*(top+height*.06);
        const sampleW=sourceImage.naturalWidth*width*.47;
        const sampleH=sourceImage.naturalHeight*height*.42;
        const side=Math.max(2,Math.min(sampleW,sampleH));
        const sourceX=sampleX+(sampleW-side)/2;
        const sourceY=sampleY+(sampleH-side)/2;
        const cropCanvas=document.createElement('canvas');
        cropCanvas.width=512;
        cropCanvas.height=512;
        const cropCtx=cropCanvas.getContext('2d');
        if(!cropCtx)return;
        cropCtx.drawImage(sourceImage,sourceX,sourceY,side,side,0,0,512,512);
        const texture=configureZipFabricTexture(new THREE.CanvasTexture(cropCanvas),panelWidth,panelHeight,tileMm);
        material.map=texture;
        material.color.setHex(0xffffff);
        material.opacity=1;
        material.transparent=false;
        material.needsUpdate=true;
      }catch(error){
        material.map=fallbackTexture;
        material.needsUpdate=true;
      }
    };
    sourceImage.onerror=()=>{
      material.map=fallbackTexture;
      material.needsUpdate=true;
    };
    sourceImage.src=meta.image;
  };

  const loadTextureSource=(src,onError)=>{
    if(!src||typeof Image!=='function'){
      if(onError)onError();
      return;
    }
    const image=new Image();
    image.onload=()=>applyImageTexture(image);
    image.onerror=()=>{ if(onError)onError(); };
    image.src=src;
  };

  if(meta&&meta.textureData){
    loadTextureSource(meta.textureData,()=>{
      if(meta.texture)loadTextureSource(meta.texture,loadCatalogCrop);
      else loadCatalogCrop();
    });
  }else if(meta&&meta.texture){
    loadTextureSource(meta.texture,loadCatalogCrop);
  }else{
    loadCatalogCrop();
  }
  return material;
}

function addZipFabricPanel(zone,cfg,placement,panelMeta){
  const axisX=zone.axis==='x';
  const geo=new THREE.BoxGeometry(axisX?cfg.w:cfg.t,cfg.h,axisX?cfg.t:cfg.w);
  const mesh=new THREE.Mesh(geo,createZipFabricMaterial(placement,cfg.w,cfg.h));
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
  const frameColor=DEFAULT_COLOR_MODE?(seriesP?0x1e3a5f:0x374151):SYSTEM_COLOR;
  const accentColor=DEFAULT_COLOR_MODE?(seriesP?0x0f766e:0x475569):SYSTEM_COLOR;
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

  const facadeRightSign=facadeRightDirectionSign(zone);
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
  addProductBox(zone,{name:'Zip Fallback Top Box',u:0,y:zone.topY-topBoxH/2,v:productDepthCenter(zone,topBoxH,0),w:zone.width,h:topBoxH,t:topBoxH},profileColor(0x374151),1);
  addProductBox(zone,{name:'Zip Fallback Left Guide',u:-zone.width/2+guide/2,y:panelBottom+fullH/2,v:productDepthCenter(zone,depth,0),w:guide,h:fullH,t:depth},profileColor(0x475569),1);
  addProductBox(zone,{name:'Zip Fallback Right Guide',u:zone.width/2-guide/2,y:panelBottom+fullH/2,v:productDepthCenter(zone,depth,0),w:guide,h:fullH,t:depth},profileColor(0x475569),1);
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
  const mat=new THREE.MeshStandardMaterial({color:profileColor(0x0ea5e9),roughness:.46,metalness:.26});
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
      obj.material.color.setHex(profileColor(0x0ea5e9));
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
  const bottomY=-H/2;
  const topY=beamBottomY;
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
          if(placement.type==='folding')buildFoldingProduct(zone,placement);
          else if(placement.type==='guillotine')buildGuillotineProduct(zone,placement);
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
  const magenta=profileColor(0xff00ff),blue=profileColor(0x2563eb),orange=profileColor(0xff8c00),amber=profileColor(0xffb347),grass=panelColor(0x7cfc00);
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
  // legacy token preserved for regression: const lamelOpenAngle=-80;
const lamelOpenAngle=IS_BIO_RISE?-80:-100;
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
  if(arSession)return;
  pointerStart={x:event.clientX,y:event.clientY};
});

renderer.domElement.addEventListener('pointermove',event=>{
  if(arSession)return;
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
  if(arSession)return;
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

window.captureFreedom3D=function(preset){
  if(timer)clearInterval(timer);
  parts.forEach(part=>part.visible=true);
  const savedPosition=camera.position.clone();
  const savedTarget=controls.target.clone();
  const savedZoom=camera.zoom;
  const presets={
    'front-left':{position:[-W*1.34,H*.94,-D*1.42],target:[0,0,0],zoom:.94},
    'front-right':{position:[W*1.34,H*.94,-D*1.42],target:[0,0,0],zoom:.94},
    'back-left':{position:[-W*1.34,H*.94,D*1.42],target:[0,0,0],zoom:.94},
    'back-right':{position:[W*1.34,H*.94,D*1.42],target:[0,0,0],zoom:.94},
    'default':{position:[W*1.1,H*.88,D*1.22],target:[0,0,0],zoom:1}
  };
  const view=presets[preset]||presets.default;
  camera.position.fromArray(view.position);
  controls.target.fromArray(view.target);
  camera.zoom=view.zoom||1;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.render(scene,camera);
  const result={
    dataUrl:renderer.domElement.toDataURL('image/jpeg',.88),
    width:renderer.domElement.width,
    height:renderer.domElement.height,
    preset:String(preset||'default')
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

function animate(time,frame){
  if(arSession)updateArFrame(frame);
  else controls.update();
  renderer.render(scene,camera);
}

buildModel(true);
renderer.setAnimationLoop(animate);
})();
</scr` + `ipt>
</body>
</html>`;
  }

  function bindEvents() {
    $(ids.productGroup).addEventListener('change', handleProductGroupChange);
    $(ids.defaultColorMode).addEventListener('click', () => setColorMode('default'));
    $(ids.ralColorMode).addEventListener('click', () => setColorMode('ral'));
    $(ids.systemColorTrigger).addEventListener('click', () => openColorPicker('system'));
    $(ids.panelColorTrigger).addEventListener('click', () => openColorPicker('panel'));
    $(ids.colorPickerClose).addEventListener('click', closeColorPicker);
    $(ids.colorFinishClose).addEventListener('click', closeColorFinishDialog);
    $(ids.colorCatalogRising).addEventListener('click', () => setActiveColorCatalog('rising'));
    $(ids.colorCatalogAll).addEventListener('click', () => setActiveColorCatalog('all'));
    $(ids.colorSearch).addEventListener('input', renderRalColorOptions);
    $(ids.colorPickerDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.colorPickerDialog)) closeColorPicker();
    });
    $(ids.colorFinishDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.colorFinishDialog)) closeColorFinishDialog();
    });
    $(ids.freedomPanelCount).addEventListener('input', syncProjectionFromPanelCount);
    $(ids.freedomDepth).addEventListener('input', syncPanelCountFromProjection);
    $(ids.freedomWidth).addEventListener('input', () => showRecommendedLimitWarnings({ width: readFreedomNumber(ids.freedomWidth), depth: readFreedomNumber(ids.freedomDepth), panelCount: readFreedomNumber(ids.freedomPanelCount) }));
    $(ids.freedomHeight).addEventListener('input', () => showRecommendedLimitWarnings({ width: readFreedomNumber(ids.freedomWidth), depth: readFreedomNumber(ids.freedomDepth), panelCount: readFreedomNumber(ids.freedomPanelCount) }));
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
    $(ids.productFabricTrigger).addEventListener('click', openProductFabricCatalog);
    $(ids.productFabricPickerClose).addEventListener('click', closeProductFabricCatalog);
    $(ids.productDoorHinge).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorActiveLeaf).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorOpenDirection).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorHandleType).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDoorTopFixedHeight).addEventListener('input', () => {
      updateDoorTopFixedSummary();
      $(ids.productValidation).textContent = '';
    });
    $(ids.productPlacement).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productMotorDirection).addEventListener('change', () => {
      $(ids.productMotorDirection).value = $(ids.productMotorDirection).value === 'LEFT' ? 'LEFT' : 'RIGHT';
      $(ids.productValidation).textContent = '';
    });
    $(ids.productOpening).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productGlassThickness).addEventListener('change', () => {
      rememberGlassThicknessFromForm();
      applyProductRules(currentProductDraft());
    });
    $(ids.productGlassColor).addEventListener('change', () => {
      rememberGlassColorFromForm();
      applyProductRules(currentProductDraft());
    });
    $(ids.bottomPanelMode).addEventListener('change', () => applyProductRules(currentProductDraft()));
    $(ids.productPanelType).addEventListener('change', () => {
      const panelType = $(ids.productPanelType).value;
      if (panelType === '1+1') $(ids.productPanels).value = '2';
      if (panelType === '1+2') $(ids.productPanels).value = '3';
      $(ids.productValidation).textContent = '';
    });
    $(ids.productPanels).addEventListener('input', () => {
      $(ids.productValidation).textContent = '';
      if ($(ids.productType).value === 'folding') updateFoldingFormAdvisory();
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
    $(ids.foldingCollectionState).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productFoldingPassage).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productDirection).addEventListener('change', () => {
      $(ids.productValidation).textContent = '';
      if ($(ids.productType).value === 'folding') updateFoldingFormAdvisory();
    });
    $(ids.collectingDisplayState).addEventListener('change', () => { $(ids.productValidation).textContent = ''; });
    $(ids.productCustomGlass).addEventListener('input', () => {
      if ($(ids.productGlassColor).value === 'OTHER') rememberGlassColorFromForm();
      $(ids.productValidation).textContent = '';
    });
    $(ids.productCancel).addEventListener('click', closeProductDialog);
    $(ids.productRemove).addEventListener('click', removeProduct);
    $(ids.productDialog).addEventListener('click', (event) => {
      if (event.target === $(ids.productDialog)) closeProductDialog();
    });
    $(ids.productFabricPicker).addEventListener('click', (event) => {
      if (event.target === $(ids.productFabricPicker)) closeProductFabricCatalog();
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
    if ($(ids.exportProductListPdf)) $(ids.exportProductListPdf).addEventListener('click', () => { exportProductListPdf(); });
    if ($(ids.mobileAr)) $(ids.mobileAr).addEventListener('click', () => { startMobileAr(); });
    if ($(ids.frame)) $(ids.frame).addEventListener('load', () => { setTimeout(refreshMobileArCapability, 180); });
    for (let quickIndex = 1; quickIndex <= 10; quickIndex += 1) {
      const quickButton = $(`quickTestBtn${quickIndex}`);
      if (quickButton) quickButton.addEventListener('click', () => applyQuickTestScenario(quickIndex));
    }
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
  updateColorControls();
  bindEvents();
  updateToolbox();
  renderViewer();
})();
