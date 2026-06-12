import { Howl } from "howler";
import { soundMap, type SoundCue } from "./soundMap";

export class AudioManager {
  private cache = new Map<SoundCue, Howl>();

  play(cue: SoundCue, volume = 1, options: { loop?: boolean } = {}) {
    const sound = this.getOrCreate(cue);
    sound.volume(volume);
    sound.loop(options.loop ?? false);
    sound.play();
  }

  stop(cue: SoundCue) {
    const sound = this.cache.get(cue);
    sound?.stop();
  }

  private getOrCreate(cue: SoundCue) {
    const cached = this.cache.get(cue);
    if (cached) {
      return cached;
    }

    const howl = new Howl({
      src: [soundMap[cue]],
      html5: false,
    });

    this.cache.set(cue, howl);
    return howl;
  }
}

export const audioManager = new AudioManager();
