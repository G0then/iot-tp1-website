"use client";

import React from "react";
import CustomModalButtons from "../Modal/Buttons/CustomModalButtons";

type RemoveFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClose: () => void;
};

export default function RemoveForm({
  handleSubmit,
  handleClose,
}: RemoveFormProps) {
  return (
    <form className="w-full h-full flex items-center flex-col space-y-6" onSubmit={handleSubmit}>
      <CustomModalButtons handleClose={handleClose} />
    </form>
  );
}
