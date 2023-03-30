import { CustomChart } from "../../../CustomChart/CustomChart";
import { conditionTrendState, trendState } from "../TrendContainer";
import {
  TelemetryHistoryDataDto,
  TelemetryLatests,
} from "../../../../types/telemetry.dto";
import {
  useCacheMultiQuery,
} from "../../../../utils/Requests/getSwr";
import { useMemo } from "react";
import { useTelemetryTypes } from "../../../../utils/contexts/TelemetryType/telemetryTypeContext";
import { dateTabEnum } from "../../../../utils/objects/comboboxData";
import { TrendChartVizualizationOptionsMenu } from "./OptionsMenu/VizualizationOptionsMenu";
import { CustomChartDataType } from "../../../../types/chart.dto";
import { DateTime } from "luxon";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "../../../../utils/objects/colors";

export type TrendChartProps = {
  handleChangeTrend: (newState: Partial<trendState>) => void;
  trendState: trendState;
};

export const TrendChart = ({
  handleChangeTrend,
  trendState,
}: TrendChartProps) => {
  const { activeTab, StartDateTime, StopDateTime, numberConditions } = trendState;

  //Obtém o tipo de telemetria escolhida
  const dictTelemetryTypes = useTelemetryTypes(); //Obtém o dicionário de todos os tipos de telemetria

  //Constrói a lista com os url para os endpoints das telemetrias dos gráficos
  const urlTrendTelemetryList = useMemo(() => {
    //Verifica que existe data inicial, data final e que a data final é maior ou igual à data inicial
    if (
      !StartDateTime ||
      !StopDateTime ||
      (DateTime.fromJSDate(new Date(StopDateTime)) <  DateTime.fromJSDate(new Date(StartDateTime)))
    ) {
      return [];
    }

    const activeTabCapitalFirstLetter =
      activeTab.charAt(0).toUpperCase() + activeTab.slice(1); //Transforma a primeira letra da palavra em letra maiúscula

    return trendState.ListConditions.map((condition: conditionTrendState) => {
      if (condition.Telemetry && condition.Telemetry.length > 0) {
        return condition.Telemetry.map((telemetry: TelemetryLatests) => {
          let url =
            condition.Device && StartDateTime && StopDateTime
              ? `telemetry/telemetry/getTelemetryBy${activeTabCapitalFirstLetter}V4?devicePid=${condition.Device.devicePid}&telemetryDescription=${telemetry.telemetryDescription}&inicio=${StartDateTime}&fim=${StopDateTime}`
              : null;
          return url;
        });
      }
    }).flat(1); //Retira 1 nível de todos os arrays (Sei que não é a melhor forma. Talvez tivesse que usar um useReducer e um forof)
  }, [StartDateTime, StopDateTime, activeTab, trendState.ListConditions]);

  const {
    data: telemetryDevicesData,
    errorRequest: telemetryDevicesError,
    isLoading: telemetryDevicesIsLoading,
  } = useCacheMultiQuery<TelemetryHistoryDataDto[]>(urlTrendTelemetryList); 
  
  //Objeto com os dados dos datasets a serem apresentados no gráfico
  const graphDatasets: CustomChartDataType[] = useMemo(
    () =>
      telemetryDevicesData &&
      !telemetryDevicesData.every((subArr) => subArr.length === 0) //Verifica se existe pelo menos um dataset com valores
        ? telemetryDevicesData
            .filter((telemetryDeviceData) => telemetryDeviceData.length >= 1) //Filtra apenas os datasets com pelo menos um valor ou mais
            .map(
              (
                filteredTelemetryDeviceData: TelemetryHistoryDataDto[],
                index: number
              ) => {
                return {
                  datasetData: filteredTelemetryDeviceData ? filteredTelemetryDeviceData.map((data: TelemetryHistoryDataDto) => {
                    const time = new Date(
                      data.Year,
                      data.Month - 1,
                      data.Day ?? 1,
                      data.Hour ?? 0,
                      data.Period ?? 0
                    );
            
                    return {y: data.Value, x: time}
                  }) : [],
                  xLabel:
                    trendState.activeTab === dateTabEnum.Day
                      ? "Hora"
                      : trendState.activeTab === dateTabEnum.Month
                      ? "Dia"
                      : "Mês",
                  yLabel:
                    dictTelemetryTypes[
                      filteredTelemetryDeviceData[0].telemetryDescription
                    ].displayDescription ?? "",
                  label: dictTelemetryTypes[
                    filteredTelemetryDeviceData[0].telemetryDescription
                  ].measureUnit
                    ? `${filteredTelemetryDeviceData[0].devicePid} - ${
                        dictTelemetryTypes[
                          filteredTelemetryDeviceData[0].telemetryDescription
                        ].displayDescription
                      }`
                    : filteredTelemetryDeviceData[0].devicePid,
                  unitLabel:
                    dictTelemetryTypes[
                      filteredTelemetryDeviceData[0].telemetryDescription
                    ].measureUnit ?? "",
                  backgroundColor: defaultChartBackgroundColor[index],
                  borderColor: defaultChartBorderColor[index],
                };
              }
            )
        : [],
    [dictTelemetryTypes, telemetryDevicesData, trendState.activeTab]
  );

  // //Obtém as função das opções em função do tipo de gráfico
  // const chartTypeObj = useMemo(
  //   () =>
  //     chartTypeCombobox.find((element) => {
  //       return element.ChartType === trendState.ChartType;
  //     }),
  //   [trendState.ChartType]
  // );

  // //Obtém as opções para o tipo de gráfico escolhido
  // const chartTypeOptionsData: chartOptionsDataDto | undefined = useMemo(
  //   () =>
  //     graphDatasets.length > 0 &&
  //     timeData.length > 0 &&
  //     chartTypeObj?.chartOptions
  //       ? chartTypeObj.chartOptions(graphDatasets, timeData)
  //       : undefined,
  //   [chartTypeObj, graphDatasets, timeData]
  // );

  //Se fosse necessária alguma especificação aos dados ou opções, a mesma poderia ser colocada aqui embaixo

  return (
    <CustomChart
      Type={trendState.ChartType}
      datasets={graphDatasets}
      timeAxis={trendState.activeTab}
      numberConditions={numberConditions}
      // customData={chartTypeOptionsData?.chartTypeData}
      // customOptions={chartTypeOptionsData?.chartTypeOptions}
      isLoadingData={telemetryDevicesIsLoading}
      errorData={telemetryDevicesError}
    >
      <TrendChartVizualizationOptionsMenu
        handleChangeTrend={handleChangeTrend}
        trendState={trendState}
      />
    </CustomChart>
  );
};
