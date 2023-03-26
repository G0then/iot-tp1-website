"use client";

import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../Table/Table";
import { useRouter } from "next/navigation";
import { DeviceDto } from "@/types/device";
import StatusButton from "../Button/StatusButton";
import TableHeader from "../Table/TableHeader";
import CustomModal from "../Modal/CustomModal";
import AddSensorForm from "../Form/AddSensorForm";
import { SensorDto } from "@/types/sensor";
import { useRequest } from "@/utils/requests/useRequest";
import { showToastMessage } from "../Notification/Notification";
import { validateFormAddSensor } from "@/utils/validateForms/validateAddSensor";

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
    renderCell: StatusButton,
  },
];

const defaultFormFields: SensorDto = {
  pid: "",
  status: "",
  calibrate: "",
  config: "",
  unit: "",
  description: "",
  name: "",
  unit_name: "",
};

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
  const [open, setOpen] = useState<boolean>(false);
  const {
    request: resquestAddSensor,
    isLoadingRequest: isLoadingAddSensor,
    errorRequest: errorAddSensor,
  } = useRequest<SensorDto, SensorDto>();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleAddButton = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    event.preventDefault();
    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //Verifica se existe algum erro no formulario
      const errorObj = validateFormAddSensor(formFields);

      if (errorObj) {
        // setErrorForm(errorObj); //Define que existem erros na criação do alarme
        showToastMessage("Form contains errors!", "warning"); //Notificação de erro no formulário
      } else {
        await resquestAddSensor(
          `devices/${device_pid}/sensors/register`,
          formFields
        );
        handleClose(); //Faz reset ao form quando um user é criado
        showToastMessage("Sensor added!");
      }
    } catch (error) {
      console.log(error);
      showToastMessage("Error adding sensor!", "error"); //Mostra notificação do erro ao fazer ack do alarme
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <TableHeader
        title="Device Sensors"
        description="Check info about all sensors related to this device"
        textAddButon="+ Add New Sensor"
        onAddButtonClick={handleAddButton}
        disableUpdateButton
      />
      <Table
        rows={sensors}
        columns={columns}
        getRowId={(row) => row.pid}
        onRowClick={(rowData) =>
          push(`/devices/${device_pid}/sensors/${rowData.row.pid}`)
        }
      />
      <CustomModal
        title="Add New Device"
        description="Please fill all form correctly"
        open={open}
        handleClose={handleClose}
      >
        <AddSensorForm
          formFields={formFields}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClose={handleClose}
          isLoadingRequest={isLoadingAddSensor}
        />
      </CustomModal>
    </div>
  );
}
