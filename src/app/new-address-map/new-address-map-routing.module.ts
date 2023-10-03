import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAddressMapPage } from './new-address-map.page';

const routes: Routes = [
  {
    path: '',
    component: NewAddressMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAddressMapPageRoutingModule {}
