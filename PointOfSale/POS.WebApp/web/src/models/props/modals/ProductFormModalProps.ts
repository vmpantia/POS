import { ProductViewModel } from "@/models/interfaces/product/ProductViewModel";

export interface ProductFormModalProps {
    product?: ProductViewModel | null,
    isOpen:boolean,
    onClose: () => any
}