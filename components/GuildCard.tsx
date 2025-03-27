import React from "react";
import { FaDiscord } from "react-icons/fa6";
import { GuildCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GuildCard: React.FC<GuildCardProps> = ({
  title,
  description,
  discordHandle,
  extraInfo,
}) => {
  return (
    <Card className="bg-gray-800 border-none overflow-hidden relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#437b7d] via-[#1f7477] to-[#145558] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-[3px] bg-gray-800 rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)]" />
      <CardHeader className="relative z-10 pt-8">
        <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-[#46D3D8] via-[#1f7477] to-[#1c979d] bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <p className="text-gray-300 text-lg">{description}</p>
        <p className="text-gray-400 mt-auto">
          Guild Lead:{" "}
          <span className="inline-flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-[#46D3D8] font-medium hover:bg-gray-600 transition">
            <FaDiscord className="text-[#46D3D8]" />
            {discordHandle}
          </span>
        </p>
        {extraInfo && <p className="text-gray-500 text-sm">{extraInfo}</p>}
      </CardContent>
    </Card>
  );
};

export default GuildCard;
