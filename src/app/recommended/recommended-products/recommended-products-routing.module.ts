import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedProductsPage } from './recommended-products.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedProductsPageRoutingModule {}
