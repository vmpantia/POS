import { CustomModalProps } from '@/models/props/modals/CustomModalProps';
import React from 'react'

const CustomModal = ({ title, isOpen, onClose, children } : CustomModalProps) => {
    if(!isOpen) return null;

    const handleClose = (e:any) => {
        if(e.target.id === 'wrapper') onClose();
    }

    return (
        <>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
                 id='wrapper'
                 onClick={handleClose}>
                <div className='w-[600px] bg-white p-8 rounded'>
                    <div className="flex items-center justify-between pb-3 mb-5 border-b">
                        <h3 className="text-xl font-semibold">
                            {title}
                        </h3>
                        <button type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={() => onClose()}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default CustomModal