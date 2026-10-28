"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useMemo } from "react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ItemDetail } from "@/components/ItemDetail";
import { ItemGrid } from "@/components/ItemGrid";
import { OutfitCanvas } from "@/components/OutfitCanvas";
import { OutfitReadout } from "@/components/OutfitReadout";
import { PresetLooks } from "@/components/PresetLooks";
import { useOutfit } from "@/hooks/useOutfit";
import { evaluateOutfit } from "@/lib/outfit";

export function WardrobeApp() {
  const { state, dispatch } = useOutfit();
  const verdict = useMemo(() => evaluateOutfit(state.selection), [state.selection]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <p className="py-3 font-display text-lg font-bold lg:hidden" aria-hidden>
          Wardrobe Flow
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12 lg:pt-6">
          {/* On phones the canvas stays pinned while the pieces scroll beneath it. */}
          <section
            aria-label="Outfit canvas"
            className="sticky top-0 z-20 -mx-4 bg-paper px-4 pb-2 pt-1 sm:-mx-6 sm:px-6 lg:top-6 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
          >
            <OutfitCanvas
              selection={state.selection}
              activeCategory={state.tab}
              verdict={verdict}
              onSelectSlot={(tab) => dispatch({ type: "tab", tab })}
            />
          </section>

          <main className="min-w-0 space-y-10">
            <header>
              <h1 className="text-5xl font-extrabold sm:text-6xl">Wardrobe Flow</h1>
              <p className="mt-3 max-w-prose text-lg text-muted">
                Pick a top, bottoms, shoes and an accessory. The readout shows how formal the outfit reads and
                where the pieces disagree.
              </p>
            </header>

            <OutfitReadout
              selection={state.selection}
              verdict={verdict}
              onClear={() => dispatch({ type: "clear" })}
            />

            <PresetLooks selection={state.selection} onApply={(look) => dispatch({ type: "look", look })} />

            <section aria-label="Wardrobe">
              <CategoryTabs
                active={state.tab}
                selection={state.selection}
                onChange={(tab) => dispatch({ type: "tab", tab })}
              />
              <div id="wardrobe-panel" role="tabpanel" aria-labelledby={`tab-${state.tab}`} className="pt-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={state.tab}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.16 }}
                    className="space-y-6"
                  >
                    <ItemGrid
                      category={state.tab}
                      pick={state.selection[state.tab]}
                      onToggle={(itemId) => dispatch({ type: "toggle", itemId })}
                    />
                    <ItemDetail
                      category={state.tab}
                      pick={state.selection[state.tab]}
                      onColor={(category, colorId) => dispatch({ type: "color", category, colorId })}
                      onRemove={(category) => {
                        const pick = state.selection[category];
                        if (pick) dispatch({ type: "toggle", itemId: pick.itemId });
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
