import { CommonStatus } from "../../enums/CommonStatus";
import { CategoryLiteViewModel } from "../category/CategoryLiteViewModel";

export interface ProductViewModel {
    id:string;
    code:string;
    name:string;
    description?:string;
    imagePath?:string;
    status:CommonStatus;
    statusDescription:string;
    category:CategoryLiteViewModel;
}