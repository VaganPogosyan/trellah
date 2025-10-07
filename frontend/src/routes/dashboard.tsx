import { createFileRoute, redirect } from "@tanstack/react-router";
import { clearAuthSession, isAuthSessionValid } from "../utils/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!isAuthSessionValid()) {
      clearAuthSession();
      throw redirect({ to: "/auth" });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-2">
      <h3>Dashboard</h3>
    </div>
  );
}
