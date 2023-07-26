import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeggestionsPageRoutingModule } from './suggestions-routing.module';

import { SeggestionsPage } from './suggestions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeggestionsPageRoutingModule
  ],
  declarations: [SeggestionsPage]
})
export class SeggestionsPageModule {}
