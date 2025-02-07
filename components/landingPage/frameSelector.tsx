import { frameConfigs } from "@/lib/constants";
import { FrameSelectorProps } from "@/types";

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  selectedFrameId,
  onChange,
}) => {
  return (
    <select
      name="frame-type"
      value={selectedFrameId}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-900 px-4 text-md text-[#50AFD4] hover:bg-[#50AFD4] hover:text-white py-1 appearance-none rounded"
    >
      {Object.values(frameConfigs).map((frame) => (
        <option key={frame.id} value={frame.id}>
          {frame.name}
        </option>
      ))}
    </select>
  );
};
