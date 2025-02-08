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
          <h1 className="text-4xl md:text-6xl font-bold">
            Show the world you&apos;re{" "}
            <span className="relative inline-block text-[#46D3D8] hover:underline">
              #BuiltOnEthereum
              <svg
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full h-full hidden"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5C25 5 25 1 50 1C75 1 75 5 100 5"
                  stroke="#46D3D8"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              .
            </span>
          </h1>
          <p className="mt-4 text-md text-gray-300">
            Join the movement by adding the #BuiltOnEthereum frame to your logo.
            <br />
            Stand with the ecosystem, rep your project, and help make Ethereum
            cool again!
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
        className="backdrop-blur-sm mx-auto py-12 w-full h-screen pt-12 relative max-w-7xl"
      >
        {/* <div className="bg-gradient-to-tr from-[#041219] -z-50 to-[#46d3d8] blur-2xl w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full" /> */}
        <div className="mb-12 p-4">
          <h2 className="text-3xl mt-6 font-semibold text-center mb-3">
            Let&apos;s make Ethereum impossible to ignore!
          </h2>
          <p className="mb-6 text-sm text-center text-gray-300">
            Upload an image and select a frame type
          </p>

          <ul className="w-full justify-between flex md:max-w-[50%] mx-auto mt-12">
            <li className="md:min-w-32 p-2 text-sm md:px-4 md:py-3 border border-[#46d3d8] flex items-center justify-center bg-gradient-to-r from-[#041219] to-[#081F2B] rounded-lg after:content-[''] after relative">
              Create your frame
              <Image
                src="/next_arrow.png"
                alt="arrow"
                width={300}
                height={300}
                className="absolute top-1/2 -translate-y-1/2 left-full translate-x-4 w-14 hidden md:block"
              />
            </li>
            <li className="md:min-w-32 p-2 text-sm md:px-4 md:py-3 border border-[#46d3d8] flex items-center justify-center bg-gradient-to-r from-[#041219] to-[#081F2B] rounded-lg relative">
              Share it
              <Image
                src="/next_arrow.png"
                alt="arrow"
                width={300}
                height={300}
                className="absolute top-1/2 -translate-y-1/2 left-full translate-x-4 w-14 hidden md:block"
              />
            </li>
            <li className="md:min-w-32 p-2 text-sm md:px-4 md:py-3 border border-[#46d3d8] flex items-center justify-center bg-gradient-to-r from-[#041219] to-[#081F2B] rounded-lg relative">
              Lead the movement
              <Image
                src="/arrow.png"
                alt="arrow"
                width={300}
                height={300}
                className="absolute -bottom-full translate-x-1/2 translate-y-[65%] rotate-[30deg] right-0 hidden md:block"
              />
            </li>
          </ul>
        </div>

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

// import React, { useState, useRef } from "react";
// import { toPng, toJpeg } from "html-to-image";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
// import Image from "next/image";
// import { FaArrowDown } from "react-icons/fa6";
// import { frameConfigs } from "@/lib/constants";
// import { FrameCanvas } from "./frameCanvas";
// import { ImageControls } from "./imageControls";
// import { FrameSelector } from "./frameSelector";
// import { DownloadButtons } from "./downloadButtons";

// export default function Hero() {
//   const [pfpImage, setPfpImage] = useState<string | null>(null);
//   const [coverImage, setCoverImage] = useState<string | null>(null);
//   const [selectedPfpFrame, setSelectedPfpFrame] = useState(frameConfigs.frame1);
//   const [selectedCoverFrame, setSelectedCoverFrame] = useState(
//     frameConfigs.frame1
//   );
//   const [imageScale, setImageScale] = useState(1);
//   const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
//   const [isDragOver, setIsDragOver] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const secondSectionRef = useRef<HTMLElement>(null);

//   const handleScrollToSection = () => {
//     secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleFileInputClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handlePfpFrameChange = (frameId: string) => {
//     setSelectedPfpFrame(frameConfigs[frameId]);
//   };

//   const handleCoverFrameChange = (frameId: string) => {
//     setSelectedCoverFrame(frameConfigs[frameId]);
//   };

//   const handlePfpUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       processImageFile(file, setPfpImage);
//     }
//   };

//   const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       processImageFile(file, setCoverImage);
//     }
//   };

//   const processImageFile = (file: File, setImage: (image: string) => void) => {
//     const reader = new FileReader();
//     reader.onload = (e) => setImage(e.target?.result as string);
//     reader.readAsDataURL(file);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file?.type.startsWith("image/")) {
//       processImageFile(file, setPfpImage);
//     }
//   };

//   const downloadAsZip = async () => {
//     const zip = new JSZip();
//     if (pfpImage) {
//       const pfpBlob = await fetch(pfpImage).then((r) => r.blob());
//       zip.file("profile_picture.png", pfpBlob);
//     }
//     if (coverImage) {
//       const coverBlob = await fetch(coverImage).then((r) => r.blob());
//       zip.file("cover_image.png", coverBlob);
//     }
//     zip.generateAsync({ type: "blob" }).then((content) => {
//       saveAs(content, "images.zip");
//     });
//   };

//   const handleDownload = (format: "png" | "jpg") => {
//     if (!pfpImage || !canvasRef.current) return;
//     const toImage = format === "png" ? toPng : toJpeg;
//     toImage(canvasRef.current, { quality: 1.0, pixelRatio: 3 }).then(
//       (dataUrl) => {
//         const link = document.createElement("a");
//         link.href = dataUrl;
//         link.download = `profile-frame.${format}`;
//         link.click();
//       }
//     );
//   };

//   // Image control handlers (using fixed steps)
//   const moveStep = 5;
//   const scaleStep = 0.1;
//   const handleZoomIn = () =>
//     setImageScale((prev) => Math.min(prev + scaleStep, 3));
//   const handleZoomOut = () =>
//     setImageScale((prev) => Math.max(prev - scaleStep, 0.5));
//   const handleMoveUp = () =>
//     setImagePosition((prev) => ({ ...prev, y: prev.y - moveStep }));
//   const handleMoveDown = () =>
//     setImagePosition((prev) => ({ ...prev, y: prev.y + moveStep }));
//   const handleMoveLeft = () =>
//     setImagePosition((prev) => ({ ...prev, x: prev.x - moveStep }));
//   const handleMoveRight = () =>
//     setImagePosition((prev) => ({ ...prev, x: prev.x + moveStep }));
//   const handleReset = () => {
//     setImagePosition({ x: 0, y: 0 });
//     setImageScale(1);
//   };

//   return (
//     <main className="w-full min-h-screen">
//       <section className="w-full max-w-5xl min-h-screen relative flex items-center justify-center mx-auto">
//         <div className="p-4 mb-6 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold">
//             Show the world you&apos;re{" "}
//             <span className="relative inline-block text-[#46D3D8] hover:underline">
//               #BuiltOnEthereum
//               <svg
//                 className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full h-full hidden"
//                 viewBox="0 0 100 10"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M0 5C25 5 25 1 50 1C75 1 75 5 100 5"
//                   stroke="#46D3D8"
//                   strokeWidth="1"
//                   fill="none"
//                 />
//               </svg>
//               .
//             </span>
//           </h1>
//           <p className="mt-4 text-md text-gray-300">
//             Join the movement by adding the #BuiltOnEthereum frame to your logo.
//             <br />
//             Stand with the ecosystem, rep your project, and help make Ethereum
//             cool again!
//           </p>
//         </div>

//         <div
//           className="absolute w-52 aspect-square left-1/2 -translate-x-1/2 bottom-6 md:bottom-0 flex items-center justify-center cursor-pointer"
//           onClick={handleScrollToSection}
//         >
//           <Image
//             src="/scroll-down.png"
//             alt="ethereum logo"
//             className="w-full h-full object-cover animate-spin rotate-anim"
//             width={300}
//             height={300}
//           />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             <FaArrowDown color="#46D3D8" className="font-bold text-4xl" />
//           </div>
//         </div>
//       </section>

//       <section
//         ref={secondSectionRef}
//         className="backdrop-blur-sm mx-auto py-12 w-full h-screen pt-12 relative max-w-7xl"
//       >
//         {/* <div className="bg-gradient-to-tr from-[#041219] -z-50 to-[#46d3d8] blur-2xl w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full" /> */}
//         <div className="mb-12 p-4">
//           <h2 className="text-3xl mt-6 font-semibold text-center mb-3">
//             Let&apos;s make Ethereum impossible to ignore!
//           </h2>
//           <p className="mb-6 text-sm text-center text-gray-300">
//             Upload an image and select a frame type
//           </p>

//           <ul className="w-full justify-between flex md:max-w-[50%] mx-auto mt-12">
//             <li className="md:min-w-32 p-2 text-sm md:px-4 md:py-3 border border-[#46d3d8] flex items-center justify-center bg-gradient-to-r from-[#041219] to-[#081F2B] rounded-lg after:content-[''] after relative">
//               Create your frame
//               <Image
//                 src="/next_arrow.png"
//                 alt="arrow"
//                 width={300}
//                 height={300}
//                 className="absolute top-1/2 -translate-y-1/2 left-full translate-x-4 w-14 hidden md:block"
//               />
//             </li>
//             <li className="md:min-w-32 p-2 text-sm md:px-4 md:py-3 border border-[#46d3d8] flex items-center justify-center bg-gradient-to-r from-[#041219] to-[#081F2B] rounded-lg relative">
//               Share it
//               <Image
//                 src="/next_arrow.png"
//                 alt="arrow"
//                 width={300}
//                 height={300}
//                 className="absolute top-1/2 -translate-y-1/2 left-full translate-x-4 w-14 hidden md:block"
//               />
//             </li>
//             <li className="md:min-w-32 p-2 text-sm md:px-4 md:py-3 border border-[#46d3d8] flex items-center justify-center bg-gradient-to-r from-[#041219] to-[#081F2B] rounded-lg relative">
//               Lead the movement
//               <Image
//                 src="/arrow.png"
//                 alt="arrow"
//                 width={300}
//                 height={300}
//                 className="absolute -bottom-full translate-x-1/2 translate-y-[65%] rotate-[30deg] right-0 hidden md:block"
//               />
//             </li>
//           </ul>
//         </div>

//         <div className="px-4 w-full flex flex-col items-center">
//           <div className="flex flex-col items-center gap-4">
//             <input type="file" onChange={handlePfpUpload} accept="image/*" />
//             <input type="file" onChange={handleCoverUpload} accept="image/*" />
//             <button onClick={downloadAsZip}>Download as Zip</button>
//           </div>

//           <div className="flex flex-col items-center gap-4">
//             <FrameCanvas
//               image={pfpImage}
//               selectedFrame={selectedPfpFrame}
//               imagePosition={imagePosition}
//               imageScale={imageScale}
//               fileInputRef={fileInputRef}
//               canvasRef={canvasRef}
//               isDragOver={isDragOver}
//               onFileInputClick={handleFileInputClick}
//               onImageUpload={handlePfpUpload}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             />

//             {pfpImage && (
//               <ImageControls
//                 onZoomIn={handleZoomIn}
//                 onZoomOut={handleZoomOut}
//                 onMoveUp={handleMoveUp}
//                 onMoveDown={handleMoveDown}
//                 onMoveLeft={handleMoveLeft}
//                 onMoveRight={handleMoveRight}
//                 onReset={handleReset}
//               />
//             )}
//           </div>

//           <div className="flex flex-col items-center gap-4">
//             <FrameCanvas
//               image={coverImage}
//               selectedFrame={selectedCoverFrame}
//               imagePosition={imagePosition}
//               imageScale={imageScale}
//               fileInputRef={fileInputRef}
//               canvasRef={canvasRef}
//               isDragOver={isDragOver}
//               onFileInputClick={handleFileInputClick}
//               onImageUpload={handleCoverUpload}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             />

//             {coverImage && (
//               <ImageControls
//                 onZoomIn={handleZoomIn}
//                 onZoomOut={handleZoomOut}
//                 onMoveUp={handleMoveUp}
//                 onMoveDown={handleMoveDown}
//                 onMoveLeft={handleMoveLeft}
//                 onMoveRight={handleMoveRight}
//                 onReset={handleReset}
//               />
//             )}
//           </div>

//           <div className="mt-6 flex flex-col items-center gap-4">
//             <FrameSelector
//               selectedFrameId={selectedPfpFrame.id}
//               onChange={handlePfpFrameChange}
//             />
//             <FrameSelector
//               selectedFrameId={selectedCoverFrame.id}
//               onChange={handleCoverFrameChange}
//             />
//             <DownloadButtons onDownload={handleDownload} />
//           </div>

//           {(pfpImage || coverImage) && (
//             <div className="text-center text-sm text-gray-300 mt-4">
//               Tip: Use the controls above to adjust the image scale and
//               position.
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }
