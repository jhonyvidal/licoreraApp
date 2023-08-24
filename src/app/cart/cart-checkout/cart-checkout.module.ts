import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartCheckoutPageRoutingModule } from './cart-checkout-routing.module';

import { CartCheckoutPage } from './cart-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CartCheckoutPageRoutingModule
  ],
  declarations: [CartCheckoutPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartCheckoutPageModule {}
