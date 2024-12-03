import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiEquiPage } from './vehi-equi.page';

const routes: Routes = [
  {
    path: '',
    component: VehiEquiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiEquiPageRoutingModule {}
