import { BaseResponse } from "../response/base-response";

export interface ClientData extends BaseResponse {
    data: Data
}

export interface Data {
    id: string,
    name: string,
    last_name: string,
    photo: string,
    email: string,
    birthday: string,
    cellphone: string,
    order_quantity: number,
    exchanges_quantity: number,
}
