import { ButtonType } from "@/models/enums/ButtonType";

export interface CustomActionButtonProps {
    title:string;
    type:ButtonType;
    onButtonClickHandler: () => any
}