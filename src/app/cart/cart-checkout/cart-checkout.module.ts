import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartCheckoutPageRoutingModule } from './cart-checkout-routing.module';

import { CartCheckoutPage } from './cart-checkout.page';
import { SharedModule } from 'src/shared/shared.module';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CartCheckoutPageRoutingModule,
    MaskitoModule
  ],
  declarations: [CartCheckoutPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartCheckoutPageModule {}
