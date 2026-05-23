export const soundMap = {
  "choice.confirm": "/assets/audio/sfx/sfx_choice_confirm_01.wav",
} as const;

export type SoundCue = keyof typeof soundMap;
