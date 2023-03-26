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
import {
  validateFormAddSensor,
  FormAddSensorError,
} from "@/utils/validateForms/validateAddSensor";
import { KeyedMutator } from "swr";
import { CountDocumentsDto } from "@/types/documents";

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
  mutateDeviceInfo: KeyedMutator<DeviceDto>;
  mutateDeviceCountDocuments: KeyedMutator<CountDocumentsDto>;
};

export default function DeviceSensorInfo({
  deviceInfo,
  device_pid,
  mutateDeviceInfo,
  mutateDeviceCountDocuments,
}: DeviceSensorInfoProps) {
  const { sensors } = deviceInfo;
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<FormAddSensorError | undefined>(
    undefined
  );
  const {
    request: resquestAddSensor,
    isLoadingRequest: isLoadingAddSensor,
    errorRequest: errorAddSensor,
  } = useRequest<SensorDto, SensorDto>({
    method: "PUT",
  });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //Verifica se existe algum erro no formulario
      const errorObj = validateFormAddSensor(formFields);

      if (errorObj) {
        setErrorForm(errorObj); //Define que existem erros no formulario
        showToastMessage("Form contains errors!", "warning"); //Notificação de erro no formulário
      } else {
        await resquestAddSensor(
          `devices/${device_pid}/sensors/register`,
          formFields
        );
        setErrorForm(undefined); //Define que não existem erros
        mutateDeviceInfo(); //Atualiza dados do device
        mutateDeviceCountDocuments(); //Atualiza dados do device
        handleClose(); //Fecha o modal
        showToastMessage("Sensor added!");
      }
    } catch (error) {
      console.log(error);
      showToastMessage("Error adding sensor!", "error"); //Mostra notificação do erro
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
        title="Add New Sensor"
        description="Please fill all form correctly"
        open={open}
        handleClose={handleClose}
      >
        <AddSensorForm
          formFields={formFields}
          errorForm={errorForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClose={handleClose}
        />
      </CustomModal>
    </div>
  );
}
