import classNames from "classnames";
import React from "react";

export default function StatusButton(params: any) {
  return (
    <div
      className={classNames(
        params.formattedValue === "active" || params.formattedValue === "online"
          ? "text-green-500 bg-green-50 border-green-200"
          : params.formattedValue === "inactive" || params.formattedValue === "offline"
          ? "text-red-500 bg-red-50 border-red-200"
          : "text-yellow-500 bg-yellow-50 border-yellow-200",
        "px-2 py-1 border border-spacing-1 border-gray-200 rounded-full font-semibold capitalize"
      )}
    >
      {params.formattedValue}
    </div>
  );
}
