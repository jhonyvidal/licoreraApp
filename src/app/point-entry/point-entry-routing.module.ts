import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointEntryPage } from './point-entry.page';

const routes: Routes = [
  {
    path: '',
    component: PointEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointEntryPageRoutingModule {}
