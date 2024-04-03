import { CustomFieldLabelProps } from '@/models/props/fields/CustomFieldLabelProps'
import React from 'react'

const CustomFieldLabel = ({ id, optional, label }:CustomFieldLabelProps) => {
    return (
        <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
            {!optional ? <span className='text-red-500 font-bold mr-2'>*</span> : <></>}
            {label}
        </label>
    )
}

export default CustomFieldLabel