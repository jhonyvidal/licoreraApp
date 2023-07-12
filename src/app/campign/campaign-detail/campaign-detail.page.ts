import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Product } from 'src/shared/domain/response/PromotionsData';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.page.html',
  styleUrls: ['./campaign-detail.page.scss'],
})
export class CampaignDetailPage implements OnInit {

  localStorageQuantity: string = window.localStorage.getItem('QUANTITY_PRODUCT') as string;

  pageNumber: number = 1;
  product: Product = {};
  showFeatures: boolean;
  beforePrice: boolean;
  quantity: number;

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {

    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
        if (response.success === true) {
          console.log('Promotions: ', response.data);
          this.product = {...response.data.data[4].product}
          // ToDo. Cuando pasen la API, se debe mejorar el código para mostrar u ocultar el
          // apartado de features
          this.showFeatures = !this.product.features ? true : false;
          this.beforePrice = !this.product.beforePrice ? true : false;
        } else {
          console.log('Body del error: ', response);
        }
    })

    if (!this.localStorageQuantity) {
      window.localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(1));
      this.quantity = JSON.parse(window.localStorage.getItem('QUANTITY_PRODUCT') as string);
    }else{
      this.quantity = JSON.parse(this.localStorageQuantity);
    }

  }

  addBtn() {
    console.log('Presionando add...');

    this.quantity += this.quantity < 10 ? 1 : 0;
    localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

  subtractBtn() {
    console.log('Presionando minus...');
    this.quantity -= this.quantity > 1 ? 1 : 0;
    localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
  }

}
