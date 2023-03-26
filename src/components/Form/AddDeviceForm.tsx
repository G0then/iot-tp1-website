"use client"

import React, { useState } from 'react'
import CustomInput from './CustomInput/CustomInput'

type AddDeviceFormProps = {
  formFields: any;
}

export default function AddDeviceForm({ formFields }: AddDeviceFormProps) {
  const [ state, setState ] = useState("")
  const { pid, name, description, location } = formFields;

  return (
    <form className='grid w-full grid-cols-3  gap-6'>
        <CustomInput title='PID' placeholder="Insert Device PID" value={pid} onChange={(e) => setState(e.target.value)}/>
        <CustomInput title='Name' placeholder="Insert Device Name" value={name} onChange={(e) => setState(e.target.value)} aditionalClass="col-span-2"/>
        <CustomInput title='Description' placeholder="Insert Device Description" value={description} onChange={(e) => setState(e.target.value)} aditionalClass="col-span-3"/>
        <CustomInput title='Location Name' placeholder="Insert Device Location Name" value={location.name} onChange={(e) => setState(e.target.value)}/>
        <CustomInput title='Location Latitude' placeholder="Insert Device Location Latitude" value={location.latitude} onChange={(e) => setState(e.target.value)}/>
        <CustomInput title='Location Longitude' placeholder="Insert Device Location Longitude" value={location.longitude} onChange={(e) => setState(e.target.value)}/>
    </form>
  )
}
