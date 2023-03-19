import styles from "./Spinner.module.css";

//Definição do tipo
type SpinnerProps = {
  width?: string;
  height?: string;
  color?: string;
};

//Construção do objeto default
const defaultSpinnerOptions: SpinnerProps = {
  width: "48px",
  height: "48px",
  color: "blue",
};

//Retorna um Spinner com o tamanho e cor indicados
export const Spinner = (props: SpinnerProps) => {
  const resolvedProps = { ...defaultSpinnerOptions, ...props };

  //Desconstrutor
  const { width, height, color } = resolvedProps;

  return (
    <div className={styles.loader} style={{width: width, height: height}}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          className={color==="white" ? styles.pathWhite : styles.pathBlue}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
