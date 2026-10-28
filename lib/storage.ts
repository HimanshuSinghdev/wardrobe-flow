import { CATEGORIES } from "@/data/categories";
import { getItem } from "@/lib/wardrobe";
import type { GarmentId, ColorId, Selection } from "@/types";

const KEY = "wardrobe-flow:selection:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Accepts only selections that match the current catalog. Returns null otherwise. */
export function parseSelection(value: unknown): Selection | null {
  if (!isRecord(value)) return null;
  const result: Selection = { tops: null, bottoms: null, footwear: null, accessories: null };

  for (const category of CATEGORIES) {
    const raw = value[category.id];
    if (raw === null || raw === undefined) continue;
    if (!isRecord(raw) || typeof raw.itemId !== "string" || typeof raw.colorId !== "string") return null;

    let item;
    try {
      item = getItem(raw.itemId as GarmentId);
    } catch {
      return null;
    }
    if (item.category !== category.id || !item.colors.includes(raw.colorId as ColorId)) return null;
    result[category.id] = { itemId: item.id, colorId: raw.colorId as ColorId };
  }
  return result;
}

export function loadSelection(): Selection | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? parseSelection(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveSelection(selection: Selection): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(selection));
  } catch {
    // Storage can be blocked or full. The outfit just won't be remembered.
  }
}
