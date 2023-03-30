import { Checkbox } from "@/components/Checkbox/Checkbox";
import classnames from "classnames";
import styles from "./Checkbox.module.css";

type ChartOptionsSingleCheckboxProps = {
  name: string;
  description?: string;
  title: string;
  displayName?: string;
  handleSelect: (newState: boolean) => void;
  chartOptionsState: any;
  disableText?: boolean;
  disableFullWidth?: boolean;
};

//Construção do objeto default
const defaultChartOptionsSingleCheckbox: ChartOptionsSingleCheckboxProps = {
  name: "",
  title: "",
  displayName: "",
  handleSelect: () => false,
  chartOptionsState: undefined,
  disableText: false,
  disableFullWidth: false,
}

export const ChartOptionsSingleCheckbox = (props: ChartOptionsSingleCheckboxProps) => {
  const resolvedProps = {...defaultChartOptionsSingleCheckbox, ...props};

  //Desconstrutor
  const { name, title, description, displayName, handleSelect, chartOptionsState, disableText, disableFullWidth } = resolvedProps;

  const itemValue = chartOptionsState[name as keyof any] as
    | boolean
    | undefined;

  return (
    <div className={styles.numberInputContainer} style={{gap: !disableFullWidth ? "0" : "2em"}}>
      {!disableText && <div className={classnames(!disableFullWidth ? styles.mainDataContainerFullWidth : styles.mainDataContainer)}>
        <div className={styles.textContainer}>
          <p className={styles.title}>{title}</p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>}
      {/* <ul className={styles.singleItemContainer}> */}
        <div
          key={name}
          className={styles.menuItems}
          onClick={() => handleSelect(!itemValue ? true : false)}
        >
          <Checkbox
            key={name}
            label={displayName}
            value={itemValue ? 1 : 0}
          />
        </div>
      {/* </ul> */}
    </div>
  );
};
