import { FrameCanvasProps } from "@/types";
import Image from "next/image";

export const FrameCanvas: React.FC<FrameCanvasProps> = ({
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
  return (
    <div
      ref={canvasRef}
      className={`relative w-72 cursor-pointer bg-[#081F2B] aspect-square transition-all duration-200 overflow-hidden ${
        isDragOver ? "border-primary opacity-75 scale-105" : "border-[#46d3d8]"
      } ${selectedFrame.shape === "circle" ? "rounded-full" : "rounded"}`}
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

      {image && (
        <div
          className={`absolute inset-0 w-full h-full ${
            selectedFrame.shape === "circle" ? "rounded-full" : ""
          }`}
          style={{
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Image
            src={image}
            alt="Uploaded"
            width={300}
            height={300}
            className="object-contain"
            style={{ pointerEvents: "none" }}
          />
        </div>
      )}

      <div
        className={`absolute inset-0 w-full h-full bg-no-repeat bg-center bg-contain pointer-events-none ${
          image ? selectedFrame.backgroundImage : ""
        }`}
      />

      {!image && !isDragOver && (
        <p className="text-gray-300 text-sm text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Click to upload image
          <br />
          or drag and drop
        </p>
      )}

      {isDragOver && (
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
          <p className="text-[#50AFD4] text-lg font-semibold">Drop to upload</p>
        </div>
      )}
    </div>
  );
};
