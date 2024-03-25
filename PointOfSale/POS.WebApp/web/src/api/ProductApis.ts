import { ProductViewModel } from "@/models/interfaces/product/ProductViewModel";
import { Result } from "@/models/response/Result";
import { AxiosApi } from "./AxiosApi";

export const GetAllProducts = () => 
    AxiosApi.get<Result<ProductViewModel[]>>('products')
            .then(({data}) => data);

export const GetProductById = (id:string) => 
    AxiosApi.get<Result<ProductViewModel>>(`products/${id}`)
            .then(({data}) => data);

export const DeleteProductById = (id:string) => 
    AxiosApi.delete<Result<string>>('products', {data: { Id: id }})
            .then(({data}) => data);