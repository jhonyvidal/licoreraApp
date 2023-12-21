import { Pipe, PipeTransform } from '@angular/core';
import { Product, cartModel } from 'src/store/models/cart.model';

@Pipe({
  name: 'cartModel'
})
export class CartModelPipe implements PipeTransform {
  transform(data: any): cartModel | null {
    let value = data;
    if (!data) {
      return null;
    }
   
    if(data?.product){
      value = data.product
    }
    console.log(data);
    
    const newProduct : Product =  {
        id: value.id,
        name: value.name,
        serial: value.serial ?? '',
        lot: value.lot ?? '',
        image: value.image,
        description: value.description,
        category_id: value.category_id,
        created_at: value.created_at,
        updated_at: value.updated_at,
        deleted_at: value.deleted_at ?? null,
        url: '',
        presentation:value.presentation
    }

    // Reemplaza las propiedades correspondientes del objeto de entrada con las propiedades de cartModel y Product
    const transformedObject: cartModel = Object.assign({}, {
      id: value.id,
      product_id: value.product_id,
      quantity: value.quantity,
      quantitySelected: value.quantitySelected ?? null,
      price: data.price ?? value?.store?.price ?? null,
      status: value.status,
      start_date: value.start_date ?? null,
      end_date: value.end_date ?? null,
      store_type: value.store_type,
      points: value.points ?? null,
      created_at: value.created_at,
      updated_at: value.updated_at,
      deleted_at: value.deleted_at ?? null,
      ranking: value.ranking,
      recommended: value.recommended,
      product: newProduct
    });

    return transformedObject;
  }
}