// Web Audio API Sound Synthesizer for Mack Electric Recycle Truck Game

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isInitialized = false;

    // Motor sound nodes (velvety electric drivetrain)
    this.motorOsc = null;
    this.motorSub = null;
    this.motorGain = null;
    this.motorFilter = null;

    // Road friction / tire rolling sound nodes
    this.roadNoise = null;
    this.roadGain = null;
    this.roadFilter = null;

    // Reversing acoustic alert
    this.reverseInterval = null;
    this.isReversing = false;

    // Hydraulic loop sound
    this.hydraulicOsc = null;
    this.hydraulicGain = null;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // 1. Setup continuous electric motor sound (deep, warm, non-fatiguing)
      this.motorOsc = this.ctx.createOscillator();
      this.motorSub = this.ctx.createOscillator();
      this.motorGain = this.ctx.createGain();
      this.motorFilter = this.ctx.createBiquadFilter();

      // Smooth triangle + sine instead of harsh buzzing sawtooth
      this.motorOsc.type = 'triangle';
      this.motorSub.type = 'sine';

      this.motorFilter.type = 'lowpass';
      this.motorFilter.frequency.setValueAtTime(130, this.ctx.currentTime);
      this.motorFilter.Q.setValueAtTime(0.8, this.ctx.currentTime); // No piercing whistle peak

      this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.motorOsc.connect(this.motorFilter);
      this.motorSub.connect(this.motorFilter);
      this.motorFilter.connect(this.motorGain);
      this.motorGain.connect(this.ctx.destination);

      this.motorOsc.start();
      this.motorSub.start();

      // 2. Soft organic tire road rolling sound (filtered brown noise)
      this.roadGain = this.ctx.createGain();
      this.roadFilter = this.ctx.createBiquadFilter();
      this.roadFilter.type = 'lowpass';
      this.roadFilter.frequency.setValueAtTime(80, this.ctx.currentTime);
      this.roadFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);
      this.roadGain.gain.setValueAtTime(0, this.ctx.currentTime);

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.0;
      }
      this.roadNoise = this.ctx.createBufferSource();
      this.roadNoise.buffer = noiseBuffer;
      this.roadNoise.loop = true;
      this.roadNoise.connect(this.roadFilter);
      this.roadFilter.connect(this.roadGain);
      this.roadGain.connect(this.ctx.destination);
      this.roadNoise.start();

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio not supported or failed to init', e);
    }
  }

  ensureContext() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx) {
      if (this.isMuted) {
        if (this.motorGain) this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);
        if (this.roadGain) this.roadGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    }
    return this.isMuted;
  }

  // Update electric motor hum and road acoustics according to vehicle speed (0 to 1)
  updateMotor(speedRatio, isMoving, isReversing) {
    if (!this.isInitialized || this.isMuted) return;

    const t = this.ctx.currentTime;
    if (!isMoving) {
      // Idle electric standby hum (warm, deep, quiet)
      this.motorOsc.frequency.setTargetAtTime(50, t, 0.12);
      this.motorSub.frequency.setTargetAtTime(25, t, 0.12);
      this.motorFilter.frequency.setTargetAtTime(110, t, 0.12);
      this.motorGain.gain.setTargetAtTime(0.018, t, 0.12);
      if (this.roadGain) this.roadGain.gain.setTargetAtTime(0, t, 0.12);
    } else {
      // Mack Electric velvety acoustic propulsion (warm baritone EV hum + tire road roll)
      const baseFreq = 52 + speedRatio * 95; // 52Hz to 147Hz (smooth low baritone hum, zero screech)
      this.motorOsc.frequency.setTargetAtTime(baseFreq, t, 0.08);
      this.motorSub.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.08);
      this.motorFilter.frequency.setTargetAtTime(130 + speedRatio * 160, t, 0.08); // 130Hz to 290Hz
      this.motorGain.gain.setTargetAtTime(0.022 + speedRatio * 0.038, t, 0.08); // Max 0.06 (pleasant & balanced)

      // Tire pavement friction rises naturally with vehicle velocity
      if (this.roadGain) {
        this.roadFilter.frequency.setTargetAtTime(65 + speedRatio * 55, t, 0.1);
        this.roadGain.gain.setTargetAtTime(speedRatio * 0.024, t, 0.1);
      }
    }

    // Reverse safety acoustic alert
    if (isReversing && isMoving) {
      if (!this.isReversing) {
        this.startReverseBeeper();
      }
    } else {
      if (this.isReversing) {
        this.stopReverseBeeper();
      }
    }
  }

  startReverseBeeper() {
    this.isReversing = true;
    if (this.reverseInterval) clearInterval(this.reverseInterval);
    this.playBeep();
    this.reverseInterval = setInterval(() => {
      if (this.isReversing) {
        this.playBeep();
      }
    }, 780);
  }

  stopReverseBeeper() {
    this.isReversing = false;
    if (this.reverseInterval) {
      clearInterval(this.reverseInterval);
      this.reverseInterval = null;
    }
  }

  playBeep() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      // Modern soft acoustic sonar chime (warm sine tone, zero harsh buzzer)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.3, this.ctx.currentTime); // D5 pleasant warm chime

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.032, this.ctx.currentTime + 0.018); // Soft attack, zero click
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22); // Smooth musical decay

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  // Hydraulic servo sound for robotic arm
  playHydraulicServo(duration = 1.2) {
    if (!this.isInitialized || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(460, this.ctx.currentTime + duration * 0.5);
      osc.frequency.linearRampToValueAtTime(290, this.ctx.currentTime + duration);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.Q.setValueAtTime(4, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + duration - 0.1);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // Clamping trash bin sound (mechanical latch)
  playClamp() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  // Trash rattling into hopper
  playTrashDump() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      // Noise burst for tumbling bottles/cans
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.45);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {}
  }

  // Compactor crushing sound
  playCompactor() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);
    } catch (e) {}
  }

  // Unloading at Recycling Plant
  playFactoryUnload() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      // 1. Deep rumble
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(45, this.ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.25);

      // 2. Chime sequence
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isMuted) return;
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, this.ctx.currentTime);
          g.gain.setValueAtTime(0.12, this.ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start();
          o.stop(this.ctx.currentTime + 0.45);
        }, idx * 120);
      });
    } catch (e) {}
  }

  // Truck Horn
  playHorn() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Mack dual electric horn chords
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(370, this.ctx.currentTime); // F#4
      osc2.frequency.setValueAtTime(440, this.ctx.currentTime); // A4

      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.45);
      osc2.stop(this.ctx.currentTime + 0.45);
    } catch (e) {}
  }

  // Victory fanfare
  playVictory() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      const melody = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.50, d: 0.5 }  // C6
      ];
      let delay = 0;
      melody.forEach(note => {
        setTimeout(() => {
          if (this.isMuted) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + note.d + 0.05);
        }, delay * 1000);
        delay += note.d * 0.85;
      });
    } catch (e) {}
  }

  // UI button click
  playClick() {
    if (!this.isInitialized || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }
}

window.soundManager = new SoundManager();
