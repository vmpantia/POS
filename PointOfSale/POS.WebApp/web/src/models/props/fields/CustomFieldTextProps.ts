import { FieldError } from "react-hook-form";

export interface CustomFieldTextProps {
    id:string,
    label:string,
    type: React.HTMLInputTypeAttribute,
    placeholder:string,
    optional:boolean,
    error?:FieldError,
    register?:any,
}