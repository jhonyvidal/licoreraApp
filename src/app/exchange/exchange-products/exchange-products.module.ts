import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeProductsPageRoutingModule } from './exchange-products-routing.module';

import { ExchangeProductsPage } from './exchange-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeProductsPageRoutingModule
  ],
  declarations: [ExchangeProductsPage]
})
export class ExchangeProductsPageModule {}
