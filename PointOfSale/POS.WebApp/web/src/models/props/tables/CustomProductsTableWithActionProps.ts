import { CommonStatus } from "@/models/enums/CommonStatus";

export interface CustomProductsTableWithActionProps {
    title:string,
    data:any[],
    columns:any[],
    isLoading:boolean,
    onEditActionClickedHandler: (id:string) => any,
    onEditStatusActionClickedHandler: (id:string, newStatus:CommonStatus) => any,
    onDeleteActionClickedHandler: (id:string) => any,
    onAddActionClickedHandler: () => any
}