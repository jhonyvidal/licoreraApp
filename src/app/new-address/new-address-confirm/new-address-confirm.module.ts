import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAddressConfirmPageRoutingModule } from './new-address-confirm-routing.module';

import { NewAddressConfirmPage } from './new-address-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewAddressConfirmPageRoutingModule
  ],
  declarations: [NewAddressConfirmPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewAddressConfirmPageModule {}
