interface DeleteBoardModalProps {
  open: boolean;
  boardName: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  error?: string | null;
}

export default function DeleteBoardModal({
  open,
  boardName,
  loading = false,
  onConfirm,
  onCancel,
  error,
}: DeleteBoardModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900">Delete board</h2>
        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{boardName}</span>? This action cannot
          be undone.
        </p>

        {error ? (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
