export type CategoryId = "tops" | "bottoms" | "footwear" | "accessories";

export type ColorId =
  | "ink"
  | "white"
  | "stone"
  | "charcoal"
  | "navy"
  | "sand"
  | "denim"
  | "olive"
  | "brick"
  | "sky"
  | "mustard";

export type GarmentId =
  | "tee"
  | "hoodie"
  | "oxford-shirt"
  | "blazer"
  | "jeans"
  | "chinos"
  | "trousers"
  | "shorts"
  | "pleated-skirt"
  | "sneakers"
  | "sandals"
  | "boots"
  | "loafers"
  | "oxfords"
  | "watch"
  | "belt"
  | "cap"
  | "scarf"
  | "sunglasses";

export type Formality = 1 | 2 | 3 | 4 | 5;

export interface ColorOption {
  id: ColorId;
  name: string;
  hex: string;
  /** Neutrals are colors that pair with almost anything. */
  neutral: boolean;
}

export interface Category {
  id: CategoryId;
  label: string;
  /** Short noun used in sentences: "Pick a top". */
  singular: string;
  /** Text shown inside an empty slot on the canvas. */
  slotPrompt: string;
  blurb: string;
}

export interface WardrobeItem {
  id: GarmentId;
  category: CategoryId;
  name: string;
  summary: string;
  fitTip: string;
  bestFor: string[];
  formality: Formality;
  /** First color is the default. */
  colors: ColorId[];
}

export interface Pick {
  itemId: GarmentId;
  colorId: ColorId;
}

export type Selection = Record<CategoryId, Pick | null>;

export interface Look {
  id: string;
  name: string;
  note: string;
  picks: { [K in CategoryId]: Pick };
}

export type NoteTone = "good" | "warn" | "info";

export interface Note {
  tone: NoteTone;
  text: string;
}

export interface Verdict {
  count: number;
  mean: number | null;
  bandLabel: string | null;
  notes: Note[];
}
