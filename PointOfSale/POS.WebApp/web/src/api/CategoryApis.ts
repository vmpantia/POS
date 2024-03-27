import { Result } from "@/models/response/Result";
import { AxiosApi } from "./AxiosApi";
import { CategoryLiteViewModel } from "@/models/interfaces/viewmodels/category/CategoryLiteViewModel";

export const GetAllCategoryLites = () => 
    AxiosApi.get<Result<CategoryLiteViewModel[]>>('categories/lites')
            .then(({data}) => data);