import { CustomFieldSelectionBoxProps } from '@/models/props/fields/CustomFieldSelectionBoxProps'
import React from 'react'

const CustomFieldSelectionBox = ({id, label, placeholder, optional, data, error, register}:CustomFieldSelectionBoxProps) => {
    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {!optional ? <span className='text-red-500 font-bold mr-2'>*</span> : <></>}
                {label}
            </label>
            <select id={`${id}_selection`} 
                    name={`${id}_selection`}
                    className={`bg-gray-50 border text-sm rounded outline-none block w-full p-2.5
                                 ${error ? 'focus:ring-red-500 focus:border-red-500' :
                                           'focus:ring-blue-500 focus:border-blue-500'}`}
                    {...register}>
                <option key={0} value={''}>{placeholder}</option>
                {data.map(data => <option key={data.id} value={data.id}>{data.name}</option>)}
            </select>
            {error && <div className='mt-1 text-sm text-red-500'>{error.message}</div>}
        </div>
    )
}

export default CustomFieldSelectionBox