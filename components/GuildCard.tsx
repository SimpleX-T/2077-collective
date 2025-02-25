import { GuildCardProps } from "@/types";
import React from "react";
import { FaDiscord } from "react-icons/fa6";


const GuildCard: React.FC<GuildCardProps> = ({
  title,
  description,
  guildLead,
  discordHandle,
  extraInfo,
  Icon,
}) => {
  return (
    <div className="bg-[#081F2B] shadow-md rounded-lg p-6 hover:shadow-xl  relative overflow-hidden hover:shadow-[#081F2B]/75 hover:-translate-y-2 transition-all">
      <Icon className="size-16 ml-auto my-2 opacity-95" />
      <div className="relative z-10">
        {" "}
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-[#50AFD4] mb-4">{description}</p>
        <p className="text-[#50AFD4]">
          Guild Lead:{" "}
          <span className="cursor-pointer text-blue-600 bg-blue-100 w-fit p-2 text-sm mt-3 rounded-full items-center gap-1 inline-flex">
            <FaDiscord />
            {discordHandle}
          </span>
        </p>
        {extraInfo && <p className="text-gray-500 mt-2">{extraInfo}</p>}
      </div>
    </div>
  );
};

export default GuildCard;
