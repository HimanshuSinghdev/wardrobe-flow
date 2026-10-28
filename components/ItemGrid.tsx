import { GarmentArt } from "@/components/garments/GarmentArt";
import { cn } from "@/lib/cn";
import { getColor, getCategory, itemsIn } from "@/lib/wardrobe";
import type { CategoryId, GarmentId, Pick } from "@/types";

interface ItemGridProps {
  category: CategoryId;
  pick: Pick | null;
  onToggle: (itemId: GarmentId) => void;
}

export function ItemGrid({ category, pick, onToggle }: ItemGridProps) {
  const meta = getCategory(category);

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">{meta.label}</h2>
      <p className="mt-1 max-w-prose text-muted">{meta.blurb}</p>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {itemsIn(category).map((item) => {
          const selected = pick?.itemId === item.id;
          const colorId = selected && pick ? pick.colorId : item.colors[0];
          const color = getColor(colorId);
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onToggle(item.id)}
                className={cn(
                  "flex w-full flex-col items-center gap-2 rounded-xl border-2 p-3 text-center transition-colors",
                  selected ? "border-ink bg-sheet ring-2 ring-tape" : "border-chalk bg-paper hover:bg-sheet",
                )}
              >
                <GarmentArt
                  id={item.id}
                  hex={color.hex}
                  label={`${color.name} ${item.name}`}
                  className="h-28 w-full"
                />
                <span className="text-[15px] font-semibold leading-tight">{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
