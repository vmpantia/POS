import { CustomSelectionBoxProps } from '@/models/props/inputs/CustomSelectionBoxProps'
import React, { useState } from 'react'

const CustomSelectionBox = ({ id, label, data, value, isRequired, onSelectedValueChangedHandler }:CustomSelectionBoxProps) => {

    // Hooks
    const [error, setError] = useState<string | null>(null);
    
    // Functions
    const onSelectedValueChange = (input:any) => {
        let value = input.target.value;
        setError(isRequired && value === null || value === "" ? "This field is required." : null);
        onSelectedValueChangedHandler(input);
    }

    return (
        <div className='mb-5'>
            <label id={`${id}_label`} className="block mb-2 text-sm font-medium">
                {isRequired && <span className='text-red-500 font-bold mr-2'>*</span>}
                {label}
            </label>
            <select id={`${id}_selection`} 
                    name={`${id}_selection`}
                    className={`bg-gray-50 border text-sm rounded outline-none block w-full p-2.5
                                 ${error ? (isRequired ? 'focus:ring-red-500 focus:border-red-500' : '') :
                                           'focus:ring-blue-500 focus:border-blue-500'}`}
                    value={value}
                    onChange={onSelectedValueChange}>
                {data.map(data => <option key={data.id} value={data.id}>{data.name}</option>)}
            </select>
            {isRequired && error ? <div className='mt-1 text-sm text-red-500'>{error}</div> : <></>}
        </div>
    )
}

export default CustomSelectionBox