import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { Product } from 'src/shared/domain/response/PromotionsData';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { SignInObjectService } from 'src/shared/services/signInObject';
import { cartModel } from 'src/store/models/cart.model';
import { CartService } from 'src/store/services/cart.service';
import { UserService } from 'src/store/services/user.service';

@Component({
  selector: 'app-exchange-products',
  templateUrl: './exchange-products.page.html',
  styleUrls: ['./exchange-products.page.scss'],
})
export class ExchangeProductsPage implements OnInit {

  pageNumber: number = 1;
  product: Product = {};
  quantity: number;
  points: number;
  puedeCanjear: boolean;
  productName: string | undefined;
  productImage: string | undefined;
  userPoint:number;
  isSuccess:boolean = false;
  api_token:string = '';

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private shareObjectService:ShareObjectService,
    private CartModelPipe: CartModelPipe,
    private cartService: CartService,
    private router: Router,
    private signInObjectService:SignInObjectService
  ) { }

  ngOnInit() {

    const productDetail = this.shareObjectService.getObjetoCompartido() 
    console.log('Product detail', productDetail)
    this.product = productDetail.product;
    this.points = productDetail.points;
    this.quantity = productDetail.quantity;
    this.productName = productDetail.product.name;
    this.productImage = productDetail.product.image;
    this.getUser();
    this.getApiToken();
  }

  canjear(){
      if (this.api_token !== '') {
        this.puedeCanjear = this.userPoint >= this.points ? true : false;
    
        if (this.puedeCanjear) {
          this.showAlertSuccess();
        }else{
          this.showAlertBad();
        }
      }else{
        this.signInObjectService.setObjetoCompartido("/exchange-products")
        this.router.navigate(['/sign-in']);
      }
  }

  getApiToken(){
    this.userService.getUserData()
    .then(data => {

      if (data?.api_token) {
        this.api_token = data?.api_token;
      }

    })
  }

  async showAlertBad() {
    await presentAlertExchange(
      this.alertController,
      'INFORMACIÓN',
      'No tienes los puntos suficientes para canjear este producto. Sigue comprando y acumula.',
      'exchange-products-bad'
    );
  }

  async showAlertSuccess() {
    await presentAlertExchange(
      this.alertController,
      this.productName,
      `¿Quieres canjearlo por ${this.points} J?`,
      'exchange-products-success',
      this.productImage,
      () => this.setCart()
    );
  }

  getUser(){
    this.userService.getUserData()
    .then(data => {
      console.log(data?.points)
      this.userPoint = data?.points;
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

  async setCart(){
    let shareProduct = this.shareObjectService.getObjetoCompartido();

    if(shareProduct?.product.store){
      shareProduct = this.CartModelPipe.transform(this.shareObjectService.getObjetoCompartido()) ;
    }
    const quantity = {
      quantitySelected: 1,
    };
    const productDetail:cartModel = {
      ...shareProduct,
      ...quantity,
    };
    this.cartService.setCart(productDetail)
    this.isSuccess = true;
    
    setTimeout(() => {
      this.isSuccess = false;
    }, 3200); 
  }

}
