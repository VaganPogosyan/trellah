import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthSessionValid } from "../utils/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (isAuthSessionValid()) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
