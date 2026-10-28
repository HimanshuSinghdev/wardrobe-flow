import type { Category } from "@/types";

export const CATEGORIES: readonly Category[] = [
  {
    id: "tops",
    label: "Tops",
    singular: "top",
    slotPrompt: "Add a top",
    blurb: "Tops set the tone of an outfit. Start here, because the neckline and sleeve length decide what else works.",
  },
  {
    id: "bottoms",
    label: "Bottoms",
    singular: "bottom",
    slotPrompt: "Add bottoms",
    blurb: "Bottoms carry the outfit's shape. Cut and fabric matter more than color.",
  },
  {
    id: "footwear",
    label: "Footwear",
    singular: "pair of shoes",
    slotPrompt: "Add shoes",
    blurb: "Shoes are the quickest way to move an outfit up or down the formality scale.",
  },
  {
    id: "accessories",
    label: "Accessories",
    singular: "accessory",
    slotPrompt: "Extra",
    blurb: "One accessory is enough. It should finish the outfit, not compete with it.",
  },
];
