import { useEffect, useState } from "react";
import { preloadImage } from "../../assets/preload/imagePreloader";
import { fallbackPortrait } from "../../game/content/eventPortraits";

type Props = {
  alt: string;
  src: string;
};

export function CardPortrait({ alt, src }: Props) {
  const [resolvedSrc, setResolvedSrc] = useState(src || fallbackPortrait.src);

  useEffect(() => {
    const nextSrc = src || fallbackPortrait.src;
    let cancelled = false;

    void preloadImage(nextSrc).then(() => {
      if (!cancelled) {
        setResolvedSrc(nextSrc);
      }
    });

    return () => {
      cancelled = true;
    };
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
