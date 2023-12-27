import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Address, cart, cartModel } from '../models/cart.model';
import { debounceTime } from 'rxjs';
import { RecentOrderPipe } from 'src/shared/pipes/recentOrder.pipe'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private storage: Storage) {
    this.initStorage(); // Inicializar Ionic Storage
  }

  private async initStorage() {
    await this.storage.create();
  }

  // Método para realizar el inicio de sesión
  setCart(cartData: cartModel): boolean {
    // Almacenar los datos del usuario en el almacenamiento local
    let cartObject: cart = { details: [] };
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data?.details === undefined || data?.details?.length === 0 ){
      
        cartObject.details?.push(cartData);
        this.storage.set('cartData', cartObject);
        return
      }
      if(data?.details?.find((a: { id: number; }) => a.id === cartData.id)){
        const index = data.details.findIndex((detail: { id: number }) => detail.id === cartData.id);
        if (index !== -1) {
          data.details.splice(index, 1);
        }
        storeCartData.details.push(cartData);
        this.storage.set('cartData', storeCartData);
        return
      }else{
        storeCartData.details.push(cartData);
        this.storage.set('cartData', storeCartData);
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  setAddressCartData(address: Address){
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        return;
      }
      storeCartData.address = address;
      this.storage.set('cartData', storeCartData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  setPointsCartData(points: number, total: number){
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        return;
      }
      storeCartData.points = points;
      storeCartData.total = total;
      this.storage.set('cartData', storeCartData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  setProductsCartData(products: any){
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        storeCartData={
          details:products
        }
      }else{
        storeCartData.details = products;
      }
      this.storage.set('cartData', storeCartData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  setProductsByOneData(products: any){
    let cartObject: cart = { details: [] };
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        console.log("null");
        cartObject.details = products
        this.storage.set('cartData', cartObject);
      }else{
        console.log("details");
        for(var i=0; i<products.length; i++){
          if(storeCartData?.details?.find((a: { id: number; }) => a.id === products[i].id)){
            const index = storeCartData.details.findIndex((detail: { id: number }) => detail.id === products[i].id);
            if (index !== -1) {
              storeCartData.details.splice(index, 1);
            }
            storeCartData.details.push(products[i]);
          }else{
            storeCartData.details.push(products[i]);
          }
        }
        this.storage.set('cartData', storeCartData);
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  setIdOrderCartData(idOrder: any){
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        return;
      }
      storeCartData.idOrder = idOrder;
      this.storage.set('cartData', storeCartData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  setPaymentCartData(payment: any){
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        return;
      }
      storeCartData.payment = payment;
      this.storage.set('cartData', storeCartData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  deleteCart(id:number){
    this.storage.get('cartData')
    .then(data => {
      const completeData = data
      const dataFilter = data.details.filter((a: { id: number; }) => a.id !== id)
      completeData.details = dataFilter;
      this.storage.set('cartData', completeData);
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    // return true;
  }

  deleteCompleteCart(){
    this.storage.get('cartData')
    .then(data => {
      this.storage.set('cartData', {});
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    // return true;
  }

  // Método para obtener los datos del usuario almacenados en el almacenamiento
  async getCartData(): Promise<cart> {
    return await this.storage.get('cartData');
  }

  // Método para cerrar sesión
  async logout() {
    await this.storage.remove('cartData');
  }
}
