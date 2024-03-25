export interface CustomModalProps {
    title: string,
    isOpen: boolean,
    onClose: () => any,
    children: React.ReactNode,
}