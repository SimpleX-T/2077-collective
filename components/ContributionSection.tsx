import React from "react";

const ContributionSection: React.FC = () => {
  return (
    <section id="get-started" className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How To Contribute</h2>
        <p className="text-gray-700 mb-8">
          Whether you&apos;re a marketing genius, a wordsmith, a designer, a
          developer, or a video creator, there&apos;s a place for you!
        </p>
        <a
          href="https://app.charmverse.io/2077-collective---contribution-zone/welcome-to-2077-collective-ethernauts-contribution-zone-8830012047551685"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Explore Tasks on Charmverse
        </a>
      </div>
    </section>
  );
};

export default ContributionSection;
