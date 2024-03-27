export interface CustomInputTextProps {
    id:string,
    label:string,
    value?:string | undefined,
    placeholder:string,
    isRequired:boolean,
    onValueChangedHandler: (input:any) => any,
}