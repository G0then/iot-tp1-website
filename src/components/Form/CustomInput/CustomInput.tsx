import { ErrorInformation } from '@/components/Error/ErrorInformation';
import classNames from 'classnames';
import React from 'react'

type CustomInputProps = {
    title: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    aditionalClass?: string;
    error?: string | undefined;
}

export default function CustomInput({ title, name, value, onChange, placeholder, aditionalClass, error }: CustomInputProps) {
  return (
    <div className={classNames(aditionalClass,'flex flex-col space-y-1')}>
        <p className='font-semibold text-gray-700'>{title}</p>
        <input className= {classNames(error ? "border-red-300" : "border-gray-300",'border rounded-lg p-2')} name={name} value={value} onChange={onChange} placeholder={placeholder}/>
        {error && <ErrorInformation text={error}/>}
    </div>
  )
}
