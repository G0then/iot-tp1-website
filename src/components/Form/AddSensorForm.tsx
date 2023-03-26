"use client"

import { FormAddSensorError } from '@/utils/validateForms/validateAddSensor';
import React from 'react'
import CustomModalButtons from '../Modal/Buttons/CustomModalButtons';
import CustomInput from './CustomInput/CustomInput'

type AddSensorFormProps = {
  formFields: any;
  errorForm: FormAddSensorError | undefined;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  disableButton?: boolean;
}

export default function AddSensorForm({ formFields, errorForm, handleSubmit, handleChange, handleClose, disableButton }: AddSensorFormProps) {
  const { pid, name, description, status, calibrate, config, unit, unit_name } = formFields;

  return (
    <form className='w-full flex flex-col space-y-6' onSubmit={handleSubmit}>
      <div className='grid w-full grid-cols-3  gap-6'>
        <CustomInput name="pid" title='PID' placeholder="Insert Sensor PID" value={pid} onChange={handleChange} error={errorForm?.Pid}/>
        <CustomInput name="name" title='Name' placeholder="Insert Sensor Name" value={name} onChange={handleChange} aditionalClass="col-span-2" error={errorForm?.Name}/>
        <CustomInput name="description" title='Description' placeholder="Insert Device Description" value={description} onChange={handleChange} aditionalClass="col-span-3" error={errorForm?.Description}/>
        <CustomInput name="status" title='Status' placeholder="Insert Sensor Status" value={status} onChange={handleChange}/>
        <CustomInput name="calibrate" title='Calibration' placeholder="Insert Sensor Calibration" value={calibrate} onChange={handleChange}/>
        <CustomInput name="config" title='Configuration' placeholder="Insert Sensor Configuration" value={config} onChange={handleChange}/>
        <CustomInput name="unit" title='Unit' placeholder="Insert Unit" value={unit} onChange={handleChange} error={errorForm?.Unit}/>
        <CustomInput name="unit_name" title='Unit Name' placeholder="Insert Unit Name" value={unit_name} onChange={handleChange} aditionalClass="col-span-2" error={errorForm?.Unit_name}/>
        </div>
        <CustomModalButtons handleClose={handleClose}/>
    </form>
  )
}
