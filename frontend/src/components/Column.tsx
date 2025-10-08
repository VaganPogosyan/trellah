import Card from "./Card";

interface ColumnProps {
  title: string;
  cards: { id: string; title: string }[];
}

export default function Column({ title, cards }: ColumnProps) {
  return (
    <section className="flex w-72 shrink-0 flex-col rounded-xl bg-slate-100/80 px-3 py-4">
      <header className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{title}</span>
        <button
          type="button"
          className="rounded px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-200"
        >
          ···
        </button>
      </header>
      <div className="flex h-full flex-col gap-3 overflow-y-auto pr-1">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>
      <button
        type="button"
        className="mt-3 rounded-md px-2 py-1 text-left text-sm text-slate-500 transition hover:bg-slate-200"
      >
        + Add card
      </button>
    </section>
  );
}
