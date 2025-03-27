import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

interface Step {
  title: string;
  content: React.ReactNode;
}
const ContributionSection: React.FC = () => {
  const steps: Step[] = [
    {
      title: "1. Add the Frame",
      content: (
        <>
          Use our generator to add the Built on Ethereum frame to your profile
          picture & banner.{" "}
          <Link
            href="/frame-maker"
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
              navigator.clipboard.writeText(
                "We’re proud to be Built On Ethereum! Our project leverages Ethereum’s security, decentralization, and innovation to power the future of Web3. Join the movement & show what’s possible with Ethereum. 🚀 @2077Collective @ethereum @ethereumfnd"
              )
            }
            className="bg-[#46D3D8] text-white px-4 py-2 rounded hover:bg-[#245a5c] transition"
          >
            Copy Tweet
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
