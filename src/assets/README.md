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
