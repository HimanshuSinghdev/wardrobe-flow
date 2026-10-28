import { FormalityChart } from "@/components/FormalityChart";
import { cn } from "@/lib/cn";
import type { NoteTone, Selection, Verdict } from "@/types";

interface OutfitReadoutProps {
  selection: Selection;
  verdict: Verdict;
  onClear: () => void;
}

const TONE_BORDER: Record<NoteTone, string> = {
  good: "border-mat",
  warn: "border-tape",
  info: "border-stitch",
};

export function OutfitReadout({ selection, verdict, onClear }: OutfitReadoutProps) {
  return (
    <section aria-labelledby="readout-title" className="label-card p-6">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="readout-title" className="text-2xl font-bold">
              {verdict.bandLabel ?? "Nothing on the mat yet"}
            </h2>
            <p className="mt-1 text-muted">
              {verdict.mean !== null
                ? `Average formality ${verdict.mean.toFixed(1)} of 5`
                : "Choose a piece to see how formal it reads."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClear}
            disabled={verdict.count === 0}
            className="shrink-0 rounded-md border border-stitch px-3 py-1.5 text-sm font-semibold hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear outfit
          </button>
        </div>

        <div className="mt-5">
          <FormalityChart selection={selection} mean={verdict.mean} />
        </div>

        <ul className="mt-6 space-y-2.5">
          {verdict.notes.map((note) => (
            <li key={note.text} className={cn("border-l-4 pl-3 text-[15px] leading-snug", TONE_BORDER[note.tone])}>
              {note.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
