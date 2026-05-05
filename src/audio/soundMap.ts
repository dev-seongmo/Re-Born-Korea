export const soundMap = {
  "choice.confirm": "/assets/audio/sfx/sfx_choice_confirm_01.wav",
  "dice.roll": "/assets/audio/sfx/sfx_dice_roll_01.wav",
  "ui.collapse": "/assets/audio/sfx/sfx_ui_collapse_01.wav",
  "ambient.tension": "/assets/audio/ambient/amb_tension_loop_01.ogg",
} as const;

export type SoundCue = keyof typeof soundMap;
