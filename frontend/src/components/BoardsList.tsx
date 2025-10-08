import BoardPreview, { type BoardInfo } from "./BoardPreview";

export default function BoardsList() {
  const boards: BoardInfo[] = [
    {
      id: "design-sprint",
      title: "Design Sprint Design Sprint Design Sprint Design Sprint ",
      imgSrc:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "engineering-queue",
      title: "Engineering Queue",
      imgSrc:
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "go-to-market",
      title: "Go To Market",
      imgSrc:
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="mx-auto">
      <ul className="flex flex-wrap gap-4">
        {boards.map((board) => (
          <li key={board.id}>
            <BoardPreview board={board} />
          </li>
        ))}
      </ul>
    </div>
  );
}
