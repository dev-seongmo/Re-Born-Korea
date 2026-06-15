import { Howl } from "howler";
import { soundMap, type SoundCue } from "./soundMap";

export class AudioManager {
  private cache = new Map<SoundCue, Howl>();

  play(
    cue: SoundCue,
    volume = 1,
    options: { loop?: boolean; restart?: boolean; seek?: number } = {},
  ) {
    const sound = this.getOrCreate(cue);

    if (options.restart) {
      sound.stop();
    }

    sound.volume(volume);
    sound.loop(options.loop ?? false);
    const soundId = sound.play();

    if (typeof options.seek === "number") {
      sound.seek(options.seek, soundId);
    }
  }

  stop(cue: SoundCue) {
    const sound = this.cache.get(cue);

    if (!sound) {
      return;
    }

    sound.stop();
    sound.seek(0);
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
