import React from "react";
import { AiFillDelete } from "react-icons/ai";

type DeleteButtonProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <div
      className="flex flex-row items-center px-2 py-1 border border-spacing-1 rounded-full font-semibold capitalize text-red-500 bg-red-50 hover:bg-red-200 cursor-pointer border-red-200"
      onClick={onClick}
    >
      <AiFillDelete className="mr-2" />
      Delete
    </div>
  );
}
