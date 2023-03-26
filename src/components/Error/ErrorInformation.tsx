import { IoAlertCircle } from "react-icons/io5";

type ErrorInformationProps = {
  text: string;
  disableNoWrap?: boolean;
};

//Construção do objeto default
const defaultErrorInformation: ErrorInformationProps = {
  text: "Campo inválido",
  disableNoWrap: false,
};

export const ErrorInformation = (props: ErrorInformationProps) => {
  const resolvedProps = { ...defaultErrorInformation, ...props };

  //Desconstrutor
  const { text, disableNoWrap } = resolvedProps;

  return (
    <div className="w-full text-red-500 flex items-center space-x-2">
        <IoAlertCircle className="text-lg"/>
      <p
        className="font-medium line-clamp-1"
      >
        {text}
      </p>
    </div>
  );
};
