import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministracionCuentasPageRoutingModule } from './administracion-cuentas-routing.module';

import { AdministracionCuentasPage } from './administracion-cuentas.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministracionCuentasPageRoutingModule,
    MenuComponent,
    ReactiveFormsModule
  ],
  declarations: [AdministracionCuentasPage]
})
export class AdministracionCuentasPageModule {}
