import { ErrorInformation } from '@/components/Error/ErrorInformation';
import classNames from 'classnames';
import React from 'react'

type CustomInputProps = {
    title: string;
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    aditionalClass?: string;
    error?: string | undefined;
    type?: React.HTMLInputTypeAttribute;
    readOnly?: boolean
}

export default function CustomInput({ title, name, value, onChange, placeholder, aditionalClass, error, type, readOnly }: CustomInputProps) {
  return (
    <div className={classNames(aditionalClass,'flex flex-col space-y-1')}>
        <p className='font-semibold text-gray-700'>{title}</p>
        <input type={type ?? "text"} className= {classNames(error ? "border-red-300" : "border-gray-300", readOnly ? "bg-gray-200 text-gray-500" : "bg-white", 'border rounded-lg p-2')} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly}/>
        {error && <ErrorInformation text={error}/>}
    </div>
  )
}
