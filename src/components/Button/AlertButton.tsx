import classNames from "classnames";
import React from "react";

export default function AlertButton(params: any) {
  return (
    <div
      className={classNames(
        params.formattedValue === 1
          ? "text-green-500 bg-green-50 border-green-200"
          : "text-red-500 bg-red-50 border-red-200",
        "px-2 py-1 border border-spacing-1 border-gray-200 rounded-full font-semibold capitalize"
      )}
    >
      {params.formattedValue === 0 ? "Alert" : "Cleared"}
    </div>
  );
}
