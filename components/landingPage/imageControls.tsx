import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaArrowLeft,
  FaArrowRight,
  FaPlus,
  FaMinus,
  FaArrowRotateLeft,
} from "react-icons/fa6";

export interface ImageControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onReset: () => void;
}

export const ImageControls: React.FC<ImageControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onReset,
}) => {
  return (
    <section>
      <h2 className="text-md text-center font-medium text-[#50AFD4] my-2">
        Image Controls
      </h2>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <button
          onClick={onZoomIn}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaPlus />
        </button>
        <button
          onClick={onZoomOut}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaMinus />
        </button>
        <button
          onClick={onMoveUp}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaArrowUp />
        </button>
        <button
          onClick={onMoveDown}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaArrowDown />
        </button>
        <button
          onClick={onMoveLeft}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={onMoveRight}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaArrowRight />
        </button>
        <button
          onClick={onReset}
          className="bg-gray-900 p-2 text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white rounded"
        >
          <FaArrowRotateLeft />
        </button>
      </div>
    </section>
  );
};
