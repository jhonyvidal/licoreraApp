import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissingInfoPageRoutingModule } from './missing-info-routing.module';

import { MissingInfoPage } from './missing-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MissingInfoPageRoutingModule
  ],
  declarations: [MissingInfoPage]
})
export class MissingInfoPageModule {}
