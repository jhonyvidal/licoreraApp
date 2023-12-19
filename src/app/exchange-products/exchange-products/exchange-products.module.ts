import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeProductsPageRoutingModule } from './exchange-products-routing.module';

import { ExchangeProductsPage } from './exchange-products.page';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';
import { successLottieComponent } from 'src/shared/components/animations/success.lottie.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeProductsPageRoutingModule
  ],
  declarations: [ExchangeProductsPage,successLottieComponent],
  providers:[CartModelPipe],
})
export class ExchangeProductsPageModule {}
