import { CommonStatus } from "@/models/enums/CommonStatus";

export interface EditProductStatusByIdDto {
    newStatus: CommonStatus,
}