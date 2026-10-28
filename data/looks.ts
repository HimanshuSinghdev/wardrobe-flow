import type { Look } from "@/types";

export const LOOKS: readonly Look[] = [
  {
    id: "weekend",
    name: "Weekend",
    note: "Four casual pieces that sit at the same level, so nothing fights.",
    picks: {
      tops: { itemId: "tee", colorId: "white" },
      bottoms: { itemId: "jeans", colorId: "denim" },
      footwear: { itemId: "sneakers", colorId: "white" },
      accessories: { itemId: "cap", colorId: "navy" },
    },
  },
  {
    id: "office",
    name: "Office",
    note: "A shirt and trousers with leather shoes. One soft blue is the only color.",
    picks: {
      tops: { itemId: "oxford-shirt", colorId: "sky" },
      bottoms: { itemId: "trousers", colorId: "charcoal" },
      footwear: { itemId: "loafers", colorId: "ink" },
      accessories: { itemId: "watch", colorId: "stone" },
    },
  },
  {
    id: "evening",
    name: "Evening",
    note: "Everything is dark and dressy. The belt matches the shoes.",
    picks: {
      tops: { itemId: "blazer", colorId: "navy" },
      bottoms: { itemId: "trousers", colorId: "charcoal" },
      footwear: { itemId: "oxfords", colorId: "ink" },
      accessories: { itemId: "belt", colorId: "ink" },
    },
  },
  {
    id: "beach",
    name: "Beach",
    note: "A shirt worn open over shorts. The shirt is the only piece that dresses up.",
    picks: {
      tops: { itemId: "oxford-shirt", colorId: "sand" },
      bottoms: { itemId: "shorts", colorId: "navy" },
      footwear: { itemId: "sandals", colorId: "stone" },
      accessories: { itemId: "sunglasses", colorId: "ink" },
    },
  },
  {
    id: "cold-day",
    name: "Cold day",
    note: "Neutral layers with a single mustard scarf as the accent.",
    picks: {
      tops: { itemId: "hoodie", colorId: "charcoal" },
      bottoms: { itemId: "chinos", colorId: "sand" },
      footwear: { itemId: "boots", colorId: "ink" },
      accessories: { itemId: "scarf", colorId: "mustard" },
    },
  },
];
