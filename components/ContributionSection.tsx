import { steps } from "@/lib/constants";
import React from "react";
import StepsCard from "./StepsCard";
import Link from "next/link";

const ContributionSection: React.FC = () => {
  return (
    <section id="get-started" className="py-16 px-6 space-y-5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How To Contribute</h2>
        <p className="text-gray-300 mb-8">
          Whether you&apos;re a marketing genius, a wordsmith, a designer, a
          developer, or a video creator, there&apos;s a place for you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepsCard key={index} {...step} />
          ))}
        </div>
      </div>
      {/* <a
        href="https://app.charmverse.io/2077-collective---contribution-zone/welcome-to-2077-collective-ethernauts-contribution-zone-8830012047551685"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-full font-semibold hover:bg-blue-700 transition"
      >
        Explore Tasks on Charmverse
      </a> */}
    </section>
  );
};

export default ContributionSection;
