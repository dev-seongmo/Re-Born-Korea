import type { AtmosphereEffect } from "../../game/viewModels/gameScreenViewModel";

type Props = {
  effect?: AtmosphereEffect;
};

export function AtmosphereLayer({ effect }: Props) {
  if (!effect) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`atmosphere-layer atmosphere-layer--${effect}`}
    >
      <span className="atmosphere-layer__veil atmosphere-layer__veil--near" />
      <span className="atmosphere-layer__veil atmosphere-layer__veil--mid" />
      <span className="atmosphere-layer__veil atmosphere-layer__veil--far" />
    </div>
  );
}
