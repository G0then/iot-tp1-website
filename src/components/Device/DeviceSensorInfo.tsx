'use client';

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";
import { useRouter } from 'next/navigation';
import { DeviceDto } from "@/types/device";
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Sensor Name",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "left",
    // align: 'center',
  },
  {
    field: "description",
    headerName: "Description",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "left",
    // align: 'center',
  },
  {
    field: "unit_name",
    headerName: "Unit",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "left",
    // align: 'center',
    valueGetter: (params) => {
      return `${params.row.unit_name} (${params.row.unit})`;
    },
  },
  {
    field: "status",
    headerName: "State",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "left",
    // align: 'center',
  },
];

type DeviceSensorInfoProps = {
  deviceInfo: DeviceDto;
  device_pid: string;
};

export default function DeviceSensorInfo({
  deviceInfo,
  device_pid,
}: DeviceSensorInfoProps) {
  const { sensors } = deviceInfo;
  const { push } = useRouter();

  return (
    <Table rows={sensors} columns={columns} getRowId={(row) => row.pid} onRowClick={(rowData) => push(`/devices/${device_pid}/sensors/${rowData.row.pid}`)}/>
  );
}
