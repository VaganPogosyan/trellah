import { Link } from "@tanstack/react-router";

export interface BoardInfo {
  id: string;
  name: string;
  imgSrc?: string;
}

interface BoardPreviewProps {
  board: BoardInfo;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80";

export default function BoardPreview({ board }: BoardPreviewProps) {
  const { id, name, imgSrc } = board;

  return (
    <Link to="/boards/$boardId" params={{ boardId: id }}>
      <div className="group w-54 h-40 rounded-xl overflow-hidden bg-white shadow-md">
        <div className="cursor-pointer  transition duration-200 group-hover:brightness-75">
          <div className="overflow-hidden ">
            <img
              className="h-24 w-full object-cover"
              src={imgSrc ?? FALLBACK_IMAGE}
              alt={`${name}-board-preview`}
            />
          </div>
          <div className="flex w-full justify-start py-2 px-3">
            <h3 className="line-clamp-2 text-md font-normal text-gray-900">
              {name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
