import { CategoryLiteViewModel } from "@/models/interfaces/category/CategoryLiteViewModel";

export interface ProductFormModalProps {
    product?: any,
    setProduct: (value:any) => any,
    isOpen: boolean,
    onModalCloseHandler: () => any,
    setIsRequiresReload: (value:boolean) => any,
    categories: CategoryLiteViewModel[],
}