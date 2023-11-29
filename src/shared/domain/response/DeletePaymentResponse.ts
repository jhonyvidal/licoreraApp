import { BaseResponse } from "../response/base-response";

export interface DeletePaymentResponse extends BaseResponse {
    data: string
}

export interface PostPaymentMethodsResponse extends BaseResponse {
  exp_month: string,
  exp_year: string,
  name: string,
  mask: string
}
