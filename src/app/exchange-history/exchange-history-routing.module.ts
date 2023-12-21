import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeHistoyrPage } from './exchange-history.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangeHistoyrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeHistoyrPageRoutingModule {}
