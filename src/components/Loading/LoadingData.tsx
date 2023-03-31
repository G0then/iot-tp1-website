import { Spinner } from "../Spinner/Spinner";

export type NoDataContainerProps = {
  width?: string;
  height?: string;
  margin?: string;
  disableMargin?: boolean;
  adaptiveHeight?: boolean;
};

//Construção do objeto default
const defaultNoDataContainer: NoDataContainerProps = {
  width: "32px",
  height: "32px",
  margin: "1em",
  disableMargin: false,
  adaptiveHeight: true,
}

export const LoadingData = (props: NoDataContainerProps) => {
  const resolvedProps = {...defaultNoDataContainer, ...props};

  //Desconstrutor
  const { width, height, margin, disableMargin, adaptiveHeight } = resolvedProps;

  return (
    <div className="flex justify-center items-center font-bold" style={{margin: !disableMargin && margin ? margin : "0", height: adaptiveHeight ? "100%" : "auto"}}>
      <Spinner width={width} height={height} />
    </div>
  );
};
