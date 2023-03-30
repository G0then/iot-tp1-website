import { DateTime } from "luxon";
import { CustomChartDataType } from "../../../types/chart";
import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import { chartOptions, chartOptionsDataDto, getResponsiveSizeFont } from "./defaultOptions";

export const radarChartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string,
  timeLabels?: Date[]
) => {
  const defaultOptions = chartOptions(datasets, timeFormat, title);
  const { chartTypeData, chartTypeOptions } = defaultOptions;

  const radarChartData = {
    ...chartTypeData,
    labels: timeLabels,
  };

  const radarChartOptions = {
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
          // display: time.length <= 25 ? true : false, //Mostra as labels ao redor do gráfico caso o número de labels de tempo seja menor ou igual que 25
          display: (timeLabels && timeLabels.length <= 25) ? true : false, //Mostra as labels ao redor do gráfico caso o número de labels de tempo seja menor ou igual que 25
          centerPointLabels: false,
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 12),
          },
          callback: function (value: any) {
            return `${DateTime.fromJSDate(value).toFormat(timeFormat.format)}`;
          },
        },
      },
    },
    scale: {
      beginAtZero: true,
      min: 0,   
      // ticks: {
      //   z: 1, // para colocar os ticks por cima dos gráficos
      // }
    },
    parsing: {
      xAxisKey: 'x', //Indica qual a propriedade correspondente ao eixo do x
      yAxisKey: 'y', //Indica qual a propriedade correspondente ao eixo do y
      key: 'y', //Indica a propriedade a mostrar. Sem isto os gráficos não iam mostrar valores pois não sabiam qual os valores do objeto a serem apresentados
    },
    plugins: {
      ...chartTypeOptions.plugins,
      datalabels: {
        ...chartTypeOptions.plugins.datalabels,
        // display: datasets.length === 1 ? true : false,
        display: false,
        // color: "#000",
      },
      tooltip: {
        ...chartTypeOptions.plugins.tooltip,
        callbacks: {
          ...chartTypeOptions.plugins.tooltip.callbacks,
          title: (title: any) => {
            return `${datasets[0].xLabel}: ${DateTime.fromJSDate(title[0].raw.x).toFormat(timeFormat.format)}`;
          }, //Titulo da tooltip
        },
      },
    },
  };

  const radarChartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: radarChartOptions,
    chartTypeData: radarChartData,
  }

  return radarChartOptionsData;
};
