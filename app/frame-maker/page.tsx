"use client";
import { FrameCanvas } from "@/components/landingPage/frameCanvas";
import { ImageControls } from "@/components/landingPage/imageControls";
import { FrameSelector } from "@/components/landingPage/frameSelector";
import { DownloadButtons } from "@/components/landingPage/downloadButtons";
import { useRef, useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import { profileFrameConfigs, coverFrameConfigs } from "@/lib/constants";
export default function FrameMaker() {
  // ----- Cover Photo States -----
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const coverCanvasRef = useRef<HTMLDivElement>(null);
  const [coverFrame, setCoverFrame] = useState(coverFrameConfigs.dark_wide_bw);
  const [coverImageScale, setCoverImageScale] = useState(1);
  const [coverImagePosition, setCoverImagePosition] = useState({
    x: 0,
    y: 0,
  });
  const [coverIsDragOver, setCoverIsDragOver] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // ----- Profile Picture States -----
  const [pfpImage, setPfpImage] = useState<string | null>(null);
  const pfpFileInputRef = useRef<HTMLInputElement>(null);
  const pfpCanvasRef = useRef<HTMLDivElement>(null);

  // ----- Profile Picture States ----
  const [pfpFrame, setPfpFrame] = useState(profileFrameConfigs.circle);
  const [pfpImageScale, setPfpImageScale] = useState(1);
  const [pfpImagePosition, setPfpImagePosition] = useState({ x: 0, y: 0 });
  const [pfpIsDragOver, setPfpIsDragOver] = useState(false);

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
  const handleCoverDownload = async (format: "png" | "jpg") => {
    if (!coverCanvasRef.current) return;
    const toImage = format === "png" ? toPng : toJpeg;

    try {
      await document.fonts.ready; // Wait for fonts
      const dataUrl = await toImage(coverCanvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          fontFamily: "Arial, sans-serif", // Fallback
        },
      });
      const link = document.createElement("a");
      link.download = `ethereum-frame.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handlePfpDownload = (format: "png" | "jpg") => {
    if (!pfpImage || !pfpCanvasRef.current) return;
    const toImage = format === "png" ? toPng : toJpeg;
    toImage(pfpCanvasRef.current, {
      quality: 1.0,
      pixelRatio: 3,
      style: {
        fontFamily: "Arial, sans-serif", // Fallback
      },
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `profile-frame.${format}`;
      link.click();
    });
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
    <section className="mx-auto py-12 w-full min-h-screen h-11/12 pt-12 relative  px-2">
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
        <h3 className="text-2xl font-semibold text-center mb-4">Cover Photo</h3>

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
  );
}
