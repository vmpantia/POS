import { Error } from "@/models/response/Error"

export const ConvertErrorToString = (error:Error) =>
    `(${error.code}) ${error.type} - ${error.description}`;