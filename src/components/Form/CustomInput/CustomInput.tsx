import classNames from 'classnames';
import React from 'react'

type CustomInputProps = {
    title: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    aditionalClass?: string;
}

export default function CustomInput({ title, name, value, onChange, placeholder, aditionalClass }: CustomInputProps) {
  return (
    <div className={classNames(aditionalClass,'flex flex-col space-y-1')}>
        <p className='font-semibold text-gray-700'>{title}</p>
        <input className='border border-gray-300 rounded-lg p-2' name={name} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  )
}
