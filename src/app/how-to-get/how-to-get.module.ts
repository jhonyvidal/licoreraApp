import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowToGetPageRoutingModule } from './how-to-get-routing.module';

import { HowToGetPage } from './how-to-get.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowToGetPageRoutingModule
  ],
  declarations: [HowToGetPage]
})
export class HowToGetPageModule {}
