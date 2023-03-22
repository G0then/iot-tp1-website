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
    field: "sensor_pid",
    headerName: "Sensor PID",
    flex: 1,
    headerAlign: "center",
  },
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

type DeviceReadingsInfoProps = {
  pid: string;
};

export default function DeviceReadingsInfo({ pid }: DeviceReadingsInfoProps) {
  const urlGetDeviceReadings = `devices/${pid}/readings`;
  const {
    data: deviceReadings,
    isLoading: deviceReadingsLoading,
    error: deviceReadingsError,
  } = useQuery<any>(urlGetDeviceReadings);

  //Ocorreu um erro
  if (deviceReadingsError) {
    return <NoData text="Erro ao carregar os dados!" />;
  }

  //A carregar os dados
  if (deviceReadingsLoading) {
    return <LoadingData />;
  }

  return (
    <Table rows={deviceReadings} columns={columns} pageSize={25} getRowId={(row) => row._id.$oid} />
      
  );
}
