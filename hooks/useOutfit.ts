"use client";

import { useEffect, useReducer, useState } from "react";
import { LOOKS } from "@/data/looks";
import { emptySelection } from "@/lib/outfit";
import { loadSelection, saveSelection } from "@/lib/storage";
import { getItem } from "@/lib/wardrobe";
import type { CategoryId, ColorId, GarmentId, Look, Selection } from "@/types";

export interface OutfitState {
  tab: CategoryId;
  selection: Selection;
}

export type OutfitAction =
  | { type: "tab"; tab: CategoryId }
  | { type: "toggle"; itemId: GarmentId }
  | { type: "color"; category: CategoryId; colorId: ColorId }
  | { type: "look"; look: Look }
  | { type: "clear" }
  | { type: "restore"; selection: Selection };

export function initialState(): OutfitState {
  return { tab: "tops", selection: { ...LOOKS[0].picks } };
}

/** Pure reducer: every state change in the app goes through here. */
export function outfitReducer(state: OutfitState, action: OutfitAction): OutfitState {
  switch (action.type) {
    case "tab":
      return { ...state, tab: action.tab };

    case "toggle": {
      const item = getItem(action.itemId);
      const current = state.selection[item.category];
      if (current?.itemId === item.id) {
        return { ...state, selection: { ...state.selection, [item.category]: null } };
      }
      // Keep the color the person already chose when the new piece comes in that color.
      const colorId = current && item.colors.includes(current.colorId) ? current.colorId : item.colors[0];
      return {
        ...state,
        selection: { ...state.selection, [item.category]: { itemId: item.id, colorId } },
      };
    }

    case "color": {
      const current = state.selection[action.category];
      if (!current) return state;
      return {
        ...state,
        selection: { ...state.selection, [action.category]: { ...current, colorId: action.colorId } },
      };
    }

    case "look":
      return { ...state, selection: { ...action.look.picks } };

    case "clear":
      return { ...state, selection: emptySelection() };

    case "restore":
      return { ...state, selection: action.selection };
  }
}

export function useOutfit() {
  const [state, dispatch] = useReducer(outfitReducer, undefined, initialState);
  const [restored, setRestored] = useState(false);

  // Read any saved outfit once, after the first render, so server and client HTML match.
  useEffect(() => {
    const saved = loadSelection();
    if (saved) dispatch({ type: "restore", selection: saved });
    setRestored(true);
  }, []);

  useEffect(() => {
    if (restored) saveSelection(state.selection);
  }, [restored, state.selection]);

  return { state, dispatch };
}
