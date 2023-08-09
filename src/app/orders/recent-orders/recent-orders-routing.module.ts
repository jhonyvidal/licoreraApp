import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentOrdersPage } from './recent-orders.page';

const routes: Routes = [
  {
    path: '',
    component: RecentOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentOrdersPageRoutingModule {}
