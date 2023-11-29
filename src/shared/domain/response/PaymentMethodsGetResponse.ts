import { BaseResponse } from "../response/base-response";

export interface PaymentMethodsGetResponse extends BaseResponse {
    // data: DataArray[]
    data: {
        id_customer: string,
        name: string,
        created: string,
        email: string,
        phone: string,
        address: string,
        cards: {
            token: string,
            franchise: string,
            mask: string,
            created: string,
            default: boolean,
            starImage: string,
        } []
    }
}
