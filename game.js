// Mack LR Electric 3D - High-Fidelity Simulation Engine
// Realistic Truck Physics, Deep Collision System, Detailed LEGO Technic Models & Cinematic Trash Arm Animation

(() => {
  'use strict';

  // --- UI Elements ---
  const taskText = document.getElementById('taskText');
  const taskIcon = document.getElementById('taskIcon');
  const gpsArrow = document.getElementById('gpsArrow');
  const gpsDistance = document.getElementById('gpsDistance');
  const capacityVal = document.getElementById('capacityVal');
  const capacityBar = document.getElementById('capacityBar');
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

  // Minimap
  const minimapCanvas = document.getElementById('minimapCanvas');
  const mCtx = minimapCanvas.getContext('2d');

  // --- World Constants ---
  const WORLD_SIZE = 420;
  const ROAD_W = 16.5;
  const SIDEWALK_W = 3.4;
  const gridCoords = [-120, -40, 40, 120];

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

  // Camera Modes: 0 = Chase 3D (Behind), 1 = Birds-Eye Isometric, 2 = Driver / Hood View
  let cameraMode = 0;
  function toggleCamera() {
    cameraMode = (cameraMode + 1) % 3;
    if (camIcon) camIcon.textContent = cameraMode === 0 ? '🎥' : (cameraMode === 1 ? '🚁' : '🚘');
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
  const keys = { up: false, down: false, left: false, right: false, space: false };

  window.addEventListener('keydown', (e) => {
    window.soundManager.ensureContext();
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

  // --- Game State ---
  const gameState = {
    status: 'collecting',
    totalBins: 8,
    collectedBins: 0,
    totalKg: 0,
    startTime: Date.now(),
    endTime: null,
    activePromptType: null,
    targetBin: null
  };

  // --- Real Commercial Truck Physics (Heavy, Smooth, Authentically Paced) ---
  const truckPhys = {
    x: -120,
    z: -120,
    angle: 0,
    speed: 0,
    // Realistic lower speeds for a heavy 25-ton municipal garbage truck
    maxForward: 0.48,     // ~38 km/h max speed
    maxReverse: -0.22,    // ~16 km/h reverse
    accel: 0.009,         // Heavy realistic inertia
    brake: 0.024,         // Firm air-brakes
    friction: 0.004,
    turnSpeed: 0.026,
    steerAngle: 0,

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
    dumpProgress: 0
  };

  let cutsceneActive = false;

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
  const driverHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0xf1c40f }));
  driverHead.position.set(-0.45, 1.35, 0.1);
  const driverHelmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), matLegoWhite);
  driverHelmet.position.set(-0.45, 1.48, 0.1);
  const driverVest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 0.3), new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.3 }));
  driverVest.position.set(-0.45, 0.95, 0.1);
  // Realistic Steering Wheel
  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 8, 16), matLegoBlack);
  steerWheel.position.set(-0.45, 1.05, 0.42);
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

  // --- Wheelie Bin Mesh Builder Helper ---
  function createBinMesh(lidColor) {
    const binGroup = new THREE.Group();

    // Body with molded vertical ribs
    const bodyGeom = new THREE.BoxGeometry(0.95, 1.25, 0.95);
    const body = new THREE.Mesh(bodyGeom, matLegoBlack);
    body.position.y = 0.62;
    body.castShadow = true;
    binGroup.add(body);

    // Hinged Lid with handle
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 1.25, -0.45); // hinge pivot on rear
    const lidGeom = new THREE.BoxGeometry(1.02, 0.18, 1.02);
    const matLid = new THREE.MeshStandardMaterial({ color: lidColor, roughness: 0.3 });
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
    trashBins3D.forEach(b => scene.remove(b.mesh));
    buildings3D = [];
    trashBins3D = [];
    colliders.length = 0;

    // Ground Grass Plane
    const groundGeom = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE);
    groundGeom.rotateX(-Math.PI / 2);
    const ground = new THREE.Mesh(groundGeom, new THREE.MeshStandardMaterial({ color: 0x1f8441, roughness: 0.75 }));
    ground.receiveShadow = true;
    scene.add(ground);

    // Seamless Asphalt Roads
    const matRoad = new THREE.MeshStandardMaterial({ color: 0x22262c, roughness: 0.65 });
    gridCoords.forEach(gz => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_SIZE, ROAD_W), matRoad);
      road.rotateX(-Math.PI / 2);
      road.position.set(0, 0.02, gz);
      road.receiveShadow = true;
      scene.add(road);
    });
    gridCoords.forEach(gx => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_W, WORLD_SIZE), matRoad);
      road.rotateX(-Math.PI / 2);
      road.position.set(gx, 0.025, 0);
      road.receiveShadow = true;
      scene.add(road);
    });

    const matZebra = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.4 });

    // Road Markings (Dashed Centerlines, White Shoulder Borders, Blue Bike Lanes, Stop Bars)
    const roadIntervals = [
      { start: -240, end: -135 },
      { start: -105, end: -55 },
      { start: -25, end: 25 },
      { start: 55, end: 105 },
      { start: 135, end: 240 }
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
    gridCoords.forEach(gx => {
      gridCoords.forEach(gz => {
        createZebra(gx, gz - ROAD_W / 2 - 2.5, true);
        createZebra(gx, gz + ROAD_W / 2 + 2.5, true);
        createZebra(gx - ROAD_W / 2 - 2.5, gz, false);
        createZebra(gx + ROAD_W / 2 + 2.5, gz, false);

        createStopBar(gx, gz - ROAD_W / 2 - 5.5, true);
        createStopBar(gx, gz + ROAD_W / 2 + 5.5, true);
        createStopBar(gx - ROAD_W / 2 - 5.5, gz, false);
        createStopBar(gx + ROAD_W / 2 + 5.5, gz, false);

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

    createStreetLamp3D(cx - w / 2 + 1.6, cz - d / 2 + 1.6);
    createStreetLamp3D(cx + w / 2 - 1.6, cz - d / 2 + 1.6);
    createStreetLamp3D(cx - w / 2 + 1.6, cz + d / 2 - 1.6);
    createStreetLamp3D(cx + w / 2 - 1.6, cz + d / 2 - 1.6);

    createFireHydrant3D(cx - w / 2 - 1.4, cz - d / 2 + 3.0);
    createFireHydrant3D(cx + w / 2 + 1.4, cz + d / 2 - 3.0);

    createRoadSign3D(cx - w / 2 + 2.5, cz - d / 2 - 1.2, '30');
    createRoadSign3D(cx + w / 2 - 2.5, cz + d / 2 + 1.2, 'PED');

    createStormDrain3D(cx, cz - d / 2 - 0.4, true);
    createStormDrain3D(cx, cz + d / 2 + 0.4, true);

    createParkBench3D(cx - w / 2 + 1.6, cz + 2.0, Math.PI / 2);
    createParkBench3D(cx + w / 2 - 1.6, cz - 2.0, -Math.PI / 2);

    createMinifigure3D(cx - w / 2 + 1.6, cz - 6.0, 0, 0xe74c3c, 0x2c3e50, false);
    createMinifigure3D(cx + w / 2 - 1.6, cz + 6.0, Math.PI, 0x0984e3, 0x1e272e, true);
    createMinifigure3D(cx + 4.0, cz - d / 2 + 1.6, Math.PI / 2, 0x2ecc71, 0x2c3e50, false);

    spawn3DBin(cx, cz - d / 2 + 0.65, 0, '#27ae60', 'Пластик & Вторсырье ♻️');
    spawn3DBin(cx + w / 2 - 0.65, cz, Math.PI / 2, '#2980b9', 'Бумага & Картон 📦');
    spawn3DBin(cx, cz + d / 2 - 0.65, Math.PI, '#f39c12', 'Стекло & Банки 🍾');
    spawn3DBin(cx - w / 2 + 0.65, cz, -Math.PI / 2, '#27ae60', 'Эко-Контейнер 🌿');
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

  function spawn3DBin(x, z, angle, color, label) {
    const binMesh = createBinMesh(color);
    binMesh.position.set(x, 0.35, z);
    binMesh.rotation.y = angle;
    scene.add(binMesh);

    trashBins3D.push({
      mesh: binMesh,
      lidGroup: binMesh.lidGroup,
      x: x,
      z: z,
      color: color,
      collected: false,
      label: label
    });
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

    scene.add(plantGroup);

    recyclingPlant3D = {
      x: cx,
      z: cz,
      unloadBay: {
        x: cx + w * 0.18,
        z: cz + d * 0.22,
        w: bayW,
        d: bayD
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

  // --- Level Initialization ---
  function initLevel() {
    generate3DCity();

    // Pick 8 active bins
    trashBins3D.sort(() => Math.random() - 0.5);
    gameState.totalBins = 8;
    trashBins3D.forEach((bin, idx) => {
      bin.collected = idx >= gameState.totalBins;
      bin.mesh.visible = true;
      if (bin.lidGroup) bin.lidGroup.rotation.x = 0;
    });

    gameState.collectedBins = 0;
    gameState.totalKg = 0;
    gameState.startTime = Date.now();
    gameState.endTime = null;
    gameState.status = 'collecting';
    gameState.activePromptType = null;
    gameState.targetBin = null;

    truckPhys.x = -40;
    truckPhys.z = 25;
    truckPhys.angle = 0;
    truckPhys.speed = 0;
    truckPhys.arm.active = false;
    truckPhys.arm.state = 'idle';
    truckPhys.isDumpingAtFactory = false;
    cutsceneActive = false;
    unloadCutsceneActive = false;
    if (pickupOverlay) pickupOverlay.classList.remove('show');
    if (unloadOverlay) unloadOverlay.classList.remove('show');

    updateStatsHUD();
    updateTaskHUD();
  }

  // --- Strict Solid Collision & Vehicle Dynamics ---
  function updatePhysics() {
    if (cutsceneActive || unloadCutsceneActive || truckPhys.isDumpingAtFactory) {
      truckPhys.speed *= 0.8;
      if (Math.abs(truckPhys.speed) < 0.005) truckPhys.speed = 0;
      return;
    }

    const prevSpeed = truckPhys.speed;

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

    if (Math.abs(truckPhys.speed) > 0.015) {
      const dir = truckPhys.speed >= 0 ? 1 : -1;
      if (keys.left) truckPhys.angle += truckPhys.turnSpeed * dir * (0.65 + Math.abs(speedRatio) * 0.35);
      if (keys.right) truckPhys.angle -= truckPhys.turnSpeed * dir * (0.65 + Math.abs(speedRatio) * 0.35);
    }

    // Candidate next position
    const nextX = truckPhys.x + Math.sin(truckPhys.angle) * truckPhys.speed;
    const nextZ = truckPhys.z + Math.cos(truckPhys.angle) * truckPhys.speed;

    // Strict Multi-Point Oriented Collision Check
    // We test 6 perimeter points of the truck (front-left, front-right, rear-left, rear-right, mid-left, mid-right)
    const cosA = Math.cos(truckPhys.angle);
    const sinA = Math.sin(truckPhys.angle);
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
    } else {
      // Solid collision response: bounce back and damp speed
      truckPhys.speed *= -0.28;
    }

    // World Boundary constraint
    const bLimit = WORLD_SIZE / 2 - 8;
    truckPhys.x = Math.max(-bLimit, Math.min(bLimit, truckPhys.x));
    truckPhys.z = Math.max(-bLimit, Math.min(bLimit, truckPhys.z));

    // Realistic suspension pitch & roll
    const accelRate = truckPhys.speed - prevSpeed;
    truckPhys.pitch += (-accelRate * 1.6 - truckPhys.pitch) * 0.15;
    truckPhys.roll += (-truckPhys.steerAngle * truckPhys.speed * 0.65 - truckPhys.roll) * 0.15;

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

    // Sound Engine Update
    const isMoving = Math.abs(truckPhys.speed) > 0.015;
    const isReversing = truckPhys.speed < -0.015;
    window.soundManager.updateMotor(Math.abs(speedRatio), isMoving, isReversing);
  }

  // --- Robotic Arm Stub (In-world arm replaced by cutscene modal) ---
  function updateRoboticArm3D() {}

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

  function startPickupCutscene(targetBin) {
    if (cutsceneActive) return;

    cutsceneActive = true;
    cutsceneStartTime = performance.now();
    cutsceneTargetBin = targetBin;
    truckPhys.speed = 0; // stop vehicle during loading

    if (pickupOverlay) pickupOverlay.classList.add('show');
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
      cutsceneTargetBin.collected = true;
      cutsceneTargetBin.mesh.visible = true;
      if (cutsceneTargetBin.lidGroup) cutsceneTargetBin.lidGroup.rotation.x = -1.6;
      gameState.collectedBins++;
      gameState.totalKg += 120;
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
  }
  if (unloadOverlay) {
    unloadOverlay.addEventListener('click', skipCutscene);
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
      // Draw photographic frame cover
      pCtx.drawImage(curImg, 0, 0, W, H);
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

  function startFactoryUnloadCutscene() {
    if (unloadCutsceneActive) return;

    unloadCutsceneActive = true;
    unloadCutsceneStartTime = performance.now();
    truckPhys.speed = 0;
    truckPhys.isDumpingAtFactory = true;
    gameState.status = 'unloading';
    updateTaskHUD();

    initUnloadCascadeParticles();

    if (unloadOverlay) unloadOverlay.classList.add('show');
    if (unloadStatusText) unloadStatusText.textContent = '1/5 ПРИБЫТИЕ В ШЛЮЗ #1...';
    const totalKg = gameState.totalKg || 960;
    if (unloadTelemetry) unloadTelemetry.textContent = `ВЕСОВОЙ МОНИТОР: ${totalKg} КГ | ДАТЧИКИ: ОК`;
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

  function finishFactoryUnloadCutscene() {
    if (!unloadCutsceneActive) return;
    unloadCutsceneActive = false;
    truckPhys.isDumpingAtFactory = false;
    tailgateGroup.rotation.x = 0;

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

    const totalKg = gameState.totalKg || 960;

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
      uCtx.drawImage(curImg, 0, 0, W, H);
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
      tailgateGroup.rotation.x = 0;
      showVictory();
    }
  }

  // --- Proximity & Interactive Prompts ---
  function updateInteractions3D() {
    if (cutsceneActive || unloadCutsceneActive || truckPhys.isDumpingAtFactory) {
      hidePrompt();
      armIndicator.classList.add('busy');
      armStatusText.textContent = unloadCutsceneActive ? 'ВЫГРУЗКА НА ЗАВОДЕ...' : 'МАНИПУЛЯТОР РАБОТАЕТ...';
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

    // 1. Check Factory Unload Dock
    if (gameState.status === 'delivering' && recyclingPlant3D) {
      const bay = recyclingPlant3D.unloadBay;
      const d = Math.hypot(truckPhys.x - bay.x, truckPhys.z - bay.z);
      if (d < 16) {
        gameState.activePromptType = 'unload';
        showPrompt('ЗОНА РАЗГРУЗКИ ЗАВОДА!', 'Нажмите ПРОБЕЛ, чтобы сдать мусор на переработку ♻️', 'ВЫГРУЗИТЬ');
        if (btnGrabAction) {
          btnGrabAction.classList.add('ready-unload');
          btnGrabAction.classList.remove('ready-grab', 'busy');
          if (grabBtnText) grabBtnText.textContent = 'ВЫГРУЗИТЬ';
          if (grabBtnIcon) grabBtnIcon.textContent = '♻️';
        }
        return;
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
    } else if (gameState.activePromptType === 'unload' && !unloadCutsceneActive) {
      startFactoryUnloadCutscene();
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
    if (gameState.collectedBins >= gameState.totalBins && gameState.status === 'collecting') {
      gameState.status = 'delivering';
      updateTaskHUD();
      window.soundManager.playVictory();
    }
  }

  function showVictory() {
    gameState.status = 'completed';
    gameState.endTime = Date.now();
    const durationSec = Math.floor((gameState.endTime - gameState.startTime) / 1000);
    const mins = String(Math.floor(durationSec / 60)).padStart(2, '0');
    const secs = String(durationSec % 60).padStart(2, '0');

    resBinsCount.textContent = `${gameState.collectedBins}`;
    resWeight.textContent = `${gameState.totalKg} кг`;
    resTime.textContent = `${mins}:${secs}`;
    resEcoCO2.textContent = `~${(gameState.totalKg * 0.082).toFixed(1)} кг`;

    window.soundManager.playVictory();
    victoryModal.classList.add('show');
    updateTaskHUD();
  }

  function updateStatsHUD() {
    capacityVal.textContent = `${gameState.collectedBins} / ${gameState.totalBins} баков`;
    const percent = Math.min(100, Math.round((gameState.collectedBins / gameState.totalBins) * 100));
    capacityBar.style.width = `${percent}%`;
    ecoScore.textContent = `${gameState.totalKg} кг сырья`;
  }

  function updateTaskHUD() {
    if (gameState.status === 'collecting') {
      taskIcon.textContent = '🗑️';
      taskText.textContent = `Соберите контейнеры на улицах (${gameState.collectedBins}/${gameState.totalBins})`;
    } else if (gameState.status === 'delivering') {
      taskIcon.textContent = '🏭';
      taskText.textContent = 'Все баки собраны! Везите мусор на ЭКО-ЗАВОД ♻️';
    } else if (gameState.status === 'unloading') {
      taskIcon.textContent = '⚡';
      taskText.textContent = 'Разгрузка мусора в перерабатывающий бункер...';
    } else if (gameState.status === 'completed' || gameState.status === 'free_drive') {
      taskIcon.textContent = '✨';
      taskText.textContent = 'Рейс завершен! Свободная езда по 3D городу.';
    }
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

    // Direction arrow
    let targetX = 0;
    let targetZ = 0;

    if (gameState.status === 'delivering' && recyclingPlant3D) {
      targetX = recyclingPlant3D.unloadBay.x;
      targetZ = recyclingPlant3D.unloadBay.z;
    } else {
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
  }

  // --- Dynamic 3D Camera Follow ---
  function updateCamera() {
    // Hide tinted windshield in cockpit view so it never obstructs or darkens lighting
    windMesh.visible = (cameraMode !== 2);

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

    // Bins
    trashBins3D.forEach(b => {
      if (b.collected) return;
      mCtx.fillStyle = '#2ecc71';
      const bx = (b.x / (WORLD_SIZE / 2)) * halfW + halfW;
      const bz = (b.z / (WORLD_SIZE / 2)) * halfH + halfH;
      mCtx.beginPath();
      mCtx.arc(bx, bz, 3.5, 0, Math.PI * 2);
      mCtx.fill();
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

  // --- Main Animation Loop ---
  let frameCount = 0;
  function loop() {
    updatePhysics();
    updateRoboticArm3D();
    updateFactoryUnload3D();
    update3DParticles();
    updateInteractions3D();
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
