import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'campaign-detail',
    loadChildren: () => import('./campign/campaign-detail/campaign-detail.module').then( m => m.CampaignDetailPageModule)
  },
  {
    path: 'product-search',
    loadChildren: () => import('./search/product-search/product-search.module').then( m => m.ProductSearchPageModule)
  },
  {
    path: 'recommended-products',
    loadChildren: () => import('./recommended/recommended-products/recommended-products.module').then( m => m.RecommendedProductsPageModule)
  },
  {
    path: 'how-to-get',
    loadChildren: () => import('./how-to-get/how-to-get.module').then( m => m.HowToGetPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },  {
    path: 'exchange-products',
    loadChildren: () => import('./exchange-products/exchange-products/exchange-products.module').then( m => m.ExchangeProductsPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
