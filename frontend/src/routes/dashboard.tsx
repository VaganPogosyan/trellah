import { createFileRoute, redirect } from "@tanstack/react-router";
import { clearAuthSession, isAuthSessionValid } from "../utils/auth";
import Dashboard from "../components/Dashboard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!isAuthSessionValid()) {
      clearAuthSession();
      throw redirect({ to: "/auth" });
    }
  },
  component: Dashboard,
});
