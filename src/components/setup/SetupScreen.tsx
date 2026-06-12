import type { SetupScreenViewModel } from "../../game/viewModels/setupScreenViewModel";

type Props = {
  viewModel: SetupScreenViewModel;
};

type FullscreenRoot = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

function requestGameFullscreen() {
  if (typeof document === "undefined" || document.fullscreenElement) {
    return;
  }

  const root = document.documentElement as FullscreenRoot;
  const requestFullscreen =
    root.requestFullscreen?.bind(root) ?? root.webkitRequestFullscreen?.bind(root);

  if (!requestFullscreen) {
    return;
  }

  void Promise.resolve(requestFullscreen()).catch(() => {
    // Some mobile browsers only allow fullscreen in installed/PWA mode.
  });
}

export function SetupScreen({ viewModel }: Props) {
  function handleStart() {
    requestGameFullscreen();
    viewModel.onStart();
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <p className="eyebrow">Setup</p>
        <h2>{viewModel.title}</h2>
        <p className="muted">{viewModel.description}</p>
      </div>

      <div className="setup-grid">
        {viewModel.fields.map((field) => (
          <label className="field" key={field.key}>
            <span>{field.label}</span>
            <input
              placeholder={field.placeholder}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
            />
          </label>
        ))}
      </div>

      <button
        className="primary-button"
        disabled={!viewModel.canStart}
        onClick={handleStart}
      >
        {viewModel.startLabel}
      </button>
    </section>
  );
}
