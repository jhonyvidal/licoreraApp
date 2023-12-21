import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';
import { CustomPipe } from './pipes/custom.pipe';
import { ShareObjectService } from './services/shareObject';
import { CartModelPipe } from './pipes/cartModel.pipe';
import { CustomDateOrders } from './pipes/customDateOrders.pipe';
import { ProductDetailModelPipe } from './pipes/productDetailModel.pipe';
import { CustomDateAlert } from './pipes/customDateAlert.pipe';
import { StarRatingComponent } from './components/StarRatingComponent';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    customCurrency,
    CustomPipe,
    CartModelPipe,
    ProductDetailModelPipe,
    CustomDateOrders,
    CustomDateAlert,
    StarRatingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    customCurrency,
    CustomPipe,
    CustomDateOrders,
    CustomDateAlert,
    CartModelPipe,
    ProductDetailModelPipe,
    HttpClientModule,
    StarRatingComponent
  ],
  providers: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
