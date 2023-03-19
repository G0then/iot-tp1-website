import React, { ReactNode } from "react";
import { IconType } from "react-icons";

type AdvancedInfoCardProps = {
  title: string;
  text: string;
  Icon: IconType;
  children: ReactNode;
};

export default function AdvancedInfoCard({
  title,
  text,
  Icon,
  children,
}: AdvancedInfoCardProps) {
  return (
    <div className="bg-white p-5 w-full h-auto rounded-lg space-y-3 sm:shadow-md">
      <div className="flex items-center space-x-4 mb-3">
        <Icon className="text-3xl text-[color:var(--color-grey-main)]" />
        <h2 className="text-lg font-semibold text-[color:var(--color-black-main)]">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
