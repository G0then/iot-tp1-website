import TextField from "@mui/material/TextField";
import { ChartOptionsSingleCheckbox } from "../../ModalOptions/utils/Checkbox/SingleCheckbox";
import { SingleOptionAxis } from "../AxisMenuOptions";
import styles from "./SingleAxisOptions.module.css";

type CustomChartOptionsSingleAxisProps = {
  index: number;
  unitLabel: SingleOptionAxis;
  changeHandler: (obj: Partial<SingleOptionAxis>, index: number) => void;
};

export const CustomChartOptionsSingleAxis = ({
  index,
  unitLabel,
  changeHandler,
}: CustomChartOptionsSingleAxisProps) => {
  const {
    AxisId,
    MinY,
    MaxY,
    DefaultMinMaxValues,
    AnnotationMinY,
    AnnotationMaxY,
    ControlLines,
  } = unitLabel;

  return (
    <>
      <div className={styles.line} />
      <div className={styles.container}>
        <TextField
          size="small"
          id="outlined-required"
          label="Unidade"
          type="text"
          value={AxisId}
          //Deixa as cores dentro da combobox a preto
          //   sx={{
          //     "& .MuiInputBase-input.Mui-disabled": {
          //       WebkitTextFillColor: "var(--main-black-secondary-color)",
          //     },
          //   }}
          fullWidth
          disabled
        />
        <div className={styles.MinMaxContainer}>
          <TextField
            size="small"
            id="outlined-number"
            label="Mínimo"
            type="number"
            InputProps={{ inputProps: { max: MaxY } }}
            value={MinY ?? ""}
            disabled={DefaultMinMaxValues}
            onChange={(e) => {
              changeHandler(
                {
                  ...unitLabel,
                  MinY: e.target.value ? +e.target.value : undefined,
                  //   DefaultMinMaxValues: e.target.value
                  //     ? false
                  //     : !MaxY
                  //     ? true
                  //     : false,
                },
                index
              );
            }}
            fullWidth
          />
          <TextField
            size="small"
            id="outlined-number"
            label="Máximo"
            type="number"
            InputProps={{ inputProps: { min: MinY } }}
            value={MaxY ?? ""}
            disabled={DefaultMinMaxValues}
            onChange={(e) =>
              changeHandler(
                {
                  ...unitLabel,
                  MaxY: e.target.value ? +e.target.value : undefined,
                  //   MinY: e.target.value && MinY
                  //     ? (+e.target.value > MinY)
                  //       ? MinY
                  //       : +e.target.value
                  //     : MinY,
                  //   DefaultMinMaxValues: e.target.value
                  //     ? false
                  //     : !MinY
                  //     ? true
                  //     : false,
                },
                index
              )
            }
            fullWidth
          />
          <ChartOptionsSingleCheckbox
            name={"DefaultMinMaxValues"}
            title={"Padrão:"}
            displayName={"Padrão"}
            handleSelect={
              (value: boolean) =>
                changeHandler({ DefaultMinMaxValues: value }, index)
              //Caso queira reiniciar o valor do eixo min e máximo sempre que a checkbox deixa de estar ativada
              // changeHandler({ DefaultMinMaxValues: value, MinY: value ? undefined : MinY ,MaxY: value ? undefined : MaxY }, index)
            }
            chartOptionsState={unitLabel}
            disableText
          />
        </div>
        <ChartOptionsSingleCheckbox
          name={"Reverse"}
          title={"Inverter:"}
          displayName={"Inverter Eixo"}
          description={"Inverter os eixos verticais"}
          handleSelect={(value: boolean) =>
            changeHandler({ Reverse: value }, index)
          }
          chartOptionsState={unitLabel}
          disableText
        />
        <div className={styles.MinMaxContainer}>
          <TextField
            size="small"
            id="outlined-number"
            label="Mínimo"
            type="number"
            InputProps={{ inputProps: { max: AnnotationMaxY } }}
            value={AnnotationMinY ?? ""}
            disabled={!ControlLines}
            onChange={(e) => {
              changeHandler(
                {
                  AnnotationMinY: e.target.value ? +e.target.value : undefined,
                },
                index
              );
            }}
            fullWidth
          />
          <TextField
            size="small"
            id="outlined-number"
            label="Máximo"
            type="number"
            InputProps={{ inputProps: { min: AnnotationMinY } }}
            value={AnnotationMaxY ?? ""}
            disabled={!ControlLines}
            onChange={(e) =>
              changeHandler(
                {
                  AnnotationMaxY: e.target.value ? +e.target.value : undefined,
                },
                index
              )
            }
            fullWidth
          />
          <ChartOptionsSingleCheckbox
            name={"ControlLines"}
            title={"Linha de Controlo:"}
            displayName={"Linha Controlo"}
            handleSelect={(value: boolean) =>
              changeHandler({ ControlLines: value }, index)
            }
            chartOptionsState={unitLabel}
            disableText
          />
        </div>
      </div>
    </>
  );
};
