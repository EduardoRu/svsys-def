import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebassqlPageRoutingModule } from './pruebassql-routing.module';

import { PruebassqlPage } from './pruebassql.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebassqlPageRoutingModule
  ],
  declarations: [PruebassqlPage]
})
export class PruebassqlPageModule {}
