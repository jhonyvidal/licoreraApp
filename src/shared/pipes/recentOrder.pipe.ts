import { Pipe, PipeTransform } from '@angular/core';
import { Product, cartModel } from 'src/store/models/cart.model';

@Pipe({
  name: 'RecentOrderPipe'
})
export class RecentOrderPipe implements PipeTransform {
  transform(data: any): cartModel | null {
    if (!data) {
      return null;
    }

    let productData = data;
    if (data?.store.product) {
      productData = data.store.product;
    }

    const newProduct: Product = {
      id: productData.id,
      name: productData.name,
      serial: productData.serial ?? '',
      lot: productData.lot ?? '',
      image: productData.image,
      description: productData.description,
      category_id: productData.category_id,
      created_at: productData.created_at,
      updated_at: productData.updated_at,
      deleted_at: productData.deleted_at ?? null,
      url: productData.url ?? '',
      presentation: productData.presentation ?? ''
    };

    const transformedObject: cartModel = {
        quantity: data.quantity ?? null,
        quantitySelected: data.quantity ?? null,
        price: parseInt(data.price) ?? parseInt(productData?.store?.price) ?? null,
        start_date: data.start_date ?? null,
        end_date: data.end_date ?? null,
        points: data.points ?? null,
        created_at: data.created_at ?? null,
        updated_at: data.updated_at ?? null,
        deleted_at: data.deleted_at ?? null,
        product: newProduct,
        id: data.store.id ?? null,
        product_id: data?.product_id ?? null,
        status: data?.status ?? null,
        store_type: data?.store_type ?? null,
        ranking: data?.ranking ?? null,
        recommended: data?.recommended ?? null,
    };

    return transformedObject;
  }
}