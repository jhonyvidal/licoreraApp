import { Pipe, PipeTransform } from '@angular/core';
import { Product, cartModel } from 'src/store/models/cart.model';

@Pipe({
  name: 'productDetailModel'
})
export class ProductDetailModelPipe implements PipeTransform {
  transform(originalObject: any): any | null {
    let value = originalObject;
    if (!originalObject) {
      return null;
    }

    // Reemplaza las propiedades correspondientes del objeto de entrada con las propiedades de cartModel y Product
    const transformedObject = {
      "id": originalObject.product.store.id,
      "product_id": originalObject.product.store.product_id,
      "quantity": originalObject.product.store.quantity,
      "price": originalObject.product.store.price,
      "status": originalObject.product.store.status,
      "start_date": originalObject.product.store.start_date,
      "end_date": originalObject.product.store.end_date,
      "store_type": originalObject.product.store.store_type,
      "points": originalObject.product.store.points,
      "created_at": originalObject.product.store.created_at,
      "updated_at": originalObject.product.store.updated_at,
      "deleted_at": originalObject.product.store.deleted_at,
      "ranking": originalObject.product.store.ranking || 0,
      "recommended": originalObject.product.store.recommended || false,
      "newproduct": originalObject.product.store.newproduct || 0,
      "ean": originalObject.product.store.ean,
      "trademark": originalObject.product.store.trademark,
      "maker": originalObject.product.store.maker,
      "presentation": originalObject.product.store.presentation,
      "bannerImage": originalObject.product.store.bannerImage,
      "discount": originalObject.product.store.discount,
      "product": {
        "id": originalObject.product.id,
        "name": originalObject.product.name,
        "serial": originalObject.product.serial,
        "lot": originalObject.product.lot,
        "image": originalObject.product.image,
        "description": originalObject.product.description,
        "category_id": originalObject.product.category_id,
        "created_at": originalObject.product.created_at,
        "updated_at": originalObject.product.updated_at,
        "deleted_at": originalObject.product.deleted_at,
        // ... otras propiedades de "product"
      }
    };

    return transformedObject;
  }
}