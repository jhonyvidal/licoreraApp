import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
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

  constructor(private requestUseCase: RequestUseCases) { }

  ngOnInit() {
    // promotionProducts
    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response.data);
        this.product = {...response.data.data[4].product}
      } else {
        console.log('Body del error: ', response);
      }
    })
  }

}
