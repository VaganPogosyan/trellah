interface BoardInfo {
  title: string;
  imgSrc: string | undefined;
}

export default function BoardPreview() {
  const boardInfo: BoardInfo = {
    title: "My Board Title Temporary",
    imgSrc:
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  };

  return (
    <div className="max-w-64 rounded-xl overflow-hidden bg-white shadow-md">
      <div className="group cursor-pointer">
        <div className="overflow-hidden">
          <img
            className="h-24 w-full object-cover transition duration-200 group-hover:brightness-75"
            src={boardInfo.imgSrc}
            alt={`${boardInfo.title}-board-preview`}
          />
        </div>
        <div className="p-4">
          <h3 className="text-md font-medium text-gray-900">
            {boardInfo.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
