import { CategoryLiteViewModel } from "@/models/interfaces/viewmodels/category/CategoryLiteViewModel";
import { ProductViewModel } from "@/models/interfaces/viewmodels/product/ProductViewModel";

export interface ProductFormModalProps {
    product: ProductViewModel,
    isNew:boolean,
    isOpen: boolean,
    categories: CategoryLiteViewModel[],
    setProductHandler: (value:any) => any,
    setIsRequiresReloadHandler: (value:boolean) => any,
    showNotificationHandler: (type:'success' | 'info' | 'error' | 'warning', description:string) => any,
    onModalCloseHandler: () => any,
}