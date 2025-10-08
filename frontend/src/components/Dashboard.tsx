import { useNavigate } from "@tanstack/react-router";
import { clearAuthSession } from "../utils/auth";
import LogoutButton from "./LogoutButton";
import NavBar from "./NavBar";
import BoardsList from "./BoardsList";

export default function Dashboard() {
  return (
    <div className="">
      <NavBar />
      <div className="mx-auto py-10 flex items-center justify-center max-w-7xl border-2 rounded-2xl">
        <div className="">
          <h1 className="pb-4 text-2xl font-semibold text-slate-900">
            Your Boards
          </h1>
          <BoardsList />
        </div>
      </div>
    </div>
  );
}
