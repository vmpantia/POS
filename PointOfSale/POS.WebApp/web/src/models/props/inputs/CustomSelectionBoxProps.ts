export interface CustomSelectionBoxProps {
    id:string,
    label:string,
    data: any[]
    value?:string | undefined,
    isRequired:boolean,
    onSelectedValueChangedHandler: (input:any) => any,
}