"use client";

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
    headerAlign: "center",
  },
  {
    field: "timestamp",
    headerName: "Date",
    flex: 1,
    headerAlign: "center",
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
  } = useQuery<any>(urlGetSensorReadings);

  //Ocorreu um erro
  if (sensorReadingsError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  //A carregar os dados
  if (sensorReadingsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={sensorReadings} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
