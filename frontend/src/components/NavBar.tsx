import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { isAuthSessionValid } from "../utils/auth";
import LogoutButton from "./LogoutButton";

export default function NavBar() {
  // const { data } = useQuery({
  //   queryKey: ["check-auth"],
  //   queryFn: isAuthSessionValid,
  // });

  const authed = isAuthSessionValid();

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-lg font-semibold text-indigo-600">
          Trellah
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
          {authed && (
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
