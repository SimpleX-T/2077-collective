import React, { useRef } from "react";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
{/*import { guilds } from "@/lib/constants";*/}
import Link from "next/link";
{/*import GuildCard from "../GuildCard";*/}
import ContributionSection from "../ContributionSection";

export default function Hero() {
  const secondSectionRef = useRef<HTMLElement>(null);
  const handleScrollToSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen">
      {/* Intro Section */}
      <section className="w-full max-w-5xl min-h-screen relative flex items-center justify-center mx-auto">
        <div className="p-4 mb-6 text-center">
          <h1 className="text-3xl md:text-6xl font-bold">
            Built on Ethereum{" "}
            <span className="relative inline-block text-[#46D3D8]">
              Show the World Where You Belong
            </span>
          </h1>
          <p className="my-6 text-md text-gray-300 max-w-[80ch] mx-auto">
            Ethereum is the foundation of the most innovative projects in Web3.
            Now, it’s time to show your support and rep the network that powers
            your mission. Join the unofficial marketing department of Ethereum
            and help make Ethereum cool again.
          </p>
          <Link
            href="#get-started"
            className="bg-white text-[#277d80] px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
        <div
          className="absolute size-60 aspect-square left-1/2 -translate-x-1/2 -bottom-16 flex items-center justify-center cursor-pointer my-4"
          onClick={handleScrollToSection}
        >
          <Image
            src="/scroll-down.png"
            alt="scroll down"
            className="w-full h-full object-cover animate-spin rotate-anim"
            width={300}
            height={300}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FaArrowDown color="#46D3D8" className="font-bold text-4xl" />
          </div>
        </div>
      </section>

      {/*<section ref={secondSectionRef} className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Do Ethernauts Do?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guilds.map((guild, index) => (
              <GuildCard key={index} {...guild} />
            ))}
          </div>
        </div>
      </section>*/}

      <ContributionSection />
      {/* <div className="text-center py-8">
        <Link
          href="https://app.charmverse.io/2077-collective---contribution-zone/welcome-to-2077-collective-ethernauts-contribution-zone-8830012047551685"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#277d80] px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition max-w-[300px] mx-auto inline-block"
        >
          Explore Tasks on Charmverse
        </Link>
      </div> */}
<div className="w-md mx-auto space-y-4">
<span className="font-semibold text-center"><span className="animate-pulse repeat-infinite">💡</span>This is more than a campaign—it’s a movement.</span>
<span className="text-center">The more projects that join, the stronger Ethereum’s network effect becomes.</span>
<span className="text-2xl text-center font-bold mt-4">Let's make Ethereum cool again!<span>
</div>
    </main>
  );
}
