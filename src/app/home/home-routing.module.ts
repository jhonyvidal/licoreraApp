import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../landing/landing.module').then(m => m.LandingPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../store/store.module').then(m => m.StorePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../exchange/exchange.module').then(m => m.ExchangePageModule)
      },
      {
        path: '',
        redirectTo: '/home/tab1',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/home/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
