import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 mt-8">
      <p className="text-center text-sm text-gray-400">
        developed by{" "}
        <Link
          href="https://x.com/devtochukwu"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          devtochukwu
        </Link>{" "}
        &{" "}
        <Link
          href="https://x.com/_chiater99"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          solenoid
        </Link>{" "}
        for 2077 collective with{" "}
        <span className="animate-pulse text-red-600">&#x2764;</span>
        <br />
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
