import { BaseResponse } from "./base-response";

export interface LoginResponse extends BaseResponse {
    id: string;
    name: string;
    last_name: string;
    birthday: string;
    email: string;
    password: string;
    social_id: string;
    photo: string;
    cellphone: string;
    points: number;
    uuid: string;
    remember_token: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    token: string;
}