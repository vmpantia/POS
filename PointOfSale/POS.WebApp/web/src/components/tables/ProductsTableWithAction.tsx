import { ProductTableProps } from '@/models/props/tables/ProductTableProps'
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
        renderTopToolbarCustomActions: () => (
            <div className='pl-2 py-1 text-xl font-bold'>
                {title}
            </div>
        ),
    });

    return <MaterialReactTable table={table}/>
}

export default ProductsTableWithAction