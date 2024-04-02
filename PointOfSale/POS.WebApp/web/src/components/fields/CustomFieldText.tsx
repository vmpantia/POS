import { CustomFieldTextProps } from '@/models/props/fields/CustomFieldTextProps'
import React from 'react'

const CustomFieldText = ({id, label, type, placeholder, optional, error, register}: CustomFieldTextProps) => {
    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {!optional ? <span className='text-red-500 font-bold mr-2'>*</span> : <></>}
                {label}
            </label>
            <input id={`${id}_input`} 
                   name={`${id}_input`} 
                   type={type} 
                   className={`bg-gray-50 text-sm rounded outline-none block w-full p-2.5 
                                ${error ? 'border border-red-500' : 'border'}
                                ${error ? 'focus:ring-red-500 focus:border-red-500' :
                                          'focus:ring-blue-500 focus:border-blue-500'}`}
                   placeholder={placeholder}
                   {...register} />
            {error && <div className='mt-1 text-sm text-red-500'>{error.message}</div>}
        </div>
    )
}

export default CustomFieldText