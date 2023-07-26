import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { cartModel } from '../models/cart.model';

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
    let storeCartData;
    this.storage.get('cartData')
    .then(data => {
      storeCartData = data;
      if(data === null){
        this.storage.set('cartData', [cartData]);
      }
      if(data.find((a: { id: number; }) => a.id === cartData.id)){
        return
      }else{
        storeCartData.push(cartData)
        this.storage.set('cartData', storeCartData);
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    return true;
  }

  deleteCart(id:number){
    console.log(id)
    this.storage.get('cartData')
    .then(data => {
      const dataFilter = data.filter((a: { id: number; }) => a.id !== id)
      this.storage.set('cartData', dataFilter);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al obtener los datos del cart:', error);
    });
    // return true;
  }

  // Método para obtener los datos del usuario almacenados en el almacenamiento
  async getCartData(): Promise<cartModel> {
    return await this.storage.get('cartData');
  }

  // Método para cerrar sesión
  async logout() {
    await this.storage.remove('cartData');
  }
}
