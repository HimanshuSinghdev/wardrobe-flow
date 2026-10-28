"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { makePaint } from "@/lib/color";
import { getCategory, getColor, getItem } from "@/lib/wardrobe";
import { GARMENTS } from "@/components/garments/garments";
import type { CategoryId, Selection, Verdict } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Slot {
  category: CategoryId;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Drawn back to front, so tops overlap the waistband of the bottoms. */
const SLOTS: readonly Slot[] = [
  { category: "bottoms", x: 50, y: 250, w: 200, h: 240 },
  { category: "tops", x: 50, y: 96, w: 200, h: 170 },
  { category: "footwear", x: 50, y: 488, w: 200, h: 100 },
  { category: "accessories", x: 18, y: 12, w: 78, h: 78 },
];

interface OutfitCanvasProps {
  selection: Selection;
  activeCategory: CategoryId;
  verdict: Verdict;
  onSelectSlot: (category: CategoryId) => void;
}

export function OutfitCanvas({ selection, activeCategory, verdict, onSelectSlot }: OutfitCanvasProps) {
  // The first-load sequence is staggered. After it, swaps happen immediately.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="mat on-mat relative h-[42svh] overflow-hidden rounded-2xl lg:h-[calc(100svh-3rem)]">
      <motion.div
        aria-hidden
        className="tape-vertical absolute inset-y-0 left-0 w-7 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: EASE }}
      />

      <div className="flex h-full justify-center py-3 pl-10 pr-3">
        <svg
          viewBox="0 0 300 592"
          className="h-full w-auto max-w-full"
          role="group"
          aria-label="Outfit canvas. Select a slot to change that piece."
        >
          {SLOTS.map((slot, index) => {
            const category = getCategory(slot.category);
            const pick = selection[slot.category];
            const item = pick ? getItem(pick.itemId) : null;
            const drawing = item ? GARMENTS[item.id] : null;
            const color = pick ? getColor(pick.colorId) : null;
            const active = slot.category === activeCategory;
            const label = item && color ? `${color.name} ${item.name}. Change ${category.singular}.` : category.slotPrompt;

            return (
              <g
                key={slot.category}
                role="button"
                tabIndex={0}
                aria-label={label}
                style={{ cursor: "pointer" }}
                onClick={() => onSelectSlot(slot.category)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectSlot(slot.category);
                  }
                }}
              >
                <rect x={slot.x} y={slot.y} width={slot.w} height={slot.h} fill="transparent" />

                {!pick && (
                  <g>
                    <rect
                      x={slot.x + 8}
                      y={slot.y + 8}
                      width={slot.w - 16}
                      height={slot.h - 16}
                      rx={12}
                      fill="none"
                      stroke="rgb(255 255 255 / 0.55)"
                      strokeWidth={1.5}
                      strokeDasharray="6 6"
                    />
                    <text
                      x={slot.x + slot.w / 2}
                      y={slot.y + slot.h / 2 + 4}
                      textAnchor="middle"
                      fill="rgb(255 255 255 / 0.8)"
                      fontSize={slot.category === "accessories" ? 11 : 14}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {category.slotPrompt}
                    </text>
                  </g>
                )}

                <AnimatePresence>
                  {pick && item && drawing && color && (
                    <motion.g
                      key={`${pick.itemId}-${pick.colorId}`}
                      initial={{ opacity: 0, y: -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.14 } }}
                      transition={{ duration: 0.26, ease: EASE, delay: settled ? 0 : 0.55 + index * 0.14 }}
                    >
                      <svg
                        x={slot.x}
                        y={slot.y}
                        width={slot.w}
                        height={slot.h}
                        viewBox={`0 0 ${drawing.size[0]} ${drawing.size[1]}`}
                      >
                        {drawing.draw(makePaint(color.hex))}
                      </svg>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Chalk outline marks the slot that the open tab edits. */}
                <motion.rect
                  x={slot.x - 4}
                  y={slot.y - 4}
                  width={slot.w + 8}
                  height={slot.h + 8}
                  rx={14}
                  fill="none"
                  stroke="var(--color-tape)"
                  strokeWidth={2}
                  strokeDasharray="7 6"
                  pointerEvents="none"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div
        className="tape absolute right-3 top-3 rounded-md px-3 py-1.5 text-right text-ink"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="font-display text-lg font-bold leading-tight">{verdict.bandLabel ?? "Empty mat"}</p>
        {verdict.mean !== null && (
          <p className="text-sm leading-tight">
            {verdict.count} of {CATEGORIES.length} pieces
          </p>
        )}
      </div>
    </div>
  );
}
