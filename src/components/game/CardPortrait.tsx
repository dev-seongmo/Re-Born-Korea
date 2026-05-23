import { useEffect, useState } from "react";
import { fallbackPortrait } from "../../game/content/eventPortraits";

type Props = {
  alt: string;
  src: string;
};

export function CardPortrait({ alt, src }: Props) {
  const [resolvedSrc, setResolvedSrc] = useState(src || fallbackPortrait.src);

  useEffect(() => {
    setResolvedSrc(src || fallbackPortrait.src);
  }, [src]);

  return (
    <div className="swipe-card__portrait">
      <img
        alt={alt || fallbackPortrait.alt}
        className="swipe-card__portrait-image"
        onError={() => {
          setResolvedSrc(fallbackPortrait.src);
        }}
        src={resolvedSrc}
      />
    </div>
  );
}
