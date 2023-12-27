import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { SharedModule } from 'src/shared/shared.module';
import { CartModelPipe } from 'src/shared/pipes/cartModel.pipe';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
  ],
  declarations: [ProductDetailsPage],
  providers:[CartModelPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsPageModule {}
