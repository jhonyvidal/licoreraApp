import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangePage } from './exchange.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangePage
  },
  {
    path: 'exchange-products',
    loadChildren: () => import('../exchange-products/exchange-products/exchange-products.module').then( m => m.ExchangeProductsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangePageRoutingModule {}
