import { Link } from "@tanstack/react-router";

export interface BoardInfo {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
}

interface BoardPreviewProps {
  board: BoardInfo;
  onDelete?: (board: BoardInfo) => void;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80";

export default function BoardPreview({ board, onDelete }: BoardPreviewProps) {
  const { id, name, image } = board;
  const lowResImage = image?.replace(/\.jpg$/i, "_low.jpg");

  return (
    <Link
      to="/boards/$boardId"
      params={{ boardId: id }}
      className="relative block"
    >
      <div className="group h-40 w-54 overflow-hidden rounded-xl bg-white shadow-md">
        <div className="transition duration-200 group-hover:brightness-75">
          <div className="overflow-hidden">
            <img
              className="h-24 w-full object-cover"
              src={
                lowResImage
                  ? `/${lowResImage}`
                  : image
                    ? `/${image}`
                    : FALLBACK_IMAGE
              }
              alt={`${name}-board-preview`}
            />
          </div>
          <div className="flex w-full justify-start px-3 py-2">
            <h3 className="line-clamp-2 text-md font-normal text-gray-900">
              {name}
            </h3>
          </div>
        </div>
        {onDelete ? (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDelete(board);
            }}
            className="cursor-pointer absolute right-3 top-3 hidden rounded-md p-1 text-white transition bg-black/75 hover:bg-red-700/75 group-hover:block"
          >
            <svg
              className="fill-white flex justify-center items-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              style={{ width: 20 }}
            >
              <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
              {/* <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" /> */}
            </svg>
          </button>
        ) : null}
      </div>
    </Link>
  );
}
