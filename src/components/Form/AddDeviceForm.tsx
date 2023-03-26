"use client"

import { DeviceDto } from '@/types/device';
import { FormAddDeviceError } from '@/utils/validateForms/validateAddDevice';
import React, { useState } from 'react'
import CustomModalButtons from '../Modal/Buttons/CustomModalButtons';
import CustomInput from './CustomInput/CustomInput'

type AddDeviceFormProps = {
  formFields: DeviceDto;
  errorForm: FormAddDeviceError | undefined;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  disableButton?: boolean;
}

export default function AddDeviceForm({ formFields, errorForm, handleSubmit, handleChange, handleClose }: AddDeviceFormProps) {
  const { pid, name, description, status, location } = formFields;

  return (
    <form className='w-full flex flex-col space-y-6' onSubmit={handleSubmit}>
      <div className='grid w-full grid-cols-3  gap-6'>
        <CustomInput name="pid" title='PID' placeholder="Insert Sensor PID" value={pid} onChange={handleChange} error={errorForm?.Pid}/>
        <CustomInput name="name" title='Name' placeholder="Insert Sensor Name" value={name} onChange={handleChange} aditionalClass="col-span-2" error={errorForm?.Name}/>
        <CustomInput name="description" title='Description' placeholder="Insert Device Description" value={description} onChange={handleChange} aditionalClass="col-span-3" error={errorForm?.Description}/>
        <CustomInput name="status" title='Status' placeholder="Insert Sensor Status" value={status} onChange={handleChange}/>
        <CustomInput name="location.latitude" title='Location Latitude' placeholder="Insert Location Latitude" value={location.latitude} onChange={handleChange}/>
        <CustomInput name="location.longitude" title='Location Longitude' placeholder="Insert Location Longitude" value={location.longitude} onChange={handleChange}/>
        <CustomInput name="location.name" title='Location Name' placeholder="Insert Location Name" value={location.name} onChange={handleChange} error={errorForm?.Location_name} aditionalClass="col-span-3"/>
        </div>
        <CustomModalButtons handleClose={handleClose}/>
    </form>
  )
}
