import { Component, OnInit } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.page.html',
  styleUrls: ['./recommended-products.page.scss'],
})
export class RecommendedProductsPage implements OnInit {

  pageNumber: number = 1;
  products: any = [];
  items: string [] = [];

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {
    this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
      if (response.success === true) {
        console.log('Promotions: ', response.data);
        // this.product = {...response.data.data[0].product}
        this.products = response.data.data;
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

}
