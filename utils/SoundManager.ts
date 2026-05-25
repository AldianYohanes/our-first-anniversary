"use client";

class SoundManagerClass {
  private ctx: AudioContext | null = null;
  private bgmInterval: any = null;
  private isBgmPlaying = false;
  private bpm = 80;
  private bgmSequenceStep = 0;
  private isMuted = false;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser policies
  }

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.bgmInterval) {
      this.stopBGM();
    } else if (!muted && !this.isBgmPlaying && typeof window !== "undefined" && this.ctx) {
      this.playBGM();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  // Synthesize a retro visual novel text beep (like Undertale or Pokemon)
  public playTextBeep(speaker: string = "default") {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Give different characters slightly different pitches
    let pitch = 180;
    if (speaker === "Cia") {
      pitch = 280; // Cia has a higher, cuter pitch
      osc.type = "sine";
    } else if (speaker === "Han") {
      pitch = 140; // Han has a lower weird-guy pitch
      osc.type = "triangle";
    } else {
      osc.type = "square";
      pitch = 200;
    }

    // Add slight random detune to make it feel organic
    osc.frequency.setValueAtTime(pitch + (Math.random() * 20 - 10), ctx.currentTime);
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Synthesize a mechanical keyboard clack sound
  public playClack() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // Synthesize noise for keyclack
    const bufferSize = ctx.sampleRate * 0.02; // 20ms noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1000 + Math.random() * 500, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(ctx.destination);

    noiseNode.start();
    noiseNode.stop(ctx.currentTime + 0.02);

    // Also add a tiny low-frequency click pop
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(120 + Math.random() * 40, ctx.currentTime);
    clickGain.gain.setValueAtTime(0.08, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
    
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start();
    clickOsc.stop(ctx.currentTime + 0.015);
  }

  // Synthesize a beautiful visual UI click/hover chime
  public playChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15); // A6

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  // Synthesize a magical success chime (fairy dust)
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0.04, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  }

  // Synthesize a cute bubble pop sound for bread catching
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Synthesize a gentle fail / warning slide
  public playDodgeFail() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  // Synthesize cozy background music box procedural chord sequence
  public playBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.bgmSequenceStep = 0;

    // Core progression (in F major, dreamy & comforting):
    // Step 0: Fmaj7 (F3, C4, E4, A4)
    // Step 1: G6 (G3, D4, E4, B4)
    // Step 2: Em7 (E3, B3, D4, G4)
    // Step 3: Am7 (A3, E4, G4, C5)
    const chords = [
      [174.61, 261.63, 329.63, 440.00], // F3, C4, E4, A4
      [196.00, 293.66, 329.63, 493.88], // G3, D4, E4, B4
      [164.81, 246.94, 293.66, 392.00], // E3, B3, D4, G4
      [220.00, 329.63, 392.00, 523.25]  // A3, E4, G4, C5
    ];

    // Pentatonic scale notes for beautiful organic procedural melody:
    // F, G, A, C, D, E, G, A, C (F major pentatonic / C major scale)
    const melodyNotes = [349.23, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

    const stepTimeSeconds = 60 / this.bpm / 2; // Eighth notes (approx 0.375s)

    const runScheduler = () => {
      if (!this.isBgmPlaying || this.isMuted) return;

      const now = ctx.currentTime;
      const beat = this.bgmSequenceStep % 16;
      const chordIndex = Math.floor(beat / 4);

      // Play chord root on beat 0 of each chord
      if (beat % 4 === 0) {
        const rootFreq = chords[chordIndex][0];
        this.triggerMusicBoxNote(rootFreq, 0.06, 1.2, "triangle");
      }

      // Arpeggiate remaining chord notes gently
      if (beat % 2 === 0) {
        const midNoteFreq = chords[chordIndex][(beat % 4) === 0 ? 1 : (beat % 4 === 2 ? 2 : 3)];
        this.triggerMusicBoxNote(midNoteFreq, 0.03, 0.8, "sine");
      }

      // Procedural soft melody: random but beautiful pentatonic scale steps
      // Plays on occasional eighth beats with a high, magical music box feeling
      if (Math.random() < 0.35 && beat % 2 !== 0) {
        const melodyFreq = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
        this.triggerMusicBoxNote(melodyFreq, 0.04, 1.5, "sine", 0.08); // add delay/vib
      }

      this.bgmSequenceStep++;
      
      // Schedule next event
      this.bgmInterval = setTimeout(runScheduler, stepTimeSeconds * 1000);
    };

    runScheduler();
  }

  // Trigger a music box/bell like physical tone
  private triggerMusicBoxNote(
    freq: number, 
    volume: number, 
    decay: number, 
    type: OscillatorType = "sine",
    vibratoFreq: number = 0
  ) {
    const ctx = this.ctx;
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Cozy vib / tremolo effect
    if (vibratoFreq > 0) {
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5, ctx.currentTime); // 5Hz wobble
      lfoGain.gain.setValueAtTime(vibratoFreq, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      lfo.stop(ctx.currentTime + decay);
    }

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.03); // Soft attack
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay);

    osc.connect(gain);
    
    // Add simple bandpass to make it sound warm and retro
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1500, ctx.currentTime);
    
    gain.connect(filter);
    filter.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + decay);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

// Export single instances so the context is shared
export const SoundManager = new SoundManagerClass();
