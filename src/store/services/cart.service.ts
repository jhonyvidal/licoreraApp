import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Address, cart, cartModel } from '../models/cart.model';
import { debounceTime } from 'rxjs';

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

  deleteCart(id:number){
   
    this.storage.get('cartData')
    .then(data => {
      const completeData = data
      const dataFilter = data.details.filter((a: { id: number; }) => a.id !== id)
      completeData.details = dataFilter;
      this.storage.set('cartData', completeData);
      window.location.reload();
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
