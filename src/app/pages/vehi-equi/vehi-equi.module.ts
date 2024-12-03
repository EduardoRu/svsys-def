import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiEquiPageRoutingModule } from './vehi-equi-routing.module';

import { VehiEquiPage } from './vehi-equi.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiEquiPageRoutingModule,
    MenuComponent
  ],
  declarations: [VehiEquiPage]
})
export class VehiEquiPageModule {}
