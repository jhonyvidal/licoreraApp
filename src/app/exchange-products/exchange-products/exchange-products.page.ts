import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { Product } from 'src/shared/domain/response/PromotionsData';

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

  constructor(
    private requestUseCase: RequestUseCases,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // promotionProducts
    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response.data);
        this.product = {...response.data.data[4].product}
        this.points = response.data.data[4].points;
        this.quantity = response.data.data[4].quantity;
      } else {
        console.log('Body del error: ', response);
      }
    })
  }

  canjear(){
    this.showAlert();
  }

  async showAlert() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      'No tienes los puntos suficientes para canjear este producto. Sigue comprando y acumula.',
      'exchange-products'
    );
  }

}
