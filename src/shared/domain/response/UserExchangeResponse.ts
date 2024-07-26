import { BaseResponse } from "../response/base-response";

export interface UserExchangeResponse extends BaseResponse {
    data: {
        current_page: number,
        data: {
            id: number,
            order_id: number
            client_id: string
            total: number,
            delivered: boolean,
            created_at: string,
            updated_at: string,
            order_products: {
                order_id: number,
                store_product_id: number,
                price: number,
                points: number,
                quantity: number,
                subtotal: number,
                total_points: number,
                created_at: string,
                updated_at: string,
                deleted_at: string,
                store: {
                    id: number,
                    product_id: number,
                    quantity: number,
                    price: number,
                    status: boolean
                    start_date: string,
                    end_date: string,
                    store_type: number,
                    points: number,
                    created_at: string,
                    updated_at: string,
                    deleted_at: string,
                    ranking: number,
                    recommended: any,
                    newproduct: boolean,
                    ean: string,
                    trademark: string,
                    maker: string,
                    presentation: string,
                    bannerImage: string,
                    discount: number,
                    features_string: any,
                    product: {
                        id: number,
                        name: string
                        serial: any,
                        lot: any,
                        image: string,
                        description: string,
                        category_id: number,
                        created_at: string,
                        updated_at: string,
                        deleted_at: string,
                        url: string,
                    },
                    features: any
                }
            } []
        } [],
        first_page_url: string,
        from: number,
        last_page: number,
        last_page_url: string,
        next_page_url: string,
        path: string,
        per_page: number,
        prev_page_url: string
        to: number,
        total: number,
    }
}