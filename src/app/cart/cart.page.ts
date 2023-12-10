import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { CartService } from 'src/store/services/cart.service';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any = [];
  quantity: number = 0;
  total: number = 0;
  points: number = 0;
  minimumOrderAmount: number = 0;
  minimumAmountForPoints : number = 0;
  btnAccept:boolean= false;
  contentHeigth:string = 'content-exchange-products1';

  constructor(
    private requestUseCase: RequestUseCases,
    private cartService: CartService,
    private alertController: AlertController,
    private router: Router
  ) {}


  ngOnInit() {
    this.getInfo();
  }

  ionViewWillEnter() {
    this.getCart();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const oneVhInPixels = viewportHeight / 100;
    if(viewportHeight >= 914){
      this.contentHeigth = 'content-exchange-products1';
    }
    else if(viewportHeight >= 600){
      this.contentHeigth = 'content-exchange-products2';
    }
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        console.log(data);
        if(data && data.details && data.details.length > 0){
          this.products = data.details;
          this.setTotal();
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cart:', error);
      });
  }

  getInfo() {
    this.requestUseCase.GetInfo()
    .subscribe((response) => {
      if(response.success === true){
       this.minimumOrderAmount = response.data.minimumOrderAmount
       this.minimumAmountForPoints  = response.data.minimumAmountForPoints 
      }else{
        console.log(response);
      }
     
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

  subtractBtn(item:any) {
    this.products.find((element:{id:number,quantitySelected:number}) => {
      if(element.id === item.id){
        if(element.quantitySelected === 1 ){
          this.deleteProduct(item)
          return;
        }
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
    if(this.products){
      this.products.forEach((e: { price: number, quantitySelected: number }) => {
        this.total = this.total + (e.price * e.quantitySelected);
      });
    }
    console.log(this.total , this.minimumAmountForPoints);
    
    this.points = this.total / this.minimumAmountForPoints;
  }

  submit(){
    this.router.navigate(['/home/tab3/cart-checkout'])
  }

}
