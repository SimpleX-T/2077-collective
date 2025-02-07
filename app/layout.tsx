import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

export const metadata: Metadata = {
  title: "2077 Collective | Frame Maker",
  description: "Developed by devtochukwu",
};

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} ${GeistSans.variable} ${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
