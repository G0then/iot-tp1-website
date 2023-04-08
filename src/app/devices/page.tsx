"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import TableHeader from "@/components/Table/TableHeader";
import { CreateDeviceDto, DeviceDto } from "@/types/device";
import { useDebounceQuery } from "@/utils/requests/getSwr";
import { useRequest } from "@/utils/requests/useRequest";
import { FormAddDeviceError } from "@/utils/validateForms/validateAddDevice";
import { useState } from "react";
import { validateFormAddDevice } from "@/utils/validateForms/validateAddDevice";
import { showToastMessage } from "@/components/Notification/Notification";
import CustomModal from "@/components/Modal/CustomModal";
import AddDeviceForm from "@/components/Form/AddDeviceForm";
import { OnOffStatusTypeCombobox } from "@/utils/objects/combobox/status";

const defaultFormFields: CreateDeviceDto = {
  pid: "",
  status: OnOffStatusTypeCombobox[0].name,
  description: "",
  name: "",
  location: {
    name: "",
  },
  sensors: [],
};

export default function DevicesPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetDevices = nameFilter ? `devices?filter=${nameFilter}` : `devices`;
  const {
    data: devices,
    isLoading: devicesLoading,
    error: devicesError,
    mutate: mutateDevices,
  } = useDebounceQuery<DeviceDto[]>(urlGetDevices);
  const [open, setOpen] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<FormAddDeviceError | undefined>(
    undefined
  );
  const {
    request: resquestAddSensor,
    isLoadingRequest: isLoadingAddSensor,
    errorRequest: errorAddSensor,
  } = useRequest<CreateDeviceDto, CreateDeviceDto>();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleAddButton = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetFormFields();
  };

   //Hook para alterar os dados do state. Mantém os dados passados e altera os novos enviados. O Partial permite receber nulls
   const handleChange = (newState: Partial<CreateDeviceDto>) => {
    setFormFields((currentState) => ({
      ...currentState,
      ...newState,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //Verifica se existe algum erro no formulario
      const errorObj = validateFormAddDevice(formFields);

      if (errorObj) {
        setErrorForm(errorObj); //Define que existem erros na criação do device
        showToastMessage("Form contains errors!", "warning"); //Notificação de erro no formulário
      } else {
        await resquestAddSensor(`devices/register`, formFields);
        setErrorForm(undefined); //Define que não existem erros
        mutateDevices(); //Atualiza dados do device
        handleClose(); //Fecha o modal
        showToastMessage("Device added!");
      }
    } catch (error) {
      console.log(error);
      showToastMessage("Error adding new device!", "error"); //Mostra notificação do erro ao fazer
    }
  };

  if (devicesError) {
    return <NoData text="Error fetching data!" isAbsolute/>;
  }

  if (devicesLoading) {
    return <LoadingData isAbsolute/>;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Devices"
        description="All devices registered in system"
      />

      <div className="lg:w-2/3 w-full flex items-center justify-center">
        <Filter
          value={nameFilter}
          setValue={(e: string) => setNameFilter(e)}
          placeholder="Search for device name or pid"
          searchOptions={
            <p className="text-sm text-gray-500">
              {devices ? devices.length : "0"} items founded
            </p>
          }
        />
      </div>

      <TableHeader
        title="Devices"
        description="Check info about all devices or add a new one"
        textAddButon="+ Add New Device"
        onAddButtonClick={handleAddButton}
        disableUpdateButton
      />

      {!devices || devices.length === 0 ? (
        <p className="my-4 text-lg font-semibold text-center w-full">
          No devices!
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
          {devices.map((device) => (
            <SimpleInfoCard
              key={device._id.$oid}
              title={device.pid}
              text={device.name}
              href={`/devices/${device.pid}`}
              version={2}
              description={device.description}
            />
          ))}
        </div>
      )}

      <CustomModal
        title="Add New Device"
        description="Please fill all form correctly"
        open={open}
        handleClose={handleClose}
      >
        <AddDeviceForm
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
