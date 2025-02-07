import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 mt-8">
      <p className="text-center text-sm text-gray-300">
        Developed by devtochukwu
        <br />
        &copy; {new Date().getFullYear()} Frame Maker
      </p>
    </footer>
  );
}
