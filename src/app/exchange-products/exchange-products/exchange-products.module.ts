import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeProductsPageRoutingModule } from './exchange-products-routing.module';

import { ExchangeProductsPage } from './exchange-products.page';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';
import { successLottieComponent } from 'src/shared/components/animations/success.lottie.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeProductsPageRoutingModule,
  ],
  declarations: [ExchangeProductsPage],
  providers:[CartModelPipe],
})
export class ExchangeProductsPageModule {}
