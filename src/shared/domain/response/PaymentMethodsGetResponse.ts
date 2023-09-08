import { BaseResponse } from "../response/base-response";

export interface PaymentMethodsGetResponse extends BaseResponse {
    data: DataArray[]
}

interface DataArray {
    id: number,
    client_id: string,
    number: string,
    cvv: string,
    expirationDate: string,
    name: string,
    favorite: number,
    created_at: string,
    updated_at: string
}