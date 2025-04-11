import FrameMaker from "@/app/frame-maker/page";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaX } from "react-icons/fa6";

interface Step {
  title: string;
  content: React.ReactNode;
}
const ContributionSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShareTweet = async (tweet: string) => {
    if (!tweet) return;

    const link = document.createElement("a");
    link.href = `https://x.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };
  const steps: Step[] = [
    {
      title: "1. Add the Frame",
      content: (
        <>
          Use our generator to add the Built on Ethereum frame to your profile
          picture & banner.{" "}
          <Link
            href="#"
            onClick={() => setIsModalOpen(true)}
            className="text-[#46D3D8] hover:underline block"
          >
            Go to Frame Generator
          </Link>
        </>
      ),
    },
    {
      title: "2. Share Your Tweet",
      content: (
        <>
          Use this tweet template to tell the world why your project is
          #BuiltOnEthereum:
          <p className="text-[#50AFD4] font-mono bg-[#081F2B] p-4 rounded my-4">
            We’re proud to be Built On Ethereum! Our project leverages
            Ethereum’s security, decentralization, and innovation to power the
            future of Web3. Join the movement & show what’s possible with
            Ethereum. 🚀 @2077Collective @ethereum @ethereumfnd
          </p>
          <button
            onClick={() =>
              handleShareTweet(
                "We’re proud to be Built On Ethereum! Our project leverages Ethereum’s security, decentralization, and innovation to power the future of Web3. Join the movement & show what’s possible with Ethereum. 🚀 @2077Collective @ethereum @ethereumfnd"
              )
            }
            className="border border-[#46D3D8] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-[#245a5c] transition"
          >
            Share on X
          </button>
        </>
      ),
    },
    {
      title: "3. Tag & Boost",
      content: (
        <>
          Tag{" "}
          <span className="text-[#46D3D8]">
            @2077Collective @ethereum @ethereumfnd
          </span>{" "}
          & use the hashtag{" "}
          <span className="text-[#50AFD4]">#BuiltOnEthereum</span> so we can
          boost your post.
        </>
      ),
    },
  ];

  return (
    <section id="get-started" className="py-16 px-6 space-y-5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#46D3D8]">How To Join</h2>
        <p className="text-gray-300 mb-8 max-w-[80ch] mx-auto">
          This is more than a campaign—it’s a movement. The more projects that
          join, the stronger Ethereum’s network effect becomes. Let’s make
          Ethereum cool again!
        </p>
        {isModalOpen && (
          <>
            {" "}
            <div
              className="fixed top-0 left-0 bg-black/40 backdrop-blur-lg w-screen min-h-screen z-10"
              onClick={() => setIsModalOpen(false)}
            >
              {" "}
            </div>{" "}
            <div className="w-11/12 md:w-6xl h-[80vh] mx-auto top-36 left-0 right-0 bottom-20  bg-[#0f0f0f]/40 backdrop-blur-lg flex items-center justify-center p-20 border-4 border-[#46D3D8] rounded-xl fixed z-20">
              <span
                className="top-25  right-20 cursor-pointer z-20 border border-[#46D3D8] rounded-full p-2 text-[#46D3D8] hover:bg-[#46D3D8]/20 transition-all duration-300 flex items-center justify-center absolute"
                onClick={() => setIsModalOpen(false)}
              >
                {" "}
                <FaX className="size-3 " />
              </span>
              <div
                className="w-full h-full flex items-center justify-center overflow-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <FrameMaker />
              </div>
            </div>
          </>
        )}
        <Accordion steps={steps} />
      </div>
    </section>
  );
};

export default ContributionSection;

const Accordion: React.FC<{ steps: Step[] }> = ({ steps }) => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="bg-[#081F2B] rounded-xl border border-[#46D3D8] shadow-lg overflow-hidden transition-all duration-300"
        >
          {/* Header */}
          <div
            className="p-6 flex justify-between items-center cursor-pointer
                      hover:bg-[#112a37] transition-all duration-300 rounded-xl"
            onClick={() => toggleStep(index)}
          >
            <h3 className="text-xl font-semibold text-[#46D3D8] tracking-wide">
              {step.title}
            </h3>
            <span
              className={`text-[#46D3D8] transition-transform duration-300 ${
                openStep === index ? "rotate-180" : ""
              }`}
            >
              {openStep === index ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>

          {/* Content */}
          <div
            className={`text-[#50AFD4] px-6 transition-all duration-500 ease-in-out
                      overflow-hidden ${
                        openStep === index
                          ? "max-h-[500px] opacity-100 scale-y-100 py-4 border-t border-[#46D3D8]"
                          : "max-h-0 opacity-0 scale-y-90"
                      }`}
          >
            {step.content}
          </div>
        </div>
      ))}
    </div>
  );
};
