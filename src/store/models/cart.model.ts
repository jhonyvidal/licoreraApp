export interface cart {
    details?:cartModel[];
    address?:Address;
    nombre?:string;
    points?:number;
    total?:number;
    idOrder?:number;
    payment?:any;
    number?:number;
    fromAddress?:string
}

export interface cartModel {
    id: number;
    product_id: number;
    quantity: number;
    quantitySelected?:number
    price: number;
    status: boolean;
    start_date: string | null;
    end_date: string | null;
    store_type: number;
    points: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    ranking: number;
    recommended: boolean;
    product: Product;
    discount?: number;
}

export interface Product {
    id: number;
    name: string;
    serial: string;
    lot: string;
    image: string;
    description: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    url: string;
    presentation:string
}

export interface Address {
    address:string;
    latitude:number;
    longitude:number;
    details:string;
    id?:number
}