"use client";

import React, { useState, useRef } from "react";
import { toPng, toJpeg } from "html-to-image";
import Image from "next/image";

export default function ProfileFrameApp() {
  const [image, setImage] = useState<string | null>(null);
  const [frame, setFrame] = useState("frame1");
  const canvasRef = useRef(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = (format: string) => {
    if (canvasRef.current) {
      const toImage = format === "png" ? toPng : toJpeg;
      toImage(canvasRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `profile-frame.${format}`;
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Profile Picture Frame</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <select
        className="p-2 border rounded"
        value={frame}
        onChange={(e) => setFrame(e.target.value)}
      >
        <option value="frame1">Frame 1</option>
        <option value="frame2">Frame 2</option>
      </select>
      <div ref={canvasRef} className="relative w-48 h-48 bg-white border">
        {image && (
          <Image
            src={image}
            alt="Uploaded"
            layout="fill"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className={`absolute inset-0 w-full h-full bg-no-repeat bg-center bg-contain ${frame}`}
        ></div>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => handleDownload("png")}
      >
        Download PNG
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => handleDownload("jpg")}
      >
        Download JPG
      </button>
    </div>
  );
}
