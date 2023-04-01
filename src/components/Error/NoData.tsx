import { transform } from "typescript";

export type NoDataContainerProps = {
  text?: string;
  fontSize?: string;
  margin?: string;
  disableMargin?: boolean;
  isAbsolute?: boolean;
};

//Construção do objeto default
const defaultNoDataContainer: NoDataContainerProps = {
  text: "No data!",
  fontSize: "1.2em",
  margin: "1em",
  disableMargin: false,
  isAbsolute: false,
};

export const NoData = (props: NoDataContainerProps) => {
  const resolvedProps = { ...defaultNoDataContainer, ...props };

  //Desconstrutor
  const { text, fontSize, margin, disableMargin, isAbsolute } =
    resolvedProps;

  if(isAbsolute){
    return (
      <div
        className="flex justify-center items-center font-bold absolute top-1/2 left-1/2"
        style={{
          fontSize: fontSize,
          margin: !disableMargin && margin ? margin : "0",
          transform: "translate(-50%,50%)"
        }}
      >
        <p className="text-center">{text}</p>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center font-bold "
      style={{
        fontSize: fontSize,
        margin: !disableMargin && margin ? margin : "0"
      }}
    >
      <p className="text-center">{text}</p>
    </div>
  );
};
