export interface Frame {
  [frameId: string]: {
    id: string;
    name: string;
    shape: "circle" | "square" | "rectangle";
    backgroundImage: string;
  };
}

export interface FrameCanvasProps {
  image: string | null;
  selectedFrame: {
    id: string;
    name: string;
    shape: "circle" | "square";
    backgroundImage: string;
  };
  imagePosition: { x: number; y: number };
  imageScale: number;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  isDragOver: boolean;
  onFileInputClick: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export interface ImageControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onReset: () => void;
}

export interface FrameSelectorProps {
  selectedFrameId: string;
  onChange: (frameId: string) => void;
}

export interface DownloadButtonsProps {
  onDownload: (format: "png" | "jpg") => void;
}

export interface GuildCardProps {
  title: string;
  description: string;
  guildLead: string;
  discordHandle: string;
  extraInfo?: string;
}
