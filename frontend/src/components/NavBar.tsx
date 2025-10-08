import { Link } from "@tanstack/react-router";
import { isAuthSessionValid } from "../utils/auth";
import LogoutButton from "./LogoutButton";

export default function NavBar() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-lg font-semibold text-indigo-600">
          Trellah
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="hover:text-indigo-500">
            Dashboard
          </Link>
          {isAuthSessionValid() ? null : (
            <Link to="/auth" className="hover:text-indigo-500">
              Sign In
            </Link>
          )}
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}
