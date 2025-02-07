import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-[58px] px-3 py-1 fixed z-10 top-2">
      <div className="max-w-7xl px-4 py-1 flex items-center mx-auto rounded-full border border-gray-700 backdrop-blur-lg bg-transparent w-full h-full">
        <Link href="/" className="mr-auto">
          <Image
            className="w-full h-full object-cover"
            src="/logo.png"
            alt="Built on Ethereum"
            width={50}
            height={50}
          />
        </Link>
        <button className="mr-4 flex items-center justify-center border border-gray-600 px-4 text-md font-medium py-1 rounded-full">
          Support
        </button>
      </div>
    </header>
  );
}
