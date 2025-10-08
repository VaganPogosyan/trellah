import BoardPreview from "./BoardPreview";

export default function BoardsList() {
  // const boards = getBoards()
  return (
    // <ul>
    //   {boards.map((board) => {
    //     <li>
    //       <BoardPreview />
    //     </li>;
    //   })}
    // </ul>
    <div className="mx-auto">
      <ul className="flex space-x-4 space-y-4">
        <li>
          <BoardPreview />
        </li>
        <li>
          <BoardPreview />
        </li>
        <li>
          <BoardPreview />
        </li>
      </ul>
    </div>
  );
}
