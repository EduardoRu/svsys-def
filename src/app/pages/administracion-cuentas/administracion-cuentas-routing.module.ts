import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionCuentasPage } from './administracion-cuentas.page';

const routes: Routes = [
  {
    path: '',
    component: AdministracionCuentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionCuentasPageRoutingModule {}
