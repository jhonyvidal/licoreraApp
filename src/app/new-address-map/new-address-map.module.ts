import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAddressMapPageRoutingModule } from './new-address-map-routing.module';

import { NewAddressMapPage } from './new-address-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewAddressMapPageRoutingModule
  ],
  declarations: [NewAddressMapPage]
})
export class NewAddressMapPageModule {}
