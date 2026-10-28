import type { ColorId, ColorOption } from "@/types";

export const COLORS: Record<ColorId, ColorOption> = {
  ink: { id: "ink", name: "Ink", hex: "#1B2030", neutral: true },
  white: { id: "white", name: "White", hex: "#F3F3EF", neutral: true },
  stone: { id: "stone", name: "Stone", hex: "#B9B8AE", neutral: true },
  charcoal: { id: "charcoal", name: "Charcoal", hex: "#4B505A", neutral: true },
  navy: { id: "navy", name: "Navy", hex: "#243B63", neutral: true },
  sand: { id: "sand", name: "Sand", hex: "#CDB48A", neutral: true },
  denim: { id: "denim", name: "Denim", hex: "#44698F", neutral: true },
  olive: { id: "olive", name: "Olive", hex: "#667447", neutral: false },
  brick: { id: "brick", name: "Brick", hex: "#A24A3A", neutral: false },
  sky: { id: "sky", name: "Sky", hex: "#8DB3D3", neutral: false },
  mustard: { id: "mustard", name: "Mustard", hex: "#D4A62A", neutral: false },
};
