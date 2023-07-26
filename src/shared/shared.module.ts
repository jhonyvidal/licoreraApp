import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';
import { CustomPipe } from './pipes/custom.pipe';
import { ShareObjectService } from './services/shareObject';
import { CartModelPipe } from './pipes/cartModel.pipe';


@NgModule({
  declarations: [
    customCurrency,
    CustomPipe,
    CartModelPipe
  ],
  imports: [
  ],
  exports: [
    customCurrency,
    CustomPipe,
    CartModelPipe,
    HttpClientModule,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
