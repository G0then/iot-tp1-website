"use client";

import React, { useMemo, useState } from "react";
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
import { OnOffStatusTypeCombobox } from "@/utils/objects/combobox/status";
import DeleteButton from "../Button/DeleteButton";
import ViewButton from "../Button/ViewButton";
import RemoveForm from "../Form/RemoveForm";
import EditButton from "../Button/EditButton";

const defaultFormFields: SensorDto = {
  pid: "",
  status: OnOffStatusTypeCombobox[0].name,
  calibrate: "",
  config: "",
  unit: "",
  description: "",
  name: "",
  unit_name: "",
  minAlertValue: undefined,
  maxAlertValue: undefined,
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
  const [openAddSensorModal, setOpenAddSensorModal] = useState<boolean>(false);
  const [openRemoveSensorModal, setOpenRemoveSensorModal] = useState<string>("");
  const [openEditSensorModal, setOpenEditSensorModal] = useState<string>("");
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
  const {
    request: requestRemoveSensor,
    isLoadingRequest: isLoadingRemoveSensor,
    errorRequest: errorRemoveSensor,
  } = useRequest<undefined, SensorDto>({
    method: "DELETE",
  });
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleAddButton = () => {
    setOpenAddSensorModal(true);
  };

  const handleCloseAddSensorModal = () => {
    setOpenAddSensorModal(false);
    resetFormFields();
  };

  const handleCloseEditSensorModal = () => {
    setOpenEditSensorModal("");
    resetFormFields();
  };

  const handleCloseRemoveSensorModal = () => {
    setOpenRemoveSensorModal("");
  };

  //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
  const handleChange = (newState: Partial<SensorDto>) => {
    setFormFields((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // don't select this row after clicking
    try {
      await requestRemoveSensor(`/devices/${device_pid}/sensors/${openRemoveSensorModal}`);
      mutateDeviceInfo(); //Atualiza dados do device
      mutateDeviceCountDocuments(); //Atualiza dados do device
      handleCloseRemoveSensorModal();
      showToastMessage("Sensor removed with sucess"); //Notificação
    } catch (error) {
      console.log(error);
      showToastMessage("Error remove sensor!", "error"); //Notificação
    }
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
        handleCloseAddSensorModal(); //Fecha o modal
        showToastMessage("Sensor added!");
      }
    } catch (error) {
      console.log(error);
      showToastMessage("Error adding sensor!", "error"); //Mostra notificação do erro
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //Verifica se existe algum erro no formulario
      const errorObj = validateFormAddSensor(formFields);

      if (errorObj) {
        setErrorForm(errorObj); //Define que existem erros no formulario
        showToastMessage("Form contains errors!", "warning"); //Notificação de erro no formulário
      } else {
        await resquestAddSensor(
          `devices/${device_pid}/sensors/${openEditSensorModal}`,
          formFields
        );
        setErrorForm(undefined); //Define que não existem erros
        mutateDeviceInfo(); //Atualiza dados do device
        mutateDeviceCountDocuments(); //Atualiza dados do device
        handleCloseEditSensorModal(); //Fecha o modal
        showToastMessage("Sensor updated!");
      }
    } catch (error) {
      console.log(error);
      showToastMessage("Error updating sensor!", "error"); //Mostra notificação do erro
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "pid",
        headerName: "Sensor Pid",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
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
      {
        field: "view",
        headerName: "View",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        renderCell: (params) => {
          const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation(); // don't select this row after clicking

            push(`/devices/${device_pid}/sensors/${params.row.pid}`);
          };

          return <ViewButton onClick={onClick} />;
        },
      },
      {
        field: "edit",
        headerName: "Edit",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        renderCell: (params) => {
          const handleEditButton = () => {
            setFormFields(params.row);
            setOpenEditSensorModal(params.row.pid);
          };

          return <EditButton onClick={handleEditButton} />;
        },
      },
      {
        field: "delete",
        headerName: "Delete",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        renderCell: (params) => {
          return <DeleteButton onClick={() => setOpenRemoveSensorModal(params.row.pid)} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        // onRowClick={(rowData) =>
        //   push(`/devices/${device_pid}/sensors/${rowData.row.pid}`)
        // }
      />
        <CustomModal
          title="Add New Sensor"
          description="Please fill all form correctly"
          open={openAddSensorModal}
          handleClose={handleCloseAddSensorModal}
        >
          <AddSensorForm
            formFields={formFields}
            errorForm={errorForm}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleClose={handleCloseAddSensorModal}
          />
        </CustomModal>

        <CustomModal
          title="Edit Sensor"
          description="Please fill all form correctly"
          open={openEditSensorModal ? true : false}
          handleClose={handleCloseEditSensorModal}
        >
          <AddSensorForm
            formFields={formFields}
            errorForm={errorForm}
            handleSubmit={handleEdit}
            handleChange={handleChange}
            handleClose={handleCloseEditSensorModal}
            disablePidField
          />
        </CustomModal>
 
        <CustomModal
          title="Remove Sensor"
          description="Are you sure that you want to remove the sensor?"
          open={openRemoveSensorModal ? true : false}
          handleClose={handleCloseRemoveSensorModal}
        >
          <RemoveForm
            handleSubmit={handleRemove}
            handleClose={handleCloseRemoveSensorModal}
          />
        </CustomModal>
      
    </div>
  );
}
