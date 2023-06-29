import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'exchange',
    loadChildren: () => import('./exchange/exchange.module').then( m => m.ExchangePageModule)
  },  {
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

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
