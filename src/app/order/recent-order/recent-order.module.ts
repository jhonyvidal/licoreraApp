import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentOrderPageRoutingModule } from './recent-order-routing.module';

import { RecentOrderPage } from './recent-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentOrderPageRoutingModule
  ],
  declarations: [RecentOrderPage]
})
export class RecentOrderPageModule {}
