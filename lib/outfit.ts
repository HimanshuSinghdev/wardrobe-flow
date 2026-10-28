import { CATEGORIES } from "@/data/categories";
import { getColor, getItem } from "@/lib/wardrobe";
import type { CategoryId, ColorId, Formality, Note, Selection, Verdict } from "@/types";

/** Where each formality band ends. The last band has no upper limit. */
export const BANDS = [
  { label: "Casual", below: 1.75 },
  { label: "Relaxed", below: 2.5 },
  { label: "Smart casual", below: 3.25 },
  { label: "Business", below: 4 },
  { label: "Formal", below: Infinity },
] as const;

export function bandFor(mean: number): string {
  return (BANDS.find((band) => mean < band.below) ?? BANDS[BANDS.length - 1]).label;
}

/** Position on the 1 to 5 scale as a percentage of the tape's width. */
export function toPercent(formality: number): number {
  return ((formality - 1) / 4) * 100;
}

export function emptySelection(): Selection {
  return { tops: null, bottoms: null, footwear: null, accessories: null };
}

interface Placed {
  category: CategoryId;
  name: string;
  formality: Formality;
  colorId: ColorId;
}

function listWords(words: string[]): string {
  if (words.length <= 1) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

export function evaluateOutfit(selection: Selection): Verdict {
  const placed: Placed[] = CATEGORIES.flatMap((category) => {
    const pick = selection[category.id];
    if (!pick) return [];
    const item = getItem(pick.itemId);
    return [{ category: category.id, name: item.name, formality: item.formality, colorId: pick.colorId }];
  });

  if (placed.length === 0) {
    return {
      count: 0,
      mean: null,
      bandLabel: null,
      notes: [{ tone: "info", text: "Pick a piece from any tab to start building an outfit." }],
    };
  }

  const notes: Note[] = [];
  const mean = placed.reduce((sum, p) => sum + p.formality, 0) / placed.length;

  if (placed.length >= 2) {
    const dressiest = placed.reduce((a, b) => (b.formality > a.formality ? b : a));
    const casualest = placed.reduce((a, b) => (b.formality < a.formality ? b : a));
    const gap = dressiest.formality - casualest.formality;

    if (gap >= 3) {
      notes.push({
        tone: "warn",
        text: `${dressiest.name} sits at ${dressiest.formality} on the scale and ${casualest.name.toLowerCase()} at ${casualest.formality}. A gap of three steps or more usually looks accidental. Move one piece toward the other.`,
      });
    } else if (gap === 2) {
      notes.push({
        tone: "info",
        text: "A two-step gap reads as deliberate contrast. Keep the remaining pieces near the middle so it looks chosen.",
      });
    } else if (placed.length >= 3) {
      notes.push({
        tone: "good",
        text: "Every piece sits within one step of the others, so the outfit reads as one idea.",
      });
    }
  }

  if (placed.length >= 2) {
    const accents = new Set(placed.map((p) => p.colorId).filter((id) => !getColor(id).neutral));
    if (accents.size === 0) {
      notes.push({
        tone: "info",
        text: "Every color here is a neutral. That is safe and quiet. One accent color would add interest.",
      });
    } else if (accents.size === 1) {
      notes.push({
        tone: "good",
        text: "One accent color against neutrals is the easiest palette to get right.",
      });
    } else if (accents.size === 2) {
      notes.push({
        tone: "info",
        text: "Two accent colors can work if one is much darker or lighter than the other.",
      });
    } else {
      notes.push({
        tone: "warn",
        text: "Three or more accent colors compete for attention. Keep one as the accent and switch the others to neutrals.",
      });
    }
  }

  const missing = CATEGORIES.filter((c) => !selection[c.id]).map((c) => c.singular);
  if (missing.length > 0 && placed.length >= 2) {
    notes.push({ tone: "info", text: `Still empty: ${listWords(missing)}.` });
  }

  return { count: placed.length, mean, bandLabel: bandFor(mean), notes };
}
