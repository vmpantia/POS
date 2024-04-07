import { CommonStatus } from '@/models/enums/CommonStatus';
import { CustomProductsTableWithActionProps } from '@/models/props/tables/CustomProductsTableWithActionProps'
import { AddCircleOutlineOutlined, Delete, Edit, PictureAsPdfOutlined, ToggleOff, ToggleOn } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MRT_ActionMenuItem, MRT_ShowHideColumnsButton, MRT_ToggleFiltersButton, MRT_ToggleFullScreenButton, MRT_ToggleGlobalFilterButton, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React, { useState } from 'react'
import CustomConfirmationDrawer from '../drawers/CustomConfirmationDrawer';

const CustomProductsTableWithAction = ({ title, 
                                        data,  
                                        columns,  
                                        isLoading, 
                                        onEditActionClickedHandler, 
                                        onEditStatusActionClickedHandler,
                                        onDeleteActionClickedHandler, 
                                        onAddActionClickedHandler }:CustomProductsTableWithActionProps) => {
    // Hooks
    const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] = useState<boolean>(false);
    const table = useMaterialReactTable({ 
        data: data,
        columns: columns,
        state: {
            isLoading: isLoading,
        },
        enableColumnPinning: true,
        enableRowActions: true,
        muiTableBodyCellProps : {
            style: {
                color: 'rgb(39 39 42)'
            }
        },
        muiTableHeadCellProps: {
            style: {
                color: 'rgb(39 39 42)'
            }
        },
        muiCircularProgressProps: {
            thickness: 3,
            size: 55,
            style: {
                color: 'rgb(39 39 42)'
            } 
        },
        muiSkeletonProps: {
            animation: 'pulse',
            height: 28,
        },
        renderTopToolbarCustomActions: () => (
            <Box sx={{ p: '5px' }}>
                <Tooltip title="Add Product">
                    <IconButton onClick={onAddActionClickedHandler}>
                        <AddCircleOutlineOutlined />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Export PDF">
                    <IconButton onClick={() => window.print()}>
                        <PictureAsPdfOutlined />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderToolbarInternalActions: ({table}) => (
            <Box sx={{ p: '5px' }}>
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
            </Box>
        ),
        renderRowActionMenuItems: ({ closeMenu, row, table }) => [
            <MRT_ActionMenuItem
                    icon={<Edit />}
                    key="edit"
                    label="Edit"
                    onClick={() => { onEditActionClickedHandler(row.original['id']); closeMenu(); }}
                    table={table}
            />,
            <MRT_ActionMenuItem
                    icon={row.original['status'] === CommonStatus.Active ? <ToggleOff /> : <ToggleOn />}
                    key="edit-status"
                    label={row.original['status'] === CommonStatus.Active ? "Inactive" : "Active"}
                    onClick={() => { onEditStatusActionClickedHandler(row.original['id'], 
                                                                      row.original['status'] === CommonStatus.Active ? CommonStatus.Inactive : 
                                                                                                                       CommonStatus.Active); 
                                     closeMenu(); }}
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
    });

    // Functions 
    const onDrawerClose = () => 
        setIsConfirmationDrawerOpen(false);

    return (
        <>
            <div className='text-xl font-bold mb-5'>
                {title}
            </div>
            <MaterialReactTable table={table}/>
            <CustomConfirmationDrawer
                message='Are you sure you want to delete this product?'
                isOpen={isConfirmationDrawerOpen}
                onCloseBtnClickHandler={onDrawerClose} />
        </>
    );
}

export default CustomProductsTableWithAction