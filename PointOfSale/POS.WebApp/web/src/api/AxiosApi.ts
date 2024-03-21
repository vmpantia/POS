import axios from "axios";

export const AxiosApi = axios.create({
    baseURL: "https://localhost:7282/api/",
    headers: { 'Content-Type': 'application/json' }
}) 