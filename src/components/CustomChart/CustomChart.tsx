import { Chart, registerables } from "chart.js";
import { useMemo, useRef, useState } from "react";
import { Bar, Bubble, Line } from "react-chartjs-2";
import {
  chartDateTypeFormatDto,
  chartTypeCombobox,
} from "../../utils/objects/chartTypeData";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./CustomChart.module.css";
import { CustomChartOptionsMenu } from "./MenuOptions/MenuOptions";
import { emptyChartDataObj } from "../../utils/chart/objects/emptyChartOptions";
import React from "react";
import { CustomChartOptionsAxisMenu } from "./AxisMenuOptions/AxisMenuOptions";
import annotationPlugin from "chartjs-plugin-annotation";
import { verifyChartLargeAmoutData } from "../../utils/chart/Permissions/verifyChartLargeAmountData";
import { addCustomChartAnnotation } from "../../utils/chart/Annotations/addDefaultAnnotations";
import {
  CustomChartAnnotationType,
  CustomChartDataType,
} from "../../types/chart";
import { dateTabEnum } from "@/utils/objects/combobox/date";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";

//Objeto para colorir o background
//Se preferirem fazer o download do gráfico sem background pode-se remover este objeto
const bgColor = {
  id: "bgColor",
  beforeDraw: (chart: any, steps: any, options: any) => {
    const { ctx, width, height } = chart;
    ctx.fillStyle = options.backgroundColor || "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
};

//Se a janela existir
if (typeof window !== "undefined") {
  const zoomPlugin = require("chartjs-plugin-zoom"); //Coloquei isto aqui porque não funcionava no import
  const dateAdapter = require("chartjs-adapter-luxon");

  //Regista todos os controladores, elementos, plugins... que vão ser utilizados
  Chart.register(...registerables);
  Chart.register(
    zoomPlugin.default,
    dateAdapter,
    ChartDataLabels,
    annotationPlugin
  ); //Regista plugins oficiais ou criados pela comunidade
  Chart.register(bgColor); //Regista os plugins que eu criei
  Chart.defaults.font.family = "Verdana";
}

//Objeto default do state de condition
const getDefaultCustomChartData: CustomChartDataType = {
  datasetData: [],
  xLabel: "",
  yLabel: "",
  label: "",
  unitLabel: "",
};

export type CustomChartProps = {
  timeAxis?: dateTabEnum;
  datasets: CustomChartDataType[];
  annotations?: CustomChartAnnotationType[];
  isLoadingData?: boolean;
  Type?: any;
  title?: string;
  adaptiveChart?: boolean;
  numberConditions?: number;
  errorData?: any;
  customData?: any;
  disableLargeDataVerification?: boolean;
  disableChartContainer?: boolean;
  disableChartMenu?: boolean;
  disableChartButtons?: boolean;
  disableChartAxisMenu?: boolean;
  children?: React.ReactNode;
  customOptions?: any;
};

//Construção do objeto default
const defaultCustomchart: CustomChartProps = {
  Type: Line,
  timeAxis: dateTabEnum.Day,
  datasets: [getDefaultCustomChartData],
  customData: null,
  adaptiveChart: false,
  numberConditions: 1,
  isLoadingData: false,
  errorData: false,
  disableLargeDataVerification: false,
  disableChartContainer: false,
  disableChartMenu: false,
  disableChartButtons: false,
  disableChartAxisMenu: false,
  children: undefined,
};

export const CustomChart = React.memo((props: CustomChartProps) => {
  const resolvedProps = { ...defaultCustomchart, ...props };
  const {
    Type,
    timeAxis,
    customData,
    datasets,
    annotations,
    title,
    adaptiveChart,
    numberConditions,
    isLoadingData,
    errorData,
    disableLargeDataVerification,
    disableChartContainer,
    disableChartMenu,
    disableChartButtons,
    disableChartAxisMenu,
    children,
    customOptions,
  } = resolvedProps;
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [isShowingAllData, setIsShowingAllData] = useState<boolean>(false);
  const chartRef = useRef<any | null>(null); //TODO: descobrir o tipo do chart

  //Com o useLayoutEffect, o effect corre antes do
  //Nota: deixei de usar este useLayoutEffect para poupar nos renders e não spamar o utilizador com perguntas
  // useLayoutEffect(() => {
  //   setIsShowingAllData(false);
  // }, [datasets, Type]);

  //Constói o objeto com as unidades e formato de texto a apresentar nos gráficos
  const timeFormatObj: chartDateTypeFormatDto = useMemo(
    () =>
      timeAxis === dateTabEnum.Day
        ? { unit: "hour", format: "dd/LL/yyyy T" }
        : // ? {unit: "day", format: "dd/LL/yyyy T"}
        timeAxis === dateTabEnum.Month
        ? { unit: "day", format: "dd/LL/yyyy" }
        : { unit: "month", format: "LL/yyyy" },
    [timeAxis]
  );

  // Cria um array com as datas relativas aos values (necessário para o polar area e radar)
  const timeLabels = useMemo(() => {
    //Se existir alguma telemetria
    if (datasets && datasets?.length > 0) {
      //Verifica o dataset com um maior número de dados
      const highNumberOfDates = datasets.reduce(
        (p, c, i, a) =>
          a[p].datasetData!.length > c.datasetData!.length ? p : i,
        0
      );

      //Retorna os valores das datas do dataset com um maior número de dados
      return datasets[highNumberOfDates].datasetData!.map((data) => {
        return data.x;
      });
    }

    return []; //Se não existir telemetrias retorna um array nulo de datas
  }, [datasets]);

  //Obtém as função das opções em função do tipo de gráfico
  const chartTypeObj = useMemo(
    () =>
      chartTypeCombobox.find((element) => {
        return element.ChartType === Type;
      }),
    [Type]
  );

  //Obtém as settings locais dependendo do tipo do gráfico
  const defaultChartOptionsData = useMemo(() => {
    const chartOptionsData =
      datasets.length > 0 && chartTypeObj?.chartOptions
        ? chartTypeObj.chartOptions(datasets, timeFormatObj, title, timeLabels)
        : undefined;

    //Se existirem annotations, adiciona as annotations ao objeto atual das opções do gráfic
    if (annotations && annotations.length > 0 && chartOptionsData) {
      return addCustomChartAnnotation(annotations, chartOptionsData);
    } else {
      //Senão retorna o objeto das opções sem annotations
      return chartOptionsData;
    }
  }, [annotations, chartTypeObj, datasets, timeFormatObj, title, timeLabels]);

  //Obtém o número de dados a mostrar no gráfico. Esta variável é calculada sempre que o array de datasets altera.
  const numberData = useMemo(
    () =>
      datasets.reduce((acc, obj) => {
        return acc + (obj?.datasetData?.length ?? 0);
      }, 0),
    [datasets]
  );

  //Retorna gráfico
  return (
    <div
      className={
        fullScreen
          ? styles.graphContainerFullScreen
          : disableChartContainer
          ? styles.noGraphContainer
          : styles.graphContainer
      }
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {!disableChartMenu && (
        <CustomChartOptionsMenu
          chartRef={chartRef}
          chartType={Type}
          timeFormat={timeFormatObj}
          handleFullScreen={() => setFullScreen(!fullScreen)}
          disableChartButtons={disableChartButtons}
        >
          {children}
        </CustomChartOptionsMenu>
      )}
      <div
        className={
          fullScreen
            ? styles.chartFullScreen
            : adaptiveChart
            ? styles.adaptiveChart
            : styles.chart
        }
      >
        {!errorData ? (
          !isLoadingData ? (
            datasets.length > 0 ? (
              <Type
                ref={chartRef}
                data={
                  customData ??
                  (defaultChartOptionsData
                    ? defaultChartOptionsData.chartTypeData
                    : emptyChartDataObj.chartTypeData)
                }
                options={
                  customOptions ??
                  (defaultChartOptionsData
                    ? defaultChartOptionsData.chartTypeOptions
                    : emptyChartDataObj.chartTypeOptions)
                }
              />
            ) : (
              <NoData
                text={
                  numberConditions && numberConditions >= 1
                    ? "Sem Dados!"
                    : "Selecione uma ou mais telemetrias!"
                }
                disableMargin
              />
            )
          ) : (
            <LoadingData disableMargin />
          )
        ) : (
          <NoData
            text="Erro ao obter os dados!"
            disableMargin
          />
        )}
      </div>
      {!disableChartAxisMenu &&
        (Type === Line || Type === Bar || Type === Bubble) &&
        (!verifyChartLargeAmoutData(Type, numberData, isShowingAllData) ||
          disableLargeDataVerification) && (
          <CustomChartOptionsAxisMenu
            chartRef={chartRef}
            chartType={Type}
            datasets={datasets}
          />
        )}
    </div>
  );
});

CustomChart.displayName = "CustomChart";
