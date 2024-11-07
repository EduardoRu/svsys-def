import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-generar-reporte-celu',
  templateUrl: './generar-reporte-celu.component.html',
  styleUrls: ['./generar-reporte-celu.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class GenerarReporteCeluComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
