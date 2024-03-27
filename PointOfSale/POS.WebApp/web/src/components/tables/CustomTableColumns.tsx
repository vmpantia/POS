import { MRT_ColumnDef } from "material-react-table";
import { ProductViewModel } from '@/models/interfaces/viewmodels/product/ProductViewModel';
import { CommonStatus } from "@/models/enums/CommonStatus";
import { Tag } from "antd";

const defaultSorting = (key:string, rowA:any, rowB:any) => {
    const dateA = rowA.original[key];
    const dateB = rowB.original[key];
    return dateA < dateB ?  1 : dateA > dateB ? -1 : 0;
}

const defaultFilterContains = (key:string, row:any, filterValue:any) =>
    row.original[key].toLowerCase().includes(filterValue.toLowerCase())

const defaultEqualContains = (key:string, row:any, filterValue:any) =>
    row.original[key] == filterValue;

    
const plainColumn = (header:string, key:string, colWidth:number = 100) => {
    return {
        id: key,
        header: header,
        size: colWidth,
        accessorKey: key,
    }
}

const statusColumn = (header:string, key:string, colWidth:number = 100, enableColumnOrdering:boolean = true) => {
    return {
        id: key,
        header: header,
        size: colWidth,
        enableColumnOrdering: enableColumnOrdering,
        accessorFn: (row:any) => {
            let value = row[key];
            switch(value) {
                case "Active":
                    return(<Tag color={'blue'}>{value}</Tag>)
                case "Inactive":
                    return(<Tag color={'red'}>{value}</Tag>)
                default:
                    return(<Tag>{value}</Tag>)
            }
        },
        sortingFn: (rowA:any, rowB:any) => defaultSorting(key, rowA, rowB),
        filterFn: (row:any, id:any, filterValue:any) => defaultEqualContains(key, row, filterValue),
    }
}

export const ProductColumns:MRT_ColumnDef<ProductViewModel>[] = [
    plainColumn('Code', 'code') as MRT_ColumnDef<ProductViewModel>,
    plainColumn('Name', 'name') as MRT_ColumnDef<ProductViewModel>,
    plainColumn('Category', 'category.name') as MRT_ColumnDef<ProductViewModel>,
    plainColumn('Description', 'description') as MRT_ColumnDef<ProductViewModel>,
    statusColumn('Status', 'statusDescription') as MRT_ColumnDef<ProductViewModel>,
]