import { ProductViewModel } from "@/models/interfaces/product/ProductViewModel";

export interface ProductFormModalProps {
    product?: any,
    setProduct: (value:any) => any,
    isOpen:boolean,
    onClose: () => any
}