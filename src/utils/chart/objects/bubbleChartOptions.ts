import { DateTime } from "luxon";
import { CustomChartDataType } from "../../../types/chart";
import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "../../objects/colors";
import { chartOptions, chartOptionsDataDto } from "./defaultOptions";

export const bubbleChartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string
) => {
  const defaultOptions = chartOptions(datasets, timeFormat, title);
  const { chartTypeData, chartTypeOptions } = defaultOptions;

  const bubbleChartData = {
    ...chartTypeData,
    datasets: datasets.map((dataset) => {
      const maxValueInDataset = dataset.datasetData ? Math.max(
        ...dataset.datasetData.map((o) => o.y)
      ) : 0;
      return {
        label: dataset.unitLabel ? `${dataset.label} (${dataset.unitLabel})` : dataset.label,
        data: dataset.datasetData,
        backgroundColor: dataset.backgroundColor ?? defaultChartBackgroundColor,
        borderColor: dataset.borderColor ?? defaultChartBorderColor,
        pointBackgroundColor:
          dataset.backgroundColor ?? defaultChartBackgroundColor,
        pointBorderColor: dataset.borderColor ?? defaultChartBorderColor,
        pointHoverBackgroundColor:
          dataset.borderColor ?? defaultChartBorderColor,
        pointHoverBorderColor: "#fff",
        borderWidth: 2,
        clip: { left: false, top: false, right: false, bottom: false },
        pointRadius: dataset.datasetData ? dataset.datasetData.map((data) =>
          data.y === 0 ? 0 : (data.y * 15) / maxValueInDataset + 5
        ) : 0,
      };
    }),
  };

  const bubbleChartOptions = {
    ...chartTypeOptions,
    //Caso as bubbles comecem a passar demasiado os gráficos
    // layout: {
    //   padding: {
    //     left: 0,
    //     right: 0,
    //     top: 10,
    //     bottom: 10,
    //   },
    // },
    // scales: {
    //   x: {
    //     grid: {
    //       drawBorder: false, // hide the x axis
    //     },
    //   },
    //   y: {
    //     offset: true, // create a sensation of space with the x axis hidden
    //   },
    // },
    plugins: {
      ...chartTypeOptions.plugins,
      tooltip: {
        ...chartTypeOptions.plugins.tooltip,
        caretPadding: 10, //Distãncia entre o ponteiro e o valor
        intersect: true,
        callbacks: {
          title: (title: any) => {
            return `${datasets[0].xLabel}: ${DateTime.fromMillis(title[0].parsed.x).toFormat(timeFormat.format)}`; //Por algum motivo no bubble chart a data estava 1 mês à frente
          }, //Titulo da tooltip
          label: (value: any) => {
            return `${datasets[value.datasetIndex].label}: ${value.raw.y} ${
              datasets[value.datasetIndex].unitLabel
            }`;
            // return `${value.dataset.label}: ${value.raw} ${
            //   datasets[value.datasetIndex].unitLabel
            // }`;
          }, //Texto da tootip
        },
      },
      datalabels: {
        ...chartTypeOptions.plugins.datalabels,
        anchor: 'end',
        align: 'top',
        offset: -5,
        display: datasets.length >1 ? false : "auto",
      },
    },
  };

  const bubbleChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: bubbleChartOptions,
    chartTypeData: bubbleChartData,
  };

  return bubbleChartOptionsData;
};
