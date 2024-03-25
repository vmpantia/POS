import { InputTextProps } from '@/models/interfaces/inputs/InputTextProps'
import React from 'react'

const CustomInputText = ({id, label, value, placeholder, isRequired}: InputTextProps) => {
    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {isRequired && <span className='text-red-500 font-bold mr-2'>*</span>}
                {label}
            </label>
            <input id={`${id}_input`} 
                   name={`${id}_input`} 
                   type="text" 
                   className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                   placeholder={placeholder}
                   value={value} />
        </div>
    )
}

export default CustomInputText