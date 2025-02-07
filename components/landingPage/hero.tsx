import React, { useState, useRef } from "react";
import { toPng, toJpeg } from "html-to-image";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
// import { motion, useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

interface Frame {
  [frameId: string | number]: {
    id: string;
    name: string;
    shape: "circle" | "square";
    backgroundImage: string;
  };
}

const frameConfigs: Frame = {
  frame1: {
    id: "frame1",
    name: "Square Frame",
    shape: "square",
    backgroundImage: "frame1",
  },
  frame2: {
    id: "frame2",
    name: "Circle Frame",
    shape: "circle",
    backgroundImage: "frame2",
  },
};

export default function Hero() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState(frameConfigs.frame1);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLElement>(null);

  // const { scrollYProgress } = useScroll();

  const handleScrollToSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileInputClick = () => {
    if (isDragging) return;
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  const handleDownload = (format: string) => {
    if (!image) return;
    if (canvasRef.current) {
      const toImage = format === "png" ? toPng : toJpeg;
      toImage(canvasRef.current, {
        quality: 1.0,
        pixelRatio: 3,
      }).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `profile-frame.${format}`;
        link.click();
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!image) return;
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, imageScale + delta), 3);
    setImageScale(newScale);
  };

  return (
    <main className="w-full min-h-screen">
      <section className="w-full max-w-7xl min-h-screen relative flex items-center justify-center mx-auto">
        <div className="p-4 mb-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
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
          className="absolute w-52 aspect-square left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center cursor-pointer"
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

        <form className="px-4 w-full flex flex-col items-center">
          <div
            className={`relative w-72 cursor-pointer bg-[#081F2B] aspect-square transition-all duration-200 ${
              isDragOver
                ? "border-primary opacity-75 scale-105"
                : "border-gray-600"
            } ${selectedFrame.shape === "circle" ? "rounded-full" : "rounded"}`}
            onClick={handleFileInputClick}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />

            {image && (
              <div
                className={`absolute inset-0 w-full h-full ${
                  selectedFrame.shape === "circle"
                    ? "rounded-full overflow-hidden"
                    : ""
                }`}
                style={{
                  transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <Image
                  src={image}
                  alt="Uploaded"
                  layout="fill"
                  className="object-contain"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            )}

            <div
              className={`absolute inset-0 w-full h-full bg-no-repeat bg-center bg-contain pointer-events-none ${selectedFrame.backgroundImage}`}
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
                <p className="text-primary text-lg font-semibold">
                  Drop to upload
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 mt-6">
            <div className="w-full max-w-fit flex items-center justify-center mx-auto border border-gray-600 rounded-3xl p-1">
              <select
                name="frame-type"
                value={selectedFrame.id}
                onChange={(e) => handleFrameChange(e.target.value)}
                className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white py-1 appearance-none rounded-l-full"
              >
                {Object.values(frameConfigs).map((frame) => (
                  <option key={frame.id} value={frame.id}>
                    {frame.name}
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded-none py-1"
                onClick={() => handleDownload("png")}
              >
                Download PNG
              </Button>
              <Button
                size="sm"
                className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded-r-full py-1"
                onClick={() => handleDownload("jpg")}
              >
                Download JPG
              </Button>
            </div>

            {image && (
              <div className="text-center text-sm text-gray-300">
                Tip: Use mouse wheel to zoom, click and drag to position
              </div>
            )}
          </div>

          <div className="space-y-4">
            {image && (
              <div className="text-center text-sm text-gray-300">
                Tip: Use mouse wheel to zoom, click and drag to position
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
