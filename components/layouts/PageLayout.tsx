import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="w-full overflow-hidden min-h-screen relative bg-[#010507] text-white [background-image:radial-gradient(circle_at_center,#ffffff30_1px,transparent_0)] [background-size:50px_50px] [background-repeat:round] [background-position:center]">
      {children}
    </main>
  );
}
