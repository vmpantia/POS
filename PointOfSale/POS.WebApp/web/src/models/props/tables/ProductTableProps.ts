export interface ProductTableProps {
    title:string,
    data:any[],
    columns:any[],
    isLoading:boolean,
    onEditActionClickedHandler: (id:string) => any,
    onDeleteActionClickedHandler: (id:string) => any,
    onAddActionClickedHandler: () => any
}