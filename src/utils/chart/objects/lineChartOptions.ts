import { CustomChartDataType } from "../../../types/chart";
import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "../../objects/colors";
import { chartOptions, chartOptionsDataDto } from "./defaultOptions";

export const lineChartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string
) => {
  const defaultOptions = chartOptions(datasets, timeFormat, title);
  const { chartTypeData, chartTypeOptions } = defaultOptions;
  const lineChartData = {
    ...chartTypeData,
    // labels: time,
    datasets: datasets.map((dataset) => {
      return {
        label: dataset.unitLabel
          ? `${dataset.label} (${dataset.unitLabel})`
          : dataset.label,
        data: dataset.datasetData,
        backgroundColor: dataset.backgroundColor ?? defaultChartBackgroundColor,
        borderColor: dataset.borderColor ?? defaultChartBorderColor,
        pointBackgroundColor: dataset.borderColor ?? defaultChartBorderColor,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: dataset.borderColor ?? defaultChartBorderColor,
        hoverBackgroundColor: dataset.borderColor ?? defaultChartBorderColor,
        yAxisID: 'y',
        // borderWidth: 2,
        // pointRadius: 4,
        // fill: true, //Para preencher os espaços nos gráficos de linhas
      };
    }),
  };

  const lineChartOptions = {
    ...chartTypeOptions,
    elements: {
      ...chartTypeOptions.elements,
      line: {
        ...chartTypeOptions.elements.line,
        tension: 0, //Curvatura da Linha
        fill: false, //Preenchimento da linha
      },
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    // stepped: true, //Para não unir os pontos
    plugins: {
      ...chartTypeOptions.plugins,
      tooltip: {
        ...chartTypeOptions.plugins.tooltip,
        // callbacks: {
        //   ...chartTypeOptions.plugins.tooltip.callbacks,
        //   title: (title: any) => {
        //     return `${datasets[0].xLabel}: ${title[0].label}`;
        //   }, //Titulo da tooltip
        // },
      },
      datalabels: {
        display: false,
      },
    },
  };

  const lineChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: lineChartOptions,
    chartTypeData: lineChartData,
  };

  return lineChartOptionsData;
};
