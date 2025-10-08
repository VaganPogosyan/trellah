import { Link } from "@tanstack/react-router";

export interface BoardInfo {
  id: string;
  title: string;
  imgSrc?: string;
}

interface BoardPreviewProps {
  board: BoardInfo;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80";

export default function BoardPreview({ board }: BoardPreviewProps) {
  const { id, title, imgSrc } = board;

  return (
    <Link to="/boards/$boardId" params={{ boardId: id }}>
      <div className="w-54 rounded-xl overflow-hidden bg-white shadow-md">
        <div className="group cursor-pointer">
          <div className="overflow-hidden">
            <img
              className="h-24 w-full object-cover transition duration-200 group-hover:brightness-75"
              src={imgSrc ?? FALLBACK_IMAGE}
              alt={`${title}-board-preview`}
            />
          </div>
          <div className="flex w-full justify-start p-4">
            <h3 className="line-clamp-2 text-md font-normal text-gray-900">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
