import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/domain/response/PromotionsData';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
})
export class ProductSearchPage implements OnInit {

  pageNumber: number = 1;
  product: Product = {};

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {

    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
        if (response.success === true) {
          console.log('Promotions: ', response.data);
          this.product = {...response.data.data[0].product}
        } else {
          console.log('Body del error: ', response);
        }
    })

  }

}
