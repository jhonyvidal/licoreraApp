import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { Product } from 'src/shared/domain/response/PromotionsData';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { Location } from '@angular/common'
import { CartService } from 'src/store/services/cart.service';
import { cartModel } from 'src/store/models/cart.model';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';
import "@lottiefiles/lottie-player";
import { presentAlert } from 'src/shared/components/alert.component';
import { AlertController } from '@ionic/angular';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  localStorageQuantity: string = window.localStorage.getItem('QUANTITY_PRODUCT') as string;

  pageNumber: number = 1;
  product: Product = {};
  details:any;
  showFeatures: boolean;
  beforePrice: boolean;
  quantity: number;
  isSuccess:boolean = false;
  isPromotion:boolean = false;
  isNewProduct:boolean = false;
  discount:number=0;
  price:number=0;
  section:string='sectionWithBg'
  features:[]=[];
  
  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private shareObjectService:ShareObjectService,
    private CartModelPipe:CartModelPipe
  ) {
  }

  ionViewWillEnter() {
    this.quantity = 1;
  }

  ngOnInit() {
    this.details = this.shareObjectService.getObjetoCompartido()
    this.details.origin_page === 'Promotion' ? this.isPromotion = true : null;
    this.details.origin_page === 'NewProduct' ? this.isNewProduct = true : null;
    this.product = this.details.product;
    this.discount = this.details.discount
    console.log(this.details);
    this.price = this.details.price;
    this.features = this.details.features_string;
    
    if(this.details.discount){
      this.beforePrice = this.details.price
      const porcent =  (this.details.price * this.details.discount) / 100;
      this.price = this.details.price - porcent;
    }
    
    if (!this.localStorageQuantity) {
      window.localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(1));
      this.quantity = JSON.parse(window.localStorage.getItem('QUANTITY_PRODUCT') as string);
    }else{
      this.quantity = JSON.parse(this.localStorageQuantity);
    }
    if(this.isPromotion){
      this.section = 'sectionWithoutBg';
    }
  }

  addBtn() {
    console.log('Presionando add...');
    this.quantity += this.quantity < 10 ? 1 : 0;
    localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
    this.price = this.details.price * this.quantity;
  }

  subtractBtn() {
    console.log('Presionando minus...');
    this.quantity -= this.quantity > 1 ? 1 : 0;
    localStorage.setItem('QUANTITY_PRODUCT', JSON.stringify(this.quantity));
    this.price= this.details.price * this.quantity;
  }

  goBack(): void {
    this.location.back();
  }

  async setCart(){
    let shareProduct = this.shareObjectService.getObjetoCompartido();

    if(shareProduct?.product.store){
      shareProduct = this.CartModelPipe.transform(this.shareObjectService.getObjetoCompartido()) ;
    }
    const quantity = {
      quantitySelected: this.quantity,
    };
    const productDetail:cartModel = {
      ...shareProduct,
      ...quantity,
    };
    this.cartService.setCart(productDetail)
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 3200); 
  }

}
