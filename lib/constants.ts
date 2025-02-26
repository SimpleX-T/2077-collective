import { Frame, GuildCardProps, StepCardProps } from "@/types";
import {
  Bs1Square,
  Bs2Square,
  Bs3Square,
  BsBook,
  BsBrush,
  BsCameraVideo,
  BsLaptop,
  BsMegaphone,
} from "react-icons/bs";
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

export const coverFrameConfigs: Frame = {
  dark_wide_bw: {
    id: "dark_wide_bw",
    name: "Dark Wide Black & White",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/dark_wide_bw.png",
  },
  dark_wide_color: {
    id: "dark_wide_color",
    name: "Dark Wide Color",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/dark_wide_color.png",
  },
  dark_wide_flat: {
    id: "dark_wide_flat",
    name: "Dark Wide Flat",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/dark_wide_flat.png",
  },
  light_wide_bw: {
    id: "light_wide_bw",
    name: "Light Wide Black & White",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/light_wide_bw.png",
  },
  light_wide_color: {
    id: "light_wide_color",
    name: "Light Wide Color",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/light_wide_color.png",
  },
  light_wide_flat: {
    id: "light_wide_flat",
    name: "Light Wide Flat",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/light_wide_flat.png",
  },
  tall_dark_bw: {
    id: "tall_dark_bw",
    name: "Tall Dark Black & White",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/tall_dark_bw.png",
  },
  tall_dark_color: {
    id: "tall_dark_color",
    name: "Tall Dark Color",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/tall_dark_color.png",
  },
  tall_dark_flat: {
    id: "tall_dark_flat",
    name: "Tall Dark Flat",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/tall_dark_flat.png",
  },
  tall_light_bw: {
    id: "tall_light_bw",
    name: "Tall Light Black & White",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/tall_light_bw.png",
  },
  tall_light_color: {
    id: "tall_light_color",
    name: "Tall Light Color",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/tall_light_color.png",
  },
  tall_light_flat: {
    id: "tall_light_flat",
    name: "Tall Light Flat",
    shape: "rectangle",
    backgroundImage: "/frames/cover_frames/tall_light_flat.png",
  },
};

export const guilds: GuildCardProps[] = [
  {
    title: "Marketing/Social Media Guild",
    description:
      "Spread the word on social platforms. Whether you’re on X, Farcaster, or Lens, your engagement helps build noise and battle FUD.",
    guildLead: "Ciefa",
    discordHandle: "Ciefa",
    Icon: BsMegaphone,
  },
  {
    title: "Writing/Research Guild",
    description:
      "Produce engaging articles, detailed research reports, and scripts. Help explain Ethereum’s innovations through Etherpedia, X threads, and more.",
    guildLead: "Sankrit K",
    discordHandle: "Sankrit K",
    Icon: BsBook,
  },
  {
    title: "Design & Branding Guild",
    description:
      "Create stunning infographics, social media images, and provide feedback on our websites. Your designs help make complex concepts accessible.",
    guildLead: "Charis",
    discordHandle: "Charis",
    Icon: BsBrush,
  },
  {
    title: "Development Guild",
    description:
      "Contribute to open-source projects like Etherpedia, 2077 Research, and the EIP Wiki. Whether you’re a seasoned dev or a beginner, your code counts!",
    guildLead: "Ndu",
    discordHandle: "Ndu",
    Icon: BsLaptop,
  },
  {
    title: "Video Creation Guild",
    description:
      "From short, punchy videos to long-form content that adds depth to our articles, your creativity is key in making Ethereum accessible for all.",
    guildLead: "GeniusYinka",
    discordHandle: "GeniusYinka",
    Icon: BsCameraVideo,
  },
];
export const steps: StepCardProps[] = [
  {
    title: "Update",
    description:
      'Use the "Built on Ethereum" frame on X, Farcaster, or LinkedIn.You can create your custom version using this tool.',
    link: "/frame-maker",
    Icon: Bs1Square,
  },
  {
    title: "Post",
    description:
      "Use our suggested tweet template  or write your own! Tag @2077Collective @ethereum @ethereumfnd and use BuiltOnEthereum tag so we can amplify your post",
    link: "https://twitter.com/intent/tweet?text=We%E2%80%99re%20proud%20to%20be%20Built%20On%20Ethereum!%20Join%20the%20movement%20%26%20show%20what%E2%80%99s%20possible%20with%20Ethereum.%20%F0%9F%9A%80%20@2077Collective%20@ethereum%20@ethereumfnd",
    Icon: Bs2Square,
  },
  {
    title: "Encourage",
    description:
      "Tag fellow projects built on Ethereum and invite them to join the movement! Engage with other participants by commenting and resharing posts.",
    link: "https://twitter.com/intent/tweet?text=Checkout%20these%20guys,%20they%20are%20building%20some%20amazing%20stuff%20on%20Ethereum%20%F0%9F%9A%80%20@2077Collective%20@ethereum%20@ethereumfnd",
    Icon: Bs3Square,
  },
];
