import endingCreditsMusic from "../assets/audio/music/endings/CD1-01-Handel-Rinaldo-Scotto1984-Lascia_chio_pianga.mp3";
import afterlifeAmbientMusic from "../assets/audio/music/gameplay/music_afterlife_ambient_01.wav";
import messageNotificationSound from "../assets/audio/sfx/ui/sfx_message_notification_01.wav";

export const soundMap = {
  "ending.credits": endingCreditsMusic,
  "music.afterlife": afterlifeAmbientMusic,
  "choice.confirm": "/assets/audio/sfx/sfx_choice_confirm_01.wav",
  "message.notification": messageNotificationSound,
} as const;

export type SoundCue = keyof typeof soundMap;
