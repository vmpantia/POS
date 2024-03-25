export interface ProductTableProps {
    title:string,
    data:any[],
    columns:any[],
    isLoading:boolean,
    onEditActionClicked: (id:string) => any,
    onDeleteActionClicked: (id:string) => any,
}