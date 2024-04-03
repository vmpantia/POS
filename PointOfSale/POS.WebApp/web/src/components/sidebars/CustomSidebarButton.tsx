import { CustomSidebarButtonProps } from '@/models/props/sidebars/CustomSidebarButtonProps'
import React from 'react'

const CustomSidebarButton = ({ label, link }:CustomSidebarButtonProps) => {
    return (
        <a href={link} className="flex py-3 px-5 text-sm font-normal rounded text-white hover:bg-zinc-800 group">
            {label}
        </a>
    )
}

export default CustomSidebarButton