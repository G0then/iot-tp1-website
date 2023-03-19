import React from "react";

type SimpleCardListProps = {
  title: string;
  text: string;
  date?: string;
  version?: int;
};

export default function SimpleCardList({
  title,
  text,
  date,
  version
}: SimpleCardListProps) {
    console.log(title)

  if(version == 2){
    return (
    <div className="bg-[color:var(--color-whiteDark-main)]  rounded-lg w-full p-4">
      <p className="text-[color:var(--color-blackLight-main)] text-lg font-bold">
        {title}:
        <span className="text-black text-md font-semibold pl-2">
          {text}
        </span>
      </p>
      <p className="text-[color:var(--color-grey-main)] font-lg">{date}</p>
    </div>
    );
  }

  return (
    <div className="bg-[color:var(--color-whiteDark-main)]  rounded-lg w-full p-4">
      <p className="text-lg font-semibold">
        {title}:
        <span className="text-[color:var(--color-blackLight-main)] text-lg font-bold pl-2">
          {text}
        </span>
      </p>

      <p className="text-[color:var(--color-grey-main)] font-lg">{date}</p>
    </div>
  );
}
