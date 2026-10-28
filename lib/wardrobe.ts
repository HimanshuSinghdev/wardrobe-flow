import { CATEGORIES } from "@/data/categories";
import { COLORS } from "@/data/colors";
import { ITEMS } from "@/data/items";
import type {
  Category,
  CategoryId,
  ColorId,
  ColorOption,
  GarmentId,
  WardrobeItem,
} from "@/types";

const ITEM_BY_ID = new Map<GarmentId, WardrobeItem>(ITEMS.map((item) => [item.id, item]));

export function getItem(id: GarmentId): WardrobeItem {
  const item = ITEM_BY_ID.get(id);
  if (!item) throw new Error(`Unknown garment: ${id}`);
  return item;
}

export function getColor(id: ColorId): ColorOption {
  return COLORS[id];
}

export function getCategory(id: CategoryId): Category {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function itemsIn(category: CategoryId): WardrobeItem[] {
  return ITEMS.filter((item) => item.category === category);
}
