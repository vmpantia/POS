import { CustomInputTextProps } from '@/models/props/inputs/CustomInputTextProps'
import { CheckRequireField } from '@/utils/InputHelper';
import React, { useState } from 'react'

const CustomInputText = ({id, label, value, placeholder, isRequired, onValueChangedHandler}: CustomInputTextProps) => {

    // Hooks
    const [error, setError] = useState<string | null>(null);

    // Functions
    const onValueChange = (input:any) => {
        setError(CheckRequireField(isRequired, input.target.value));
        onValueChangedHandler(input);
    }

    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {isRequired && <span className='text-red-500 font-bold mr-2'>*</span>}
                {label}
            </label>
            <input id={`${id}_input`} 
                   name={`${id}_input`} 
                   type="text" 
                   className={`bg-gray-50 border text-sm rounded outline-none block w-full p-2.5
                                ${error ? (isRequired ? 'focus:ring-red-500 focus:border-red-500' : '') :
                                                        'focus:ring-blue-500 focus:border-blue-500'}`}
                   placeholder={placeholder}
                   value={value}
                   onChange={onValueChange}
                   onFocus={(e) => setError(CheckRequireField(isRequired, e.target.value))} />
            {isRequired && error ? <div className='mt-1 text-sm text-red-500'>{error}</div> : <></>}
        </div>
    )
}

export default CustomInputText