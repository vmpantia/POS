import { CustomFieldErrorProps } from '@/models/props/fields/CustomFieldErrorProps'
import React from 'react'

const CustomFieldError = ({ id, message }:CustomFieldErrorProps) => {
    return (
        <label id={`${id}_error`} className='mt-1 text-sm font-medium text-red-500'>{message}</label>
    )
}

export default CustomFieldError