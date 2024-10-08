import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentOrderPageRoutingModule } from './recent-order-routing.module';

import { RecentOrderPage } from './recent-order.page';
import { SharedModule } from 'src/shared/shared.module';
import { RecentOrderPipe } from 'src/shared/pipes/recentOrder.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentOrderPageRoutingModule,
    SharedModule,
  ],
  declarations: [RecentOrderPage],
  providers:[RecentOrderPipe],
})
export class RecentOrderPageModule {}
