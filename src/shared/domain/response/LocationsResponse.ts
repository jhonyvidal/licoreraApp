import { BaseResponse } from "../response/base-response";

export interface LocationsResponse extends BaseResponse {
    data: {
        id: number,
        name: string,
        address: string,
        latitude: string,
        longitude: string,
        client_id: number,
        detail: string,
        created_at: string,
        updated_at: string,
        deleted_at: string,
        favorite: boolean,
        starImage: string,
    } []
}

// export interface DataArray {
//     data: {
//         id: number,
//         name: string,
//         address: string,
//         latitude: string,
//         longitude: string,
//         client_id: number,
//         detail: string,
//         created_at: string,
//         updated_at: string,
//         deleted_at: string,
//         favorite: number
//     } []
// }