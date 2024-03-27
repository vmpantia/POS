import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled, WarningFilled } from '@ant-design/icons';
import { NotificationArgsProps, notification } from 'antd';
import React from 'react'

const useCustomNotification = (placement:NotificationArgsProps['placement'], duration:number = 3) => {
    const [api, contextHolder] = notification.useNotification();
    const ShowNotification = (type:'success' | 'info' | 'error' | 'warning', description:string) => {
        let icon = <></>;
        let message = '';
        switch(type) {
            case 'success':
                message = 'Success';
                icon = <CheckCircleFilled style={{ color: 'green' }} />;
                break;
            case 'info':
                message = 'Information';
                icon = <InfoCircleFilled style={{ color: 'blue' }} />;
                break;
            case 'error':
                message = 'Error';
                icon = <CloseCircleFilled style={{ color: 'red' }} />;
                break;
            case 'warning':
                message = 'Warning';
                icon = <WarningFilled style={{ color: 'organge' }} />;
                break;
        }
        api.info({
            message: message,
            description: description,
            placement: placement,
            duration: duration,
            icon: icon,
        });
    }
    return {
        notification: contextHolder,
        ShowNotification
    }
}

export default useCustomNotification