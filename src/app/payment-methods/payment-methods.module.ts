import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMethodsPageRoutingModule } from './payment-methods-routing.module';

import { PaymentMethodsPage } from './payment-methods.page';
import { MaskitoModule } from '@maskito/angular';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaymentMethodsPageRoutingModule,
    MaskitoModule
  ],
  declarations: [PaymentMethodsPage]
})
export class PaymentMethodsPageModule {}
