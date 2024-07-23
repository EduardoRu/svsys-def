import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriaReportesPage } from './historia-reportes.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriaReportesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaReportesPageRoutingModule {}
