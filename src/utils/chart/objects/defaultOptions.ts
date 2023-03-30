import { chartDateTypeFormatDto } from "../../objects/chartTypeData";
import { Context } from "chartjs-plugin-datalabels/types/context";
import { CustomChartDatasetDataType, CustomChartDataType } from "../../../types/chart";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "../../objects/colors";

export type chartOptionsDataDto = {
  chartTypeOptions: any;
  chartTypeData: any;
};

//Recebe o tamanho do ecrã e retorna o respectivo tamanho da legenda label
export const getResponsiveSizeFont = (context: any, maxSize: number) => {
  const avgSize = Math.round((context.chart.height + context.chart.width) / 2);
  const size = Math.round(avgSize / 32);
  return size > maxSize ? maxSize : size; // setting max size limit
};

//Recebe o tamanho do ecrã e retorna um objetivo com o respetivo tamanho (e outras opções)
export const getResponsiveObjFont = (
  context: any,
  maxSize: number,
  bold: boolean = true
) => {
  // let width = context.chart.width;
  // let size = Math.round(width / 32);
  const avgSize = Math.round((context.chart.height + context.chart.width) / 2);
  const size = Math.round(avgSize / 32);
  return {
    weight: bold ? "bold" : "normal",
    size: size > maxSize ? maxSize : size, // setting max size limit
  };
};

//Objeto com as opções do gráfico
export const chartOptions = (
  datasets: CustomChartDataType[],
  timeFormat: chartDateTypeFormatDto,
  title?: string
) => {

  //Objeto com os dados do gráfico
  const defaultData = {
    // labels: time,
    datasets: datasets.map((dataset) => {
      return {
        label: dataset.unitLabel ? `${dataset.label} (${dataset.unitLabel})` : dataset.label,
        data: dataset.datasetData,
        backgroundColor: dataset.backgroundColor ?? defaultChartBackgroundColor,
        borderColor: dataset.borderColor ?? defaultChartBorderColor,
        pointBackgroundColor: dataset.borderColor ?? defaultChartBorderColor,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: dataset.borderColor ?? defaultChartBorderColor,
        hoverBackgroundColor: dataset.borderColor ?? defaultChartBorderColor,
        // borderWidth: 2,
        // pointRadius: 4,
        // fill: true, //Para preencher os espaços nos gráficos de linhas
      };
    }),
  };

  const defaultOptions = {
    devicePixelRatio: 2, //Download de imagens com melhor qualidade
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    // aspectRatio: 1,
    scales: {
      x: {
        // min: time[0], //Limite Minimo
        // max: time[time.length-1], //Limite Máximo
        // adapters: {date:  { locale: "pt" }},
        type: "time",
        time: {
          unit: timeFormat.unit,
          // stepSize: "1",
          // tooltipFormat: 'dd-LL-yyyy T', //dia-mes-ano hora:minuto
          // tooltipFormat: 'dd-LL-yyyy', //dia-mes-ano
          // tooltipFormat: 'LL-yyyy', //mes-ano
          tooltipFormat: timeFormat.format, //Automático
          displayFormats: {
            // unit: 'LL/yyyy',
            hour: "dd/LL HH:mm",
            day: "dd/LL",
            month: "LL/yyyy",
          },
        },
        ticks:{
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 11.5),
          },
          source:'data',
          autoSkip: true,
          maxTicksLimit: 20, //Se remover isto, fica automático
          // maxTicksLimit: time.length/2 , //Se remover isto, fica automático
        },
        title: {
          display: true,
          text: datasets[0].xLabel,
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 12),
          },
        },
        // stacked: true,
      },
      y: {
        // type: 'category',
        title: {
          display: true,
          text:
            datasets.length === 1 ||
            datasets.every((obj) => obj.unitLabel === datasets[0].unitLabel)
              ? datasets[0].unitLabel
              : "", //Verifica se todos os datasets usam o mesmo yLabel. Se usarem a mesma é mostrada no gráfico, senão não é apresentada nenhuma label.
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 12),
          },
        },
        // reverse: true,
        ticks: {
          beginAtZero: true,
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 11.5),
          },
        },
        // min: 50,
        // max: 1000,
        // stacked: true
      },
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 2,
      },
      bar: {
        borderWidth: 2,
      },
      line: {
        borderWidth: 2,
      },
      arc: {
        borderWidth: 1,
      },
    },
    hover: {
      animationDuration: 0,
    },
    // animation: {
    //   // duration: 500, //Tempo em milisegundos das animações dos gráficos
    // },
    // spanGaps: true, // If you have a lot of data points, it can be more performant to enable spanGaps. This disables segmentation of the line, which can be an unneeded step.
    parsing: {
      xAxisKey: 'x', //Indica qual a propriedade correspondente ao eixo do x
      yAxisKey: 'y', //Indica qual a propriedade correspondente ao eixo do y
      key: 'y', //Indica a propriedade a mostrar. Sem isto os gráficos não iam mostrar valores pois não sabiam qual os valores do objeto a serem apresentados
    },
    plugins: {
      title: {
        display: title && true,
        text: title,
        font: {
          size: 15,
        },
      },
      legend: {
        display: true,
        labels: {
          // usePointStyle: true, //Utilizar um círculo como simbolo de legenda
          font: {
            size: (context: any) => getResponsiveSizeFont(context, 14),
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (title: any) => {
            return `${datasets[0].xLabel}: ${title[0].label}`;
          }, //Titulo da tooltip
          label: (value: any) => {
            return `${datasets[value.datasetIndex].label}: ${value.formattedValue} ${
              datasets[value.datasetIndex].unitLabel
            }`;
            // return `${value.dataset.label}: ${value.formattedValue} ${
            //   datasets[value.datasetIndex].unitLabel
            // }`;
          }, //Texto da tootip
        },
        // xAlign: 'left',
        // yAlign: 'bottom',
        // position: "nearest",
        intersect: false,
      },
      datalabels: {
        formatter: (value: CustomChartDatasetDataType, context: any) => {
          return value.y;
        },
        clip: true, //Corrige problema das datalabels irem para fora do gráfico
        display: "auto",
        anchor: "center",
        align: "center",
        font: (context: Context) => getResponsiveObjFont(context, 11),
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          //mode: 'x',
          // drag: {
          //   enabled: true, //Não pode ser usado ao mesmo tempo com o pan
          // },
          pinch: {
            enabled: true,
          },
          // mode: "xy",
          mode: "x",
        },
        pan: {
          enabled: true,
          // mode: "xy",
          mode: "x",
        },
        limits: {
          // axis limits
          x: {min: "original", max: "original"}, //Limita o zoom e pan do gráfico conforme os limites definidos no x e y scale
        },
      },
      bgColor: {
        backgroundColor: "white", //Altera a cor do gráfico
      },
      
    },
  };

  const chartOptionsData: chartOptionsDataDto = {
    chartTypeOptions: defaultOptions,
    chartTypeData: defaultData,
  };

  return chartOptionsData;
};
