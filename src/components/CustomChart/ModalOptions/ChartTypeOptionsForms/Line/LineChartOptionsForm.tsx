import { useEffect, useState } from "react";
import { ChartOptionsSingleCheckbox } from "../../utils/Checkbox/SingleCheckbox";
import { ChartOptionsNumberInput } from "../../utils/NumberInput/NumberInput";
import styles from "../OptionsForms.module.css";

export type chartOptionsState = {
  Tension: number;
  Stepped: boolean;
  Fill: boolean;
  Stack: boolean;
};

//Objeto default do state de Trend
const getDefaultChartOptionsState = (chart: any) => {
  return {
    Tension: chart?.config.options.elements.line.tension ?? 0,
    Stepped: chart?.config.options.stepped ?? false,
    Fill: chart?.config.options.elements.line.fill ?? false,
    Stack: chart?.config.options.scales.y.stacked ?? false,
  };
};

type LineChartOptionsFormProps = {
  chartRef: any | null;
  handleChangeNewOptions: (options: any) => void;
};

export const LineChartOptionsForm = ({
  chartRef,
  handleChangeNewOptions,
}: LineChartOptionsFormProps) => {
  const [chartOptionsState, setChartOptionsState] = useState<chartOptionsState>(
    () => getDefaultChartOptionsState(chartRef.current)
  );
  const { Tension } = chartOptionsState;

  //Sempre que o state das novas configurações é alterada, é criado um novo objeto das configurações do gráfico e essas configurações são atualizadas no state do "ModalOptions"
  useEffect(() => {
    const { Tension, Stepped, Fill, Stack } = chartOptionsState;

    //Verifica se as novas opções são válidas e se o chart existe
    if (!chartRef.current) {
      return;
    }

    const chartOptions = chartRef.current.config.options;
    const newOptions = {
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        y: {
          ...chartOptions.scales.y,
          stacked: Stack
        }
      },
      elements: {
        ...chartOptions.elements,
        line: {
          ...chartOptions.elements.line,
          tension: Tension, //Curvatura da Linha
          fill: Fill
            // ? (value: any) => {
            //     return value.datasetIndex === 0 ? "origin" : "-1";
            //   }
            ? true
            : false,
        },
      },
      stepped: Stepped, //Para não unir os pontos
    };
    handleChangeNewOptions(newOptions);
  }, [chartOptionsState, chartRef, handleChangeNewOptions]);

  //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
  const handleChangeChartOptions = (newState: Partial<chartOptionsState>) => {
    setChartOptionsState((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.dataContainer}>
          <ChartOptionsNumberInput
            name="Tensão:"
            description="Curvatura da Linha"
            value={Tension}
            intervalValue={0.1}
            minValue={0}
            maxValue={1}
            onChangeValue={(value) =>
              handleChangeChartOptions({ Tension: value })
            }
          />
          <ChartOptionsSingleCheckbox
            name={"Fill"}
            title={"Preencher Espaços:"}
            description={"Preenche os espaços entre linhas"}
            handleSelect={(value: boolean) =>
              handleChangeChartOptions({ Fill: value })
            }
            chartOptionsState={chartOptionsState}
          />
        </div>
        <div className={styles.verticalLine} />
        <div className={styles.dataContainer}>
          <ChartOptionsSingleCheckbox
            name={"Stepped"}
            title={"Degraus:"}
            description={"Linha em forma de degrau"}
            handleSelect={(value: boolean) =>
              handleChangeChartOptions({ Stepped: value })
            }
            chartOptionsState={chartOptionsState}
          />
          <ChartOptionsSingleCheckbox
            name={"Stack"}
            title={"Somar Linhas:"}
            description={"Soma os dados existentes"}
            handleSelect={(value: boolean) =>
              handleChangeChartOptions({ Stack: value })
            }
            chartOptionsState={chartOptionsState}
          />
        </div>
      </div>
    </div>
  );
};
