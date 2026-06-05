import type { StoryEndingDefinition } from "../../game/content/endings/trueEnding";

type TrueEndingScreenProps = {
  ending: StoryEndingDefinition;
  onComplete: () => void;
};

export function TrueEndingScreen({ ending, onComplete }: TrueEndingScreenProps) {
  return (
    <section className="panel true-ending-screen">
      <div className="panel__header true-ending-screen__header">
        <p className="eyebrow">{ending.eyebrow}</p>
        <h2>{ending.title}</h2>
      </div>

      <div aria-hidden="true" className="true-ending-screen__animation">
        <div className="true-ending-screen__aura" />
        <span className="true-ending-screen__shard true-ending-screen__shard--top-left" />
        <span className="true-ending-screen__shard true-ending-screen__shard--top-right" />
        <span className="true-ending-screen__shard true-ending-screen__shard--left" />
        <span className="true-ending-screen__shard true-ending-screen__shard--right" />
        <span className="true-ending-screen__shard true-ending-screen__shard--bottom-left" />
        <span className="true-ending-screen__shard true-ending-screen__shard--bottom-right" />
        <div className="true-ending-screen__core">
          <div className="true-ending-screen__flame">
            <span className="true-ending-screen__flame-inner" />
          </div>
        </div>
      </div>

      <div className="true-ending-screen__body">
        {ending.paragraphs.map((paragraph: string) => (
          <p className="muted true-ending-screen__paragraph" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <button className="primary-button true-ending-screen__button" onClick={onComplete} type="button">
        {ending.confirmLabel}
      </button>
    </section>
  );
}
