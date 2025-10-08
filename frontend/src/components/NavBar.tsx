import { Link } from "@tanstack/react-router";
import { isAuthSessionValid } from "../utils/auth";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    const result = isAuthSessionValid();
    setAuthed(result);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-lg font-semibold text-indigo-600">
          Trellah
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="hover:text-indigo-500">
            Dashboard
          </Link>
          {/* <Link
            to="/boards/$boardId"
            params={{ boardId: "design-sprint" }}
            className="hover:text-indigo-500"
          >
            Sample Board
          </Link> */}
          {authed ? (
            <LogoutButton />
          ) : (
            <Link to="/auth" className="hover:text-indigo-500">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
