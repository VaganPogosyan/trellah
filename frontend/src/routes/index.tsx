import { createFileRoute } from "@tanstack/react-router";

const API = import.meta.env.VITE_API_URL;

console.log(API);

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  );
}
