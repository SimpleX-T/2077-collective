import { StepCardProps } from "@/types";
import React from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

const StepsCard: React.FC<StepCardProps> = ({
  title,
  description,
  Icon,
  link,
}) => {
//   const router = useRouter();
  return (
    <div className="bg-[#081F2B] shadow-md rounded-lg py-8 px-6 hover:shadow-2xl  relative overflow-hidden hover:shadow-[#081F2B]/75 hover:-translate-y-2 transition-all  cursor-pointer">
      <Link
        href={link}
        target={link === "/frame-maker" ? "" : "_blank"}
        rel="noopener noreferrer"
        className="size-full space-y-4"
      >
        <Icon className="size-12 mx-auto" />
        <div className="">
          {" "}
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-[#50AFD4] mb-4">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default StepsCard;
