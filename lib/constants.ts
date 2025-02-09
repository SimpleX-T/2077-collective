import { Frame } from "@/types";

export const profileFrameConfigs: Frame = {
  circle: {
    id: "circle",
    name: "Circle Frame",
    shape: "circle",
    backgroundImage: "frame2", // refers to .frame2 class in globals.css
  },
  square: {
    id: "square",
    name: "Square Frame",
    shape: "square",
    backgroundImage: "frame1", // refers to .frame1 class in globals.css
  },
};

export const coverFrameConfigs = {
  classic: {
    id: "classic",
    name: "Classic Cover",
    shape: "rectangle",
    backgroundImage: "coverFrame1", // refers to .coverFrame1 class in globals.css
  },
  modern: {
    id: "modern",
    name: "Modern Cover",
    shape: "rectangle",
    backgroundImage: "coverFrame2", // refers to .coverFrame2 class in globals.css
  },
};
