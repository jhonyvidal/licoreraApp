import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { Product } from 'src/shared/domain/response/PromotionsData';
import { ShareObjectService } from 'src/shared/services/shareObject';
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

  constructor(
    private requestUseCase: RequestUseCases,
    private alertController: AlertController,
    private userService: UserService,
    private shareObjectService:ShareObjectService,
  ) { }

  ngOnInit() {

    const productDetail = this.shareObjectService.getObjetoCompartido() 
    console.log(productDetail)
    this.product = productDetail.product;
    this.points = productDetail.points;
    this.quantity = productDetail.quantity;
    this.productName = productDetail.product.name;
    this.productImage = productDetail.product.image;
    this.getUser();
  }

  canjear(){
    
    this.puedeCanjear =this.userPoint  >= this.points  ? true : false;

    console.log('puede canjear: ',this.puedeCanjear);
    console.log('Points: ', this.points);

    if (this.puedeCanjear) {
      this.showAlertSuccess();
    }else{
      this.showAlertBad();
    }
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
      this.productImage
    );
  }

  getUser(){
    this.userService.getUserData()
    .then(data => {
      console.log(data.points)
      this.userPoint = data.points;
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  }

}
