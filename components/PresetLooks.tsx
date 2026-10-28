import { LOOKS } from "@/data/looks";
import { cn } from "@/lib/cn";
import type { Look, Selection } from "@/types";

interface PresetLooksProps {
  selection: Selection;
  onApply: (look: Look) => void;
}

function matches(look: Look, selection: Selection): boolean {
  return (Object.keys(look.picks) as Array<keyof Selection>).every((category) => {
    const pick = selection[category];
    return pick?.itemId === look.picks[category].itemId && pick.colorId === look.picks[category].colorId;
  });
}

export function PresetLooks({ selection, onApply }: PresetLooksProps) {
  const active = LOOKS.find((look) => matches(look, selection));

  return (
    <section aria-labelledby="looks-title">
      <h2 id="looks-title" className="text-xl font-bold">
        Start from a look
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {LOOKS.map((look) => {
          const isActive = look.id === active?.id;
          return (
            <li key={look.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onApply(look)}
                className={cn(
                  "min-h-11 rounded-full border-2 px-4 text-[15px] font-semibold transition-colors",
                  isActive ? "border-ink bg-ink text-sheet" : "border-chalk bg-sheet hover:border-ink",
                )}
              >
                {look.name}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 min-h-12 max-w-prose text-muted" aria-live="polite">
        {active ? active.note : "You've changed this look. Check the readout to see how it reads now."}
      </p>
    </section>
  );
}
