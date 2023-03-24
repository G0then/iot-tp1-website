"use client";

import { ReadingDto } from "@/types/reading";
import { useQuery } from "@/utils/requests/getSwr";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React from "react";
import { NoData } from "../Error/NoData";
import { LoadingData } from "../Loading/LoadingData";
import Table from "../Table/Table";

const columns: GridColDef[] = [
  {
    field: "value",
    headerName: "Value",
    flex: 1,
    headerAlign: "left",
  },
  {
    field: "timestamp",
    headerName: "Date",
    flex: 1,
    headerAlign: "left",
    //Para mostrar o valor da propriedade de objetos nested
    valueGetter: (params) => {
      return DateTime.fromISO(params.row.timestamp.$date).toFormat("FF");
    },
  },
];

type SensorReadingsInfoProps = {
  sensor_pid: string;
};

export default function SensorReadingsInfo({ sensor_pid }: SensorReadingsInfoProps) {
  const urlGetSensorReadings = `sensors/${sensor_pid}/readings`;
  const {
    data: sensorReadings,
    isLoading: sensorReadingsLoading,
    error: sensorReadingsError,
  } = useQuery<ReadingDto[]>(urlGetSensorReadings);

  //Ocorreu um erro
  if (sensorReadingsError) {
    return <NoData text="Error fetching data!!" />;
  }

  //A carregar os dados
  if (sensorReadingsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={sensorReadings} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
