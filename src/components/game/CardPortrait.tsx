import chasaPortraitImage from "../../assets/images/characters/npc/ChatGPT Image 2026년 5월 16일 오후 07_42_03.png";

export function CardPortrait() {
  return (
    <div className="swipe-card__portrait">
      <img
        alt="Character portrait"
        className="swipe-card__portrait-image"
        src={chasaPortraitImage}
      />
    </div>
  );
}
