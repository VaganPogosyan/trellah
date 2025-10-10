import { useQuery } from "@tanstack/react-query";
import BoardPreview, { type BoardInfo } from "./BoardPreview";
import BoardPreview_CreateNew from "./BoardPreview_CreateNew";
import Spinner from "./Spinner";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

export default function BoardsList() {
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

  const boards = data;
  console.log(boards);

  return (
    <div className="mx-auto">
      <ul className="flex flex-wrap gap-4">
        {boards.map((board: BoardInfo) => (
          <li key={board.id}>
            <BoardPreview board={board} />
          </li>
        ))}
        <li>
          <BoardPreview_CreateNew />
        </li>
      </ul>
    </div>
  );
}
