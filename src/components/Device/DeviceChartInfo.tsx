"use client";

import { CustomChartDataType } from "@/types/chart";
import { ReadingDto } from "@/types/reading";
import { SensorDto } from "@/types/sensor";
import { defaultChartBackgroundColor, defaultChartBorderColor } from "@/utils/objects/colors";
import { dateTabEnum } from "@/utils/objects/combobox/date";
import { useDebounceQuery } from "@/utils/requests/getSwr";
import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { CustomChart } from "../CustomChart/CustomChart";

export type trendState = {
  ChartType: any;
  activeTab: dateTabEnum;
  StartDateTime: string | undefined;
  StopDateTime: string | undefined;
  numberConditions: number;
  ListConditions: conditionTrendState[];
};

export type conditionTrendState = {
  Sensor: SensorDto | undefined;
};

//Objeto default do state de Trend
const getDefaultTrendState = () => {
  const today = new Date(); //Devia usar este mas o backend não permite ir buscar dados do dia atual
  const yesterday = new Date(today.setDate(today.getDate() - 1))
  
  return {
    ChartType: Line,
    activeTab: dateTabEnum.Day,
    StartDateTime: DateTime.fromJSDate(yesterday).startOf('day').toFormat("yyyy-LL-dd TT"),
    StopDateTime: DateTime.fromJSDate(yesterday).endOf('day').toFormat("yyyy-LL-dd TT"),
    numberConditions: 0,
    ListConditions: [],
  };
};

type DeviceChartInfoProps = {
  device_pid: string;
};

export default function DeviceChartInfo({ device_pid }: DeviceChartInfoProps) {
  const [trendState, setTrendState] = useState<trendState>(() =>
  getDefaultTrendState()
);
  const urlGetDeviceData = device_pid && `devices/${device_pid}/data/chart`;
  const {
    data: deviceData,
    isLoading: deviceDataLoading,
    error: deviceDataError,
    mutate: mutateDeviceData,
  } = useDebounceQuery<any>(urlGetDeviceData);

  //Objeto com os dados dos datasets a serem apresentados no gráfico
  const graphDatasets: CustomChartDataType[] = useMemo(
    () =>
      deviceData &&
      !deviceData.data.every((subArr: ReadingDto[]) => subArr.length === 0) //Verifica se existe pelo menos um dataset com valores
        ? deviceData.data
            .filter(
              (telemetryDeviceData: ReadingDto[]) =>
                telemetryDeviceData.length >= 1
            ) //Filtra apenas os datasets com pelo menos um valor ou mais
            .map((filteredTelemetryDeviceData: ReadingDto[], index: number) => {
              return {
                datasetData: filteredTelemetryDeviceData
                  ? filteredTelemetryDeviceData.map((data: ReadingDto) => {
                      const time = new Date(data.timestamp.$date);

                      return { y: data.value, x: time };
                    })
                  : [],
                xLabel:
                  trendState.activeTab === dateTabEnum.Day
                    ? "Hora"
                    : trendState.activeTab === dateTabEnum.Month
                    ? "Dia"
                    : "Mês",
                yLabel: "",
                label:  filteredTelemetryDeviceData[0].sensor_pid,
                unitLabel: "",
                backgroundColor: defaultChartBackgroundColor[index],
                borderColor: defaultChartBorderColor[index],
              };
            })
        : [],
    [deviceData, trendState.activeTab]
  );

  return (
    <CustomChart
      Type={trendState.ChartType}
      datasets={graphDatasets}
      timeAxis={trendState.activeTab}
      // customData={chartTypeOptionsData?.chartTypeData}
      // customOptions={chartTypeOptionsData?.chartTypeOptions}
      isLoadingData={deviceDataLoading}
      errorData={deviceDataError}
    >
      {/* <TrendChartVizualizationOptionsMenu
        handleChangeTrend={handleChangeTrend}
        trendState={trendState}
      /> */}
    </CustomChart>
  );
}
