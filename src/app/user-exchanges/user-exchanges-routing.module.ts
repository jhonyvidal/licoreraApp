import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserExchangesPage } from './user-exchanges.page';

const routes: Routes = [
  {
    path: '',
    component: UserExchangesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserExchangesPageRoutingModule {}
