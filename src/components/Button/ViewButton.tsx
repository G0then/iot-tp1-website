import React from "react";
import { AiFillEye } from "react-icons/ai";

type ViewButtonProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function ViewButton({ onClick }: ViewButtonProps) {
  return (
    <div
      className="flex flex-row items-center px-2 py-1 border border-spacing-1 rounded-full font-semibold capitalize text-blue-500 bg-blue-50 hover:bg-blue-200 cursor-pointer border-blue-200"
      onClick={onClick}
    >
      <AiFillEye className="mr-2" />
      View
    </div>
  );
}
