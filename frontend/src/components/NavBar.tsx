import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { AUTH_CHANGE_EVENT } from "../utils/auth";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "../stores.ts/authStore";

export default function NavBar() {
  const isAuthed = useAuthStore((state) => state.isAuthed);
  const sync = useAuthStore((state) => state.sync);

  useEffect(() => {
    const handleAuthChange = () => sync();

    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [sync]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 shadow backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-12">
        <Link to="/dashboard" className="text-lg font-semibold text-indigo-600">
          Trellah
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
          {isAuthed && (
            <Link to="/dashboard" className="hover:text-indigo-500">
              Dashboard
            </Link>
          )}
          {/* <Link
            to="/boards/$boardId"
            params={{ boardId: "design-sprint" }}
            className="hover:text-indigo-500"
          >
            Sample Board
          </Link> */}
          {isAuthed ? (
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
