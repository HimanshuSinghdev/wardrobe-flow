"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { bandFor } from "@/lib/outfit";
import { getCategory, getColor, getItem } from "@/lib/wardrobe";
import type { CategoryId, ColorId, Pick } from "@/types";

interface ItemDetailProps {
  category: CategoryId;
  pick: Pick | null;
  onColor: (category: CategoryId, colorId: ColorId) => void;
  onRemove: (category: CategoryId) => void;
}

export function ItemDetail({ category, pick, onColor, onRemove }: ItemDetailProps) {
  if (!pick) {
    const meta = getCategory(category);
    return (
      <div className="label-card p-6">
        <p className="relative z-10 max-w-prose text-muted">
          Pick a {meta.singular} above to see how it should fit, when to wear it and which colors it comes in.
        </p>
      </div>
    );
  }

  const item = getItem(pick.itemId);
  const current = getColor(pick.colorId);

  return (
    <motion.div
      key={item.id}
      className="label-card p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold">{item.name}</h3>
          <button
            type="button"
            onClick={() => onRemove(category)}
            className="shrink-0 rounded-md border border-stitch px-3 py-1.5 text-sm font-semibold hover:bg-paper"
          >
            Remove
          </button>
        </div>

        <p className="mt-2 max-w-prose">{item.summary}</p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-muted">How it should fit</dt>
            <dd className="mt-1">{item.fitTip}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted">Good for</dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {item.bestFor.map((occasion) => (
                <span key={occasion} className="rounded-full border border-stitch px-2.5 py-0.5 text-sm">
                  {occasion}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted">Formality</dt>
            <dd className="mt-1">
              {item.formality} of 5 ({bandFor(item.formality).toLowerCase()})
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted" id="color-label">
              Color: {current.name}
            </dt>
            <dd className="mt-1.5">
              <div role="radiogroup" aria-labelledby="color-label" className="flex flex-wrap gap-2">
                {item.colors.map((colorId) => {
                  const color = getColor(colorId);
                  const chosen = colorId === pick.colorId;
                  return (
                    <button
                      key={colorId}
                      type="button"
                      role="radio"
                      aria-checked={chosen}
                      aria-label={color.name}
                      title={color.name}
                      onClick={() => onColor(category, colorId)}
                      className={cn(
                        "size-9 rounded-full border-2 border-ink/30 transition-shadow",
                        chosen && "border-ink ring-2 ring-tape ring-offset-2 ring-offset-sheet",
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </motion.div>
  );
}
