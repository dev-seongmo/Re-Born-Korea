import { Howl } from "howler";
import { soundMap, type SoundCue } from "./soundMap";

export class AudioManager {
  private cache = new Map<SoundCue, Howl>();
  private stopTimers = new Map<SoundCue, ReturnType<typeof setTimeout>>();

  play(
    cue: SoundCue,
    volume = 1,
    options: { loop?: boolean; restart?: boolean; seek?: number } = {},
  ) {
    const sound = this.getOrCreate(cue);
    const stopTimer = this.stopTimers.get(cue);

    if (stopTimer) {
      clearTimeout(stopTimer);
      this.stopTimers.delete(cue);
    }

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

  stop(cue: SoundCue, options: { fadeMs?: number } = {}) {
    const sound = this.cache.get(cue);

    if (!sound) {
      return;
    }

    const stopTimer = this.stopTimers.get(cue);

    if (stopTimer) {
      clearTimeout(stopTimer);
      this.stopTimers.delete(cue);
    }

    if (options.fadeMs && options.fadeMs > 0 && sound.playing()) {
      sound.fade(sound.volume(), 0, options.fadeMs);

      const nextStopTimer = setTimeout(() => {
        sound.stop();
        sound.seek(0);
        this.stopTimers.delete(cue);
      }, options.fadeMs);

      this.stopTimers.set(cue, nextStopTimer);
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
