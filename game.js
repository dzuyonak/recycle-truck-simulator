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

  // --- World Constants ---
  const WORLD_SIZE = 420;
  const ROAD_W = 16.5;
  const SIDEWALK_W = 3.4;
  const gridCoords = [-120, -40, 40, 120];
  // The drivable road grid is deliberately decoupled from WORLD_SIZE (420, the
  // grass plane). Roads are cut off right after the outermost intersections
  // (±120), so they span exactly ±ROAD_EDGE (±128) — the perimeter belt (with
  // its buildings and forest) starts straight past the kerb, with no leftover
  // asphalt strip behind it. Traffic and the truck share these same bounds.
  const ROAD_EDGE = 128;

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

  // Atmospheric Sky Dome with Zenith-to-Horizon Gradient
  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 16;
  skyCanvas.height = 256;
  const skyCtx = skyCanvas.getContext('2d');
  const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 256);
  skyGrad.addColorStop(0.0, '#1c75bc'); // Deep vibrant zenith
  skyGrad.addColorStop(0.45, '#4ba3e3'); // Sunny blue sky
  skyGrad.addColorStop(0.8, '#90cbfb'); // Soft azure
  skyGrad.addColorStop(1.0, '#d8e8f8'); // Horizon haze matching fog
  skyCtx.fillStyle = skyGrad;
  skyCtx.fillRect(0, 0, 16, 256);
  const skyTex = new THREE.CanvasTexture(skyCanvas);
  const skyDome = new THREE.Mesh(
    new THREE.SphereGeometry(650, 32, 16),
    new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, depthWrite: false })
  );
  scene.add(skyDome);

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

  btnRestartLevel.addEventListener('click', () => {
    victoryModal.classList.remove('show');
    initLevel();
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
      categories: { plastic: 0, paper: 0, glass: 0 },
      history: [] // [{ date, durationSec, breakdown: { plastic, paper, glass } }]
    };
  }

  function sanitizeHistoryEntry(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const breakdown = raw.breakdown || {};
    return {
      date: typeof raw.date === 'string' ? raw.date : new Date().toISOString(),
      durationSec: Number.isFinite(raw.durationSec) ? raw.durationSec : 0,
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
  // and the best-time record. Returns { isNewRecord } for the UI trophy pill.
  function recordRouteCompletion(durationSec, breakdown) {
    const stats = loadMetaStats();
    const safeBreakdown = {
      plastic: Number(breakdown && breakdown.plastic) || 0,
      paper: Number(breakdown && breakdown.paper) || 0,
      glass: Number(breakdown && breakdown.glass) || 0
    };
    const totalKg = safeBreakdown.plastic + safeBreakdown.paper + safeBreakdown.glass;

    stats.routesCompleted += 1;
    stats.totalRecycledKg += totalKg;
    stats.categories.plastic += safeBreakdown.plastic;
    stats.categories.paper += safeBreakdown.paper;
    stats.categories.glass += safeBreakdown.glass;

    const isNewRecord = stats.bestTimeSec === null || durationSec < stats.bestTimeSec;
    if (isNewRecord) stats.bestTimeSec = durationSec;

    stats.history.unshift({
      date: new Date().toISOString(),
      durationSec: durationSec,
      breakdown: safeBreakdown
    });
    if (stats.history.length > MAX_HISTORY_ENTRIES) {
      stats.history.length = MAX_HISTORY_ENTRIES;
    }

    saveMetaStats(stats);
    return { isNewRecord: isNewRecord, stats: stats };
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

  // Show the stored personal best route time in the persistent HUD badge.
  function updateBestTimeHUD() {
    const stats = loadMetaStats();
    if (bestTimeHud) bestTimeHud.textContent = formatDuration(stats.bestTimeSec);
    if (bestTimeBadge) bestTimeBadge.style.display = stats.bestTimeSec === null ? 'none' : 'flex';
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
      return `
        <div class="history-row">
          <div class="history-row-head">
            <span class="history-index">#${history.length - idx}</span>
            <span class="history-date">${formatHistoryDate(entry.date)}</span>
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

  // Wiper blades on windshield
  const wiperMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
  const wiperL = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.04), wiperMat);
  wiperL.position.set(-0.55, 1.05, 1.31);
  wiperL.rotation.z = -0.35;
  const wiperR = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.04), wiperMat);
  wiperR.position.set(0.55, 1.05, 1.31);
  wiperR.rotation.z = -0.35;
  cabGroup.add(wiperL, wiperR);

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
  function createMinifigure3D(x, z, rotY, shirtColor, pantsColor, hasCap) {
    const mini = new THREE.Group();
    mini.position.set(x, 0.35, z);
    mini.rotation.y = rotY;

    const matSkin = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3 });
    const matPants = new THREE.MeshStandardMaterial({ color: pantsColor || 0x2c3e50, roughness: 0.4 });
    const matShirt = new THREE.MeshStandardMaterial({ color: shirtColor || 0xe74c3c, roughness: 0.4 });
    const matHair = new THREE.MeshStandardMaterial({ color: 0x4a2c11, roughness: 0.5 });

    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.22), matPants);
    hips.position.y = 0.46;
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), matPants);
    legL.position.set(-0.11, 0.21, 0);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), matPants);
    legR.position.set(0.11, 0.21, 0);
    mini.add(hips, legL, legR);

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

    scene.add(mini);
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
    scene.add(fenceGroup);
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

    scene.add(bench);
    return bench;
  }

  function generate3DCity() {
    buildings3D.forEach(b => scene.remove(b));
    trashBins3D.forEach(b => {
      scene.remove(b.mesh);
      if (b.marker) scene.remove(b.marker);
    });
    if (recyclingPlant3D && recyclingPlant3D.beacon) {
      scene.remove(recyclingPlant3D.beacon);
    }
    buildings3D = [];
    trashBins3D = [];
    recyclingPlant3D = null;
    colliders.length = 0;

    // Ground Grass Plane
    const groundGeom = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE);
    groundGeom.rotateX(-Math.PI / 2);
    const ground = new THREE.Mesh(groundGeom, new THREE.MeshStandardMaterial({ color: 0x1f8441, roughness: 0.75 }));
    ground.receiveShadow = true;
    scene.add(ground);

    // Asphalt Roads — cut off right after the outermost intersections so the
    // perimeter sidewalks sit flush against the kerb (ROAD_EDGE = ±128).
    const ROAD_LEN = 2 * ROAD_EDGE;
    const matRoad = new THREE.MeshStandardMaterial({ color: 0x22262c, roughness: 0.65 });
    gridCoords.forEach(gz => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_LEN, ROAD_W), matRoad);
      road.rotateX(-Math.PI / 2);
      road.position.set(0, 0.02, gz);
      road.receiveShadow = true;
      road.matrixAutoUpdate = false;
      road.updateMatrix();
      scene.add(road);
    });
    gridCoords.forEach(gx => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_W, ROAD_LEN), matRoad);
      road.rotateX(-Math.PI / 2);
      road.position.set(gx, 0.025, 0);
      road.receiveShadow = true;
      road.matrixAutoUpdate = false;
      road.updateMatrix();
      scene.add(road);
    });

    const matZebra = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.4 });

    // Road Markings (Dashed Centerlines, White Shoulder Borders, Blue Bike Lanes, Stop Bars)
    // Only the three mid-block runs survive: the former outer stubs sat beyond
    // the ±120 intersections, i.e. on top of the perimeter belt, and the road
    // itself now stops at ±ROAD_EDGE (±128).
    const roadIntervals = [
      { start: -105, end: -55 },
      { start: -25, end: 25 },
      { start: 55, end: 105 }
    ];

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
          scene.add(dash);
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
        scene.add(sLine1, sLine2);

        const bikeLane = new THREE.Mesh(new THREE.PlaneGeometry(segLen, 1.85), getBikeLaneMaterial());
        bikeLane.rotateX(-Math.PI / 2);
        bikeLane.position.set(midX, 0.031, gz - ROAD_W / 2 + 1.45);
        bikeLane.matrixAutoUpdate = false;
        bikeLane.updateMatrix();
        scene.add(bikeLane);

        const bSep = new THREE.Mesh(new THREE.PlaneGeometry(segLen, 0.16), matZebra);
        bSep.rotateX(-Math.PI / 2);
        bSep.position.set(midX, 0.033, gz - ROAD_W / 2 + 2.4);
        bSep.matrixAutoUpdate = false;
        bSep.updateMatrix();
        scene.add(bSep);
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
          scene.add(dash);
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
        scene.add(sLine1, sLine2);

        const bikeLane = new THREE.Mesh(new THREE.PlaneGeometry(1.85, segLen), getBikeLaneMaterial());
        bikeLane.rotateX(-Math.PI / 2);
        bikeLane.position.set(gx - ROAD_W / 2 + 1.45, 0.031, midZ);
        bikeLane.matrixAutoUpdate = false;
        bikeLane.updateMatrix();
        scene.add(bikeLane);

        const bSep = new THREE.Mesh(new THREE.PlaneGeometry(0.16, segLen), matZebra);
        bSep.rotateX(-Math.PI / 2);
        bSep.position.set(gx - ROAD_W / 2 + 2.4, 0.033, midZ);
        bSep.matrixAutoUpdate = false;
        bSep.updateMatrix();
        scene.add(bSep);
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
        scene.add(mh);
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
      scene.add(sb);
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
      scene.add(zGroup);
    }

    // City Blocks
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

        if (i === 2 && j === 2) {
          createRecyclingPlant3D(centerX, centerZ, blockW, blockD);
          continue;
        }

        if (i === 1 && j === 1) {
          createCentralPark3D(centerX, centerZ, blockW, blockD);
          continue;
        }

        createResidentialBlock3D(centerX, centerZ, blockW, blockD, i, j);
      }
    }

    // Fill the empty ring outside the outermost roads (blocks can only span the
    // inner grid), so the skyline reads as one continuous city instead of
    // fading into an empty green field.
    createCityPerimeter(gridCoords, WORLD_SIZE);
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
  function createCityPerimeter(gridCoords, WORLD_SIZE) {
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

    // ========================================================================
    // 1. TERRACED ROWS — north (commercial), south (residential), east
    // ========================================================================
    const frontKeys = ['light', 'cool', 'warm'];
    for (let i = 0; i < 6; i++) {
      const along = -EDGE + 22 + i * 39;
      const roof = (i % 2) ? 'blue' : 'dark';

      // North belt
      townhouse(along, FRONT, 30, 18, frontKeys[i % 3], roof);
      backdropBlock(along, BACK, 34, 18, 12 + (i % 3) * 4, i % 2 === 0);

      // South belt
      townhouse(along, -FRONT, 30, 18, frontKeys[(i + 1) % 3], roof);
      backdropBlock(along, -BACK, 34, 18, 11 + (i % 3) * 4, i % 2 === 1);

      // East belt
      townhouse(FRONT, along, 18, 30, frontKeys[(i + 2) % 3], roof);
      backdropBlock(BACK, along, 18, 34, 12 + (i % 3) * 3, i % 2 === 0);
    }

    // ========================================================================
    // 2. WEST BELT — city forest / park continuation (no buildings)
    // ========================================================================
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

    // ========================================================================
    // 3. NE CORNER — recycling plant logistics yard (x > 120, z > 120)
    // ========================================================================
    warehouse(CORNER - 14, CORNER - 13, 30, 20, true);
    warehouse(CORNER + 15, CORNER + 13, 26, 20, false);
    cistern(CORNER + 15, CORNER - 12, 5.4, 12);
    cistern(CORNER - 12, CORNER + 16, 4.2, 9);
    containerYard(CORNER + 4, CORNER + 1, 3, 2);
    fenceRun(BELT_INNER + 4, CORNER - 27, BELT_OUTER - 2, CORNER - 27, 2.6);
    fenceRun(BELT_INNER + 4, CORNER - 27, BELT_INNER + 4, BELT_OUTER - 2, 2.6);

    // ========================================================================
    // 4. NW / SW / SE CORNERS — forest + terraces completing the ring
    // ========================================================================
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
      scene.add(inst);
      buildings3D.push(inst);
    });
  }

  // --- Detailed 3D Residential Block & Modular LEGO Villas ---
  function createResidentialBlock3D(cx, cz, w, d, bi, bj) {
    // Raised Granite Sidewalk Base
    const sidewalk = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.38, d),
      new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.55 })
    );
    sidewalk.position.set(cx, 0.19, cz);
    sidewalk.receiveShadow = true;
    scene.add(sidewalk);

    // Inner Garden Lawn
    const lawnW = w - SIDEWALK_W * 2;
    const lawnD = d - SIDEWALK_W * 2;
    const lawn = new THREE.Mesh(
      new THREE.BoxGeometry(lawnW, 0.44, lawnD),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.8 })
    );
    lawn.position.set(cx, 0.22, cz);
    lawn.receiveShadow = true;
    scene.add(lawn);

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

      scene.add(houseGroup);
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
    // Containers are no longer hard-wired to the block corners — they are
    // spawned procedurally from POTENTIAL_BIN_SPAWNS in initLevel().
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
    scene.add(fhGroup);
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
    scene.add(signGroup);
  }

  // --- Detailed 3D Storm Drain Grate along curb gutter ---
  function createStormDrain3D(x, z, horizontal) {
    const grate = new THREE.Mesh(
      new THREE.PlaneGeometry(horizontal ? 2.2 : 0.9, horizontal ? 0.9 : 2.2),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
    );
    grate.rotateX(-Math.PI / 2);
    grate.position.set(x, 0.03, z);
    scene.add(grate);
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

  const POTENTIAL_BIN_SPAWNS = (() => {
    const KERB = 9.5;        // distance from road centre to kerb — on the sidewalk
    // Bins must stay well inside the paved grid: the roads now end at ±ROAD_EDGE
    // (±128) with dead-end barriers and perimeter fences beyond, so anything
    // past ±100 is dropped to keep the arm reachable from a lane.
    const SPAWN_LIMIT = 100;
    const LANE = 3.6;        // lane centre offset from the road centre line
    const diagonal = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    const pool = [];
    const seen = new Set();
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
      // Hard reachability filter. A bin placed on the outer side of a ±120 line
      // lands at ±129.5, i.e. on the decorative belt behind the kerb, where the
      // perimeter fences and dead-end barriers make it unreachable — so only the
      // city-side offset of the outermost streets survives.
      if (Math.abs(x) > ROAD_EDGE || Math.abs(z) > ROAD_EDGE) return;
      seen.add(key);
      pool.push({ x, z, angle: binAngleForPerp(axis, perpSign), axis, line, lane, along, perpSign });
    };

    gridCoords.forEach((line, idx) => {
      // --- x-roads (running east-west along Z = line) ---
      add('x', line, LANE, -80);            // mid-block, kerb side
      add('x', line, -LANE, 80);            // mid-block, opposite curb
      add('x', line, LANE, -20);            // inner mid-block
      add('x', line, -LANE, 20);            // inner mid-block
      add('x', line, LANE, 60);             // outer mid-block
      add('x', line, -LANE, -60);           // outer mid-block
      if (idx % 2 === 1) add('x', line, LANE, -12); // near an intersection

      // --- z-roads (running north-south along X = line) ---
      add('z', line, LANE, -80);
      add('z', line, -LANE, 80);
      add('z', line, LANE, -20);
      add('z', line, -LANE, 20);
      add('z', line, LANE, 60);
      add('z', line, -LANE, -60);
      if (idx % 2 === 1) add('z', line, -LANE, 12); // near an intersection
    });

    // --- Park perimeter (Central Park block) ---
    diagonal.forEach(([sx, sz]) => {
      add('x', 40, sx > 0 ? -LANE : LANE, sz * 76);
      add('z', 40, -LANE, sz * 76);
      add('z', 40, LANE, sz * 76);
    });

    return pool;
  })();

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

    // Lantern fixture
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.65, 6), matHeadlight);
    lantern.position.set(0, 5.3, 0);
    lampGroup.add(lantern);

    scene.add(lampGroup);
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

    scene.add(treeGroup);
  }

  // --- Central Park 3D ---
  function createCentralPark3D(cx, cz, w, d) {
    const park = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.38, d),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.8 })
    );
    park.position.set(cx, 0.19, cz);
    park.receiveShadow = true;
    scene.add(park);

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
    scene.add(p1, p2);

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

    scene.add(fountainGroup);

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
        scene.add(bed, blooms);
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
    const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3.0, 10), neonMat);
    p1.position.set(w * 0.18 - bayW / 2, 1.8, d * 0.22 - bayD / 2);
    const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3.0, 10), neonMat);
    p2.position.set(w * 0.18 + bayW / 2, 1.8, d * 0.22 - bayD / 2);
    plantGroup.add(p1, p2);

    // --- EV Fast Charging Pad (open to the player at any time) ---
    // Parked at the front-right corner of the yard, right next to the unloading
    // dock bay. The zone is a plain radius check, so it works mid-shift.
    const CHARGE_RADIUS = 8.0;
    const chargeLocalX = 24;   // world x ≈ cx + 24 (open corner, no colliders)
    const chargeLocalZ = 24;   // world z ≈ cz + 24

    // Glowing green asphalt polygon with a neon-cyan rim.
    const chargePad = new THREE.Mesh(
      new THREE.CircleGeometry(CHARGE_RADIUS, 40),
      new THREE.MeshStandardMaterial({
        color: 0x0b3a2a,
        emissive: 0x1fbf6b,
        emissiveIntensity: 0.45,
        roughness: 0.45
      })
    );
    chargePad.rotateX(-Math.PI / 2);
    chargePad.position.set(chargeLocalX, 0.42, chargeLocalZ);
    plantGroup.add(chargePad);

    const chargeRim = new THREE.Mesh(
      new THREE.RingGeometry(CHARGE_RADIUS - 0.35, CHARGE_RADIUS, 48),
      new THREE.MeshStandardMaterial({ color: 0x00d2d3, emissive: 0x00d2d3, emissiveIntensity: 1.0, side: THREE.DoubleSide })
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
    const bolt = new THREE.Mesh(
      new THREE.ExtrudeGeometry(boltShape, { depth: 0.12, bevelEnabled: false }),
      new THREE.MeshStandardMaterial({ color: 0x00d2d3, emissive: 0x00d2d3, emissiveIntensity: 1.2, roughness: 0.3 })
    );
    bolt.position.set(chargeLocalX, 4.4, chargeLocalZ);
    plantGroup.add(bolt);

    const boltPole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 4.4, 10), matLegoGrey);
    boltPole.position.set(chargeLocalX, 2.2, chargeLocalZ);
    plantGroup.add(boltPole);

    scene.add(plantGroup);

    const factoryBeacon = createFactoryBeacon();
    factoryBeacon.position.set(cx + w * 0.18, 0, cz + d * 0.22);
    scene.add(factoryBeacon);

    recyclingPlant3D = {
      x: cx,
      z: cz,
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
  // The city roads run along `gridCoords`: rows are Z lines, columns are X lines.
  const NPC_GRID_ROW_Z = gridCoords;
  const NPC_GRID_COL_X = gridCoords;
  // Hard U-turn boundary: NPCs loop at ±122, i.e. on the last intersection
  // (±120) just short of the dead-end barrier at ±128 — they never drive into
  // the decorative perimeter belt.
  const NPC_TURN_ZONE = 122;
  // Cars spawn only on the inner streets, comfortably inside the turn zone.
  const NPC_SPAWN_RANGE = 110;
  // Probability of turning at any given intersection (otherwise drive straight).
  const NPC_TURN_CHANCE = 0.35;

  const NPC_SPAWN_MIN = 8;
  const NPC_SPAWN_MAX = 10;
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

  const NPC_LANES = buildNpcLanes();

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
      // are exempt: the NPC keeps patiently yielding instead of vanishing.
      const playerDist = Math.hypot(car.x - truckPhys.x, car.z - truckPhys.z);
      if (Math.abs(car.speed) < 0.02 && playerDist > NPC_STUCK_PLAYER_RANGE) {
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
    generate3DCity();

    // --- Procedural container placement (Задача: расширенный пул точек) ---
    // generate3DCity() already removed every previous bin/marker from the scene
    // and emptied trashBins3D. Pick 12 unique spawn points out of the pool and
    // hand out a balanced spread of materials (exactly 4 of each type),
    // shuffled so the pickup order along the route stays random.
    gameState.totalBins = 12;
    const binCategories = ['yellow', 'blue', 'green'];
    const balancedCategories = shuffleCopy(
      binCategories.flatMap((cat) => [cat, cat, cat, cat])
    );
    const chosenSpawns = shuffleCopy(POTENTIAL_BIN_SPAWNS).slice(0, gameState.totalBins);
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

    truckPhys.x = -40;
    truckPhys.z = 25;
    truckPhys.angle = 0;
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

    updateStatsHUD();
    updateTaskHUD();
    updateBestTimeHUD();
  }

  // --- Strict Solid Collision & Vehicle Dynamics ---
  function updatePhysics() {
    // e-PTO peak override (hydraulic pump). Evaluated before every early exit
    // so the 240 kW spike stays visible on the cluster for the full arm cycle,
    // including while the pickup cutscene early-returns below.
    const ptoPeak = performance.now() < truckPhys.ptoOverrideUntil;

    // Traffic keeps flowing (and braking) even while cutscenes play.
    updateTraffic(getTrafficDelta());

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
        truckPhys.speed -= truckPhys.friction;
        if (truckPhys.speed < 0) truckPhys.speed = 0;
      } else if (truckPhys.speed < 0) {
        truckPhys.speed += truckPhys.friction;
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

    // Realistic suspension pitch & roll
    const accelRate = truckPhys.speed - prevSpeed;
    truckPhys.pitch += (-accelRate * 1.6 - truckPhys.pitch) * 0.15;
    truckPhys.roll += (-truckPhys.steerAngle * truckPhys.speed * 0.65 - truckPhys.roll) * 0.15;

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

    if (typeof matAmberBeacon !== 'undefined') {
      const origIntensity = matAmberBeacon.emissiveIntensity;
      matAmberBeacon.emissiveIntensity = 2.4;
      setTimeout(() => {
        matAmberBeacon.emissiveIntensity = origIntensity;
      }, 400);
    }

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
    });
    const stats = result.stats;
    if (recBestTime) recBestTime.textContent = formatDuration(stats.bestTimeSec);
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
    sunLight.position.set(truckPhys.x + 45, 95, truckPhys.z + 45);
    sunLight.target = truckMesh;
  }

  // --- 2D Minimap Radar ---
  function drawMinimap() {
    const mw = minimapCanvas.width;
    const mh = minimapCanvas.height;
    mCtx.clearRect(0, 0, mw, mh);

    mCtx.fillStyle = '#1e272e';
    mCtx.fillRect(0, 0, mw, mh);

    const scale = mw / WORLD_SIZE;
    const halfW = mw / 2;
    const halfH = mh / 2;

    // Roads
    mCtx.fillStyle = '#34495e';
    gridCoords.forEach(gz => {
      const y = (gz / (WORLD_SIZE / 2)) * halfH + halfH;
      mCtx.fillRect(0, y - (ROAD_W * scale) / 2, mw, ROAD_W * scale);
    });
    gridCoords.forEach(gx => {
      const x = (gx / (WORLD_SIZE / 2)) * halfW + halfW;
      mCtx.fillRect(x - (ROAD_W * scale) / 2, 0, ROAD_W * scale, mh);
    });

    // Factory
    if (recyclingPlant3D) {
      mCtx.fillStyle = '#e67e22';
      const fx = (recyclingPlant3D.x / (WORLD_SIZE / 2)) * halfW + halfW;
      const fz = (recyclingPlant3D.z / (WORLD_SIZE / 2)) * halfH + halfH;
      mCtx.fillRect(fx - 14, fz - 14, 28, 28);
    }

    // Charging Pad — bright cyan/green beacon with a ⚡ glyph so the player can
    // always find a top-up when the pack runs low.
    if (recyclingPlant3D && recyclingPlant3D.chargingBay) {
      const cb = recyclingPlant3D.chargingBay;
      const gx = (cb.x / (WORLD_SIZE / 2)) * halfW + halfW;
      const gy = (cb.z / (WORLD_SIZE / 2)) * halfH + halfH;
      const r = Math.max(5, cb.radius * scale);

      mCtx.save();
      // Soft outer glow ring
      mCtx.beginPath();
      mCtx.arc(gx, gy, r, 0, Math.PI * 2);
      mCtx.fillStyle = 'rgba(0, 210, 211, 0.28)';
      mCtx.fill();
      mCtx.lineWidth = 1.5;
      mCtx.strokeStyle = '#00d2d3';
      mCtx.stroke();

      // Solid inner disc
      mCtx.beginPath();
      mCtx.arc(gx, gy, r * 0.5, 0, Math.PI * 2);
      mCtx.fillStyle = '#2ecc71';
      mCtx.fill();

      // Lightning glyph
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
      const bx = (b.x / (WORLD_SIZE / 2)) * halfW + halfW;
      const bz = (b.z / (WORLD_SIZE / 2)) * halfH + halfH;
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
    const tx = (truckPhys.x / (WORLD_SIZE / 2)) * halfW + halfW;
    const tz = (truckPhys.z / (WORLD_SIZE / 2)) * halfH + halfH;
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
    updateRoboticArm3D();
    updateFactoryUnload3D();
    updateQuickDump3D();
    update3DParticles();
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

  initLevel();
  requestAnimationFrame(loop);
})();
