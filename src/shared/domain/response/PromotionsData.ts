import { BaseResponse } from "../response/base-response";

export interface PromotionsData extends BaseResponse {
    data: Data
}

interface Data {
    data: DataArray[]
}

interface DataArray {
    points: number,
    product: Product,
    quantity: number
}

export interface Product {
    image?: string,
    name?: string,
    description?: string,
    features?: string,
    beforePrice?: string
}
