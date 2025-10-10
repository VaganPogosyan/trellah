import Card from "./Card";

interface ColumnProps {
  title: string;
  cards: { id: string; title: string }[];
}

export default function Column({ title, cards }: ColumnProps) {
  return (
    <section className="flex w-72 h-fit max-h-11/12 shrink-0 flex-col rounded-xl bg-slate-200/95 px-3 py-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{title}</span>
        <button
          type="button"
          className="cursor-pointer rounded px-2 py-1 text-xs text-slate-600 transition hover:bg-slate-400"
        >
          ···
        </button>
      </header>
      <div className="flex overflow-y-scroll flex-col gap-3">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>

      <button
        type="button"
        className="cursor-pointer rounded-md px-2 py-1 text-left text-sm text-slate-600 transition hover:bg-slate-400"
      >
        + Add card
      </button>
    </section>
  );
}
