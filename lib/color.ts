export interface Paint {
  /** The garment's main color. */
  base: string;
  /** Stitching, seams and shaded parts. */
  dark: string;
  /** Highlights and small details such as buttons. */
  light: string;
}

type Rgb = [number, number, number];

function parse(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: Rgb): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Blend `a` toward `b` by `t` (0 keeps `a`, 1 returns `b`). */
export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

export function luminance(hex: string): number {
  const [r, g, b] = parse(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Derive the three shades a garment drawing needs from one hex color. */
export function makePaint(hex: string): Paint {
  if (luminance(hex) < 0.06) {
    // Very dark fabric: details have to get lighter to stay visible.
    return { base: hex, dark: mix(hex, "#ffffff", 0.22), light: mix(hex, "#ffffff", 0.32) };
  }
  return { base: hex, dark: mix(hex, "#000000", 0.3), light: mix(hex, "#ffffff", 0.42) };
}
