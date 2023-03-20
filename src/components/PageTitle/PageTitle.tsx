import React from "react";

//Definição do tipo
type PageTitleProps = {
  title: string;
  description?: string;
};

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div>
      <h1 className="title">{title}</h1>
      {description && <p className="description mt-2">{description}</p>}
    </div>
  );
}
