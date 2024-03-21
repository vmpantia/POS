import { ProductViewModel } from "@/models/interfaces/product/ProductViewModel";
import { Result } from "@/models/response/Result";
import { AxiosApi } from "./AxiosApi";

export const GetAllProducts = () => 
    AxiosApi.get<Result<ProductViewModel[]>>('products')
            .then(({data}) => data);