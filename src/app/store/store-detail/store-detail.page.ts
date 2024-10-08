import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { CategoriesOut } from 'src/shared/domain/response/Categories';
import { CategoriesByProductOut } from 'src/shared/domain/response/CategoriesByProduct';
import { Location } from '@angular/common'
import { ShareObjectService } from 'src/shared/services/shareObject';
import { ProductDetailModelPipe } from 'src/shared/pipes/productDetailModel.pipe';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pageNumber: number = 1;
  products: CategoriesByProductOut[] = [];
  categories: CategoriesOut[] = [];
  showInfiniteScroll = true;
  listClass: string = 'grid-list';
  numberOfItems: number = 10;
  numberOfApiProducts: number = 0;
  page: number = 1;
  idCategory: string;
  category:string;

  constructor(
    private requestUseCase: RequestUseCases,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router:Router,
    private shareObjectService:ShareObjectService,
    private ProductDetailModelPipe:ProductDetailModelPipe
    ) {
      this.getCategories();
     }

  ngOnInit() {
    this.idCategory = this.activatedRoute.snapshot.paramMap.get('idCategory') || '';
    this.getCategoriesProducts();
  }
  // element.id === parseInt(this.idCategory))?.name || '';

  loadData(event: any) {
    setTimeout(() => {
      this.getCategoriesProducts();
      event.target.complete();
    }, 1000);
  }

  getCategoriesProducts(){
    this.requestUseCase.getCategoriesByProduct('token', this.idCategory || '' , this.page).subscribe(response => {
      if (response.success === true) {
        response.data.data.forEach((elemento:any,indice:number) => {
          this.products.push(elemento);
        });
        this.page++ 
      } else {
        console.log('Body del error: ', response);
      }
    })
  }

  getCategories(){
    this.requestUseCase.getCategories('token').subscribe(response => {
      if (response.success === true) {
        response.data.forEach((elemento:any,indice:number) => {
          this.categories.push(elemento);
        });
        this.category = this.categories.find((element) => {
          return element.id === parseInt(this.idCategory)
        })?.name || '';
      } else {
        console.log('Body del error: ', response);
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  getProductDetail(data:any){
    console.log({product:data})
    const responseObjectTranformed = this.ProductDetailModelPipe.transform({product:data})
    this.shareObjectService.setObjetoCompartido(responseObjectTranformed)
    this.router.navigate(['/product-details']);
  }

}
