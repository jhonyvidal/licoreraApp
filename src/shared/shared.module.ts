import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';
import { CustomPipe } from './pipes/custom.pipe';


@NgModule({
  declarations: [
    customCurrency,
    CustomPipe
  ],
  imports: [
  ],
  exports: [
    customCurrency,
    CustomPipe,
    HttpClientModule,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
