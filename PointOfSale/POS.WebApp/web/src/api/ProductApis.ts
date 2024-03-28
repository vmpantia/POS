import { ProductViewModel } from "@/models/interfaces/viewmodels/product/ProductViewModel";
import { Result } from "@/models/response/Result";
import { AxiosApi } from "./AxiosApi";
import { EditProductByIdDto } from "@/models/interfaces/dtos/product/EditProductByIdDto";
import { AddProductDto } from "@/models/interfaces/dtos/product/AddProductDto";

export const GetAllProducts = () => 
    AxiosApi.get<Result<ProductViewModel[]>>('products')
            .then(({data}) => data);

export const GetProductById = (id:string) => 
    AxiosApi.get<Result<ProductViewModel>>(`products/${id}`)
            .then(({data}) => data);

export const DeleteProductById = (id:string) => 
    AxiosApi.delete<Result<string>>(`products/${id}`)
            .then(({data}) => data);

export const EditProductById = (id:string, request:EditProductByIdDto) => 
    AxiosApi.put<Result<string>>(`products/${id}`, request)
            .then(({data}) => data);

export const AddProduct = (request:AddProductDto) => 
    AxiosApi.post<Result<string>>('products', request)
            .then(({data}) => data);