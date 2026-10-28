"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { toPercent } from "@/lib/outfit";
import { getItem } from "@/lib/wardrobe";
import type { Selection } from "@/types";

interface FormalityChartProps {
  selection: Selection;
  mean: number | null;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const AXIS = [
  { label: "Casual", at: 0, narrow: true },
  { label: "Relaxed", at: 25, narrow: false },
  { label: "Smart", at: 50, narrow: true },
  { label: "Business", at: 75, narrow: false },
  { label: "Formal", at: 100, narrow: true },
] as const;

/**
 * One row per slot on a shared tape measure. A pin shows where each piece sits
 * on the 1 to 5 formality scale and the vertical line marks the outfit's average.
 */
export function FormalityChart({ selection, mean }: FormalityChartProps) {
  const rows = CATEGORIES.map((category) => {
    const pick = selection[category.id];
    const item = pick ? getItem(pick.itemId) : null;
    return { id: category.id, empty: `No ${category.singular}`, item };
  });

  const summary = rows
    .map((row) => (row.item ? `${row.item.name}: ${row.item.formality} of 5` : row.empty))
    .join(". ");

  return (
    <div role="img" aria-label={`Formality of each piece. ${summary}.`} className="grid grid-cols-[6.5rem_1fr] gap-x-3">
      <div>
        {rows.map((row) => (
          <p
            key={row.id}
            className={`flex h-10 items-center text-sm leading-tight ${row.item ? "font-semibold" : "text-muted"}`}
          >
            {row.item ? row.item.name : row.empty}
          </p>
        ))}
      </div>

      <div className="relative px-6">
        {/* The tape unrolls once on load. */}
        <motion.div
          className="origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          {rows.map((row) => (
            <div key={row.id} className="relative flex h-10 items-center">
              <div className="tape h-2.5 w-full rounded-sm" />
            </div>
          ))}
        </motion.div>

        {/* Pins and the average line are positioned inside the padded area. */}
        <div className="pointer-events-none absolute inset-y-0 inset-x-6" aria-hidden>
          {rows.map((row, index) =>
            row.item ? (
              <motion.span
                key={row.id}
                className="absolute size-5 rounded-full border-2 border-tape bg-ink"
                style={{ top: index * 40 + 10, x: "-50%" }}
                initial={false}
                animate={{ left: `${toPercent(row.item.formality)}%` }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null,
          )}
          {mean !== null && (
            <motion.span
              className="absolute -top-1 h-[calc(100%+0.25rem)] w-0.5 bg-mat"
              style={{ x: "-50%" }}
              initial={false}
              animate={{ left: `${toPercent(mean)}%` }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
        </div>

        <div className="relative mt-2 h-5 text-[13px] text-muted" aria-hidden>
          {AXIS.map((tick) => (
            <span
              key={tick.label}
              className={`absolute -translate-x-1/2 whitespace-nowrap ${tick.narrow ? "" : "hidden min-[430px]:inline"}`}
              style={{ left: `${tick.at}%` }}
            >
              {tick.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
