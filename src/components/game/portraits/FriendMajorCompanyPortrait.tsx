export function FriendMajorCompanyPortrait() {
  return (
    <svg
      viewBox="0 0 240 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="대기업에 합격한 친구"
    >
      <defs>
        <linearGradient id="fmc-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5babff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#1a4fa0" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="fmc-ambient" cx="68%" cy="52%" r="55%">
          <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4a9eff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fmc-face-light" cx="38%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#edd5a8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fmc-bottom-fade" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="#0d1117" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Phone ambient glow (background) ── */}
      <ellipse
        cx="168"
        cy="168"
        rx="98"
        ry="88"
        fill="url(#fmc-ambient)"
        className="portrait-screen-pulse"
      />

      {/* ══════════════════════════════════
          FLOAT GROUP – full character rises
         ══════════════════════════════════ */}
      <g className="portrait-float">

        {/* ── Body / shoulders ── */}
        <path
          d="M 0 300
             C 8 256 36 238 64 228
             C 88 220 104 217 120 217
             C 136 217 152 220 176 228
             C 204 238 232 256 240 300 Z"
          fill="#1e2d45"
        />
        {/* Outfit edge highlight */}
        <path
          d="M 64 228
             C 88 220 104 217 120 217
             C 136 217 152 220 176 228
             C 160 222 142 219 120 219
             C 98 219 80 222 64 228 Z"
          fill="#2a3f60"
        />
        {/* V-neck / inner collar */}
        <path
          d="M 109 217 L 120 234 L 131 217
             L 129 211 L 120 228 L 111 211 Z"
          fill="#d5c0a5"
        />
        {/* Collar inner shadow */}
        <path
          d="M 113 217 L 120 228 L 127 217
             L 125 213 L 120 223 L 115 213 Z"
          fill="#b8a285"
        />

        {/* ── Neck ── */}
        <path
          d="M 111 198
             C 111 204 112 212 114 217
             C 117 218 123 218 126 217
             C 128 212 129 204 129 198
             C 125 203 115 203 111 198 Z"
          fill="#d4a574"
        />
        <path
          d="M 111 198
             C 111 202 112 208 114 212
             C 113 209 112 204 113 200 Z"
          fill="#c4936a"
          opacity="0.5"
        />

        {/* ══════════════════════════════════
            HEAD GROUP – gentle sway from neck
           ══════════════════════════════════ */}
        <g className="portrait-head">

          {/* Hair – back layer (drawn before face) */}
          <ellipse cx="120" cy="107" rx="53" ry="49" fill="#1c1410" />
          {/* Side hair drops */}
          <path
            d="M 68 118 C 64 136 65 152 68 166
               C 67 150 66 132 70 118 Z"
            fill="#1c1410"
          />
          <path
            d="M 172 118 C 176 136 175 152 172 166
               C 174 150 174 132 170 118 Z"
            fill="#1c1410"
          />

          {/* Face base */}
          <ellipse cx="120" cy="130" rx="47" ry="53" fill="#d4a574" />
          {/* Face – rim shadow (depth) */}
          <ellipse cx="120" cy="130" rx="47" ry="53" fill="#b8845a" opacity="0.18" />
          {/* Face – phone light on skin */}
          <ellipse cx="120" cy="130" rx="47" ry="53" fill="url(#fmc-face-light)" />

          {/* Hair – front bangs */}
          <path
            d="M 76 112
               C 80 84 100 76 120 75
               C 140 76 160 84 164 112
               C 158 99 142 93 120 93
               C 98 93 82 99 76 112 Z"
            fill="#1c1410"
          />
          {/* Bang inner highlight */}
          <path
            d="M 90 108 C 96 93 108 88 120 88
               C 132 88 144 93 150 108
               C 144 97 133 93 120 93
               C 107 93 96 97 90 108 Z"
            fill="#2e2018"
          />

          {/* Ears */}
          <ellipse cx="73" cy="134" rx="8" ry="11" fill="#c4936a" />
          <ellipse cx="167" cy="134" rx="8" ry="11" fill="#c4936a" />
          <ellipse cx="73" cy="134" rx="4.5" ry="6.5" fill="#a57048" opacity="0.65" />
          <ellipse cx="167" cy="134" rx="4.5" ry="6.5" fill="#a57048" opacity="0.65" />

          {/* Eyebrows – arched up (excited) */}
          <path
            d="M 95 113 Q 105 107 115 111"
            stroke="#3a2418"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <path
            d="M 125 111 Q 135 107 145 113"
            stroke="#3a2418"
            strokeWidth="3.8"
            strokeLinecap="round"
          />

          {/* ── EYES (blink group) ── */}
          <g className="portrait-blink">
            {/* LEFT eye */}
            <ellipse cx="103" cy="125" rx="10.5" ry="12" fill="white" />
            <ellipse cx="103" cy="126" rx="7.5" ry="9" fill="#3d2516" />
            <ellipse cx="103" cy="127" rx="5.5" ry="6.5" fill="#090503" />
            <circle cx="106.5" cy="122.5" r="2.8" fill="white" />
            <circle cx="101" cy="128" r="1.2" fill="white" opacity="0.55" />

            {/* RIGHT eye */}
            <ellipse cx="137" cy="125" rx="10.5" ry="12" fill="white" />
            <ellipse cx="137" cy="126" rx="7.5" ry="9" fill="#3d2516" />
            <ellipse cx="137" cy="127" rx="5.5" ry="6.5" fill="#090503" />
            <circle cx="140.5" cy="122.5" r="2.8" fill="white" />
            <circle cx="135" cy="128" r="1.2" fill="white" opacity="0.55" />
          </g>

          {/* Upper eyelid crease */}
          <path
            d="M 92 120 Q 103 115 114 120"
            stroke="#3a2418"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 126 120 Q 137 115 148 120"
            stroke="#3a2418"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lower lash */}
          <path
            d="M 93 130 Q 103 134 113 130"
            stroke="#b07848"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.38"
          />
          <path
            d="M 127 130 Q 137 134 147 130"
            stroke="#b07848"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.38"
          />

          {/* Nose */}
          <circle cx="116" cy="144" r="2.5" fill="#b07848" opacity="0.45" />
          <circle cx="124" cy="144" r="2.5" fill="#b07848" opacity="0.45" />
          <path
            d="M 116 144 Q 120 148 124 144"
            stroke="#b07848"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Mouth – wide open smile */}
          {/* Upper lip */}
          <path
            d="M 100 155
               Q 109 151 114 153
               Q 118 149 120 151
               Q 122 149 126 153
               Q 131 151 140 155
               Q 130 159 120 159
               Q 110 159 100 155 Z"
            fill="#c27755"
          />
          {/* Mouth cavity */}
          <path
            d="M 100 155 Q 120 175 140 155
               Q 133 167 120 168
               Q 107 167 100 155 Z"
            fill="#7a3526"
          />
          {/* Teeth */}
          <path
            d="M 107 157 Q 120 167 133 157
               Q 129 165 120 166
               Q 111 165 107 157 Z"
            fill="#f2ece5"
          />
          {/* Teeth divider */}
          <line x1="120" y1="157" x2="120" y2="166" stroke="#e0d8ce" strokeWidth="0.8" opacity="0.5" />

          {/* Blush – excited glow */}
          <ellipse cx="86" cy="146" rx="13" ry="8" fill="#e8807a" fillOpacity="0.3" />
          <ellipse cx="154" cy="146" rx="13" ry="8" fill="#e8807a" fillOpacity="0.3" />

        </g>
        {/* ══ END HEAD GROUP ══ */}

        {/* ── Right arm holding phone ── */}
        <path
          d="M 162 250 C 176 228 192 208 196 192 C 200 180 194 170 189 163"
          stroke="#c4936a"
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arm shadow */}
        <path
          d="M 164 252 C 178 230 194 210 198 194 C 202 182 196 172 191 165"
          stroke="#b07848"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.28"
        />
        {/* Hand */}
        <ellipse cx="188" cy="161" rx="16" ry="14" fill="#c4936a" />
        {/* Knuckle shadow */}
        <ellipse cx="188" cy="157" rx="14" ry="7" fill="#b07848" opacity="0.3" />
        {/* Fingers */}
        <path d="M 179 153 C 177 145 178 140 182 141" stroke="#c4936a" strokeWidth="9" strokeLinecap="round" />
        <path d="M 188 151 C 187 143 188 138 192 139" stroke="#c4936a" strokeWidth="9" strokeLinecap="round" />
        <path d="M 196 154 C 196 146 197 142 200 143" stroke="#c4936a" strokeWidth="8" strokeLinecap="round" />
        {/* Finger shadows */}
        <path d="M 179 153 C 177 145 178 140 182 141" stroke="#b07848" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        <path d="M 188 151 C 187 143 188 138 192 139" stroke="#b07848" strokeWidth="4" strokeLinecap="round" opacity="0.3" />

        {/* ══════════════════════════════════
            PHONE GROUP – floats slightly
           ══════════════════════════════════ */}
        <g className="portrait-phone">
          {/* Drop shadow */}
          <rect x="177" y="139" width="42" height="70" rx="7" fill="#000" opacity="0.22" transform="translate(3,4)" />
          {/* Phone body */}
          <rect x="177" y="139" width="42" height="70" rx="7" fill="#111520" />
          {/* Phone inner bezel */}
          <rect x="178" y="140" width="40" height="68" rx="6" fill="#181e30" />
          {/* Camera */}
          <circle cx="198" cy="145" r="3.5" fill="#0c1020" />
          <circle cx="198" cy="145" r="2" fill="#1e2840" />
          <circle cx="197" cy="144" r="0.7" fill="rgba(255,255,255,0.3)" />

          {/* Screen */}
          <rect x="180" y="150" width="36" height="52" rx="4" fill="url(#fmc-screen)" />
          {/* Screen hole-punch notch */}
          <circle cx="198" cy="155" r="3.2" fill="#0d1117" opacity="0.85" />

          {/* Status bar */}
          <rect x="183" y="158" width="14" height="1.5" rx="0.75" fill="white" opacity="0.35" />
          <rect x="203" y="158" width="9" height="1.5" rx="0.75" fill="white" opacity="0.35" />

          {/* ── Notification card ── */}
          <rect x="182" y="164" width="32" height="22" rx="4" fill="rgba(255,255,255,0.14)" />
          {/* App icon */}
          <rect x="185" y="167" width="9" height="9" rx="2.5" fill="#4a9eff" />
          <path
            d="M 186.5 171.5 L 189 174 L 193.5 168"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Notification text */}
          <rect x="196" y="168" width="15" height="2.2" rx="1.1" fill="white" opacity="0.88" />
          <rect x="196" y="173" width="11" height="2" rx="1" fill="white" opacity="0.5" />

          {/* ── Main content – offer letter ── */}
          <rect x="182" y="190" width="32" height="2.2" rx="1.1" fill="white" opacity="0.72" />
          <rect x="182" y="195" width="26" height="2" rx="1" fill="white" opacity="0.5" />
          <rect x="182" y="200" width="29" height="2" rx="1" fill="white" opacity="0.5" />

          {/* Trophy star */}
          <path
            d="M 185 208 L 187 203 L 189 208 L 194 209.5 L 189 211 L 187 216 L 185 211 L 180 209.5 Z"
            fill="#ffd700"
            opacity="0.92"
          />
          {/* "합격" text suggestion (mini pill) */}
          <rect x="196" y="206" width="16" height="8" rx="4" fill="#4a9eff" opacity="0.85" />
          <rect x="199" y="209" width="10" height="2" rx="1" fill="white" opacity="0.9" />

          {/* Bottom home bar */}
          <rect x="191" y="213" width="14" height="2" rx="1" fill="rgba(255,255,255,0.22)" />

          {/* Screen edge gloss */}
          <path
            d="M 180 150 C 180 155 181 156 181 160"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Screen ambient glow (pulsing) */}
          <ellipse
            cx="198"
            cy="176"
            rx="30"
            ry="38"
            fill="#4a9eff"
            fillOpacity="0.13"
            className="portrait-screen-pulse"
          />
        </g>
        {/* ══ END PHONE GROUP ══ */}

        {/* Bottom vignette – grounds the character */}
        <rect x="0" y="220" width="240" height="80" fill="url(#fmc-bottom-fade)" />

      </g>
      {/* ══ END FLOAT GROUP ══ */}

      {/* ══════════════════════════════════
          SPARKLES – outside float group so
          they animate independently
         ══════════════════════════════════ */}

      {/* ── 4-point star helper:
           cx,cy = center  h = half-height  s = half-width ── */}

      {/* Sparkle A – upper-left (gold, large) */}
      <g className="portrait-sparkle-a">
        <path d="M 38 82 L 40.5 75 L 43 82 L 50 84.5 L 43 87 L 40.5 94 L 38 87 L 31 84.5 Z" fill="#ffd700" />
        <path d="M 40.5 75 L 40.5 94 M 31 84.5 L 50 84.5" stroke="#ffd700" strokeWidth="0.6" opacity="0.4" />
      </g>

      {/* Sparkle B – upper-right (gold) */}
      <g className="portrait-sparkle-b">
        <path d="M 200 56 L 202.5 49 L 205 56 L 212 58.5 L 205 61 L 202.5 68 L 200 61 L 193 58.5 Z" fill="#ffd700" />
      </g>

      {/* Sparkle C – right edge (blue, small) */}
      <g className="portrait-sparkle-c">
        <path
          d="M 222 108 L 223.5 104 L 225 108 L 229 109.5 L 225 111 L 223.5 115 L 222 111 L 218 109.5 Z"
          fill="#a0d4ff"
        />
      </g>

      {/* Sparkle D – left edge (gold, tiny) */}
      <g className="portrait-sparkle-d">
        <path
          d="M 22 150 L 23.5 146 L 25 150 L 29 151.5 L 25 153 L 23.5 157 L 22 153 L 18 151.5 Z"
          fill="#ffd700"
          opacity="0.75"
        />
      </g>

      {/* Dot sparkles */}
      <circle cx="54" cy="70" r="3" fill="#ffd700" className="portrait-dot-a" opacity="0.85" />
      <circle cx="186" cy="86" r="2.2" fill="#a0d4ff" className="portrait-dot-b" opacity="0.75" />
      <circle cx="26" cy="112" r="1.8" fill="#ffd700" className="portrait-dot-c" opacity="0.65" />
      <circle cx="210" cy="72" r="1.5" fill="#ffd700" className="portrait-dot-d" opacity="0.6" />
    </svg>
  );
}
