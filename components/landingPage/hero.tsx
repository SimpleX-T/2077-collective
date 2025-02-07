import React, { useState, useRef } from "react";
import { toPng, toJpeg } from "html-to-image";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
import { frameConfigs } from "@/lib/constants";
import { FrameCanvas } from "./frameCanvas";
import { ImageControls } from "./imageControls";
import { FrameSelector } from "./frameSelector";
import { DownloadButtons } from "./downloadButtons";

export default function Hero() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState(frameConfigs.frame1);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLElement>(null);

  const handleScrollToSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFrameChange = (frameId: string) => {
    setSelectedFrame(frameConfigs[frameId]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  const handleDownload = (format: "png" | "jpg") => {
    if (!image || !canvasRef.current) return;
    const toImage = format === "png" ? toPng : toJpeg;
    toImage(canvasRef.current, { quality: 1.0, pixelRatio: 3 }).then(
      (dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `profile-frame.${format}`;
        link.click();
      }
    );
  };

  // Image control handlers (using fixed steps)
  const moveStep = 5;
  const scaleStep = 0.1;
  const handleZoomIn = () =>
    setImageScale((prev) => Math.min(prev + scaleStep, 3));
  const handleZoomOut = () =>
    setImageScale((prev) => Math.max(prev - scaleStep, 0.5));
  const handleMoveUp = () =>
    setImagePosition((prev) => ({ ...prev, y: prev.y - moveStep }));
  const handleMoveDown = () =>
    setImagePosition((prev) => ({ ...prev, y: prev.y + moveStep }));
  const handleMoveLeft = () =>
    setImagePosition((prev) => ({ ...prev, x: prev.x - moveStep }));
  const handleMoveRight = () =>
    setImagePosition((prev) => ({ ...prev, x: prev.x + moveStep }));
  const handleReset = () => {
    setImagePosition({ x: 0, y: 0 });
    setImageScale(1);
  };

  return (
    <main className="w-full min-h-screen">
      <section className="w-full max-w-5xl min-h-screen relative flex items-center justify-center mx-auto">
        <div className="p-4 mb-6 text-center">
          <h1 className="text-4xl md:text-7xl font-bold">
            Create frames for the{" "}
            <span className="relative text-transparent inline-block bg-gradient-to-br to-[#46D3D8] via-[#081F2B] from-[#50AFD4] bg-clip-text">
              2077
              <svg
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-3"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5C25 5 25 1 50 1C75 1 75 5 100 5"
                  stroke="#46D3D8"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>{" "}
            collective campaign.
          </h1>
          <p className="mt-4 text-lg text-[#50AFD4]">
            Let&apos;s make Ethereum cool again!
          </p>
        </div>

        <div
          className="absolute w-52 aspect-square left-1/2 -translate-x-1/2 bottom-6 md:bottom-0 flex items-center justify-center cursor-pointer"
          onClick={handleScrollToSection}
        >
          <Image
            src="/scroll-down.png"
            alt="ethereum logo"
            className="w-full h-full object-cover animate-spin rotate-anim"
            width={300}
            height={300}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FaArrowDown color="#46D3D8" className="font-bold text-4xl" />
          </div>
        </div>
      </section>

      <section
        ref={secondSectionRef}
        className="backdrop-blur-sm mx-auto py-12 w-full"
      >
        <h2 className="text-3xl mt-6 font-semibold text-center">
          Create your cool frame
        </h2>
        <p className="mb-6 text-sm text-center text-gray-300">
          Upload an image and select a frame type
        </p>

        <div className="px-4 w-full flex flex-col items-center">
          <FrameCanvas
            image={image}
            selectedFrame={selectedFrame}
            imagePosition={imagePosition}
            imageScale={imageScale}
            fileInputRef={fileInputRef}
            canvasRef={canvasRef}
            isDragOver={isDragOver}
            onFileInputClick={handleFileInputClick}
            onImageUpload={handleImageUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          {image && (
            <ImageControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onMoveLeft={handleMoveLeft}
              onMoveRight={handleMoveRight}
              onReset={handleReset}
            />
          )}

          <div className="mt-6 flex flex-col items-center gap-4">
            <FrameSelector
              selectedFrameId={selectedFrame.id}
              onChange={handleFrameChange}
            />
            <DownloadButtons onDownload={handleDownload} />
          </div>

          {image && (
            <div className="text-center text-sm text-gray-300 mt-4">
              Tip: Use the controls above to adjust the image scale and
              position.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
