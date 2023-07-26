import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { CartService } from 'src/store/services/cart.service';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any = [];
  quantity: number = 0;
  total: number = 0;
  btnAccept:boolean= false;

  constructor(
    private requestUseCase: RequestUseCases,
    private cartService: CartService,
    private alertController: AlertController,
  ) {}


  ngOnInit() {}

  ionViewWillEnter() {
    this.getCart();
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        this.products = data;
        this.setTotal();
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  addBtn(id:number) {
    this.products.find((element:{id:number,quantitySelected:number}) => {
      if(element.id === id){
        element.quantitySelected += element.quantitySelected < 10 ? 1 : 0;
      }
    })
    this.setTotal();
    // localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

  subtractBtn(id:number) {
    this.products.find((element:{id:number,quantitySelected:number}) => {
      if(element.id === id){
        element.quantitySelected -= element.quantitySelected > 1 ? 1 : 0;
      }
    })
    this.setTotal();
    // localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

  async deleteProduct(item:any) {
    await presentAlertExchange(
      this.alertController,
      item.product.name,
      '¿Deseas eliminar este producto de tu carrito de compras?',
      'exchange-products-success',
      item.product.image,
      () => this.cartService.deleteCart(item.id),
      item.id
    );
  }

  setTotal(){
    this.total = 0;
    this.products.forEach((e: { price: number, quantitySelected: number }) => {
      this.total = this.total + (e.price * e.quantitySelected);
    });
  }

}
