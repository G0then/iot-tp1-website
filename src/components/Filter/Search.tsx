import React, { ReactNode, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

type SearchProps = {
    placeholder: string;
    children?: ReactNode;
    value: string;
    setValue: (e: string) => void;
}

export default function Search({placeholder, children, value, setValue}: SearchProps) {
  return (
    <div  className="flex border border-gray-200 rounded-full shadow-lg md:px-6 px-3 py-3 md:mx-2 lg:mx-5 mx-1 flex-grow max-w-3xl items-center">
        <AiOutlineSearch className="text-2xl text-gray-500"/>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value) } placeholder={placeholder} className='w-full focus:outline-none md:mx-2 mx-1 bg-transparent'/>
        <RxCross2 onClick={() => setValue("")} className="text-2xl text-gray-500 cursor-pointer"/>
        {children && <div className='md:ml-2 ml-1 md:pl-2 pl-1 border-l-2 border-gray-300 whitespace-nowrap'> {children} </div>}
    </div>
  )
}
