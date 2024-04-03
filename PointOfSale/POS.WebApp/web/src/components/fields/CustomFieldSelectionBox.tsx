import { CustomFieldSelectionBoxProps } from '@/models/props/fields/CustomFieldSelectionBoxProps'
import React from 'react'
import CustomFieldLabel from './CustomFieldLabel'
import CustomFieldError from './CustomFieldError'

const CustomFieldSelectionBox = ({id, label, placeholder, optional, data, error, register}:CustomFieldSelectionBoxProps) => {
    return (
        <div className='mb-5'>
            <CustomFieldLabel id={id} label={label} optional={optional} />
            <select id={`${id}_selection`} 
                    name={`${id}_selection`}
                    className={`bg-gray-50 text-sm rounded outline-none block w-full p-2.5
                                 ${error ? 'border border-red-500' : 'border'}
                                 ${error ? 'focus:ring-red-500 focus:border-red-500' :
                                           'focus:ring-blue-500 focus:border-blue-500'}`}
                    {...register}>
                <option key={0} value={''}>{placeholder}</option>
                {data.map(data => <option key={data.id} value={data.id}>{data.name}</option>)}
            </select>
            {error && <CustomFieldError id={id} message={error.message}/>}
        </div>
    )
}

export default CustomFieldSelectionBox