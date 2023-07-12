import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSearchPageRoutingModule } from './product-search-routing.module';

import { ProductSearchPage } from './product-search.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSearchPageRoutingModule
  ],
  declarations: [ProductSearchPage]
})
export class ProductSearchPageModule {}
