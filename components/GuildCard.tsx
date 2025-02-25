import { GuildCardProps } from "@/types";
import Link from "next/link";
import React from "react";

const GuildCard: React.FC<GuildCardProps> = ({
  title,
  description,
  guildLead,
  discordHandle,
  extraInfo,
}) => {
  return (
    <div className="bg-[#081F2B] shadow-md rounded-lg p-6 hover:shadow-xl transition">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-[#50AFD4] mb-4">{description}</p>
      <p className="text-[#50AFD4]">
        Guild Lead: <span className="font-medium">{guildLead}</span> (
        <Link
          href={"https://discord.com/" + discordHandle}
          className="text-blue-600"
        >
          {discordHandle}
        </Link>
        )
      </p>
      {extraInfo && <p className="text-gray-500 mt-2">{extraInfo}</p>}
    </div>
  );
};

export default GuildCard;
