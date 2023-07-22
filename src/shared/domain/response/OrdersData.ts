import { BaseResponse } from "../response/base-response";

export interface OrdersData {
  date: string,
  address: string,
  products: number,
  total: number,
  status: string
}
