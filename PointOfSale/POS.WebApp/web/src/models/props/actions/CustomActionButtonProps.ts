export interface CustomActionButtonProps {
    label: string,
    type?: "button" | "reset" | "submit",
    style: "primary" | "secondary" | "danger",
    disabled?: boolean,
    onButtonClickHandler?: () => any
}