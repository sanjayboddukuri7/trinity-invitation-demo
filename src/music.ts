// Gentle background music generated in the browser with the Web Audio API.
// Original simple melodies, so there is no audio file to download and nothing copyrighted.
import type { Melody } from './invites';

// [MIDI note, length in beats]; 0 = rest
const TUNES: Record<Melody, { bpm: number; wave: OscillatorType; drone: number; notes: [number, number][] }> = {
  // pentatonic, raga-like phrase over a tonic drone
  raga: { bpm: 76, wave: 'triangle', drone: 50, notes: [[62, 1], [64, 1], [66, 1], [69, 2], [71, 1], [69, 1], [66, 2], [64, 1], [62, 1], [64, 1], [66, 1], [62, 3], [0, 1]] },
  playful: { bpm: 112, wave: 'square', drone: 0, notes: [[72, 0.5], [76, 0.5], [79, 0.5], [76, 0.5], [74, 0.5], [77, 0.5], [81, 1], [79, 0.5], [76, 0.5], [72, 0.5], [74, 0.5], [76, 2], [0, 1]] },
  calm: { bpm: 66, wave: 'sine', drone: 48, notes: [[60, 2], [64, 1], [67, 1], [69, 2], [67, 1], [64, 1], [62, 2], [60, 3], [0, 1]] },
  romantic: { bpm: 72, wave: 'triangle', drone: 45, notes: [[69, 1.5], [71, 0.5], [72, 1], [76, 2], [74, 1], [72, 1], [71, 2], [69, 1], [67, 1], [69, 3], [0, 1]] },
};

const freq = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

export class Music {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private drone: OscillatorNode | null = null;
  playing = false;

  constructor(private melody: Melody) {}

  start() {
    if (this.playing) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    this.ctx = this.ctx ?? new AC();
    void this.ctx.resume();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.gain.linearRampToValueAtTime(0.16, this.ctx.currentTime + 1.2);
    this.master.connect(this.ctx.destination);
    const tune = TUNES[this.melody];

    if (tune.drone) {
      const d = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      d.type = 'sine';
      d.frequency.value = freq(tune.drone);
      g.gain.value = 0.18;
      d.connect(g).connect(this.master);
      d.start();
      this.drone = d;
    }

    const beat = 60 / tune.bpm;
    const loopLen = tune.notes.reduce((s, [, b]) => s + b, 0) * beat;
    const schedule = (at: number) => {
      let t = at;
      for (const [note, beats] of tune.notes) {
        const len = beats * beat;
        if (note && this.ctx && this.master) {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = tune.wave;
          o.frequency.value = freq(note);
          const peak = tune.wave === 'square' ? 0.08 : 0.32;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(peak, t + 0.03);
          g.gain.exponentialRampToValueAtTime(0.001, t + len * 0.95);
          o.connect(g).connect(this.master);
          o.start(t);
          o.stop(t + len);
        }
        t += len;
      }
    };
    let next = this.ctx.currentTime + 0.2;
    schedule(next);
    next += loopLen;
    // keep one loop scheduled ahead
    this.timer = window.setInterval(() => {
      if (!this.ctx) return;
      if (next - this.ctx.currentTime < 1.5) {
        schedule(next);
        next += loopLen;
      }
    }, 400);
    this.playing = true;
  }

  stop() {
    if (!this.playing || !this.ctx || !this.master) return;
    if (this.timer) clearInterval(this.timer);
    const m = this.master;
    m.gain.cancelScheduledValues(this.ctx.currentTime);
    m.gain.setValueAtTime(m.gain.value, this.ctx.currentTime);
    m.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
    const d = this.drone;
    setTimeout(() => {
      m.disconnect();
      d?.stop();
    }, 500);
    this.drone = null;
    this.master = null;
    this.timer = null;
    this.playing = false;
  }
}
