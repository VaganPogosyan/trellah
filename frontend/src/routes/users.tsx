import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users")({
  component: Users,
});

function Users() {
  return (
    <div className="p-2">
      <h3>Posts</h3>
      <p>Here is where the users will live.</p>
    </div>
  );
}
