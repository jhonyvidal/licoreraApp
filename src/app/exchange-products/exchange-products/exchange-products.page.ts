import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlertExchange } from 'src/shared/components/alert.exchange.component';
import { Product } from 'src/shared/domain/response/PromotionsData';
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
    private userService: UserService
  ) { }

  ngOnInit() {
    // promotionProducts
    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response.data);
        this.product = {...response.data.data[4].product}
        this.points = response.data.data[4].points;
        this.quantity = response.data.data[4].quantity;
        this.productName = response.data.data[4].product.name;
        this.productImage = response.data.data[4].product.image;
      } else {
        console.log('Body del error: ', response);
      }
    })
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
