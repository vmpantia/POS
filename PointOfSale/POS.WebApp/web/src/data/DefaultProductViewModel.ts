import { CommonStatus } from "@/models/enums/CommonStatus";
import { ProductViewModel } from "@/models/interfaces/product/ProductViewModel";
import { DefaultCategoryLiteViewModel } from "./DefaultCategoryLiteViewModel";

export const DefaultProductViewModel:ProductViewModel = {
    id: "",
    code: "",
    name: "",
    status: CommonStatus.Active,
    statusDescription: "Active",
    category: DefaultCategoryLiteViewModel,
}