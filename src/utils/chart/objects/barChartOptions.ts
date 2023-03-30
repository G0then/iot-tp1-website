import { CustomChartDataType } from "../../../types/chart";
import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import { chartOptions, chartOptionsDataDto } from "./defaultOptions";

export const barChartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string
) => {
  const defaultOptions = chartOptions(datasets, timeFormat, title);
  const { chartTypeData, chartTypeOptions } = defaultOptions;

  const barChartData = {
    ...chartTypeData,
  };

  const barChartOptions = {
    ...chartTypeOptions,
    // indexAxis: 'y', //Coloca o gráfico de barras na horizontal
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
        intersect: true,
        yAlign: 'bottom',
      },
      datalabels: {
        ...chartTypeOptions.plugins.datalabels,
        // display: (ctx: any) => {
        //   console.log(ctx)
        //   return ctx.dataset.data.length <= 15 ? "auto" : false;
        // }, 
        anchor: 'middle',
        align: 'middle',
        // formatter: Math.round,
        // color: '#000',
      }
    },
  };

  const barChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: barChartOptions,
    chartTypeData: barChartData,
  }

  return barChartOptionsData;
};
