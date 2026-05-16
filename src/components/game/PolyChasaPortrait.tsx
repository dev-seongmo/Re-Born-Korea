export function PolyChasaPortrait() {
  return (
    <svg
      aria-label="저승 차사 초상화"
      className="poly-chasa"
      role="img"
      viewBox="0 0 220 260"
    >
      <g opacity="0.3">
        <polygon fill="#111823" points="110,216 68,240 152,240" />
        <polygon fill="#162130" points="52,246 88,216 98,260 24,260" />
        <polygon fill="#162130" points="168,246 132,216 122,260 196,260" />
      </g>

      <g id="shoulders">
        <polygon fill="#182232" points="44,248 96,206 98,260 26,260" />
        <polygon fill="#182232" points="176,248 124,206 122,260 194,260" />
        <polygon fill="#232f43" points="94,204 126,204 136,260 84,260" />
      </g>

      <g id="hat">
        <polygon
          fill="#1a2231"
          points="40,86 86,64 134,64 180,86 144,106 76,106"
        />
        <polygon
          fill="#0b1018"
          points="82,42 100,22 140,22 158,42 150,64 90,64"
        />
        <polygon
          fill="#314057"
          opacity="0.5"
          points="84,42 101,24 138,24 126,40 96,40"
        />
      </g>

      <g id="ornaments">
        <polygon fill="#4c5b76" points="74,110 82,118 74,126 66,118" />
        <polygon fill="#60708b" points="68,126 76,134 68,142 60,134" />
        <polygon fill="#7c8aa2" points="63,142 71,150 63,158 55,150" />
        <polygon fill="#4c5b76" points="146,110 154,118 146,126 138,118" />
        <polygon fill="#60708b" points="152,126 160,134 152,142 144,134" />
        <polygon fill="#7c8aa2" points="157,142 165,150 157,158 149,150" />
      </g>

      <g id="hair">
        <polygon fill="#0f1620" points="74,108 88,102 86,184 68,180" />
        <polygon fill="#0f1620" points="146,108 132,102 134,184 152,180" />
      </g>

      <g id="face">
        <polygon
          fill="#ebe1df"
          points="88,96 132,96 152,128 144,168 110,200 76,168 68,128"
        />
        <polygon
          fill="#f6efec"
          opacity="0.78"
          points="88,96 112,98 102,140 76,168 68,128"
        />
        <polygon
          fill="#d8cbca"
          opacity="0.9"
          points="132,96 152,128 144,168 118,140"
        />
        <polygon fill="#ccb7b5" points="104,178 116,178 110,190" />
        <polygon fill="#8b5562" points="98,163 110,159 122,163 116,170 104,170" />
      </g>

      <g id="brows">
        <polygon fill="#253043" points="84,116 101,111 97,118 84,121" />
        <polygon fill="#253043" points="119,111 136,116 136,121 123,118" />
      </g>

      <g id="eyes">
        <polygon fill="#1f2838" points="87,122 101,120 97,124 86,126" />
        <polygon fill="#1f2838" points="119,120 133,122 134,126 123,124" />
        <polygon fill="#a88f95" opacity="0.46" points="84,132 100,130 95,135 83,136" />
        <polygon fill="#a88f95" opacity="0.46" points="120,130 136,132 137,136 125,135" />
      </g>

      <g id="jaw">
        <polygon fill="#eadfdd" points="83,160 110,198 137,160 132,182 110,204 88,182" />
      </g>

      <g id="collar">
        <polygon fill="#1d2635" points="78,194 142,194 162,216 58,216" />
        <polygon fill="#6b2431" points="102,194 118,194 124,216 96,216" />
      </g>
    </svg>
  );
}
