import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointEntryPageRoutingModule } from './point-entry-routing.module';

import { PointEntryPage } from './point-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointEntryPageRoutingModule
  ],
  declarations: [PointEntryPage]
})
export class PointEntryPageModule {}
