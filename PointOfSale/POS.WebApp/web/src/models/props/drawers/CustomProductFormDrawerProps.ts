export interface CustomProductFormDrawerProps {
    productId?: string | null,
    isOpen: boolean,
    setIsRequiresReloadHandler: (value:boolean) => any,
    showNotificationHandler: (type:'success' | 'info' | 'error' | 'warning', description:string) => any,
    onModalCloseHandler: () => any,
}