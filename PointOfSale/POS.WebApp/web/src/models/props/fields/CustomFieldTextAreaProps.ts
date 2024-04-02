import { FieldError } from "react-hook-form";

export interface CustomFieldTextAreaProps {
    id:string,
    label:string,
    placeholder:string,
    optional:boolean,
    error?:FieldError,
    register?:any,
}