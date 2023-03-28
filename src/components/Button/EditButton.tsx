import React from "react";
import { AiFillEdit } from "react-icons/ai";

type EditButtonProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <div
      className="flex flex-row items-center px-2 py-1 border border-spacing-1 rounded-full font-semibold capitalize text-orange-500 bg-orange-50 hover:bg-orange-200 cursor-pointer border-orange-200"
      onClick={onClick}
    >
      <AiFillEdit className="mr-2" />
      Edit
    </div>
  );
}
