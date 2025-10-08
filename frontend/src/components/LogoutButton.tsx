import { useNavigate } from "@tanstack/react-router";
import { clearAuthSession } from "../utils/auth";

export default function LogoutButton() {
  const navigate = useNavigate({ from: "/dashboard" });

  const handleLogout = () => {
    clearAuthSession();
    navigate({ to: "/auth", replace: true });
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-md cursor-pointer bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
    >
      Log out
    </button>
  );
}
