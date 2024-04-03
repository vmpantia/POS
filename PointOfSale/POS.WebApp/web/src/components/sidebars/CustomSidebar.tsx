import React from 'react'
import CustomSidebarButton from './CustomSidebarButton'

const CustomSidebar = () => {
    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-60 h-screen" aria-label="Sidebar">
            <div className="h-full p-2 overflow-y-auto bg-zinc-900">
                <ul className="space-y-2 font-medium">
                    <li>
                        <CustomSidebarButton label="Products" link='http://localhost:3000/products' />
                        <CustomSidebarButton label="Categories" link='http://localhost:3000/categories' />
                    </li> 
                </ul>
            </div>
        </aside>
    )
}

export default CustomSidebar