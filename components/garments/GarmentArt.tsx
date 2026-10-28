import { makePaint } from "@/lib/color";
import { GARMENTS } from "./garments";
import type { GarmentId } from "@/types";

interface GarmentArtProps {
  id: GarmentId;
  hex: string;
  label: string;
  className?: string;
}

/** A single garment drawing as a standalone image, used for item thumbnails. */
export function GarmentArt({ id, hex, label, className }: GarmentArtProps) {
  const garment = GARMENTS[id];
  const [width, height] = garment.size;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label={label}>
      {garment.draw(makePaint(hex))}
    </svg>
  );
}
