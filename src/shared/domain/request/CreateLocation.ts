export interface CreateLocationRequest {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    detail: string;
    favorite:boolean;
}