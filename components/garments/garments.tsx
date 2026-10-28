import type { ReactElement } from "react";
import type { Paint } from "@/lib/color";
import type { GarmentId } from "@/types";

/**
 * Every garment is a flat-lay drawing in its own coordinate space.
 * `draw` returns SVG content only, so the same drawing works as a thumbnail
 * and as a layer on the outfit canvas.
 */
export interface GarmentDrawing {
  size: readonly [width: number, height: number];
  draw: (paint: Paint) => ReactElement;
}

const INK = "#141a2b";
const OUTLINE = {
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

const detail = (color: string, width = 2) =>
  ({ fill: "none", stroke: color, strokeWidth: width, strokeLinecap: "round" }) as const;

/* ------------------------------------------------------------------ tops */

const tee: GarmentDrawing = {
  size: [200, 170],
  draw: (p) => (
    <g>
      <path
        d="M60 12 L84 6 Q100 24 116 6 L140 12 L188 46 L168 74 L146 60 L146 160 L54 160 L54 60 L32 74 L12 46 Z"
        fill={p.base}
        {...OUTLINE}
      />
      <path d="M84 6 Q100 24 116 6" {...detail(p.dark, 3.5)} />
      <path d="M54 60 L60 12 M146 60 L140 12" {...detail(p.dark)} />
      <path d="M54 146 H146" {...detail(p.dark)} strokeDasharray="4 4" />
    </g>
  ),
};

const hoodie: GarmentDrawing = {
  size: [200, 170],
  draw: (p) => (
    <g>
      <path
        d="M60 18 L84 12 Q100 30 116 12 L140 18 L182 46 L194 140 L168 144 L156 76 L146 78 L146 162 L54 162 L54 78 L44 76 L32 144 L6 140 L18 46 Z"
        fill={p.base}
        {...OUTLINE}
      />
      <path d="M72 12 Q100 -4 128 12 L122 34 Q100 46 78 34 Z" fill={p.dark} {...OUTLINE} />
      <path d="M92 42 V72 M108 42 V72" {...detail(p.light, 3)} />
      <path d="M62 112 H138 L144 148 H56 Z" {...detail(p.dark)} />
      <path d="M54 152 H146" {...detail(p.dark)} />
      <path d="M12 128 L36 132 M188 128 L164 132" {...detail(p.dark)} />
    </g>
  ),
};

const oxfordShirt: GarmentDrawing = {
  size: [200, 170],
  draw: (p) => (
    <g>
      <path
        d="M60 12 L84 6 L100 20 L116 6 L140 12 L182 40 L194 136 L170 140 L156 70 L146 72 L146 162 L54 162 L54 72 L44 70 L30 140 L6 136 L18 40 Z"
        fill={p.base}
        {...OUTLINE}
      />
      <path d="M84 6 L100 20 L90 36 L70 16 Z" fill={p.light} {...OUTLINE} strokeWidth={2} />
      <path d="M116 6 L100 20 L110 36 L130 16 Z" fill={p.light} {...OUTLINE} strokeWidth={2} />
      <path d="M100 22 V162" {...detail(p.dark)} />
      <g fill={p.light} stroke={p.dark} strokeWidth={1.2}>
        <circle cx="100" cy="52" r="2.8" />
        <circle cx="100" cy="82" r="2.8" />
        <circle cx="100" cy="112" r="2.8" />
        <circle cx="100" cy="142" r="2.8" />
      </g>
      <path d="M10 122 L33 126 M190 122 L167 126" {...detail(p.dark)} />
    </g>
  ),
};

const blazer: GarmentDrawing = {
  size: [200, 170],
  draw: (p) => (
    <g>
      <path
        d="M58 14 L84 6 L100 28 L116 6 L142 14 L184 42 L194 140 L170 144 L156 72 L148 76 L148 164 L52 164 L52 76 L44 72 L30 144 L6 140 L16 42 Z"
        fill={p.base}
        {...OUTLINE}
      />
      <path d="M84 6 L100 28 L116 6 L108 74 L100 90 L92 74 Z" fill="#E9ECF1" {...OUTLINE} strokeWidth={2} />
      <path d="M84 6 L100 28 L100 100 L64 62 L76 40 L66 24 Z" fill={p.light} {...OUTLINE} strokeWidth={2} />
      <path d="M116 6 L100 28 L100 100 L136 62 L124 40 L134 24 Z" fill={p.light} {...OUTLINE} strokeWidth={2} />
      <path d="M100 100 V164" {...detail(p.dark)} />
      <g fill={p.dark} stroke={INK} strokeWidth={1.2}>
        <circle cx="100" cy="116" r="3.2" />
        <circle cx="100" cy="138" r="3.2" />
      </g>
      <path d="M62 124 H86 M114 124 H138" {...detail(p.dark)} />
    </g>
  ),
};

/* --------------------------------------------------------------- bottoms */

const jeans: GarmentDrawing = {
  size: [200, 240],
  draw: (p) => (
    <g>
      <path d="M52 10 H148 L158 232 H106 L100 74 L94 232 H42 Z" fill={p.base} {...OUTLINE} />
      <path d="M52 10 H148 L149 28 H51 Z" fill={p.dark} {...OUTLINE} strokeWidth={2} />
      <path d="M100 28 V74" {...detail(p.dark)} />
      <path d="M56 30 Q60 54 80 54 M144 30 Q140 54 120 54" {...detail(p.light)} strokeDasharray="3 3" />
      <path d="M44 220 H94 M106 220 H156" {...detail(p.light)} strokeDasharray="4 4" />
      <g fill={p.light}>
        <circle cx="58" cy="32" r="2.2" />
        <circle cx="142" cy="32" r="2.2" />
      </g>
    </g>
  ),
};

const chinos: GarmentDrawing = {
  size: [200, 240],
  draw: (p) => (
    <g>
      <path d="M54 10 H146 L152 224 H106 L100 78 L94 224 H48 Z" fill={p.base} {...OUTLINE} />
      <path d="M54 10 H146 L147 28 H53 Z" fill={p.dark} {...OUTLINE} strokeWidth={2} />
      <path d="M100 28 V78" {...detail(p.dark)} />
      <path d="M56 30 L80 50 M144 30 L120 50" {...detail(p.dark)} />
      <path d="M49 206 H94 M106 206 H151" {...detail(p.dark)} />
    </g>
  ),
};

const trousers: GarmentDrawing = {
  size: [200, 240],
  draw: (p) => (
    <g>
      <path d="M52 10 H148 L162 234 H108 L100 70 L92 234 H38 Z" fill={p.base} {...OUTLINE} />
      <path d="M52 10 H148 L149 26 H51 Z" fill={p.dark} {...OUTLINE} strokeWidth={2} />
      <circle cx="100" cy="18" r="2.6" fill={p.light} />
      <path d="M100 26 V70" {...detail(p.dark)} />
      <path d="M72 28 L66 232 M128 28 L134 232" {...detail(p.light, 1.6)} />
      <path d="M82 28 L84 50 M118 28 L116 50" {...detail(p.dark)} />
    </g>
  ),
};

const shorts: GarmentDrawing = {
  size: [200, 240],
  draw: (p) => (
    <g>
      <path d="M50 10 H150 L162 116 H108 L100 62 L92 116 H38 Z" fill={p.base} {...OUTLINE} />
      <path d="M50 10 H150 L151 28 H49 Z" fill={p.dark} {...OUTLINE} strokeWidth={2} />
      <path d="M100 28 V62" {...detail(p.dark)} />
      <path d="M56 32 Q60 54 78 54 M144 32 Q140 54 122 54" {...detail(p.dark)} />
      <path d="M40 104 H92 M108 104 H160" {...detail(p.dark)} strokeDasharray="4 4" />
    </g>
  ),
};

const pleatedSkirt: GarmentDrawing = {
  size: [200, 240],
  draw: (p) => (
    <g>
      <path d="M58 10 H142 L180 176 H20 Z" fill={p.base} {...OUTLINE} />
      <path d="M58 10 H142 L145 28 H55 Z" fill={p.dark} {...OUTLINE} strokeWidth={2} />
      <path
        d="M66 28 L32 176 M80 28 L58 176 M94 28 L88 176 M106 28 L112 176 M120 28 L142 176 M134 28 L168 176"
        {...detail(p.dark, 1.8)}
      />
    </g>
  ),
};

/* -------------------------------------------------------------- footwear */

const LEATHER_SOLE = "#2A2320";

/** Footwear is drawn as one shoe in profile (about 134 by 70), then shown as a pair. */
function pair(shoe: (p: Paint) => ReactElement): (p: Paint) => ReactElement {
  return (p) => (
    <g>
      <g transform="translate(6 18)" opacity={0.5}>
        {shoe(p)}
      </g>
      <g transform="translate(60 28)">{shoe(p)}</g>
    </g>
  );
}

const sneakers: GarmentDrawing = {
  size: [200, 100],
  draw: pair((p) => (
    <g>
      <path
        d="M4 58 L4 40 Q6 22 24 20 L34 20 Q44 38 62 40 Q104 40 128 50 Q134 54 132 58 Z"
        fill={p.base}
        {...OUTLINE}
      />
      <path d="M46 36 L56 30 M54 40 L64 34 M62 44 L72 38" {...detail(p.light, 2.2)} />
      <path d="M104 44 Q124 46 130 54" {...detail(p.dark)} />
      <path d="M2 56 H134 V64 Q134 68 128 68 H8 Q2 68 2 62 Z" fill="#F2F2EE" {...OUTLINE} />
    </g>
  )),
};

const sandals: GarmentDrawing = {
  size: [200, 100],
  draw: pair((p) => (
    <g>
      <path d="M4 54 Q4 50 10 50 H120 Q134 50 134 58 Q134 66 124 66 H10 Q4 66 4 58 Z" fill={p.dark} {...OUTLINE} />
      <g fill="none" strokeLinecap="round">
        <path d="M38 52 Q62 18 92 52" stroke={INK} strokeWidth={11} />
        <path d="M38 52 Q62 18 92 52" stroke={p.base} strokeWidth={7} />
        <path d="M12 52 Q10 34 26 32" stroke={INK} strokeWidth={11} />
        <path d="M12 52 Q10 34 26 32" stroke={p.base} strokeWidth={7} />
      </g>
    </g>
  )),
};

const boots: GarmentDrawing = {
  size: [200, 100],
  draw: pair((p) => (
    <g>
      <path d="M18 2 H62 L64 34 Q100 36 124 48 Q132 52 130 58 H14 Z" fill={p.base} {...OUTLINE} />
      <path d="M22 22 Q40 32 62 24" {...detail(p.dark, 2.4)} />
      <path d="M12 56 H132 V66 H12 Z" fill={LEATHER_SOLE} {...OUTLINE} />
      <path d="M12 56 H42 V70 H12 Z" fill={LEATHER_SOLE} {...OUTLINE} />
    </g>
  )),
};

const loafers: GarmentDrawing = {
  size: [200, 100],
  draw: pair((p) => (
    <g>
      <path d="M4 58 Q4 36 28 34 Q50 38 70 34 Q112 34 128 48 Q134 52 132 58 Z" fill={p.base} {...OUTLINE} />
      <path d="M60 35 Q76 48 98 40" {...detail(p.dark, 2.2)} />
      <rect x="38" y="38" width="22" height="7" rx="3" fill={p.dark} stroke={INK} strokeWidth={1.5} />
      <path d="M2 56 H134 V63 H2 Z" fill={LEATHER_SOLE} {...OUTLINE} />
      <path d="M2 56 H30 V68 H2 Z" fill={LEATHER_SOLE} {...OUTLINE} />
    </g>
  )),
};

const oxfords: GarmentDrawing = {
  size: [200, 100],
  draw: pair((p) => (
    <g>
      <path d="M4 58 Q4 30 28 28 L50 34 Q96 32 126 50 Q136 54 134 58 Z" fill={p.base} {...OUTLINE} />
      <path d="M52 34 L62 42 M62 33 L72 41 M72 33 L82 41" {...detail(p.light, 2.2)} />
      <path d="M100 40 Q112 48 112 58" {...detail(p.dark)} />
      <path d="M2 56 H134 V63 H2 Z" fill={LEATHER_SOLE} {...OUTLINE} />
      <path d="M2 56 H30 V68 H2 Z" fill={LEATHER_SOLE} {...OUTLINE} />
    </g>
  )),
};

/* ----------------------------------------------------------- accessories */

const watch: GarmentDrawing = {
  size: [100, 100],
  draw: (p) => (
    <g>
      <path d="M38 2 H62 L64 98 H36 Z" fill={p.base} {...OUTLINE} />
      <path d="M50 8 V20 M50 80 V92" {...detail(p.dark)} strokeDasharray="2 5" />
      <rect x="74" y="45" width="6" height="10" rx="2" fill={p.dark} stroke={INK} strokeWidth={1.5} />
      <circle cx="50" cy="50" r="27" fill={p.dark} {...OUTLINE} />
      <circle cx="50" cy="50" r="21" fill="#ECEEF2" stroke={INK} strokeWidth={1.5} />
      <path d="M50 33 V36 M50 64 V67 M33 50 H36 M64 50 H67" {...detail(INK, 1.6)} />
      <path d="M50 50 V38 M50 50 L60 56" {...detail(INK, 2.2)} />
    </g>
  ),
};

const belt: GarmentDrawing = {
  size: [100, 100],
  draw: (p) => (
    <g>
      <path d="M2 38 H98 V62 H2 Z" fill={p.base} {...OUTLINE} />
      <path d="M2 44 H98 M2 56 H98" {...detail(p.dark, 1.4)} strokeDasharray="3 3" />
      <g fill={p.dark}>
        <circle cx="14" cy="50" r="2.2" />
        <circle cx="26" cy="50" r="2.2" />
        <circle cx="38" cy="50" r="2.2" />
      </g>
      <path d="M62 28 H90 V72 H62 Z" fill="none" stroke={INK} strokeWidth={9} strokeLinejoin="round" />
      <path d="M62 28 H90 V72 H62 Z" fill="none" stroke="#C9CDD3" strokeWidth={5} strokeLinejoin="round" />
      <path d="M62 50 H82" {...detail("#C9CDD3", 3)} />
    </g>
  ),
};

const cap: GarmentDrawing = {
  size: [100, 100],
  draw: (p) => (
    <g>
      <path d="M12 68 Q10 26 50 22 Q90 22 92 68 Z" fill={p.base} {...OUTLINE} />
      <path d="M56 62 Q98 56 98 72 Q76 72 54 70 Z" fill={p.dark} {...OUTLINE} />
      <path d="M50 22 Q40 44 46 68" {...detail(p.dark)} />
      <circle cx="50" cy="22" r="3.4" fill={p.dark} stroke={INK} strokeWidth={1.5} />
    </g>
  ),
};

const scarf: GarmentDrawing = {
  size: [100, 100],
  draw: (p) => (
    <g>
      <path d="M44 44 L74 46 L86 94 L54 98 Z" fill={p.base} {...OUTLINE} />
      <path d="M52 68 L80 70 M54 82 L83 84" {...detail(p.light, 2.4)} />
      <path d="M12 24 Q50 2 88 24 L84 48 Q50 66 16 48 Z" fill={p.base} {...OUTLINE} />
      <path d="M18 32 Q50 50 82 32" {...detail(p.light, 2.4)} />
    </g>
  ),
};

const sunglasses: GarmentDrawing = {
  size: [100, 100],
  draw: (p) => (
    <g>
      <path d="M6 38 L2 33 M94 38 L98 33" {...detail(INK, 6)} />
      <path d="M6 38 L2 33 M94 38 L98 33" {...detail(p.base, 3)} />
      <path d="M44 44 Q50 38 56 44" {...detail(INK, 7)} />
      <path d="M44 44 Q50 38 56 44" {...detail(p.base, 3.5)} />
      <path d="M6 38 H44 Q46 64 28 68 Q10 66 6 38 Z" fill="#232b3d" stroke={p.base} strokeWidth={5} strokeLinejoin="round" />
      <path d="M56 38 H94 Q90 66 72 68 Q54 64 56 38 Z" fill="#232b3d" stroke={p.base} strokeWidth={5} strokeLinejoin="round" />
      <path d="M14 46 L22 44 M64 46 L72 44" {...detail("#6d7894", 2)} />
    </g>
  ),
};

export const GARMENTS: Record<GarmentId, GarmentDrawing> = {
  tee,
  hoodie,
  "oxford-shirt": oxfordShirt,
  blazer,
  jeans,
  chinos,
  trousers,
  shorts,
  "pleated-skirt": pleatedSkirt,
  sneakers,
  sandals,
  boots,
  loafers,
  oxfords,
  watch,
  belt,
  cap,
  scarf,
  sunglasses,
};
