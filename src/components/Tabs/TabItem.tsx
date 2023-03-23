import classNames from "classnames";
import React from "react";

type TabItemProps = {
  text: string;
  selected: boolean;
  handleOnClick: () => void;
};

export default function TabItem({ text, selected, handleOnClick }: TabItemProps) {
  return (
    <p
      className={classNames(
        "text-lg uppercase p-2 hover:bg-gray-300 cursor-pointer rounded-lg",
        selected ? "font-bold" : "font-medium"
      )}
      onClick={handleOnClick}
    >
      {text}
    </p>
  );
}
