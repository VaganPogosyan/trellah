import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

interface AddColumnProps {
  boardId: string;
  onCreated?: () => void;
}

export default function AddColumn() {
  const [addingColumn, setAddingColumn] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  // const mutation = useMutation({
  //   mutationFn: async (columnTitle: string) => {
  //     const token = getAccessToken();
  //     if (!token) {
  //       throw new Error("You must be signed in to create columns.");
  //     }

  //     const response = await fetch(
  //       `${API_BASE_URL}/boards/${boardId}/columns`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ title: columnTitle }),
  //       }
  //     );

  //     if (!response.ok) {
  //       const detail = await response.json().catch(() => null);
  //       throw new Error(detail?.detail ?? "Failed to create column.");
  //     }

  //     return await response.json();
  //   },
  //   onSuccess: () => {
  //     setTitle("");
  //     setAddingColumn(false);
  //     setError(null);
  //     onCreated?.();
  //   },
  //   onError: (err: unknown) => {
  //     setError(err instanceof Error ? err.message : "Failed to create column.");
  //   },
  // });

  const handleCancel = () => {
    // if (mutation.isPending) return;
    setTitle("");
    setError(null);
    setAddingColumn(false);
  };

  const handleSubmit = () => {
    // if (!title.trim() || mutation.isPending) {
    //   return;
  };

  //   mutation.mutate(title.trim());
  // };

  if (addingColumn) {
    return (
      <div className="flex h-fit w-72 shrink-0 flex-col gap-3 rounded-xl bg-slate-200/80 px-3 py-4 text-left text-sm text-slate-600 shadow-sm">
        <input
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Column name"
          // disabled={mutation.isPending}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            // disabled={!title.trim() || mutation.isPending}
          >
            {/* {mutation.isPending ? "Adding…" : "Add Column"} */}Add Column
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer rounded-md bg-transparent px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-400 disabled:cursor-not-allowed"
            // disabled={mutation.isPending}
          >
            Cancel
          </button>
        </div>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="cursor-pointer flex h-12 w-72 shrink-0 rounded-xl bg-slate-200/80 items-center pl-4 text-md text-slate-600 shadow-sm transition hover:bg-slate-300"
      onClick={() => setAddingColumn(true)}
      // disabled={mutation.isPending}
    >
      + Add Column
    </button>
  );
}
