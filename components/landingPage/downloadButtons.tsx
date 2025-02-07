import { DownloadButtonsProps } from "@/types";

export const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  onDownload,
}) => {
  return (
    <div className="flex gap-2 mt-4">
      <button
        className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        onClick={() => onDownload("png")}
      >
        Download PNG
      </button>
      <button
        className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        onClick={() => onDownload("jpg")}
      >
        Download JPG
      </button>
    </div>
  );
};
