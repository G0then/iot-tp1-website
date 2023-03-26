import React from "react";

type CustomModalButtonsProps = {
  handleClose: () => void;
};

export default function CustomModalButtons({
  handleClose,
}: CustomModalButtonsProps) {
  return (
    <div className="w-full flex justify-around items-center">
      <button
        type="button"
        className="font-semibold text-lg px-2 py-1 rounded-lg transition-all ease-in duration-200 bg-red-100 border-red-300 border hover:bg-red-300 border-spacing-1 capitalize"
        onClick={handleClose}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="font-semibold text-lg px-2 py-1 rounded-lg transition-all ease-in duration-200 bg-green-100 border-green-300 border hover:bg-green-300 border-spacing-1 capitalize hover:-translate-y-1"
      >
        Confirm
      </button>
    </div>
  );
}
