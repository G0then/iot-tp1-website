import TextField from "@mui/material/TextField";
import { ChartOptionsSingleCheckbox } from "../../ModalOptions/utils/Checkbox/SingleCheckbox";
import { AxisOptionsState, SingleOptionAxis } from "../AxisMenuOptions";
import styles from "./MainAxisOptions.module.css";

type CustomChartOptionsMainAxisProps = {
  axisOptionsState: AxisOptionsState;
  handleChangeAxisOptions: (newState: Partial<AxisOptionsState>) => void;
};

export const CustomChartOptionsMainAxis = ({
  axisOptionsState,
  handleChangeAxisOptions,
}: CustomChartOptionsMainAxisProps) => {
  const {
    MultipleAxis,
    MinY,
    MaxY,
    MinMaxValues,
    AnnotationMinY,
    AnnotationMaxY,
    ControlLines,
  } = axisOptionsState;

  if(MultipleAxis){
    return (
      <div className={styles.mainOptionContainer}>
        <ChartOptionsSingleCheckbox
          name={"MultipleAxis"}
          title={"Controlo do Eixo Vertical:"}
          description={"Múltiplos eixos verticais"}
          displayName={"Separar por Unidades"}
          handleSelect={(value: boolean) =>
            handleChangeAxisOptions({ MultipleAxis: value })
          }
          chartOptionsState={axisOptionsState}
          disableFullWidth
        />
      </div>
    );
  }

  return (
    <div className={styles.mainOptionContainer}>
      <div className={styles.checkboxContainers}>
        <ChartOptionsSingleCheckbox
          name={"MultipleAxis"}
          title={"Controlo do Eixo Vertical:"}
          description={"Múltiplos eixos verticais"}
          displayName={"Separar por Unidades"}
          handleSelect={(value: boolean) =>
            handleChangeAxisOptions({ MultipleAxis: value })
          }
          chartOptionsState={axisOptionsState}
          disableFullWidth
        />
        <ChartOptionsSingleCheckbox
          name={"Reverse"}
          title={"Inverter:"}
          displayName={"Inverter"}
          description={"Inverte o eixo vertical"}
          handleSelect={(value: boolean) =>
            handleChangeAxisOptions({ Reverse: value })
          }
          chartOptionsState={axisOptionsState}
          disableFullWidth
        />
      </div>
      <div className={styles.MinMaxContainer}>
        <div className={styles.mainTextContainer}>
          <div className={styles.textContainer}>
            <p className={styles.title}>
              Limitar Eixo Vertical:
            </p>
            <p className={styles.description}>
              Limita os valores do eixo vertical
            </p>
          </div>
        </div>
        <div className={styles.MinMaxDataContainer}>
          <TextField
            size="small"
            id="outlined-number"
            label="Mínimo"
            type="number"
            InputProps={{ inputProps: { max: MaxY } }}
            value={MinY ?? ""}
            disabled={!MinMaxValues}
            onChange={(e) => {
              handleChangeAxisOptions({
                MinY: e.target.value ? +e.target.value : undefined,
              });
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
            disabled={!MinMaxValues}
            onChange={(e) =>
              handleChangeAxisOptions({
                MaxY: e.target.value ? +e.target.value : undefined,
              })
            }
            fullWidth
          />
          <ChartOptionsSingleCheckbox
            name={"MinMaxValues"}
            title={"Padrão:"}
            displayName={"Ativado"}
            handleSelect={
              (value: boolean) =>
                handleChangeAxisOptions({ MinMaxValues: value })
              //Caso queira reiniciar o valor do eixo min e máximo sempre que a checkbox deixa de estar ativada
              // changeHandler({ ...unitLabel, DefaultMinMaxValues: value, MinY: value ? undefined : MinY ,MaxY: value ? undefined : MaxY }, index)
            }
            chartOptionsState={axisOptionsState}
            disableText
          />
        </div>
        </div>
        <div className={styles.MinMaxContainer}>
          <div className={styles.mainTextContainer}>
            <div className={styles.textContainer}>
              <p className={styles.title}>
                Linhas de Controlo:
              </p>
              <p className={styles.description}>
              Adiciona linhas de controlo
              </p>
            </div>
          </div>
          <div className={styles.MinMaxDataContainer}>
            <TextField
              size="small"
              id="outlined-number"
              label="Mínimo"
              type="number"
              InputProps={{ inputProps: { max: AnnotationMaxY } }}
              value={AnnotationMinY ?? ""}
              disabled={!ControlLines}
              onChange={(e) => {
                handleChangeAxisOptions({
                  AnnotationMinY: e.target.value ? +e.target.value : undefined,
                });
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
                handleChangeAxisOptions({
                  AnnotationMaxY: e.target.value ? +e.target.value : undefined,
                })
              }
              fullWidth
            />
            <ChartOptionsSingleCheckbox
              name={"ControlLines"}
              title={"Linha de Controlo:"}
              displayName={"Ativado"}
              handleSelect={(value: boolean) =>
                handleChangeAxisOptions({ ControlLines: value })
              }
              chartOptionsState={axisOptionsState}
              disableText
            />
        </div>
      </div>
    </div>
  );
};
