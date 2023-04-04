"use client";

import { CreateDeviceDto } from "@/types/device";
import { OnOffStatusTypeCombobox } from "@/utils/objects/combobox/status";
import { FormAddDeviceError } from "@/utils/validateForms/validateAddDevice";
import React from "react";
import CustomModalButtons from "../Modal/Buttons/CustomModalButtons";
import CustomInput from "./CustomInput/CustomInput";
import CustomSelect from "./CustomSelect/CustomSelect";

type AddDeviceFormProps = {
  formFields: CreateDeviceDto;
  errorForm: FormAddDeviceError | undefined;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (newState: Partial<CreateDeviceDto>) => void;
  handleClose: () => void;
  disableButton?: boolean;
};

export default function AddDeviceForm({
  formFields,
  errorForm,
  handleSubmit,
  handleChange,
  handleClose,
}: AddDeviceFormProps) {
  const { pid, name, description, status, location } = formFields;

  return (
    <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit}>
      <div className="grid w-full grid-cols-3  gap-6">
        <CustomInput
          name="pid"
          title="PID"
          placeholder="Insert Sensor PID"
          value={pid}
          onChange={(e) => handleChange({ pid: e.target.value })}
          error={errorForm?.Pid}
        />
        <CustomInput
          name="name"
          title="Name"
          placeholder="Insert Sensor Name"
          value={name}
          onChange={(e) => handleChange({ name: e.target.value })}
          aditionalClass="col-span-2"
          error={errorForm?.Name}
        />
        <CustomInput
          name="description"
          title="Description"
          placeholder="Insert Device Description"
          value={description}
          onChange={(e) => handleChange({ description: e.target.value })}
          aditionalClass="col-span-3"
          error={errorForm?.Description}
        />
        <CustomSelect
          title="Status"
          comboboxData={OnOffStatusTypeCombobox}
          onChange={(e) => handleChange({ status: e.target.value })}
          activeItem={status}
        />
        <CustomInput
          name="location.latitude"
          type="number"
          title="Location Latitude"
          placeholder="Insert Location Latitude"
          value={location.latitude}
          onChange={(e) =>
            handleChange({
              location: { ...location, latitude: e.target.value ? +e.target.value : undefined },
            })
          }
        />
        <CustomInput
          name="location.longitude"
          type="number"
          title="Location Longitude"
          placeholder="Insert Location Longitude"
          value={location.longitude}
          onChange={(e) =>
            handleChange({
              location: { ...location, longitude: e.target.value ? +e.target.value : undefined },
            })
          }
        />
        <CustomInput
          name="location.name"
          title="Location Name"
          placeholder="Insert Location Name"
          value={location.name}
          onChange={(e) =>
            handleChange({ location: { ...location, name: e.target.value } })
          }
          error={errorForm?.Location_name}
          aditionalClass="col-span-3"
        />
      </div>
      <CustomModalButtons handleClose={handleClose} />
    </form>
  );
}
