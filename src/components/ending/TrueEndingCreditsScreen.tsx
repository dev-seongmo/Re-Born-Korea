import type { TrueEndingCreditsDefinition } from "../../game/content/trueEnding";

type TrueEndingCreditsScreenProps = {
  credits: TrueEndingCreditsDefinition;
  onComplete: () => void;
};

export function TrueEndingCreditsScreen({
  credits,
  onComplete,
}: TrueEndingCreditsScreenProps) {
  return (
    <section className="panel true-ending-credits">
      <div className="panel__header true-ending-credits__header">
        <p className="eyebrow">{credits.eyebrow}</p>
        <h2>{credits.title}</h2>
      </div>

      <div className="true-ending-credits__lines" aria-label="ending credits">
        {credits.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <p className="muted true-ending-credits__outro">{credits.outro}</p>

      <button className="primary-button true-ending-credits__button" onClick={onComplete} type="button">
        {credits.confirmLabel}
      </button>
    </section>
  );
}
