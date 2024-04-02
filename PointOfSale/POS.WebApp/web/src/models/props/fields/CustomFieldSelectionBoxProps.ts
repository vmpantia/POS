import { FieldError } from "react-hook-form";

export interface CustomFieldSelectionBoxProps {
    id:string,
    label:string,
    placeholder:string,
    optional:boolean,
    data: any[],
    error?:FieldError,
    register:any,
}