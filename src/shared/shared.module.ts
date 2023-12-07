import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';
import { CustomPipe } from './pipes/custom.pipe';
import { ShareObjectService } from './services/shareObject';
import { CartModelPipe } from './pipes/cartModel.pipe';
import { CustomDateOrders } from './pipes/customDateOrders.pipe';


@NgModule({
  declarations: [
    customCurrency,
    CustomPipe,
    CartModelPipe,
    CustomDateOrders
  ],
  imports: [
  ],
  exports: [
    customCurrency,
    CustomPipe,
    CustomDateOrders,
    CartModelPipe,
    HttpClientModule,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
