"use client";

import { motion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/cn";
import type { CategoryId, Selection } from "@/types";

interface CategoryTabsProps {
  active: CategoryId;
  selection: Selection;
  onChange: (category: CategoryId) => void;
}

export function CategoryTabs({ active, selection, onChange }: CategoryTabsProps) {
  const refs = useRef<Partial<Record<CategoryId, HTMLButtonElement | null>>>({});

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = CATEGORIES.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;

    event.preventDefault();
    const target = CATEGORIES[next].id;
    onChange(target);
    refs.current[target]?.focus();
  }

  return (
    <div role="tablist" aria-label="Clothing categories" className="flex overflow-x-auto border-b border-chalk">
      {CATEGORIES.map((category, index) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            ref={(node) => {
              refs.current[category.id] = node;
            }}
            type="button"
            role="tab"
            id={`tab-${category.id}`}
            aria-selected={isActive}
            aria-controls="wardrobe-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(category.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "relative flex min-h-12 flex-1 items-center justify-center gap-1.5 px-2 pb-1 text-sm font-semibold transition-colors sm:text-base",
              isActive ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {category.label}
            {selection[category.id] && (
              <span className="size-2 rounded-full bg-mat" role="img" aria-label="has a piece in the outfit" />
            )}
            {isActive && (
              <motion.span
                layoutId="tab-tape"
                className="tape absolute inset-x-0 -bottom-px h-1.5"
                transition={{ type: "spring", stiffness: 520, damping: 40 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
