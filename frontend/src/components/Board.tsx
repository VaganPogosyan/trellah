import Column from "./Column";

interface BoardProps {
  board: {
    id: string;
    name: string;
    description?: string | null;
  };
}

const mockColumns = [
  {
    id: "column-1",
    title: "Backlog",
    cards: [
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
    ],
  },
  {
    id: "column-2",
    title: "In Progress",
    cards: [
      { id: "card-4", title: "Sprint planning" },
      { id: "card-5", title: "Update style guide" },
    ],
  },
  {
    id: "column-3",
    title: "Needs Review",
    cards: [
      { id: "card-6", title: "Board preview component" },
      { id: "card-7", title: "Auth flow QA check" },
    ],
  },
  {
    id: "column-4",
    title: "Done",
    cards: [
      { id: "card-8", title: "Set up FastAPI auth" },
      { id: "card-9", title: "Initial Tailwind palette" },
    ],
  },
];

export default function Board({ board }: BoardProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{board.name}</h1>
          {board.description ? (
            <p className="text-sm text-slate-500">{board.description}</p>
          ) : null}
        </div>
        <div className="flex gap-2 text-sm text-slate-600">
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-1.5 hover:bg-slate-100"
          >
            Add list
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-1.5 hover:bg-slate-100"
          >
            Share
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-4.5rem)] overflow-x-auto">
        <div className="flex h-full min-w-full gap-4 px-6 pb-6">
          {mockColumns.map((column) => (
            <Column key={column.id} title={column.title} cards={column.cards} />
          ))}
        </div>
      </div>
    </div>
  );
}
