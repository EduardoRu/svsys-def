import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriaReportesPageRoutingModule } from './historia-reportes-routing.module';

import { HistoriaReportesPage } from './historia-reportes.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriaReportesPageRoutingModule,
    MenuComponent
  ],
  declarations: [HistoriaReportesPage]
})
export class HistoriaReportesPageModule {}
