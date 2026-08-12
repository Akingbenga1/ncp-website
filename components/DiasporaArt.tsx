export function AdirePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="adire" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" />
          <path
            d="M20 4 L36 20 L20 36 L4 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="0" cy="0" r="1.4" fill="currentColor" />
          <circle cx="40" cy="0" r="1.4" fill="currentColor" />
          <circle cx="0" cy="40" r="1.4" fill="currentColor" />
          <circle cx="40" cy="40" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#adire)" />
    </svg>
  );
}

export function NigeriaScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 420 280"
      role="img"
      aria-label="Stylised Nigeria: two rivers meeting under a bright sun"
    >
      <rect width="420" height="280" fill="var(--color-primary-dark)" />
      <path
        d="M0 210 C80 190 140 230 210 200 C280 170 340 220 420 190 L420 280 L0 280 Z"
        fill="var(--color-primary)"
        opacity="0.55"
      />
      <path
        d="M40 0 L70 280"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        opacity="0.25"
      />
      <circle cx="318" cy="58" r="28" fill="var(--color-accent)" />
      <path
        d="M86 42 C120 90 150 150 168 268"
        fill="none"
        stroke="var(--color-on-primary)"
        strokeWidth="7"
        strokeLinecap="round"
        className="river-line"
      />
      <path
        d="M338 36 C300 88 250 150 168 268"
        fill="none"
        stroke="var(--color-on-primary)"
        strokeWidth="7"
        strokeLinecap="round"
        className="river-line"
      />
      <text
        x="28"
        y="248"
        fill="var(--color-accent)"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3"
      >
        NIGERIA
      </text>
    </svg>
  );
}

export function PeterboroughScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 420 280"
      role="img"
      aria-label="Stylised Peterborough: cathedral spire, terraces, and community bunting"
    >
      <rect width="420" height="280" fill="#e8ebe4" />
      <rect x="0" y="188" width="420" height="92" fill="#d5dbd0" />
      <path d="M168 188 L210 72 L252 188 Z" fill="var(--color-primary-dark)" />
      <rect x="186" y="128" width="48" height="60" fill="var(--color-primary)" />
      <rect x="198" y="148" width="10" height="16" fill="var(--color-accent)" />
      <rect x="212" y="148" width="10" height="16" fill="var(--color-on-primary)" />
      <rect x="36" y="168" width="52" height="52" fill="var(--color-primary)" />
      <rect x="96" y="176" width="44" height="44" fill="var(--color-primary-dark)" />
      <rect x="280" y="172" width="48" height="48" fill="var(--color-primary)" />
      <rect x="336" y="164" width="52" height="56" fill="var(--color-primary-dark)" />
      <path
        d="M36 168 L62 148 L88 168"
        fill="var(--color-primary-dark)"
      />
      <path
        d="M96 176 L118 158 L140 176"
        fill="var(--color-primary)"
      />
      <path
        d="M280 172 L304 154 L328 172"
        fill="var(--color-primary-dark)"
      />
      <path
        d="M336 164 L362 144 L388 164"
        fill="var(--color-primary)"
      />
      <path
        d="M24 132 C90 118 150 142 210 124 C270 106 330 130 396 116"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
        className="bunting-line"
      />
      <path d="M70 126 L82 146 L58 146 Z" fill="var(--color-primary)" />
      <path d="M140 128 L152 148 L128 148 Z" fill="var(--color-on-primary)" />
      <path d="M210 120 L222 140 L198 140 Z" fill="var(--color-accent)" />
      <path d="M282 122 L294 142 L270 142 Z" fill="var(--color-primary)" />
      <path d="M350 118 L362 138 L338 138 Z" fill="var(--color-on-primary)" />
      <text
        x="28"
        y="248"
        fill="var(--color-primary-dark)"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3"
      >
        PETERBOROUGH
      </text>
    </svg>
  );
}

export function BridgeArc() {
  return (
    <svg
      className="bridge-svg"
      viewBox="0 0 200 120"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="bridge-arc"
        d="M12 88 C 70 8, 130 8, 188 88"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <circle cx="12" cy="88" r="6" fill="var(--color-accent)" />
      <circle cx="188" cy="88" r="6" fill="var(--color-primary)" />
    </svg>
  );
}

export function GatheringScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 480 320"
      role="img"
      aria-label="A circle of people gathered around a shared table"
    >
      <rect width="480" height="320" fill="var(--color-primary-dark)" />
      <circle cx="240" cy="168" r="46" fill="var(--color-accent)" />
      <circle cx="240" cy="168" r="22" fill="var(--color-on-primary)" />
      <g fill="none" stroke="var(--color-on-primary)" strokeWidth="3.2" strokeLinecap="round">
        <circle cx="240" cy="64" r="16" />
        <path d="M214 118c6-22 18-32 26-32s20 10 26 32" />
        <circle cx="132" cy="118" r="16" />
        <path d="M108 176c4-24 16-36 24-36s20 12 24 36" />
        <circle cx="348" cy="118" r="16" />
        <path d="M324 176c4-24 16-36 24-36s20 12 24 36" />
        <circle cx="108" cy="230" r="16" />
        <path d="M86 292c4-24 14-36 22-36s18 12 22 36" />
        <circle cx="372" cy="230" r="16" />
        <path d="M350 292c4-24 14-36 22-36s18 12 22 36" />
        <circle cx="186" cy="268" r="14" />
        <circle cx="294" cy="268" r="14" />
      </g>
      <circle cx="186" cy="268" r="14" fill="none" stroke="var(--color-accent)" strokeWidth="3.2" />
      <circle cx="294" cy="268" r="14" fill="none" stroke="var(--color-accent)" strokeWidth="3.2" />
    </svg>
  );
}

export function TableScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 480 320"
      role="img"
      aria-label="A shared table with a green and white runner"
    >
      <rect width="480" height="320" fill="#eef1ea" />
      <ellipse cx="240" cy="176" rx="176" ry="86" fill="var(--color-primary-dark)" />
      <rect x="228" y="88" width="24" height="176" fill="var(--color-on-primary)" />
      <rect x="220" y="88" width="8" height="176" fill="var(--color-primary)" />
      <rect x="252" y="88" width="8" height="176" fill="var(--color-accent)" />
      <ellipse cx="168" cy="156" rx="28" ry="16" fill="var(--color-accent)" />
      <ellipse cx="312" cy="156" rx="28" ry="16" fill="var(--color-accent)" />
      <ellipse cx="240" cy="132" rx="26" ry="14" fill="var(--color-on-primary)" />
      <ellipse cx="196" cy="204" rx="22" ry="12" fill="var(--color-on-primary)" />
      <ellipse cx="284" cy="204" rx="22" ry="12" fill="var(--color-on-primary)" />
      <path
        d="M86 176 C120 120 180 96 240 96"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M394 176 C360 120 300 96 240 96"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LanguageScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 480 320"
      role="img"
      aria-label="The word home in Yoruba, Igbo, Hausa and English"
    >
      <rect width="480" height="320" fill="var(--color-primary)" />
      <text
        x="36"
        y="92"
        fill="var(--color-accent)"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="64"
        fontWeight="800"
      >
        Ilé
      </text>
      <text
        x="200"
        y="168"
        fill="var(--color-on-primary)"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="58"
        fontWeight="800"
      >
        Ụlọ
      </text>
      <text
        x="36"
        y="236"
        fill="rgba(255,255,255,0.72)"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="52"
        fontWeight="800"
      >
        Gida
      </text>
      <text
        x="250"
        y="286"
        fill="var(--color-accent)"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="4"
      >
        HOME
      </text>
    </svg>
  );
}

export function WelcomeScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 480 320"
      role="img"
      aria-label="An open doorway with figures walking toward the light"
    >
      <rect width="480" height="320" fill="#dfe5d8" />
      <rect x="168" y="48" width="144" height="220" fill="var(--color-primary-dark)" />
      <rect x="186" y="66" width="108" height="202" fill="var(--color-accent)" />
      <rect x="198" y="78" width="84" height="190" fill="var(--color-on-primary)" />
      <circle cx="132" cy="196" r="16" fill="var(--color-primary)" />
      <path d="M108 268c6-32 14-44 24-44s18 12 24 44" fill="var(--color-primary)" />
      <circle cx="92" cy="214" r="12" fill="var(--color-primary-dark)" />
      <path d="M74 268c4-24 10-34 18-34s14 10 18 34" fill="var(--color-primary-dark)" />
      <circle cx="348" cy="200" r="16" fill="var(--color-primary-dark)" />
      <path d="M324 268c6-30 14-42 24-42s18 12 24 42" fill="var(--color-primary-dark)" />
    </svg>
  );
}
