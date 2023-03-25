import React from "react";

export default function Button({ children, ...otherProps }: any) {
  return (
    <button
      className="h-full bg-blue-600 rounded-lg md:text-lg text-base text-gray-100 font-medium md:px-4 px-2 py-2"
      {...otherProps}
    >
      {children}
    </button>
  );
}
