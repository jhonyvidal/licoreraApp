import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/shared/domain/response/PromotionsData';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { ShareObjectService } from 'src/shared/services/shareObject';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss','./product-search.page2.scss'],
})
export class ProductSearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pageNumber: number = 1;
  product: Product = {};
  items: string [] = [];
  products: any = [];
  products1: any = [];
  inputText: string;

  position: number = 0;
  showInfiniteScroll = true;
  listClass: string = 'grid-list';
  numberOfItems: number = 10;
  numberOfApiProducts: number = 0;
  myTimeout: any;
  search:boolean = true;

  constructor(
    private requestUseCase: RequestUseCases,
    private location: Location,
    private router:Router,
    private shareObjectService:ShareObjectService,
  ) { }

  ngOnInit() {

    // this.requestUseCase.getPromotions('token', this.pageNumber).subscribe(response => {
    //     if (response.success === true) {
    //       console.log('Promotions: ', response.data);
    //       this.product = {...response.data.data[0].product}
    //       this.products1 = response.data.data;
    //     } else {
    //       console.log('Body del error: ', response);
    //     }
    // })

    this.getAPIData();

  }

  loadData(event: any) {

    console.log('cargando los siguientes...');

    setTimeout(() => {
      if (this.position >= this.numberOfApiProducts) {
        event.target.complete;
        this.showInfiniteScroll = false;
        this.infiniteScroll.disabled = true;
        this.listClass = 'grid-list-margin';
        return;
      }

      this.getAPIData();

      event.target.complete();
    }, 1000);

  }

  getProductsSearched(inputSearched: any) {
    this.search = true;
    clearTimeout(this.myTimeout);
    this.myTimeout = setTimeout(() => {
      this.search = false;
      this.requestUseCase.getProductSearch('token', inputSearched).subscribe(response => {
        if (response.success === true) {
          console.log('API product search: ', response.data);
          console.log('Tamaño de la data: ', response.data.length);

          this.products = response.data;
        } else {
          console.log('Body del error: ', response);
        }
      })
    }, 1000);
  }

  getAPIData(){
    this.requestUseCase.getRecommendedProducts('token').subscribe(response => {
      if (response.success === true) {
        this.numberOfApiProducts = response.data.length;
        for (let index = 0; index < this.numberOfItems; index++) {
          if (response.data[this.position]) {
            this.products1.push(response.data[this.position]);
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
