import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCircleCheck, FaCopy } from "react-icons/fa6";
import copy from "copy-to-clipboard";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "0xCe76B1EFAb180C551ac07b38809e9E1033bFAfF1";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // const handleCopy = async () => {
  //   if (!navigator.clipboard) return;
  //   try {
  //     await navigator.clipboard.writeText(walletAddress);
  //     setIsCopied(true);
  //     setTimeout(() => {
  //       setIsCopied(false);
  //     }, 5000);
  //   } catch (error) {
  //     console.error("Failed to copy wallet address:", error);
  //   }
  // };

  // Close the modal when clicking outside of it

  const handleCopy = () => {
    const wasSuccessful = copy(walletAddress, { debug: true });
    if (wasSuccessful) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } else {
      alert("Failed to copy wallet address.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <header className="w-full h-[58px] px-3 py-1 fixed z-10 top-2">
      <div className="max-w-7xl py-1 flex items-center mx-auto rounded-full border border-gray-700 backdrop-blur-lg bg-transparent w-full h-full">
        <Link href="/" className="mr-auto">
          <Image
            className="w-full h-full object-cover"
            src="/logo.png"
            alt="Built on Ethereum"
            width={50}
            height={50}
          />
        </Link>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="mr-4 flex items-center justify-center border border-gray-600 px-4 text-md font-medium py-1 rounded-full"
          >
            Support
          </button>
          {isModalOpen && (
            <div
              ref={modalRef}
              className="absolute right-0 mt-2 w-52 bg-[#081f2b] border border-[#46d3d8]/80 backdrop-blur-md rounded-lg p-4 shadow-lg"
            >
              <p className="text-xs text-white mb-2">Support the Developer</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white break-all">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <button
                  onClick={handleCopy}
                  className="bg-[#46d3d8]/50 hover:bg-[#46d3d8]/80 text-white/80 text-xs px-2 py-1 rounded"
                >
                  {isCopied ? <FaCircleCheck /> : <FaCopy />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
