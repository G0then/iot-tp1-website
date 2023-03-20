export type NoDataContainerProps = {
  text?: string;
  fontSize?: string;
  margin?: string;
  disableMargin?: boolean;
  adaptiveHeight?: boolean;
};

//Construção do objeto default
const defaultNoDataContainer: NoDataContainerProps = {
  text: "Sem dados!",
  fontSize: "1.2em",
  margin: "1em",
  disableMargin: false,
  adaptiveHeight: false,
};

export const NoData = (props: NoDataContainerProps) => {
  const resolvedProps = { ...defaultNoDataContainer, ...props };

  //Desconstrutor
  const { text, fontSize, margin, disableMargin, adaptiveHeight } =
    resolvedProps;

  return (
    <div
      className="flex justify-center items-center font-bold"
      style={{
        fontSize: fontSize,
        margin: !disableMargin && margin ? margin : "0",
        height: adaptiveHeight ? "100%" : "auto",
      }}
    >
      <p className="text-center">{text}</p>
    </div>
  );
};
