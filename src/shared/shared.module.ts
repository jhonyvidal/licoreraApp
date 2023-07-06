import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';


@NgModule({
  declarations: [
    customCurrency
  ],
  imports: [
  ],
  exports: [
    customCurrency,
    HttpClientModule,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
