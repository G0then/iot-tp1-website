import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import classNames from "classnames";

type SimpleInfoCardProps = {
  title: string;
  text?: string | number;
  description?: string;
  bottomText?: string;
  Icon?: IconType;
  href?: string;
  version?: number;
};

export default function SimpleInfoCard({
  title,
  text,
  description,
  bottomText,
  Icon,
  href,
  version,
}: SimpleInfoCardProps) {
  const Component = href ? Link : "div";

  if (version === 2) {
    return (
      // <Component {...(href && { href })}>
      <Component href={href ?? ""}>
        <div
          className={classNames(
            "flex flex-col bg-white p-5 w-full max-w-full rounded-lg space-y-3 sm:shadow-md transition-shadow duration-200 group",
            bottomText ? "h-44" : "h-40",
            href && "sm:hover:shadow-slate-400"
          )}
        >
          <h2 className="text-lg font-bold line-clamp-2">
            {title} -
            <span className="text-medium font-semibold">{` ${text}`}</span>
          </h2>
          <p className="text-sm font-medium [color:var(--color-grey-main)] line-clamp-2 flex-1">
            {description}
          </p>
          {bottomText && (
            <p className="text-sm bottom-0 right-0 [color:var(--color-grey-main)] font-semibold text-end line-clamp-1">
              {bottomText}
            </p>
          )}
        </div>
      </Component>
    );
  }

  return (
    // <Component {...(href && { href })}>
    <Component href={href ?? ""}>
      <div
        className={classNames(
          "bg-white p-5 w-full h-32 rounded-lg space-y-3 sm:shadow-md transition-shadow duration-200 group",
          href && "sm:hover:shadow-slate-400"
        )}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-medium font-semibold text-[color:var(--color-grey-main)]">
            {title}
          </h2>
          {Icon && (
            <Icon className="bg-[color:var(--color-white-main)]  border border-[color:var(--color-greyLighter-main)] rounded-full text-4xl p-2" />
          )}
        </div>
        <p className="text-3xl font-semibold capitalize truncate text-ellipsis">
          {text}
          {description && <span className="text-lg ml-1">{description}</span>}
        </p>
      </div>
    </Component>
  );
}
