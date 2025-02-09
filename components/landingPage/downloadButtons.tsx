import React from "react";

export interface DownloadButtonsProps {
  onDownload: (format: "png" | "jpg") => void;
}

export const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  onDownload,
}) => {
  return (
    <div className="flex gap-2 mt-">
      <button
        className="bg-gray-900 px-2 md:px-4 text-sm md:text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        onClick={() => onDownload("png")}
      >
        Download PNG
      </button>
      <button
        className="bg-gray-900 px-2 md:px-4 text-sm md:text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        onClick={() => onDownload("jpg")}
      >
        Download JPG
      </button>
    </div>
  );
};
