import { CustomChartDatasetDataType, CustomChartDataType } from "../../../types/chart";
import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import {
  chartOptions,
  chartOptionsDataDto,
  getResponsiveSizeFont,
} from "./defaultOptions";
import { DateTime } from "luxon";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "../../objects/colors";


export const doughnutChartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string
) => {
  const defaultOptions = chartOptions(datasets, timeFormat, title);
  const { chartTypeData, chartTypeOptions } = defaultOptions;

  const doughnutChartData = {
    ...chartTypeData,
    datasets: datasets.map((dataset) => {
      return {
        label: dataset.label,
        data: dataset.datasetData,
        backgroundColor: defaultChartBackgroundColor,
        borderColor: defaultChartBorderColor,
        hoverBackgroundColor: defaultChartBorderColor,
        hoverBorderColor: defaultChartBorderColor,
        // borderWidth: 1, //Border Width
        hoverBorderWidth: 1, //Border Width on Hover
        hoverOffset: datasets.length === 1 ? 10 : 0,
      };
    }),
  };

  const doughnutChartOptions = {
    ...chartTypeOptions,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      ...chartTypeOptions.plugins,
      datalabels: {
        ...chartTypeOptions.plugins.datalabels,
        // elements: {
        //   arc: {
        //     backgroundColor: colorize.bind(null, false, false),
        //     hoverBackgroundColor: hoverColorize
        //   }
        // },
        display: datasets.length <= 2 ? true : false,
        formatter: (value: CustomChartDatasetDataType, ctx: any) => {
          const sum = ctx.chart._metasets[ctx.datasetIndex].total;
          const percentage = (value.y * 100) / sum;
          return percentage > 3 ? percentage.toFixed(2) + "%" : "";
        },
        // color: "#000",
      },
      tooltip: {
        ...chartTypeOptions.plugins.tooltip,
        intersect: true,
        yAlign: "bottom",
        caretPadding: 10, //Distãncia entre o ponteiro e o valor
        callbacks: {
          ...chartTypeOptions.plugins.tooltip.callbacks,
          title: (title: any) => {
            return `${datasets[0].xLabel}: ${DateTime.fromJSDate(title[0].raw.x).toFormat(timeFormat.format)}`;
          }, //Titulo da tooltip
        },
      },
      //NOTA: Se o código abaixo em relação for comentado/apagado, o gráfico é filtrado pela data ao invés do dataset
      legend: {
        ...chartTypeOptions.plugins.legend,
        //Ao clicar na legenda, se o respectivo dataset estiver visivel, o mesmo fica invisivel e vice-versa.
        onClick: (evt: any, legendItems: any, legend: any) => {
          const datasets = legend.legendItems.map(
            (dataset: any, index: number) => {
              return dataset.text;
            }
          );
          const index = datasets.indexOf(legendItems.text);
          if (legend.chart.isDatasetVisible(index) === true) {
            legend.chart.hide(index);
          } else {
            legend.chart.show(index);
          }
        },
        labels: {
          ...chartTypeOptions.plugins.labels,
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 14),
          },
          generateLabels: (chart: any) => {
            let datasetsVisibility: boolean[] = [];

            //Preenche o array de visibilidade dos datasets
            for (let i = 0; i < datasets.length; i++) {
              if (chart.isDatasetVisible(i) === false) {
                datasetsVisibility.push(true);
              } else {
                datasetsVisibility.push(false);
              }
            }

            return datasets.map((dataset: any, index: number) => ({
              text: dataset.unitLabel
                ? `${dataset.label} (${dataset.unitLabel})`
                : dataset.label,
              fontColor: "#666",
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              hidden: datasetsVisibility[index], //Risca ou não a legenda conforme a visibilidade do dataset presente na lista criada anteriormente
            }));
          },
        },
      },
    },
  };

  const doughnutChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: doughnutChartOptions,
    chartTypeData: doughnutChartData,
  };

  return doughnutChartOptionsData;
};
