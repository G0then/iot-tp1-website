"use client";

import { CustomChartDataType } from "@/types/chart";
import { ReadingDto } from "@/types/reading";
import { SensorDto } from "@/types/sensor";
import {
  defaultChartBackgroundColor,
  defaultChartBorderColor,
} from "@/utils/objects/colors";
import { dateTabEnum } from "@/utils/objects/combobox/date";
import { useDebounceQuery } from "@/utils/requests/getSwr";
import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { CustomChart } from "../CustomChart/CustomChart";
import { TrendChartVizualizationOptionsMenu } from "../Trend/TrendContainer/TrendChart/OptionsMenu/VizualizationOptionsMenu";
import { ChartData } from "@/types/data";

export type trendState = {
  ChartType: any;
  activeTab: dateTabEnum;
  StartDateTime: string | undefined;
  StopDateTime: string | undefined;
};

export type conditionTrendState = {
  Sensor: SensorDto | undefined;
};

//Objeto default do state de Trend
const getDefaultTrendState = () => {
  const today = new Date(); //Devia usar este mas o backend não permite ir buscar dados do dia atual

  return {
    ChartType: Line,
    activeTab: dateTabEnum.Day,
    StartDateTime: DateTime.fromJSDate(today)
      .startOf("day")
      .toFormat("yyyy-LL-dd TT"),
    StopDateTime: DateTime.fromJSDate(today)
      .endOf("day")
      .toFormat("yyyy-LL-dd TT"),
    ListConditions: [],
  };
};

type SensorChartInfoProps = {
  sensorInfo: SensorDto;
  device_pid: string;
};

export default function SensorChartInfo({
  sensorInfo,
  device_pid,
}: SensorChartInfoProps) {
  const { pid: sensor_pid } = sensorInfo;
  const [trendState, setTrendState] = useState<trendState>(() =>
    getDefaultTrendState()
  );
  let urlGetSensorData =
    device_pid &&
    sensor_pid &&
    `devices/${device_pid}/sensors/${sensor_pid}/data/chart/${trendState.activeTab}?sort=1`;
  if (device_pid && sensor_pid) {
    if (trendState.StartDateTime) {
      urlGetSensorData += `&startDate=${DateTime.fromSQL(
        trendState.StartDateTime
      )
        .toUTC()
        .toFormat("yyyy-LL-dd HH:mm:ss.SSS")}`;
    }
    if (trendState.StopDateTime) {
      urlGetSensorData += `&stopDate=${DateTime.fromSQL(trendState.StopDateTime)
        .toUTC()
        .toFormat("yyyy-LL-dd HH:mm:ss.SSS")}`;
    }
  }

  const {
    data: sensorData,
    isLoading: sensorDataLoading,
    error: sensorDataError,
    mutate: mutateDeviceData,
  } = useDebounceQuery<any>(urlGetSensorData);

  //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
  const handleChangeTrend = (newState: Partial<trendState>) => {
    setTrendState((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  //Objeto com os dados dos datasets a serem apresentados no gráfico
  const graphDatasets: CustomChartDataType[] = useMemo(
    () =>
      sensorData && !(sensorData.data[sensor_pid].length === 0) //Verifica se existe pelo menos um dataset com valores
        ? [
            {
              datasetData: sensorData.data[sensor_pid]
                ? sensorData.data[sensor_pid].map((data: ChartData) => {
                    const time = new Date(data._id);
                    return { y: data.average, x: time };
                  })
                : [],
              xLabel:
                trendState.activeTab === dateTabEnum.Day
                  ? "Hora"
                  : trendState.activeTab === dateTabEnum.Month
                  ? "Dia"
                  : "Mês",
              yLabel: sensorInfo ? sensorInfo.unit_name : "",
              label: sensorInfo.pid,
              unitLabel: sensorInfo ? sensorInfo.unit : "",
              backgroundColor: defaultChartBackgroundColor[0],
              borderColor: defaultChartBorderColor[0],
            },
          ]
        : [],
    [sensorData, sensorInfo, sensor_pid, trendState.activeTab]
  );

  return (
    <div className="min-h-full w-full">
      <CustomChart
        Type={trendState.ChartType}
        datasets={graphDatasets}
        timeAxis={trendState.activeTab}
        // customData={chartTypeOptionsData?.chartTypeData}
        // customOptions={chartTypeOptionsData?.chartTypeOptions}
        isLoadingData={sensorDataLoading}
        errorData={sensorDataError}
      >
        <TrendChartVizualizationOptionsMenu
          handleChangeTrend={handleChangeTrend}
          trendState={trendState}
        />
      </CustomChart>
    </div>
  );
}
