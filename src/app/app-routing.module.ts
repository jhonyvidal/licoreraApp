import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
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
    path: 'exchange-products',
    loadChildren: () => import('./exchange-products/exchange-products/exchange-products.module').then( m => m.ExchangeProductsPageModule)
  },
  {
    path: 'store-detail/:idCategory',
    loadChildren: () => import('./store/store-detail/store-detail.module').then( m => m.StoreDetailPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
 
  {
    path: 'recent-orders',
    loadChildren: () => import('./orders/recent-orders/recent-orders.module').then( m => m.RecentOrdersPageModule)
  },
  {
    path: 'recent-order',
    loadChildren: () => import('./order/recent-order/recent-order.module').then( m => m.RecentOrderPageModule)
  },
  {
    path: 'suggestions',
    loadChildren: () => import('./suggestions/suggestions/suggestions.module').then( m => m.SeggestionsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
