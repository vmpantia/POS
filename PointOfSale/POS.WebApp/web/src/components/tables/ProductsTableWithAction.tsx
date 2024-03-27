import { ProductTableProps } from '@/models/props/tables/ProductTableProps'
import { Delete, Edit } from '@mui/icons-material';
import { MRT_ActionMenuItem, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React from 'react'

const ProductsTableWithAction = ({  title, data,  columns,  isLoading, onEditActionClickedHandler, onDeleteActionClickedHandler }:ProductTableProps) => {
    const table = useMaterialReactTable({ 
        data: data,
        columns: columns,
        state: {
            isLoading: isLoading,
        },
        enableRowNumbers: true,
        enableColumnPinning: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ closeMenu, row, table }) => [
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
                    icon={<Edit />}
                    key="edit"
                    label="Edit"
                    onClick={() => { onEditActionClickedHandler(row.original['id']); closeMenu(); }}
                    table={table}
            />,
            <MRT_ActionMenuItem
                icon={<Delete />}
                key="delete"
                label="Delete"
                onClick={() => { onDeleteActionClickedHandler(row.original['id']); closeMenu(); }}
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