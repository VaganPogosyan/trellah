import AddColumn from "./AddColumn";
import Column from "./Column";

interface BoardProps {
  board: {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
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
  {
    id: "column-5",
    title: "Backlog",
    cards: [
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
    ],
  },
  {
    id: "column-6",
    title: "Backlog",
    cards: [
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
    ],
  },
  {
    id: "column-7",
    title: "Backlog",
    cards: [
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
    ],
  },
  {
    id: "column-8",
    title: "Backlog",
    cards: [
      { id: "card-1", title: "Subscriber onboarding" },
      { id: "card-2", title: "Marketing plan review" },
      { id: "card-3", title: "Brand polish" },
    ],
  },
];

export default function Board({ board }: BoardProps) {
  const backgroundStyle = board.image
    ? {
        backgroundImage: `url(/${board.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <div className="pb-12">
      <div className="fixed h-full w-full -z-50" style={backgroundStyle}></div>
      <div className="fixed z-50 h-12 flex flex-col justify-center w-full pl-6 top-12 bg-gray-100/25">
        <h1 className="text-xl font-semibold text-white drop-shadow-sm/60">
          {board.name}
        </h1>
        {board.description ? (
          <p className="text-xs text-white drop-shadow-sm/60">
            {board.description}
          </p>
        ) : null}
      </div>
      {/* <div className="flex gap-2 text-sm text-slate-600">
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
        </div> */}

      <div className="fixed top-26 h-[97svh] w-full overflow-y-clip overflow-x-auto flex min-w-full gap-4 px-6 pb-6">
        {mockColumns.map((column) => (
          <Column key={column.id} title={column.title} cards={column.cards} />
        ))}
        <AddColumn />
      </div>
    </div>
  );
}
