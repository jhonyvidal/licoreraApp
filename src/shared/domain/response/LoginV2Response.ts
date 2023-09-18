import { BaseResponse } from "../response/base-response";

export interface LoginV2Response extends BaseResponse {
    data: Data
}

export interface Data {
    token: string
}
