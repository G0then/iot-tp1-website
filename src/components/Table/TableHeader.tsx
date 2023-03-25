import React from "react";
import Button from "../Button/Button";

type TableHeaderProps = {
  title: string;
  description: string;
  disableUpdateButton?: boolean;
  textUpdateButon?: string;
  onUpdateButtonClick?: () => void;
  disableAddButton?: boolean;
  textAddButon?: string;
  onAddButtonClick?: () => void;
};

//Construção do objeto default
const defaultTableHeader: TableHeaderProps = {
  title: "Title",
  description: "Description",
  disableUpdateButton: false,
  textUpdateButon: "Update",
  disableAddButton: false,
  textAddButon: "+ Add",
};

export default function TableHeader(props: TableHeaderProps) {
  const resolvedProps = { ...defaultTableHeader, ...props };

  const {
    title,
    description,
    disableUpdateButton,
    textUpdateButon,
    onUpdateButtonClick,
    disableAddButton,
    textAddButon,
    onAddButtonClick,
  } = resolvedProps;

  return (
    <div className="flex w-full md:flex-row md:space-y-0 space-y-4 flex-col items-center justify-center">
      <div className="flex-1">
        <h3 className="sm:text-base md:text-xl text-lg font-bold line-clamp-1">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-500 line-clamp-1">
          {description}
        </p>
      </div>
      {(!disableAddButton || !disableUpdateButton) && (
        <div className="h-full flex space-x-4">
          {!disableUpdateButton && (
            <Button onClick={onUpdateButtonClick}>
              {textUpdateButon ?? "Update"}
            </Button>
          )}
          {!disableAddButton && (
            <Button onClick={onAddButtonClick}>
              {textAddButon ?? "+ Add"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
