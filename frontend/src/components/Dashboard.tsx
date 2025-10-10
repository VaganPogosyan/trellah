import BoardsList from "./BoardsList";
import NavBar from "./NavBar";

export default function Dashboard() {
  return (
    <div className="mx-auto flex max-w-7xl justify-center py-10">
      <div>
        <BoardsList />
      </div>
    </div>
  );
}
