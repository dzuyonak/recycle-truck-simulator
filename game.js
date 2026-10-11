// Mack LR Electric 3D - High-Fidelity Simulation Engine
// Realistic Truck Physics, Deep Collision System, Detailed LEGO Technic Models & Cinematic Trash Arm Animation

(() => {
  'use strict';

  // --- UI Elements ---
  const taskText = document.getElementById('taskText');
  const taskIcon = document.getElementById('taskIcon');
  const gpsArrow = document.getElementById('gpsArrow');
  const gpsDistance = document.getElementById('gpsDistance');
  const capacityBar = document.getElementById('capacityBar');
  const shiftProgressVal = document.getElementById('shiftProgressVal');
  const shiftProgressBar = document.getElementById('shiftProgressBar');
  const cargoFillVal = document.getElementById('cargoFillVal');
  const ecoScore = document.getElementById('ecoScore');
  const speedValue = document.getElementById('speedValue');
  const gearTag = document.getElementById('gearTag');
  const armIndicator = document.getElementById('armIndicator');
  const armStatusText = document.getElementById('armStatusText');
  const actionPrompt = document.getElementById('actionPrompt');
  const promptTitle = document.getElementById('promptTitle');
  const promptDesc = document.getElementById('promptDesc');
  const promptActionBtn = document.getElementById('promptActionBtn');
  const soundBtn = document.getElementById('soundBtn');
  const soundIcon = document.getElementById('soundIcon');
  const camBtn = document.getElementById('camBtn');
  const camIcon = document.getElementById('camIcon');
  const helpBtn = document.getElementById('helpBtn');
  const unstuckBtn = document.getElementById('unstuckBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastDesc = document.getElementById('toastDesc');
  const batteryBlackout = document.getElementById('batteryBlackout');
  const helpModal = document.getElementById('helpModal');
  const helpCloseBtn = document.getElementById('helpCloseBtn');
  const helpOkBtn = document.getElementById('helpOkBtn');
  const victoryModal = document.getElementById('victoryModal');
  const btnRestartLevel = document.getElementById('btnRestartLevel');
  const btnFreeDrive = document.getElementById('btnFreeDrive');
  const mapSelectModal = document.getElementById('mapSelectModal');
  const mapSelectBtn = document.getElementById('mapSelectBtn');
  const btnStartMapShift = document.getElementById('btnStartMapShift');
  const mapCardDowntown = document.getElementById('mapCardDowntown');
  const mapCardSuburb = document.getElementById('mapCardSuburb');
  const mapCardIndustrial = document.getElementById('mapCardIndustrial');
  const mapRecDowntown = document.getElementById('mapRecDowntown');
  const mapRecSuburb = document.getElementById('mapRecSuburb');
  const mapRecIndustrial = document.getElementById('mapRecIndustrial');
  const todDayBtn = document.getElementById('todDayBtn');
  const todNightBtn = document.getElementById('todNightBtn');
  const weatherClearBtn = document.getElementById('weatherClearBtn');
  const weatherRainBtn = document.getElementById('weatherRainBtn');
  let pendingMapId = 'downtown';
  let levelBooted = false;
  const TOD_STORAGE_KEY = 'mack_recycle_tod_v1';
  const WEATHER_STORAGE_KEY = 'mack_recycle_weather_v1';
  let pendingTimeOfDay = 'day';
  let activeTimeOfDay = 'day';
  let pendingWeather = 'clear';
  let activeWeather = 'clear';
  // Street / window emissive materials recreated with each city — refreshed on TOD apply.
  let nightGlowMats = [];
  // Permanent vehicle light mats (filled after materials are created).
  const todVehicleMats = {
    headlight: null,
    taillight: null,
    amber: null,
    npcHead: null,
    npcTail: null
  };
  const resBinsCount = document.getElementById('resBinsCount');
  const resWeight = document.getElementById('resWeight');
  const resTime = document.getElementById('resTime');
  const resEcoCO2 = document.getElementById('resEcoCO2');
  const pickupOverlay = document.getElementById('pickupOverlay');
  const pickupCanvas = document.getElementById('pickupCanvas');
  const pCtx = pickupCanvas ? pickupCanvas.getContext('2d') : null;
  const pickupStatusText = document.getElementById('pickupStatusText');
  const pickupTelemetry = document.getElementById('pickupTelemetry');

  const unloadOverlay = document.getElementById('unloadOverlay');
  const unloadCanvas = document.getElementById('unloadCanvas');
  const uCtx = unloadCanvas ? unloadCanvas.getContext('2d') : null;
  const unloadStatusText = document.getElementById('unloadStatusText');
  const unloadTelemetry = document.getElementById('unloadTelemetry');
  const unloadWeightVal = document.getElementById('unloadWeightVal');

  // Modernized UI: EV Cluster, Sorting Badges, Career Records
  const recordsBtn = document.getElementById('recordsBtn');
  const recordsModal = document.getElementById('recordsModal');
  const recordsCloseBtn = document.getElementById('recordsCloseBtn');
  const recordsOkBtn = document.getElementById('recordsOkBtn');

  const batteryIcon = document.getElementById('batteryIcon');
  const batteryVal = document.getElementById('batteryVal');
  const batteryBar = document.getElementById('batteryBar');
  const powerFlowVal = document.getElementById('powerFlowVal');
  const powerBarFill = document.getElementById('powerBarFill');
  const cargoMassVal = document.getElementById('cargoMassVal');
  const chargingStatus = document.getElementById('chargingStatus');

  const pickupCategoryBadge = document.getElementById('pickupCategoryBadge');
  const pickupCatDot = document.getElementById('pickupCatDot');
  const pickupCatName = document.getElementById('pickupCatName');

  const resYellowBins = document.getElementById('resYellowBins');
  const resBlueBins = document.getElementById('resBlueBins');
  const resGreenBins = document.getElementById('resGreenBins');
  const recBestTime = document.getElementById('recBestTime');
  const recTotalKg = document.getElementById('recTotalKg');
  const recRoutes = document.getElementById('recRoutes');
  const newRecordPill = document.getElementById('newRecordPill');
  const bestTimeBadge = document.getElementById('bestTimeBadge');
  const bestTimeHud = document.getElementById('bestTimeHud');

  const careerBestTime = document.getElementById('careerBestTime');
  const careerTotalKg = document.getElementById('careerTotalKg');
  const careerRoutes = document.getElementById('careerRoutes');
  const careerYellowVal = document.getElementById('careerYellowVal');
  const careerBlueVal = document.getElementById('careerBlueVal');
  const careerGreenVal = document.getElementById('careerGreenVal');
  const careerHistoryList = document.getElementById('careerHistoryList');

  // Mobile & Tablet Touch Elements
  const mobileControls = document.getElementById('mobileControls');
  const touchToggleBtn = document.getElementById('touchToggleBtn');
  const btnUp = document.getElementById('btnUp');
  const btnDown = document.getElementById('btnDown');
  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');
  const btnGrabAction = document.getElementById('btnGrabAction');
  const grabBtnIcon = document.getElementById('grabBtnIcon');
  const grabBtnText = document.getElementById('grabBtnText');
  const btnHornAction = document.getElementById('btnHornAction');
  const btnMobileCam = document.getElementById('btnMobileCam');
  const btnMobileUnstuck = document.getElementById('btnMobileUnstuck');

  // Minimap
  const minimapCanvas = document.getElementById('minimapCanvas');
  const mCtx = minimapCanvas.getContext('2d');

  // --- World Constants & Map Profiles ---
  // Mutable: each map can scale the grass plane and carriageway width.
  let WORLD_SIZE = 420;
  let ROAD_W = 16.5;
  const SIDEWALK_W = 3.4;

  // Playable maps. Geometry / traffic / spawn limits are driven by the
  // active profile; gameplay systems (physics, arm, cutscenes) stay shared.
  const MAP_PROFILES = {
    downtown: {
      id: 'downtown',
      title: 'Центр города',
      blurb: 'Плотная застройка, активный трафик, классический городской маршрут',
      gridCoords: [-120, -40, 40, 120],
      roadEdge: 128,
      worldSize: 420,
      roadWidth: 16.5,
      spawnLimit: 100,
      npcTurnZone: 122,
      truckStart: { x: -40, z: 25, angle: 0 },
      totalBins: 12,
      npcCount: [8, 10],
      pedCount: 8,
      special: { factory: [2, 2], parks: [[1, 1]] },
      theme: 'urban',
      perimeter: 'industrial',
      groundColor: 0x1f8441
    },
    suburb: {
      id: 'suburb',
      title: 'Дачный посёлок',
      blurb: 'Участки с домиками, узкие проезды между ними, лужайки, бассейн и тихий трафик',
      gridCoords: [-120, -40, 40, 120],
      roadEdge: 128,
      worldSize: 420,
      roadWidth: 16.5,
      spawnLimit: 100,
      npcTurnZone: 122,
      truckStart: { x: -80, z: -36.4, angle: Math.PI / 2 },
      totalBins: 12,
      npcCount: [5, 7],
      pedCount: 6,
      special: { factory: [2, 2], pool: [0, 1] },
      theme: 'suburb',
      perimeter: 'dacha',
      groundColor: 0x2d9e5a,
      alleyWidth: 8.5
    },
    industrial: {
      id: 'industrial',
      title: 'Промзона',
      blurb: 'Большая карта: широкие улицы, огромные складские кварталы и контейнерные дворы',
      // Wider spacing (~130 м между осями) + wider carriageway + larger world.
      gridCoords: [-200, -70, 70, 200],
      roadEdge: 215,
      worldSize: 600,
      roadWidth: 22,
      spawnLimit: 170,
      npcTurnZone: 205,
      truckStart: { x: -130, z: -65.5, angle: Math.PI / 2 },
      totalBins: 12,
      npcCount: [7, 10],
      pedCount: 5,
      // 3×3 blocks — recycling plant in the centre.
      special: { factory: [1, 1] },
      theme: 'industrial',
      perimeter: 'yards',
      groundColor: 0x3e4a3c
    }
  };

  function normalizeMapId(id) {
    return MAP_PROFILES[id] ? id : 'downtown';
  }

  // Narrow service roads cutting through dacha blocks (shared by builder + spawns).
  const DACHA_ALLEY_W = 8.5;

  let activeMapId = 'downtown';
  function getActiveMap() {
    return MAP_PROFILES[activeMapId] || MAP_PROFILES.downtown;
  }

  // Mutable mirrors of the active map — kept as lets so road / NPC / spawn
  // code can keep reading the same names without a full rewrite.
  // The drivable road grid is deliberately decoupled from WORLD_SIZE (grass
  // plane). Roads are cut off right after the outermost intersections,
  // so they span exactly ±ROAD_EDGE — the perimeter belt starts past the kerb.
  let gridCoords = MAP_PROFILES.downtown.gridCoords.slice();
  let ROAD_EDGE = MAP_PROFILES.downtown.roadEdge;

  function buildRoadIntervals(coords) {
    // Mid-block marking runs between consecutive intersections, inset so they
    // never sit on the crossroads themselves.
    const inset = ROAD_W / 2 + 6;
    const intervals = [];
    for (let i = 0; i < coords.length - 1; i++) {
      const start = coords[i] + inset;
      const end = coords[i + 1] - inset;
      if (end - start > 8) intervals.push({ start: start, end: end });
    }
    return intervals;
  }

  function isSpecialBlock(map, i, j, key) {
    const list = map.special && map.special[key];
    if (!list) return false;
    // Single-cell keys are [i, j]; multi-cell keys are arrays of [i, j].
    if (key === 'factory' || key === 'pool') {
      return list[0] === i && list[1] === j;
    }
    for (let k = 0; k < list.length; k++) {
      if (list[k][0] === i && list[k][1] === j) return true;
    }
    return false;
  }

  // --- Three.js WebGL Setup ---
  const canvas = document.getElementById('gameCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#d8e8f8', 130, 480);

  // All static city meshes hang under this group so map switches / restarts
  // can tear the whole city down in one remove() instead of leaking roads.
  let cityRoot = null;
  // Crosswalk registry (filled while building the city) + live sidewalk walkers.
  let crosswalks = [];
  let pedestrians = [];
  function cityAdd(...objs) {
    const parent = cityRoot || scene;
    for (let i = 0; i < objs.length; i++) parent.add(objs[i]);
  }
  function disposeCityRoot() {
    if (!cityRoot) return;
    scene.remove(cityRoot);
    cityRoot.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
    });
    cityRoot = null;
  }

  // Atmospheric Sky Dome with Zenith-to-Horizon Gradient (repainted for day/night).
  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 16;
  skyCanvas.height = 256;
  const skyCtx = skyCanvas.getContext('2d');
  const skyTex = new THREE.CanvasTexture(skyCanvas);
  const skyDome = new THREE.Mesh(
    new THREE.SphereGeometry(650, 32, 16),
    new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, depthWrite: false })
  );
  scene.add(skyDome);

  function paintSkyDome(isNight, isRain) {
    const grad = skyCtx.createLinearGradient(0, 0, 0, 256);
    if (isNight && isRain) {
      grad.addColorStop(0.0, '#04060c');
      grad.addColorStop(0.4, '#0a1424');
      grad.addColorStop(0.75, '#121c2c');
      grad.addColorStop(1.0, '#1a222e');
    } else if (isNight) {
      grad.addColorStop(0.0, '#050814');
      grad.addColorStop(0.35, '#0b1a3a');
      grad.addColorStop(0.7, '#152848');
      grad.addColorStop(1.0, '#1a2438');
    } else if (isRain) {
      grad.addColorStop(0.0, '#5a6a78');
      grad.addColorStop(0.4, '#6e7e8c');
      grad.addColorStop(0.75, '#8a96a2');
      grad.addColorStop(1.0, '#a8b0b8');
    } else {
      grad.addColorStop(0.0, '#1c75bc');
      grad.addColorStop(0.45, '#4ba3e3');
      grad.addColorStop(0.8, '#90cbfb');
      grad.addColorStop(1.0, '#d8e8f8');
    }
    skyCtx.fillStyle = grad;
    skyCtx.fillRect(0, 0, 16, 256);
    skyTex.needsUpdate = true;
  }
  paintSkyDome(false, false);

  // Procedural Fluffy Stylized LEGO Clouds
  const cloudsGroup = new THREE.Group();
  const matCloud = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95,
    metalness: 0.0,
    flatShading: true
  });
  for (let c = 0; c < 24; c++) {
    const cloud = new THREE.Group();
    const cx = (Math.random() - 0.5) * 620;
    const cz = (Math.random() - 0.5) * 620;
    const cy = 68 + Math.random() * 26;
    cloud.position.set(cx, cy, cz);
    const puffs = 5 + Math.floor(Math.random() * 4);
    const cScale = 0.85 + Math.random() * 0.7;
    for (let p = 0; p < puffs; p++) {
      const pr = (6 + Math.random() * 5.5) * cScale;
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(pr, 1), matCloud);
      puff.position.set(
        (Math.random() - 0.5) * 20 * cScale,
        (Math.random() - 0.5) * 4.5 * cScale,
        (Math.random() - 0.5) * 14 * cScale
      );
      puff.scale.y = 0.62;
      cloud.add(puff);
    }
    cloudsGroup.add(cloud);
  }
  scene.add(cloudsGroup);

  // Distant 3D City Skyline Silhouettes (Modern towers and skyscrapers on the horizon)
  const skylineGroup = new THREE.Group();
  const matSkylineConcrete = new THREE.MeshStandardMaterial({ color: 0x8ea2b4, roughness: 0.85 });
  const matSkylineGlass = new THREE.MeshStandardMaterial({ color: 0x689bc2, roughness: 0.35, metalness: 0.35 });
  const numSectors = 36;
  for (let s = 0; s < numSectors; s++) {
    const ang = (s / numSectors) * Math.PI * 2;
    const dist = 380 + (s % 4) * 35;
    const sx = Math.cos(ang) * dist;
    const sz = Math.sin(ang) * dist;
    const towerH = 45 + ((s * 17) % 65);
    const towerW = 16 + ((s * 7) % 18);
    const towerD = 16 + ((s * 11) % 18);
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(towerW, towerH, towerD),
      (s % 2 === 0) ? matSkylineConcrete : matSkylineGlass
    );
    tower.position.set(sx, towerH / 2, sz);
    skylineGroup.add(tower);

    // Spire / Antenna on some towers
    if (s % 3 === 0) {
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 12, 6), matSkylineConcrete);
      spire.position.set(sx, towerH + 6, sz);
      skylineGroup.add(spire);
    }
  }
  scene.add(skylineGroup);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.4, 850);

  // Camera Modes: 0 = Chase 3D (Behind), 1 = Birds-Eye Isometric,
  //               2 = Driver / Hood View, 3 = Cockpit (First-Person)
  let cameraMode = 0;
  const CAMERA_ICONS = ['🎥', '🚁', '🚘', '🚛'];
  function toggleCamera() {
    cameraMode = (cameraMode + 1) % 4;
    if (camIcon) camIcon.textContent = CAMERA_ICONS[cameraMode];
  }
  if (camBtn) camBtn.addEventListener('click', toggleCamera);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

  // --- Lighting Setup ---
  const hemiLight = new THREE.HemisphereLight(0x9bd0ff, 0x416538, 0.62);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfffaec, 1.6);
  sunLight.position.set(70, 130, 60);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 260;
  const dRange = 55;
  sunLight.shadow.camera.left = -dRange;
  sunLight.shadow.camera.right = dRange;
  sunLight.shadow.camera.top = dRange;
  sunLight.shadow.camera.bottom = -dRange;
  sunLight.shadow.bias = -0.0003;
  scene.add(sunLight);

  const ambLight = new THREE.AmbientLight(0xfff8f0, 0.28);
  scene.add(ambLight);

  // Shared street-lamp glass — emissive boosted at night.
  const matStreetLampGlass = new THREE.MeshStandardMaterial({
    color: 0xfffa65,
    emissive: 0xfffa65,
    emissiveIntensity: 0.85,
    roughness: 0.35
  });

  function registerNightGlow(mat, dayEmissive, nightEmissive) {
    if (!mat) return;
    mat.userData.dayEmissive = dayEmissive;
    mat.userData.nightEmissive = nightEmissive;
    nightGlowMats.push(mat);
  }

  // Shared asphalt — wetness toggled in applyAtmosphere (one material, zero extra draws).
  const matRoad = new THREE.MeshStandardMaterial({
    color: 0x22262c,
    roughness: 0.65,
    metalness: 0.04
  });

  function applyRoadSurface(isRain) {
    if (isRain) {
      matRoad.color.setHex(0x151920);
      matRoad.roughness = 0.2;
      matRoad.metalness = 0.48;
    } else {
      matRoad.color.setHex(0x22262c);
      matRoad.roughness = 0.65;
      matRoad.metalness = 0.04;
    }
  }

  // --- Rain particle field (budget: ≤ 1000 Points vertices) ---
  const RAIN_COUNT = 800;
  const rainPositions = new Float32Array(RAIN_COUNT * 3);
  const rainSpeeds = new Float32Array(RAIN_COUNT);
  for (let ri = 0; ri < RAIN_COUNT; ri++) {
    rainPositions[ri * 3] = (Math.random() - 0.5) * 70;
    rainPositions[ri * 3 + 1] = Math.random() * 45;
    rainPositions[ri * 3 + 2] = (Math.random() - 0.5) * 70;
    rainSpeeds[ri] = 0.5 + Math.random() * 0.55;
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMat = new THREE.PointsMaterial({
    color: 0xbdd4ff,
    size: 0.2,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    sizeAttenuation: true
  });
  const rainPoints = new THREE.Points(rainGeo, rainMat);
  rainPoints.frustumCulled = false;
  rainPoints.visible = false;
  scene.add(rainPoints);

  // Clear-night star field on the upper hemisphere (inside the sky dome).
  const STAR_COUNT = 280;
  const starPositions = new Float32Array(STAR_COUNT * 3);
  for (let si = 0; si < STAR_COUNT; si++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.42; // from zenith downward
    const r = 560 + Math.random() * 40;
    starPositions[si * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[si * 3 + 1] = r * Math.cos(phi);
    starPositions[si * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xe8f0ff,
    size: 2.4,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    sizeAttenuation: false // fixed pixel size so distant sky dots stay visible
  });
  const starPoints = new THREE.Points(starGeo, starMat);
  starPoints.frustumCulled = false;
  starPoints.visible = false;
  scene.add(starPoints);

  function updateRainParticles() {
    if (!rainPoints.visible) return;
    const arr = rainGeo.attributes.position.array;
    const cx = levelBooted ? truckPhys.x : 0;
    const cz = levelBooted ? truckPhys.z : 0;
    const half = 38;
    for (let i = 0; i < RAIN_COUNT; i++) {
      const i3 = i * 3;
      arr[i3 + 1] -= rainSpeeds[i];
      arr[i3] += 0.07;
      if (arr[i3 + 1] < 0) {
        arr[i3] = cx + (Math.random() - 0.5) * half * 2;
        arr[i3 + 1] = 16 + Math.random() * 30;
        arr[i3 + 2] = cz + (Math.random() - 0.5) * half * 2;
      } else {
        if (arr[i3] < cx - half) arr[i3] += half * 2;
        if (arr[i3] > cx + half) arr[i3] -= half * 2;
        if (arr[i3 + 2] < cz - half) arr[i3 + 2] += half * 2;
        if (arr[i3 + 2] > cz + half) arr[i3 + 2] -= half * 2;
      }
    }
    rainGeo.attributes.position.needsUpdate = true;
  }

  function updateStarField() {
    if (!starPoints.visible) return;
    // Soft twinkle — opacity only, no per-star CPU work.
    const t = performance.now() * 0.0015;
    starMat.opacity = 0.55 + Math.sin(t) * 0.12 + Math.sin(t * 2.3) * 0.08;
  }

  function applyAtmosphere(tod, weather) {
    const mode = (tod === 'night') ? 'night' : 'day';
    const wx = (weather === 'rain') ? 'rain' : 'clear';
    activeTimeOfDay = mode;
    activeWeather = wx;
    const isNight = mode === 'night';
    const isRain = wx === 'rain';

    paintSkyDome(isNight, isRain);
    if (cloudsGroup) {
      // Overcast daytime keeps clouds; clear night hides them.
      cloudsGroup.visible = !isNight || isRain;
      if (matCloud) {
        matCloud.color.setHex(isRain ? 0x8a93a0 : 0xffffff);
      }
    }
    if (rainPoints) {
      rainPoints.visible = isRain;
      rainMat.opacity = isNight ? 0.4 : 0.55;
      rainMat.color.setHex(isNight ? 0x8aa0c8 : 0xbdd4ff);
    }
    if (starPoints) {
      // Stars only on a clear night — rain/clouds hide them.
      starPoints.visible = isNight && !isRain;
    }
    applyRoadSurface(isRain);

    if (hemiLight) {
      if (isNight) {
        hemiLight.color.setHex(0x1a2744);
        hemiLight.groundColor.setHex(0x0a1018);
        hemiLight.intensity = isRain ? 0.16 : 0.2;
      } else if (isRain) {
        hemiLight.color.setHex(0x9aa8b4);
        hemiLight.groundColor.setHex(0x3a463c);
        hemiLight.intensity = 0.45;
      } else {
        hemiLight.color.setHex(0x9bd0ff);
        hemiLight.groundColor.setHex(0x416538);
        hemiLight.intensity = 0.62;
      }
    }
    if (sunLight) {
      if (isNight) {
        sunLight.color.setHex(0xa8c4ff);
        sunLight.intensity = isRain ? 0.18 : 0.26;
      } else if (isRain) {
        sunLight.color.setHex(0xd0d6dc);
        sunLight.intensity = 0.75;
      } else {
        sunLight.color.setHex(0xfffaec);
        sunLight.intensity = 1.6;
      }
    }
    if (ambLight) {
      if (isNight) {
        ambLight.color.setHex(0x243048);
        ambLight.intensity = 0.1;
      } else if (isRain) {
        ambLight.color.setHex(0xcfd6dc);
        ambLight.intensity = 0.22;
      } else {
        ambLight.color.setHex(0xfff8f0);
        ambLight.intensity = 0.28;
      }
    }

    renderer.toneMappingExposure = isNight ? (isRain ? 0.62 : 0.7) : (isRain ? 0.95 : 1.22);
    if (scene.fog) {
      if (isNight && isRain) scene.fog.color.setHex(0x0a1018);
      else if (isNight) scene.fog.color.setHex(0x0b1220);
      else if (isRain) scene.fog.color.setHex(0x8a96a2);
      else scene.fog.color.setHex(0xd8e8f8);
      scene.fog.near = WORLD_SIZE * (isRain ? 0.18 : (isNight ? 0.22 : 0.28));
      scene.fog.far = WORLD_SIZE * (isRain ? 0.85 : (isNight ? 0.95 : 1.2));
    }

    // Lamps glow more at night; rain daytime also lifts them a bit.
    const lampBoost = isNight ? 2.4 : (isRain ? 1.35 : 0.85);
    matStreetLampGlass.emissiveIntensity = lampBoost;
    if (todVehicleMats.headlight) todVehicleMats.headlight.emissiveIntensity = isNight ? 1.7 : 0.9;
    if (todVehicleMats.taillight) todVehicleMats.taillight.emissiveIntensity = isNight ? 1.35 : 0.8;
    // Amber base for the pulsing warning beacons (intensity driven every frame).
    amberBeaconBase = isNight ? 1.55 : (isRain ? 1.05 : 0.9);
    if (todVehicleMats.npcHead) todVehicleMats.npcHead.emissiveIntensity = isNight ? 1.4 : 0.75;
    if (todVehicleMats.npcTail) todVehicleMats.npcTail.emissiveIntensity = isNight ? 1.15 : 0.65;

    for (let i = 0; i < nightGlowMats.length; i++) {
      const mat = nightGlowMats[i];
      if (!mat || !mat.userData) continue;
      const dayE = mat.userData.dayEmissive;
      const nightE = mat.userData.nightEmissive;
      if (dayE === undefined || nightE === undefined) continue;
      mat.emissiveIntensity = isNight ? nightE : (isRain ? dayE * 1.35 : dayE);
    }

    if (mapSelectModal) {
      const card = mapSelectModal.querySelector('.map-select-card');
      if (card) {
        card.classList.toggle('tod-night', isNight);
        card.classList.toggle('weather-rain', isRain);
      }
    }

    if (window.soundManager && typeof window.soundManager.setRain === 'function') {
      window.soundManager.setRain(isRain);
    }
  }

  function applyTimeOfDay(tod) {
    applyAtmosphere(tod, activeWeather);
  }

  function loadTimeOfDayPref() {
    const raw = safeGetItem(TOD_STORAGE_KEY);
    return raw === 'night' ? 'night' : 'day';
  }

  function saveTimeOfDayPref(tod) {
    safeSetItem(TOD_STORAGE_KEY, tod === 'night' ? 'night' : 'day');
  }

  function loadWeatherPref() {
    const raw = safeGetItem(WEATHER_STORAGE_KEY);
    return raw === 'rain' ? 'rain' : 'clear';
  }

  function saveWeatherPref(weather) {
    safeSetItem(WEATHER_STORAGE_KEY, weather === 'rain' ? 'rain' : 'clear');
  }

  function setPendingTimeOfDay(tod) {
    pendingTimeOfDay = tod === 'night' ? 'night' : 'day';
    if (todDayBtn) todDayBtn.classList.toggle('selected', pendingTimeOfDay === 'day');
    if (todNightBtn) todNightBtn.classList.toggle('selected', pendingTimeOfDay === 'night');
    applyAtmosphere(pendingTimeOfDay, pendingWeather);
  }

  function setPendingWeather(weather) {
    pendingWeather = weather === 'rain' ? 'rain' : 'clear';
    if (weatherClearBtn) weatherClearBtn.classList.toggle('selected', pendingWeather === 'clear');
    if (weatherRainBtn) weatherRainBtn.classList.toggle('selected', pendingWeather === 'rain');
    applyAtmosphere(pendingTimeOfDay, pendingWeather);
  }

  // --- Controls State ---
  // `up/down/left/right/space` track the physical keys; `dumpLockUntil` is a
  // short timestamp gate used by the pit-stop dump, which must swallow driving
  // input for its duration without clobbering the real key state.
  const keys = { up: false, down: false, left: false, right: false, space: false };
  let dumpLockUntil = 0;

  function isControlLocked() {
    return isEvacuating || performance.now() < dumpLockUntil;
  }

  window.addEventListener('keydown', (e) => {
    window.soundManager.ensureContext();
    // Lock all driving input while the tow-truck evacuation fades out, or
    // during the 1.8 s pit-stop dump at the factory.
    if (isControlLocked()) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      return;
    }
    if (['ArrowUp', 'KeyW'].includes(e.code)) keys.up = true;
    if (['ArrowDown', 'KeyS'].includes(e.code)) keys.down = true;
    if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = true;
    if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = true;
    if (e.code === 'Space') {
      keys.space = true;
      e.preventDefault();
      triggerCurrentAction();
    }
    if (e.code === 'KeyC') toggleCamera();
    if (e.code === 'KeyH') triggerHorn();
    if (e.code === 'KeyL') toggleRecordsModal();
    if (e.code === 'KeyR') {
      e.preventDefault();
      resetTruckToRoad();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'KeyW'].includes(e.code)) keys.up = false;
    if (['ArrowDown', 'KeyS'].includes(e.code)) keys.down = false;
    if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = false;
    if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = false;
    if (e.code === 'Space') keys.space = false;
  });

  // --- Professional Multi-Touch Controller Engine (Tablet & Smartphone) ---
  function setupTouchControl(btn, key) {
    if (!btn) return;
    let activeTouchId = null;

    function activate(e) {
      if (e && e.cancelable) e.preventDefault();
      window.soundManager.ensureContext();
      if (isControlLocked()) return; // locked during evacuation / pit-stop dump
      keys[key] = true;
      btn.classList.add('pressed');
    }

    function deactivate(e) {
      if (e && e.cancelable) e.preventDefault();
      keys[key] = false;
      btn.classList.remove('pressed');
      activeTouchId = null;
    }

    btn.addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      if (e.changedTouches && e.changedTouches.length > 0) {
        activeTouchId = e.changedTouches[0].identifier;
      }
      activate(e);
    }, { passive: false });

    btn.addEventListener('touchmove', (e) => {
      if (e.cancelable) e.preventDefault();
      if (activeTouchId !== null && e.touches) {
        for (let i = 0; i < e.touches.length; i++) {
          const t = e.touches[i];
          if (t.identifier === activeTouchId) {
            const rect = btn.getBoundingClientRect();
            const pad = 18;
            const inside = (
              t.clientX >= rect.left - pad &&
              t.clientX <= rect.right + pad &&
              t.clientY >= rect.top - pad &&
              t.clientY <= rect.bottom + pad
            );
            if (inside && !keys[key]) {
              keys[key] = true;
              btn.classList.add('pressed');
            } else if (!inside && keys[key]) {
              keys[key] = false;
              btn.classList.remove('pressed');
            }
            break;
          }
        }
      }
    }, { passive: false });

    btn.addEventListener('touchend', deactivate, { passive: false });
    btn.addEventListener('touchcancel', deactivate, { passive: false });

    // Desktop Mouse Fallback
    btn.addEventListener('mousedown', activate);
    btn.addEventListener('mouseup', deactivate);
    btn.addEventListener('mouseleave', () => {
      if (keys[key]) deactivate();
    });
  }

  setupTouchControl(btnUp, 'up');
  setupTouchControl(btnDown, 'down');
  setupTouchControl(btnLeft, 'left');
  setupTouchControl(btnRight, 'right');

  // Touch Grab & Dump action
  if (btnGrabAction) {
    const handleGrab = (e) => {
      if (e && e.cancelable) e.preventDefault();
      window.soundManager.ensureContext();
      btnGrabAction.classList.add('pressed');
      setTimeout(() => btnGrabAction.classList.remove('pressed'), 120);
      triggerCurrentAction();
    };
    btnGrabAction.addEventListener('touchstart', handleGrab, { passive: false });
    btnGrabAction.addEventListener('click', handleGrab);
  }

  // Touch Horn action
  if (btnHornAction) {
    const handleHorn = (e) => {
      if (e && e.cancelable) e.preventDefault();
      window.soundManager.ensureContext();
      btnHornAction.classList.add('pressed');
      setTimeout(() => btnHornAction.classList.remove('pressed'), 150);
      triggerHorn();
    };
    btnHornAction.addEventListener('touchstart', handleHorn, { passive: false });
    btnHornAction.addEventListener('click', handleHorn);
  }

  // Touch Camera switch
  if (btnMobileCam) {
    const handleCam = (e) => {
      if (e && e.cancelable) e.preventDefault();
      btnMobileCam.classList.add('pressed');
      setTimeout(() => btnMobileCam.classList.remove('pressed'), 120);
      toggleCamera();
    };
    btnMobileCam.addEventListener('touchstart', handleCam, { passive: false });
    btnMobileCam.addEventListener('click', handleCam);
  }

  // Touch Unstuck / Rescue switch
  if (btnMobileUnstuck) {
    const handleMobileUnstuck = (e) => {
      if (e && e.cancelable) e.preventDefault();
      btnMobileUnstuck.classList.add('pressed');
      setTimeout(() => btnMobileUnstuck.classList.remove('pressed'), 140);
      resetTruckToRoad();
    };
    btnMobileUnstuck.addEventListener('touchstart', handleMobileUnstuck, { passive: false });
    btnMobileUnstuck.addEventListener('click', handleMobileUnstuck);
  }

  // Header Unstuck button
  if (unstuckBtn) {
    unstuckBtn.addEventListener('click', (e) => {
      if (e && e.cancelable) e.preventDefault();
      resetTruckToRoad();
    });
  }

  if (promptActionBtn) {
    promptActionBtn.addEventListener('click', (e) => {
      if (e && e.cancelable) e.preventDefault();
      window.soundManager.ensureContext();
      triggerCurrentAction();
    });
  }

  // Touch Controls Toggle (Header button & Auto-detection for tablets/mobile)
  let touchModeEnabled = false;
  function setTouchMode(enabled) {
    touchModeEnabled = enabled;
    if (enabled) {
      if (mobileControls) mobileControls.classList.add('active');
      if (touchToggleBtn) touchToggleBtn.classList.add('active');
      document.body.classList.add('touch-mode-active');
    } else {
      if (mobileControls) mobileControls.classList.remove('active');
      if (touchToggleBtn) touchToggleBtn.classList.remove('active');
      document.body.classList.remove('touch-mode-active');
    }
  }

  // Detect tablet or phone touch capability
  const isTouchDevice = ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
    (window.innerWidth <= 1024);

  setTouchMode(isTouchDevice);

  if (touchToggleBtn) {
    touchToggleBtn.addEventListener('click', () => {
      setTouchMode(!touchModeEnabled);
    });
  }

  soundBtn.addEventListener('click', () => {
    window.soundManager.ensureContext();
    const muted = window.soundManager.toggleMute();
    soundIcon.textContent = muted ? '🔇' : '🔊';
  });
  helpBtn.addEventListener('click', () => helpModal.classList.add('show'));
  helpCloseBtn.addEventListener('click', () => helpModal.classList.remove('show'));
  helpOkBtn.addEventListener('click', () => helpModal.classList.remove('show'));

  // Standalone Records Modal (Задача 6)
  function openRecordsModal() {
    window.soundManager.ensureContext();
    updateRecordsModalUI();
    if (recordsModal) recordsModal.classList.add('show');
  }

  function toggleRecordsModal() {
    if (recordsModal && recordsModal.classList.contains('show')) {
      recordsModal.classList.remove('show');
    } else {
      openRecordsModal();
    }
  }

  if (recordsBtn) recordsBtn.addEventListener('click', openRecordsModal);
  if (recordsCloseBtn) recordsCloseBtn.addEventListener('click', () => recordsModal.classList.remove('show'));
  if (recordsOkBtn) recordsOkBtn.addEventListener('click', () => recordsModal.classList.remove('show'));

  function refreshMapSelectRecords() {
    const stats = loadMetaStats();
    if (mapRecDowntown) {
      mapRecDowntown.textContent = `Рекорд: ${formatDuration(stats.bestTimeByMap.downtown)}`;
    }
    if (mapRecSuburb) {
      mapRecSuburb.textContent = `Рекорд: ${formatDuration(stats.bestTimeByMap.suburb)}`;
    }
    if (mapRecIndustrial) {
      mapRecIndustrial.textContent = `Рекорд: ${formatDuration(stats.bestTimeByMap.industrial)}`;
    }
  }

  function setPendingMapSelection(mapId) {
    pendingMapId = normalizeMapId(mapId);
    if (mapCardDowntown) mapCardDowntown.classList.toggle('selected', pendingMapId === 'downtown');
    if (mapCardSuburb) mapCardSuburb.classList.toggle('selected', pendingMapId === 'suburb');
    if (mapCardIndustrial) mapCardIndustrial.classList.toggle('selected', pendingMapId === 'industrial');
  }

  function openMapSelectModal() {
    pendingMapId = activeMapId;
    setPendingMapSelection(pendingMapId);
    setPendingTimeOfDay(pendingTimeOfDay || activeTimeOfDay || loadTimeOfDayPref());
    setPendingWeather(pendingWeather || activeWeather || loadWeatherPref());
    refreshMapSelectRecords();
    if (victoryModal) victoryModal.classList.remove('show');
    if (mapSelectModal) mapSelectModal.classList.add('show');
  }

  function startShiftOnSelectedMap() {
    activeMapId = pendingMapId;
    activeTimeOfDay = pendingTimeOfDay;
    activeWeather = pendingWeather;
    saveTimeOfDayPref(activeTimeOfDay);
    saveWeatherPref(activeWeather);
    if (mapSelectModal) mapSelectModal.classList.remove('show');
    initLevel();
    levelBooted = true;
    updateBestTimeHUD();
    if (activeWeather === 'rain') {
      showToast('МОКРАЯ ДОРОГА', 'Дворники работают. Тормозной путь длиннее, руль мягче.', '🌧️', 3200);
    }
  }

  if (mapCardDowntown) {
    mapCardDowntown.addEventListener('click', () => setPendingMapSelection('downtown'));
  }
  if (mapCardSuburb) {
    mapCardSuburb.addEventListener('click', () => setPendingMapSelection('suburb'));
  }
  if (mapCardIndustrial) {
    mapCardIndustrial.addEventListener('click', () => setPendingMapSelection('industrial'));
  }
  if (todDayBtn) {
    todDayBtn.addEventListener('click', () => setPendingTimeOfDay('day'));
  }
  if (todNightBtn) {
    todNightBtn.addEventListener('click', () => setPendingTimeOfDay('night'));
  }
  if (weatherClearBtn) {
    weatherClearBtn.addEventListener('click', () => setPendingWeather('clear'));
  }
  if (weatherRainBtn) {
    weatherRainBtn.addEventListener('click', () => setPendingWeather('rain'));
  }
  if (btnStartMapShift) {
    btnStartMapShift.addEventListener('click', startShiftOnSelectedMap);
  }
  if (mapSelectBtn) {
    mapSelectBtn.addEventListener('click', () => {
      if (gameState.status === 'collecting' && levelBooted) {
        // Confirm by opening the picker — starting a map resets the shift.
        openMapSelectModal();
      } else {
        openMapSelectModal();
      }
    });
  }

  btnRestartLevel.addEventListener('click', () => {
    victoryModal.classList.remove('show');
    openMapSelectModal();
  });
  btnFreeDrive.addEventListener('click', () => {
    victoryModal.classList.remove('show');
    gameState.status = 'free_drive';
    updateTaskHUD();
  });

  function triggerHorn() {
    window.soundManager.playHorn();
  }

  // --- Waste Sorting Categories (Задача 3) ---
  // Every container carries a material `type`: 'plastic' | 'paper' | 'glass'.
  // Each type is bound to a colour-coded sorting category (yellow / blue / green)
  // which drives the bin mesh colour, the floating marker and the HUD badges.
  const TYPE_BY_CATEGORY = { yellow: 'plastic', blue: 'paper', green: 'glass' };
  const CARGO_TYPES = ['plastic', 'paper', 'glass'];

  const BIN_TYPES = {
    yellow: {
      id: 'yellow',
      type: 'plastic', // Yellow bin = plastic & metal
      name: 'Пластик и Металл ♻️',
      shortName: 'Пластик / Металл',
      icon: '🟡',
      color: '#f1c40f',
      hex: 0xf1c40f,
      markerHex: 0xf1c40f,
      classSuffix: 'cat-yellow'
    },
    blue: {
      id: 'blue',
      type: 'paper', // Blue bin = paper & cardboard
      name: 'Бумага и Картон 📦',
      shortName: 'Бумага / Картон',
      icon: '🔵',
      color: '#2980b9',
      hex: 0x2980b9,
      markerHex: 0x3498db,
      classSuffix: 'cat-blue'
    },
    green: {
      id: 'green',
      type: 'glass', // Green bin = glass & jars
      name: 'Стекло и Банки 🍾',
      shortName: 'Стекло / Банки',
      icon: '🟢',
      color: '#27ae60',
      hex: 0x27ae60,
      markerHex: 0x2ecc71,
      classSuffix: 'cat-green'
    }
  };

  // --- Material type metadata (used by the victory breakdown & history) ---
  const MATERIAL_INFO = {
    plastic: { title: 'Пластик / Металл', icon: '🟡', color: '#f1c40f', category: 'yellow' },
    paper: { title: 'Бумага / Картон', icon: '🔵', color: '#3498db', category: 'blue' },
    glass: { title: 'Стекло / Банки', icon: '🟢', color: '#2ecc71', category: 'green' }
  };

  // --- LocalStorage Meta-Progression Storage Engine (Задача 6) ---
  // All persistence is wrapped in try/catch so that private-mode browsers,
  // disabled storage or full quotas never break the game loop.
  const META_STORAGE_KEY = 'mack_recycle_stats_v3';
  const LEGACY_STORAGE_KEY = 'mack_recycle_stats_v2';
  const MAX_HISTORY_ENTRIES = 20;

  // Safe localStorage primitives — never throw, degrade gracefully.
  function safeGetItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('LocalStorage unavailable (read)', e);
      return null;
    }
  }

  function safeSetItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn('LocalStorage unavailable (write)', e);
      return false;
    }
  }

  function createEmptyMetaStats() {
    return {
      routesCompleted: 0,
      totalRecycledKg: 0,
      bestTimeSec: null,
      bestTimeByMap: { downtown: null, suburb: null, industrial: null },
      categories: { plastic: 0, paper: 0, glass: 0 },
      history: [] // [{ date, durationSec, breakdown, mapId }]
    };
  }

  function sanitizeHistoryEntry(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const breakdown = raw.breakdown || {};
    return {
      date: typeof raw.date === 'string' ? raw.date : new Date().toISOString(),
      durationSec: Number.isFinite(raw.durationSec) ? raw.durationSec : 0,
      mapId: normalizeMapId(raw.mapId),
      breakdown: {
        plastic: Number(breakdown.plastic) || 0,
        paper: Number(breakdown.paper) || 0,
        glass: Number(breakdown.glass) || 0
      }
    };
  }

  function loadMetaStats() {
    let parsed = null;
    try {
      const saved = safeGetItem(META_STORAGE_KEY) || safeGetItem(LEGACY_STORAGE_KEY);
      if (saved) parsed = JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error parsing stats, starting fresh', e);
    }

    const stats = createEmptyMetaStats();
    if (!parsed || typeof parsed !== 'object') return stats;

    stats.routesCompleted = Number(parsed.routesCompleted) || 0;
    stats.totalRecycledKg = Number(parsed.totalRecycledKg) || 0;
    stats.bestTimeSec = Number.isFinite(parsed.bestTimeSec) ? parsed.bestTimeSec : null;

    // Per-map best times (+ migrate legacy global best → downtown).
    const byMap = parsed.bestTimeByMap || {};
    stats.bestTimeByMap.downtown = Number.isFinite(byMap.downtown) ? byMap.downtown : null;
    stats.bestTimeByMap.suburb = Number.isFinite(byMap.suburb) ? byMap.suburb : null;
    stats.bestTimeByMap.industrial = Number.isFinite(byMap.industrial) ? byMap.industrial : null;
    if (stats.bestTimeByMap.downtown === null && Number.isFinite(stats.bestTimeSec)) {
      stats.bestTimeByMap.downtown = stats.bestTimeSec;
    }

    // Category totals: accept both the new material-type keys and the legacy colours.
    const parsedCats = parsed.categories || {};
    const parsedByType = parsed.breakdownByType || {};
    stats.categories.plastic = Number(parsedCats.plastic || parsedCats.yellow || parsedByType.plastic) || 0;
    stats.categories.paper = Number(parsedCats.paper || parsedCats.blue || parsedByType.paper) || 0;
    stats.categories.glass = Number(parsedCats.glass || parsedCats.green || parsedByType.glass) || 0;

    if (Array.isArray(parsed.history)) {
      stats.history = parsed.history.map(sanitizeHistoryEntry).filter(Boolean);
    }
    return stats;
  }

  function saveMetaStats(stats) {
    return safeSetItem(META_STORAGE_KEY, JSON.stringify(stats));
  }

  // Record a completed route: append to the history log, update career totals
  // and the best-time record (global + per-map). Returns { isNewRecord }.
  function recordRouteCompletion(durationSec, breakdown, mapId) {
    const stats = loadMetaStats();
    const safeBreakdown = {
      plastic: Number(breakdown && breakdown.plastic) || 0,
      paper: Number(breakdown && breakdown.paper) || 0,
      glass: Number(breakdown && breakdown.glass) || 0
    };
    const totalKg = safeBreakdown.plastic + safeBreakdown.paper + safeBreakdown.glass;
    const mid = normalizeMapId(mapId);

    stats.routesCompleted += 1;
    stats.totalRecycledKg += totalKg;
    stats.categories.plastic += safeBreakdown.plastic;
    stats.categories.paper += safeBreakdown.paper;
    stats.categories.glass += safeBreakdown.glass;

    const prevMapBest = stats.bestTimeByMap[mid];
    const isNewMapRecord = prevMapBest === null || durationSec < prevMapBest;
    if (isNewMapRecord) stats.bestTimeByMap[mid] = durationSec;

    const isNewRecord = stats.bestTimeSec === null || durationSec < stats.bestTimeSec;
    if (isNewRecord) stats.bestTimeSec = durationSec;

    stats.history.unshift({
      date: new Date().toISOString(),
      durationSec: durationSec,
      mapId: mid,
      breakdown: safeBreakdown
    });
    if (stats.history.length > MAX_HISTORY_ENTRIES) {
      stats.history.length = MAX_HISTORY_ENTRIES;
    }

    saveMetaStats(stats);
    return { isNewRecord: isNewMapRecord, stats: stats };
  }

  function formatDuration(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '--:--';
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(Math.floor(sec % 60)).padStart(2, '0');
    return `${m}:${s}`;
  }

  function formatHistoryDate(isoString) {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '—';
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(-2)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // Show the personal best for the *active* map in the persistent HUD badge.
  function updateBestTimeHUD() {
    const stats = loadMetaStats();
    const mapBest = stats.bestTimeByMap[activeMapId];
    const show = Number.isFinite(mapBest);
    if (bestTimeHud) bestTimeHud.textContent = formatDuration(show ? mapBest : null);
    if (bestTimeBadge) bestTimeBadge.style.display = show ? 'flex' : 'none';
  }

  function updateRecordsModalUI() {
    const stats = loadMetaStats();
    if (careerBestTime) careerBestTime.textContent = formatDuration(stats.bestTimeSec);
    if (careerTotalKg) careerTotalKg.textContent = `${stats.totalRecycledKg} кг`;
    if (careerRoutes) careerRoutes.textContent = `${stats.routesCompleted}`;
    if (careerYellowVal) careerYellowVal.textContent = `${stats.categories.plastic} кг`;
    if (careerBlueVal) careerBlueVal.textContent = `${stats.categories.paper} кг`;
    if (careerGreenVal) careerGreenVal.textContent = `${stats.categories.glass} кг`;

    renderHistoryList(stats.history);
  }

  // Render the saved route log (date, time, per-material breakdown).
  function renderHistoryList(history) {
    if (!careerHistoryList) return;
    if (!history || history.length === 0) {
      careerHistoryList.innerHTML = '<div class="history-empty">Пока нет завершённых рейсов.<br>Соберите все баки и сдайте сырьё на завод!</div>';
      return;
    }
    const matClass = { plastic: 'mat-yellow', paper: 'mat-blue', glass: 'mat-green' };
    const rows = history.map((entry, idx) => {
      const b = entry.breakdown;
      const matCells = CARGO_TYPES.map(t => {
        const info = MATERIAL_INFO[t];
        return `<span class="history-mat" title="${info.title}"><i class="mat-dot ${matClass[t]}"></i>${b[t] || 0} кг</span>`;
      }).join('');
      const mapTitle = (MAP_PROFILES[entry.mapId] || MAP_PROFILES.downtown).title;
      return `
        <div class="history-row">
          <div class="history-row-head">
            <span class="history-index">#${history.length - idx}</span>
            <span class="history-date">${formatHistoryDate(entry.date)}</span>
            <span class="history-map">${mapTitle}</span>
            <span class="history-time">${formatDuration(entry.durationSec)}</span>
          </div>
          <div class="history-row-body">${matCells}</div>
        </div>`;
    });
    careerHistoryList.innerHTML = rows.join('');
  }

  // --- Game State ---
  // currentCargo — live accounting of the recyclables in the hopper.
  // `breakdown` keeps a separate running weight (kg) per material type.
  const gameState = {
    status: 'collecting',
    mapId: 'downtown',
    totalBins: 12,
    // Total containers picked up during the whole shift (0..totalBins).
    // This figure survives mid-route dumps: it only ever grows. The live
    // hopper load itself lives in `truckPhys.currentBinsInCargo`.
    collectedBinsTotal: 0,
    totalKg: 0,
    currentCargo: {
      totalKg: 0,
      breakdown: { plastic: 0, paper: 0, glass: 0 }
    },
    startTime: Date.now(),
    endTime: null,
    timePenalty: 0, // Traffic accident penalty in ms
    activePromptType: null,
    targetBin: null,
    routeRecorded: false // Prevents duplicate history entries per route
  };

  function resetCurrentCargo() {
    gameState.currentCargo.totalKg = 0;
    const breakdown = {};
    CARGO_TYPES.forEach(t => { breakdown[t] = 0; });
    gameState.currentCargo.breakdown = breakdown;
  }

  // --- Real Commercial Truck Physics with Dynamic Mass & EV Mechanics (Задачи 1 & 2) ---
  const truckPhys = {
    x: -120,
    z: -120,
    angle: 0,
    speed: 0,
    // Realistic speeds for Mack LR Electric 25-ton municipal refuse vehicle
    maxForward: 0.36,     // ~30 km/h max speed
    maxReverse: -0.165,   // ~14 km/h reverse
    baseAccel: 0.0072,    // Baseline acceleration
    baseBrake: 0.020,     // Baseline pneumatic air-brakes
    baseTurnSpeed: 0.027, // Baseline steering responsiveness
    friction: 0.003,      // Smooth rolling friction
    steerAngle: 0,

    // Payload Mass Physics (Задача 1) + mid-route dump support
    currentCargoWeight: 0,   // in kg (0 to 1440 = 12 containers × 120 kg)
    currentBinsInCargo: 0,   // containers physically in the hopper right now (0..maxBins)
    maxCargoWeight: 1440,
    maxBins: 12,
    massFactor: 1.0,       // massFactor = 1.0 - (currentCargoWeight / maxCargoWeight) * 0.35

    // EV Battery & Power Flow (Задача 2)
    batteryLevel: 100.0,   // State of charge (0% to 100%)
    powerFlow: 0,          // Live kW power flow (positive = discharge, negative = regen/charge)
    isCharging: false,     // Charging Pad docking status
    chargingSoundCooldown: 0,
    // e-PTO (electric Power Take-Off): the robotic arm's hydraulic pump.
    // `ptoOverrideUntil` forces the cluster to show the 240 kW peak while the
    // pump runs (the arm cycle itself already drives its own hydraulic audio).
    ptoOverrideUntil: 0,
    lastTrafficCollisionTime: 0,
    lowBatteryAlertTriggered: false, // Latches the ≤15% warning until >18% (hysteresis)

    // Post-crash rebound velocity (metres per unit-frame) applied after an NPC
    // collision so the truck visibly kicks back out of the contact point.
    collisionRecoilX: 0,
    collisionRecoilZ: 0,

    // Suspension dynamics
    pitch: 0,
    roll: 0,

    // Dimensions
    length: 8.8,
    width: 2.6,

    // Robotic Side-Arm Multi-Stage Animation
    arm: {
      active: false,
      state: 'idle', // 'extending', 'clamping', 'lifting', 'inverting', 'dumping', 'shaking', 'lowering', 'releasing', 'retracting'
      timer: 0,
      extension: 0,
      lift: 0,
      clamp: 0,
      inversion: 0,
      shake: 0,
      targetBin: null
    },

    // Compactor hydraulic blade
    compactorProgress: 0,
    isCompacting: false,

    // Factory unloading
    tailgateAngle: 0,
    isDumpingAtFactory: false,
    dumpProgress: 0,

    // Intermediate (pit-stop) dump at the plant — a short lock-out that empties
    // the hopper without ending the shift.
    isQuickDumping: false,
    quickDumpProgress: 0
  };

  let cutsceneActive = false;
  let stuckTimer = 0;
  let isStuckPulsingActive = false;
  let toastTimeout = null;
  // --- Battery depletion / tow-truck evacuation state ---
  let isEvacuating = false;      // true while the fade-to-black evacuation plays
  let evacuationTimeout = null;  // pending "delivered to the factory" completion

  function showToast(title, desc, icon = '🛣️', duration = 2800, isAlert = false) {
    if (!toastNotification) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = desc;
    if (toastIcon) toastIcon.textContent = icon;
    if (isAlert) {
      toastNotification.classList.add('stuck-alert');
    } else {
      toastNotification.classList.remove('stuck-alert');
    }
    toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show', 'stuck-alert');
    }, duration);
  }

  function hideToast() {
    if (!toastNotification) return;
    clearTimeout(toastTimeout);
    toastNotification.classList.remove('show', 'stuck-alert');
  }

  function setStuckPulsing(active) {
    isStuckPulsingActive = active;
    if (unstuckBtn) {
      if (active) unstuckBtn.classList.add('stuck-pulsing');
      else unstuckBtn.classList.remove('stuck-pulsing');
    }
    if (btnMobileUnstuck) {
      if (active) btnMobileUnstuck.classList.add('stuck-pulsing');
      else btnMobileUnstuck.classList.remove('stuck-pulsing');
    }
  }

  // --- Detailed 3D Model Materials ---
  const matLegoWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.22, metalness: 0.04 });
  const matLegoBlack = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.45, metalness: 0.1 });
  const matLegoGrey = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.35, metalness: 0.25 });
  const matLegoLime = new THREE.MeshStandardMaterial({ color: 0x56ab2f, roughness: 0.25, metalness: 0.08 });
  const matLegoDarkLime = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.25, metalness: 0.08 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.08, metalness: 0.9, transparent: true, opacity: 0.85 });
  const matHeadlight = new THREE.MeshStandardMaterial({ color: 0xfffa65, emissive: 0xfffa65, emissiveIntensity: 0.9 });
  const matTaillight = new THREE.MeshStandardMaterial({ color: 0xff3838, emissive: 0xff3838, emissiveIntensity: 0.8 });
  const matAmberBeacon = new THREE.MeshStandardMaterial({ color: 0xf39c12, emissive: 0xf39c12, emissiveIntensity: 0.85 });
  let amberBeaconBase = 0.9;
  let amberFlashUntil = 0;
  todVehicleMats.headlight = matHeadlight;
  todVehicleMats.taillight = matTaillight;
  todVehicleMats.amber = matAmberBeacon;

  // Municipal warning-beacon pulse (sharp flash on a slow cycle).
  function updateAmberBeacons() {
    const now = performance.now();
    if (now < amberFlashUntil) {
      matAmberBeacon.emissiveIntensity = 2.6;
      return;
    }
    const t = now * 0.0075;
    const sharp = Math.pow(Math.max(0, Math.sin(t * 2.15)), 7);
    matAmberBeacon.emissiveIntensity = amberBeaconBase * (0.32 + 1.25 * sharp);
  }
  const matChrome = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.05, metalness: 0.95 });

  // Reusable Lego Stud Geometry for authentic Lego Technic detailing
  const studGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 10);
  function addStudRow(parent, startX, startZ, countX, countZ, stepX, stepZ, yPos) {
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        const stud = new THREE.Mesh(studGeom, matLegoWhite);
        stud.position.set(startX + ix * stepX, yPos, startZ + iz * stepZ);
        parent.add(stud);
      }
    }
  }

  // --- Build The LEGO Mack LR Electric Truck ---
  const truckMesh = new THREE.Group();
  scene.add(truckMesh);

  // 1. Black Technic Chassis Frame
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.5, 8.8), matLegoBlack);
  chassis.position.y = 0.55;
  chassis.castShadow = true;
  truckMesh.add(chassis);

  // 2. White Cab (Mack LR Forward Low-Entry Cab)
  const cabGroup = new THREE.Group();
  cabGroup.position.set(0, 0.75, 2.7);

  // Cab Body
  const cabBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.9, 2.5), matLegoWhite);
  cabBody.position.y = 0.95;
  cabBody.castShadow = true;
  cabGroup.add(cabBody);

  // Front Windshield (Deep tinted glass)
  const windMesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.98, 0.15), matGlass);
  windMesh.position.set(0, 1.25, 1.22);
  cabGroup.add(windMesh);

  // Wiper blades on windshield — pivots at the glass base; sweep UP across the pane.
  // Left blade extends −X, right +X. Negative/positive rot.z respectively lifts the tip (+Y).
  const WIPER_REST = 0.1;
  const WIPER_SWEEP = 1.05;
  const wiperMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
  const wiperBladeGeo = new THREE.BoxGeometry(0.72, 0.045, 0.045);
  const wiperPivotL = new THREE.Group();
  wiperPivotL.position.set(-0.22, 0.95, 1.31);
  const wiperL = new THREE.Mesh(wiperBladeGeo, wiperMat);
  wiperL.position.set(-0.34, 0.02, 0);
  wiperPivotL.add(wiperL);
  wiperPivotL.rotation.z = -WIPER_REST;
  const wiperPivotR = new THREE.Group();
  wiperPivotR.position.set(0.22, 0.95, 1.31);
  const wiperR = new THREE.Mesh(wiperBladeGeo, wiperMat);
  wiperR.position.set(0.34, 0.02, 0);
  wiperPivotR.add(wiperR);
  wiperPivotR.rotation.z = WIPER_REST;
  cabGroup.add(wiperPivotL, wiperPivotR);

  let wiperPhase = 0;
  let wipersRunning = false;

  function setWiperAngles(sweepAmount) {
    const a = WIPER_REST + sweepAmount;
    wiperPivotL.rotation.z = -a;
    wiperPivotR.rotation.z = a;
  }

  // Sweep while raining; ease back to the parked rest pose when clear.
  function updateWipers() {
    const raining = activeWeather === 'rain';
    if (raining) {
      wipersRunning = true;
      wiperPhase += 0.07;
      // Smooth back-and-forth (0 → 1 → 0) without a hard reverse snap.
      const t = (Math.sin(wiperPhase) + 1) * 0.5;
      setWiperAngles(t * WIPER_SWEEP);
      return;
    }
    if (!wipersRunning) return;
    const cur = Math.abs(wiperPivotL.rotation.z);
    const next = cur + (WIPER_REST - cur) * 0.12;
    setWiperAngles(Math.max(0, next - WIPER_REST));
    if (Math.abs(Math.abs(wiperPivotL.rotation.z) - WIPER_REST) < 0.02) {
      setWiperAngles(0);
      wipersRunning = false;
      wiperPhase = 0;
    }
  }

  // Technic White A-Pillars with circular pin holes
  const pGeom = new THREE.BoxGeometry(0.18, 1.05, 0.18);
  const leftPillar = new THREE.Mesh(pGeom, matLegoWhite);
  leftPillar.position.set(-1.12, 1.25, 1.25);
  const rightPillar = new THREE.Mesh(pGeom, matLegoWhite);
  rightPillar.position.set(1.12, 1.25, 1.25);
  cabGroup.add(leftPillar, rightPillar);

  // Side Cab Windows
  const sideWGeom = new THREE.BoxGeometry(0.1, 0.85, 1.5);
  const leftWind = new THREE.Mesh(sideWGeom, matGlass);
  leftWind.position.set(-1.18, 1.25, 0.2);
  const rightWind = new THREE.Mesh(sideWGeom, matGlass);
  rightWind.position.set(1.18, 1.25, 0.2);
  cabGroup.add(leftWind, rightWind);

  // Side Mirrors on Metal Brackets
  function createMirror(isRight) {
    const mGroup = new THREE.Group();
    mGroup.position.set(isRight ? 1.35 : -1.35, 1.35, 1.1);
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.05, 0.05), matLegoBlack);
    const mirrorCase = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.25), matLegoBlack);
    mirrorCase.position.x = isRight ? 0.12 : -0.12;
    const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.58, 0.2), matChrome);
    mirrorGlass.position.x = isRight ? 0.05 : -0.05;
    mGroup.add(bracket, mirrorCase, mirrorGlass);
    return mGroup;
  }
  cabGroup.add(createMirror(false), createMirror(true));

  // Cab Interior: Minifig Driver, Steering Wheel & Dashboard
  // Driver sits on the LEFT seat (left-hand drive): the truck faces +Z, so its
  // left side is local +X.
  const driverHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0xf1c40f }));
  driverHead.position.set(0.45, 1.35, 0.1);
  const driverHelmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), matLegoWhite);
  driverHelmet.position.set(0.45, 1.48, 0.1);
  const driverVest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 0.3), new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.3 }));
  driverVest.position.set(0.45, 0.95, 0.1);
  // Realistic Steering Wheel
  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 8, 16), matLegoBlack);
  steerWheel.position.set(0.45, 1.05, 0.42);
  steerWheel.rotation.x = -Math.PI / 4;
  cabGroup.add(driverHead, driverHelmet, driverVest, steerWheel);

  // Front Bumper with License Plate & Tow Hooks
  const bumperGeom = new THREE.BoxGeometry(2.45, 0.45, 0.35);
  const bumper = new THREE.Mesh(bumperGeom, matLegoBlack);
  bumper.position.set(0, 0.25, 1.3);
  cabGroup.add(bumper);

  // Plate [MACK-EV 2026]
  const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.22), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }));
  plateMesh.position.set(0, 0.25, 1.48);
  cabGroup.add(plateMesh);

  // Front Grille with Chrome MACK text
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.65, 0.12), matLegoBlack);
  grille.position.set(0, 0.68, 1.28);
  const mackEmblem = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.15, 0.05), matChrome);
  mackEmblem.position.set(0, 0.72, 1.35);
  cabGroup.add(grille, mackEmblem);

  // LED Headlights & Turn Indicators
  const hlGeom = new THREE.BoxGeometry(0.38, 0.26, 0.12);
  const hlL = new THREE.Mesh(hlGeom, matHeadlight);
  hlL.position.set(-0.9, 0.68, 1.3);
  const hlR = new THREE.Mesh(hlGeom, matHeadlight);
  hlR.position.set(0.9, 0.68, 1.3);
  cabGroup.add(hlL, hlR);

  // Dual Real 3D Headlight Spotlights illuminating street ahead
  const spotL = new THREE.SpotLight(0xfffaed, 2.5, 42, Math.PI / 6, 0.35, 1);
  spotL.position.set(-0.9, 1.2, 4.2);
  const spotR = new THREE.SpotLight(0xfffaed, 2.5, 42, Math.PI / 6, 0.35, 1);
  spotR.position.set(0.9, 1.2, 4.2);
  const spotTarget = new THREE.Object3D();
  spotTarget.position.set(0, 0.2, 30);
  truckMesh.add(spotTarget);
  spotL.target = spotTarget;
  spotR.target = spotTarget;
  truckMesh.add(spotL, spotR);

  // Black Roof Gear Knob from Technic Set
  const gearKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.22, 14), matLegoBlack);
  gearKnob.position.set(0, 2.0, 0.3);
  cabGroup.add(gearKnob);

  // 5 Amber Cab Brow Clearance Marker Lights (Mack Commercial Spec)
  for (let i = -2; i <= 2; i++) {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.1), matAmberBeacon);
    marker.position.set(i * 0.42, 1.95, 1.24);
    cabGroup.add(marker);
  }

  // Roof Amber Beacon Lights
  const cabBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.22), matAmberBeacon);
  cabBeacon.position.set(0, 2.0, 1.05);
  cabGroup.add(cabBeacon);

  truckMesh.add(cabGroup);

  // Chrome Air Cleaner / Exhaust Stack Behind Cab
  const airStack = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.6, 12), matChrome);
  airStack.position.set(-0.98, 1.75, 1.1);
  airStack.castShadow = true;
  truckMesh.add(airStack);

  // Side Under-Run Protection Safety Rail (Left side between wheels)
  const sideGuard = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 2.8), matLegoLime);
  sideGuard.position.set(-1.26, 0.55, 0.45);
  truckMesh.add(sideGuard);

  // Black Wheel Arch Mudguards over wheels
  function createMudguard(x, z, len) {
    const mg = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, len), matLegoBlack);
    mg.position.set(x, 1.04, z);
    return mg;
  }
  truckMesh.add(createMudguard(-1.18, 2.7, 1.4));
  truckMesh.add(createMudguard(1.18, 2.7, 1.4));
  truckMesh.add(createMudguard(-1.18, -2.42, 2.8));
  truckMesh.add(createMudguard(1.18, -2.42, 2.8));

  // 3. Mack Electric Mid-Section Battery Pack & Cooling Grilles
  const batteryBox = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.95, 0.85), matLegoGrey);
  batteryBox.position.set(0, 1.15, 1.15);
  batteryBox.castShadow = true;
  truckMesh.add(batteryBox);

  // Battery charge LED display
  const batLED = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.25, 0.45), matLegoDarkLime);
  batLED.position.set(1.21, 1.15, 1.15);
  truckMesh.add(batLED);

  // 4. White Compactor Container Box (Back Section)
  const compactorGroup = new THREE.Group();
  compactorGroup.position.set(0, 0.75, -1.8);

  const container = new THREE.Mesh(new THREE.BoxGeometry(2.45, 2.15, 4.95), matLegoWhite);
  container.position.y = 1.12;
  container.castShadow = true;
  compactorGroup.add(container);

  // Top Hopper Opening (where trash drops in)
  const hopper = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.55, 1.3), matLegoBlack);
  hopper.position.set(0, 2.18, 1.7);
  compactorGroup.add(hopper);

  // Internal Compactor Blade
  const compactorBlade = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.6, 0.25), matLegoGrey);
  compactorBlade.position.set(0, 1.1, 1.8);
  compactorGroup.add(compactorBlade);

  // Real Lego Studs on Compactor Roof!
  addStudRow(compactorGroup, -0.9, -2.1, 2, 8, 1.8, 0.55, 2.24);

  // Green Pine Tree & RECYCLE Decals on side panels
  function createRecycleDecal(isRightSide) {
    const dCanvas = document.createElement('canvas');
    dCanvas.width = 512;
    dCanvas.height = 256;
    const dctx = dCanvas.getContext('2d');
    dctx.fillStyle = '#ffffff';
    dctx.fillRect(0, 0, 512, 256);

    // Green pine trees logo
    dctx.fillStyle = '#27ae60';
    dctx.beginPath();
    dctx.moveTo(110, 180);
    dctx.lineTo(75, 85);
    dctx.lineTo(110, 100);
    dctx.lineTo(80, 45);
    dctx.lineTo(135, 20);
    dctx.lineTo(190, 45);
    dctx.lineTo(160, 100);
    dctx.lineTo(195, 85);
    dctx.closePath();
    dctx.fill();

    // Text decals
    dctx.fillStyle = '#2ecc71';
    dctx.font = 'bold 36px sans-serif';
    dctx.fillText('RECYCLE ♻', 220, 110);
    dctx.font = 'bold 24px sans-serif';
    dctx.fillStyle = '#2c3e50';
    dctx.fillText('MACK ELECTRIC', 220, 150);

    const texture = new THREE.CanvasTexture(dCanvas);
    const dMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.6), new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 }));
    dMesh.position.set(isRightSide ? 1.24 : -1.24, 1.2, -0.2);
    dMesh.rotation.y = isRightSide ? Math.PI / 2 : -Math.PI / 2;
    return dMesh;
  }
  compactorGroup.add(createRecycleDecal(true));
  compactorGroup.add(createRecycleDecal(false));

  // Amber Warning Beacons on rear roof
  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.22, 10), matAmberBeacon);
  b1.position.set(-1.05, 2.25, -2.38);
  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.22, 10), matAmberBeacon);
  b2.position.set(1.05, 2.25, -2.38);
  compactorGroup.add(b1, b2);

  // Chevron Hazard Striping Texture Helper
  function createHazardStripeTexture() {
    const hCanvas = document.createElement('canvas');
    hCanvas.width = 256;
    hCanvas.height = 64;
    const hctx = hCanvas.getContext('2d');
    hctx.fillStyle = '#ffffff';
    hctx.fillRect(0, 0, 256, 64);
    hctx.fillStyle = '#e74c3c';
    const stripeW = 28;
    for (let x = -64; x < 320; x += stripeW * 2) {
      hctx.beginPath();
      hctx.moveTo(x, 0);
      hctx.lineTo(x + stripeW, 0);
      hctx.lineTo(x + stripeW - 24, 64);
      hctx.lineTo(x - 24, 64);
      hctx.closePath();
      hctx.fill();
    }
    return new THREE.CanvasTexture(hCanvas);
  }
  const matHazardStripe = new THREE.MeshStandardMaterial({ map: createHazardStripeTexture(), roughness: 0.35 });

  // Rear Heavy Mudflaps
  function createMudflap(isRight) {
    const mfGroup = new THREE.Group();
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.65, 0.04), matLegoBlack);
    flap.position.y = -0.32;
    const mfCanvas = document.createElement('canvas');
    mfCanvas.width = 128;
    mfCanvas.height = 128;
    const mctx = mfCanvas.getContext('2d');
    mctx.fillStyle = '#1e272e';
    mctx.fillRect(0, 0, 128, 128);
    mctx.fillStyle = '#ffffff';
    mctx.font = 'bold 22px sans-serif';
    mctx.textAlign = 'center';
    mctx.fillText('MACK', 64, 52);
    mctx.font = '14px sans-serif';
    mctx.fillStyle = '#2ecc71';
    mctx.fillText('⚡ ELECTRIC', 64, 82);
    const mfTex = new THREE.CanvasTexture(mfCanvas);
    const decal = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), new THREE.MeshBasicMaterial({ map: mfTex }));
    decal.position.set(0, -0.32, -0.025);
    decal.rotation.y = Math.PI;
    mfGroup.add(flap, decal);
    mfGroup.position.set(isRight ? 1.05 : -1.05, 0.62, -2.4);
    return mfGroup;
  }
  compactorGroup.add(createMudflap(true));
  compactorGroup.add(createMudflap(false));

  // 5. Hinged Rear Tailgate (opens upward on factory unload)
  const tailgateGroup = new THREE.Group();
  tailgateGroup.position.set(0, 2.18, -2.48);
  const tailgate = new THREE.Mesh(new THREE.BoxGeometry(2.42, 2.05, 0.22), matLegoWhite);
  tailgate.position.y = -1.02;
  tailgate.castShadow = true;
  tailgateGroup.add(tailgate);

  // Rear Hazard Bumper Beam with Chevron Stripes
  const hazardBumper = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.34, 0.12), matHazardStripe);
  hazardBumper.position.set(0, -1.82, -0.16);
  tailgateGroup.add(hazardBumper);

  // Heavy Duty Chrome Sanitation Footstep
  const stepBar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.3, 8), matChrome);
  stepBar.rotateZ(Math.PI / 2);
  stepBar.position.set(0, -1.98, -0.22);
  tailgateGroup.add(stepBar);

  // Dual Chrome Vertical Grab Rails on tailgate edges
  const railL = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 8), matChrome);
  railL.position.set(-1.12, -0.95, -0.15);
  const railR = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 8), matChrome);
  railR.position.set(1.12, -0.95, -0.15);
  tailgateGroup.add(railL, railR);

  // License Plate [MACK-EV 2026]
  const lpCanvas = document.createElement('canvas');
  lpCanvas.width = 256;
  lpCanvas.height = 72;
  const lpCtx = lpCanvas.getContext('2d');
  lpCtx.fillStyle = '#ffffff';
  lpCtx.fillRect(0, 0, 256, 72);
  lpCtx.fillStyle = '#0984e3';
  lpCtx.fillRect(0, 0, 36, 72);
  lpCtx.fillStyle = '#ffffff';
  lpCtx.font = 'bold 20px sans-serif';
  lpCtx.fillText('⚡', 8, 44);
  lpCtx.fillStyle = '#1e272e';
  lpCtx.font = '900 30px sans-serif';
  lpCtx.fillText('MACK-EV 26', 46, 48);
  const lpTex = new THREE.CanvasTexture(lpCanvas);
  const lpMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.28), new THREE.MeshBasicMaterial({ map: lpTex }));
  lpMesh.position.set(0, -1.5, -0.12);
  lpMesh.rotation.y = Math.PI;
  tailgateGroup.add(lpMesh);

  // High-Mounted Center Brake LED Strip (CHMSL)
  const chmsl = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.06), matTaillight);
  chmsl.position.set(0, -0.12, -0.12);
  tailgateGroup.add(chmsl);

  // Tailgate Taillights & Reversing Lights (Red, Amber, White LED clusters)
  [-1, 1].forEach(side => {
    const tGroup = new THREE.Group();
    tGroup.position.set(side * 0.96, -1.6, -0.12);
    const brk = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.06), matTaillight);
    brk.position.x = -0.09 * side;
    const amb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.06), matAmberBeacon);
    amb.position.x = 0.08 * side;
    tGroup.add(brk, amb);
    tailgateGroup.add(tGroup);
  });

  // Rear Service Ladder on left side of container
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(-1.26, 1.1, -1.2);
  const lRail1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 8), matChrome);
  lRail1.position.z = -0.22;
  const lRail2 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 8), matChrome);
  lRail2.position.z = 0.22;
  ladderGroup.add(lRail1, lRail2);
  for (let r = 0; r < 5; r++) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.44, 8), matChrome);
    rung.rotateX(Math.PI / 2);
    rung.position.y = -0.7 + r * 0.35;
    ladderGroup.add(rung);
  }
  compactorGroup.add(ladderGroup);

  compactorGroup.add(tailgateGroup);
  truckMesh.add(compactorGroup);

  // 6. Highly Detailed Articulated Robotic Side-Arm (RIGHT SIDE)
  const armBase = new THREE.Group();
  armBase.position.set(1.24, 1.1, 0.85);

  // Hydraulic cylinder on arm base with chrome rod
  const cylCase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 10), matLegoBlack);
  cylCase.position.set(0.1, 0.2, 0);
  const cylRod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.7, 10), matChrome);
  cylRod.position.set(0.1, 0.6, 0);
  armBase.add(cylCase, cylRod);

  // Primary Boom Link (Lime Green Technic beam with pin holes)
  const boomLink = new THREE.Group();
  const boomGeom = new THREE.BoxGeometry(0.2, 0.28, 1.65);
  const boomMesh = new THREE.Mesh(boomGeom, matLegoLime);
  boomMesh.position.z = 0.82;
  boomLink.add(boomMesh);

  // Pin holes in boom
  const pinGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.22, 8);
  pinGeom.rotateX(Math.PI / 2);
  const p1 = new THREE.Mesh(pinGeom, matLegoBlack);
  p1.position.set(0, 0, 0.3);
  const p2 = new THREE.Mesh(pinGeom, matLegoBlack);
  p2.position.set(0, 0, 1.2);
  boomLink.add(p1, p2);
  armBase.add(boomLink);

  // Secondary Forearm Link
  const forearm = new THREE.Group();
  forearm.position.z = 1.65;
  const forearmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 1.45), matLegoDarkLime);
  forearmMesh.position.z = 0.72;
  forearm.add(forearmMesh);
  boomLink.add(forearm);

  // Grabber Claws (Grey curved clamp jaws)
  const clawGroup = new THREE.Group();
  clawGroup.position.z = 1.45;
  const clawL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.42, 0.45), matLegoGrey);
  clawL.position.set(-0.28, 0, 0.22);
  const clawR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.42, 0.45), matLegoGrey);
  clawR.position.set(0.28, 0, 0.22);
  clawGroup.add(clawL, clawR);

  // Bin clone attached to claw during collection
  const heldBinMesh = createBinMesh('#27ae60');
  heldBinMesh.visible = false;
  heldBinMesh.position.set(0, -0.6, 0.25);
  clawGroup.add(heldBinMesh);

  forearm.add(clawGroup);
  truckMesh.add(armBase);

  // 7. Detailed 3D Lego Wheels (6 Wheels: 2 Steer Front, 4 Tandem Rear)
  const wheels = [];
  const tireGeom = new THREE.CylinderGeometry(0.54, 0.54, 0.42, 24);
  tireGeom.rotateZ(Math.PI / 2);

  const wheelPositions = [
    { x: -1.18, y: 0.54, z: 2.7, isFront: true },
    { x: 1.18, y: 0.54, z: 2.7, isFront: true },
    { x: -1.18, y: 0.54, z: -1.8, isFront: false },
    { x: 1.18, y: 0.54, z: -1.8, isFront: false },
    { x: -1.18, y: 0.54, z: -3.05, isFront: false },
    { x: 1.18, y: 0.54, z: -3.05, isFront: false }
  ];

  wheelPositions.forEach(pos => {
    const wGroup = new THREE.Group();
    wGroup.position.set(pos.x, pos.y, pos.z);

    // Tread Rubber Tire
    const tire = new THREE.Mesh(tireGeom, matLegoBlack);
    tire.castShadow = true;
    wGroup.add(tire);

    // Silver Rim
    const rimGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.44, 16);
    rimGeom.rotateZ(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeom, matLegoGrey);
    wGroup.add(rim);

    // 6 Lug Nuts around rim
    for (let l = 0; l < 6; l++) {
      const angle = (l / 6) * Math.PI * 2;
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.46, 6), matChrome);
      nut.rotateZ(Math.PI / 2);
      nut.position.set(0, Math.sin(angle) * 0.22, Math.cos(angle) * 0.22);
      wGroup.add(nut);
    }

    truckMesh.add(wGroup);
    wheels.push({ group: wGroup, isFront: pos.isFront });
  });

  // --- Wheelie Bin Mesh Builder Helper (Задача 3: Цветовое кодирование по категориям) ---
  function createBinMesh(categoryOrColor) {
    const binGroup = new THREE.Group();
    const color = (typeof categoryOrColor === 'object' && categoryOrColor) ? categoryOrColor.color : (categoryOrColor || '#2ecc71');

    // Body with molded vertical ribs
    const bodyGeom = new THREE.BoxGeometry(0.95, 1.25, 0.95);
    const body = new THREE.Mesh(bodyGeom, matLegoBlack);
    body.position.y = 0.62;
    body.castShadow = true;
    binGroup.add(body);

    // Color category trim band
    const bandGeom = new THREE.BoxGeometry(0.98, 0.16, 0.98);
    const matBand = new THREE.MeshStandardMaterial({ color: color, roughness: 0.35 });
    const band = new THREE.Mesh(bandGeom, matBand);
    band.position.y = 0.92;
    binGroup.add(band);

    // Hinged Lid with handle
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 1.25, -0.45); // hinge pivot on rear
    const lidGeom = new THREE.BoxGeometry(1.02, 0.18, 1.02);
    const matLid = new THREE.MeshStandardMaterial({ color: color, roughness: 0.28 });
    const lid = new THREE.Mesh(lidGeom, matLid);
    lid.position.set(0, 0.09, 0.45);
    lid.castShadow = true;
    lidGroup.add(lid);

    // Lid Handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.1), matLegoBlack);
    handle.position.set(0, 0.22, 0.85);
    lidGroup.add(handle);

    binGroup.add(lidGroup);

    // Rubber Wheels on Axle
    const wGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.09, 12);
    wGeom.rotateZ(Math.PI / 2);
    const w1 = new THREE.Mesh(wGeom, matLegoBlack);
    w1.position.set(-0.52, 0.16, -0.32);
    const w2 = new THREE.Mesh(wGeom, matLegoBlack);
    w2.position.set(0.52, 0.16, -0.32);
    binGroup.add(w1, w2);

    binGroup.lidGroup = lidGroup;
    return binGroup;
  }

  // --- 3D Target Markers (Category-Coded Floating Arrow & Pulsing Ground Halo) ---
  const matMarkerDiamond = new THREE.MeshStandardMaterial({
    color: 0x00d2d3,
    emissive: 0x00d2d3,
    emissiveIntensity: 0.85,
    roughness: 0.15
  });

  const arrowConeGeom = new THREE.ConeGeometry(0.38, 0.65, 8);
  arrowConeGeom.rotateX(Math.PI); // Point downwards towards bin
  const arrowStemGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.48, 8);
  const arrowGemGeom = new THREE.OctahedronGeometry(0.2);
  const markerRingGeom = new THREE.RingGeometry(0.85, 1.25, 24);
  markerRingGeom.rotateX(-Math.PI / 2);

  function createBinMarker(category) {
    const markerGroup = new THREE.Group();
    const markerHex = (category && category.markerHex) ? category.markerHex : 0x2ecc71;

    const matMarker = new THREE.MeshStandardMaterial({
      color: markerHex,
      emissive: markerHex,
      emissiveIntensity: 0.95,
      roughness: 0.25,
      metalness: 0.1
    });

    // 1. Floating Animated Arrow
    const arrowGroup = new THREE.Group();
    arrowGroup.position.y = 2.4;

    const cone = new THREE.Mesh(arrowConeGeom, matMarker);
    cone.position.y = -0.2;
    arrowGroup.add(cone);

    const stem = new THREE.Mesh(arrowStemGeom, matMarker);
    stem.position.y = 0.35;
    arrowGroup.add(stem);

    const gem = new THREE.Mesh(arrowGemGeom, matMarkerDiamond);
    gem.position.y = 0.72;
    arrowGroup.add(gem);

    markerGroup.add(arrowGroup);

    // 2. Ground Pulsing Ring
    const ringMat = new THREE.MeshBasicMaterial({
      color: markerHex,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ring = new THREE.Mesh(markerRingGeom, ringMat);
    ring.position.y = 0.05;
    markerGroup.add(ring);

    markerGroup.arrowGroup = arrowGroup;
    markerGroup.ring = ring;

    return markerGroup;
  }

  // --- Factory Delivery Beacon ---
  const factoryBeaconConeGeom = new THREE.ConeGeometry(1.1, 1.9, 8);
  factoryBeaconConeGeom.rotateX(Math.PI);
  const factoryBeaconStemGeom = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 8);
  const matFactoryBeacon = new THREE.MeshStandardMaterial({
    color: 0xf39c12,
    emissive: 0xe67e22,
    emissiveIntensity: 0.95,
    roughness: 0.2
  });

  function createFactoryBeacon() {
    const group = new THREE.Group();
    const arrowGroup = new THREE.Group();
    arrowGroup.position.y = 6.0;

    const cone = new THREE.Mesh(factoryBeaconConeGeom, matFactoryBeacon);
    cone.position.y = -0.6;
    arrowGroup.add(cone);

    const stem = new THREE.Mesh(factoryBeaconStemGeom, matFactoryBeacon);
    stem.position.y = 0.85;
    arrowGroup.add(stem);

    group.add(arrowGroup);
    group.arrowGroup = arrowGroup;
    group.visible = false;
    return group;
  }

  // --- 3D City Environment Generation ---
  let buildings3D = [];
  let trashBins3D = [];
  let recyclingPlant3D = null;
  const colliders = [];

  // Procedural Bicycle Lane Material
  let matBikeLane = null;
  function getBikeLaneMaterial() {
    if (!matBikeLane) {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 128;
      bCanvas.height = 256;
      const bctx = bCanvas.getContext('2d');
      bctx.fillStyle = '#0984e3';
      bctx.fillRect(0, 0, 128, 256);
      bctx.strokeStyle = '#ffffff';
      bctx.lineWidth = 6;
      bctx.beginPath();
      bctx.arc(42, 160, 20, 0, Math.PI * 2);
      bctx.arc(86, 160, 20, 0, Math.PI * 2);
      bctx.stroke();
      bctx.beginPath();
      bctx.moveTo(42, 160);
      bctx.lineTo(60, 120);
      bctx.lineTo(82, 120);
      bctx.lineTo(86, 160);
      bctx.moveTo(60, 120);
      bctx.lineTo(68, 160);
      bctx.lineTo(82, 120);
      bctx.moveTo(56, 110);
      bctx.lineTo(66, 110);
      bctx.moveTo(76, 110);
      bctx.lineTo(86, 110);
      bctx.stroke();
      const tex = new THREE.CanvasTexture(bCanvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 4);
      matBikeLane = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 });
    }
    return matBikeLane;
  }

  // Procedural Cast-Iron Manhole Cover Material
  let matManhole = null;
  function getManholeMaterial() {
    if (!matManhole) {
      const mCanvas = document.createElement('canvas');
      mCanvas.width = 256;
      mCanvas.height = 256;
      const mctx = mCanvas.getContext('2d');
      mctx.fillStyle = '#23272e';
      mctx.beginPath();
      mctx.arc(128, 128, 124, 0, Math.PI * 2);
      mctx.fill();
      mctx.strokeStyle = '#3e4652';
      mctx.lineWidth = 6;
      [104, 78, 52, 26].forEach(r => {
        mctx.beginPath();
        mctx.arc(128, 128, r, 0, Math.PI * 2);
        mctx.stroke();
      });
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        mctx.beginPath();
        mctx.moveTo(128 + Math.cos(a) * 35, 128 + Math.sin(a) * 35);
        mctx.lineTo(128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110);
        mctx.stroke();
      }
      const tex = new THREE.CanvasTexture(mCanvas);
      matManhole = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.65, metalness: 0.75 });
    }
    return matManhole;
  }

  // Procedural Crystalline Solar Panel Material
  let matSolarCell = null;
  function getSolarPanelMaterial() {
    if (!matSolarCell) {
      const spCanvas = document.createElement('canvas');
      spCanvas.width = 256;
      spCanvas.height = 256;
      const spCtx = spCanvas.getContext('2d');
      spCtx.fillStyle = '#0e2447';
      spCtx.fillRect(0, 0, 256, 256);
      spCtx.strokeStyle = '#4a729e';
      spCtx.lineWidth = 2.5;
      for (let x = 32; x < 256; x += 32) {
        spCtx.beginPath(); spCtx.moveTo(x, 0); spCtx.lineTo(x, 256); spCtx.stroke();
      }
      for (let y = 32; y < 256; y += 32) {
        spCtx.beginPath(); spCtx.moveTo(0, y); spCtx.lineTo(256, y); spCtx.stroke();
      }
      spCtx.strokeStyle = '#ecf0f1';
      spCtx.lineWidth = 5;
      [64, 128, 192].forEach(x => {
        spCtx.beginPath(); spCtx.moveTo(x, 0); spCtx.lineTo(x, 256); spCtx.stroke();
      });
      const tex = new THREE.CanvasTexture(spCanvas);
      matSolarCell = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.12, metalness: 0.85 });
    }
    return matSolarCell;
  }

  // --- Authentic LEGO Minifigure Model ---
  function createMinifigure3D(x, z, rotY, shirtColor, pantsColor, hasCap, opts) {
    const mini = new THREE.Group();
    mini.position.set(x, 0.35, z);
    mini.rotation.y = rotY;

    const matSkin = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3 });
    const matPants = new THREE.MeshStandardMaterial({ color: pantsColor || 0x2c3e50, roughness: 0.4 });
    const matShirt = new THREE.MeshStandardMaterial({ color: shirtColor || 0xe74c3c, roughness: 0.4 });
    const matHair = new THREE.MeshStandardMaterial({ color: 0x4a2c11, roughness: 0.5 });

    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.22), matPants);
    hips.position.y = 0.46;
    // Pivot legs at the hip so walk cycles swing around the joint, not the shin centre.
    const legL = new THREE.Group();
    legL.position.set(-0.11, 0.42, 0);
    const legLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), matPants);
    legLMesh.position.y = -0.21;
    legL.add(legLMesh);
    const legR = new THREE.Group();
    legR.position.set(0.11, 0.42, 0);
    const legRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), matPants);
    legRMesh.position.y = -0.21;
    legR.add(legRMesh);
    mini.add(hips, legL, legR);
    mini.userData.legL = legL;
    mini.userData.legR = legR;

    const torsoGeom = new THREE.CylinderGeometry(0.34, 0.42, 0.48, 4);
    torsoGeom.rotateY(Math.PI / 4);
    const torso = new THREE.Mesh(torsoGeom, matShirt);
    torso.position.y = 0.76;
    torso.castShadow = true;
    mini.add(torso);

    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.26, 12), matSkin);
    head.position.y = 1.13;
    const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10), matSkin);
    stud.position.y = 1.3;
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), matLegoBlack);
    eyeL.position.set(-0.06, 1.16, 0.155);
    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), matLegoBlack);
    eyeR.position.set(0.06, 1.16, 0.155);
    mini.add(head, stud, eyeL, eyeR);

    if (hasCap) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 12), matShirt);
      cap.position.y = 1.3;
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.14), matShirt);
      visor.position.set(0, 1.28, 0.18);
      mini.add(cap, visor);
    } else {
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), matHair);
      hair.position.set(0, 1.3, -0.02);
      hair.scale.set(1.05, 0.8, 1.1);
      mini.add(hair);
    }

    [-1, 1].forEach(s => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.38, 8), matShirt);
      arm.position.set(s * 0.25, 0.74, 0);
      arm.rotation.z = s * 0.2;
      const hand = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.02, 6, 8, Math.PI * 1.5), matSkin);
      hand.position.set(s * 0.28, 0.52, 0.04);
      hand.rotation.y = s * Math.PI / 2;
      mini.add(arm, hand);
    });

    // Walking pedestrians are managed in `scene` (like NPC cars); static props stay in cityRoot.
    if (!(opts && opts.skipCityAdd)) cityAdd(mini);
    return mini;
  }

  // --- Striped LEGO Awning Helper ---
  function createStripedAwning(w, d, stripeColorHex) {
    const awningGroup = new THREE.Group();
    const numStripes = 6;
    const stripeW = w / numStripes;
    const matStripe = new THREE.MeshStandardMaterial({ color: stripeColorHex, roughness: 0.5 });
    const matWhiteStripe = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });

    for (let s = 0; s < numStripes; s++) {
      const smat = (s % 2 === 0) ? matStripe : matWhiteStripe;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(stripeW, 0.06, d), smat);
      panel.position.set(-w / 2 + stripeW * (s + 0.5), 0, d * 0.45);
      panel.rotation.x = 0.38;
      panel.castShadow = true;
      const valance = new THREE.Mesh(new THREE.BoxGeometry(stripeW * 0.94, 0.22, 0.04), smat);
      valance.position.set(-w / 2 + stripeW * (s + 0.5), -d * 0.24, d * 0.88);
      awningGroup.add(panel, valance);
    }
    return awningGroup;
  }

  // --- White Estate Fence Line Helper (Optimized for 60 FPS) ---
  const fencePostGeom = new THREE.BoxGeometry(0.12, 0.65, 0.12);
  const fenceCapGeom = new THREE.ConeGeometry(0.09, 0.10, 4);
  fenceCapGeom.rotateY(Math.PI / 4);

  function createPicketFenceLine(startX, startZ, endX, endZ) {
    const fenceGroup = new THREE.Group();
    const len = Math.hypot(endX - startX, endZ - startZ);
    const angle = Math.atan2(endX - startX, endZ - startZ);
    fenceGroup.position.set((startX + endX) / 2, 0.35, (startZ + endZ) / 2);
    fenceGroup.rotation.y = angle;

    // Elegant 3-rail suburban fence
    const railTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, len), matLegoWhite);
    railTop.position.y = 0.52;
    railTop.matrixAutoUpdate = false;
    railTop.updateMatrix();

    const railMid = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, len), matLegoWhite);
    railMid.position.y = 0.32;
    railMid.matrixAutoUpdate = false;
    railMid.updateMatrix();

    const railBottom = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.10, len), matLegoWhite);
    railBottom.position.y = 0.12;
    railBottom.matrixAutoUpdate = false;
    railBottom.updateMatrix();

    fenceGroup.add(railTop, railMid, railBottom);

    // Sturdy white posts with pyramid caps spaced every 2.6 meters
    const numPosts = Math.max(2, Math.floor(len / 2.6));
    for (let p = 0; p <= numPosts; p++) {
      const pz = -len / 2 + (p / numPosts) * len;
      const post = new THREE.Mesh(fencePostGeom, matLegoWhite);
      post.position.set(0, 0.32, pz);
      post.matrixAutoUpdate = false;
      post.updateMatrix();

      const cap = new THREE.Mesh(fenceCapGeom, matLegoWhite);
      cap.position.set(0, 0.69, pz);
      cap.matrixAutoUpdate = false;
      cap.updateMatrix();

      fenceGroup.add(post, cap);
    }
    fenceGroup.matrixAutoUpdate = false;
    fenceGroup.updateMatrix();
    cityAdd(fenceGroup);
    return fenceGroup;
  }

  // --- Park Bench Helper ---
  function createParkBench3D(x, z, rotY) {
    const bench = new THREE.Group();
    bench.position.set(x, 0.35, z);
    bench.rotation.y = rotY;

    const matWood = new THREE.MeshStandardMaterial({ color: 0x9c5a2b, roughness: 0.6 });
    for (let s = 0; s < 3; s++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.18), matWood);
      slat.position.set(0, 0.42, -0.15 + s * 0.2);
      bench.add(slat);
    }
    for (let b = 0; b < 2; b++) {
      const backSlat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.16, 0.06), matWood);
      backSlat.position.set(0, 0.68 + b * 0.2, -0.28);
      bench.add(backSlat);
    }
    [-0.7, 0.7].forEach(lx => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 0.5), matLegoBlack);
      leg.position.set(lx, 0.21, 0.05);
      const backPost = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.08), matLegoBlack);
      backPost.position.set(lx, 0.65, -0.26);
      bench.add(leg, backPost);
    });

    cityAdd(bench);
    return bench;
  }

  function generate3DCity() {
    const map = getActiveMap();
    gridCoords = map.gridCoords.slice();
    ROAD_EDGE = map.roadEdge;
    WORLD_SIZE = map.worldSize || WORLD_SIZE;
    ROAD_W = map.roadWidth || ROAD_W;

    disposeCityRoot();
    nightGlowMats.length = 0;
    trashBins3D.forEach(b => {
      scene.remove(b.mesh);
      if (b.marker) scene.remove(b.marker);
    });
    buildings3D = [];
    trashBins3D = [];
    recyclingPlant3D = null;
    colliders.length = 0;
    crosswalks = [];

    cityRoot = new THREE.Group();
    cityRoot.name = 'cityRoot';
    scene.add(cityRoot);

    // Ground Grass Plane
    const groundGeom = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE);
    groundGeom.rotateX(-Math.PI / 2);
    const ground = new THREE.Mesh(
      groundGeom,
      new THREE.MeshStandardMaterial({ color: map.groundColor || 0x1f8441, roughness: 0.75 })
    );
    ground.receiveShadow = true;
    cityAdd(ground);

    // Asphalt Roads — cut off right after the outermost intersections so the
    // perimeter sidewalks sit flush against the kerb (ROAD_EDGE = ±128).
    const ROAD_LEN = 2 * ROAD_EDGE;
    // Reuse shared matRoad so rain wetness survives city rebuilds.
    applyRoadSurface(activeWeather === 'rain');
    gridCoords.forEach(gz => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_LEN, ROAD_W), matRoad);
      road.rotateX(-Math.PI / 2);
      road.position.set(0, 0.02, gz);
      road.receiveShadow = true;
      road.matrixAutoUpdate = false;
      road.updateMatrix();
      cityAdd(road);
    });
    gridCoords.forEach(gx => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_W, ROAD_LEN), matRoad);
      road.rotateX(-Math.PI / 2);
      road.position.set(gx, 0.025, 0);
      road.receiveShadow = true;
      road.matrixAutoUpdate = false;
      road.updateMatrix();
      cityAdd(road);
    });

    const matZebra = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.4 });

    // Mid-block marking runs derived from the active map's intersection grid.
    const roadIntervals = buildRoadIntervals(gridCoords);

    // Horizontal road markings
    gridCoords.forEach(gz => {
      roadIntervals.forEach(seg => {
        const segLen = seg.end - seg.start;
        const midX = (seg.start + seg.end) / 2;

        for (let x = seg.start + 2; x < seg.end - 2; x += 5.8) {
          const dash = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.32), matZebra);
          dash.rotateX(-Math.PI / 2);
          dash.position.set(x + 1.6, 0.032, gz);
          dash.matrixAutoUpdate = false;
          dash.updateMatrix();
          cityAdd(dash);
        }

        const sLine1 = new THREE.Mesh(new THREE.PlaneGeometry(segLen, 0.22), matZebra);
        sLine1.rotateX(-Math.PI / 2);
        sLine1.position.set(midX, 0.032, gz + ROAD_W / 2 - 0.45);
        sLine1.matrixAutoUpdate = false;
        sLine1.updateMatrix();

        const sLine2 = new THREE.Mesh(new THREE.PlaneGeometry(segLen, 0.22), matZebra);
        sLine2.rotateX(-Math.PI / 2);
        sLine2.position.set(midX, 0.032, gz - ROAD_W / 2 + 0.45);
        sLine2.matrixAutoUpdate = false;
        sLine2.updateMatrix();
        cityAdd(sLine1, sLine2);

        // No bike lanes on the industrial map — wide truck carriageways only.
        if (map.theme !== 'industrial') {
          const bikeLane = new THREE.Mesh(new THREE.PlaneGeometry(segLen, 1.85), getBikeLaneMaterial());
          bikeLane.rotateX(-Math.PI / 2);
          bikeLane.position.set(midX, 0.031, gz - ROAD_W / 2 + 1.45);
          bikeLane.matrixAutoUpdate = false;
          bikeLane.updateMatrix();
          cityAdd(bikeLane);

          const bSep = new THREE.Mesh(new THREE.PlaneGeometry(segLen, 0.16), matZebra);
          bSep.rotateX(-Math.PI / 2);
          bSep.position.set(midX, 0.033, gz - ROAD_W / 2 + 2.4);
          bSep.matrixAutoUpdate = false;
          bSep.updateMatrix();
          cityAdd(bSep);
        }
      });
    });

    // Vertical road markings
    gridCoords.forEach(gx => {
      roadIntervals.forEach(seg => {
        const segLen = seg.end - seg.start;
        const midZ = (seg.start + seg.end) / 2;

        for (let z = seg.start + 2; z < seg.end - 2; z += 5.8) {
          const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 3.2), matZebra);
          dash.rotateX(-Math.PI / 2);
          dash.position.set(gx, 0.032, z + 1.6);
          dash.matrixAutoUpdate = false;
          dash.updateMatrix();
          cityAdd(dash);
        }

        const sLine1 = new THREE.Mesh(new THREE.PlaneGeometry(0.22, segLen), matZebra);
        sLine1.rotateX(-Math.PI / 2);
        sLine1.position.set(gx + ROAD_W / 2 - 0.45, 0.032, midZ);
        sLine1.matrixAutoUpdate = false;
        sLine1.updateMatrix();

        const sLine2 = new THREE.Mesh(new THREE.PlaneGeometry(0.22, segLen), matZebra);
        sLine2.rotateX(-Math.PI / 2);
        sLine2.position.set(gx - ROAD_W / 2 + 0.45, 0.032, midZ);
        sLine2.matrixAutoUpdate = false;
        sLine2.updateMatrix();
        cityAdd(sLine1, sLine2);

        if (map.theme !== 'industrial') {
          const bikeLane = new THREE.Mesh(new THREE.PlaneGeometry(1.85, segLen), getBikeLaneMaterial());
          bikeLane.rotateX(-Math.PI / 2);
          bikeLane.position.set(gx - ROAD_W / 2 + 1.45, 0.031, midZ);
          bikeLane.matrixAutoUpdate = false;
          bikeLane.updateMatrix();
          cityAdd(bikeLane);

          const bSep = new THREE.Mesh(new THREE.PlaneGeometry(0.16, segLen), matZebra);
          bSep.rotateX(-Math.PI / 2);
          bSep.position.set(gx - ROAD_W / 2 + 2.4, 0.033, midZ);
          bSep.matrixAutoUpdate = false;
          bSep.updateMatrix();
          cityAdd(bSep);
        }
      });
    });

    // Crosswalks & Stop Bars
    // The outermost intersections sit at ±120; their outer crossings would land
    // past the kerb (±128) now that the roads end there, so they are skipped.
    const onRoad = (v) => Math.abs(v) <= ROAD_EDGE - 0.5;
    gridCoords.forEach(gx => {
      gridCoords.forEach(gz => {
        if (onRoad(gz - ROAD_W / 2 - 2.5)) createZebra(gx, gz - ROAD_W / 2 - 2.5, true);
        if (onRoad(gz + ROAD_W / 2 + 2.5)) createZebra(gx, gz + ROAD_W / 2 + 2.5, true);
        if (onRoad(gx - ROAD_W / 2 - 2.5)) createZebra(gx - ROAD_W / 2 - 2.5, gz, false);
        if (onRoad(gx + ROAD_W / 2 + 2.5)) createZebra(gx + ROAD_W / 2 + 2.5, gz, false);

        if (onRoad(gz - ROAD_W / 2 - 5.5)) createStopBar(gx, gz - ROAD_W / 2 - 5.5, true);
        if (onRoad(gz + ROAD_W / 2 + 5.5)) createStopBar(gx, gz + ROAD_W / 2 + 5.5, true);
        if (onRoad(gx - ROAD_W / 2 - 5.5)) createStopBar(gx - ROAD_W / 2 - 5.5, gz, false);
        if (onRoad(gx + ROAD_W / 2 + 5.5)) createStopBar(gx + ROAD_W / 2 + 5.5, gz, false);

        const mh = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.03, 16), getManholeMaterial());
        mh.position.set(gx, 0.035, gz);
        mh.matrixAutoUpdate = false;
        mh.updateMatrix();
        cityAdd(mh);
      });
    });

    function createStopBar(x, z, horizontal) {
      const sb = new THREE.Mesh(
        new THREE.PlaneGeometry(horizontal ? 5.2 : 0.65, horizontal ? 0.65 : 5.2),
        matZebra
      );
      sb.rotateX(-Math.PI / 2);
      sb.position.set(x, 0.035, z);
      sb.matrixAutoUpdate = false;
      sb.updateMatrix();
      cityAdd(sb);
    }

    function createZebra(x, z, horizontal) {
      const zGroup = new THREE.Group();
      zGroup.position.set(x, 0.04, z);
      const numStripes = 8;
      const stripeW = 0.8;
      const gap = 0.6;
      for (let i = 0; i < numStripes; i++) {
        const offset = (i - numStripes / 2 + 0.5) * (stripeW + gap);
        const stripe = new THREE.Mesh(
          new THREE.PlaneGeometry(horizontal ? stripeW : 4.0, horizontal ? 4.0 : stripeW),
          matZebra
        );
        stripe.rotateX(-Math.PI / 2);
        if (horizontal) stripe.position.x = offset;
        else stripe.position.z = offset;
        stripe.matrixAutoUpdate = false;
        stripe.updateMatrix();
        zGroup.add(stripe);
      }
      zGroup.matrixAutoUpdate = false;
      zGroup.updateMatrix();
      cityAdd(zGroup);
      // halfAlong = stripe run along the kerb; halfAcross = walk distance over the road.
      crosswalks.push({
        x,
        z,
        horizontal,
        halfAlong: numStripes * (stripeW + gap) * 0.5,
        halfAcross: 2.15
      });
    }

    // City Blocks — layout driven by the active map profile
    for (let i = 0; i < gridCoords.length - 1; i++) {
      for (let j = 0; j < gridCoords.length - 1; j++) {
        const x1 = gridCoords[i] + ROAD_W / 2;
        const z1 = gridCoords[j] + ROAD_W / 2;
        const x2 = gridCoords[i + 1] - ROAD_W / 2;
        const z2 = gridCoords[j + 1] - ROAD_W / 2;
        const blockW = x2 - x1;
        const blockD = z2 - z1;
        const centerX = (x1 + x2) / 2;
        const centerZ = (z1 + z2) / 2;

        if (isSpecialBlock(map, i, j, 'factory')) {
          createRecyclingPlant3D(centerX, centerZ, blockW, blockD);
          continue;
        }

        if (map.theme === 'suburb') {
          createDachaBlock3D(
            centerX, centerZ, blockW, blockD, i, j,
            isSpecialBlock(map, i, j, 'pool')
          );
          continue;
        }

        if (map.theme === 'industrial') {
          createIndustrialBlock3D(centerX, centerZ, blockW, blockD, i, j);
          continue;
        }

        if (isSpecialBlock(map, i, j, 'parks')) {
          createCentralPark3D(centerX, centerZ, blockW, blockD);
          continue;
        }

        createResidentialBlock3D(centerX, centerZ, blockW, blockD, i, j, map.theme);
      }
    }

    // Fill the empty ring outside the outermost roads (blocks can only span the
    // inner grid), so the skyline reads as one continuous city instead of
    // fading into an empty green field.
    createCityPerimeter(gridCoords, WORLD_SIZE, map.perimeter);
  }

  // ==========================================================================
  // OUTER-CITY PERIMETER — Фоновая застройка внешнего пояса
  // --------------------------------------------------------------------------
  // The paved grid ends at ±ROAD_EDGE (±128, right after the outermost
  // intersections at ±120); this fills the ring between that kerb and ~185 with
  // warehouses, terraced housing, park forest and street furniture. The
  // perimeter sits flush against the kerb — no leftover asphalt behind it.
  //
  // Performance contract (60 FPS on phones):
  //   * no bins spawn here — all gameplay stays inside the paved grid;
  //   * only bulk structures (houses, hangars, silos) contribute a collider, so
  //     the truck crashes into them while trees/fences/lamps stay decorative;
  //   * every static mesh gets `matrixAutoUpdate = false`, so its matrix is
  //     composed once at build time instead of every frame;
  //   * repeated props (trees, shipping containers) are batched through
  //     THREE.InstancedMesh — a few draw calls for hundreds of props;
  //   * every root is registered in `buildings3D`, so initLevel() clears the
  //     whole belt on a level restart.
  // ==========================================================================
  function createCityPerimeter(gridCoords, WORLD_SIZE, perimeterTheme) {
    const theme = perimeterTheme || 'industrial';
    const EDGE = Math.abs(gridCoords[gridCoords.length - 1]);        // 120
    const BELT_INNER = ROAD_EDGE;                                    // 128 = kerb line
    const BELT_OUTER = WORLD_SIZE / 2 - 25;                          // 185
    const FRONT = BELT_INNER + 18;                                   // terraced row
    const BACK = BELT_OUTER - 12;                                    // backdrop row
    const CORNER = (BELT_INNER + BELT_OUTER) / 2;                    // ~156.6

    // ======================================================================
    // PHYSICAL FOOTPRINTS
    // The heavy background structures are solid: the refuse truck crashes into
    // them instead of driving through. Trees, fences and lamps stay purely
    // decorative, so the collider list grows by ~40 AABBs only.
    // ======================================================================
    const addCollider = (x, z, halfW, halfD, margin) => {
      const m = (margin === undefined) ? 1.2 : margin;
      colliders.push({
        minX: x - halfW - m,
        maxX: x + halfW + m,
        minZ: z - halfD - m,
        maxZ: z + halfD + m
      });
    };

    // ---- Shared material palette (one allocation per generated city) --------
    const matYard = new THREE.MeshStandardMaterial({ color: 0x8d99ae, roughness: 0.9 });
    const matPave = new THREE.MeshStandardMaterial({ color: 0xb2bec3, roughness: 0.85 });
    const matWallLight = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.45 });
    const matWallCool = new THREE.MeshStandardMaterial({ color: 0xdfe4ea, roughness: 0.45 });
    const matWallWarm = new THREE.MeshStandardMaterial({ color: 0xf7f1e3, roughness: 0.45 });
    const matRoofDark = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.6 });
    const matRoofBlue = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.55 });
    const matWallSteel = new THREE.MeshStandardMaterial({ color: 0x3d4451, roughness: 0.5, metalness: 0.15 });
    const matGlassWarm = new THREE.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xfff3c4, emissiveIntensity: 0.38, roughness: 0.15 });
    const matFence = new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.7 });
    const matSteel = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.35, metalness: 0.5 });
    const matLampPole = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.5 });
    const matLampGlass = new THREE.MeshStandardMaterial({ color: 0xfffa65, emissive: 0xfffa65, emissiveIntensity: 0.85 });
    registerNightGlow(matGlassWarm, 0.38, 1.15);
    registerNightGlow(matLampGlass, 0.85, 2.4);
    const matRoofSlate = new THREE.MeshStandardMaterial({ color: 0x5d6d7e, roughness: 0.6 });
    const matConcrete = new THREE.MeshStandardMaterial({ color: 0x9aa0a6, roughness: 0.85 });
    const matHazard = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.5 });
    const matSignWhite = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.4 });

    // ======================================================================
    // BATCHING
    // Every prop is reduced to a bare Matrix4 and flushed at the end through
    // a handful of InstancedMeshes. 200+ background objects therefore cost
    // only a few draw calls instead of hundreds of them.
    // ======================================================================
    const batches = [];  // { geom, mat, list, shadow, receive }

    const makeBatcher = (geom, mat, opts) => {
      const batch = {
        geom,
        mat,
        list: [],
        shadow: !opts || opts.shadow !== false,
        receive: !!(opts && opts.receive)
      };
      batches.push(batch);
      return batch;
    };

    // Reusable scratch objects — no per-call allocation in the build loops.
    const _p = new THREE.Vector3();
    const _q = new THREE.Quaternion();
    const _s = new THREE.Vector3(1, 1, 1);
    const _e = new THREE.Euler();
    const _m = new THREE.Matrix4();

    // Push a transform into a batch (world-space axis aligned box).
    const pushBox = (batch, x, y, z, sx, sy, sz, rotY, rotX) => {
      _e.set(rotX || 0, rotY || 0, 0);
      _q.setFromEuler(_e);
      _p.set(x, y, z);
      _s.set(sx, sy, sz);
      _m.compose(_p, _q, _s);
      batch.list.push(_m.clone());
    };

    // Push a uniform-scaled prop (scaled geometry, rotation-free).
    const pushProp = (batch, x, y, z, scale, rotY) => {
      _e.set(0, rotY || 0, 0);
      _q.setFromEuler(_e);
      _p.set(x, y, z);
      _s.set(scale, scale, scale);
      _m.compose(_p, _q, _s);
      batch.list.push(_m.clone());
    };

    // ---- Geometry pool (one BufferGeometry per distinct shape) -------------
    // A single unit box is reused everywhere: every box batch just scales it,
    // so Three.js uploads one geometry instead of dozens of near-duplicates.
    const gUnitBox = new THREE.BoxGeometry(1, 1, 1);
    const gPlinth = new THREE.BoxGeometry(1, 0.5, 1);
    const gBand = new THREE.BoxGeometry(1, 0.3, 1);
    const gWinBand = new THREE.BoxGeometry(1, 1.3, 1);
    const gRoofCap = new THREE.BoxGeometry(1, 0.45, 1);
    const gSidewalk = new THREE.BoxGeometry(1, 0.4, 1);
    const gWall = new THREE.BoxGeometry(0.3, 1, 1);
    const gPost = new THREE.BoxGeometry(0.55, 1, 0.55);
    const gShutter = new THREE.BoxGeometry(3.4, 4.4, 0.25);
    const gLampPole = new THREE.CylinderGeometry(0.12, 0.18, 5.2, 8);
    const gLampGlass = new THREE.CylinderGeometry(0.35, 0.2, 0.65, 6);
    const gTank = new THREE.CylinderGeometry(1, 1, 1, 14);
    const gDome = new THREE.SphereGeometry(1, 14, 7, 0, Math.PI * 2, 0, Math.PI / 2);
    const gTrunk = new THREE.CylinderGeometry(0.3, 0.46, 2.6, 6);
    const gPine = new THREE.ConeGeometry(2.0, 5.8, 7);
    const gLeaf = new THREE.DodecahedronGeometry(2.2, 0);
    const gContainer = new THREE.BoxGeometry(6.2, 2.5, 2.6);
    const gBarrier = new THREE.BoxGeometry(1, 1.15, 1);
    const gSignPlate = new THREE.BoxGeometry(0.12, 0.9, 0.9);

    const bTownShell = { light: makeBatcher(gUnitBox, matWallLight), cool: makeBatcher(gUnitBox, matWallCool), warm: makeBatcher(gUnitBox, matWallWarm) };
    const bPlinth = makeBatcher(gPlinth, matPave);
    const bBand = makeBatcher(gBand, matRoofDark);
    const bBandBlue = makeBatcher(gBand, matRoofBlue);
    const bWin = makeBatcher(gWinBand, matGlassWarm);
    const bRoofDark = makeBatcher(gRoofCap, matRoofDark);
    const bRoofBlue = makeBatcher(gRoofCap, matRoofBlue);
    const bBackDark = makeBatcher(gUnitBox, matRoofSlate);
    const bBackBlue = makeBatcher(gUnitBox, matRoofBlue);

    const bWhShellDark = makeBatcher(gUnitBox, matWallSteel);
    const bWhShellBlue = makeBatcher(gUnitBox, matRoofBlue);
    const bWhPad = makeBatcher(new THREE.BoxGeometry(1, 0.4, 1), matYard, { shadow: false, receive: true });
    const bWhRoof = makeBatcher(new THREE.BoxGeometry(1, 0.8, 1), matRoofDark);
    const bShutter = makeBatcher(gShutter, matFence);

    const bFenceWall = makeBatcher(gWall, matFence);
    const bFencePost = makeBatcher(gPost, matFence);
    const bSidewalk = makeBatcher(gSidewalk, matPave, { shadow: false, receive: true });
    const bLampPole = makeBatcher(gLampPole, matLampPole);
    const bLampGlass = makeBatcher(gLampGlass, matLampGlass, { shadow: false });

    const bTank = makeBatcher(gTank, matSteel);
    const bDome = makeBatcher(gDome, matSteel);

    const bTrunk = makeBatcher(gTrunk, trunkMatShared());
    const bPine = pineMatsShared().map((m) => makeBatcher(gPine, m));
    const bLeaf = leafMatsShared().map((m) => makeBatcher(gLeaf, m));

    // Shipping containers: one batch per colour.
    const containerMats = [0xe74c3c, 0x2980b9, 0xf1c40f, 0x27ae60, 0xe67e22].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 })
    );
    const bContainer = containerMats.map((m) => makeBatcher(gContainer, m));

    const bBarrier = makeBatcher(gBarrier, matConcrete);
    const bBarrierStripe = makeBatcher(gBarrier, matHazard);
    const bSignPost = makeBatcher(gPost, matLampPole);
    const bSignPlate = makeBatcher(gSignPlate, matSignWhite);

    function trunkMatShared() {
      return new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.9 });
    }
    function pineMatsShared() {
      return [0x145a32, 0x1e8449, 0x196f3d].map(
        (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 })
      );
    }
    function leafMatsShared() {
      return [0x2ecc71, 0x27ae60, 0x58d68d].map(
        (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 })
      );
    }

    // ---- 2-storey modular townhouse (background LOD: no interior detail) ----
    function townhouse(x, z, w, d, wallKey, roofKey) {
      const H = 6.4;
      pushBox(bPlinth, x, 0.25, z, w + 0.5, 1, d + 0.5);
      pushBox(bTownShell[wallKey], x, H / 2 + 0.5, z, w, H, d);
      pushBox(roofKey === 'blue' ? bBandBlue : bBand, x, H / 2 + 0.5, z, w + 0.3, 1, d + 0.3);
      pushBox(bWin, x, 2.0, z, w + 0.14, 1, d + 0.14);
      pushBox(bWin, x, 5.2, z, w + 0.14, 1, d + 0.14);
      pushBox(roofKey === 'blue' ? bRoofBlue : bRoofDark, x, H + 0.72, z, w + 0.4, 1, d + 0.4);
      addCollider(x, z, w / 2, d / 2);
    }

    // Cheap silhouette block filling the skyline behind the terraced rows.
    function backdropBlock(x, z, w, d, h, blue) {
      pushBox(blue ? bBackBlue : bBackDark, x, h / 2, z, w, h, d);
      addCollider(x, z, w / 2, d / 2);
    }

    // ---- Industrial warehouse / hangar -------------------------------------
    function warehouse(x, z, w, d, steelShell) {
      const H = 9.5;
      pushBox(bWhPad, x, 0.2, z, w + 2, 1, d + 2);
      pushBox(steelShell ? bWhShellDark : bWhShellBlue, x, H / 2 + 0.4, z, w, H, d);
      pushBox(bWhRoof, x, H + 0.8, z, w + 1, 1, d + 1);
      for (let i = -1; i <= 1; i++) {
        pushBox(bShutter, x + i * w * 0.3, 2.6, z + d / 2 + 0.14, 1, 1, 1);
      }
      addCollider(x, z, w / 2, d / 2);
    }

    // ---- Storage cistern / silo -------------------------------------------
    function cistern(x, z, r, h) {
      pushBox(bSidewalk, x, 0.22, z, r * 2.8, 1, r * 2.8);
      pushBox(bTank, x, h / 2 + 0.45, z, r, h, r);
      pushProp(bDome, x, h + 0.45, z, r);
      addCollider(x, z, r, r, 0.6);
    }

    // ---- Perimeter wall / industrial fence ---------------------------------
    function fenceRun(x1, z1, x2, z2, h) {
      const len = Math.hypot(x2 - x1, z2 - z1);
      if (len < 1) return;
      const cx = (x1 + x2) / 2;
      const cz = (z1 + z2) / 2;
      const rotY = Math.atan2(x2 - x1, z2 - z1);
      pushBox(bFenceWall, cx, h / 2, cz, 1, h, len, rotY);

      const bays = Math.max(2, Math.round(len / 15));
      for (let i = 0; i <= bays; i++) {
        const px = x1 + (x2 - x1) * (i / bays);
        const pz = z1 + (z2 - z1) * (i / bays);
        pushBox(bFencePost, px, (h + 0.4) / 2, pz, 1, h + 0.4, 1);
      }
    }

    // ---- Dead-end barrier behind a road stub (on the belt sidewalk) --------
    // The carriageway itself must stay completely clear of static obstacles, so
    // the concrete blocks are parked just PAST the kerb line, on the raised belt
    // sidewalk (|coord| 128…135). The truck still reads the dead end, but its
    // colliders now live off the asphalt — it can never clip a block mid-road.
    //
    // `kerbAxis` names the line the barrier sits on: 'x' → the stub ends at
    // x = ±ROAD_EDGE (that road runs along X); 'z' → it ends at z = ±ROAD_EDGE.
    function deadEnd(kerbAxis, coord, sign) {
      const atX = (kerbAxis === 'x');
      const base = sign * ROAD_EDGE;
      // Push the barrier just outside the kerb so it rests on the sidewalk.
      const along = base + sign * 2.0;
      const GAP = 1.5;                               // pedestrian slot (centre)
      // One block fills the carriageway width from the slot edge to the kerb:
      //   road half-width 8.25 − gap half 0.75 = 7.5
      const BLOCK = ROAD_W / 2 - GAP / 2;            // 7.5
      const lat = GAP / 2 + BLOCK / 2;               // block centre = 4.5
      const THICK = 2.4;
      // gBarrier is 1.15 m tall and gets scaled by 0.9 → 1.035 m; the hazard
      // stripe is the same geometry scaled by 0.22. Both are seated on the belt
      // sidewalk whose top surface is at y = 0.4 (0.4 m slab centred on 0.2).
      const BLOCK_H = 1.15 * 0.9;
      const STRIPE_H = 1.15 * 0.22;
      const PAVE_TOP = 0.4;

      for (let d = -1; d <= 1; d += 2) {
        const off = d * lat;
        const cx = atX ? along : coord + off;
        const cz = atX ? coord + off : along;
        const sx = atX ? THICK : BLOCK;
        const sz = atX ? BLOCK : THICK;

        pushBox(bBarrier, cx, PAVE_TOP + BLOCK_H / 2, cz, sx, 0.9, sz);
        // Hazard stripe capping the block.
        pushBox(
          bBarrierStripe,
          cx, PAVE_TOP + BLOCK_H + STRIPE_H / 2, cz,
          sx * 1.04, 0.22, sz * 1.04
        );

        if (atX) addCollider(cx, cz, THICK / 2, BLOCK / 2, 0.2);
        else addCollider(cx, cz, BLOCK / 2, THICK / 2, 0.2);
      }

      // "Dead end" plate on a post, standing further back on the belt sidewalk
      // so it is not buried inside the barrier blocks (and clear of the avenue
      // trees that line the belt at |ROAD_EDGE + 5|).
      const px = atX ? sign * (ROAD_EDGE + 3.2) : coord;
      const pz = atX ? coord : sign * (ROAD_EDGE + 3.2);
      pushBox(bSignPost, px, 2.1, pz, 1, 3.4, 1);
      // gSignPlate is thin along X: its face must look back down the road, i.e.
      // along X for an X-running road and along Z for a Z-running one.
      pushBox(bSignPlate, px, 3.35, pz, 1, 1, 1, atX ? 0 : Math.PI / 2);
    }

    // ---- Raised sidewalk slab along the belt's inner kerb ------------------
    function edgeSidewalk(axis, sign) {
      // Full road span (±ROAD_EDGE) so the kerb closes flush into the corner.
      const len = 2 * ROAD_EDGE;
      if (axis === 'x') pushBox(bSidewalk, 0, 0.2, sign * (BELT_INNER + 3.5), len, 1, 7);
      else pushBox(bSidewalk, sign * (BELT_INNER + 3.5), 0.2, 0, 7, 1, len);
    }

    // ---- Street lamp -------------------------------------------------------
    function perimeterLamp(x, z) {
      pushProp(bLampPole, x, 2.6, z, 1);
      pushProp(bLampGlass, x, 5.3, z, 1);
    }

    // ---- Street tree -------------------------------------------------------
    function plantTree(x, z, s, conifer, seed) {
      pushProp(bTrunk, x, 1.35 * s, z, s);
      // Positive modulo: seeds may be negative around the perimeter.
      if (conifer) {
        const mi = ((seed % bPine.length) + bPine.length) % bPine.length;
        pushProp(bPine[mi], x, 5.5 * s, z, s);
      } else {
        const mi = ((seed % bLeaf.length) + bLeaf.length) % bLeaf.length;
        pushProp(bLeaf[mi], x, 5.7 * s, z, s);
      }
    }

    // ---- Coloured LEGO container stacks ------------------------------------
    function containerYard(x, z, cols, rows) {
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const wx = x + (c - (cols - 1) / 2) * 6.8;
          const wz = z + (r - (rows - 1) / 2) * 3.3;
          for (let layer = 0; layer < 2; layer++) {
            const bi = (c * 3 + r + layer * 2) % bContainer.length;
            pushProp(bContainer[bi], wx, 1.25 + layer * 2.55, wz, 1, ((c + r + layer) % 5) * 0.02);
          }
        }
      }
    }

    const frontKeys = ['light', 'cool', 'warm'];

    if (theme === 'dacha' || theme === 'forest') {
      // ======================================================================
      // DACHA PERIMETER — cottage plots with fences, lawns, sparse orchard trees
      // ======================================================================
      for (let i = 0; i < 5; i++) {
        const along = -EDGE + 28 + i * 42;
        const roof = (i % 2) ? 'blue' : 'dark';
        const wall = frontKeys[i % 3];

        // Front row of compact dachas on each belt side.
        townhouse(along - 8, FRONT, 16, 12, wall, roof);
        townhouse(along + 10, FRONT + 14, 14, 12, frontKeys[(i + 1) % 3], roof);
        townhouse(along - 8, -FRONT, 16, 12, frontKeys[(i + 2) % 3], roof);
        townhouse(along + 10, -FRONT - 14, 14, 12, wall, roof);
        townhouse(FRONT, along - 8, 12, 16, wall, roof);
        townhouse(FRONT + 14, along + 10, 12, 14, frontKeys[(i + 1) % 3], roof);

        // Plot fences between cottages (reads as allotments, not a forest wall).
        fenceRun(along - 18, FRONT - 8, along + 18, FRONT - 8, 1.6);
        fenceRun(along - 18, -FRONT + 8, along + 18, -FRONT + 8, 1.6);
        fenceRun(FRONT - 8, along - 18, FRONT - 8, along + 18, 1.6);

        // A couple of orchard trees per plot — not a dense belt.
        plantTree(along, FRONT + 22, 0.85, i % 2 === 0, i * 3);
        plantTree(along + 6, -FRONT - 22, 0.9, i % 3 === 0, i * 5 + 1);
        plantTree(FRONT + 22, along, 0.8, true, i * 7);
      }

      // West belt: more dacha rows instead of a forest mass.
      for (let i = 0; i < 4; i++) {
        const along = -EDGE + 35 + i * 50;
        townhouse(-FRONT, along, 12, 16, frontKeys[i % 3], (i % 2) ? 'blue' : 'dark');
        townhouse(-FRONT - 16, along + 12, 12, 14, frontKeys[(i + 1) % 3], 'dark');
        fenceRun(-FRONT + 8, along - 18, -FRONT + 8, along + 18, 1.6);
        plantTree(-FRONT - 24, along, 0.85, i % 2 === 0, i + 20);
      }

      townhouse(-CORNER, -CORNER, 20, 16, 'warm', 'dark');
      townhouse(CORNER, -CORNER, 20, 16, 'cool', 'blue');
      townhouse(CORNER, CORNER, 18, 18, 'light', 'dark');
      townhouse(-CORNER, CORNER, 18, 16, 'cool', 'dark');
      fenceRun(-CORNER - 14, -CORNER - 12, -CORNER + 14, -CORNER - 12, 1.6);
      fenceRun(CORNER - 14, CORNER + 12, CORNER + 14, CORNER + 12, 1.6);
    } else if (theme === 'yards') {
      // ======================================================================
      // YARDS PERIMETER (промзона) — warehouses, cisterns, container stacks
      // ======================================================================
      const yardCount = Math.max(6, Math.round((EDGE * 2) / 48));
      for (let i = 0; i < yardCount; i++) {
        const along = -EDGE + 30 + i * ((EDGE * 2 - 40) / Math.max(1, yardCount - 1));
        warehouse(along, FRONT + 4, 36, 22, i % 2 === 0);
        warehouse(along + 8, -FRONT - 4, 32, 20, i % 3 !== 0);
        warehouse(FRONT + 4, along, 22, 36, i % 2 === 1);
        warehouse(-FRONT - 4, along - 6, 20, 32, i % 2 === 0);
        if (i % 2 === 0) {
          cistern(along + 18, FRONT + 20, 4.8, 11);
          containerYard(along - 10, -FRONT - 18, 3, 2);
        } else {
          cistern(-FRONT - 18, along + 14, 4.2, 9);
          containerYard(FRONT + 18, along - 8, 2, 3);
        }
        fenceRun(along - 22, FRONT - 6, along + 22, FRONT - 6, 2.4);
        fenceRun(FRONT - 6, along - 22, FRONT - 6, along + 22, 2.4);
      }

      warehouse(CORNER - 10, CORNER - 8, 40, 28, true);
      warehouse(CORNER + 18, CORNER + 12, 34, 26, false);
      warehouse(-CORNER + 8, -CORNER - 10, 36, 28, true);
      warehouse(-CORNER - 16, CORNER + 6, 30, 24, false);
      cistern(CORNER + 6, -CORNER + 10, 6.0, 13);
      cistern(-CORNER - 8, CORNER - 14, 5.2, 11);
      containerYard(CORNER - 4, -CORNER - 4, 4, 3);
      containerYard(-CORNER + 4, CORNER + 4, 3, 3);
      fenceRun(BELT_INNER + 4, CORNER - 32, BELT_OUTER - 2, CORNER - 32, 2.8);
      fenceRun(-BELT_OUTER + 2, -CORNER - 32, -BELT_INNER - 4, -CORNER - 32, 2.8);
    } else {
      // ======================================================================
      // INDUSTRIAL PERIMETER (downtown) — terraces, warehouses, forest west
      // ======================================================================
      for (let i = 0; i < 6; i++) {
        const along = -EDGE + 22 + i * 39;
        const roof = (i % 2) ? 'blue' : 'dark';

        townhouse(along, FRONT, 30, 18, frontKeys[i % 3], roof);
        backdropBlock(along, BACK, 34, 18, 12 + (i % 3) * 4, i % 2 === 0);

        townhouse(along, -FRONT, 30, 18, frontKeys[(i + 1) % 3], roof);
        backdropBlock(along, -BACK, 34, 18, 11 + (i % 3) * 4, i % 2 === 1);

        townhouse(FRONT, along, 18, 30, frontKeys[(i + 2) % 3], roof);
        backdropBlock(BACK, along, 18, 34, 12 + (i % 3) * 3, i % 2 === 0);
      }

      for (let c = 0; c < 5; c++) {
        for (let r = 0; r < 21; r++) {
          const seed = c * 7 + r;
          plantTree(
            -BELT_INNER - 6 - c * 11,
            -EDGE + 6 + r * 11.4,
            0.8 + (seed % 4) * 0.12,
            seed % 3 === 0,
            seed
          );
        }
      }

      warehouse(CORNER - 14, CORNER - 13, 30, 20, true);
      warehouse(CORNER + 15, CORNER + 13, 26, 20, false);
      cistern(CORNER + 15, CORNER - 12, 5.4, 12);
      cistern(CORNER - 12, CORNER + 16, 4.2, 9);
      containerYard(CORNER + 4, CORNER + 1, 3, 2);
      fenceRun(BELT_INNER + 4, CORNER - 27, BELT_OUTER - 2, CORNER - 27, 2.6);
      fenceRun(BELT_INNER + 4, CORNER - 27, BELT_INNER + 4, BELT_OUTER - 2, 2.6);

      for (let c = 0; c < 3; c++) {
        for (let r = 0; r < 3; r++) {
          const seed = c * 3 + r + 5;
          plantTree(
            -CORNER - 14 + c * 14,
            CORNER - 6 + r * 14,
            0.85 + (seed % 3) * 0.1,
            seed % 2 === 0,
            seed
          );
        }
      }

      townhouse(-CORNER - 10, -CORNER, 30, 20, 'warm', 'dark');
      townhouse(-CORNER + 16, -CORNER + 14, 22, 22, 'cool', 'blue');
      townhouse(CORNER + 10, -CORNER, 30, 20, 'light', 'blue');
      townhouse(CORNER - 16, -CORNER - 14, 22, 22, 'cool', 'dark');
      fenceRun(-BELT_OUTER + 2, -CORNER - 28, -BELT_INNER - 4, -CORNER - 28, 2.2);
    }

    // ========================================================================
    // 5. INNER KERB — sidewalk base, street lamps and avenue trees
    // ========================================================================
    const sides = [
      { axis: 'x', sign: 1 },   // north
      { axis: 'x', sign: -1 },  // south
      { axis: 'z', sign: 1 },   // east
      { axis: 'z', sign: -1 }   // west
    ];

    sides.forEach((side, si) => {
      edgeSidewalk(side.axis, side.sign);

      for (let k = -4; k <= 4; k++) {
        const along = k * 28;
        const cross = side.sign * (BELT_INNER + 5);
        const x = side.axis === 'x' ? along : cross;
        const z = side.axis === 'x' ? cross : along;

        if (k % 2 === 0) {
          perimeterLamp(x, z);
        }
        plantTree(x, z, 0.85, (k + si) % 2 === 0, k + si * 11);
      }
    });

    // ========================================================================
    // 6. ROAD STUBS — impassable dead ends on every line leaving the grid
    // ========================================================================
    // gridCoords lines run BOTH ways (each value is an X line and a Z line), so
    // every entry yields one north and one south stub ('x') plus one east and
    // one west stub ('z').
    gridCoords.forEach(line => {
      deadEnd('x', line, 1);    // ends at x = line  → barrier at z = +ROAD_EDGE
      deadEnd('x', line, -1);   // ends at x = line  → barrier at z = -ROAD_EDGE
      deadEnd('z', line, 1);    // ends at z = line  → barrier at x = +ROAD_EDGE
      deadEnd('z', line, -1);   // ends at z = line  → barrier at x = -ROAD_EDGE
    });

    // ========================================================================
    // FLUSH — one InstancedMesh per batch (a few dozen draw calls total)
    // ========================================================================
    batches.forEach((b) => {
      if (!b.list.length) return;
      const inst = new THREE.InstancedMesh(b.geom, b.mat, b.list.length);
      for (let i = 0; i < b.list.length; i++) inst.setMatrixAt(i, b.list[i]);
      inst.instanceMatrix.needsUpdate = true;
      inst.castShadow = b.shadow;
      inst.receiveShadow = b.receive;
      // Static: bake the matrix once and never recompose it per frame.
      inst.matrixAutoUpdate = false;
      inst.updateMatrix();
      // r128 never refreshes instance bounds, so skip the (stale) frustum test.
      // A single instanced batch is one draw call regardless.
      inst.frustumCulled = false;
      cityAdd(inst);
      buildings3D.push(inst);
    });
  }

  // --- Industrial block: concrete yard, warehouses, containers, cisterns ---
  function createIndustrialBlock3D(cx, cz, w, d, bi, bj) {
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.28, d),
      new THREE.MeshStandardMaterial({ color: 0x7a828c, roughness: 0.92 })
    );
    pad.position.set(cx, 0.14, cz);
    pad.receiveShadow = true;
    pad.matrixAutoUpdate = false;
    pad.updateMatrix();
    cityAdd(pad);

    // Painted yard lanes (visual only — truck stays on outer roads).
    const laneMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.55 });
    const laneNS = new THREE.Mesh(new THREE.PlaneGeometry(1.1, d * 0.72), laneMat);
    laneNS.rotateX(-Math.PI / 2);
    laneNS.position.set(cx, 0.29, cz);
    laneNS.matrixAutoUpdate = false;
    laneNS.updateMatrix();
    cityAdd(laneNS);
    const laneEW = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.72, 1.1), laneMat);
    laneEW.rotateX(-Math.PI / 2);
    laneEW.position.set(cx, 0.291, cz);
    laneEW.matrixAutoUpdate = false;
    laneEW.updateMatrix();
    cityAdd(laneEW);

    const matSteel = new THREE.MeshStandardMaterial({ color: 0x3d4451, roughness: 0.5, metalness: 0.18 });
    const matBlue = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.55 });
    const matRoof = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.6 });
    const matDoor = new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.65 });
    const matTank = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.35, metalness: 0.45 });
    const matFence = new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.7 });
    const containerMats = [0xe74c3c, 0x2980b9, 0xf1c40f, 0x27ae60, 0xe67e22].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 })
    );

    const seed = bi * 17 + bj * 31;
    const halfW = w * 0.5;
    const halfD = d * 0.5;
    const margin = 6;

    function addBuildingCollider(x, z, hw, hd) {
      colliders.push({
        minX: x - hw - 1.1,
        maxX: x + hw + 1.1,
        minZ: z - hd - 1.1,
        maxZ: z + hd + 1.1
      });
    }

    function warehouseAt(x, z, ww, dd, tall, steel) {
      const H = tall ? 14 : 10;
      const group = new THREE.Group();
      group.position.set(x, 0, z);

      const shell = new THREE.Mesh(
        new THREE.BoxGeometry(ww, H, dd),
        steel ? matSteel : matBlue
      );
      shell.position.y = H / 2;
      shell.castShadow = true;
      shell.receiveShadow = true;
      group.add(shell);

      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(ww + 1.2, 0.7, dd + 1.2),
        matRoof
      );
      roof.position.y = H + 0.35;
      roof.castShadow = true;
      group.add(roof);

      // Loading bay doors facing the nearer outer road.
      const faceZ = (z < cz) ? -1 : 1;
      for (let i = -1; i <= 1; i++) {
        const door = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.2, 0.25), matDoor);
        door.position.set(i * ww * 0.28, 2.7, faceZ * (dd / 2 + 0.13));
        group.add(door);
      }

      group.matrixAutoUpdate = false;
      group.updateMatrix();
      cityAdd(group);
      buildings3D.push(group);
      addBuildingCollider(x, z, ww / 2, dd / 2);
    }

    // Two large hangars + one office shed, layout varies by block index.
    const layout = (seed % 3);
    if (layout === 0) {
      warehouseAt(cx - halfW * 0.32, cz - halfD * 0.28, w * 0.38, d * 0.32, true, true);
      warehouseAt(cx + halfW * 0.30, cz + halfD * 0.26, w * 0.36, d * 0.30, false, false);
    } else if (layout === 1) {
      warehouseAt(cx - halfW * 0.28, cz + halfD * 0.30, w * 0.34, d * 0.36, true, false);
      warehouseAt(cx + halfW * 0.32, cz - halfD * 0.30, w * 0.40, d * 0.28, false, true);
    } else {
      warehouseAt(cx - halfW * 0.34, cz, w * 0.30, d * 0.48, true, true);
      warehouseAt(cx + halfW * 0.28, cz - halfD * 0.22, w * 0.34, d * 0.28, false, false);
    }

    // Compact office / security booth near a corner.
    const boothX = cx + halfW - margin - 6;
    const boothZ = cz - halfD + margin + 5;
    const booth = new THREE.Mesh(
      new THREE.BoxGeometry(10, 5.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xdfe4ea, roughness: 0.45 })
    );
    booth.position.set(boothX, 2.75, boothZ);
    booth.castShadow = true;
    booth.matrixAutoUpdate = false;
    booth.updateMatrix();
    cityAdd(booth);
    buildings3D.push(booth);
    addBuildingCollider(boothX, boothZ, 5, 4);

    // Cistern on alternate blocks.
    if (seed % 2 === 0) {
      const tx = cx + halfW * 0.05;
      const tz = cz - halfD * 0.42;
      const tankH = 11;
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, tankH, 14), matTank);
      tank.position.set(tx, tankH / 2, tz);
      tank.castShadow = true;
      tank.matrixAutoUpdate = false;
      tank.updateMatrix();
      cityAdd(tank);
      buildings3D.push(tank);
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(4.2, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        matTank
      );
      dome.position.set(tx, tankH, tz);
      dome.matrixAutoUpdate = false;
      dome.updateMatrix();
      cityAdd(dome);
      addBuildingCollider(tx, tz, 4.5, 4.5);
    }

    // Container stacks (instanced per colour for draw-call budget).
    const gCont = new THREE.BoxGeometry(6.2, 2.5, 2.6);
    const stacks = [
      { x: cx - halfW + margin + 8, z: cz + halfD - margin - 8, cols: 3, rows: 2 },
      { x: cx + halfW - margin - 10, z: cz + halfD * 0.1, cols: 2, rows: 3 }
    ];
    stacks.forEach((stack, si) => {
      for (let c = 0; c < stack.cols; c++) {
        for (let r = 0; r < stack.rows; r++) {
          for (let layer = 0; layer < 2; layer++) {
            const box = new THREE.Mesh(
              gCont,
              containerMats[(si + c + r + layer) % containerMats.length]
            );
            box.position.set(
              stack.x + c * 6.8,
              1.25 + layer * 2.55,
              stack.z + r * 3.2
            );
            box.castShadow = true;
            box.matrixAutoUpdate = false;
            box.updateMatrix();
            cityAdd(box);
            buildings3D.push(box);
          }
        }
      }
      addBuildingCollider(
        stack.x + (stack.cols - 1) * 3.4,
        stack.z + (stack.rows - 1) * 1.6,
        stack.cols * 3.5,
        stack.rows * 1.8
      );
    });

    // Solid yard fence — inset from the kerb so street bins sit on a clear apron
    // (must stay beyond buildBinSpawnPool KERB ≈ ROAD_W/2 + 2.4). AABB blocks
    // the truck from cutting through warehouses.
    const fenceH = 2.4;
    const fenceY = fenceH / 2;
    const inset = 5.8;
    const runW = Math.max(8, w - 2 * inset);
    const runD = Math.max(8, d - 2 * inset);
    const fenceRuns = [
      { x: cx, z: cz - halfD + inset, sx: runW, sz: 0.35 },
      { x: cx, z: cz + halfD - inset, sx: runW, sz: 0.35 },
      { x: cx - halfW + inset, z: cz, sx: 0.35, sz: runD },
      { x: cx + halfW - inset, z: cz, sx: 0.35, sz: runD }
    ];
    fenceRuns.forEach((f) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(f.sx, fenceH, f.sz), matFence);
      wall.position.set(f.x, fenceY, f.z);
      wall.castShadow = true;
      wall.matrixAutoUpdate = false;
      wall.updateMatrix();
      cityAdd(wall);
      // Thin visual wall, slightly thicker collider so the truck cannot slip through.
      addBuildingCollider(f.x, f.z, Math.max(f.sx / 2, 0.45), Math.max(f.sz / 2, 0.45));
    });

    // Corner floodlights (inside the fence line) — shared night-boost glass.
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.5 });
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
      const lx = cx + sx * (halfW - inset - 1.2);
      const lz = cz + sz * (halfD - inset - 1.2);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 7.5, 8), lampMat);
      pole.position.set(lx, 3.75, lz);
      pole.castShadow = true;
      pole.matrixAutoUpdate = false;
      pole.updateMatrix();
      cityAdd(pole);
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.22, 0.7, 6), matStreetLampGlass);
      glass.position.set(lx, 7.6, lz);
      glass.matrixAutoUpdate = false;
      glass.updateMatrix();
      cityAdd(glass);
    });
  }

  // --- Dacha settlement block: 2×2 fenced plots + narrow alley crossroads ---
  function createDachaBlock3D(cx, cz, w, d, bi, bj, withPool) {
    const alleyW = (getActiveMap().alleyWidth || DACHA_ALLEY_W);
    const matAlley = new THREE.MeshStandardMaterial({ color: 0x2c3036, roughness: 0.7 });
    const matDash = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.45 });

    // Narrow asphalt alleys cut the block into four plots and open onto the
    // wide outer roads (full block span — no raised slab blocking the mouths).
    const alleyNS = new THREE.Mesh(new THREE.PlaneGeometry(alleyW, d), matAlley);
    alleyNS.rotateX(-Math.PI / 2);
    alleyNS.position.set(cx, 0.028, cz);
    alleyNS.receiveShadow = true;
    alleyNS.matrixAutoUpdate = false;
    alleyNS.updateMatrix();
    cityAdd(alleyNS);

    const alleyEW = new THREE.Mesh(new THREE.PlaneGeometry(w, alleyW), matAlley);
    alleyEW.rotateX(-Math.PI / 2);
    alleyEW.position.set(cx, 0.03, cz);
    alleyEW.receiveShadow = true;
    alleyEW.matrixAutoUpdate = false;
    alleyEW.updateMatrix();
    cityAdd(alleyEW);

    // Dashed centre lines on the alleys
    for (let t = -d / 2 + 4; t < d / 2 - 4; t += 5.5) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 2.4), matDash);
      dash.rotateX(-Math.PI / 2);
      dash.position.set(cx, 0.035, cz + t);
      dash.matrixAutoUpdate = false;
      dash.updateMatrix();
      cityAdd(dash);
    }
    for (let t = -w / 2 + 4; t < w / 2 - 4; t += 5.5) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.28), matDash);
      dash.rotateX(-Math.PI / 2);
      dash.position.set(cx + t, 0.036, cz);
      dash.matrixAutoUpdate = false;
      dash.updateMatrix();
      cityAdd(dash);
    }

    const gap = 0.7; // air gap between alley kerb and plot fence
    const plotW = (w - alleyW) / 2 - gap;
    const plotD = (d - alleyW) / 2 - gap;
    const cottagePalettes = [
      { wall: 0xfff8e7, trim: 0xc0392b, door: 0x8e44ad, roof: 0xe74c3c },
      { wall: 0xf5e6c8, trim: 0x2980b9, door: 0x27ae60, roof: 0x1e3a5f },
      { wall: 0xeeeeee, trim: 0xd35400, door: 0xe67e22, roof: 0x7f8c8d },
      { wall: 0xe8f5e9, trim: 0x2c3e50, door: 0x0984e3, roof: 0x27ae60 }
    ];

    // Four corner plots (sx/sz = ±1 pick the quadrant).
    const quadrants = [
      { sx: -1, sz: -1 },
      { sx: 1, sz: -1 },
      { sx: -1, sz: 1 },
      { sx: 1, sz: 1 }
    ];

    quadrants.forEach((q, qi) => {
      const plotCx = cx + q.sx * (alleyW / 2 + gap + plotW / 2);
      const plotCz = cz + q.sz * (alleyW / 2 + gap + plotD / 2);
      const pal = cottagePalettes[(bi * 3 + bj * 2 + qi) % cottagePalettes.length];
      const isPoolPlot = withPool && qi === 1;

      // Pull street-facing edges inward so kerbside bins sit outside the fence.
      const STREET_INSET = 2.8;
      const blockMinX = cx - w / 2;
      const blockMaxX = cx + w / 2;
      const blockMinZ = cz - d / 2;
      const blockMaxZ = cz + d / 2;
      let fx0 = plotCx - plotW / 2;
      let fx1 = plotCx + plotW / 2;
      let fz0 = plotCz - plotD / 2;
      let fz1 = plotCz + plotD / 2;
      if (Math.abs(fx0 - blockMinX) < 0.6) fx0 += STREET_INSET;
      if (Math.abs(fx1 - blockMaxX) < 0.6) fx1 -= STREET_INSET;
      if (Math.abs(fz0 - blockMinZ) < 0.6) fz0 += STREET_INSET;
      if (Math.abs(fz1 - blockMaxZ) < 0.6) fz1 -= STREET_INSET;

      const lawnW = Math.max(4, fx1 - fx0);
      const lawnD = Math.max(4, fz1 - fz0);
      const lawnCx = (fx0 + fx1) / 2;
      const lawnCz = (fz0 + fz1) / 2;

      // Plot lawn pad (matches inset fence footprint on street sides).
      const lawn = new THREE.Mesh(
        new THREE.BoxGeometry(lawnW, 0.42, lawnD),
        new THREE.MeshStandardMaterial({ color: 0x3cb371, roughness: 0.85 })
      );
      lawn.position.set(lawnCx, 0.22, lawnCz);
      lawn.receiveShadow = true;
      cityAdd(lawn);

      // Fences are decorative only — no plot AABB. The truck can cross into the
      // yard; solid hits remain on cottages / sheds / pool deck only.

      // Picket fence around the plot (visual only).
      createPicketFenceLine(fx0, fz0, fx1, fz0);
      createPicketFenceLine(fx0, fz1, fx1, fz1);
      createPicketFenceLine(fx0, fz0, fx0, fz1);
      createPicketFenceLine(fx1, fz0, fx1, fz1);

      // Cottage on every plot — the pool yard used to replace it and read as a
      // bare concrete "foundation" from the road.
      createDachaCottage(
        plotCx - q.sx * plotW * 0.12,
        plotCz - q.sz * plotD * (isPoolPlot ? 0.22 : 0.06),
        pal,
        q.sx > 0 ? 1 : 0,
        q.sz > 0 ? 1 : 0
      );

      if (isPoolPlot) {
        createDachaPoolYard(
          plotCx + q.sx * plotW * 0.18,
          plotCz + q.sz * plotD * 0.22,
          Math.min(plotW * 0.42, 14),
          Math.min(plotD * 0.38, 11)
        );
      } else if (qi % 2 === 0) {
        const shedGroup = new THREE.Group();
        shedGroup.position.set(plotCx + q.sx * plotW * 0.28, 0, plotCz + q.sz * plotD * 0.22);
        const shedBody = new THREE.Mesh(
          new THREE.BoxGeometry(2.8, 2.0, 2.4),
          new THREE.MeshStandardMaterial({ color: 0xb8956c, roughness: 0.7 })
        );
        shedBody.position.y = 1.2;
        shedBody.castShadow = true;
        const shedRoof = new THREE.Mesh(
          new THREE.ConeGeometry(2.1, 1.1, 4),
          new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.6 })
        );
        shedRoof.position.y = 2.7;
        shedRoof.rotation.y = Math.PI / 4;
        shedRoof.castShadow = true;
        shedGroup.add(shedBody, shedRoof);
        cityAdd(shedGroup);
        buildings3D.push(shedGroup);
      }

      const bed = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.28, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.9 })
      );
      bed.position.set(plotCx + q.sx * plotW * 0.18, 0.5, plotCz - q.sz * plotD * 0.28);
      const blooms = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.18, 0.95),
        new THREE.MeshStandardMaterial({
          color: [0xe84393, 0xf1c40f, 0xe74c3c, 0x9b59b6][qi % 4],
          roughness: 0.55
        })
      );
      blooms.position.set(bed.position.x, 0.68, bed.position.z);
      cityAdd(bed, blooms);

      if (qi % 2 === 0) {
        createDetailedTree3D(plotCx + q.sx * plotW * 0.25, plotCz - q.sz * plotD * 0.25);
      }

      if (qi === 0 || qi === 2) {
        createMinifigure3D(
          plotCx - q.sx * plotW * 0.2,
          plotCz + q.sz * plotD * 0.22,
          qi * 0.8,
          pal.door,
          0x2c3e50,
          qi === 0
        );
      }
    });

    // Street lamps at the alley / outer-road mouths
    const EDGE_IN = 2.2;
    createStreetLamp3D(cx - alleyW * 0.35, cz - d / 2 + EDGE_IN);
    createStreetLamp3D(cx + alleyW * 0.35, cz + d / 2 - EDGE_IN);
    createStreetLamp3D(cx - w / 2 + EDGE_IN, cz - alleyW * 0.35);
    createStreetLamp3D(cx + w / 2 - EDGE_IN, cz + alleyW * 0.35);
    createFireHydrant3D(cx + alleyW * 0.55, cz - alleyW * 0.55);
  }

  function createDachaCottage(x, z, pal, faceXSign, faceZSign) {
    const faceX = faceXSign === 0 ? -1 : 1;
    const faceZ = faceZSign === 0 ? -1 : 1;
    const group = new THREE.Group();
    group.position.set(x, 0.4, z);

    const wallW = 8.2;
    const wallD = 6.4;
    const wallH = 2.8;

    const plinth = new THREE.Mesh(
      new THREE.BoxGeometry(wallW + 0.4, 0.4, wallD + 0.4),
      new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.85 })
    );
    plinth.position.y = 0.2;
    group.add(plinth);

    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(wallW, wallH, wallD),
      new THREE.MeshStandardMaterial({ color: pal.wall, roughness: 0.45 })
    );
    walls.position.y = wallH / 2;
    walls.castShadow = true;
    walls.receiveShadow = true;
    group.add(walls);

    // Chunky pyramid roof — thin slanted plates disappeared at distance and
    // made cottages read as bare "foundation" boxes from the road.
    const roofMat = new THREE.MeshStandardMaterial({ color: pal.roof, roughness: 0.55 });
    const eaves = new THREE.Mesh(
      new THREE.BoxGeometry(wallW + 1.4, 0.35, wallD + 1.4),
      roofMat
    );
    eaves.position.y = wallH + 0.2;
    eaves.castShadow = true;
    const peak = new THREE.Mesh(
      new THREE.ConeGeometry(Math.max(wallW, wallD) * 0.62, 1.8, 4),
      roofMat
    );
    peak.position.y = wallH + 1.15;
    peak.rotation.y = Math.PI / 4;
    peak.castShadow = true;
    group.add(eaves, peak);

    const winMat = new THREE.MeshStandardMaterial({
      color: 0xfff4cc, emissive: 0xfff4cc, emissiveIntensity: 0.25, roughness: 0.15
    });
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 0.1), winMat);
    win.position.set(-wallW * 0.18 * faceX, 1.45, (wallD / 2 + 0.06) * faceZ);
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 1.9, 0.12),
      new THREE.MeshStandardMaterial({ color: pal.door, roughness: 0.5 })
    );
    door.position.set(wallW * 0.22 * faceX, 0.95, (wallD / 2 + 0.06) * faceZ);
    const porch = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.18, 1.1), matLegoGrey);
    porch.position.set(door.position.x, 0.1, door.position.z + 0.5 * faceZ);
    group.add(win, door, porch);

    // Small porch canopy
    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.12, 1.3),
      new THREE.MeshStandardMaterial({ color: pal.trim, roughness: 0.4 })
    );
    canopy.position.set(door.position.x, 2.15, door.position.z + 0.45 * faceZ);
    group.add(canopy);

    cityAdd(group);
    buildings3D.push(group);
    colliders.push({
      minX: x - wallW / 2 - 0.9,
      maxX: x + wallW / 2 + 0.9,
      minZ: z - wallD / 2 - 0.9,
      maxZ: z + wallD / 2 + 0.9
    });
  }

  function createDachaPoolYard(cx, cz, pw, pd) {
    // Compact patio — bright water must dominate so it never reads as a bare slab.
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(pw, 0.2, pd),
      new THREE.MeshStandardMaterial({ color: 0xeceff1, roughness: 0.65 })
    );
    deck.position.set(cx, 0.46, cz);
    deck.receiveShadow = true;
    cityAdd(deck);

    const poolW = pw * 0.78;
    const poolD = pd * 0.7;
    const rim = new THREE.Mesh(
      new THREE.BoxGeometry(poolW + 0.7, 0.35, poolD + 0.7),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 })
    );
    rim.position.set(cx, 0.55, cz);
    cityAdd(rim);

    const water = new THREE.Mesh(
      new THREE.BoxGeometry(poolW, 0.28, poolD),
      new THREE.MeshStandardMaterial({
        color: 0x00b4d8,
        roughness: 0.05,
        metalness: 0.45,
        emissive: 0x0077b6,
        emissiveIntensity: 0.35
      })
    );
    water.position.set(cx, 0.68, cz);
    cityAdd(water);

    // Ladder
    [-0.55, 0.55].forEach((s) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.5, 8), matChrome);
      post.position.set(cx + poolW * 0.42, 1.15, cz + s);
      cityAdd(post);
    });
    const rung = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 1.2), matChrome);
    rung.position.set(cx + poolW * 0.42, 0.95, cz);
    cityAdd(rung);

    // Loungers + umbrella
    for (let i = 0; i < 2; i++) {
      const chair = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.16, 0.65),
        new THREE.MeshStandardMaterial({ color: i === 0 ? 0xf39c12 : 0xe74c3c, roughness: 0.5 })
      );
      chair.position.set(cx - poolW * 0.42, 0.65, cz + (i === 0 ? -1.2 : 1.2));
      cityAdd(chair);
    }
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8), matLegoWhite);
    pole.position.set(cx - poolW * 0.15, 1.6, cz - pd * 0.42);
    const canopy = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 0.55, 8),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.5 })
    );
    canopy.position.set(pole.position.x, 2.7, pole.position.z);
    cityAdd(pole, canopy);

    createMinifigure3D(cx - poolW * 0.1, cz + poolD * 0.4, Math.PI, 0x00cec9, 0x2c3e50, true);

    colliders.push({
      minX: cx - pw / 2 - 0.4,
      maxX: cx + pw / 2 + 0.4,
      minZ: cz - pd / 2 - 0.4,
      maxZ: cz + pd / 2 + 0.4
    });
  }

  // --- Detailed 3D Residential Block & Modular LEGO Villas ---
  function createResidentialBlock3D(cx, cz, w, d, bi, bj, theme) {
    // Raised Granite Sidewalk Base
    const sidewalk = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.38, d),
      new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.55 })
    );
    sidewalk.position.set(cx, 0.19, cz);
    sidewalk.receiveShadow = true;
    cityAdd(sidewalk);

    // Inner Garden Lawn
    const lawnW = w - SIDEWALK_W * 2;
    const lawnD = d - SIDEWALK_W * 2;
    const lawn = new THREE.Mesh(
      new THREE.BoxGeometry(lawnW, 0.44, lawnD),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.8 })
    );
    lawn.position.set(cx, 0.22, cz);
    lawn.receiveShadow = true;
    cityAdd(lawn);

    // White Picket Fences along Sidewalk
    const fenceOffsetW = lawnW / 2;
    const fenceOffsetD = lawnD / 2;

    createPicketFenceLine(cx - fenceOffsetW, cz - fenceOffsetD, cx - 3.5, cz - fenceOffsetD);
    createPicketFenceLine(cx + 3.5, cz - fenceOffsetD, cx + fenceOffsetW, cz - fenceOffsetD);
    createPicketFenceLine(cx - fenceOffsetW, cz + fenceOffsetD, cx - 3.5, cz + fenceOffsetD);
    createPicketFenceLine(cx + 3.5, cz + fenceOffsetD, cx + fenceOffsetW, cz + fenceOffsetD);

    createPicketFenceLine(cx - fenceOffsetW, cz - fenceOffsetD, cx - fenceOffsetW, cz - 3.5);
    createPicketFenceLine(cx - fenceOffsetW, cz + 3.5, cx - fenceOffsetW, cz + fenceOffsetD);
    createPicketFenceLine(cx + fenceOffsetW, cz - fenceOffsetD, cx + fenceOffsetW, cz - 3.5);
    createPicketFenceLine(cx + fenceOffsetW, cz + 3.5, cx + fenceOffsetW, cz + fenceOffsetD);

    const houseThemes = [
      { wall: 0xffffff, wood: 0xc68b59, trim: 0x2f3640, door: 0x8e44ad, awning: 0xf1c40f },
      { wall: 0xf5f6fa, wood: 0xb87333, trim: 0x2c3e50, door: 0x27ae60, awning: 0xe74c3c },
      { wall: 0xf7f1e3, wood: 0xd35400, trim: 0x7f8c8d, door: 0x2980b9, awning: 0x0984e3 },
      { wall: 0xdfe4ea, wood: 0x8e44ad, trim: 0x34495e, door: 0xe67e22, awning: 0x2ecc71 }
    ];

    const halfW = lawnW / 2;
    const halfD = lawnD / 2;

    const housePositions = [
      { x: cx - halfW / 2, z: cz - halfD / 2, faceZ: -1, faceX: -1 },
      { x: cx + halfW / 2, z: cz - halfD / 2, faceZ: -1, faceX: 1 },
      { x: cx - halfW / 2, z: cz + halfD / 2, faceZ: 1,  faceX: -1 },
      { x: cx + halfW / 2, z: cz + halfD / 2, faceZ: 1,  faceX: 1 }
    ];

    housePositions.forEach((pos, idx) => {
      const theme = houseThemes[(bi * 4 + bj * 2 + idx) % houseThemes.length];
      const houseGroup = new THREE.Group();
      houseGroup.position.set(pos.x, 0.4, pos.z);

      const wallW = halfW - 4.2;
      const wallD = halfD - 4.2;
      const wallH = 3.6;

      const plinth = new THREE.Mesh(
        new THREE.BoxGeometry(wallW + 0.35, 0.5, wallD + 0.35),
        new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.85 })
      );
      plinth.position.y = 0.25;
      houseGroup.add(plinth);

      const wallMesh = new THREE.Mesh(
        new THREE.BoxGeometry(wallW, wallH, wallD),
        new THREE.MeshStandardMaterial({ color: theme.wall, roughness: 0.4 })
      );
      wallMesh.position.y = wallH / 2;
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      houseGroup.add(wallMesh);

      // Warm Cedar Slat Accent
      const woodPanel = new THREE.Mesh(
        new THREE.BoxGeometry(wallW * 0.55, 1.8, 0.08),
        new THREE.MeshStandardMaterial({ color: theme.wood, roughness: 0.6 })
      );
      woodPanel.position.set(0, 1.1, (wallD / 2 + 0.04) * pos.faceZ);
      houseGroup.add(woodPanel);

      // Panoramic Storefront Window with Warm Glow
      const matShopWindow = new THREE.MeshStandardMaterial({
        color: 0xfff4cc,
        emissive: 0xfff4cc,
        emissiveIntensity: 0.35,
        roughness: 0.1
      });
      const picWin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.35, 0.12), matShopWindow);
      picWin.position.set(-wallW * 0.2 * pos.faceX, 1.15, (wallD / 2 + 0.05) * pos.faceZ);
      const picFrame = new THREE.Mesh(new THREE.BoxGeometry(2.52, 1.45, 0.08), matLegoBlack);
      picFrame.position.set(-wallW * 0.2 * pos.faceX, 1.15, (wallD / 2 + 0.04) * pos.faceZ);
      houseGroup.add(picWin, picFrame);

      // Striped Fabric Awning
      const awning = createStripedAwning(2.6, 1.1, theme.awning);
      awning.position.set(-wallW * 0.2 * pos.faceX, 1.95, (wallD / 2 + 0.1) * pos.faceZ);
      if (pos.faceZ < 0) awning.rotation.y = Math.PI;
      houseGroup.add(awning);

      // Side Window with Planter Box
      const sideWin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 1.6), matShopWindow);
      sideWin.position.set((wallW / 2 + 0.05) * pos.faceX, 1.5, 0);
      const sideFrame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.3, 1.7), matLegoBlack);
      sideFrame.position.set((wallW / 2 + 0.04) * pos.faceX, 1.5, 0);
      const sBox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 1.6), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
      sBox.position.set((wallW / 2 + 0.14) * pos.faceX, 0.8, 0);
      const sBlooms = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 1.5), new THREE.MeshStandardMaterial({ color: 0xe84393 }));
      sBlooms.position.set((wallW / 2 + 0.14) * pos.faceX, 0.94, 0);
      houseGroup.add(sideWin, sideFrame, sBox, sBlooms);

      // Front Door & Entrance Steps
      const doorX = wallW * 0.28 * pos.faceX;
      const doorZ = (wallD / 2 + 0.06) * pos.faceZ;
      const door = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 2.0, 0.12),
        new THREE.MeshStandardMaterial({ color: theme.door, roughness: 0.5 })
      );
      door.position.set(doorX, 1.0, doorZ);
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 0.65), matLegoGrey);
      step.position.set(doorX, 0.11, doorZ + 0.35 * pos.faceZ);
      houseGroup.add(door, step);

      // Topiary Shrubs in Pots
      [-0.95, 0.95].forEach(sx => {
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.32, 10), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
        pot.position.set(doorX + sx * 0.9, 0.16, doorZ + 0.35 * pos.faceZ);
        const shrub = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.75, 8), new THREE.MeshStandardMaterial({ color: 0x1e824c }));
        shrub.position.set(doorX + sx * 0.9, 0.65, doorZ + 0.35 * pos.faceZ);
        shrub.castShadow = true;
        houseGroup.add(pot, shrub);
      });

      // Upper Level Terrace Balcony
      const balcY = 2.4;
      const balcGroup = new THREE.Group();
      balcGroup.position.set(0, balcY, (wallD / 2 + 0.45) * pos.faceZ);
      const balcFloor = new THREE.Mesh(new THREE.BoxGeometry(wallW * 0.75, 0.14, 0.9), matLegoGrey);
      balcGroup.add(balcFloor);
      const railFront = new THREE.Mesh(new THREE.BoxGeometry(wallW * 0.75, 0.65, 0.06), matLegoWhite);
      railFront.position.set(0, 0.35, 0.42 * pos.faceZ);
      balcGroup.add(railFront);
      houseGroup.add(balcGroup);

      const uDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.25, 0.1), matGlass);
      uDoor.position.set(0, balcY + 0.65, (wallD / 2 + 0.05) * pos.faceZ);
      houseGroup.add(uDoor);

      // Flat Roof with Solar Panels, AC & Satellite
      const parapet = new THREE.Mesh(
        new THREE.BoxGeometry(wallW + 0.35, 0.35, wallD + 0.35),
        new THREE.MeshStandardMaterial({ color: theme.trim, roughness: 0.35 })
      );
      parapet.position.y = wallH + 0.175;
      houseGroup.add(parapet);

      const roofDeck = new THREE.Mesh(
        new THREE.BoxGeometry(wallW - 0.15, 0.12, wallD - 0.15),
        new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.85 })
      );
      roofDeck.position.y = wallH + 0.08;
      houseGroup.add(roofDeck);

      const solarGroup = new THREE.Group();
      solarGroup.position.set(wallW * 0.15 * pos.faceX, wallH + 0.42, 0);
      const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.6), getSolarPanelMaterial());
      solarPanel.rotation.x = 0.28;
      solarPanel.castShadow = true;
      const sStand = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.35, 0.1), matChrome);
      sStand.position.set(0, -0.15, -0.6);
      solarGroup.add(solarPanel, sStand);
      houseGroup.add(solarGroup);

      const acBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.72, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x95a5a6, roughness: 0.4 })
      );
      acBox.position.set(-wallW * 0.24 * pos.faceX, wallH + 0.45, -wallD * 0.18 * pos.faceZ);
      acBox.castShadow = true;
      houseGroup.add(acBox);

      const dish = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.08, 0.14, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
      );
      dish.position.set(wallW * 0.32 * pos.faceX, wallH + 0.48, -wallD * 0.25 * pos.faceZ);
      dish.rotation.z = 0.45;
      houseGroup.add(dish);

      const mbGroup = new THREE.Group();
      mbGroup.position.set(doorX + 1.2 * pos.faceX, 0, (wallD / 2 + 1.8) * pos.faceZ);
      const mbPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.05, 8), matLegoWhite);
      mbPost.position.y = 0.52;
      const mbBox = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.45), new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.3 }));
      mbBox.position.y = 1.1;
      const mbFlag = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.08), new THREE.MeshStandardMaterial({ color: 0xe74c3c }));
      mbFlag.position.set(0.16, 1.16, -0.05);
      mbGroup.add(mbPost, mbBox, mbFlag);
      houseGroup.add(mbGroup);

      cityAdd(houseGroup);
      buildings3D.push(houseGroup);

      colliders.push({
        minX: pos.x - wallW / 2 - 1.4,
        maxX: pos.x + wallW / 2 + 1.4,
        minZ: pos.z - wallD / 2 - 1.4,
        maxZ: pos.z + wallD / 2 + 1.4
      });

      createDetailedTree3D(pos.x + wallW * 0.55 * pos.faceX, pos.z - wallD * 0.55 * pos.faceZ);
    });

    // Every prop below is placed INWARD from the block edge, i.e. on the raised
    // sidewalk. SIDEWALK_W is 3.4 m, so an inset of ~2.2 m keeps the prop clear
    // of the roadway while staying in front of the picket fence. Never subtract
    // from the outer edge (that would push props onto the asphalt).
    const EDGE_IN = 2.2;

    createStreetLamp3D(cx - w / 2 + EDGE_IN, cz - d / 2 + EDGE_IN);
    createStreetLamp3D(cx + w / 2 - EDGE_IN, cz - d / 2 + EDGE_IN);
    createStreetLamp3D(cx - w / 2 + EDGE_IN, cz + d / 2 - EDGE_IN);
    createStreetLamp3D(cx + w / 2 - EDGE_IN, cz + d / 2 - EDGE_IN);

    createFireHydrant3D(cx - w / 2 + EDGE_IN, cz - d / 2 + 3.0);
    createFireHydrant3D(cx + w / 2 - EDGE_IN, cz + d / 2 - 3.0);

    createRoadSign3D(cx - w / 2 + EDGE_IN, cz - d / 2 + EDGE_IN, '30');
    createRoadSign3D(cx + w / 2 - EDGE_IN, cz + d / 2 - EDGE_IN, 'PED');

    createStormDrain3D(cx, cz - d / 2 + EDGE_IN, true);
    createStormDrain3D(cx, cz + d / 2 - EDGE_IN, true);

    createParkBench3D(cx - w / 2 + EDGE_IN + 0.4, cz + 2.0, Math.PI / 2);
    createParkBench3D(cx + w / 2 - EDGE_IN - 0.4, cz - 2.0, -Math.PI / 2);

    createMinifigure3D(cx - w / 2 + EDGE_IN, cz - 6.0, 0, 0xe74c3c, 0x2c3e50, false);
    createMinifigure3D(cx + w / 2 - EDGE_IN, cz + 6.0, Math.PI, 0x0984e3, 0x1e272e, true);
    createMinifigure3D(cx + 4.0, cz - d / 2 + EDGE_IN, Math.PI / 2, 0x2ecc71, 0x2c3e50, false);
    // Containers are spawned procedurally from buildBinSpawnPool() in initLevel().
  }

  // --- Detailed 3D Fire Hydrant ---
  function createFireHydrant3D(x, z) {
    const fhGroup = new THREE.Group();
    fhGroup.position.set(x, 0.18, z);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.85, 10), new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3 }));
    body.position.y = 0.42;
    body.castShadow = true;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), matLegoWhite);
    cap.position.y = 0.85;
    const nozzleL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.22, 8), matChrome);
    nozzleL.rotateZ(Math.PI / 2);
    nozzleL.position.set(-0.25, 0.5, 0);
    const nozzleR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.22, 8), matChrome);
    nozzleR.rotateZ(Math.PI / 2);
    nozzleR.position.set(0.25, 0.5, 0);
    fhGroup.add(body, cap, nozzleL, nozzleR);
    cityAdd(fhGroup);
  }

  // --- Detailed 3D Road Sign (Speed Limit / Pedestrian) ---
  function createRoadSign3D(x, z, type) {
    const signGroup = new THREE.Group();
    signGroup.position.set(x, 0.35, z);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.2, 8), matLegoGrey);
    pole.position.y = 1.6;
    pole.castShadow = true;
    signGroup.add(pole);

    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.05, 16),
      new THREE.MeshStandardMaterial({ color: type === '30' ? 0xffffff : 0x0984e3, roughness: 0.3 })
    );
    plate.rotateX(Math.PI / 2);
    plate.position.y = 3.0;
    signGroup.add(plate);

    if (type === '30') {
      const redRim = new THREE.Mesh(
        new THREE.RingGeometry(0.42, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: 0xe74c3c, side: THREE.DoubleSide })
      );
      redRim.position.set(0, 3.0, 0.03);
      signGroup.add(redRim);
    }
    cityAdd(signGroup);
  }

  // --- Detailed 3D Storm Drain Grate along curb gutter ---
  function createStormDrain3D(x, z, horizontal) {
    const grate = new THREE.Mesh(
      new THREE.PlaneGeometry(horizontal ? 2.2 : 0.9, horizontal ? 0.9 : 2.2),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
    );
    grate.rotateX(-Math.PI / 2);
    grate.position.set(x, 0.03, z);
    cityAdd(grate);
  }

  function spawn3DBin(x, z, angle, categoryType) {
    const category = (typeof categoryType === 'object' && categoryType) ? categoryType : (BIN_TYPES[categoryType] || BIN_TYPES.yellow);
    const binMesh = createBinMesh(category);
    binMesh.position.set(x, 0.35, z);
    binMesh.rotation.y = angle;
    scene.add(binMesh);

    const marker = createBinMarker(category);
    marker.position.set(x, 0, z);
    scene.add(marker);

    trashBins3D.push({
      mesh: binMesh,
      lidGroup: binMesh.lidGroup,
      marker: marker,
      x: x,
      z: z,
      // Material type of this container: 'plastic' | 'paper' | 'glass'
      type: category.type || TYPE_BY_CATEGORY[category.id] || 'plastic',
      category: category,
      color: category.color,
      collected: false,
      label: category.name
    });
  }

  // ==========================================================================
  // PROCEDURAL BIN SPAWN POOL
  // --------------------------------------------------------------------------
  // Every container must sit kerbside on the side the truck's robotic arm can
  // reach. The arm is mounted at local +X (armBase.x = 1.24) and the pickup
  // probe samples `truck + (cos a, -sin a) * 2.3`, i.e. the world direction of
  // the truck's local +X for its current heading a:
  //
  //   truck drives +X (a=+90°) → arm toward -Z
  //   truck drives -X (a=-90°) → arm toward +Z
  //   truck drives +Z (a=0°)   → arm toward +X
  //   truck drives -Z (a=180°) → arm toward -X
  //
  // Lanes are keyed so lane = +LANE drives +X/+Z and lane = -LANE drives
  // -X/-Z. Hence the arm-side offset sign from the road centre is:
  //   x-roads: -sign(lane)   z-roads: +sign(lane)
  //
  // `perpSign` is that signed side; the container's mouth (local +Z) is aimed
  // back toward the roadway so the arm can reach into it.
  // ==========================================================================
  function armSideSign(axis, lane) {
    const s = lane > 0 ? 1 : -1;
    return axis === 'x' ? -s : s;
  }
  function binAngleForPerp(axis, perpSign) {
    if (axis === 'x') return perpSign < 0 ? 0 : Math.PI;
    return perpSign > 0 ? -Math.PI / 2 : Math.PI / 2;
  }

  function buildBinSpawnPool(map) {
    const coords = map.gridCoords;
    const roadEdge = map.roadEdge;
    const SPAWN_LIMIT = map.spawnLimit;
    // Place bins past the carriageway onto the sidewalk / industrial apron.
    // Industrial uses a deeper apron so bins clear the yard fence (inset 5.8).
    const KERB = ROAD_W / 2 + (map.theme === 'industrial' ? 2.4 : 1.6);
    const LANE = 3.6;        // lane centre offset from the road centre line
    const alleyW = (map.theme === 'suburb') ? (map.alleyWidth || DACHA_ALLEY_W) : 0;
    // Half-width of the forbidden alley asphalt corridor (+ margin so the bin
    // body never sits on the carriageway).
    const alleyClear = alleyW > 0 ? (alleyW / 2 + 1.6) : 0;
    // Reject anything whose footprint still overlaps main-road asphalt.
    const roadHalfClear = ROAD_W / 2 + 0.85;
    const pool = [];
    const seen = new Set();

    // True when (x,z) lies on a dacha alley asphalt strip (or its mouth).
    const onAlleyAsphalt = (x, z) => {
      if (alleyW <= 0) return false;
      for (let i = 0; i < coords.length - 1; i++) {
        for (let j = 0; j < coords.length - 1; j++) {
          if (isSpecialBlock(map, i, j, 'factory')) continue;
          const x1 = coords[i] + ROAD_W / 2;
          const z1 = coords[j] + ROAD_W / 2;
          const x2 = coords[i + 1] - ROAD_W / 2;
          const z2 = coords[j + 1] - ROAD_W / 2;
          const bcx = (x1 + x2) / 2;
          const bcz = (z1 + z2) / 2;
          // N–S alley corridor
          if (Math.abs(x - bcx) <= alleyClear && z >= z1 - 1 && z <= z2 + 1) return true;
          // E–W alley corridor
          if (Math.abs(z - bcz) <= alleyClear && x >= x1 - 1 && x <= x2 + 1) return true;
        }
      }
      return false;
    };

    // True when point still sits on (or overlaps) a main grid carriageway.
    const onMainRoadAsphalt = (x, z) => {
      for (let i = 0; i < coords.length; i++) {
        const line = coords[i];
        if (Math.abs(z - line) <= roadHalfClear && Math.abs(x) <= roadEdge + 0.5) return true;
        if (Math.abs(x - line) <= roadHalfClear && Math.abs(z) <= roadEdge + 0.5) return true;
      }
      return false;
    };

    // Keep bins clear of intersection boxes (stops mid-road / zebra spawns).
    const nearIntersection = (x, z) => {
      const box = ROAD_W / 2 + 3.5;
      for (let i = 0; i < coords.length; i++) {
        for (let j = 0; j < coords.length; j++) {
          if (Math.abs(x - coords[i]) <= box && Math.abs(z - coords[j]) <= box) return true;
        }
      }
      return false;
    };

    const add = (axis, line, lane, along) => {
      if (Math.abs(along) > SPAWN_LIMIT) return;
      const len = Math.round(Math.abs(along) / 2);
      const key = `${axis}|${line}|${lane}|${len}`;
      if (seen.has(key)) return;
      const perpSign = armSideSign(axis, lane);
      const perp = perpSign * KERB;
      let x, z;
      if (axis === 'x') { x = along; z = line + perp; }
      else { x = line + perp; z = along; }
      // Hard reachability filter — bins must stay inside the paved grid.
      if (Math.abs(x) > roadEdge || Math.abs(z) > roadEdge) return;
      // Never drop a bin onto a narrow alley carriageway.
      if (onAlleyAsphalt(x, z)) return;
      if (onMainRoadAsphalt(x, z)) return;
      if (nearIntersection(x, z)) return;
      seen.add(key);
      pool.push({ x, z, angle: binAngleForPerp(axis, perpSign), axis, line, lane, along, perpSign });
    };

    // Mid-block along offsets derived from consecutive intersections so both
    // the dense downtown grid and the wide suburb grid get usable kerbside spots.
    // Wider gaps (suburb) get denser sampling so the pool stays ≥ 12 after filters.
    const midOffsets = [];
    for (let i = 0; i < coords.length - 1; i++) {
      const a = coords[i];
      const b = coords[i + 1];
      const span = b - a;
      const samples = span > 90 ? [0.18, 0.32, 0.45, 0.55, 0.68, 0.82] : [0.28, 0.5, 0.72];
      for (let s = 0; s < samples.length; s++) {
        midOffsets.push(a + span * samples[s]);
      }
    }

    coords.forEach((line, idx) => {
      midOffsets.forEach((along, oi) => {
        const lane = ((idx + oi) % 2 === 0) ? LANE : -LANE;
        add('x', line, lane, along);
        add('z', line, -lane, along);
        // Opposite curb for sparse grids — doubles suburb coverage.
        if (coords.length <= 3) {
          add('x', line, -lane, along);
          add('z', line, lane, along);
        }
      });
      if (idx % 2 === 1) {
        add('x', line, LANE, -12);
        add('z', line, -LANE, 12);
      }
    });

    // Extra kerbside spots around park blocks (city-side of each park edge).
    const parks = (map.special && map.special.parks) || [];
    parks.forEach(([pi, pj]) => {
      if (pi >= coords.length - 1 || pj >= coords.length - 1) return;
      const zLineA = coords[pj];
      const zLineB = coords[pj + 1];
      const xLineA = coords[pi];
      const xLineB = coords[pi + 1];
      const midX = (xLineA + xLineB) / 2;
      const midZ = (zLineA + zLineB) / 2;
      add('x', zLineA, LANE, midX);
      add('x', zLineB, -LANE, midX);
      add('z', xLineA, -LANE, midZ);
      add('z', xLineB, LANE, midZ);
    });

    // Narrow dacha alleys — bins sit on the plot edge past the asphalt (+ gap),
    // never on the carriageway or in the alley crossroads.
    if (map.theme === 'suburb' && alleyW > 0) {
      const ALLEY_GAP = 0.7; // must match createDachaBlock3D
      // Centre of bin past alley edge + gap, slightly into the lawn (~1.1 m).
      const alleyKerb = alleyW / 2 + ALLEY_GAP + 1.1;
      const crossClear = alleyW / 2 + 3.5; // keep clear of the alley cross
      const addAlley = (x, z, angle) => {
        if (Math.abs(x) > roadEdge || Math.abs(z) > roadEdge) return;
        if (Math.abs(x) > SPAWN_LIMIT && Math.abs(z) > SPAWN_LIMIT) return;
        // Reject anything that still lands on asphalt (safety net).
        if (onAlleyAsphalt(x, z)) return;
        const key = `alley|${Math.round(x * 2)}|${Math.round(z * 2)}`;
        if (seen.has(key)) return;
        seen.add(key);
        pool.push({ x: x, z: z, angle: angle, axis: 'alley', line: 0, lane: 0, along: 0, perpSign: 1 });
      };

      for (let i = 0; i < coords.length - 1; i++) {
        for (let j = 0; j < coords.length - 1; j++) {
          if (isSpecialBlock(map, i, j, 'factory')) continue;
          const x1 = coords[i] + ROAD_W / 2;
          const z1 = coords[j] + ROAD_W / 2;
          const x2 = coords[i + 1] - ROAD_W / 2;
          const z2 = coords[j + 1] - ROAD_W / 2;
          const bcx = (x1 + x2) / 2;
          const bcz = (z1 + z2) / 2;
          // Mid-plot along the alley, well clear of the crossroads.
          const alongZ = (z2 - z1) * 0.28;
          const alongX = (x2 - x1) * 0.28;
          if (alongZ < crossClear || alongX < crossClear) continue;

          // N–S alley (line x = bcx): bins on both kerbs, mid-block along Z.
          [-alongZ, alongZ].forEach((dz) => {
            addAlley(bcx - alleyKerb, bcz + dz, Math.PI / 2);
            addAlley(bcx + alleyKerb, bcz + dz, -Math.PI / 2);
          });
          // E–W alley (line z = bcz): bins on both kerbs, mid-block along X.
          [-alongX, alongX].forEach((dx) => {
            addAlley(bcx + dx, bcz - alleyKerb, 0);
            addAlley(bcx + dx, bcz + alleyKerb, Math.PI);
          });
        }
      }
    }

    return pool;
  }

  // Fisher-Yates shuffle on a copy (the pool itself must stay intact).
  function shuffleCopy(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // --- Detailed 3D Street Lamp ---
  function createStreetLamp3D(x, z) {
    const lampGroup = new THREE.Group();
    lampGroup.position.set(x, 0.35, z);

    // Cast iron pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 5.2, 8), matLegoBlack);
    pole.position.y = 2.6;
    pole.castShadow = true;
    lampGroup.add(pole);

    // Lantern fixture (shared glass — brighter at night via applyTimeOfDay).
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.65, 6), matStreetLampGlass);
    lantern.position.set(0, 5.3, 0);
    lampGroup.add(lantern);

    cityAdd(lampGroup);
  }

  // --- Detailed 3D Trees with Branch Geometry ---
  function createDetailedTree3D(x, z) {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0.35, z);

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.48, 2.8, 10), new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.9 }));
    trunk.position.y = 1.4;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Volumetric Foliage
    const matLeaf1 = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.6 });
    const matLeaf2 = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6 });
    const f1 = new THREE.Mesh(new THREE.DodecahedronGeometry(2.0, 1), matLeaf1);
    f1.position.y = 3.6;
    f1.castShadow = true;
    const f2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5, 1), matLeaf2);
    f2.position.set(0.4, 4.8, 0.2);
    f2.castShadow = true;
    treeGroup.add(f1, f2);

    cityAdd(treeGroup);
  }

  // --- Central Park 3D ---
  function createCentralPark3D(cx, cz, w, d) {
    const park = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.38, d),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.8 })
    );
    park.position.set(cx, 0.19, cz);
    park.receiveShadow = true;
    cityAdd(park);

    // Diagonal and Cross Stone Paths
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.65 });
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(w - 6, 4.5), pathMat);
    p1.rotateX(-Math.PI / 2);
    p1.position.set(cx, 0.39, cz);
    p1.receiveShadow = true;
    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(4.5, d - 6), pathMat);
    p2.rotateX(-Math.PI / 2);
    p2.position.set(cx, 0.391, cz);
    p2.receiveShadow = true;
    cityAdd(p1, p2);

    // 3D Tiered Water Fountain
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(cx, 0.38, cz);

    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.6, 1.2, 24), matLegoGrey);
    b1.position.y = 0.6;
    b1.castShadow = true;
    fountainGroup.add(b1);

    const waterPool = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 4.8, 0.2, 24), new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.1, metalness: 0.8 }));
    waterPool.position.y = 1.15;
    fountainGroup.add(waterPool);

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 2.8, 16), matLegoGrey);
    pillar.position.y = 2.0;
    fountainGroup.add(pillar);

    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 0.6, 20), matLegoGrey);
    b2.position.y = 3.2;
    fountainGroup.add(b2);

    cityAdd(fountainGroup);

    // Fountain Collision
    colliders.push({
      minX: cx - 5.5,
      maxX: cx + 5.5,
      minZ: cz - 5.5,
      maxZ: cz + 5.5
    });

    // Park Benches around fountain
    createParkBench3D(cx - 7.5, cz, Math.PI / 2);
    createParkBench3D(cx + 7.5, cz, -Math.PI / 2);
    createParkBench3D(cx, cz - 7.5, 0);
    createParkBench3D(cx, cz + 7.5, Math.PI);

    // Minifigures in the park
    createMinifigure3D(cx - 7.5, cz + 2.5, Math.PI / 4, 0x9b59b6, 0x34495e, false);
    createMinifigure3D(cx + 6.0, cz - 7.5, -Math.PI / 3, 0xf39c12, 0x2c3e50, true);

    // Flower beds in Central Park
    const flowerColors = [0xe74c3c, 0xf1c40f, 0xe84393, 0x0984e3];
    [-1, 1].forEach(fx => {
      [-1, 1].forEach(fz => {
        const bed = new THREE.Mesh(
          new THREE.CylinderGeometry(3.0, 3.2, 0.25, 14),
          new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 })
        );
        bed.position.set(cx + fx * 14, 0.42, cz + fz * 14);
        const blooms = new THREE.Mesh(
          new THREE.CylinderGeometry(2.8, 2.8, 0.15, 14),
          new THREE.MeshStandardMaterial({ color: flowerColors[(fx + fz + 4) % flowerColors.length], roughness: 0.6 })
        );
        blooms.position.set(cx + fx * 14, 0.54, cz + fz * 14);
        cityAdd(bed, blooms);
      });
    });

    // Park Trees
    for (let i = -w / 2 + 12; i < w / 2 - 12; i += 20) {
      for (let j = -d / 2 + 12; j < d / 2 - 12; j += 20) {
        if (Math.hypot(i, j) > 13) {
          createDetailedTree3D(cx + i, cz + j);
        }
      }
    }
  }

  // --- Eco-Recycling Plant 3D ---
  function createRecyclingPlant3D(cx, cz, w, d) {
    const plantGroup = new THREE.Group();
    plantGroup.position.set(cx, 0, cz);

    // Concrete industrial yard
    const yard = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.35, d),
      new THREE.MeshStandardMaterial({ color: 0x636e72, roughness: 0.7 })
    );
    yard.position.y = 0.175;
    yard.receiveShadow = true;
    plantGroup.add(yard);

    // Main Factory Warehouse
    const fW = w * 0.75;
    const fD = d * 0.44;
    const fH = 8.8;
    const factory = new THREE.Mesh(
      new THREE.BoxGeometry(fW, fH, fD),
      new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.4 })
    );
    factory.position.set(0, fH / 2 + 0.35, -d * 0.22);
    factory.castShadow = true;
    plantGroup.add(factory);

    // Factory Roof
    const fRoof = new THREE.Mesh(
      new THREE.BoxGeometry(fW + 1.2, 0.85, fD + 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.3 })
    );
    fRoof.position.set(0, fH + 0.75, -d * 0.22);
    plantGroup.add(fRoof);

    // Silos (Plastic & Glass)
    const silo1 = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 11, 20), new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.25 }));
    silo1.position.set(-w * 0.35, 5.8, d * 0.24);
    silo1.castShadow = true;
    const silo2 = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 11, 20), new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.25 }));
    silo2.position.set(-w * 0.18, 5.8, d * 0.24);
    silo2.castShadow = true;
    plantGroup.add(silo1, silo2);

    // Unloading Dock Bay (where Mack Electric dumps trash)
    const bayW = 18;
    const bayD = 15;
    const bayPad = new THREE.Mesh(
      new THREE.BoxGeometry(bayW, 0.4, bayD),
      new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.5 })
    );
    bayPad.position.set(w * 0.18, 0.25, d * 0.22);
    plantGroup.add(bayPad);

    // Underground Pit with Shredder Grating
    const pit = new THREE.Mesh(
      new THREE.BoxGeometry(bayW - 4, 0.5, bayD - 4),
      new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.95 })
    );
    pit.position.set(w * 0.18, 0.28, d * 0.22);
    plantGroup.add(pit);

    // Neon Guide Beacons
    const neonMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71, emissive: 0x2ecc71, emissiveIntensity: 1.0 });
    registerNightGlow(neonMat, 1.0, 1.8);
    const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3.0, 10), neonMat);
    p1.position.set(w * 0.18 - bayW / 2, 1.8, d * 0.22 - bayD / 2);
    const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3.0, 10), neonMat);
    p2.position.set(w * 0.18 + bayW / 2, 1.8, d * 0.22 - bayD / 2);
    plantGroup.add(p1, p2);

    // --- EV Fast Charging Pad (open to the player at any time) ---
    // Scale with the yard so industrial's huge block does not park the pad on
    // top of the unloading dock (fixed +24/+24 used to collide there).
    // Unload sits at ~(+0.18w, +0.22d); charge goes further into the SE corner.
    const CHARGE_RADIUS = Math.max(7.5, Math.min(10, w * 0.075));
    const chargeLocalX = w * 0.38;
    const chargeLocalZ = d * 0.38;

    // Glowing green asphalt polygon with a neon-cyan rim.
    const chargePadMat = new THREE.MeshStandardMaterial({
      color: 0x0b3a2a,
      emissive: 0x1fbf6b,
      emissiveIntensity: 0.45,
      roughness: 0.45
    });
    registerNightGlow(chargePadMat, 0.45, 1.1);
    const chargePad = new THREE.Mesh(
      new THREE.CircleGeometry(CHARGE_RADIUS, 40),
      chargePadMat
    );
    chargePad.rotateX(-Math.PI / 2);
    chargePad.position.set(chargeLocalX, 0.42, chargeLocalZ);
    plantGroup.add(chargePad);

    const chargeRimMat = new THREE.MeshStandardMaterial({
      color: 0x00d2d3, emissive: 0x00d2d3, emissiveIntensity: 1.0, side: THREE.DoubleSide
    });
    registerNightGlow(chargeRimMat, 1.0, 1.7);
    const chargeRim = new THREE.Mesh(
      new THREE.RingGeometry(CHARGE_RADIUS - 0.35, CHARGE_RADIUS, 48),
      chargeRimMat
    );
    chargeRim.rotateX(-Math.PI / 2);
    chargeRim.position.set(chargeLocalX, 0.44, chargeLocalZ);
    plantGroup.add(chargeRim);

    // Overhead lightning bolt so the pad reads instantly from the road.
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.35, 1.6);
    boltShape.lineTo(-0.55, 0.15);
    boltShape.lineTo(-0.05, 0.15);
    boltShape.lineTo(-0.35, -1.6);
    boltShape.lineTo(0.55, -0.05);
    boltShape.lineTo(0.05, -0.05);
    boltShape.closePath();
    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x00d2d3, emissive: 0x00d2d3, emissiveIntensity: 1.2, roughness: 0.3
    });
    registerNightGlow(boltMat, 1.2, 2.0);
    const bolt = new THREE.Mesh(
      new THREE.ExtrudeGeometry(boltShape, { depth: 0.12, bevelEnabled: false }),
      boltMat
    );
    bolt.position.set(chargeLocalX, 4.4, chargeLocalZ);
    plantGroup.add(bolt);

    const boltPole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 4.4, 10), matLegoGrey);
    boltPole.position.set(chargeLocalX, 2.2, chargeLocalZ);
    plantGroup.add(boltPole);

    cityAdd(plantGroup);

    const factoryBeacon = createFactoryBeacon();
    factoryBeacon.position.set(cx + w * 0.18, 0, cz + d * 0.22);
    cityAdd(factoryBeacon);

    recyclingPlant3D = {
      x: cx,
      z: cz,
      w: w,
      d: d,
      beacon: factoryBeacon,
      unloadBay: {
        x: cx + w * 0.18,
        z: cz + d * 0.22,
        w: bayW,
        d: bayD
      },
      chargingBay: {
        x: cx + chargeLocalX,
        z: cz + chargeLocalZ,
        radius: CHARGE_RADIUS
      }
    };

    // Factory Colliders
    colliders.push({
      minX: cx - fW / 2 - 1.5,
      maxX: cx + fW / 2 + 1.5,
      minZ: cz - d * 0.22 - fD / 2 - 1.5,
      maxZ: cz - d * 0.22 + fD / 2 + 1.5
    });
    // Silo 1
    colliders.push({
      minX: cx - w * 0.35 - 4.0,
      maxX: cx - w * 0.35 + 4.0,
      minZ: cz + d * 0.24 - 4.0,
      maxZ: cz + d * 0.24 + 4.0
    });
    // Silo 2
    colliders.push({
      minX: cx - w * 0.18 - 4.0,
      maxX: cx - w * 0.18 + 4.0,
      minZ: cz + d * 0.24 - 4.0,
      maxZ: cz + d * 0.24 + 4.0
    });
  }

  // ==========================================================================
  // TRAFFIC SYSTEM — LOW-POLY NPC CARS (Задача 4)
  // Pure distance checks (Math.hypot) + straight-line integration on the road
  // grid. No physics engine, no per-polygon colliders, no render-target tricks.
  // ==========================================================================

  // Lateral offset from the road centre line (±3.6 → right-hand-drive lanes)
  const NPC_LANE_OFFSET = 3.6;
  // Mirrored from the active map profile (refreshed in applyActiveMap).
  let NPC_GRID_ROW_Z = gridCoords;
  let NPC_GRID_COL_X = gridCoords;
  // Hard U-turn boundary: NPCs loop just short of the dead-end barriers.
  let NPC_TURN_ZONE = MAP_PROFILES.downtown.npcTurnZone;
  // Cars spawn only on the inner streets, comfortably inside the turn zone.
  let NPC_SPAWN_RANGE = 110;
  // Probability of turning at any given intersection (otherwise drive straight).
  const NPC_TURN_CHANCE = 0.35;

  let NPC_SPAWN_MIN = MAP_PROFILES.downtown.npcCount[0];
  let NPC_SPAWN_MAX = MAP_PROFILES.downtown.npcCount[1];
  // Forward proximity sensor reach in metres (the task's 6-metre brake distance).
  const NPC_SENSOR_Z = 6.0;
  // Same-direction (convoy) braking: a car only brakes for another NPC when the
  // heading difference is within ~45°, i.e. they travel the same way.
  const NPC_CONVOY_COS = Math.cos(Math.PI / 4);
  // Anti-deadlock watchdog: if a car sits still this long without the player
  // truck nearby, it is respawned onto a free random road.
  const NPC_STUCK_SECONDS = 3.0;
  // The truck must be within this range for a stall to count as "caused by the
  // player" (then the NPC keeps patiently yielding instead of despawning).
  const NPC_STUCK_PLAYER_RANGE = 12.0;
  // Passenger-car collision radius (used for the truck↔NPC separation test).
  const NPC_CAR_RADIUS = 1.95;
  // After a crash the NPC stays frozen for a moment so it cannot instantly
  // drive back into the player's truck.
  const NPC_STUN_SECONDS = 1.2;
  // Per-car collision immunity window (ms): while active the truck and that
  // specific car ignore each other, letting the player back out / steer away.
  const NPC_COLLISION_COOLDOWN_MS = 950;
  // Initial backward recoil shove applied to the truck on impact (metres/frame,
  // decays geometrically over the following frames).
  const NPC_RECOIL_IMPULSE = 0.10;
  // Minimum penetration depth that counts as a crash. Prevents two bodies that
  // are merely resting in contact from re-triggering the impact every cooldown.
  const NPC_CONTACT_SLOP = 0.06;

  // Shared low-poly materials for the whole NPC fleet (no per-car allocations).
  const matNpcWhite = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.3, metalness: 0.15 });
  const matNpcRed = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3, metalness: 0.15 });
  const matNpcBlue = new THREE.MeshStandardMaterial({ color: 0x2980b9, roughness: 0.3, metalness: 0.15 });
  const matNpcYellow = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3, metalness: 0.15 });
  const matNpcDark = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.5, metalness: 0.2 });
  const matNpcGlass = new THREE.MeshStandardMaterial({ color: 0x1b2631, roughness: 0.1, metalness: 0.85, transparent: true, opacity: 0.82 });

  const NPC_CAR_PALETTES = [
    { name: 'red', body: matNpcRed, roof: matNpcWhite },
    { name: 'blue', body: matNpcBlue, roof: matNpcWhite },
    { name: 'white', body: matNpcWhite, roof: matNpcDark },
    { name: 'yellow', body: matNpcYellow, roof: matNpcDark }
  ];

  // Shared low-poly geometries (reused across every car → minimal draw memory).
  const npcBodyGeom = new THREE.BoxGeometry(1.76, 0.62, 3.5);
  const npcCabinGeom = new THREE.BoxGeometry(1.58, 0.56, 1.65);
  const npcWheelGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.24, 12);
  npcWheelGeom.rotateZ(Math.PI / 2);
  const npcHeadlightGeom = new THREE.BoxGeometry(0.3, 0.14, 0.08);
  const npcTaillightGeom = new THREE.BoxGeometry(0.28, 0.12, 0.08);
  const matNpcHeadlight = new THREE.MeshStandardMaterial({ color: 0xfff6c8, emissive: 0xfff6c8, emissiveIntensity: 0.75 });
  const matNpcTaillight = new THREE.MeshStandardMaterial({ color: 0xe74c3c, emissive: 0xe74c3c, emissiveIntensity: 0.65 });
  todVehicleMats.npcHead = matNpcHeadlight;
  todVehicleMats.npcTail = matNpcTaillight;

  let npcCars = [];

  // --- Low-poly passenger car builder (кузов + колёса, цвет по палитре) ---
  function createNpcCarMesh(palette) {
    const car = new THREE.Group();

    const body = new THREE.Mesh(npcBodyGeom, palette.body);
    body.position.y = 0.55;
    body.castShadow = true;
    car.add(body);

    // Cabin greenhouse with dark glass band
    const cabin = new THREE.Mesh(npcCabinGeom, palette.roof);
    cabin.position.set(0, 1.1, -0.35);
    cabin.castShadow = true;
    car.add(cabin);

    const glass = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.12), matNpcGlass);
    glass.position.set(0, 1.12, 0.5);
    car.add(glass);

    const windshieldRear = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.36, 0.1), matNpcGlass);
    windshieldRear.position.set(0, 1.12, -1.2);
    car.add(windshieldRear);

    // Roof plate
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 1.5), palette.roof);
    roof.position.set(0, 1.4, -0.35);
    car.add(roof);

    // Four wheels
    const wheelZ = [1.25, -1.25];
    const wheelX = [0.88, -0.88];
    const wheels = [];
    wheelZ.forEach(z => {
      wheelX.forEach(x => {
        const w = new THREE.Mesh(npcWheelGeom, matLegoBlack);
        w.position.set(x, 0.32, z);
        w.castShadow = true;
        car.add(w);
        wheels.push(w);
      });
    });

    // Headlights (front, +Z) and taillights (rear, -Z)
    [-0.55, 0.55].forEach(x => {
      const hl = new THREE.Mesh(npcHeadlightGeom, matNpcHeadlight);
      hl.position.set(x, 0.62, 1.76);
      car.add(hl);

      const tl = new THREE.Mesh(npcTaillightGeom, matNpcTaillight);
      tl.position.set(x, 0.66, -1.76);
      car.add(tl);
    });

    car.userData.wheels = wheels;
    return car;
  }

  // --- Routing helpers ---
  // Convert an axis + grid index + direction into the lane snapshot used by AI.
  function buildNpcLanes() {
    const lanes = [];
    for (let gzIndex = 0; gzIndex < NPC_GRID_ROW_Z.length; gzIndex++) {
      const zLine = NPC_GRID_ROW_Z[gzIndex];
      lanes.push({ axis: 'x', gzIndex: gzIndex, line: zLine, lane: NPC_LANE_OFFSET });   // driving east
      lanes.push({ axis: 'x', gzIndex: gzIndex, line: zLine, lane: -NPC_LANE_OFFSET });  // driving west
    }
    for (let gxIndex = 0; gxIndex < NPC_GRID_COL_X.length; gxIndex++) {
      const xLine = NPC_GRID_COL_X[gxIndex];
      lanes.push({ axis: 'z', gxIndex: gxIndex, line: xLine, lane: NPC_LANE_OFFSET });   // driving south
      lanes.push({ axis: 'z', gxIndex: gxIndex, line: xLine, lane: -NPC_LANE_OFFSET });  // driving north
    }
    return lanes;
  }

  let NPC_LANES = buildNpcLanes();

  // Sync mutable world / traffic parameters with the selected map profile.
  function applyActiveMap(mapId) {
    const map = MAP_PROFILES[normalizeMapId(mapId)] || MAP_PROFILES.downtown;
    activeMapId = map.id;
    gridCoords = map.gridCoords.slice();
    ROAD_EDGE = map.roadEdge;
    WORLD_SIZE = map.worldSize || 420;
    ROAD_W = map.roadWidth || 16.5;
    NPC_TURN_ZONE = map.npcTurnZone;
    NPC_SPAWN_RANGE = Math.min(map.spawnLimit + 10, map.roadEdge - 18);
    NPC_SPAWN_MIN = map.npcCount[0];
    NPC_SPAWN_MAX = map.npcCount[1];
    NPC_GRID_ROW_Z = gridCoords;
    NPC_GRID_COL_X = gridCoords;
    NPC_LANES = buildNpcLanes();
    if (scene && scene.fog) {
      scene.fog.near = WORLD_SIZE * 0.28;
      scene.fog.far = WORLD_SIZE * 1.2;
    }
    return map;
  }

  // Snap a car onto a lane. `dir` is the travel direction along that axis (+1/-1).
  function placeCarOnLane(car, axis, line, lane, direction, alongCoord) {
    car.axis = axis;
    car.line = line;
    car.lane = lane;
    car.dir = direction;

    if (axis === 'x') {
      car.z = line + lane;      // horizontal road, z is fixed by the lane
      car.x = alongCoord;       // x travels freely
      car.angle = direction > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      car.x = line + lane;      // vertical road, x is fixed by the lane
      car.z = alongCoord;       // z travels freely
      car.angle = direction > 0 ? 0 : Math.PI;
    }

    car.group.position.set(car.x, 0, car.z);
    car.group.rotation.y = car.angle;
  }

  function spawnNpcCar() {
    const palette = NPC_CAR_PALETTES[Math.floor(Math.random() * NPC_CAR_PALETTES.length)];
    const car = {
      group: createNpcCarMesh(palette),
      color: palette.name,
      speed: 0,
      targetSpeed: 0,
      stopped: false,
      // Seconds remaining before this car may accelerate again after a crash.
      stunTimer: 0,
      // Timestamp of the last crash with the player (per-car immunity window).
      lastCollisionTime: 0,
      // Anti-deadlock watchdog: seconds spent stalled without the player nearby.
      stuckTimer: 0
    };

    // Spread initial spawns over different lanes; retries avoid overlapping cars.
    for (let attempt = 0; attempt < 24; attempt++) {
      const lane = NPC_LANES[Math.floor(Math.random() * NPC_LANES.length)];
      const direction = lane.lane > 0 ? 1 : -1;
      const spawnRange = NPC_SPAWN_RANGE;
      const along = (Math.random() - 0.5) * 2 * spawnRange;

      placeCarOnLane(car, lane.axis, lane.line, lane.lane, direction, along);

      // Keep a safe gap from the player truck and from other NPC cars.
      if (Math.hypot(car.x - truckPhys.x, car.z - truckPhys.z) < 22) continue;
      let overlaps = false;
      for (const other of npcCars) {
        if (Math.hypot(car.x - other.x, car.z - other.z) < 11) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) continue;
      break;
    }

    const cruiseSpeed = 0.25 + Math.random() * 0.09; // ~20.5–27.9 km/h
    car.targetSpeed = cruiseSpeed;
    car.speed = cruiseSpeed;

    npcCars.push(car);
    scene.add(car.group);
    return car;
  }

  function spawnTraffic() {
    removeTraffic();
    const count = NPC_SPAWN_MIN + Math.floor(Math.random() * (NPC_SPAWN_MAX - NPC_SPAWN_MIN + 1));
    for (let i = 0; i < count; i++) spawnNpcCar();
  }

  // Anti-deadlock helper: teleport a stalled NPC onto a random road lane, far
  // from the player truck and clear of the rest of the fleet. Returns true on
  // success (a free spot was found within the attempt budget).
  function respawnNpcCarToFreeLane(car) {
    const spawnRange = NPC_SPAWN_RANGE;
    for (let attempt = 0; attempt < 30; attempt++) {
      const lane = NPC_LANES[Math.floor(Math.random() * NPC_LANES.length)];
      const direction = lane.lane > 0 ? 1 : -1;
      const along = (Math.random() - 0.5) * 2 * spawnRange;
      placeCarOnLane(car, lane.axis, lane.line, lane.lane, direction, along);

      // Well clear of the player (> 35 m) and of other NPC cars.
      if (Math.hypot(car.x - truckPhys.x, car.z - truckPhys.z) < 35) continue;
      let overlaps = false;
      for (const other of npcCars) {
        if (other === car) continue;
        if (Math.hypot(car.x - other.x, car.z - other.z) < 12) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) continue;
      return true;
    }
    return false;
  }

  function removeTraffic() {
    for (const car of npcCars) scene.remove(car.group);
    npcCars = [];
  }

  // ==========================================================================
  // Living city — sidewalk pedestrians + crosswalk yield for NPC traffic
  // Walk sidewalks; at corners randomly turn or cross straight; U-turn at map edge.
  // ==========================================================================
  const PED_SHIRTS = [0xe74c3c, 0x0984e3, 0x2ecc71, 0xf39c12, 0x9b59b6, 0x00cec9, 0xe84393, 0xfdcb6e];
  const PED_PANTS = [0x2c3e50, 0x1e272e, 0x34495e, 0x4a5568];
  const PED_TURN_LEFT = 0.30;
  const PED_TURN_RIGHT = 0.60; // (right if roll in [0.30, 0.60), else straight cross)

  function removePedestrians() {
    for (const ped of pedestrians) scene.remove(ped.group);
    pedestrians = [];
  }

  function pedSidewalkOffset() {
    return ROAD_W * 0.5 + SIDEWALK_W * 0.55;
  }

  function pedFacingAngle(axis, dir) {
    if (axis === 'x') return dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    return dir > 0 ? 0 : Math.PI;
  }

  function pedSnapToSidewalk(ped) {
    if (ped.axis === 'x') ped.z = ped.line;
    else ped.x = ped.line;
    ped.angle = pedFacingAngle(ped.axis, ped.dir);
  }

  // Returns the crosswalk under (x,z), or null. Used for walk state + NPC yield axis.
  function findCrosswalkAt(x, z) {
    const roadHalf = ROAD_W * 0.5;
    for (let i = 0; i < crosswalks.length; i++) {
      const cw = crosswalks[i];
      if (cw.horizontal) {
        if (Math.abs(z - cw.z) <= cw.halfAcross + 0.45 && Math.abs(x - cw.x) < roadHalf) return cw;
      } else if (Math.abs(x - cw.x) <= cw.halfAcross + 0.45 && Math.abs(z - cw.z) < roadHalf) {
        return cw;
      }
    }
    return null;
  }

  function syncPedCrosswalkFlag(ped) {
    const cwHit = findCrosswalkAt(ped.x, ped.z);
    ped.onCrosswalk = !!cwHit;
    ped.crosswalkHorizontal = cwHit ? cwHit.horizontal : null;
  }

  function applyPedPose(ped, step) {
    ped.group.position.set(ped.x, 0.35, ped.z);
    ped.group.rotation.y = ped.angle;
    if (step > 0) {
      ped.walkPhase += step * 10;
      if (ped.group.userData.legL) {
        const swing = Math.sin(ped.walkPhase) * 0.55;
        ped.group.userData.legL.rotation.x = swing;
        ped.group.userData.legR.rotation.x = -swing;
      }
    } else if (ped.group.userData.legL) {
      ped.group.userData.legL.rotation.x *= 0.85;
      ped.group.userData.legR.rotation.x *= 0.85;
    }
  }

  // turn: +1 left, -1 right relative to current facing.
  function applyPedCornerTurn(ped, junction, turn) {
    const sw = pedSidewalkOffset();
    const nearSide = -ped.dir; // side of the cross-road we are still on
    const newAxis = ped.axis === 'x' ? 'z' : 'x';
    const newDir = ped.axis === 'x' ? (turn * ped.dir) : (turn * -ped.dir);
    const newLine = junction + nearSide * sw;

    // Snap to the corner kerb, then switch onto the perpendicular sidewalk.
    if (ped.axis === 'x') {
      ped.x = newLine;
      ped.z = ped.line;
    } else {
      ped.z = newLine;
      ped.x = ped.line;
    }
    ped.axis = newAxis;
    ped.dir = newDir;
    ped.line = newLine;
    ped.roadLine = junction;
    ped.side = nearSide;
    pedSnapToSidewalk(ped);
    ped.crossing = null;
    ped.waitTimer = 0.12 + Math.random() * 0.25;
  }

  // Keep sidewalk line; walk straight across the intersecting carriageway.
  function startPedStraightCrossing(ped, junction) {
    const sw = pedSidewalkOffset();
    const nearAlong = junction - ped.dir * (ROAD_W * 0.5 + 0.25);
    const farAlong = junction + ped.dir * sw;
    if (ped.axis === 'x') ped.x = nearAlong;
    else ped.z = nearAlong;
    pedSnapToSidewalk(ped);
    ped.crossing = { targetAlong: farAlong };
  }

  function spawnPedestrians() {
    removePedestrians();
    if (!gridCoords.length) return;

    const map = getActiveMap();
    const count = map.pedCount || 6;
    const sw = pedSidewalkOffset();
    const mapLimit = ROAD_EDGE - sw - 2;

    for (let i = 0; i < count; i++) {
      const axis = Math.random() < 0.5 ? 'x' : 'z';
      const roadLine = gridCoords[Math.floor(Math.random() * gridCoords.length)];
      const side = Math.random() < 0.5 ? -1 : 1;
      const line = roadLine + side * sw;
      const dir = Math.random() < 0.5 ? 1 : -1;
      // Spawn mid-block so the first corner decision feels natural.
      let along = (Math.random() - 0.5) * 2 * Math.min(mapLimit, 90);
      for (let g = 0; g < gridCoords.length; g++) {
        if (Math.abs(along - gridCoords[g]) < ROAD_W * 0.55) {
          along = gridCoords[g] + (Math.random() < 0.5 ? -1 : 1) * (ROAD_W * 0.5 + 6);
          break;
        }
      }
      along = Math.max(-mapLimit, Math.min(mapLimit, along));

      const x = axis === 'x' ? along : line;
      const z = axis === 'x' ? line : along;
      const shirt = PED_SHIRTS[i % PED_SHIRTS.length];
      const pants = PED_PANTS[i % PED_PANTS.length];
      const group = createMinifigure3D(x, z, 0, shirt, pants, i % 3 !== 1, { skipCityAdd: true });
      scene.add(group);

      const ped = {
        group,
        x,
        z,
        axis,
        dir,
        line,
        roadLine,
        side,
        angle: pedFacingAngle(axis, dir),
        speed: 0.030 + Math.random() * 0.016,
        walkPhase: Math.random() * Math.PI * 2,
        waitTimer: Math.random() * 0.8,
        onCrosswalk: false,
        crosswalkHorizontal: null,
        crossing: null,
        decidedJunction: null
      };
      group.rotation.y = ped.angle;
      pedestrians.push(ped);
    }
  }

  function updatePedestrians(delta) {
    if (!pedestrians.length) return;
    const timeFactor = Math.min(Math.max(delta, 0.35), 2.5);
    const seconds = timeFactor / 60;
    const sw = pedSidewalkOffset();
    const mapLimit = ROAD_EDGE - sw - 1.5;
    const decisionDist = ROAD_W * 0.5 + 0.4;

    for (const ped of pedestrians) {
      if (ped.waitTimer > 0) {
        ped.waitTimer -= seconds;
        if (!ped.crossing) {
          ped.onCrosswalk = false;
          ped.crosswalkHorizontal = null;
        }
        applyPedPose(ped, 0);
        continue;
      }

      const step = ped.speed * timeFactor;

      // --- Zebra / carriageway crossing (axis-locked straight line) ---
      if (ped.crossing) {
        const along = ped.axis === 'x' ? ped.x : ped.z;
        const next = along + ped.dir * step;
        const target = ped.crossing.targetAlong;
        const arrived = ped.dir > 0 ? next >= target : next <= target;
        if (arrived) {
          if (ped.axis === 'x') ped.x = target;
          else ped.z = target;
          ped.crossing = null;
          ped.decidedJunction = null;
          pedSnapToSidewalk(ped);
          ped.onCrosswalk = false;
          ped.crosswalkHorizontal = null;
          ped.waitTimer = 0.2 + Math.random() * 0.5;
        } else {
          if (ped.axis === 'x') {
            ped.x = next;
            ped.z = ped.line;
          } else {
            ped.z = next;
            ped.x = ped.line;
          }
          ped.angle = pedFacingAngle(ped.axis, ped.dir);
          syncPedCrosswalkFlag(ped);
        }
        applyPedPose(ped, step);
        continue;
      }

      // --- Sidewalk travel ---
      const along = ped.axis === 'x' ? ped.x : ped.z;
      let nextAlong = along + ped.dir * step;

      // End of playable map → U-turn on the same sidewalk.
      if (nextAlong > mapLimit || nextAlong < -mapLimit) {
        ped.dir *= -1;
        ped.decidedJunction = null;
        pedSnapToSidewalk(ped);
        ped.waitTimer = 0.35 + Math.random() * 0.4;
        applyPedPose(ped, 0);
        continue;
      }

      // Corner / junction decision: cross-roads are the grid lines on the other axis.
      const junctions = gridCoords;
      for (let ji = 0; ji < junctions.length; ji++) {
        const j = junctions[ji];
        const decisionAt = j - ped.dir * decisionDist;
        const hit = ped.dir > 0
          ? (along < decisionAt && nextAlong >= decisionAt)
          : (along > decisionAt && nextAlong <= decisionAt);
        if (!hit) continue;

        if (ped.decidedJunction === j) break;
        ped.decidedJunction = j;

        const roll = Math.random();
        if (roll < PED_TURN_LEFT) {
          applyPedCornerTurn(ped, j, +1);
        } else if (roll < PED_TURN_RIGHT) {
          applyPedCornerTurn(ped, j, -1);
        } else {
          startPedStraightCrossing(ped, j);
        }
        applyPedPose(ped, 0);
        nextAlong = NaN; // signal: skip free integration this frame
        break;
      }

      if (Number.isNaN(nextAlong)) continue;

      // Forget junction lock once we are clear of it (mid-block again).
      if (ped.decidedJunction !== null) {
        if (Math.abs(along - ped.decidedJunction) > ROAD_W * 0.5 + 4) {
          ped.decidedJunction = null;
        }
      }

      if (ped.axis === 'x') {
        ped.x = nextAlong;
        ped.z = ped.line;
      } else {
        ped.z = nextAlong;
        ped.x = ped.line;
      }
      ped.angle = pedFacingAngle(ped.axis, ped.dir);
      ped.onCrosswalk = false;
      ped.crosswalkHorizontal = null;
      applyPedPose(ped, step);
    }
  }

  // True when a walking minifig is on a zebra ahead of this car (yield zone).
  // Horizontal zebra → N–S road → cars with axis 'z' yield.
  // Vertical zebra   → E–W road → cars with axis 'x' yield.
  function npcPedestrianBlocked(car) {
    if (!pedestrians.length) return false;
    const dirX = car.axis === 'x' ? car.dir : 0;
    const dirZ = car.axis === 'z' ? car.dir : 0;
    const reach = NPC_SENSOR_Z + 3.5;

    for (const ped of pedestrians) {
      if (!ped.onCrosswalk) continue;
      if (ped.crosswalkHorizontal === true && car.axis !== 'z') continue;
      if (ped.crosswalkHorizontal === false && car.axis !== 'x') continue;
      const dx = ped.x - car.x;
      const dz = ped.z - car.z;
      const ahead = dx * dirX + dz * dirZ;
      if (ahead < 0.4 || ahead > reach) continue;
      const lateral = car.axis === 'x' ? Math.abs(ped.z - car.z) : Math.abs(ped.x - car.x);
      if (lateral < 5.2) return true;
    }
    return false;
  }

  // --- Forward proximity sensor ---
  // The player truck always makes an NPC brake. Other NPC cars are only treated
  // as obstacles when they travel the SAME direction (convoy, heading within
  // ~45°) — so oncoming cars and 90° crossroads never mutually lock up.
  function npcSensorBlocked(car) {
    const dirX = car.axis === 'x' ? car.dir : 0;
    const dirZ = car.axis === 'z' ? car.dir : 0;

    // --- Player refuse truck: always yield ---
    // Measured to the truck centre but extended by half the truck body, so the
    // NPC stops with a ~6–7 m gap to the actual rear of the long refuse body.
    const tdx = truckPhys.x - car.x;
    const tdz = truckPhys.z - car.z;
    const truckAhead = tdx * dirX + tdz * dirZ;
    const truckReach = NPC_SENSOR_Z + truckPhys.length / 2; // ≈ 10.4 m to centre
    if (truckAhead > 0 && truckAhead < truckReach && Math.hypot(tdx, tdz) < truckReach) {
      return true;
    }

    // --- Pedestrians on a zebra ahead: full stop until the crossing clears ---
    if (npcPedestrianBlocked(car)) return true;

    // --- Other NPC cars: only brake for same-direction convoys ---
    // Heading vectors (three.js rotation.y: forward = (sin, cos)).
    const myFwdX = Math.sin(car.angle);
    const myFwdZ = Math.cos(car.angle);

    for (const other of npcCars) {
      if (other === car) continue;

      const dx = other.x - car.x;
      const dz = other.z - car.z;

      // Only cars genuinely ahead along our own travel direction matter.
      const ahead = dx * dirX + dz * dirZ;
      if (ahead <= 0 || ahead > NPC_SENSOR_Z + 1.5) continue;

      // Skip oncoming / perpendicular traffic: only same-direction convoys brake.
      const otherFwdX = Math.sin(other.angle);
      const otherFwdZ = Math.cos(other.angle);
      const dot = myFwdX * otherFwdX + myFwdZ * otherFwdZ;
      if (dot < NPC_CONVOY_COS) continue;

      if (Math.hypot(dx, dz) < NPC_SENSOR_Z) return true;
    }
    return false;
  }

  // --- Frame-rate independent step (normalised to the ~60 FPS target) ---
  let lastTrafficFrameTime = 0;
  function getTrafficDelta() {
    const now = performance.now();
    if (lastTrafficFrameTime === 0) {
      lastTrafficFrameTime = now;
      return 1;
    }
    const deltaMs = now - lastTrafficFrameTime;
    lastTrafficFrameTime = now;
    // 16.67 ms == one unit of per-frame travel at 60 FPS.
    return deltaMs / 16.667;
  }

  // --- Per-frame traffic simulation (straight segments + smooth braking) ---
  function updateTraffic(delta) {
    if (!npcCars.length) return;

    const timeFactor = Math.min(Math.max(delta, 0.35), 2.5); // frame-rate compensation
    // Seconds elapsed for this step (delta is normalised to a 60 FPS frame).
    const seconds = Math.min(Math.max(delta, 0.35), 2.5) / 60;

    for (const car of npcCars) {
      // After a crash the car is frozen for a moment so it cannot instantly
      // drive back into the player's truck.
      if (car.stunTimer > 0) {
        car.stunTimer = Math.max(0, car.stunTimer - seconds);
        car.speed = 0;
        car.stopped = true;
        car.stuckTimer = 0;
        continue;
      }

      // Brake smoothly to a full stop when the lane ahead is blocked.
      const blocked = npcSensorBlocked(car);
      const desired = blocked ? 0 : car.targetSpeed;

      // Smooth acceleration / braking (no instant velocity jumps).
      const rate = desired < car.speed ? 0.017 : 0.006;
      if (car.speed < desired) car.speed = Math.min(desired, car.speed + rate * timeFactor);
      else if (car.speed > desired) car.speed = Math.max(desired, car.speed - rate * timeFactor);
      car.stopped = car.speed < 0.01;

      // --- Anti-deadlock watchdog ---
      // A car pinned still for too long WITHOUT the player nearby is stuck on
      // other traffic (crossroads, head-on). Teleport it to a free random lane
      // so the fleet never freezes forever. Stalls caused by the player truck
      // or a crossing pedestrian are exempt: the NPC keeps patiently yielding.
      const playerDist = Math.hypot(car.x - truckPhys.x, car.z - truckPhys.z);
      const yieldingForPed = blocked && npcPedestrianBlocked(car);
      if (Math.abs(car.speed) < 0.02 && playerDist > NPC_STUCK_PLAYER_RANGE && !yieldingForPed) {
        car.stuckTimer += seconds;
        if (car.stuckTimer > NPC_STUCK_SECONDS) {
          if (respawnNpcCarToFreeLane(car)) {
            car.stuckTimer = 0;
            car.stunTimer = 0;
            car.speed = car.targetSpeed;
            car.stopped = false;
            continue; // lane placement already refreshed the 3D transform
          }
          // No free spot this frame: keep the timer primed and retry next frame.
          car.stuckTimer = NPC_STUCK_SECONDS;
        }
      } else {
        car.stuckTimer = 0;
      }

      // Straight-line integration along the current lane.
      const prevAlong = car.axis === 'x' ? car.x : car.z;
      const nextAlong = prevAlong + car.dir * car.speed * timeFactor;

      // Junction crossing: possibly turn onto the perpendicular road.
      // (Junctions are the grid intersections, not the road ends.)
      let turned = false;
      if (!blocked && car.speed > 0.02) {
        const junctions = car.axis === 'x' ? NPC_GRID_COL_X : NPC_GRID_ROW_Z;
        for (let jIdx = 0; jIdx < junctions.length; jIdx++) {
          const j = junctions[jIdx];
          const crossed = car.dir > 0 ? (prevAlong < j && nextAlong >= j) : (prevAlong > j && nextAlong <= j);
          if (!crossed) continue;
          if (Math.random() < NPC_TURN_CHANCE) {
            const nextAxis = car.axis === 'x' ? 'z' : 'x';
            const laneSign = Math.random() < 0.5 ? 1 : -1;
            const lane = NPC_LANES.find(l => l.axis === nextAxis && l.line === j && Math.sign(l.lane) === laneSign)
              || NPC_LANES.find(l => l.axis === nextAxis && l.line === j);
            const newDir = lane.lane > 0 ? 1 : -1;
            // The perpendicular coordinate stays put → no teleport.
            placeCarOnLane(car, nextAxis, j, lane.lane, newDir, car.line + car.lane);
            turned = true;
          }
          break;
        }
      }

      if (!turned) {
        if (car.axis === 'x') car.x = nextAlong;
        else car.z = nextAlong;
      }

      // End-of-road behaviour: U-turn onto the return lane.
      const alongNow = car.axis === 'x' ? car.x : car.z;
      if (Math.abs(alongNow) > NPC_TURN_ZONE) {
        const uTurnAlong = car.dir > 0 ? NPC_TURN_ZONE : -NPC_TURN_ZONE;
        placeCarOnLane(car, car.axis, car.line, -car.lane, -car.dir, uTurnAlong);
      }

      // Keep cars on the paved grid (never past the dead-end barriers).
      const limit = ROAD_EDGE - 2;
      car.x = Math.max(-limit, Math.min(limit, car.x));
      car.z = Math.max(-limit, Math.min(limit, car.z));

      // Apply to the 3D transform.
      car.group.position.set(car.x, 0, car.z);
      car.group.rotation.y = car.angle;

      // Roll wheels proportionally to travel.
      if (car.group.userData.wheels) {
        const spin = car.speed * timeFactor * 2.4;
        for (const w of car.group.userData.wheels) w.rotation.x += spin;
      }
    }
  }

  // --- Player truck ↔ NPC collision response ---
  // Three stages:
  //   1. Contact test  : oriented truck box vs. car circle (handles the long
  //                      refuse body correctly).
  //   2. Depenetration : hard minimum-translation-vector separation split 50/50
  //                      between the truck and the car (no penetration survives
  //                      into the next frame → no re-triggering / sticking).
  //   3. Impulse       : zero the truck speed, add a backward rebound and stun
  //                      the NPC, with a per-car immunity cooldown.
  function checkTrafficCollisions() {
    if (!npcCars.length) return;

    const cosA = Math.cos(truckPhys.angle);
    const sinA = Math.sin(truckPhys.angle);
    const halfL = truckPhys.length / 2;
    const halfW = truckPhys.width / 2;

    const now = performance.now();

    for (const car of npcCars) {
      // --- Cooldown immunity for THIS car ---
      // After a crash, the truck and this specific car ignore each other for a
      // short window so the player can reverse or steer out and the penalty is
      // never double-charged.
      if (now - car.lastCollisionTime < NPC_COLLISION_COOLDOWN_MS) continue;

      // --- Phase 1: contact test (truck oriented box vs. car circle) ---
      const dx = car.x - truckPhys.x;
      const dz = car.z - truckPhys.z;
      const localX = dx * cosA - dz * sinA;
      const localZ = dx * sinA + dz * cosA;

      const closestX = Math.max(-halfW, Math.min(halfW, localX));
      const closestZ = Math.max(-halfL, Math.min(halfL, localZ));
      const sepX = localX - closestX;
      const sepZ = localZ - closestZ;
      const sepLen = Math.hypot(sepX, sepZ);

      // No contact, or merely resting in contact without real penetration.
      if (sepLen > NPC_CAR_RADIUS - NPC_CONTACT_SLOP) continue;

      // --- Phase 2: hard separation (minimum translation vector) ---
      // Local axes in world space (local X = truck right, local Z = truck forward).
      const rightX = cosA;
      const rightZ = -sinA;
      const fwdX = sinA;
      const fwdZ = cosA;

      let pushX;   // world direction that pushes the TRUCK away from the car
      let pushZ;
      let overlap; // penetration depth in metres

      if (sepLen > 0.0001) {
        // Car centre sits OUTSIDE the truck box: the MTV runs along the car→box
        // edge. sepX/sepZ is (car centre − closest box point), so the truck is
        // shoved opposite to it (head-on this reduces to the centre-to-centre
        // vector with minDist ≈ halfL + carRadius ≈ 6.35 m), and the car takes
        // the mirrored shove.
        const sepWorldX = sepX * rightX + sepZ * fwdX;
        const sepWorldZ = sepX * rightZ + sepZ * fwdZ;
        const inv = -1 / sepLen;
        pushX = sepWorldX * inv;
        pushZ = sepWorldZ * inv;
        overlap = NPC_CAR_RADIUS - sepLen;
      } else {
        // Car centre is INSIDE the truck box (deep hit): eject along the axis of
        // least penetration so the truck never snaps through to the far side.
        // `push` is always the direction that moves the TRUCK away from the car,
        // so here it points to the side OPPOSITE the car's nearest face.
        const penX = halfW - Math.abs(localX);
        const penZ = halfL - Math.abs(localZ);
        if (penX <= penZ) {
          const s = localX >= 0 ? 1 : -1;
          pushX = -rightX * s;
          pushZ = -rightZ * s;
          overlap = penX + NPC_CAR_RADIUS;
        } else {
          const s = localZ >= 0 ? 1 : -1;
          pushX = -fwdX * s;
          pushZ = -fwdZ * s;
          overlap = penZ + NPC_CAR_RADIUS;
        }
      }

      if (overlap > 0) {
        // Split the penetration 50/50 between the truck and the NPC.
        truckPhys.x += pushX * overlap * 0.5;
        truckPhys.z += pushZ * overlap * 0.5;
        car.x -= pushX * overlap * 0.5;
        car.z -= pushZ * overlap * 0.5;
      }

      // --- Phase 3: impact impulse ---
      // The truck's velocity lives in body frame: position += (sin, cos) * speed.
      const velX = sinA * truckPhys.speed;
      const velZ = cosA * truckPhys.speed;

      // Zero forward momentum and kick a short rebound straight out of the
      // contact point (push already points away from the car), decaying over the
      // next few frames.
      truckPhys.speed = 0;
      if (Math.hypot(velX, velZ) > 0.01) {
        truckPhys.collisionRecoilX = pushX * NPC_RECOIL_IMPULSE;
        truckPhys.collisionRecoilZ = pushZ * NPC_RECOIL_IMPULSE;
      }

      // Freeze the NPC and stun it so it cannot drive straight back into us.
      car.speed = 0;
      car.stunTimer = NPC_STUN_SECONDS;

      // Mark the crash time on BOTH bodies: the truck latch drives the HUD /
      // cross-system rate limiting, the per-car stamp drives the immunity.
      car.lastCollisionTime = now;
      truckPhys.lastTrafficCollisionTime = now;

      // The instantaneous depenetration above already moved truckPhys, so the
      // mesh transform applied later this frame (in updatePhysics) reflects it.
      car.group.position.set(car.x, 0, car.z);

      // --- Phase 4: one-time crash feedback (cooldown was checked above) ---
      window.soundManager.playCrash();
      gameState.timePenalty += 5000;
      showToast('ДТП!', 'Соблюдайте дистанцию (+5 сек штрафа)', '💥', 2500, true);
      break; // one response per frame is enough
    }
  }

  // --- Level Initialization ---
  function initLevel() {
    const map = applyActiveMap(activeMapId);
    generate3DCity();

    // --- Procedural container placement ---
    // generate3DCity() already cleared the previous city + bins. Pick unique
    // spawn points from the active map's pool with a balanced material spread.
    gameState.totalBins = map.totalBins;
    gameState.mapId = map.id;
    const binCategories = ['yellow', 'blue', 'green'];
    const balancedCategories = shuffleCopy(
      binCategories.flatMap((cat) => [cat, cat, cat, cat])
    );
    const spawnPool = buildBinSpawnPool(map);
    const chosenSpawns = shuffleCopy(spawnPool).slice(0, gameState.totalBins);
    chosenSpawns.forEach((spot, i) => {
      spawn3DBin(spot.x, spot.z, spot.angle, balancedCategories[i]);
    });

    gameState.collectedBinsTotal = 0;
    gameState.totalKg = 0;
    resetCurrentCargo();
    gameState.startTime = Date.now();
    gameState.endTime = null;
    gameState.status = 'collecting';
    gameState.activePromptType = null;
    gameState.targetBin = null;
    gameState.routeRecorded = false;
    gameState.timePenalty = 0;

    truckPhys.x = map.truckStart.x;
    truckPhys.z = map.truckStart.z;
    truckPhys.angle = map.truckStart.angle;
    truckPhys.speed = 0;
    truckPhys.arm.active = false;
    truckPhys.arm.state = 'idle';
    truckPhys.isDumpingAtFactory = false;
    truckPhys.isQuickDumping = false;
    truckPhys.quickDumpProgress = 0;
    truckPhys.dumpProgress = 0;
    tailgateGroup.rotation.x = 0;
    cutsceneActive = false;
    unloadCutsceneActive = false;
    stuckTimer = 0;
    setStuckPulsing(false);
    hideToast();
    if (pickupOverlay) pickupOverlay.classList.remove('show');
    if (unloadOverlay) unloadOverlay.classList.remove('show');

    // Reset EV state on new route
    truckPhys.batteryLevel = 100.0;
    truckPhys.powerFlow = 0;
    truckPhys.currentCargoWeight = 0;
    truckPhys.currentBinsInCargo = 0;
    truckPhys.massFactor = 1.0;
    truckPhys.isCharging = false;
    truckPhys.chargingSoundCooldown = 0;
    truckPhys.ptoOverrideUntil = 0;
    truckPhys.lowBatteryAlertTriggered = false; // re-arm the ≤15% warning
    truckPhys.lastTrafficCollisionTime = 0;
    truckPhys.collisionRecoilX = 0;
    truckPhys.collisionRecoilZ = 0;

    // Clear any in-flight battery evacuation (blackout overlay + pending timer).
    isEvacuating = false;
    clearTimeout(evacuationTimeout);
    evacuationTimeout = null;
    if (batteryBlackout) batteryBlackout.classList.remove('show');

    // Derived physics params (scale with mass at runtime)
    truckPhys.accel = truckPhys.baseAccel;
    truckPhys.brake = truckPhys.baseBrake;
    truckPhys.turnSpeed = truckPhys.baseTurnSpeed;

    // Spawn the NPC traffic only after the truck is placed, so the initial
    // spawn-overlap check uses the correct player position.
    lastTrafficFrameTime = 0;
    spawnTraffic();
    spawnPedestrians();

    updateStatsHUD();
    updateTaskHUD();
    updateBestTimeHUD();
    // City lamps / fog distances are rebuilt above — re-apply day/night + weather.
    applyAtmosphere(activeTimeOfDay, activeWeather);
  }

  // --- Strict Solid Collision & Vehicle Dynamics ---
  function updatePhysics() {
    // Pause the shift while the map picker is open (boot or mid-career switch).
    if (mapSelectModal && mapSelectModal.classList.contains('show')) {
      truckPhys.speed = 0;
      truckPhys.powerFlow = 0;
      return;
    }

    // e-PTO peak override (hydraulic pump). Evaluated before every early exit
    // so the 240 kW spike stays visible on the cluster for the full arm cycle,
    // including while the pickup cutscene early-returns below.
    const ptoPeak = performance.now() < truckPhys.ptoOverrideUntil;

    // Traffic + sidewalk walkers keep moving (and NPC yield) even during cutscenes.
    const trafficDelta = getTrafficDelta();
    updatePedestrians(trafficDelta);
    updateTraffic(trafficDelta);

    if (cutsceneActive || unloadCutsceneActive || truckPhys.isDumpingAtFactory || truckPhys.isQuickDumping) {
      truckPhys.speed *= 0.8;
      if (Math.abs(truckPhys.speed) < 0.005) truckPhys.speed = 0;
      // EV: regen while coasting to stop during cutscene (minor)
      truckPhys.powerFlow = ptoPeak ? PTO_PEAK_KW : 0;
      return;
    }

    // Battery evacuation: the truck is immobilised while the tow-truck
    // fade-to-black sequence plays — controls are locked out entirely.
    if (isEvacuating) {
      truckPhys.speed = 0;
      truckPhys.powerFlow = 0;
      return;
    }

    const prevSpeed = truckPhys.speed;

    // --- EV Mass Factor (Payload Physics, Task 1) ---
    // Full cargo (1440 kg) degrades acceleration by 35%, braking by 20%, steering by 18%
    truckPhys.massFactor = 1.0 - (truckPhys.currentCargoWeight / truckPhys.maxCargoWeight) * 0.35;
    truckPhys.accel = truckPhys.baseAccel * truckPhys.massFactor;
    truckPhys.brake = truckPhys.baseBrake * (1.0 - (truckPhys.currentCargoWeight / truckPhys.maxCargoWeight) * 0.20);
    truckPhys.turnSpeed = truckPhys.baseTurnSpeed * (1.0 - (truckPhys.currentCargoWeight / truckPhys.maxCargoWeight) * 0.18);

    // Wet road grip: rain softens accel/brake/steer and lets the truck coast farther.
    const isWetRoad = activeWeather === 'rain';
    if (isWetRoad) {
      truckPhys.accel *= 0.88;
      truckPhys.brake *= 0.78;
      truckPhys.turnSpeed *= 0.82;
    }
    const coastFriction = isWetRoad ? truckPhys.friction * 0.62 : truckPhys.friction;

    // Acceleration & Braking with authentic heavy commercial weight
    if (keys.up) {
      if (truckPhys.speed < 0) {
        truckPhys.speed += truckPhys.brake;
      } else {
        truckPhys.speed += truckPhys.accel;
        if (truckPhys.speed > truckPhys.maxForward) truckPhys.speed = truckPhys.maxForward;
      }
    } else if (keys.down) {
      if (truckPhys.speed > 0) {
        truckPhys.speed -= truckPhys.brake;
        if (truckPhys.speed < 0) truckPhys.speed = 0;
      } else {
        truckPhys.speed -= truckPhys.accel * 0.75;
        if (truckPhys.speed < truckPhys.maxReverse) truckPhys.speed = truckPhys.maxReverse;
      }
    } else {
      if (truckPhys.speed > 0) {
        truckPhys.speed -= coastFriction;
        if (truckPhys.speed < 0) truckPhys.speed = 0;
      } else if (truckPhys.speed < 0) {
        truckPhys.speed += coastFriction;
        if (truckPhys.speed > 0) truckPhys.speed = 0;
      }
    }

    // Steering
    const speedRatio = truckPhys.speed / truckPhys.maxForward;
    truckPhys.steerAngle = 0;
    if (keys.left) truckPhys.steerAngle = 0.42;
    if (keys.right) truckPhys.steerAngle = -0.42;

    const prevAngle = truckPhys.angle;
    let nextAngle = truckPhys.angle;
    if (Math.abs(truckPhys.speed) > 0.015) {
      const dir = truckPhys.speed >= 0 ? 1 : -1;
      if (keys.left) nextAngle += truckPhys.turnSpeed * dir * (0.65 + Math.abs(speedRatio) * 0.35);
      if (keys.right) nextAngle -= truckPhys.turnSpeed * dir * (0.65 + Math.abs(speedRatio) * 0.35);
    }

    // Candidate next position
    const nextX = truckPhys.x + Math.sin(nextAngle) * truckPhys.speed;
    const nextZ = truckPhys.z + Math.cos(nextAngle) * truckPhys.speed;

    // Strict Multi-Point Oriented Collision Check
    // We test 6 perimeter points of the truck (front-left, front-right, rear-left, rear-right, mid-left, mid-right)
    const cosA = Math.cos(nextAngle);
    const sinA = Math.sin(nextAngle);
    const halfL = truckPhys.length / 2;
    const halfW = truckPhys.width / 2;

    const truckPoints = [
      { x: nextX + sinA * halfL - cosA * halfW, z: nextZ + cosA * halfL + sinA * halfW }, // Front-Right
      { x: nextX + sinA * halfL + cosA * halfW, z: nextZ + cosA * halfL - sinA * halfW }, // Front-Left
      { x: nextX - sinA * halfL - cosA * halfW, z: nextZ - cosA * halfL + sinA * halfW }, // Rear-Right
      { x: nextX - sinA * halfL + cosA * halfW, z: nextZ - cosA * halfL - sinA * halfW }, // Rear-Left
      { x: nextX - cosA * halfW, z: nextZ + sinA * halfW },                               // Mid-Right
      { x: nextX + cosA * halfW, z: nextZ - sinA * halfW }                                // Mid-Left
    ];

    let collided = false;
    for (const c of colliders) {
      for (const p of truckPoints) {
        if (p.x >= c.minX && p.x <= c.maxX && p.z >= c.minZ && p.z <= c.maxZ) {
          collided = true;
          break;
        }
      }
      if (collided) break;
    }

    if (!collided) {
      truckPhys.x = nextX;
      truckPhys.z = nextZ;
      truckPhys.angle = nextAngle;
    } else {
      // Solid collision response: bounce back and damp speed
      const impactSpeed = Math.abs(truckPhys.speed);
      truckPhys.speed *= -0.28;
      // Do not wedge corners into obstacle when rotating
      truckPhys.angle = prevAngle;

      // --- Crash Audio (Task 2 Audio) ---
      const now = performance.now();
      if (impactSpeed > 0.04 && (now - truckPhys.lastTrafficCollisionTime) > 280) {
        truckPhys.lastTrafficCollisionTime = now;
        window.soundManager.playCrash();
      }
    }

    // Intelligent Stuck Detection:
    // If player is attempting to drive but unable to move for ~1.8s
    if ((keys.up || keys.down) && Math.abs(truckPhys.speed) < 0.03) {
      stuckTimer += 1 / 60;
      if (stuckTimer > 1.8 && !isStuckPulsingActive) {
        setStuckPulsing(true);
        showToast('МАШИНА ЗАСТРЯЛА?', 'Нажмите клавишу [R] или кнопку 🛣️ «На дорогу» для эвакуации', '⚠️', 4000, true);
      }
    } else if (Math.abs(truckPhys.speed) > 0.07) {
      if (stuckTimer > 0) {
        stuckTimer = 0;
        setStuckPulsing(false);
      }
    }

    // World Boundary constraint — the playable corridor is the paved grid.
    const bLimit = ROAD_EDGE;
    truckPhys.x = Math.max(-bLimit, Math.min(bLimit, truckPhys.x));
    truckPhys.z = Math.max(-bLimit, Math.min(bLimit, truckPhys.z));

    // Realistic suspension pitch & roll (wet roads feel a bit floatier in corners)
    const accelRate = truckPhys.speed - prevSpeed;
    const rollGain = isWetRoad ? 0.82 : 0.65;
    truckPhys.pitch += (-accelRate * 1.6 - truckPhys.pitch) * 0.15;
    truckPhys.roll += (-truckPhys.steerAngle * truckPhys.speed * rollGain - truckPhys.roll) * 0.15;

    // Player ↔ NPC traffic collision (impulse, penalty, toast).
    checkTrafficCollisions();

    // Apply any post-crash rebound impulse, then let it decay geometrically so
    // the truck separates cleanly instead of oscillating inside the car.
    if (truckPhys.collisionRecoilX !== 0 || truckPhys.collisionRecoilZ !== 0) {
      truckPhys.x += truckPhys.collisionRecoilX;
      truckPhys.z += truckPhys.collisionRecoilZ;
      truckPhys.collisionRecoilX *= 0.35;
      truckPhys.collisionRecoilZ *= 0.35;
      if (Math.abs(truckPhys.collisionRecoilX) < 0.001) truckPhys.collisionRecoilX = 0;
      if (Math.abs(truckPhys.collisionRecoilZ) < 0.001) truckPhys.collisionRecoilZ = 0;
    }

    // Apply to 3D Truck Model
    truckMesh.position.set(truckPhys.x, 0, truckPhys.z);
    truckMesh.rotation.y = truckPhys.angle;
    truckMesh.rotation.x = truckPhys.pitch;
    truckMesh.rotation.z = truckPhys.roll;

    // Wheels animation
    wheels.forEach(w => {
      if (w.isFront) w.group.rotation.y = truckPhys.steerAngle;
      w.group.children[0].rotation.x += truckPhys.speed * 0.85;
    });

    // --- EV Battery & Power Flow Simulation (Task 2 — precision tuned) ---
    // 100% → 15% in exactly 1.5 minutes of active driving: 85% drained over
    // 5400 frames (90 s @ 60 FPS) = 0.0157 %/frame at motorLoad 1.0
    // (mass-scaled up to +45% when fully laden).
    //   idle draw    = 0.0016 %/frame,
    //   regen        = +0.0015 %/frame under engine-braking / coasting.
    const isMoving = Math.abs(truckPhys.speed) > 0.015;
    const isReversing = truckPhys.speed < -0.015;
    const speedRatioAbs = Math.abs(speedRatio);

    if (keys.up && truckPhys.speed >= 0) {
      // Motoring forward: draw power proportional to motor load.
      const motorLoad = 0.55 + speedRatioAbs * 0.45;
      // Payload penalty: up to +45% consumption for a fully laden box.
      const payloadFactor = 1.0 + (truckPhys.currentCargoWeight / truckPhys.maxCargoWeight) * 0.45;
      truckPhys.powerFlow = Math.round(motorLoad * payloadFactor * 185); // up to ~185 kW peak
      truckPhys.batteryLevel = Math.max(0, truckPhys.batteryLevel - 0.0157 * motorLoad * payloadFactor);
    } else if (keys.down && truckPhys.speed > 0.02) {
      // Regenerative braking: recover energy (reward for coasting/braking).
      const regenRate = speedRatioAbs * 0.65;
      truckPhys.powerFlow = -Math.round(regenRate * 95); // up to -95 kW regen
      truckPhys.batteryLevel = Math.min(100, truckPhys.batteryLevel + 0.0015);
    } else if (isMoving) {
      // Coasting friction regen (minimal)
      truckPhys.powerFlow = -Math.round(speedRatioAbs * 18);
      truckPhys.batteryLevel = Math.min(100, truckPhys.batteryLevel + 0.0015);
    } else {
      // Standby idle draw (accessories, HVAC, 12V systems)
      truckPhys.powerFlow = 2; // ~2 kW standby
      truckPhys.batteryLevel = Math.max(0, truckPhys.batteryLevel - 0.0016);
    }

    // --- e-PTO peak override (hydraulic pump during bin pickup) ---
    // While the robotic arm cycle pumps its hydraulics, the instrument cluster
    // must show the real 240 kW e-PTO spike instead of the driving power flow.
    if (ptoPeak) {
      truckPhys.powerFlow = PTO_PEAK_KW;
    }

    // --- Factory Charging Pad zone (available any time during the shift) ---
    // The truck charges whenever it is parked within the pad radius, not only
    // during the unloading cutscene. Leaving the radius stops the charge.
    const chargeBay = recyclingPlant3D && recyclingPlant3D.chargingBay;
    const inChargeZone = chargeBay
      ? Math.hypot(truckPhys.x - chargeBay.x, truckPhys.z - chargeBay.z) < chargeBay.radius
      : false;
    truckPhys.isCharging = inChargeZone;

    if (truckPhys.isCharging) {
      truckPhys.batteryLevel = Math.min(100, truckPhys.batteryLevel + 0.08); // ~4.8%/s → 0→100% in ~21 s
      truckPhys.powerFlow = -150; // Show -150 kW as charging input
      if (truckPhys.chargingSoundCooldown > 0) {
        truckPhys.chargingSoundCooldown -= 1 / 60;
      } else {
        window.soundManager.playCharging();
        truckPhys.chargingSoundCooldown = 1.5;
      }
    }

    // Sound Engine Update with live EV power flow
    window.soundManager.updateMotor(speedRatioAbs, isMoving, isReversing, truckPhys.powerFlow);

    // --- Low Battery Alert (≤15%, with 18% hysteresis to prevent chattering) ---
    if (truckPhys.batteryLevel <= 15 && !truckPhys.lowBatteryAlertTriggered) {
      truckPhys.lowBatteryAlertTriggered = true;
      window.soundManager.playWarningBeep();
      showToast('НИЗКИЙ ЗАРЯД БАТАРЕИ!', 'Осталось менее 15%. Зарядитесь на эко-заводе ⚡', '🪫', 4000, true);
    } else if (truckPhys.batteryLevel > 18 && truckPhys.lowBatteryAlertTriggered) {
      // Re-arm only once the pack has recovered above the hysteresis band.
      truckPhys.lowBatteryAlertTriggered = false;
    }

    // --- Battery depletion → tow-truck evacuation ---
    if (truckPhys.batteryLevel <= 0 && !isEvacuating) {
      startBatteryEvacuation();
    }
  }

  // --- Robotic Arm Stub (In-world arm replaced by cutscene modal) ---
  function updateRoboticArm3D() {}

  // --- Safe Road Position Finder & Unstuck Rescue System ---
  function isTruckCollidingAt(x, z, angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const halfL = truckPhys.length / 2;
    const halfW = truckPhys.width / 2;

    const testPoints = [
      { x: x + sinA * halfL - cosA * halfW, z: z + cosA * halfL + sinA * halfW },
      { x: x + sinA * halfL + cosA * halfW, z: z + cosA * halfL - sinA * halfW },
      { x: x - sinA * halfL - cosA * halfW, z: z - cosA * halfL + sinA * halfW },
      { x: x - sinA * halfL + cosA * halfW, z: z - cosA * halfL - sinA * halfW },
      { x: x - cosA * halfW, z: z + sinA * halfW },
      { x: x + cosA * halfW, z: z - sinA * halfW },
      { x: x, z: z }
    ];

    for (const c of colliders) {
      for (const p of testPoints) {
        if (p.x >= c.minX && p.x <= c.maxX && p.z >= c.minZ && p.z <= c.maxZ) {
          return true;
        }
      }
    }

    if (Array.isArray(trashBins3D)) {
      for (const b of trashBins3D) {
        if (!b.collected && Math.hypot(x - b.x, z - b.z) < 3.4) {
          return true;
        }
      }
    }

    return false;
  }

  function findNearestRoadSpot() {
    const curX = truckPhys.x;
    const curZ = truckPhys.z;
    // 122, not 128: the evacuation must always land the truck well inside the
    // dead-end barriers, never on top of them.
    const bLimit = 122;

    const candidates = [];

    // Horizontal roads: constant z = gz, runs along X
    gridCoords.forEach(gz => {
      const distZ = Math.abs(curZ - gz);
      const clampedX = Math.max(-bLimit, Math.min(bLimit, curX));
      const sinA = Math.sin(truckPhys.angle);
      const heading = (sinA >= 0) ? Math.PI / 2 : -Math.PI / 2;
      const laneOffsetZ = (heading > 0) ? 3.6 : -3.6;

      candidates.push({
        type: 'horizontal',
        x: clampedX,
        z: gz + laneOffsetZ,
        angle: heading,
        dist: distZ
      });
      candidates.push({
        type: 'horizontal',
        x: clampedX,
        z: gz,
        angle: heading,
        dist: distZ + 0.1
      });
    });

    // Vertical roads: constant x = gx, runs along Z
    gridCoords.forEach(gx => {
      const distX = Math.abs(curX - gx);
      const clampedZ = Math.max(-bLimit, Math.min(bLimit, curZ));
      const cosA = Math.cos(truckPhys.angle);
      const heading = (cosA >= 0) ? 0 : Math.PI;
      const laneOffsetX = (heading === 0) ? -3.6 : 3.6;

      candidates.push({
        type: 'vertical',
        x: gx + laneOffsetX,
        z: clampedZ,
        angle: heading,
        dist: distX
      });
      candidates.push({
        type: 'vertical',
        x: gx,
        z: clampedZ,
        angle: heading,
        dist: distX + 0.1
      });
    });

    candidates.sort((a, b) => a.dist - b.dist);

    for (const cand of candidates) {
      if (!isTruckCollidingAt(cand.x, cand.z, cand.angle)) {
        return cand;
      }
      const nudges = [4, -4, 8, -8, 12, -12, 16, -16];
      for (const d of nudges) {
        let testX = cand.x;
        let testZ = cand.z;
        if (cand.type === 'horizontal') {
          testX = Math.max(-bLimit, Math.min(bLimit, cand.x + d));
        } else {
          testZ = Math.max(-bLimit, Math.min(bLimit, cand.z + d));
        }
        if (!isTruckCollidingAt(testX, testZ, cand.angle)) {
          return { x: testX, z: testZ, angle: cand.angle };
        }
      }
    }

    return { x: -40, z: 25, angle: 0 };
  }

  function resetTruckToRoad() {
    window.soundManager.ensureContext();
    if (cutsceneActive || unloadCutsceneActive || isControlLocked() || truckPhys.isQuickDumping) return;

    stuckTimer = 0;
    setStuckPulsing(false);

    const spot = findNearestRoadSpot();

    truckPhys.x = spot.x;
    truckPhys.z = spot.z;
    truckPhys.angle = spot.angle;
    truckPhys.speed = 0;
    truckPhys.steerAngle = 0;
    truckPhys.pitch = 0;
    truckPhys.roll = 0;

    truckMesh.position.set(truckPhys.x, 0, truckPhys.z);
    truckMesh.rotation.set(0, truckPhys.angle, 0);

    wheels.forEach(w => {
      if (w.isFront) w.group.rotation.y = 0;
    });

    if (cameraMode === 0) {
      const distBehind = 13.8;
      const heightAbove = 6.2;
      const quarterAngle = 0.24;
      const camAngle = truckPhys.angle - quarterAngle;
      camera.position.x = truckPhys.x - Math.sin(camAngle) * distBehind;
      camera.position.z = truckPhys.z - Math.cos(camAngle) * distBehind;
      camera.position.y = heightAbove;
      camera.lookAt(
        truckPhys.x + Math.sin(truckPhys.angle) * 3.8,
        1.75,
        truckPhys.z + Math.cos(truckPhys.angle) * 3.8
      );
    } else if (cameraMode === 1) {
      const distBehindTop = 20.0;
      const sideOffsetTop = 14.0;
      camera.position.x = truckPhys.x - Math.sin(truckPhys.angle) * distBehindTop - Math.cos(truckPhys.angle) * sideOffsetTop;
      camera.position.z = truckPhys.z - Math.cos(truckPhys.angle) * distBehindTop + Math.sin(truckPhys.angle) * sideOffsetTop;
      camera.position.y = 16.0;
      camera.lookAt(
        truckPhys.x + Math.sin(truckPhys.angle) * 4.0,
        1.0,
        truckPhys.z + Math.cos(truckPhys.angle) * 4.0
      );
    }

    if (window.soundManager.playRescue) {
      window.soundManager.playRescue();
    } else {
      window.soundManager.playClick();
    }

    amberFlashUntil = performance.now() + 400;

    showToast('МАШИНА ВЕРНУТА НА ДОРОГУ', 'Эвакуация на безопасную полосу выполнена • Двигатель готов', '🛣️', 2600);
  }

  // ==========================================================================
  // BATTERY DEPLETION & TOW-TRUCK EVACUATION
  // --------------------------------------------------------------------------
  // When the pack hits 0% the truck is immobilised, the screen fades to black
  // and (after 2.5 s) the vehicle is teleported to the factory charging dock,
  // the battery is restored to 35% and a +30 s time penalty is applied.
  // ==========================================================================
  function getUnloadBayCenter() {
    if (recyclingPlant3D && recyclingPlant3D.unloadBay) {
      return {
        x: recyclingPlant3D.unloadBay.x,
        z: recyclingPlant3D.unloadBay.z
      };
    }
    // Fallback: recycling plant block centre (i=2, j=2).
    return { x: 40, z: 40 };
  }

  function startBatteryEvacuation() {
    if (isEvacuating) return;
    isEvacuating = true;

    // Kill momentum and lock controls (updatePhysics early-returns below).
    truckPhys.batteryLevel = 0;
    truckPhys.speed = 0;
    truckPhys.steerAngle = 0;
    truckPhys.powerFlow = 0;
    keys.up = keys.down = keys.left = keys.right = false;

    // Warning sound (crash/error buzzer) + alert toast.
    window.soundManager.playCrash();
    showToast('БАТАРЕЯ РАЗРЯЖЕНА',
      'Вызов службы эвакуации (+30 сек штрафа)', '🪫', 2600, true);

    // Fade the screen to black (0.8s CSS transition).
    if (batteryBlackout) batteryBlackout.classList.add('show');

    // After 2.5 s of blackout: relocate to the factory dock and recharge.
    clearTimeout(evacuationTimeout);
    evacuationTimeout = setTimeout(() => {
      const bay = getUnloadBayCenter();
      truckPhys.x = bay.x;
      truckPhys.z = bay.z;
      truckPhys.angle = 0;
      truckPhys.speed = 0;
      truckPhys.steerAngle = 0;
      truckPhys.pitch = 0;
      truckPhys.roll = 0;
      truckPhys.batteryLevel = 35.0;
      truckPhys.powerFlow = 0;
      truckPhys.collisionRecoilX = 0;
      truckPhys.collisionRecoilZ = 0;

      truckMesh.position.set(truckPhys.x, 0, truckPhys.z);
      truckMesh.rotation.set(0, truckPhys.angle, 0);

      // Penalty to the mission timer.
      gameState.timePenalty += 30000;

      // Lift the blackout and hand control back to the player.
      if (batteryBlackout) batteryBlackout.classList.remove('show');
      isEvacuating = false;
      evacuationTimeout = null;

      showToast('⚡ ГРУЗОВИК ДОСТАВЛЕН НА ЗАРЯДНУЮ СТАНЦИЮ ЗАВОДА',
        'Батарея восстановлена до 35%', '⚡', 2800);
    }, 2500);
  }

  // --- Trash Pickup Cutscene Engine (Мини-видеоролик / Стоп-моушн бортовой камеры) ---
  const pickupVideo = document.getElementById('pickupVideo');
  let hasVideoSource = false;
  if (pickupVideo) {
    pickupVideo.src = 'assets/pickup.mp4';
    pickupVideo.addEventListener('canplay', () => {
      hasVideoSource = true;
    });
    pickupVideo.addEventListener('ended', () => {
      finishPickupCutscene();
    });
    pickupVideo.addEventListener('error', () => {
      hasVideoSource = false;
    });
  }

  // Preloaded High-Resolution LEGO Stop-Motion Video Frames (6 cinematic phases)
  const cutsceneFrameUrls = [
    'assets/lego_cutscene_frame1.jpg',
    'assets/lego_cutscene_frame2.jpg',
    'assets/lego_cutscene_frame3.jpg',
    'assets/lego_cutscene_frame4.jpg',
    'assets/lego_cutscene_frame5.jpg',
    'assets/lego_cutscene_frame6.jpg'
  ];
  const cutsceneFrames = cutsceneFrameUrls.map(url => {
    const img = new Image();
    img.src = url;
    return img;
  });

  let cutsceneStartTime = 0;
  let cutsceneTargetBin = null;

  const PTO_BIN_COST = 3.0;          // % of pack per bin picked up (hydraulic pump)
  const PTO_PEAK_KW = 240;           // Instantaneous e-PTO peak shown in the cluster
  const PTO_OVERRIDE_MS = 1600;      // How long the peak stays on the power-flow gauge

  function startPickupCutscene(targetBin) {
    if (cutsceneActive) return;

    // e-PTO power gate: without charge left for the hydraulic pump the arm
    // cannot cycle, so the pickup never starts and the driver gets a warning.
    if (truckPhys.batteryLevel <= 0) {
      window.soundManager.playWarningBeep();
      showToast('НЕДОСТАТОЧНО ЭНЕРГИИ ДЛЯ ГИДРАВЛИКИ 🪫',
        'Батарея разряжена. Зарядитесь на эко-заводе ⚡', '🪫', 3500, true);
      return;
    }

    // Hydraulic pump energy draw: a flat 3% of the pack per container.
    // Applied before the cycle starts and clamped at 0 — if it bottoms out the
    // pack the truck is dead on the spot, so the standard tow-truck evacuation
    // takes over instead of the arm cycle.
    truckPhys.batteryLevel = Math.max(0, truckPhys.batteryLevel - PTO_BIN_COST);
    if (truckPhys.batteryLevel <= 0) {
      startBatteryEvacuation();
      return;
    }

    truckPhys.ptoOverrideUntil = performance.now() + PTO_OVERRIDE_MS;
    truckPhys.powerFlow = PTO_PEAK_KW; // instant reaction on the gauge

    cutsceneActive = true;
    cutsceneStartTime = performance.now();
    cutsceneTargetBin = targetBin;
    if (targetBin && targetBin.marker) targetBin.marker.visible = false;
    truckPhys.speed = 0; // stop vehicle during loading

    if (pickupOverlay) pickupOverlay.classList.add('show');

    // Bort-camera waste recognition badge (yellow / blue / green category)
    const binCategory = (targetBin && targetBin.category) || BIN_TYPES.yellow;
    if (pickupCategoryBadge) {
      pickupCategoryBadge.classList.remove('cat-yellow', 'cat-blue', 'cat-green');
      pickupCategoryBadge.classList.add(binCategory.classSuffix || 'cat-yellow');
    }
    if (pickupCatDot) pickupCatDot.textContent = binCategory.icon;
    if (pickupCatName) pickupCatName.textContent = (binCategory.shortName || binCategory.name).toUpperCase();

    if (pickupStatusText) pickupStatusText.textContent = '1/6 ЗАХВАТ КОНТЕЙНЕРА...';
    if (pickupTelemetry) pickupTelemetry.textContent = 'ГИДРАВЛИКА: 180 BAR | ДАТЧИКИ: ОК';

    // Check if MP4 video is available and ready to play
    if (pickupVideo && hasVideoSource) {
      pickupVideo.style.display = 'block';
      if (pickupCanvas) pickupCanvas.style.display = 'none';
      pickupVideo.currentTime = 0;
      pickupVideo.play().catch(() => {
        // Fallback to stop-motion canvas
        pickupVideo.style.display = 'none';
        if (pickupCanvas) pickupCanvas.style.display = 'block';
        requestAnimationFrame(renderPickupCutscene);
      });
    } else {
      if (pickupVideo) pickupVideo.style.display = 'none';
      if (pickupCanvas) pickupCanvas.style.display = 'block';
      requestAnimationFrame(renderPickupCutscene);
    }

    // Audio sequence synchronized with the 6 video frames
    window.soundManager.playClamp();
    setTimeout(() => { if (cutsceneActive) window.soundManager.playHydraulicServo(0.9); }, 500);
    setTimeout(() => { if (cutsceneActive) window.soundManager.playHydraulicServo(1.1); }, 1000);
    setTimeout(() => { if (cutsceneActive) window.soundManager.playTrashDump(); }, 1550);
    setTimeout(() => { if (cutsceneActive) window.soundManager.playCompactor(); }, 2250);
  }

  function finishPickupCutscene() {
    if (!cutsceneActive) return;
    cutsceneActive = false;

    if (pickupVideo) {
      pickupVideo.pause();
    }
    if (pickupOverlay) pickupOverlay.classList.remove('show');

    // Update 3D World state
    if (cutsceneTargetBin) {
      const bin = cutsceneTargetBin;
      const materialType = bin.type || (bin.category && bin.category.type) || TYPE_BY_CATEGORY[bin.category && bin.category.id] || 'plastic';
      const BIN_WEIGHT_KG = 120;

      bin.collected = true;
      bin.mesh.visible = true;
      if (bin.marker) bin.marker.visible = false;
      if (bin.lidGroup) bin.lidGroup.rotation.x = -1.6;

      // --- Trip progress vs. physical hopper load ---
      // collectedBinsTotal counts every container picked up this shift (never
      // reset by a mid-route dump); currentBinsInCargo is only the payload
      // physically riding in the hopper right now.
      gameState.collectedBinsTotal++;
      gameState.totalKg += BIN_WEIGHT_KG;

      // --- Separate accounting of collected weight per material type ---
      gameState.currentCargo.totalKg += BIN_WEIGHT_KG;
      gameState.currentCargo.breakdown[materialType] =
        (gameState.currentCargo.breakdown[materialType] || 0) + BIN_WEIGHT_KG;

      // Update live hopper load for EV mass physics
      truckPhys.currentBinsInCargo = Math.min(truckPhys.maxBins, truckPhys.currentBinsInCargo + 1);
      truckPhys.currentCargoWeight = truckPhys.currentBinsInCargo * BIN_WEIGHT_KG;
      updateStatsHUD();
      checkMissions();
      startCompactorCycle3D();
    }
    cutsceneTargetBin = null;
  }

  // Fast-forward / skip cutscene on click or Space (with safety debounce to prevent instant-close)
  function skipCutscene() {
    if (cutsceneActive && performance.now() - cutsceneStartTime > 250) {
      finishPickupCutscene();
    }
    if (unloadCutsceneActive && performance.now() - unloadCutsceneStartTime > 250) {
      finishFactoryUnloadCutscene();
    }
  }

  if (pickupOverlay) {
    pickupOverlay.addEventListener('click', skipCutscene);
    pickupOverlay.addEventListener('touchend', (e) => {
      e.preventDefault();
      skipCutscene();
    }, { passive: false });
  }
  if (unloadOverlay) {
    unloadOverlay.addEventListener('click', skipCutscene);
    unloadOverlay.addEventListener('touchend', (e) => {
      e.preventDefault();
      skipCutscene();
    }, { passive: false });
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (cutsceneActive && performance.now() - cutsceneStartTime > 250) {
        e.preventDefault();
        finishPickupCutscene();
        return;
      }
      if (unloadCutsceneActive && performance.now() - unloadCutsceneStartTime > 250) {
        e.preventDefault();
        finishFactoryUnloadCutscene();
        return;
      }
    }
  });

  // Helper to draw image onto canvas with cover-fit (proportional, zero distortion, centered)
  function drawImageCover(ctx, img, targetX, targetY, targetW, targetH) {
    const nw = img.naturalWidth || img.width;
    const nh = img.naturalHeight || img.height;
    if (!nw || !nh) return;
    const targetAspect = targetW / targetH;
    const imgAspect = nw / nh;
    let sx = 0, sy = 0, sw = nw, sh = nh;
    if (imgAspect > targetAspect) {
      sw = nh * targetAspect;
      sx = (nw - sw) / 2;
    } else {
      sh = nw / targetAspect;
      sy = (nh - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, targetX, targetY, targetW, targetH);
  }

  // --- High-Resolution Cinematic Video Frame Renderer (6-Frame Sequence) ---
  function renderPickupCutscene(timestamp) {
    if (!cutsceneActive || !pCtx) return;

    const elapsed = (timestamp - cutsceneStartTime) / 1000; // in seconds
    const totalDuration = 3.15;

    const W = pickupCanvas.width;  // 640
    const H = pickupCanvas.height; // 360

    pCtx.clearRect(0, 0, W, H);

    // Frame selection and cinematic camera transform
    let frameIdx = 0;
    let zoom = 1.0;
    let panX = 0;
    let panY = 0;
    let shakeX = 0;
    let shakeY = 0;

    if (elapsed < 0.50) {
      // 1. Clamp engaging (Frame 1)
      frameIdx = 0;
      const p = elapsed / 0.50;
      zoom = 1.0 + p * 0.03;
      panX = p * -8;
      if (pickupStatusText) pickupStatusText.textContent = '1/6 ЗАХВАТ КОНТЕЙНЕРА...';
      if (pickupTelemetry) pickupTelemetry.textContent = 'ГИДРАВЛИКА: 180 BAR | ЗАХВАТ: 100%';
    } else if (elapsed < 1.00) {
      // 2. Liftoff + roof hatch starts opening (Frame 2)
      frameIdx = 1;
      const p = (elapsed - 0.50) / 0.50;
      zoom = 1.03;
      panX = -8;
      panY = -p * 8;
      if (pickupStatusText) pickupStatusText.textContent = '2/6 ОТРЫВ ОТ ЗЕМЛИ И ОТКРЫТИЕ ЛЮКА...';
      if (pickupTelemetry) pickupTelemetry.textContent = 'ГИДРАВЛИКА: 215 BAR | ПОДЪЕМ: +0.4М';
    } else if (elapsed < 1.55) {
      // 3. Arm lifting towards roof hopper (Frame 3)
      frameIdx = 2;
      const p = (elapsed - 1.00) / 0.55;
      zoom = 1.04;
      panX = -8;
      panY = -8 - p * 8;
      if (pickupStatusText) pickupStatusText.textContent = '3/6 ПОДЪЕМ К ВЕРХНЕМУ БУНКЕРУ...';
      if (pickupTelemetry) pickupTelemetry.textContent = 'ГИДРАВЛИКА: 245 BAR | ПОДЪЕМ: +2.8М';
    } else if (elapsed < 2.25) {
      // 4. Inverting over hopper & dumping trash inside (Frame 4)
      frameIdx = 3;
      zoom = 1.05;
      panX = -8;
      panY = -16;
      // High-frequency rumble during trash dump
      shakeX = (Math.random() - 0.5) * 4.0;
      shakeY = (Math.random() - 0.5) * 4.0;
      if (pickupStatusText) pickupStatusText.textContent = '4/6 ВЫГРУЗКА ВТОРСЫРЬЯ В БУНКЕР...';
      if (pickupTelemetry) pickupTelemetry.textContent = 'ВТОРСЫРЬЕ: +120 КГ | ЛЮК ОТКРЫТ';
    } else if (elapsed < 2.70) {
      // 5. Empty bin descending + compactor blade sliding (Frame 5)
      frameIdx = 4;
      zoom = 1.03;
      panX = -6;
      panY = -8;
      if (pickupStatusText) pickupStatusText.textContent = '5/6 ПРЕССОВАНИЕ МУСОРА И СПУСК БАКА...';
      if (pickupTelemetry) pickupTelemetry.textContent = 'ПРЕСС: 280 BAR | СПУСК БАКА';
    } else {
      // 6. Restored to sidewalk, clean street, driver waving (Frame 6)
      frameIdx = 5;
      zoom = 1.01;
      if (pickupStatusText) pickupStatusText.textContent = '6/6 ВТОРСЫРЬЕ СОБРАНО ✅';
      if (pickupTelemetry) pickupTelemetry.textContent = 'ПРЕСС: ЗАВЕРШЕНО | ДАТЧИКИ: ОК';
    }

    const curImg = cutsceneFrames[frameIdx];

    pCtx.save();
    pCtx.translate(W / 2 + panX + shakeX, H / 2 + panY + shakeY);
    pCtx.scale(zoom, zoom);
    pCtx.translate(-W / 2, -H / 2);

    if (curImg && curImg.complete && curImg.naturalWidth > 0) {
      // Draw photographic frame cover with strictly preserved aspect ratio
      drawImageCover(pCtx, curImg, 0, 0, W, H);
    } else {
      // Dark fallback with grid
      pCtx.fillStyle = '#161e2a';
      pCtx.fillRect(0, 0, W, H);
    }
    pCtx.restore();

    // Cinematic Video HUD Overlays:
    // 1. Vignette shadow at edges
    const grad = pCtx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, H * 0.85);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, W, H);

    // 2. Cyberpunk Telemetry Reticle & Corners
    pCtx.strokeStyle = 'rgba(0, 210, 211, 0.65)';
    pCtx.lineWidth = 2;
    const cornerSize = 16;
    const m = 18;

    // Top-Left corner
    pCtx.beginPath();
    pCtx.moveTo(m, m + cornerSize);
    pCtx.lineTo(m, m);
    pCtx.lineTo(m + cornerSize, m);
    pCtx.stroke();

    // Top-Right corner
    pCtx.beginPath();
    pCtx.moveTo(W - m - cornerSize, m);
    pCtx.lineTo(W - m, m);
    pCtx.lineTo(W - m, m + cornerSize);
    pCtx.stroke();

    // Bottom-Left corner
    pCtx.beginPath();
    pCtx.moveTo(m, H - m - cornerSize);
    pCtx.lineTo(m, H - m);
    pCtx.lineTo(m + cornerSize, H - m);
    pCtx.stroke();

    // Bottom-Right corner
    pCtx.beginPath();
    pCtx.moveTo(W - m - cornerSize, H - m);
    pCtx.lineTo(W - m, H - m);
    pCtx.lineTo(W - m, H - m - cornerSize);
    pCtx.stroke();

    // Center Crosshair
    pCtx.strokeStyle = 'rgba(0, 210, 211, 0.35)';
    pCtx.lineWidth = 1;
    pCtx.beginPath();
    pCtx.moveTo(W / 2 - 12, H / 2);
    pCtx.lineTo(W / 2 + 12, H / 2);
    pCtx.moveTo(W / 2, H / 2 - 12);
    pCtx.lineTo(W / 2, H / 2 + 12);
    pCtx.stroke();

    // Live Telemetry Stamp
    pCtx.fillStyle = '#00d2d3';
    pCtx.font = 'bold 11px Outfit, monospace';
    pCtx.textAlign = 'right';
    const timeMs = Math.floor((elapsed % 1) * 100);
    const timeSec = Math.floor(elapsed);
    pCtx.fillText(`TC: 00:0${timeSec}:${String(timeMs).padStart(2, '0')} FPS: 60`, W - 24, 28);

    // Auto finish when duration reached
    if (elapsed >= totalDuration) {
      finishPickupCutscene();
      return;
    }

    requestAnimationFrame(renderPickupCutscene);
  }

  // --- Factory Recyclables Unload Cutscene Engine (Выгрузка вторсырья на эко-заводе) ---
  const unloadFrameUrls = [
    'assets/lego_unload_frame1.jpg',
    'assets/lego_unload_frame2.jpg'
  ];
  const unloadFrames = unloadFrameUrls.map(url => {
    const img = new Image();
    img.src = url;
    return img;
  });

  let unloadCutsceneActive = false;
  let unloadCutsceneStartTime = 0;
  let unloadCascadeParticles = [];

  function initUnloadCascadeParticles() {
    unloadCascadeParticles = [];
    const colors = ['#2ecc71', '#3498db', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6'];
    const types = ['bottle', 'can', 'box', 'paper'];
    for (let i = 0; i < 70; i++) {
      unloadCascadeParticles.push({
        x: 280 + Math.random() * 120,
        y: 190 + Math.random() * 25,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 1.8 + Math.random() * 3.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.22,
        size: 7 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 1.1
      });
    }
  }

  // ==========================================================================
  // FACTORY UNLOAD DISPATCHER
  // --------------------------------------------------------------------------
  // Entering the plant bay can mean one of two things:
  //   • the shift is complete (collectedBinsTotal === totalBins) → full
  //     cinematic unload followed by the victory screen;
  //   • the shift is still running but the hopper holds cargo → a short
  //     "pit-stop" dump that lightens the truck without ending the route.
  // ==========================================================================
  function beginFactoryUnload() {
    if (gameState.collectedBinsTotal >= gameState.totalBins) {
      startFactoryUnloadCutscene();
      return;
    }
    if (truckPhys.currentBinsInCargo > 0) {
      startQuickDump();
      return;
    }
    // Nothing collected yet and nothing to empty — nudge the driver along.
    showToast('КУЗОВ ПУСТ',
      `Соберите контейнеры, затем вернитесь для сброса. Прогресс: ${gameState.collectedBinsTotal}/${gameState.totalBins}`,
      '🗑️', 3000);
  }

  // --- Intermediate "Pit-stop" Dump (mid-route hopper emptying) ---
  let quickDumpTimer = null;

  function startQuickDump() {
    if (truckPhys.isQuickDumping) return;

    truckPhys.isQuickDumping = true;
    truckPhys.quickDumpProgress = 0;
    truckPhys.speed = 0;
    keys.up = keys.down = keys.left = keys.right = false;
    dumpLockUntil = performance.now() + 1800; // hard input gate, timer-independent

    // Snapshot the load being dropped for telemetry/toast copy.
    const dumpedBins = truckPhys.currentBinsInCargo;
    const dumpedKg = dumpedBins * 120;

    // Hydraulic tailgate + trash audio cue (no victory fanfare — route goes on).
    window.soundManager.playFactoryUnload();
    window.soundManager.playHydraulicServo(0.9);

    // Dump visuals: tailgate swings open, refuse cascades from the hopper.
    spawnDetailed3DTrash();

    // Controls stay locked for exactly 1.8 s, then the hopper is emptied.
    clearTimeout(quickDumpTimer);
    quickDumpTimer = setTimeout(() => {
      // Empty only the *physical* payload. gameState.collectedBinsTotal,
      // gameState.totalKg and the per-material breakdown stay untouched so
      // the shift keeps its progress and its final result.
      truckPhys.currentBinsInCargo = 0;
      truckPhys.currentCargoWeight = 0;
      truckPhys.massFactor = 1.0;
      truckPhys.accel = truckPhys.baseAccel;
      truckPhys.brake = truckPhys.baseBrake;
      truckPhys.turnSpeed = truckPhys.baseTurnSpeed;
      truckPhys.isQuickDumping = false;
      truckPhys.quickDumpProgress = 0;
      tailgateGroup.rotation.x = 0;

      updateStatsHUD();
      updateDashboard();

      showToast('ПРОМЕЖУТОЧНЫЙ СБРОС',
        `Кузов разгружен (-${dumpedKg} кг). Собрано: ${gameState.collectedBinsTotal}/${gameState.totalBins} баков. Продолжайте маршрут! ♻️`,
        '📦', 3500);
    }, 1800);
  }

  // Short hydraulic animation for the pit-stop dump (tailgate up, then back).
  function updateQuickDump3D() {
    if (!truckPhys.isQuickDumping) return;

    // ~1.5 s visual sweep, matching the 1.8 s control lock-out.
    truckPhys.quickDumpProgress = Math.min(1, truckPhys.quickDumpProgress + 0.011);
    const p = truckPhys.quickDumpProgress;
    truckPhys.tailgateAngle = p < 0.5 ? p * 2 : (1 - p) * 2;
    tailgateGroup.rotation.x = truckPhys.tailgateAngle * 1.3;

    if (Math.abs(p - 0.45) < 0.012) spawnDetailed3DTrash();
  }

  function startFactoryUnloadCutscene() {
    if (unloadCutsceneActive) return;

    unloadCutsceneActive = true;
    unloadCutsceneStartTime = performance.now();
    truckPhys.speed = 0;
    truckPhys.isDumpingAtFactory = true;
    // Charging is now driven purely by the factory Charging Pad zone in
    // updatePhysics(), so the truck recharges whenever it is parked on the pad
    // (including during this cutscene) instead of only during unloading.
    gameState.status = 'unloading';
    updateTaskHUD();

    initUnloadCascadeParticles();

    if (unloadOverlay) unloadOverlay.classList.add('show');
    if (unloadStatusText) unloadStatusText.textContent = '1/5 ПРИБЫТИЕ В ШЛЮЗ #1...';
    const cargo = gameState.currentCargo;
    // On the final delivery `currentCargo` already holds the whole shift. If a
    // pit-stop emptied the hopper mid-route, fall back to the physical payload
    // still on board (`totalKg` is the running shift total, not the live load).
    const totalKg = cargo.totalKg || truckPhys.currentCargoWeight || 0;
    if (unloadTelemetry) {
      unloadTelemetry.textContent =
        `ВЕСОВОЙ МОНИТОР: ${totalKg} КГ | 🟡 ${cargo.breakdown.plastic} · 🔵 ${cargo.breakdown.paper} · 🟢 ${cargo.breakdown.glass}`;
    }
    if (unloadWeightVal) unloadWeightVal.textContent = `${totalKg} КГ`;

    // Sound sequence synchronized with dumping phases
    window.soundManager.playHydraulicServo(0.85);
    setTimeout(() => { if (unloadCutsceneActive) window.soundManager.playHydraulicServo(1.2); }, 750);
    setTimeout(() => {
      if (unloadCutsceneActive) {
        window.soundManager.playTrashDump();
        window.soundManager.playFactoryUnload();
      }
    }, 1450);
    setTimeout(() => { if (unloadCutsceneActive) window.soundManager.playHydraulicServo(0.9); }, 2650);
    setTimeout(() => { if (unloadCutsceneActive) window.soundManager.playClamp(); }, 3250);
    setTimeout(() => { if (unloadCutsceneActive) window.soundManager.playVictory(); }, 3550);

    requestAnimationFrame(renderUnloadCutscene);
  }

  window.startPickupCutscene = startPickupCutscene;
  window.startFactoryUnloadCutscene = startFactoryUnloadCutscene;

  function finishFactoryUnloadCutscene() {
    if (!unloadCutsceneActive) return;
    unloadCutsceneActive = false;
    truckPhys.isDumpingAtFactory = false;
    tailgateGroup.rotation.x = 0;

    // Reset cargo after delivery; stop opportunity charging
    truckPhys.currentCargoWeight = 0;
    truckPhys.currentBinsInCargo = 0;
    truckPhys.isCharging = false;
    truckPhys.chargingSoundCooldown = 0;

    if (unloadOverlay) unloadOverlay.classList.remove('show');
    showVictory();
  }

  function renderUnloadCutscene(timestamp) {
    if (!unloadCutsceneActive || !uCtx) return;

    const elapsed = (timestamp - unloadCutsceneStartTime) / 1000;
    const totalDuration = 3.90;

    const W = unloadCanvas.width;  // 640
    const H = unloadCanvas.height; // 360

    uCtx.clearRect(0, 0, W, H);

    let frameIdx = 0;
    let zoom = 1.0;
    let panX = 0;
    let panY = 0;
    let shakeX = 0;
    let shakeY = 0;

    const totalKg = gameState.currentCargo.totalKg || gameState.totalKg || truckPhys.maxCargoWeight;

    if (elapsed < 0.70) {
      // 1. Docking & Gate Entry (Frame 1)
      frameIdx = 0;
      const p = elapsed / 0.70;
      zoom = 1.0 + p * 0.03;
      panX = p * -4;
      if (unloadStatusText) unloadStatusText.textContent = '1/5 ПРИБЫТИЕ В РАЗГРУЗОЧНЫЙ ШЛЮЗ #1...';
      if (unloadTelemetry) unloadTelemetry.textContent = `ВЕСОВОЙ МОНИТОР: ${totalKg} КГ | ШЛЮЗ: ОТКРЫТ`;
      if (unloadWeightVal) unloadWeightVal.textContent = `${totalKg} КГ`;
      tailgateGroup.rotation.x = 0;

    } else if (elapsed < 1.40) {
      // 2. Hydraulic Tailgate Raising (Frame 2)
      frameIdx = 1;
      const p = (elapsed - 0.70) / 0.70;
      zoom = 1.03 + p * 0.03;
      panY = -p * 6;
      const deg = Math.round(20 + p * 32);
      if (unloadStatusText) unloadStatusText.textContent = '2/5 ПОДЪЕМ КУЗОВА И ОТКРЫТИЕ ЗАДНЕГО БОРТА...';
      if (unloadTelemetry) unloadTelemetry.textContent = `ГИДРАВЛИКА: 275 BAR | УГОЛ: ${deg}° | БОРТ ОТКРЫТ`;
      if (unloadWeightVal) unloadWeightVal.textContent = `${totalKg} КГ`;
      tailgateGroup.rotation.x = p * 1.3;

    } else if (elapsed < 2.65) {
      // 3. Ejection & Cascade into Pit (Frame 2 + Dynamic Recyclables Shower)
      frameIdx = 1;
      const p = (elapsed - 1.40) / 1.25;
      zoom = 1.06;
      panY = -6;
      shakeX = (Math.random() - 0.5) * 5.0;
      shakeY = (Math.random() - 0.5) * 5.0;

      const remainingKg = Math.max(0, Math.round(totalKg * (1 - p)));
      const dumpedKg = totalKg - remainingKg;

      if (unloadStatusText) unloadStatusText.textContent = '3/5 ВЫТАЛКИВАНИЕ И СБРОС В ПРИЕМНЫЙ БУНКЕР...';
      if (unloadTelemetry) unloadTelemetry.textContent = 'ВЫТАЛКИВАТЕЛЬ: 140A | СБРОС В БУНКЕР | КОНВЕЙЕР: ПУСК ♻️';
      if (unloadWeightVal) unloadWeightVal.textContent = `${remainingKg} КГ (СДАНО: +${dumpedKg} КГ)`;

      tailgateGroup.rotation.x = 1.3;
      if (Math.random() < 0.3) spawnDetailed3DTrash();

    } else if (elapsed < 3.35) {
      // 4. Tailgate Lowering & Locks Engaged (Frame 1)
      frameIdx = 0;
      const p = (elapsed - 2.65) / 0.70;
      zoom = 1.03 - p * 0.02;
      panX = -4 * (1 - p);
      if (unloadStatusText) unloadStatusText.textContent = '4/5 ОПУСКАНИЕ БОРТА И БЛОКИРОВКА ЗАМКОВ...';
      if (unloadTelemetry) unloadTelemetry.textContent = 'КУЗОВ ОЧИЩЕН: 100% | ДАВЛЕНИЕ: 60 BAR | ЗАМКИ: БЛОК';
      if (unloadWeightVal) unloadWeightVal.textContent = '0 КГ (ВЕСЬ МУСОР СДАН ✅)';
      tailgateGroup.rotation.x = (1 - p) * 1.3;

    } else {
      // 5. Cleared & Ready for Recycling! (Frame 1 + Green Verification)
      frameIdx = 0;
      zoom = 1.01;
      if (unloadStatusText) unloadStatusText.textContent = '5/5 ВТОРСЫРЬЕ ПРИНЯТО НА ПЕРЕРАБОТКУ! ♻️';
      if (unloadTelemetry) unloadTelemetry.textContent = `СЭКОНОМЛЕНО CO2: ~${(totalKg * 0.082).toFixed(1)} КГ | ЗЕЛЕНЫЙ СВЕТ`;
      if (unloadWeightVal) unloadWeightVal.textContent = '0 КГ (РЕЙС ЗАВЕРШЕН ✅)';
      tailgateGroup.rotation.x = 0;
    }

    const curImg = unloadFrames[frameIdx];

    uCtx.save();
    uCtx.translate(W / 2 + panX + shakeX, H / 2 + panY + shakeY);
    uCtx.scale(zoom, zoom);
    uCtx.translate(-W / 2, -H / 2);

    if (curImg && curImg.complete && curImg.naturalWidth > 0) {
      drawImageCover(uCtx, curImg, 0, 0, W, H);
    } else {
      uCtx.fillStyle = '#102018';
      uCtx.fillRect(0, 0, W, H);
    }

    // Dynamic Recyclables Shower during Phase 3
    if (elapsed >= 1.40 && elapsed < 2.65) {
      const dumpTime = elapsed - 1.40;
      unloadCascadeParticles.forEach(pt => {
        if (dumpTime >= pt.delay) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vy += 0.22;
          pt.rot += pt.rotSpeed;

          uCtx.save();
          uCtx.translate(pt.x, pt.y);
          uCtx.rotate(pt.rot);

          uCtx.fillStyle = pt.color;
          uCtx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          uCtx.shadowBlur = 4;
          uCtx.shadowOffsetY = 2;

          if (pt.type === 'bottle') {
            uCtx.fillRect(-pt.size * 0.35, -pt.size * 0.8, pt.size * 0.7, pt.size * 1.6);
            uCtx.fillStyle = '#ffffff';
            uCtx.fillRect(-pt.size * 0.2, -pt.size * 1.05, pt.size * 0.4, pt.size * 0.3);
          } else if (pt.type === 'can') {
            uCtx.beginPath();
            uCtx.ellipse(0, 0, pt.size * 0.45, pt.size * 0.75, 0, 0, Math.PI * 2);
            uCtx.fill();
            uCtx.strokeStyle = '#dfe6e9';
            uCtx.lineWidth = 1.5;
            uCtx.stroke();
          } else if (pt.type === 'box') {
            uCtx.fillRect(-pt.size * 0.6, -pt.size * 0.5, pt.size * 1.2, pt.size);
            uCtx.strokeStyle = '#d35400';
            uCtx.lineWidth = 2;
            uCtx.beginPath();
            uCtx.moveTo(0, -pt.size * 0.5);
            uCtx.lineTo(0, pt.size * 0.5);
            uCtx.stroke();
          } else {
            uCtx.beginPath();
            uCtx.arc(0, 0, pt.size * 0.5, 0, Math.PI * 2);
            uCtx.fill();
          }
          uCtx.restore();
        }
      });

      // Holographic Neon-Green Scanning Laser Beam across intake pit
      const laserY = 250 + Math.sin(elapsed * 9) * 45;
      const laserGrad = uCtx.createLinearGradient(0, laserY - 8, 0, laserY + 8);
      laserGrad.addColorStop(0, 'rgba(46, 204, 113, 0)');
      laserGrad.addColorStop(0.5, 'rgba(46, 204, 113, 0.85)');
      laserGrad.addColorStop(1, 'rgba(46, 204, 113, 0)');
      uCtx.fillStyle = laserGrad;
      uCtx.fillRect(180, laserY - 8, 280, 16);

      uCtx.strokeStyle = '#2ecc71';
      uCtx.lineWidth = 2;
      uCtx.beginPath();
      uCtx.moveTo(180, laserY);
      uCtx.lineTo(460, laserY);
      uCtx.stroke();
    }

    // Phase 5 Center Verification Badge
    if (elapsed >= 3.35) {
      uCtx.save();
      uCtx.translate(W / 2, H / 2 - 15);
      uCtx.fillStyle = 'rgba(16, 42, 28, 0.90)';
      uCtx.strokeStyle = '#2ecc71';
      uCtx.lineWidth = 3;
      uCtx.beginPath();
      uCtx.roundRect(-165, -45, 330, 90, 16);
      uCtx.fill();
      uCtx.stroke();

      uCtx.fillStyle = '#2ecc71';
      uCtx.font = '900 24px Rubik, Outfit, sans-serif';
      uCtx.textAlign = 'center';
      uCtx.fillText('ВТОРСЫРЬЕ ПРИНЯТО ♻️', 0, -5);

      uCtx.fillStyle = '#ffffff';
      uCtx.font = '700 13px Outfit, sans-serif';
      uCtx.fillText(`100% ПЕРЕРАБОТАНО • СЭКОНОМЛЕНО CO₂ ~${(totalKg * 0.082).toFixed(1)} КГ`, 0, 22);
      uCtx.restore();
    }

    uCtx.restore();

    // Vignette shadow at edges
    const grad = uCtx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, H * 0.85);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.52)');
    uCtx.fillStyle = grad;
    uCtx.fillRect(0, 0, W, H);

    // Green Eco-Telemetry Reticle & Corners
    uCtx.strokeStyle = 'rgba(46, 204, 113, 0.75)';
    uCtx.lineWidth = 2;
    const cornerSize = 16;
    const m = 18;

    uCtx.beginPath();
    uCtx.moveTo(m, m + cornerSize);
    uCtx.lineTo(m, m);
    uCtx.lineTo(m + cornerSize, m);
    uCtx.stroke();

    uCtx.beginPath();
    uCtx.moveTo(W - m - cornerSize, m);
    uCtx.lineTo(W - m, m);
    uCtx.lineTo(W - m, m + cornerSize);
    uCtx.stroke();

    uCtx.beginPath();
    uCtx.moveTo(m, H - m - cornerSize);
    uCtx.lineTo(m, H - m);
    uCtx.lineTo(m + cornerSize, H - m);
    uCtx.stroke();

    uCtx.beginPath();
    uCtx.moveTo(W - m - cornerSize, H - m);
    uCtx.lineTo(W - m, H - m);
    uCtx.lineTo(W - m, H - m - cornerSize);
    uCtx.stroke();

    // Center Crosshair
    uCtx.strokeStyle = 'rgba(46, 204, 113, 0.4)';
    uCtx.lineWidth = 1;
    uCtx.beginPath();
    uCtx.moveTo(W / 2 - 12, H / 2);
    uCtx.lineTo(W / 2 + 12, H / 2);
    uCtx.moveTo(W / 2, H / 2 - 12);
    uCtx.lineTo(W / 2 + 12, H / 2);
    uCtx.stroke();

    // Live Telemetry Stamp
    uCtx.fillStyle = '#2ecc71';
    uCtx.font = 'bold 11px Outfit, monospace';
    uCtx.textAlign = 'right';
    const timeMs = Math.floor((elapsed % 1) * 100);
    const timeSec = Math.floor(elapsed);
    uCtx.fillText(`TC: 00:0${timeSec}:${String(timeMs).padStart(2, '0')} FPS: 60`, W - 24, 28);

    if (elapsed >= totalDuration) {
      finishFactoryUnloadCutscene();
      return;
    }

    requestAnimationFrame(renderUnloadCutscene);
  }

  // --- Internal Compactor Blade Cycle ---
  function startCompactorCycle3D() {
    truckPhys.isCompacting = true;
    truckPhys.compactorProgress = 0;
    window.soundManager.playCompactor();
    const interval = setInterval(() => {
      truckPhys.compactorProgress += 0.05;
      compactorBlade.position.z = 1.8 - Math.sin(truckPhys.compactorProgress * Math.PI) * 0.85;
      if (truckPhys.compactorProgress >= 1) {
        truckPhys.compactorProgress = 0;
        compactorBlade.position.z = 1.8;
        truckPhys.isCompacting = false;
        clearInterval(interval);
      }
    }, 45);
  }

  // --- Detailed 3D Trash Mesh Spawner (Bottles, Cans, Paper, Boxes) ---
  const trashParticles3D = [];
  function spawnDetailed3DTrash() {
    const trashGeoms = [
      new THREE.CylinderGeometry(0.08, 0.08, 0.35, 8), // Plastic Soda Bottle
      new THREE.BoxGeometry(0.28, 0.22, 0.2),          // Cardboard Box
      new THREE.CylinderGeometry(0.07, 0.07, 0.22, 8), // Aluminum Can
      new THREE.DodecahedronGeometry(0.12, 0)          // Crushed Paper
    ];
    const trashColors = [0x2ecc71, 0x3498db, 0xf1c40f, 0xe67e22, 0xecf0f1, 0x95a5a6];

    for (let i = 0; i < 32; i++) {
      const g = trashGeoms[Math.floor(Math.random() * trashGeoms.length)];
      const m = new THREE.MeshStandardMaterial({
        color: trashColors[Math.floor(Math.random() * trashColors.length)],
        roughness: 0.35
      });
      const p = new THREE.Mesh(g, m);

      // Spawn directly above the roof hopper
      p.position.set(
        truckPhys.x + (Math.random() - 0.5) * 0.6,
        3.4,
        truckPhys.z + (Math.random() - 0.5) * 0.6
      );
      scene.add(p);

      trashParticles3D.push({
        mesh: p,
        vx: (Math.random() - 0.5) * 0.04,
        vy: -0.07 - Math.random() * 0.06,
        vz: (Math.random() - 0.5) * 0.04,
        rx: Math.random() * 0.15,
        ry: Math.random() * 0.15,
        life: 1.0
      });
    }
  }

  function update3DParticles() {
    for (let i = trashParticles3D.length - 1; i >= 0; i--) {
      const p = trashParticles3D[i];
      p.mesh.position.x += p.vx;
      p.mesh.position.y += p.vy;
      p.mesh.position.z += p.vz;
      p.mesh.rotation.x += p.rx;
      p.mesh.rotation.y += p.ry;
      p.life -= 0.032;

      // Disappear when deep inside hopper
      if (p.life <= 0 || p.mesh.position.y < 1.35) {
        scene.remove(p.mesh);
        trashParticles3D.splice(i, 1);
      }
    }
  }

  // --- Factory Tailgate Unload ---
  function updateFactoryUnload3D() {
    if (!truckPhys.isDumpingAtFactory || unloadCutsceneActive) return;

    truckPhys.dumpProgress += 0.015;
    if (truckPhys.dumpProgress < 0.5) {
      truckPhys.tailgateAngle = truckPhys.dumpProgress * 2;
    } else {
      truckPhys.tailgateAngle = (1 - truckPhys.dumpProgress) * 2;
    }

    tailgateGroup.rotation.x = truckPhys.tailgateAngle * 1.3;

    if (Math.abs(truckPhys.dumpProgress - 0.4) < 0.035) {
      spawnDetailed3DTrash();
      spawnDetailed3DTrash();
    }

    if (truckPhys.dumpProgress >= 1) {
      truckPhys.isDumpingAtFactory = false;
      truckPhys.dumpProgress = 0;
      truckPhys.currentBinsInCargo = 0;
      tailgateGroup.rotation.x = 0;
      showVictory();
    }
  }

  // --- Proximity & Interactive Prompts ---
  function updateInteractions3D() {
    if (isEvacuating) {
      hidePrompt();
      return;
    }
    if (cutsceneActive || unloadCutsceneActive || truckPhys.isDumpingAtFactory || truckPhys.isQuickDumping) {
      hidePrompt();
      armIndicator.classList.add('busy');
      armStatusText.textContent = unloadCutsceneActive
        ? 'ВЫГРУЗКА НА ЗАВОДЕ...'
        : truckPhys.isQuickDumping
          ? 'ПРОМЕЖУТОЧНЫЙ СБРОС КУЗОВА...'
          : 'МАНИПУЛЯТОР РАБОТАЕТ...';
      if (btnGrabAction) {
        btnGrabAction.classList.remove('ready-grab', 'ready-unload');
        btnGrabAction.classList.add('busy');
        if (grabBtnText) grabBtnText.textContent = 'ПРОПУСТИТЬ';
        if (grabBtnIcon) grabBtnIcon.textContent = '⏩';
      }
      return;
    }

    armIndicator.classList.remove('busy');
    armStatusText.textContent = 'МАНИПУЛЯТОР ГОТОВ';

    // 1. Factory unload dock: a full-shift delivery OR a mid-route pit-stop
    //    dump. Both require the truck to actually be inside the bay; the
    //    difference is only what happens after the player confirms.
    if ((gameState.status === 'collecting' || gameState.status === 'delivering') && recyclingPlant3D) {
      const bay = recyclingPlant3D.unloadBay;
      const d = Math.hypot(truckPhys.x - bay.x, truckPhys.z - bay.z);
      if (d < 16) {
        const shiftComplete = gameState.collectedBinsTotal >= gameState.totalBins;
        const hasCargo = truckPhys.currentBinsInCargo > 0;
        if (shiftComplete || hasCargo) {
          gameState.activePromptType = 'unload';
          if (shiftComplete) {
            showPrompt('ЗОНА РАЗГРУЗКИ ЗАВОДА!', 'Нажмите ПРОБЕЛ, чтобы сдать мусор на переработку ♻️', 'ВЫГРУЗИТЬ');
          } else {
            showPrompt('ПРОМЕЖУТОЧНЫЙ СБРОС КУЗОВА',
              `Нажмите ПРОБЕЛ, чтобы разгрузить ${truckPhys.currentBinsInCargo} бак(ов) и продолжить рейс 🚛`,
              'РАЗГРУЗИТЬ');
          }
          if (btnGrabAction) {
            btnGrabAction.classList.add('ready-unload');
            btnGrabAction.classList.remove('ready-grab', 'busy');
            if (grabBtnText) grabBtnText.textContent = shiftComplete ? 'ВЫГРУЗИТЬ' : 'РАЗГРУЗИТЬ';
            if (grabBtnIcon) grabBtnIcon.textContent = shiftComplete ? '♻️' : '📦';
          }
          return;
        }
      }
    }

    // 2. Check Trash Bins (Right side proximity)
    const armWorldX = truckPhys.x + Math.cos(truckPhys.angle) * 2.3;
    const armWorldZ = truckPhys.z - Math.sin(truckPhys.angle) * 2.3;

    let nearest = null;
    let minDist = 7.2;

    for (const bin of trashBins3D) {
      if (bin.collected) continue;
      const dist = Math.hypot(armWorldX - bin.x, armWorldZ - bin.z);
      if (dist < minDist) {
        minDist = dist;
        nearest = bin;
      }
    }

    if (nearest) {
      gameState.activePromptType = 'grab';
      gameState.targetBin = nearest;
      showPrompt('КОНТЕЙНЕР РЯДОМ!', `Нажмите ПРОБЕЛ для захвата (${nearest.label})`, 'ЗАБРАТЬ');
      if (btnGrabAction) {
        btnGrabAction.classList.add('ready-grab');
        btnGrabAction.classList.remove('ready-unload', 'busy');
        if (grabBtnText) grabBtnText.textContent = 'ЗАБРАТЬ';
        if (grabBtnIcon) grabBtnIcon.textContent = '🦾';
      }
    } else {
      gameState.activePromptType = null;
      gameState.targetBin = null;
      hidePrompt();
      if (btnGrabAction) {
        btnGrabAction.classList.remove('ready-grab', 'ready-unload', 'busy');
        if (grabBtnText) grabBtnText.textContent = 'ЗАХВАТ';
        if (grabBtnIcon) grabBtnIcon.textContent = '🦾';
      }
    }
  }

  function triggerCurrentAction() {
    if (isEvacuating) return; // controls locked during battery evacuation
    if (cutsceneActive) {
      if (performance.now() - cutsceneStartTime > 250) {
        finishPickupCutscene();
      }
      return;
    }
    if (unloadCutsceneActive) {
      if (performance.now() - unloadCutsceneStartTime > 250) {
        finishFactoryUnloadCutscene();
      }
      return;
    }

    if (gameState.activePromptType === 'grab' && gameState.targetBin) {
      startPickupCutscene(gameState.targetBin);
      hidePrompt();
    } else if (gameState.activePromptType === 'unload' && !unloadCutsceneActive && !truckPhys.isQuickDumping) {
      beginFactoryUnload();
      hidePrompt();
    }
  }

  function showPrompt(title, desc, btnText) {
    promptTitle.textContent = title;
    promptDesc.innerHTML = desc.replace('ПРОБЕЛ', '<kbd>ПРОБЕЛ</kbd>');
    promptActionBtn.textContent = btnText;
    actionPrompt.classList.add('active');
  }

  function hidePrompt() {
    actionPrompt.classList.remove('active');
  }

  function checkMissions() {
    if (gameState.collectedBinsTotal >= gameState.totalBins && gameState.status === 'collecting') {
      gameState.status = 'delivering';
      updateTaskHUD();
      window.soundManager.playVictory();
    }
  }

  function showVictory() {
    // Guard against double-invocation (would duplicate the history entry).
    if (gameState.routeRecorded) return;
    gameState.routeRecorded = true;
    gameState.status = 'completed';
    gameState.endTime = Date.now();
    const rawDurationSec = (gameState.endTime - gameState.startTime) / 1000;
    // Traffic accidents add a time penalty on top of the actual drive time.
    const durationSec = Math.floor(rawDurationSec + gameState.timePenalty / 1000);
    const mins = String(Math.floor(durationSec / 60)).padStart(2, '0');
    const secs = String(durationSec % 60).padStart(2, '0');

    // --- Detailed recyclables breakdown delivered to the plant ---
    const breakdown = gameState.currentCargo.breakdown;
    const plasticKg = breakdown.plastic || 0;
    const paperKg = breakdown.paper || 0;
    const glassKg = breakdown.glass || 0;
    const totalKg = plasticKg + paperKg + glassKg || gameState.totalKg;

    // Count of containers per category (120 kg each)
    const binsFromKg = (kg) => Math.round(kg / 120);

    resBinsCount.textContent = `${gameState.collectedBinsTotal}`;
    resWeight.textContent = `${totalKg} кг`;
    resTime.textContent = `${mins}:${secs}`;
    resEcoCO2.textContent = `~${(totalKg * 0.082).toFixed(1)} кг`;

    if (resYellowBins) resYellowBins.textContent = `${binsFromKg(plasticKg)} баков (${plasticKg} кг)`;
    if (resBlueBins) resBlueBins.textContent = `${binsFromKg(paperKg)} баков (${paperKg} кг)`;
    if (resGreenBins) resGreenBins.textContent = `${binsFromKg(glassKg)} баков (${glassKg} кг)`;

    // --- Persist the route into the local history log & best-time record ---
    const result = recordRouteCompletion(durationSec, {
      plastic: plasticKg,
      paper: paperKg,
      glass: glassKg
    }, gameState.mapId || activeMapId);
    const stats = result.stats;
    const mapBest = stats.bestTimeByMap[gameState.mapId || activeMapId];
    if (recBestTime) recBestTime.textContent = formatDuration(mapBest);
    if (recTotalKg) recTotalKg.textContent = `${stats.totalRecycledKg} кг`;
    if (recRoutes) recRoutes.textContent = `${stats.routesCompleted}`;
    if (newRecordPill) newRecordPill.style.display = result.isNewRecord ? 'inline-block' : 'none';
    updateBestTimeHUD();

    window.soundManager.playVictory();
    victoryModal.classList.add('show');
    updateTaskHUD();
  }

  // Nearest bin that still needs collecting — the same target the GPS arrow
  // points at, used both by the direction arrow and the objective label.
  function getNearestUncollectedBin() {
    let closest = null;
    let minD = Infinity;
    for (const bin of trashBins3D) {
      if (bin.collected) continue;
      const d = Math.hypot(truckPhys.x - bin.x, truckPhys.z - bin.z);
      if (d < minD) {
        minD = d;
        closest = bin;
      }
    }
    return closest;
  }

  // Short navigation labels for the current objective (matches map markers).
  const NAV_BIN_LABELS = {
    plastic: 'Пластик 🟡',
    paper: 'Бумага 🔵',
    glass: 'Стекло 🟢'
  };

  // --- Right-hand panel: shift progress vs. live hopper load ---
  // Row 1 tracks the whole shift (collectedBinsTotal / totalBins) and keeps its
  // value across pit-stop dumps. Row 2 tracks only the physical hopper load
  // (currentBinsInCargo), so both bars behave independently.
  function updateStatsHUD() {
    const shiftPercent = Math.min(100, Math.round((gameState.collectedBinsTotal / (gameState.totalBins || 1)) * 100));
    shiftProgressVal.textContent = `${gameState.collectedBinsTotal} / ${gameState.totalBins}`;
    shiftProgressBar.style.width = `${shiftPercent}%`;

    const cargoPercent = Math.min(100, Math.round((truckPhys.currentBinsInCargo / truckPhys.maxBins) * 100));
    cargoFillVal.textContent = `${truckPhys.currentBinsInCargo} (${truckPhys.currentCargoWeight} кг)`;
    capacityBar.style.width = `${cargoPercent}%`;

    if (ecoScore) {
      ecoScore.textContent = `${gameState.totalKg} кг / ${truckPhys.maxCargoWeight} кг`;
    }
  }

  // --- Centre objective: WHERE to drive next (no load counters here). ---
  function updateTaskHUD() {
    let icon = '🗑️';
    let text = 'Следуйте по маршруту';

    if (gameState.status === 'collecting') {
      const target = getNearestUncollectedBin();
      if (target) {
        icon = '♻️';
        const label = NAV_BIN_LABELS[target.type] || 'Сырье ♻️';
        text = `Следуйте к контейнеру: ${label} [Собрано: ${gameState.collectedBinsTotal}/${gameState.totalBins}, В кузове: ${truckPhys.currentBinsInCargo}]`;
      } else {
        icon = '🏭';
        text = 'Маршрут завершен. Доставьте вторсырье на Завод ♻️';
      }
    } else if (gameState.status === 'delivering') {
      icon = '🏭';
      text = 'Маршрут завершен. Доставьте вторсырье на Завод ♻️';
    } else if (gameState.status === 'unloading') {
      icon = '⚡';
      text = 'Разгрузка шлюза #1 • Очистка кузова';
    } else if (gameState.status === 'completed' || gameState.status === 'free_drive') {
      icon = '✨';
      text = 'Рейс завершен! Свободная езда по 3D городу.';
    }

    // Critical-charge navigation marker: prepend the low-battery tag to the
    // live objective while collecting (drives the player toward the plant).
    if (gameState.status === 'collecting' && truckPhys.batteryLevel <= 15) {
      text = `⚡ [НИЗКИЙ ЗАРЯД] ${text}`;
    }

    // Guard the DOM writes: updateTaskHUD now runs every frame from
    // updateDashboard (the objective follows the moving GPS target).
    if (taskIcon.textContent !== icon) taskIcon.textContent = icon;
    if (taskText.textContent !== text) taskText.textContent = text;
  }

  function updateDashboard() {
    // Speedometer scaled to realistic km/h
    const kmh = Math.round(Math.abs(truckPhys.speed) * 82);
    speedValue.textContent = `${kmh}`;
    if (Math.abs(truckPhys.speed) < 0.015) {
      gearTag.textContent = 'P';
    } else if (truckPhys.speed > 0) {
      gearTag.textContent = 'D';
    } else {
      gearTag.textContent = 'R';
    }

    // --- EV Instrument Cluster Update (Task 2) ---
    const bat = truckPhys.batteryLevel;
    const pf = truckPhys.powerFlow;
    const cargoKg = truckPhys.currentCargoWeight;

    if (batteryVal) batteryVal.textContent = `${Math.round(bat)}%`;
    if (batteryBar) batteryBar.style.width = `${Math.max(0, Math.min(100, bat))}%`;
    if (batteryBar) {
      // Color: green > 40%, amber 20-40%, red < 20%
      batteryBar.style.background = bat > 40
        ? 'linear-gradient(90deg, #2ecc71, #27ae60)'
        : bat > 20
          ? 'linear-gradient(90deg, #f39c12, #e67e22)'
          : 'linear-gradient(90deg, #e74c3c, #c0392b)';
    }
    if (batteryIcon) {
      batteryIcon.textContent = bat > 80 ? '🔋' : bat > 40 ? '🔋' : bat > 20 ? '🪫' : '⚡';
    }

    // Critical-charge pulse: red, blinking readout + icon at ≤15%.
    const isCritical = bat <= 15;
    if (batteryVal) batteryVal.classList.toggle('battery-critical-pulse', isCritical);
    if (batteryIcon) batteryIcon.classList.toggle('battery-critical-pulse', isCritical);

    // Live "charging in progress" readout while parked on the factory pad.
    if (chargingStatus) chargingStatus.classList.toggle('show', truckPhys.isCharging);

    if (powerFlowVal) {
      const pfSign = pf < 0 ? '' : '+';
      powerFlowVal.textContent = `${pfSign}${pf} kW`;
      powerFlowVal.style.color = pf < -10 ? '#2ecc71' : pf > 0 ? '#e74c3c' : '#95a5a6';
    }
    if (powerBarFill) {
      // Normalize: discharge 0..185 → right, regen -150..0 → left (displayed as 0..100%)
      const pct = pf >= 0
        ? Math.min(100, (pf / 185) * 100)
        : Math.min(100, (Math.abs(pf) / 150) * 100);
      powerBarFill.style.width = `${pct}%`;
      powerBarFill.style.background = pf < -10
        ? 'linear-gradient(90deg, #1abc9c, #2ecc71)'
        : 'linear-gradient(90deg, #e74c3c, #f39c12)';
    }

    if (cargoMassVal) {
      cargoMassVal.textContent = `${Math.round(cargoKg)} кг`;
    }

    // Direction arrow
    let targetX = 0;
    let targetZ = 0;

    if (gameState.status === 'delivering' && recyclingPlant3D) {
      targetX = recyclingPlant3D.unloadBay.x;
      targetZ = recyclingPlant3D.unloadBay.z;
    } else {
      const closest = getNearestUncollectedBin();
      if (closest) {
        targetX = closest.x;
        targetZ = closest.z;
      }
    }

    if (targetX !== 0) {
      const angleToTarget = Math.atan2(targetX - truckPhys.x, targetZ - truckPhys.z);
      const diff = angleToTarget - truckPhys.angle;
      gpsArrow.style.transform = `rotate(${-diff}rad)`;
      const distM = Math.round(Math.hypot(targetX - truckPhys.x, targetZ - truckPhys.z));
      gpsDistance.textContent = `${distM}м`;
    } else {
      gpsDistance.textContent = '—';
    }

    // Objective text tracks the live target, so refresh it every frame.
    updateTaskHUD();
  }

  // --- Dynamic 3D Camera Follow ---
  function updateCamera() {
    // --- Interior visibility rules ---
    // Hide the tinted windshield for both the hood and cockpit views so it never
    // obstructs or darkens the driver's sightline. A-pillars, dashboard and the
    // steering wheel intentionally stay visible from inside the cab.
    windMesh.visible = (cameraMode !== 2 && cameraMode !== 3);

    // The minifig head/helmet would sit inside the cockpit camera frustum —
    // hide them there, keep them in every external view.
    const cockpitView = (cameraMode === 3);
    driverHead.visible = !cockpitView;
    driverHelmet.visible = !cockpitView;

    // Tighten the near plane in the cockpit so the dashboard / wheel never clip.
    const desiredNear = cockpitView ? 0.08 : 0.4;
    if (camera.near !== desiredNear) {
      camera.near = desiredNear;
      camera.updateProjectionMatrix();
    }

    // Truck heading basis (forward = (sin, cos), right = (cos, -sin)).
    const cosA = Math.cos(truckPhys.angle);
    const sinA = Math.sin(truckPhys.angle);

    // Steering wheel turns proportionally to the front-wheel angle (spins about
    // its own axis; the -45° X tilt stays intact via Euler XYZ ordering).
    steerWheel.rotation.z = -truckPhys.steerAngle * 2.5;

    if (cameraMode === 0) {
      // Dynamic 3/4 Quarter Chase Perspective (Heroic isometric view showing cab, side arm, studs, and street ahead)
      const distBehind = 13.8 + Math.abs(truckPhys.speed) * 3.2;
      const heightAbove = 6.2 + Math.abs(truckPhys.speed) * 1.2;

      // 14-degree side quarter angle (reveals the side of the truck) + dynamic steering swing
      const quarterAngle = 0.24;
      const turnSwing = truckPhys.steerAngle * 0.8;
      const camAngle = truckPhys.angle - quarterAngle + turnSwing;

      const targetX = truckPhys.x - Math.sin(camAngle) * distBehind;
      const targetZ = truckPhys.z - Math.cos(camAngle) * distBehind;
      const targetY = heightAbove;

      camera.position.x += (targetX - camera.position.x) * 0.095;
      camera.position.y += (targetY - camera.position.y) * 0.095;
      camera.position.z += (targetZ - camera.position.z) * 0.095;

      const lookTarget = new THREE.Vector3(
        truckPhys.x + Math.sin(truckPhys.angle) * 3.8,
        1.75,
        truckPhys.z + Math.cos(truckPhys.angle) * 3.8
      );
      camera.lookAt(lookTarget);

    } else if (cameraMode === 1) {
      // Birds-Eye Isometric City View (Classic SimCity 45-degree angle)
      const distBehindTop = 20.0 + Math.abs(truckPhys.speed) * 4;
      const heightAboveTop = 16.0;
      const sideOffsetTop = 14.0;

      const targetX = truckPhys.x - Math.sin(truckPhys.angle) * distBehindTop - Math.cos(truckPhys.angle) * sideOffsetTop;
      const targetZ = truckPhys.z - Math.cos(truckPhys.angle) * distBehindTop + Math.sin(truckPhys.angle) * sideOffsetTop;
      const targetY = heightAboveTop;

      camera.position.x += (targetX - camera.position.x) * 0.085;
      camera.position.y += (targetY - camera.position.y) * 0.085;
      camera.position.z += (targetZ - camera.position.z) * 0.085;

      const lookTarget = new THREE.Vector3(
        truckPhys.x + Math.sin(truckPhys.angle) * 4.0,
        1.0,
        truckPhys.z + Math.cos(truckPhys.angle) * 4.0
      );
      camera.lookAt(lookTarget);

    } else if (cameraMode === 2) {
      // Driver / Front Hood View (Bright daylight, placed in front of tinted glass)
      const hoodDist = 4.25;
      const hoodHeight = 2.05;

      const targetX = truckPhys.x + Math.sin(truckPhys.angle) * hoodDist;
      const targetZ = truckPhys.z + Math.cos(truckPhys.angle) * hoodDist;

      camera.position.x = targetX;
      camera.position.y = hoodHeight;
      camera.position.z = targetZ;

      const lookTarget = new THREE.Vector3(
        targetX + Math.sin(truckPhys.angle) * 35.0,
        1.7,
        targetZ + Math.cos(truckPhys.angle) * 35.0
      );
      camera.lookAt(lookTarget);

    } else if (cameraMode === 3) {
      // --- Cockpit / First-Person: driver's eye on the LEFT seat ---
      // Left-hand drive: the truck faces +Z, so the left side is local +X.
      // Local cab offset: ~0.45 m left of centre, driver eye height (~2.2 m
      // above ground), mid-cab longitudinally (behind the windshield).
      const EYE_X = 0.45;    // left of centre (local X, +X = truck's left)
      const EYE_Y = 2.20;    // eye height above ground (world Y)
      const EYE_Z = 2.70;    // inside the cab, just behind the windshield

      // Micro suspension: lean into corners with body roll, dip on braking.
      const rollLean = truckPhys.roll * 0.35;
      const dipLean = truckPhys.pitch * 0.4;

      // Head position in world space (truck yaw only), with a lateral seat sway
      // from roll and a vertical dip from pitch.
      const eyeWorldX = truckPhys.x + (EYE_X + rollLean) * cosA + EYE_Z * sinA;
      const eyeWorldY = EYE_Y + dipLean * 0.5;
      const eyeWorldZ = truckPhys.z - (EYE_X + rollLean) * sinA + EYE_Z * cosA;

      camera.position.set(eyeWorldX, eyeWorldY, eyeWorldZ);

      // Look forward down the truck's heading, pitched slightly toward the road.
      const lookAhead = 30.0;
      const lookHeight = eyeWorldY - 3.2 - dipLean * 2.0;
      const lookTarget = new THREE.Vector3(
        truckPhys.x + Math.sin(truckPhys.angle) * lookAhead,
        lookHeight,
        truckPhys.z + Math.cos(truckPhys.angle) * lookAhead
      );
      camera.lookAt(lookTarget);

      // Bank the horizon into the turn for extra suspension feel.
      camera.rotateZ(-rollLean * 0.5);
    }

    // Keep sunlight shadow coverage tightly anchored to vehicle
    if (activeTimeOfDay === 'night') {
      sunLight.position.set(truckPhys.x + 25, 70, truckPhys.z + 35);
    } else {
      sunLight.position.set(truckPhys.x + 45, 95, truckPhys.z + 45);
    }
    sunLight.target = truckMesh;
  }

  // --- 2D Minimap Radar ---
  function drawMinimap() {
    const mw = minimapCanvas.width;
    const mh = minimapCanvas.height;
    mCtx.clearRect(0, 0, mw, mh);

    mCtx.fillStyle = '#1e272e';
    mCtx.fillRect(0, 0, mw, mh);

    const halfW = mw / 2;
    const halfH = mh / 2;
    const map = getActiveMap();
    // Fit radar to the paved play area (+ margin), not the full grass plane —
    // otherwise the industrial map's 600-world shrinks the grid into a tiny core.
    const viewHalf = ROAD_EDGE + 24;
    const scale = halfW / viewHalf;
    const toMX = (wx) => (wx / viewHalf) * halfW + halfW;
    const toMY = (wz) => (wz / viewHalf) * halfH + halfH;

    const roadMin = toMX(-ROAD_EDGE);
    const roadSpan = toMX(ROAD_EDGE) - roadMin;

    // Theme-coloured block pads (under the road lattice).
    for (let i = 0; i < gridCoords.length - 1; i++) {
      for (let j = 0; j < gridCoords.length - 1; j++) {
        if (isSpecialBlock(map, i, j, 'factory')) continue;
        const x1 = gridCoords[i] + ROAD_W / 2;
        const z1 = gridCoords[j] + ROAD_W / 2;
        const x2 = gridCoords[i + 1] - ROAD_W / 2;
        const z2 = gridCoords[j + 1] - ROAD_W / 2;
        const px = toMX(x1);
        const py = toMY(z1);
        const pw = toMX(x2) - px;
        const ph = toMY(z2) - py;

        if (map.theme === 'suburb') {
          mCtx.fillStyle = '#1a3d2a';
        } else if (map.theme === 'industrial') {
          mCtx.fillStyle = '#2a3038';
        } else if (isSpecialBlock(map, i, j, 'parks')) {
          mCtx.fillStyle = '#145a32';
        } else {
          mCtx.fillStyle = '#243040';
        }
        mCtx.fillRect(px, py, pw, ph);
      }
    }

    // Main grid roads (wider carriageways read thicker via ROAD_W * scale).
    mCtx.fillStyle = '#34495e';
    gridCoords.forEach(gz => {
      const y = toMY(gz);
      mCtx.fillRect(roadMin, y - (ROAD_W * scale) / 2, roadSpan, ROAD_W * scale);
    });
    gridCoords.forEach(gx => {
      const x = toMX(gx);
      mCtx.fillRect(x - (ROAD_W * scale) / 2, roadMin, ROAD_W * scale, roadSpan);
    });

    // Dacha alleys — internal cross roads inside each block (not the factory).
    if (map.theme === 'suburb') {
      const alleyW = map.alleyWidth || DACHA_ALLEY_W;
      const alleyPx = Math.max(1.5, alleyW * scale);
      mCtx.fillStyle = '#4a6780';
      for (let i = 0; i < gridCoords.length - 1; i++) {
        for (let j = 0; j < gridCoords.length - 1; j++) {
          if (isSpecialBlock(map, i, j, 'factory')) continue;
          const x1 = gridCoords[i] + ROAD_W / 2;
          const z1 = gridCoords[j] + ROAD_W / 2;
          const x2 = gridCoords[i + 1] - ROAD_W / 2;
          const z2 = gridCoords[j + 1] - ROAD_W / 2;
          const cx = (x1 + x2) / 2;
          const cz = (z1 + z2) / 2;
          const ax = toMX(cx);
          const az = toMY(cz);
          const left = toMX(x1);
          const right = toMX(x2);
          const top = toMY(z1);
          const bot = toMY(z2);
          mCtx.fillRect(ax - alleyPx / 2, top, alleyPx, bot - top);
          mCtx.fillRect(left, az - alleyPx / 2, right - left, alleyPx);
        }
      }

      // Pool yard — small blue disc so the landmark shows on radar.
      const pool = map.special && map.special.pool;
      if (pool && pool[0] < gridCoords.length - 1 && pool[1] < gridCoords.length - 1) {
        const pi = pool[0];
        const pj = pool[1];
        const px1 = gridCoords[pi] + ROAD_W / 2;
        const pz1 = gridCoords[pj] + ROAD_W / 2;
        const px2 = gridCoords[pi + 1] - ROAD_W / 2;
        const pz2 = gridCoords[pj + 1] - ROAD_W / 2;
        const bcx = (px1 + px2) / 2;
        const bcz = (pz1 + pz2) / 2;
        const poolX = bcx + (px2 - px1) * 0.22;
        const poolZ = bcz - (pz2 - pz1) * 0.22;
        mCtx.beginPath();
        mCtx.arc(toMX(poolX), toMY(poolZ), 4.5, 0, Math.PI * 2);
        mCtx.fillStyle = '#3498db';
        mCtx.fill();
        mCtx.strokeStyle = '#85c1e9';
        mCtx.lineWidth = 1;
        mCtx.stroke();
      }
    }

    // Industrial yard lanes — faint cross so big blocks don't read as empty voids.
    if (map.theme === 'industrial') {
      mCtx.strokeStyle = 'rgba(241, 196, 15, 0.35)';
      mCtx.lineWidth = Math.max(1, 1.1 * scale);
      for (let i = 0; i < gridCoords.length - 1; i++) {
        for (let j = 0; j < gridCoords.length - 1; j++) {
          if (isSpecialBlock(map, i, j, 'factory')) continue;
          const x1 = gridCoords[i] + ROAD_W / 2;
          const z1 = gridCoords[j] + ROAD_W / 2;
          const x2 = gridCoords[i + 1] - ROAD_W / 2;
          const z2 = gridCoords[j + 1] - ROAD_W / 2;
          const cx = (x1 + x2) / 2;
          const cz = (z1 + z2) / 2;
          mCtx.beginPath();
          mCtx.moveTo(toMX(cx), toMY(z1 + 4));
          mCtx.lineTo(toMX(cx), toMY(z2 - 4));
          mCtx.moveTo(toMX(x1 + 4), toMY(cz));
          mCtx.lineTo(toMX(x2 - 4), toMY(cz));
          mCtx.stroke();
        }
      }
    }

    // Downtown park — lighter lawn core on the green pad.
    if (map.theme === 'urban') {
      const parks = (map.special && map.special.parks) || [];
      parks.forEach(([pi, pj]) => {
        if (pi >= gridCoords.length - 1 || pj >= gridCoords.length - 1) return;
        const x1 = gridCoords[pi] + ROAD_W / 2;
        const z1 = gridCoords[pj] + ROAD_W / 2;
        const x2 = gridCoords[pi + 1] - ROAD_W / 2;
        const z2 = gridCoords[pj + 1] - ROAD_W / 2;
        const cx = (x1 + x2) / 2;
        const cz = (z1 + z2) / 2;
        const rw = (x2 - x1) * 0.55;
        const rd = (z2 - z1) * 0.55;
        mCtx.fillStyle = '#1e8449';
        mCtx.fillRect(toMX(cx - rw / 2), toMY(cz - rd / 2), rw * scale, rd * scale);
      });
    }

    // Factory yard (orange) + unload dock (green) — separate from the ⚡ pad.
    if (recyclingPlant3D) {
      mCtx.fillStyle = '#e67e22';
      const fx = toMX(recyclingPlant3D.x);
      const fz = toMY(recyclingPlant3D.z);
      const fHalf = Math.max(8, Math.min(16, (recyclingPlant3D.w || 40) * scale * 0.22));
      mCtx.fillRect(fx - fHalf, fz - fHalf, fHalf * 2, fHalf * 2);

      if (recyclingPlant3D.unloadBay) {
        const ub = recyclingPlant3D.unloadBay;
        const ux = toMX(ub.x);
        const uz = toMY(ub.z);
        const uw = Math.max(5, (ub.w || 14) * scale * 0.55);
        const ud = Math.max(4, (ub.d || 12) * scale * 0.55);
        mCtx.fillStyle = '#27ae60';
        mCtx.fillRect(ux - uw / 2, uz - ud / 2, uw, ud);
      }
    }

    // Charging Pad — bright cyan/green beacon with a ⚡ glyph so the player can
    // always find a top-up when the pack runs low.
    if (recyclingPlant3D && recyclingPlant3D.chargingBay) {
      const cb = recyclingPlant3D.chargingBay;
      const gx = toMX(cb.x);
      const gy = toMY(cb.z);
      const r = Math.max(5, cb.radius * scale);

      mCtx.save();
      mCtx.beginPath();
      mCtx.arc(gx, gy, r, 0, Math.PI * 2);
      mCtx.fillStyle = 'rgba(0, 210, 211, 0.28)';
      mCtx.fill();
      mCtx.lineWidth = 1.5;
      mCtx.strokeStyle = '#00d2d3';
      mCtx.stroke();

      mCtx.beginPath();
      mCtx.arc(gx, gy, r * 0.5, 0, Math.PI * 2);
      mCtx.fillStyle = '#2ecc71';
      mCtx.fill();

      mCtx.font = 'bold 10px Outfit, monospace';
      mCtx.textAlign = 'center';
      mCtx.textBaseline = 'middle';
      mCtx.fillStyle = '#0b0f14';
      mCtx.fillText('⚡', gx, gy + 0.5);
      mCtx.restore();
    }

    // Bins
    trashBins3D.forEach(b => {
      if (b.collected) return;
      const isTarget = (gameState.targetBin === b);
      mCtx.fillStyle = isTarget ? '#00d2d3' : '#2ecc71';
      const bx = toMX(b.x);
      const bz = toMY(b.z);
      mCtx.beginPath();
      mCtx.arc(bx, bz, isTarget ? 5.0 : 3.5, 0, Math.PI * 2);
      mCtx.fill();
      if (isTarget) {
        mCtx.strokeStyle = '#ffffff';
        mCtx.lineWidth = 1.5;
        mCtx.stroke();
      }
    });

    // Truck
    mCtx.save();
    const tx = toMX(truckPhys.x);
    const tz = toMY(truckPhys.z);
    mCtx.translate(tx, tz);
    mCtx.rotate(-truckPhys.angle);
    mCtx.fillStyle = '#00d2d3';
    mCtx.beginPath();
    mCtx.moveTo(0, 7);
    mCtx.lineTo(-4, -5);
    mCtx.lineTo(4, -5);
    mCtx.closePath();
    mCtx.fill();
    mCtx.restore();
  }

  function updateBinMarkers3D() {
    const time = performance.now() * 0.003;
    const isDelivering = gameState.status === 'delivering';
    const isCompleted = gameState.status === 'completed' || gameState.status === 'free_drive';

    for (let i = 0; i < trashBins3D.length; i++) {
      const bin = trashBins3D[i];
      if (!bin.marker) continue;

      if (bin.collected || isDelivering || isCompleted) {
        bin.marker.visible = false;
        continue;
      }

      bin.marker.visible = true;

      const dist = Math.hypot(truckPhys.x - bin.x, truckPhys.z - bin.z);
      const isTarget = (gameState.targetBin === bin);
      const isClose = isTarget || dist < 7.5;

      const speed = isClose ? 5.2 : 3.2;
      const amp = isClose ? 0.32 : 0.20;
      bin.marker.arrowGroup.position.y = 2.4 + Math.sin(time * speed + i * 0.9) * amp;
      bin.marker.arrowGroup.rotation.y += (isClose ? 0.05 : 0.03);

      const targetScale = isClose ? 1.25 : 1.0;
      bin.marker.arrowGroup.scale.set(targetScale, targetScale, targetScale);

      if (bin.marker.ring) {
        const ringPulse = 0.45 + Math.sin(time * speed + i) * 0.3;
        bin.marker.ring.material.opacity = isClose ? 0.85 : ringPulse;
        const ringScale = isClose ? (1.05 + Math.sin(time * 5) * 0.12) : 1.0;
        bin.marker.ring.scale.set(ringScale, ringScale, 1.0);
      }
    }

    if (recyclingPlant3D && recyclingPlant3D.beacon) {
      if (isDelivering && !isCompleted) {
        recyclingPlant3D.beacon.visible = true;
        recyclingPlant3D.beacon.arrowGroup.position.y = 6.2 + Math.sin(time * 4.0) * 0.45;
        recyclingPlant3D.beacon.arrowGroup.rotation.y += 0.035;
      } else {
        recyclingPlant3D.beacon.visible = false;
      }
    }
  }

  // --- Main Animation Loop ---
  let frameCount = 0;
  function loop() {
    updatePhysics();
    updateWipers();
    updateAmberBeacons();
    updateRoboticArm3D();
    updateFactoryUnload3D();
    updateQuickDump3D();
    update3DParticles();
    updateRainParticles();
    updateStarField();
    updateInteractions3D();
    updateBinMarkers3D();
    updateDashboard();
    updateCamera();

    // Gentle realistic cloud drift across the sky (single group transform)
    if (cloudsGroup) {
      cloudsGroup.position.x += 0.02;
      if (cloudsGroup.position.x > 320) cloudsGroup.position.x = -320;
    }

    renderer.render(scene, camera);
    if ((frameCount++ % 2) === 0) {
      drawMinimap();
    }

    requestAnimationFrame(loop);
  }

  // Boot into the map picker — the city is built only after the player picks a map.
  setPendingMapSelection(activeMapId);
  pendingWeather = loadWeatherPref();
  setPendingTimeOfDay(loadTimeOfDayPref());
  setPendingWeather(pendingWeather);
  refreshMapSelectRecords();
  updateBestTimeHUD();
  if (mapSelectModal) mapSelectModal.classList.add('show');
  requestAnimationFrame(loop);
})();
