import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedProductsPageRoutingModule } from './recommended-products-routing.module';

import { RecommendedProductsPage } from './recommended-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedProductsPageRoutingModule
  ],
  declarations: [RecommendedProductsPage]
})
export class RecommendedProductsPageModule {}
