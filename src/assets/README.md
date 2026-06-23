# Asset Structure

This folder is for source-managed game assets used by the web build.

## Top-Level Rules

- Keep file names semantic and consistent.
- Prefer lowercase `snake_case`.
- Separate raw source assets from export-ready game assets when needed.
- Do not mix UI, character art, VFX, and audio in the same folder.

## Main Categories

- `images/`: rendered 2D image assets
- `audio/`: music, ambience, voice, and sound effects
- `fonts/`: local font files if the project ships them
- `data/`: non-code asset metadata such as manifests or localization payloads

## Suggested Naming

- `bg_city_night_01.png`
- `char_student_default_01.png`
- `ui_metric_spec_icon.png`
- `fx_crack_shard_01.png`
- `sfx_choice_confirm_01.wav`
- `bgm_title_theme_01.ogg`

## Current Runtime Audio

- `audio/music/gameplay/music_afterlife_ambient_01.wav`: afterlife ambience, started from the setup screen and stopped after tutorial flow.
- `audio/sfx/ui/sfx_message_notification_01.wav`: played when the phone-style employment result message appears.
- `audio/music/endings/CD1-01-Handel-Rinaldo-Scotto1984-Lascia_chio_pianga.mp3`: true-ending credits music, started from 35 seconds.

## Git Note

The root `.gitignore` ignores most files under `src/assets/**/*`.
When an added image or audio file must ship with the game, add it intentionally with `git add -f`.
