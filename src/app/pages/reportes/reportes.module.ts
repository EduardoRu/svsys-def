import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesPageRoutingModule } from './reportes-routing.module';

import { ReportesPage } from './reportes.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { GenerarReporteCeluComponent } from 'src/app/components/reportes/generar-reporte-celu/generar-reporte-celu.component';
import { GenerarReporteDesktopComponent } from 'src/app/components/reportes/generar-reporte-desktop/generar-reporte-desktop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesPageRoutingModule,
    MenuComponent,
    GenerarReporteCeluComponent,
    GenerarReporteDesktopComponent
  ],
  declarations: [ReportesPage]
})
export class ReportesPageModule {}
