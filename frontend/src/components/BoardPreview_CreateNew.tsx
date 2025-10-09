import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import CreateNewBoardModal from "./CreateNewBoardModal";

export interface BoardInfo {
  id: string;
  title: string;
  imgSrc?: string;
}

interface BoardPreviewProps {
  board: BoardInfo;
}

export default function BoardPreview_CreateNew() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreated = (boardId: string) => {
    setOpen(false);
    navigate({
      to: "/boards/$boardId",
      params: { boardId },
      replace: true,
    });
  };

  return (
    <>
      <div
        className="flex h-40 w-54 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-center shadow-md transition hover:bg-slate-50"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <h3 className="text-md font-medium text-slate-900">Create board</h3>
      </div>

      <CreateNewBoardModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleCreated}
      />
    </>
  );
}
