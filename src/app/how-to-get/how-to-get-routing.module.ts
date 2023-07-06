import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToGetPage } from './how-to-get.page';

const routes: Routes = [
  {
    path: '',
    component: HowToGetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToGetPageRoutingModule {}
