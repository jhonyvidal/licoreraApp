import { BaseResponse } from "../response/base-response";

export interface DeletePaymentResponse extends BaseResponse {
    data: number
}

export interface PostPaymentMethodsResponse extends BaseResponse {
  data: {
    number: string,
    cvv: string,
    expirationDate: string,
    name: string,
    favorite: string,
    client_id: string,
    updated_at: string,
    created_at: string,
    id: string
  }
}
