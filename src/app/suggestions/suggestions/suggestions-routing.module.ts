import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeggestionsPage } from './suggestions.page';

const routes: Routes = [
  {
    path: '',
    component: SeggestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeggestionsPageRoutingModule {}
