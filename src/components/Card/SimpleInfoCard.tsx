import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type SimpleInfoCardProps = {
  title: string;
  text: string | number;
  description?: string;
  Icon: IconType;
  href: string;
};

export default function SimpleInfoCard({
  title,
  text,
  description,
  Icon,
  href,
}: SimpleInfoCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white p-5 w-full h-32 rounded-lg space-y-3 cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md transition-shadow duration-200 group">
        <div className="flex items-center justify-between">
          <h2 className="text-medium font-semibold text-[color:var(--color-grey-main)]">
            {title}
          </h2>
          <Icon className="bg-[color:var(--color-white-main)]  border border-[color:var(--color-greyLighter-main)] rounded-full text-4xl p-2" />
        </div>
        <p className="text-3xl font-semibold flex items-center">
          {text}
          <span className="text-lg ml-1">{description}</span>
        </p>
      </div>
    </Link>
  );
}
