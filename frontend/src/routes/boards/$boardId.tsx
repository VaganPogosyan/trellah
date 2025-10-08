import { createFileRoute } from "@tanstack/react-router";
import Board from "../../components/Board";

export const Route = createFileRoute("/boards/$boardId")({
  component: renderBoard,
});

function renderBoard() {
  const { boardId } = Route.useParams();
  return <Board />;
}
