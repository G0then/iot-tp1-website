import classNames from "classnames";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  aditionalClassName: string;
}


export default function Button({ children, aditionalClassName="", ...otherProps }: any) {
  return (
    <button
      className={classNames(aditionalClassName, "h-full bg-blue-600 hover:bg-blue-700 rounded-lg md:text-lg text-base text-gray-100 font-medium md:px-4 px-2 py-2")}
      {...otherProps}
    >
      {children}
    </button>
  );
}
