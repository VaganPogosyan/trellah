import { createFileRoute, redirect } from "@tanstack/react-router";
import Auth from "../components/AuthModal";
import { isAuthSessionValid } from "../utils/auth";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    if (isAuthSessionValid()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Auth,
});
