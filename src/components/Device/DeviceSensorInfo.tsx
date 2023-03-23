import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Sensor Name",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Description",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "center",
  },
  {
    field: "unit",
    headerName: "Unit",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "State",
    // minWidth: 350,
    flex: 1,
    // filterable: false,
    // resizable: true,
    headerAlign: "center",
  },
];

type DeviceSensorInfoProps = {
  deviceInfo: any;
};

export default function DeviceSensorInfo({
  deviceInfo,
}: DeviceSensorInfoProps) {
  const { sensors } = deviceInfo;

  return (
    <Table rows={sensors} columns={columns} getRowId={(row) => row.pid}/>
  );
}
