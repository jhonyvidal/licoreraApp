import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentOrderPage } from './recent-order.page';

const routes: Routes = [
  {
    path: '',
    component: RecentOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentOrderPageRoutingModule {}
