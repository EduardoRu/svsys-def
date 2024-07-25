import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebassqlPage } from './pruebassql.page';

const routes: Routes = [
  {
    path: '',
    component: PruebassqlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebassqlPageRoutingModule {}
