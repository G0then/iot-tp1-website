"use client";

import { DataStatisticsDto } from "@/types/data";
import { useQuery } from "@/utils/requests/getSwr";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React from "react";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import Table from "../Table/Table";

type SensorDataStatisticsInfoProps = {
  sensor_pid: string;
  device_pid: string;
};

export default function SensorDataStatisticsInfo({
  sensor_pid,
  device_pid,
}: SensorDataStatisticsInfoProps) {
  const urlGetSensorDataStatistics = `devices/${device_pid}/sensors/${sensor_pid}/data/statistics`;
  const {
    data: dataStatistics,
    isLoading: dataStatisticsLoading,
    error: dataStatisticsError,
  } = useQuery<DataStatisticsDto>(urlGetSensorDataStatistics);

  //Ocorreu um erro
  if (dataStatisticsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (dataStatisticsLoading) {
    return <LoadingData />;
  }

  const { average, count, max, min, sum } = dataStatistics;

  return (
    <div className="flex flex-col space-y-2 w-full">
      <h3 className="text-lg font-semibold">
        General statistics about readings:
      </h3>
      <ul className="font-medium pl-4">
        <li>- Number of Readings: {count.toFixed(2)}</li>
        <li>- Average Readings Value: {average.toFixed(2)}</li>
        <li>- Max Reading: {max.toFixed(2)}</li>
        <li>- Min Reading: {min.toFixed(2)}</li>
        <li>- Sum of All Readings: {sum.toFixed(2)}</li>
      </ul>
    </div>
  );
}
