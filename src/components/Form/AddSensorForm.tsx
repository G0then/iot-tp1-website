"use client";

import { SensorDto } from "@/types/sensor";
import { OnOffStatusTypeCombobox } from "@/utils/objects/combobox/status";
import { FormAddSensorError } from "@/utils/validateForms/validateAddSensor";
import React from "react";
import CustomModalButtons from "../Modal/Buttons/CustomModalButtons";
import CustomInput from "./CustomInput/CustomInput";
import CustomSelect from "./CustomSelect/CustomSelect";

type AddSensorFormProps = {
  formFields: SensorDto;
  errorForm: FormAddSensorError | undefined;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (newState: Partial<SensorDto>) => void;
  handleClose: () => void;
};

export default function AddSensorForm({
  formFields,
  errorForm,
  handleSubmit,
  handleChange,
  handleClose,
}: AddSensorFormProps) {
  const { pid, name, description, status, calibrate, config, unit, unit_name } =
    formFields;

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
          name="calibrate"
          title="Calibration"
          placeholder="Insert Sensor Calibration"
          value={calibrate}
          onChange={(e) => handleChange({ calibrate: e.target.value })}
        />
        <CustomInput
          name="config"
          title="Configuration"
          placeholder="Insert Sensor Configuration"
          value={config}
          onChange={(e) => handleChange({ config: e.target.value })}
        />
        <CustomInput
          name="unit"
          title="Unit"
          placeholder="Insert Unit"
          value={unit}
          onChange={(e) => handleChange({ unit: e.target.value })}
          error={errorForm?.Unit}
        />
        <CustomInput
          name="unit_name"
          title="Unit Name"
          placeholder="Insert Unit Name"
          value={unit_name}
          onChange={(e) => handleChange({ unit_name: e.target.value })}
          aditionalClass="col-span-2"
          error={errorForm?.Unit_name}
        />
      </div>
      <CustomModalButtons handleClose={handleClose} />
    </form>
  );
}
