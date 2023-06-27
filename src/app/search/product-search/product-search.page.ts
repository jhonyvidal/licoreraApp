import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/domain/response/PromotionsData';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
})
export class ProductSearchPage implements OnInit {

  pageNumber: number = 1;
  product: Product = {};
  items: string [] = [];
  products: any = [];
  products1: any = [];
  inputText: string;

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {

    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
        if (response.success === true) {
          console.log('Promotions: ', response.data);
          this.product = {...response.data.data[0].product}
          this.products1 = response.data.data;
        } else {
          console.log('Body del error: ', response);
        }
    })

    this.generateItems();

  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getProductsSearched(inputSearched: any) {
    this.requestUseCase.getProductSearch('token', inputSearched).subscribe(response => {
      if (response.success === true) {
        console.log('API product search: ', response.data);
        console.log('Tamaño de la data: ', response.data.length);

        this.products = response.data;
      } else {
        console.log('Body del error: ', response);
      }
    })
  }

}
