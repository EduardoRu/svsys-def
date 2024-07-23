import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlInformacionPageRoutingModule } from './control-informacion-routing.module';

import { ControlInformacionPage } from './control-informacion.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlInformacionPageRoutingModule,
    MenuComponent
  ],
  declarations: [ControlInformacionPage]
})
export class ControlInformacionPageModule {}
