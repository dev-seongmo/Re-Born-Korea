import endingCreditsMusic from "../assets/audio/music/endings/CD1-01-Handel-Rinaldo-Scotto1984-Lascia_chio_pianga.mp3";

export const soundMap = {
  "ending.credits": endingCreditsMusic,
  "choice.confirm": "/assets/audio/sfx/sfx_choice_confirm_01.wav",
} as const;

export type SoundCue = keyof typeof soundMap;
