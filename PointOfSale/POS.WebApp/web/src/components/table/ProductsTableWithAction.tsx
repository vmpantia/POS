import { ProductTableProps } from '@/models/props/ProductTableProps'
import { Delete, Edit } from '@mui/icons-material';
import { MRT_ActionMenuItem, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React from 'react'

const ProductsTableWithAction = ({  title, data,  columns,  isLoading, onEditActionClicked, onDeleteActionClicked }:ProductTableProps) => {
    const table = useMaterialReactTable({ 
        data: data,
        columns: columns,
        state: {
            isLoading: isLoading,
        },
        enableRowNumbers: true,
        enableColumnPinning: true,
        enableStickyHeader: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row, table }) => [
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
                    icon={<Edit />}
                    key="edit"
                    label="Edit"
                    onClick={() => onEditActionClicked(row.original['id'])}
                    table={table}
            />,
            <MRT_ActionMenuItem
                icon={<Delete />}
                key="delete"
                label="Delete"
                onClick={() => onDeleteActionClicked(row.original['id'])}
                table={table}
            />,
        ],
        muiCircularProgressProps: {
            thickness: 3,
            size: 55,
        },
        muiSkeletonProps: {
            animation: 'pulse',
            height: 28,
        },
        muiTableContainerProps: { sx: { maxHeight: '600px' } },
        renderTopToolbarCustomActions: () => (
            <div className='pl-2 py-1 text-xl font-bold'>
                {title}
            </div>
        ),
    });

    return (
        <div className='p-7'>
            <MaterialReactTable table={table}/>
        </div>
    )
}

export default ProductsTableWithAction