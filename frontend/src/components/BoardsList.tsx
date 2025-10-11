import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import BoardPreview, { type BoardInfo } from "./BoardPreview";
import BoardPreview_CreateNew from "./BoardPreview_CreateNew";
import Spinner from "./Spinner";
import DeleteBoardModal from "./DeleteBoardModal";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

export default function BoardsList() {
  const queryClient = useQueryClient();
  const [boardToDelete, setBoardToDelete] = useState<BoardInfo | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // const boards: BoardInfo[] = [
  //   {
  //     id: "design-sprint",
  //     title: "Design Sprint Design Sprint Design Sprint Design Sprint ",
  //     imgSrc:
  //       "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
  //   },
  //   {
  //     id: "engineering-queue",
  //     title: "Engineering Queue",
  //     imgSrc:
  //       "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=800&q=80",
  //   },
  //   {
  //     id: "go-to-market",
  //     title: "Go To Market",
  //     imgSrc:
  //       "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=800&q=80",
  //   },
  // ];

  const fetchAllBoards = async () => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("You must be signed in to view boards.");
    }
    const response = await fetch(`${API_BASE_URL}/boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const detail = await response.json().catch(() => null);
      throw new Error(detail?.detail ?? "Unable to load boards.");
    }
    return await response.json();
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchAllBoards,
  });

  const deleteBoard = useMutation({
    mutationFn: async (boardId: string) => {
      const token = getAccessToken();
      if (!token) {
        throw new Error("You must be signed in to delete boards.");
      }

      const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const detail = await response.json().catch(() => null);
        throw new Error(detail?.detail ?? "Failed to delete board.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setBoardToDelete(null);
      setDeleteError(null);
    },
    onError: (err: unknown) => {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete board.");
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner label="Loading boards..." />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const boards = data as BoardInfo[];

  return (
    <div className="mx-auto mt-20 flex flex-col">
      <h1 className="pb-4 pl-24 text-2xl font-semibold text-slate-900">
        Your Boards
      </h1>

      <div className="flex">
        <ul className="flex flex-wrap gap-4 pl-16">
          {boards.map((board) => (
            <li key={board.id}>
              <BoardPreview
                board={board}
                onDelete={(selected) => {
                  setBoardToDelete(selected);
                  setDeleteError(null);
                }}
              />
            </li>
          ))}
          <li>
            <BoardPreview_CreateNew />
          </li>
        </ul>
      </div>

      <DeleteBoardModal
        open={Boolean(boardToDelete)}
        boardName={boardToDelete?.name ?? ""}
        loading={deleteBoard.isPending}
        error={deleteError}
        onCancel={() => {
          if (!deleteBoard.isPending) {
            setBoardToDelete(null);
            setDeleteError(null);
          }
        }}
        onConfirm={() => {
          if (boardToDelete) {
            deleteBoard.mutate(boardToDelete.id);
          }
        }}
      />
    </div>
  );
}
