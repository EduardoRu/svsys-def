import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlInformacionPage } from './control-informacion.page';

const routes: Routes = [
  {
    path: '',
    component: ControlInformacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlInformacionPageRoutingModule {}
