import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAddressConfirmPage } from './new-address-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: NewAddressConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAddressConfirmPageRoutingModule {}
