import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentOrdersPageRoutingModule } from './recent-orders-routing.module';

import { RecentOrdersPage } from './recent-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentOrdersPageRoutingModule
  ],
  declarations: [RecentOrdersPage]
})
export class RecentOrdersPageModule {}