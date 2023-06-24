import { BaseResponse } from "../response/base-response";

export interface ProductSearch extends BaseResponse {
    // data: any
    data: DataArray[]
}

interface DataArray {
    price?: number,
    product: Product
}

export interface Product {
    description?: string,
    image?: string,
    name?: string,
    features?: string
}