import React, { useState, useRef } from "react";
import { toPng, toJpeg } from "html-to-image";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
import {
  profileFrameConfigs,
  coverFrameConfigs,
  guilds,
} from "@/lib/constants";
import { FrameCanvas } from "./frameCanvas";
import { ImageControls } from "./imageControls";
import { FrameSelector } from "./frameSelector";
import { DownloadButtons } from "./downloadButtons";
import Link from "next/link";
import GuildCard from "../GuildCard";
import ContributionSection from "../ContributionSection";

export default function Hero() {
  // ----- Cover Photo States -----
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverFrame, setCoverFrame] = useState(coverFrameConfigs.dark_wide_bw);
  const [coverImageScale, setCoverImageScale] = useState(1);
  const [coverImagePosition, setCoverImagePosition] = useState({ x: 0, y: 0 });
  const [coverIsDragOver, setCoverIsDragOver] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const coverCanvasRef = useRef<HTMLDivElement>(null);

  // ----- Profile Picture States -----
  const [pfpImage, setPfpImage] = useState<string | null>(null);
  const [pfpFrame, setPfpFrame] = useState(profileFrameConfigs.circle);
  const [pfpImageScale, setPfpImageScale] = useState(1);
  const [pfpImagePosition, setPfpImagePosition] = useState({ x: 0, y: 0 });
  const [pfpIsDragOver, setPfpIsDragOver] = useState(false);
  const pfpFileInputRef = useRef<HTMLInputElement>(null);
  const pfpCanvasRef = useRef<HTMLDivElement>(null);

  // ----- Scroll Handler for Intro Section -----
  const secondSectionRef = useRef<HTMLElement>(null);
  const handleScrollToSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ----- Generic Image File Processor -----
  const processImageFile = (
    file: File,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ----- Cover Photo Handlers -----
  const handleCoverFileInputClick = () => {
    coverFileInputRef.current?.click();
  };

  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file, setCoverImage);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleCoverDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverIsDragOver(true);
  };

  const handleCoverDragLeave = () => {
    setCoverIsDragOver(false);
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      processImageFile(file, setCoverImage);
    }
  };

  // ----- Profile Picture Handlers -----
  const handlePfpFileInputClick = () => {
    pfpFileInputRef.current?.click();
  };

  const handlePfpImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file, setPfpImage);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handlePfpDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPfpIsDragOver(true);
  };

  const handlePfpDragLeave = () => {
    setPfpIsDragOver(false);
  };

  const handlePfpDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPfpIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      processImageFile(file, setPfpImage);
    }
  };

  // ----- Download Handlers -----
  const handleCoverDownload = (format: "png" | "jpg") => {
    if (!coverImage || !coverCanvasRef.current) return;
    const toImage = format === "png" ? toPng : toJpeg;
    toImage(coverCanvasRef.current, { quality: 1.0, pixelRatio: 3 }).then(
      (dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `cover-frame.${format}`;
        link.click();
      }
    );
  };

  const handlePfpDownload = (format: "png" | "jpg") => {
    if (!pfpImage || !pfpCanvasRef.current) return;
    const toImage = format === "png" ? toPng : toJpeg;
    toImage(pfpCanvasRef.current, { quality: 1.0, pixelRatio: 3 }).then(
      (dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `profile-frame.${format}`;
        link.click();
      }
    );
  };

  // ----- Image Control Handlers (Cover) -----
  const moveStep = 5;
  const scaleStep = 0.1;
  const handleCoverZoomIn = () =>
    setCoverImageScale((prev) => Math.min(prev + scaleStep, 3));
  const handleCoverZoomOut = () =>
    setCoverImageScale((prev) => Math.max(prev - scaleStep, 0.5));
  const handleCoverMoveUp = () =>
    setCoverImagePosition((prev) => ({ ...prev, y: prev.y - moveStep }));
  const handleCoverMoveDown = () =>
    setCoverImagePosition((prev) => ({ ...prev, y: prev.y + moveStep }));
  const handleCoverMoveLeft = () =>
    setCoverImagePosition((prev) => ({ ...prev, x: prev.x - moveStep }));
  const handleCoverMoveRight = () =>
    setCoverImagePosition((prev) => ({ ...prev, x: prev.x + moveStep }));
  const handleCoverReset = () => {
    setCoverImagePosition({ x: 0, y: 0 });
    setCoverImageScale(1);
  };

  // ----- Image Control Handlers (Profile Picture) -----
  const handlePfpZoomIn = () =>
    setPfpImageScale((prev) => Math.min(prev + scaleStep, 3));
  const handlePfpZoomOut = () =>
    setPfpImageScale((prev) => Math.max(prev - scaleStep, 0.5));
  const handlePfpMoveUp = () =>
    setPfpImagePosition((prev) => ({ ...prev, y: prev.y - moveStep }));
  const handlePfpMoveDown = () =>
    setPfpImagePosition((prev) => ({ ...prev, y: prev.y + moveStep }));
  const handlePfpMoveLeft = () =>
    setPfpImagePosition((prev) => ({ ...prev, x: prev.x - moveStep }));
  const handlePfpMoveRight = () =>
    setPfpImagePosition((prev) => ({ ...prev, x: prev.x + moveStep }));
  const handlePfpReset = () => {
    setPfpImagePosition({ x: 0, y: 0 });
    setPfpImageScale(1);
  };

  // ----- Frame Selector Handlers -----
  const handleCoverFrameChange = (frameId: string) => {
    setCoverFrame(coverFrameConfigs[frameId as keyof typeof coverFrameConfigs]);
  };

  const handlePfpFrameChange = (frameId: string) => {
    setPfpFrame(
      profileFrameConfigs[frameId as keyof typeof profileFrameConfigs]
    );
  };

  return (
    <main className="w-full min-h-screen">
      {/* Intro Section */}
      <section className="w-full max-w-5xl min-h-screen relative flex items-center justify-center mx-auto">
        <div className="p-4 mb-6 text-center">
          <h1 className="text-3xl md:text-6xl font-bold">
            Welcome To 2077 Collective:
            <span className="relative inline-block text-[#46D3D8]">
              Ethernauts&apos; Contribution Zone!
            </span>
          </h1>
          <p className="my-6 text-md text-gray-300">
            Join the unofficial marketing department of Ethereum and help make
            Ethereum cool again.{" "}
          </p>
          <Link
            href="#get-started"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
        <div
          className="absolute w-40 aspect-square left-1/2 -translate-x-1/2 bottom-6 md:bottom-0 flex items-center justify-center cursor-pointer"
          onClick={handleScrollToSection}
        >
          <Image
            src="/scroll-down.png"
            alt="scroll down"
            className="w-full h-full object-cover animate-spin rotate-anim"
            width={300}
            height={300}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FaArrowDown color="#46D3D8" className="font-bold text-4xl" />
          </div>
        </div>
      </section>

      <section ref={secondSectionRef} className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Do Ethernauts Do?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guilds.map((guild, index) => (
              <GuildCard key={index} {...guild} />
            ))}
          </div>
        </div>
      </section>

      <ContributionSection />

      {/* Main Editor Section */}
      <section className="backdrop-blur-sm mx-auto py-12 w-full min-h-screen pt-12 relative max-w- px-2">
        <div className="absolute w-32 h-1/2 bg-[#081F2B] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-[120px]" />
        <div className="mb-4 p-4">
          <h2 className="text-3xl mt-6 font-semibold text-center mb-3">
            Customize Your Profile and Cover Photo Frames
          </h2>
          <p className="mb-6 text-sm text-center text-gray-300">
            Upload an image and select a frame for your profile picture and/or
            cover photo.
          </p>
        </div>

        {/* ----- Cover Photo Section ----- */}
        <div className="mb-12 border border-[#46d3d8]/40 py-4 rounded max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Cover Photo
          </h3>

          <div className="px-4 w-full flex flex-col items-center">
            <FrameCanvas
              type="cover"
              image={coverImage}
              selectedFrame={coverFrame}
              imagePosition={coverImagePosition}
              imageScale={coverImageScale}
              fileInputRef={coverFileInputRef}
              canvasRef={coverCanvasRef}
              isDragOver={coverIsDragOver}
              onFileInputClick={handleCoverFileInputClick}
              onImageUpload={handleCoverImageUpload}
              onDragOver={handleCoverDragOver}
              onDragLeave={handleCoverDragLeave}
              onDrop={handleCoverDrop}
            />

            {coverImage && (
              <ImageControls
                onZoomIn={handleCoverZoomIn}
                onZoomOut={handleCoverZoomOut}
                onMoveUp={handleCoverMoveUp}
                onMoveDown={handleCoverMoveDown}
                onMoveLeft={handleCoverMoveLeft}
                onMoveRight={handleCoverMoveRight}
                onReset={handleCoverReset}
              />
            )}

            <div className="mt-6 flex flex-col items-center gap-4">
              <FrameSelector
                selectedFrameId={coverFrame.id}
                frames={coverFrameConfigs}
                onChange={handleCoverFrameChange}
              />
              <DownloadButtons onDownload={handleCoverDownload} />
            </div>

            {coverImage && (
              <div className="text-center text-sm text-gray-300 mt-4">
                Tip: Use the controls above to adjust the cover photo.
              </div>
            )}
          </div>
        </div>

        {/* ----- Profile Picture Section ----- */}
        <div className="border border-[#46d3d8]/40 py-4 rounded max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Profile Picture
          </h3>

          <div className="px-4 w-full flex flex-col items-center">
            <FrameCanvas
              type="pfp"
              image={pfpImage}
              selectedFrame={pfpFrame}
              imagePosition={pfpImagePosition}
              imageScale={pfpImageScale}
              fileInputRef={pfpFileInputRef}
              canvasRef={pfpCanvasRef}
              isDragOver={pfpIsDragOver}
              onFileInputClick={handlePfpFileInputClick}
              onImageUpload={handlePfpImageUpload}
              onDragOver={handlePfpDragOver}
              onDragLeave={handlePfpDragLeave}
              onDrop={handlePfpDrop}
            />

            {pfpImage && (
              <ImageControls
                onZoomIn={handlePfpZoomIn}
                onZoomOut={handlePfpZoomOut}
                onMoveUp={handlePfpMoveUp}
                onMoveDown={handlePfpMoveDown}
                onMoveLeft={handlePfpMoveLeft}
                onMoveRight={handlePfpMoveRight}
                onReset={handlePfpReset}
              />
            )}

            <div className="mt-6 flex flex-col items-center gap-4">
              <FrameSelector
                selectedFrameId={pfpFrame.id}
                frames={profileFrameConfigs}
                onChange={handlePfpFrameChange}
              />
              <DownloadButtons onDownload={handlePfpDownload} />
            </div>
            {pfpImage && (
              <div className="text-center text-sm text-gray-300 mt-4">
                Tip: Use the controls above to adjust your profile picture.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
