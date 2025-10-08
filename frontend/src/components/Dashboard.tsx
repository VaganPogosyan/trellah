import BoardsList from "./BoardsList";
import NavBar from "./NavBar";

export default function Dashboard() {
  return (
    <div className="mx-auto flex max-w-7xl justify-center py-10">
      <div>
        <h1 className="pb-4 text-2xl font-semibold text-slate-900">
          Your Boards
        </h1>
        <BoardsList />
      </div>
    </div>
  );
}
