"use client";

import { AlertDto } from "@/types/alert";
import { LogDto } from "@/types/log";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React from "react";
import Table from "../Table/Table";

const columns: GridColDef[] = [
  {
    field: "device_pid",
    headerName: "Device PID",
    flex: 1,
    headerAlign: "left",
  },
  {
    field: "sensor_pid",
    headerName: "Sensor PID",
    flex: 1,
    headerAlign: "left",
  },
  {
    field: "message",
    headerName: "Message",
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

type LogMainInfoProps = {
  logs: LogDto[];
};

export default function AlertMainInfo({ logs }: LogMainInfoProps) {
  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="flex max-h-[38rem] flex-col justify-center overflow-auto bg-white rounded-lg sm:shadow-md transition-shadow duration-200">
        <div className="flex h-auto flex-col justify-center overflow-auto m-5">
          <Table
            rows={logs}
            columns={columns}
            pageSize={25}
            getRowId={(row: AlertDto) => row._id.$oid}
          />
        </div>
      </div>
    </div>
  );
}
