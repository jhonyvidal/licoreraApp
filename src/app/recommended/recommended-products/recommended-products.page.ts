import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.page.html',
  styleUrls: ['./recommended-products.page.scss'],
})
export class RecommendedProductsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pageNumber: number = 1;
  products: any = [];
  items: string [] = [];
  position: number = 0;
  showInfiniteScroll = true;
  listClass: string = 'grid-list';

  constructor(
    private requestUseCase: RequestUseCases
  ) { }

  ngOnInit() {

    this.requestUseCase.getRecommendedProducts('token').subscribe(response => {
      if (response.success === true) {
        for (let index = 0; index < 20; index++) {
          this.products.push(response.data[this.position]);
          this.position++;
        }
      } else {
        console.log('Body del error: ', response);
      }
    })

  }

  loadData(event: any) {

    console.log('cargando los siguientes...');

    setTimeout(() => {

      if (this.position >= 117) {
        event.target.complete;
        this.showInfiniteScroll = false;
        this.infiniteScroll.disabled = true;
        this.listClass = 'grid-list-padding';
        return;
      }

      this.requestUseCase.getRecommendedProducts('token').subscribe(response => {
        if (response.success === true) {
          for (let index = 0; index < 20; index++) {
            if (response.data[this.position]) {
              this.products.push(response.data[this.position]);
              this.position++;
              console.log('Position: ',this.position);
            }

          }
        } else {
          console.log('Body del error: ', response);
        }
      })
      event.target.complete();
    }, 1000);


  }

  // onIonInfinite(ev: any) {
  //   this.generateItems();
  //   setTimeout(() => {
  //     (ev as InfiniteScrollCustomEvent).target.complete();
  //   }, 2000);
  // }

}
