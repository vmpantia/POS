import { Error } from "./Error";

export interface Result<TData> {
    isSuccess:boolean,
    data?:TData | null,
    error?:Error | null
}