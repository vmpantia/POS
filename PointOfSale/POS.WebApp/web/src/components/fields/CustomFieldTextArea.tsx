import { CustomFieldTextAreaProps } from '@/models/props/fields/CustomFieldTextAreaProps';
import React from 'react'

const CustomFieldTextArea = ({id, label, placeholder, optional, error, register}: CustomFieldTextAreaProps) => {
    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {!optional ? <span className='text-red-500 font-bold mr-2'>*</span> : <></>}
                {label}
            </label>
            <textarea id={`${id}_input`} 
                   name={`${id}_input`} 
                   className={`bg-gray-50 border text-sm rounded outline-none block w-full p-2.5
                                ${error ? 'focus:ring-red-500 focus:border-red-500' :
                                          'focus:ring-blue-500 focus:border-blue-500'}`}
                   placeholder={placeholder}
                   rows={10}
                   {...register} />
            {error && <div className='mt-1 text-sm text-red-500'>{error.message}</div>}
        </div>
    )
}

export default CustomFieldTextArea