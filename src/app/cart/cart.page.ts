import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { CartService } from 'src/store/services/cart.service';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InfoService } from 'src/store/services/info.service';
import { UserService } from 'src/store/services/user.service';
import { presentAlert } from 'src/shared/components/alert.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss','./cart.page2.scss'],
})
export class CartPage implements OnInit {
  products: any = [];
  currentOrder: any = {};
  quantity: number = 0;
  total: number = 0;
  points: number = 0;
  minimumOrderAmount: number = 0;
  minimumAmountForPoints : number = 0;
  btnAccept:boolean= false;
  contentHeigth:string = 'content-exchange-products1';
  isCurrentOrder:boolean= false;

  constructor(
    private requestUseCase: RequestUseCases,
    private cartService: CartService,
    private alertController: AlertController,
    private router: Router,
    private infoService : InfoService,
    private userService : UserService
  ) {}


  ngOnInit() {
   
    
  }

  async ionViewWillEnter() {
    this.getInfo();
   
    this.getHeigthInfo();
    const token = await this.getToken()
    if(token){
      this.getCurrentOrder()
    }
  }

  getHeigthInfo(){
    this.infoService.getInfoData()
    .then(data => {
      if(data.height > 900){
        this.contentHeigth = 'content-exchange-products1';
      }
      else if(data.height > 750){
        this.contentHeigth = 'content-exchange-products3';
      }
      else if(data.height > 300){
        this.contentHeigth = 'content-exchange-products2';
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
  }

  getCart() {
    this.cartService
      .getCartData()
      .then((data) => {
        console.log(data);
        if(data && data.details && data.details.length > 0){
          this.products = data.details;
          this.setTotal();
        }else{
          //this.products = []
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
       this.getCart();
      }else{
        console.log(response);
       this.getCart();
      }
     
    });
  }

  async getCurrentOrder(){
    const token = await this.getToken()
    this.requestUseCase
    .getCurrentOrder(
      token
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          if(response.data !== null){
            this.isCurrentOrder = true;
            this.currentOrder = response.data
          }else{
            this.isCurrentOrder = false;
          }
          console.log('success', response);
        } else {
          this.isCurrentOrder = false;
          console.log('success', response);
        }
      },
      (error) => {
        console.error('Ha ocurrido un error:', error);
      }
    );
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      return data?.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.router.navigate(['/sign-in']);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  addBtn(id:number) {
    this.products.find((element:{id:number,quantitySelected:number}) => {
      if(element.id === id){
        element.quantitySelected += element.quantitySelected < 10 ? 1 : 0;
      }
    })
    this.setTotal();
    this.cartService.setProductsCartData(this.products);
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
    this.cartService.setProductsCartData(this.products);
    // localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

  async deleteProduct(item:any) {
    await presentAlertExchange(
      this.alertController,
      item.product.name,
      '¿Deseas eliminar este producto de tu carrito de compras?',
      'exchange-products-success',
      item.product.image,
      () => this.deleteCart(item.id),
      item.id
    );
  }

  deleteCart(item:any){
    this.cartService.deleteCart(item);
    setTimeout(() => {
      this.getCart();
    }, 600);
  }

  setTotal(){
    this.total = 0;
    if(this.products){
      this.products.forEach((e: { price: number, quantitySelected: number }) => {
        if(e.price){
          this.total = this.total + (e.price * e.quantitySelected);
        }
      });
    }
    console.log(this.total , this.minimumAmountForPoints);
    
    this.points = this.total / this.minimumAmountForPoints;
    console.log(this.points);
    
  }

  submit(){
    this.cartService.setPointsCartData(this.points,this.total)
    this.router.navigate(['/home/tab3/cart-checkout'])
  }

  async cancelAlert() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      '¿Estás seguro que quieres cancelar el pedido?',
      '/assets/img/stop.svg',
      '',
      () => this.cancelCurrentOrder(),
      'Logout'
    );
  }

  async cancelCurrentOrder(){
      const token = await this.getToken()
      this.requestUseCase
      .cancelCurrentOrder(
        token
      )
      .subscribe(
        (response) => {
          if (response.success === true) {
            this.showAlertSuccess();
            console.log('success', response);
          } else {
            console.log('success', response);
          }
        },
        (error) => {
          console.error('Ha ocurrido un error:', error);
        }
      );
  }

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'Te pedido fue cancelado exitosamente. Puedes seguir comprando ahora.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goToHome()
    );
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
