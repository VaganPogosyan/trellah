import { FormEvent, useState } from "react";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

interface CreateNewBoardModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (boardId: string) => void;
}

export default function CreateNewBoardModal({
  open,
  onClose,
  onCreated,
}: CreateNewBoardModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name) {
      setError("Board name is required.");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setError("You must be signed in to create a board.");
      return;
    }

    setLoading(true);
    try {
      const meResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!meResponse.ok) {
        throw new Error("Unable to determine current user.");
      }

      const meData = await meResponse.json();

      const createResponse = await fetch(`${API_BASE_URL}/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          owner_id: meData.id,
        }),
      });

      if (!createResponse.ok) {
        const detail = await createResponse.json().catch(() => null);
        throw new Error(
          detail?.detail ?? "Unable to create board. Please try again."
        );
      }

      const board = await createResponse.json();
      onCreated?.(board.id);
      onClose();
      setName("");
      setDescription("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onClose();
      setName("");
      setDescription("");
      setError(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        noValidate
      >
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold text-slate-900">Create board</h2>
          <p className="text-sm text-slate-600">
            Organize tasks by creating a new board.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-left text-sm font-medium text-slate-700">
            Board name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              disabled={loading}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed"
              placeholder="Design Sprint"
            />
          </label>

          <label className="block text-left text-sm font-medium text-slate-700">
            Description <span className="text-slate-400">(optional)</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={loading}
              rows={4}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed"
              placeholder="What is this board about?"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating…" : "Create board"}
          </button>
        </div>
      </form>
    </div>
  );
}
