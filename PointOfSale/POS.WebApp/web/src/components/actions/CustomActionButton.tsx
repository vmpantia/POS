import { ButtonType } from '@/models/enums/ButtonType'
import { CustomActionButtonProps } from '@/models/props/actions/CustomActionButtonProps'
import React from 'react'

const CustomActionButton = ({ title, type, onButtonClickHandler }:CustomActionButtonProps) => {
    const getColorByType = (type:ButtonType) => {
        let color = "";
        switch(type) {
            case ButtonType.Primary : 
                color = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-700";
                break;
            case ButtonType.Secondary : 
                color = "bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500";
                break;
            case ButtonType.Danger : 
                color = "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:red-blue-700";
                break;
            default:
                color = "";
                break;
        }
        return color;
    }
    return (
        <button className={`px-5 w-full py-2 rounded outline-none text-sm ${getColorByType(type)}`} onClick={onButtonClickHandler}>{title}</button>
    )
}

export default CustomActionButton