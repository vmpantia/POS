import { CustomTableProps } from '@/models/props/CustomTableProps'
import { Box, Button } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React from 'react'

const CustomTable = ({  title, data,  columns,  isLoading }:CustomTableProps) => {
    const table = useMaterialReactTable({ 
        data: data,
        columns: columns,
        state: {
            isLoading: isLoading,
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <div className='pl-2 py-1 text-xl font-bold'>
                {title}
            </div>
        ),
    });

    return (
        <div className='p-5'>
            <MaterialReactTable table={table}/>
        </div>
    )
}

export default CustomTable