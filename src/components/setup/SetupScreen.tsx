import type { SetupScreenViewModel } from "../../game/viewModels/setupScreenViewModel";

type Props = {
  viewModel: SetupScreenViewModel;
};

export function SetupScreen({ viewModel }: Props) {
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
              placeholder="이름을 입력하세요"
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
            />
          </label>
        ))}
      </div>

      <button
        className="primary-button"
        disabled={!viewModel.canStart}
        onClick={viewModel.onStart}
      >
        {viewModel.startLabel}
      </button>
    </section>
  );
}
