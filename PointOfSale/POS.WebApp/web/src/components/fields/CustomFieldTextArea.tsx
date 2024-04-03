import { CustomFieldTextAreaProps } from '@/models/props/fields/CustomFieldTextAreaProps';
import React from 'react'
import CustomFieldLabel from './CustomFieldLabel';
import CustomFieldError from './CustomFieldError';

const CustomFieldTextArea = ({id, label, placeholder, optional, error, register}: CustomFieldTextAreaProps) => {
    return (
        <div className='mb-5'>
            <CustomFieldLabel id={id} label={label} optional={optional} />
            <textarea id={`${id}_input`} 
                   name={`${id}_input`} 
                   className={`bg-gray-50 text-sm rounded outline-none block w-full p-2.5
                                ${error ? 'border border-red-500' : 'border'}
                                ${error ? 'focus:ring-red-500 focus:border-red-500' :
                                          'focus:ring-blue-500 focus:border-blue-500'}`}
                   placeholder={placeholder}
                   rows={10}
                   {...register} />
            {error && <CustomFieldError id={id} message={error.message}/>}
        </div>
    )
}

export default CustomFieldTextArea