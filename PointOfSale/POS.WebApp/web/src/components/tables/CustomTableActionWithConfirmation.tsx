import { Popover } from 'antd';
import { MRT_ActionMenuItem, MRT_TableInstance } from 'material-react-table';
import React, { useState } from 'react'
import CustomActionButton from '../actions/CustomActionButton';

interface CustomTableActionWithConfirmationProps {
    id: string,
    label: string,
    title: string,
    message: string,
    icon: React.ReactNode,
    onConfirmBtnClickHandler: (id:string) => void,
    closeMenuHandler: () => void,
    table: MRT_TableInstance<any>,
}

const CustomTableActionWithConfirmation = ({ id, label, title, message, icon, onConfirmBtnClickHandler, closeMenuHandler, table }:CustomTableActionWithConfirmationProps) => {

    // Hooks
    const [open, setOpen] = useState<boolean>(false);

    // Functions
    const onConfirmBtnClicked = () => {
        onConfirmBtnClickHandler(id);
        setOpen(false);
        closeMenuHandler();
    }
    const onCancelBtnClicked = () => {
        setOpen(false);
        closeMenuHandler();
    };
    const onOpenChanged = (newOpen: boolean) =>
        setOpen(newOpen);
    const PopoverContent = () => {
        return (
            <>
                {message}
                <div className='mt-3 flex gap-4 columns-2 w-full'>
                    <CustomActionButton
                        label='Yes'
                        type='button'
                        style='primary'
                        onButtonClickHandler={onConfirmBtnClicked} />
                    <CustomActionButton
                        label='Cancel'
                        type='button'
                        style='secondary'
                        onButtonClickHandler={onCancelBtnClicked} />
                </div>
            </>
        )
    }

    return (
        <Popover
            content={PopoverContent}
            title={title}
            trigger="click"
            open={open}
            onOpenChange={onOpenChanged}
            zIndex={1300}
            placement='right'
        >
            <MRT_ActionMenuItem
                icon={icon}
                key={id}
                label={label}
                table={table}
            />
        </Popover>
    )
}

export default CustomTableActionWithConfirmation