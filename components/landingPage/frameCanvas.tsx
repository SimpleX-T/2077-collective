import React from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa6";

export interface FrameCanvasProps {
  type: "pfp" | "cover";
  image: string | null;
  selectedFrame: {
    id: string;
    name: string;
    shape: string;
    backgroundImage: string;
  };
  imagePosition: { x: number; y: number };
  imageScale: number;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  isDragOver: boolean;
  onFileInputClick: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export const FrameCanvas: React.FC<FrameCanvasProps> = ({
  type,
  image,
  selectedFrame,
  imagePosition,
  imageScale,
  fileInputRef,
  canvasRef,
  isDragOver,
  onFileInputClick,
  onImageUpload,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  // Determine container classes based on the type of frame
  let containerClasses = "";
  if (type === "cover") {
    containerClasses = "w-full max-w-[1000px] aspect-[3/1]"; // a wide rectangle for cover photos
  } else {
    // Profile picture – square area (can be circular if the frame calls for it)
    containerClasses = "w-32 md:w-36 aspect-square";
  }

  const frameRounding =
    selectedFrame.shape === "circle" ? "rounded-full" : "rounded";

  return (
    <div
      ref={canvasRef}
      className={`cursor-pointer bg-[#081F2B] ${containerClasses} transition-all duration-200 overflow-hidden border relative ${
        isDragOver ? "border-primary opacity-75 scale-105" : "border-[#46d3d8]"
      } ${frameRounding}`}
      onClick={onFileInputClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={onImageUpload}
      />

      {image && type === "cover" && (
        <div className="absolute bottom-3 md:bottom-6 right-2 md:right-5 z-[999] w-14 text-xs md:w-32">
          <Image
            src={selectedFrame.backgroundImage}
            alt="Uploaded"
            width={300}
            height={80}
            className="pointer-events-none w-full h-full object-contain"
          />
        </div>
      )}

      {image && (
        <div
          className={`absolute inset-0 w-full h-full ${
            type === "pfp" ? frameRounding : ""
          }`}
          style={{
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Image
            src={image}
            alt="Uploaded"
            layout="fill"
            objectFit="contain"
            className="pointer-events-none"
          />
        </div>
      )}

      <div
        className={`absolute inset-0 w-full h-full bg-no-repeat bg-center bg-contain pointer-events-none ${
          image ? selectedFrame.backgroundImage : ""
        } ${frameRounding}`}
      />

      {!image && !isDragOver && (
        <div>
          {/* <p className="text-gray-300 text-xs md:text-sm text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            Click to upload image <br className="hidden md:block" />
            or drag and drop
          </p> */}
          <FaUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-4xl md:text-5xl" />
        </div>
      )}

      {isDragOver && (
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
          <p
            className={`text-[#50AFD4] ${
              type === "pfp" ? "text-sm" : "text-lg"
            } font-semibold`}
          >
            Drop to upload
          </p>
        </div>
      )}
    </div>
  );
};
