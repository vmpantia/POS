import { EditProductByIdDto } from "./EditProductByIdDto";

export interface AddProductDto {
    categoryId: string,
    name: string,
    description?: string
}