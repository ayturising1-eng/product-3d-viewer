(function (root) {
  'use strict';

  const mm = value => Number.isFinite(Number(value)) ? Number(value) : 0;
  const clone = value => JSON.parse(JSON.stringify(value));

  function vector(x, y, z) { return [mm(x), mm(y), mm(z)]; }
  function component(id, kind, template, start, end, extra) {
    return {
      id, kind, template,
      start: start ? vector(start[0], start[1], start[2]) : null,
      end: end ? vector(end[0], end[1], end[2]) : null,
      sourceRuleIds: [],
      ...(extra || {})
    };
  }

  function groupForSystem(d, system) {
    if (!d.independentMode) return null;
    return (d.independentPergoRiseGroups || []).find(group =>
      Number(system.index) >= Number(group.positionStartIndex) && Number(system.index) <= Number(group.positionEndIndex)
    ) || null;
  }

  function gutterSpan(d, system) {
    const K = d.constants;
    const state = d.gutterEditState || {};
    const group = groupForSystem(d, system);
    if (!d.independentMode || !group) {
      const start = K.gutterX - mm(state.minusXDelta);
      const end = K.gutterX + d.width + 100 + mm(state.plusXDelta);
      return { id: 'gutter-global', start, end };
    }
    const groupState = state.groups && state.groups[String(group.groupId)] || {};
    const fallbackState = Number(group.groupIndex) === 0 ? state : {};
    const start = mm(group.outerStartX) - 50 - mm(groupState.minusXDelta || fallbackState.minusXDelta);
    const end = mm(group.outerEndX) + 50 + mm(groupState.plusXDelta || fallbackState.plusXDelta);
    return { id: `gutter-${group.groupId}`, start, end, groupId: group.groupId };
  }

  function positionAtX(d, x) {
    let best = d.systems[0];
    let distance = Infinity;
    d.systems.forEach(system => {
      const left = mm(system.outerStartX), right = mm(system.outerEndX);
      const current = x < left ? left - x : (x > right ? x - right : 0);
      if (current < distance) { best = system; distance = current; }
    });
    return d.positions[best ? best.index : 0] || d.positions[0];
  }

  function build(project) {
    if (!project || !project.normalized) throw new Error('Normalized PLMR Pergo Rise project is required.');
    const d = project.normalized;
    const K = { ...root.PulumurGeometry.K };
    d.constants = K;
    const originX = K.systemStartX + d.width / 2;
    const localX = value => mm(value) - originX;
    const components = [];
    const systems = [];
    const seenGutters = new Set();

    d.systems.forEach(system => {
      const position = d.positions[system.index] || d.positions[0];
      const systemId = position.positionId || `position-${system.index + 1}`;
      const rearHeight = mm(position.rearHeight);
      const frontHeight = mm(position.frontHeight);
      const opening = mm(position.opening);
      const outerStart = localX(system.outerStartX);
      const outerEnd = localX(system.outerEndX);
      const railItems = [];

      (system.rays || []).forEach((rayLeft, railIndex) => {
        const axisX = localX(mm(rayLeft) + K.rayW / 2);
        const startZ = K.sideRayStartOffsetX;
        const startY = rearHeight - K.sideRayStartOffsetY;
        const length = mm(position.rayLength);
        const angle = mm(position.angleRad);
        const endZ = startZ + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        const item = component(
          `${systemId}-rail-${railIndex + 1}`,
          'rail', 'rail-profile',
          [axisX, startY, startZ], [axisX, endY, endZ],
          {
            systemIndex: system.index,
            positionId: position.positionId || '',
            railIndex,
            axisX,
            nominalPlanLength: Math.max(1, opening - K.rayLengthFrontDeduct),
            sourceRuleIds: ['PLMR.K.rayW', 'PLMR.rayLenFor', 'PLMR.sideAngleRadFor', 'PLMR.drawTopRays', 'PLMR.drawOneSideView']
          }
        );
        components.push(item);
        railItems.push(item);
        components.push({
          id: `${systemId}-wall-connection-${railIndex + 1}`,
          kind: 'wall-connection',
          template: 'wall-connection-accessory',
          position: vector(axisX, startY, startZ),
          alignVector: vector(0, endY - startY, endZ - startZ),
          anchor: 'source-min',
          productionGeometry: false,
          reviewRequired: true,
          systemIndex: system.index,
          positionId: position.positionId || '',
          railIndex,
          sourceRuleIds: ['GLB.Shape005.CANDIDATE', 'PLMR.drawOneSideView.RAIL_REAR_START']
        });
      });

      const rearProfileY = rearHeight - K.sideRayStartOffsetY;
      components.push(component(`${systemId}-rear-profile`, 'rear-profile', 'rear-profile',
        [outerStart, rearProfileY, 0], [outerEnd, rearProfileY, 0], {
          systemIndex: system.index,
          sourceRuleIds: ['PLMR.systems.outerStartX', 'PLMR.systems.outerEndX', 'PLMR.rearHeight']
        }));

      const frontProfileY = frontHeight - K.frontGutterH / 2;
      components.push(component(`${systemId}-front-profile`, 'front-profile', 'fabric-profile',
        [outerStart, frontProfileY, opening - 18], [outerEnd, frontProfileY, opening - 18], {
          systemIndex: system.index,
          sourceRuleIds: ['PLMR.frontHeight', 'PLMR.K.frontGutterH']
        }));

      for (let intervalIndex = 0; intervalIndex < Math.max(0, (system.rays || []).length - 1); intervalIndex += 1) {
        const left = mm(system.rays[intervalIndex]) + K.rayW;
        const right = mm(system.rays[intervalIndex + 1]);
        if (right - left <= 1) continue;
        const fixedZ = 400;
        const shift = (mm(position.rayLength) / K.catiProfilRayRatioBase) * K.catiProfilRayRatioMove + K.catiProfilExtraOffset;
        const movingZ = fixedZ + shift;
        const yAt = z => rearHeight - K.sideRayStartOffsetY + Math.sin(mm(position.angleRad)) * Math.max(0, z - K.sideRayStartOffsetX);
        components.push(component(`${systemId}-fabric-profile-fixed-${intervalIndex + 1}`, 'fabric-profile', 'fabric-profile',
          [localX(left), yAt(fixedZ), fixedZ], [localX(right), yAt(fixedZ), fixedZ], {
            systemIndex: system.index, roofProfileRole: 'fixed',
            sourceRuleIds: ['PLMR.drawTopRoofProfiles.fixed', 'PLMR.K.catiProfilH']
          }));
        components.push(component(`${systemId}-fabric-profile-moving-${intervalIndex + 1}`, 'fabric-profile', 'fabric-profile',
          [localX(left), yAt(movingZ), movingZ], [localX(right), yAt(movingZ), movingZ], {
            systemIndex: system.index, roofProfileRole: 'trapezMinusY',
            sourceRuleIds: ['PLMR.drawTopRoofProfiles.trapezMinusY', 'PLMR.K.catiProfilRayRatioBase', 'PLMR.K.catiProfilRayRatioMove']
          }));
      }

      const stackWidth = Math.max(1, mm(system.rayAreaEndX) - mm(system.rayAreaStartX));
      components.push({
        id: `${systemId}-fabric-stack`,
        kind: 'fabric-stack', template: 'fabric-stack',
        position: vector(localX((mm(system.rayAreaStartX) + mm(system.rayAreaEndX)) / 2), rearHeight - 250, 520),
        width: stackWidth,
        rotation: vector(0, 0, 0),
        representation: 'STATIC_VISUAL_REPRESENTATION',
        productionGeometry: false,
        systemIndex: system.index,
        sourceRuleIds: ['P3DV.STATIC_OPEN_REAR_STACKED', 'PLMR.fabric', 'PLMR.fabricProfiles']
      });

      const wallGrid = d.topBackWallGridState && d.topBackWallGridState[String(system.index)];
      if (d.rearSupport && d.rearSupport.type === 'wall' && wallGrid && Array.isArray(wallGrid.cells)) {
        wallGrid.cells.forEach((cell, wallIndex) => {
          if (cell.enabled === false) return;
          const minX = outerStart + mm(cell.minX);
          const maxX = outerStart + mm(cell.maxX);
          const nearA = mm(cell.startNearDepth), nearB = mm(cell.endNearDepth);
          const farA = mm(cell.startFarDepth), farB = mm(cell.endFarDepth);
          components.push({
            id: `${systemId}-rear-wall-${wallIndex + 1}`,
            kind: 'rear-wall', template: 'canonical-wall-solid',
            polygonXZ: [
              [minX, nearA], [maxX, nearB], [maxX, farB], [minX, farA]
            ],
            bottomY: 0,
            topY: rearHeight,
            systemIndex: system.index,
            materialRole: 'wall',
            productionGeometry: true,
            sourceRuleIds: ['PLMR.topBackWallGridState', 'PLMR.drawTopWall', 'PLMR.rearSupport.type=wall']
          });
        });
      }

      const gutter = gutterSpan(d, system);
      if (!seenGutters.has(gutter.id)) {
        seenGutters.add(gutter.id);
        const groupSystems = gutter.groupId
          ? d.systems.filter(candidate => {
              const group = groupForSystem(d, candidate);
              return group && group.groupId === gutter.groupId;
            }) : d.systems;
        const referenceSystem = groupSystems[0] || system;
        const referencePosition = d.positions[referenceSystem.index] || position;
        components.push(component(gutter.id, 'gutter', 'gutter-profile',
          [localX(gutter.start), mm(referencePosition.frontHeight) - K.frontGutterH / 2, mm(referencePosition.opening)],
          [localX(gutter.end), mm(referencePosition.frontHeight) - K.frontGutterH / 2, mm(referencePosition.opening)], {
            independentGroupId: gutter.groupId || '',
            sourceRuleIds: ['PLMR.gutterBounds', 'PLMR.drawTopGutter', 'PLMR.K.frontGutterH']
          }));
      }

      systems.push({
        index: system.index,
        positionId: position.positionId || systemId,
        independentGroupId: position.independentGroupId || '',
        outerStartX: outerStart,
        outerEndX: outerEnd,
        width: mm(position.width),
        opening,
        rearHeight,
        frontHeight,
        slopeDegrees: Math.abs(mm(position.angleRad)) * 180 / Math.PI,
        railCount: railItems.length,
        railAxes: railItems.map(item => item.axisX)
      });
    });

    (d.postCenterXs || []).forEach((axis, postIndex) => {
      const position = positionAtX(d, mm(axis));
      const system = d.systems[position ? position.index : 0] || d.systems[0];
      const opening = mm(position.opening);
      const postHeight = Math.max(1, mm(position.frontHeight) - K.onPostHeightCorrection);
      const profileWidth = mm(d.frontPostWidths && d.frontPostWidths[postIndex]) || K.postSize;
      components.push(component(`front-post-${postIndex + 1}`, 'post', 'pillar-profile',
        [localX(axis), 0, opening], [localX(axis), postHeight, opening], {
          postIndex,
          systemIndex: system ? system.index : 0,
          axisX: localX(axis),
          requestedProfileWidth: profileWidth,
          sourceRuleIds: ['PLMR.postCenterXs', 'PLMR.frontPostWidths', 'PLMR.K.onPostHeightCorrection']
        }));
      components.push({
        id: `front-foot-${postIndex + 1}`,
        kind: 'foot', template: 'foot-accessory',
        position: vector(localX(axis), 0, opening),
        rotation: vector(0, 0, 0),
        postIndex,
        productionGeometry: true,
        sourceRuleIds: ['GLB.PergoRise_Foot']
      });
    });

    const envelope = {
      width: Math.max(1, mm(d.width) + 100),
      depth: Math.max(...d.positions.map(position => mm(position.opening)), 1),
      height: Math.max(...d.positions.map(position => mm(position.rearHeight)), 1)
    };

    return {
      schema: root.P3DVPergoRiseProduct ? root.P3DVPergoRiseProduct.ASSEMBLY_SCHEMA : 'p3dv-static-assembly-v1',
      productId: 'pergo-rise-3d-v1',
      staticState: 'STATIC_OPEN_REAR_STACKED',
      projectHash: project.hash,
      units: 'mm',
      coordinateSystem: { x: 'width', y: 'height', z: 'opening', rearReferenceZ: 0 },
      envelope,
      origin: { sourceX: originX, local: [0, 0, 0] },
      systems,
      positions: clone(d.positions),
      independentGroups: clone(d.independentPergoRiseGroups || []),
      components,
      counts: {
        systems: d.systems.length,
        positions: d.positions.length,
        rails: components.filter(item => item.kind === 'rail').length,
        posts: components.filter(item => item.kind === 'post').length,
        walls: components.filter(item => item.kind === 'rear-wall').length,
        wallConnections: components.filter(item => item.kind === 'wall-connection').length,
        fabricProfiles: components.filter(item => item.kind === 'fabric-profile').length
      },
      source: clone(project.source),
      unresolvedProductionFields: [
        'Generic GLB Shape node roles are mapped by dimensional signature and documented confidence; no unknown cross-section dimension is invented.',
        'Static fabric stack is a visual representation and is excluded from production geometry.',
        'Shape005 is mapped as a visible-only rear wall/rail connection candidate with LOW_REVIEW_REQUIRED confidence; it is excluded from production geometry until profile/accessory validation.'
      ]
    };
  }

  root.P3DVPergoRiseDerivedGeometry = Object.freeze({ build });
  if (typeof module !== 'undefined') module.exports = root.P3DVPergoRiseDerivedGeometry;
})(typeof window !== 'undefined' ? window : globalThis);
