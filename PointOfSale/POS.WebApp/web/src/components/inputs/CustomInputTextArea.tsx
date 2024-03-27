import { CustomInputTextProps } from '@/models/props/inputs/CustomInputTextProps';
import React, { useState } from 'react'

const CustomInputTextArea = ({id, label, value, placeholder, isRequired, onValueChangedHandler}: CustomInputTextProps) => {

    // Hooks
    const [error, setError] = useState<string | null>(null);

    // Functions
    const onValueChange = (input:any) => {
        let value = input.target.value;
        setError(isRequired && value === null || value === "" ? "This field is required." : null);
        onValueChangedHandler(input);
    }

    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {isRequired && <span className='text-red-500 font-bold mr-2'>*</span>}
                {label}
            </label>
            <textarea id={`${id}_input`} 
                    name={`${id}_input`} 
                    className={`bg-gray-50 border text-sm rounded outline-none block w-full p-2.5
                                ${error ? (isRequired ? 'focus:ring-red-500 focus:border-red-500' : '') :
                                            'focus:ring-blue-500 focus:border-blue-500'}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onValueChange} />
            {isRequired && error ? <div className='mt-1 text-sm text-red-500'>{error}</div> : <></>}
        </div>
    )
}

export default CustomInputTextArea