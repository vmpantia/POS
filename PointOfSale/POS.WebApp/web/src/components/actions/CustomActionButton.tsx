import { CustomActionButtonProps } from '@/models/props/actions/CustomActionButtonProps'
import React from 'react'

const CustomActionButton = ({ label, type, style, disabled, onButtonClickHandler }:CustomActionButtonProps) => {
    const getColorByType = () => {
        let color = "";
        switch(style) {
            case "primary" : 
                color = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-700";
                break;
            case "secondary" : 
                color = "bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500";
                break;
            case "danger" : 
                color = "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-700";
                break;
            default:
                color = "";
                break;
        }
        return color;
    }
    return (
        <button type={type} disabled={disabled} className={`px-5 w-full py-2 rounded outline-none text-sm ${getColorByType()}`} onClick={onButtonClickHandler}>{label}</button>
    )
}

export default CustomActionButton