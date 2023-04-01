import { DateTime } from "luxon";
import { CustomChartDatasetDataType, CustomChartDataType } from "../../../types/chart";
import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "../../objects/colors";
import { chartOptions, chartOptionsDataDto, getResponsiveSizeFont } from "./defaultOptions";

export const polarAreaChartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string,
  timeLabels?: Date[]
) => {
  const defaultOptions = chartOptions(datasets, timeFormat, title);
  const { chartTypeData, chartTypeOptions } = defaultOptions;

  const polarAreaChartData = {
    ...chartTypeData,
    labels: timeLabels,
    datasets:
      datasets.length === 1
        ? datasets.map((dataset) => {
            return {
              label: dataset.unitLabel ? `${dataset.label} (${dataset.unitLabel})` : dataset.label,
              data: dataset.datasetData,
              backgroundColor: defaultChartBackgroundColor,
              borderColor: defaultChartBorderColor,
              pointBackgroundColor: defaultChartBorderColor,
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: defaultChartBorderColor,
              hoverBackgroundColor: defaultChartBorderColor,
            };
          })
        : chartTypeData.datasets,
  };

  const polarAreaChartOptions = {
    ...chartTypeOptions,
    scales: {
      ...chartTypeOptions.scales,
      x: {
        display: false,
      },
      y: {
        display: false,
      },
      r: {
        angleLines: {
          display: true,
        },
        ticks: {
          display: true,
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 12),
          },
          callback: function (value: number) {
            return (
              datasets[0].unitLabel &&
              (datasets.length === 1 ||
                datasets.every(
                  (obj) => obj.unitLabel === datasets[0].unitLabel
                ))
                ? `${value} ${datasets[0].unitLabel}`
                : value
            );
          },
        },
        pointLabels: {
          display: (timeLabels && timeLabels.length <= 25) ? true : false,
          centerPointLabels: true,
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 12),
          },
          callback: (value: any) => {
            return `${DateTime.fromJSDate(value).toFormat(timeFormat.format)}`;
          },
        },
      },
    },
    plugins: {
      ...chartTypeOptions.plugins,
      // legend: {
      //   position: "top",
      // },
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
            size:  (context: any) => getResponsiveSizeFont(context, 14),
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
              text: dataset.unitLabel ? `${dataset.label} (${dataset.unitLabel})` : dataset.label,
              fontColor: "#666",
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              hidden: datasetsVisibility[index], //Risca ou não a legenda conforme a visibilidade do dataset presente na lista criada anteriormente
            }));
          },
        },
      },
      datalabels: {
        ...chartTypeOptions.plugins.datalabels,
        display: datasets.length === 1 ? "auto" : false,
        // formatter: (value: number, context: any) => `${value} ${datasets[0].unitLabel ?? ""}`,
        formatter: (value: CustomChartDatasetDataType, ctx: any) => {
          let sum = 0;
          let dataArr = ctx.dataset.data;
          dataArr.map((data: CustomChartDatasetDataType) => {
            sum += data.y;
          });
          let percentage = (value.y * 100) / sum;
          // return percentage >= 10 ? percentage.toFixed(2)+"%" : "";
          return percentage >= 10
            ? `${value.y} ${datasets[0].unitLabel ?? ""}`
            : "";
        },
        // color: '#000',
      },
      tooltip: {
        ...chartTypeOptions.plugins.tooltip,
        intersect: true,
        yAlign: "bottom",
        callbacks: {
          ...chartTypeOptions.plugins.tooltip.callbacks,
          title: (title: any) => {
            return `${datasets[0].xLabel}: ${DateTime.fromJSDate(title[0].raw.x).toFormat(timeFormat.format)}`;
          }, //Titulo da tooltip
        },
      },
    },
  };

  const polarAreaChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: polarAreaChartOptions,
    chartTypeData: polarAreaChartData,
  };

  return polarAreaChartOptionsData;
};
