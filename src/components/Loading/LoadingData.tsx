import { Spinner } from "../Spinner/Spinner";

export type NoDataContainerProps = {
  width?: string;
  height?: string;
  margin?: string;
  disableMargin?: boolean;
  isAbsolute?: boolean;
};

//Construção do objeto default
const defaultNoDataContainer: NoDataContainerProps = {
  width: "32px",
  height: "32px",
  margin: "1em",
  disableMargin: false,
  isAbsolute: false,
};

export const LoadingData = (props: NoDataContainerProps) => {
  const resolvedProps = { ...defaultNoDataContainer, ...props };

  //Desconstrutor
  const { width, height, margin, disableMargin, isAbsolute } = resolvedProps;

  if (isAbsolute) {
    return (
      <div
        className="flex justify-center items-center font-bold absolute top-1/2 left-1/2"
        style={{
          margin: !disableMargin && margin ? margin : "0",
          transform: "translate(-50%,50%)",
        }}
      >
        <Spinner width={width} height={height} />
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center font-bold"
      style={{
        margin: !disableMargin && margin ? margin : "0",
      }}
    >
      <Spinner width={width} height={height} />
    </div>
  );
};
