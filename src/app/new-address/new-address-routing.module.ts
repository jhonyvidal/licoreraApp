import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAddressPage } from './new-address.page';

const routes: Routes = [
  {
    path: '',
    component: NewAddressPage
  },
  {
    path: 'new-address-map',
    loadChildren: () => import('./new-address-map/new-address-map.module').then( m => m.NewAddressMapPageModule)
  },
  {
    path: 'new-address-confirm',
    loadChildren: () => import('./new-address-confirm/new-address-confirm.module').then( m => m.NewAddressConfirmPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAddressPageRoutingModule {}
