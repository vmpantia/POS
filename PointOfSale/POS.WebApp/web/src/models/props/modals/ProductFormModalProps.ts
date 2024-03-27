import { CategoryLiteViewModel } from "@/models/interfaces/category/CategoryLiteViewModel";
import { ProductViewModel } from "@/models/interfaces/product/ProductViewModel";

export interface ProductFormModalProps {
    product: ProductViewModel,
    isNew:boolean
    setProduct: (value:any) => any,
    isOpen: boolean,
    onModalCloseHandler: () => any,
    setIsRequiresReload: (value:boolean) => any,
    categories: CategoryLiteViewModel[],
}