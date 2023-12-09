import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailPageRoutingModule } from './store-detail-routing.module';

import { StoreDetailPage } from './store-detail.page';
import { SharedModule } from 'src/shared/shared.module';
import { ProductDetailModelPipe } from 'src/shared/pipes/productDetailModel.pipe';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDetailPageRoutingModule
  ],
  providers:[ProductDetailModelPipe],
  declarations: [StoreDetailPage]
})
export class StoreDetailPageModule {}
