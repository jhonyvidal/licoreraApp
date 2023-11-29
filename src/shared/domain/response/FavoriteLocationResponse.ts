import { BaseResponse } from "./base-response"

export interface FavoriteLocationResponse extends BaseResponse {
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
        favorite: boolean,
    }
  }