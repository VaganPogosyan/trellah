import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Board from "../../components/Board";
import Spinner from "../../components/Spinner";
import { getAccessToken } from "../../utils/auth";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

type BoardData = {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  image: string | null;
};

export const Route = createFileRoute("/boards/$boardId")({
  component: BoardPage,
});

function BoardPage() {
  const { boardId } = Route.useParams();
  const navigate = useNavigate();
  const token = getAccessToken();

  if (!token) {
    navigate({ to: "/auth", replace: true });
    return null;
  }

  const {
    data: board,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        navigate({ to: "/dashboard", replace: true });
        return null;
      }

      if (!response.ok) {
        const detail = await response.json().catch(() => null);
        throw new Error(detail?.detail ?? "Failed to load board.");
      }

      return (await response.json()) as BoardData;
    },
    enabled: Boolean(token),
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Loading board..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center text-slate-600">
        <p>Something went wrong</p>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          onClick={() => navigate({ to: "/dashboard" })}
        >
          Go back to dashboard
        </button>
      </div>
    );
  }

  if (!board) {
    return null;
  }

  return <Board board={board} />;
}
