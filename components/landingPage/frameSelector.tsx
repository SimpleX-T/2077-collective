import React from "react";

export interface FrameSelectorProps {
  selectedFrameId: string;
  frames: {
    [key: string]: {
      id: string;
      name: string;
      shape: string;
      backgroundImage: string;
    };
  };
  onChange: (frameId: string) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  selectedFrameId,
  frames,
  onChange,
}) => {
  return (
    <section className="w-full relative my-2 text-center">
      <h2 className="text-md text-center font-medium text-[#50AFD4] my-2">
        Select your choice Frame
      </h2>
      <select
        name="frame-type"
        value={selectedFrameId}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white py-1 appearance-none rounded"
      >
        {Object.values(frames).map((frame) => (
          <option key={frame.id} value={frame.id}>
            {frame.name}
          </option>
        ))}
      </select>
    </section>
  );
};
