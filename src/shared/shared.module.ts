import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';
import { CustomPipe } from './pipes/custom.pipe';
import { ShareObjectService } from './services/shareObject';
import { CartModelPipe } from './pipes/cartModel.pipe';
import { CustomDateOrders } from './pipes/customDateOrders.pipe';
import { ProductDetailModelPipe } from './pipes/productDetailModel.pipe';


@NgModule({
  declarations: [
    customCurrency,
    CustomPipe,
    CartModelPipe,
    ProductDetailModelPipe,
    CustomDateOrders
  ],
  imports: [
  ],
  exports: [
    customCurrency,
    CustomPipe,
    CustomDateOrders,
    CartModelPipe,
    ProductDetailModelPipe,
    HttpClientModule,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
