import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { ShareObjectService } from 'src/shared/services/shareObject';

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
  numberOfItems: number = 10;
  numberOfApiProducts: number = 0;

  constructor(
    private requestUseCase: RequestUseCases,
    private location: Location,
    private router:Router,
    private shareObjectService:ShareObjectService,
  ) { }

  ngOnInit() {

    this.getAPIData();

  }

  loadData(event: any) {

    console.log('cargando los siguientes...');

    setTimeout(() => {

      if (this.position >= this.numberOfApiProducts) {
        event.target.complete;
        this.showInfiniteScroll = false;
        this.infiniteScroll.disabled = true;
        this.listClass = 'grid-list-padding';
        return;
      }

      this.getAPIData();

      event.target.complete();
    }, 1000);

  }

  getAPIData(){
    this.requestUseCase.getRecommendedProducts('token').subscribe(response => {
      if (response.success === true) {
        this.numberOfApiProducts = response.data.length;
        for (let index = 0; index < this.numberOfItems; index++) {
          if (response.data[this.position]) {
            this.products.push(response.data[this.position]);
            this.position++;
          }
        }
      } else {
        console.log('Body del error: ', response);
      }
    })
  }

  goBack(): void {
    this.router.navigate(['/home/tab1']);
  }

  getProductDetail(data:any){
    this.shareObjectService.setObjetoCompartido(data)
    this.router.navigate(['/product-details']);
  }


}
