import { BaseResponse } from "../response/base-response";

export interface ClientPointsData extends BaseResponse {
    data: Data
}

export interface Data {
    points: number
}
