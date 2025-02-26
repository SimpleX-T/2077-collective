import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { PageLayout } from "@/components/layouts/PageLayout";

export const metadata: Metadata = {
  title: "2077 Collective Campaign Page",
  description: "Developed by solenoid, and devtochukwu",
};

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});
// const poppins = Poppins({
//   weight: ["400", "500", "600"],
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.className} antialiased`}>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
