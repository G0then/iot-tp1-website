import { useEffect, useState } from "react";
import { ChartOptionsSingleCheckbox } from "../../utils/Checkbox/SingleCheckbox";
import styles from "../OptionsForms.module.css";

export type chartOptionsState = {
  Stacked: boolean;
  SumDatasets: boolean;
};

//Objeto default do state de Trend
const getDefaultChartOptionsState = (chart: any) => {
  return {
    Stacked: chart?.config.options.scales.x.stacked ?? false,
    SumDatasets: (chart?.config.options.scales.x.stacked && chart?.options.scales.y.stacked) ?? false,
  };
};

type BarChartOptionsFormProps = {
  chartRef: any | null;
  handleChangeNewOptions: (options: any) => void;
};

export const BarChartOptionsForm = ({
  chartRef,
  handleChangeNewOptions,
}: BarChartOptionsFormProps) => {
  const [chartOptionsState, setChartOptionsState] = useState<chartOptionsState>(() => getDefaultChartOptionsState(chartRef.current));

  //Sempre que o state das novas configurações é alterada, é criado um novo objeto das configurações do gráfico e essas configurações são atualizadas no state do "ModalOptions"
  useEffect(() => {
    const { Stacked, SumDatasets } = chartOptionsState;

    //Verifica se as novas opções são válidas e se o chart existe
    if (!chartRef.current) {
      return;
    }

    const chartOptions = chartRef.current.config.options;
      const newOptions = {
        ...chartOptions,
        scales:{
          ...chartOptions.scales,
          x: {
            ...chartOptions.scales.x,
            stacked: Stacked || SumDatasets,
          },
          //Soma um ao outro
          y: {
            ...chartOptions.scales.y,
            stacked: SumDatasets,
          }
        },
        plugins: {
          ...chartOptions.plugins,
          datalabels: {
            ...chartOptions.plugins.datalabels,
            anchor: Stacked || SumDatasets ? 'end' : 'middle',
            align: Stacked || SumDatasets ? 'bottom' : 'middle',
          }
        }
      };
      handleChangeNewOptions(newOptions)
  },[chartOptionsState, chartRef, handleChangeNewOptions]);

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
            <ChartOptionsSingleCheckbox
            name={"Stacked"}
            title={"Agrupar:"}
            description={"Agrupa os dados na mesma barra"}
            handleSelect={(value: boolean) => handleChangeChartOptions({Stacked: value})}
            chartOptionsState={chartOptionsState} 
          />
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.dataContainer}>
          <ChartOptionsSingleCheckbox
            name={"SumDatasets"}
            title={"Somar:"}
            description={"Soma os dados na mesma barra"}
            handleSelect={(value: boolean) => handleChangeChartOptions({SumDatasets: value})}
            chartOptionsState={chartOptionsState} 
          />
        </div>
      </div>
    </div>
  );
};
