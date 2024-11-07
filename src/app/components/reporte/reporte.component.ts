import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonds from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonds.pdfMake.vfs;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ReporteComponent  implements OnInit {

  ObjectPDF: any;

  constructor() { }

  ngOnInit() {}


  generatePDF() {

  }
}
/*
// playground requires you to assign document definition to a variable called dd

var dd = {
	content: [
		{
			style: 'tableExample',
			table: {
			    widths: ['*', '*', '*', '*'],
				body: [
				    [{text: 'Fila 1 Combinada', colSpan: 4, alignment: 'center'}, {}, {}, {}],
				    [{text: 'Fila 2 Combinada', colSpan: 4, alignment: 'center'}, {}, {}, {}],
				    ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4'],
				    ['Fila 4', 'Valor 1', 'Valor 2', 'Valor 3'],
				    ['Fila 5', 'Valor 1', 'Valor 2', 'Valor 3'],
					['Fila 6', 'Valor 1', 'Valor 2', 'Valor 3'],
					['Fila 7', 'Valor 1', 'Valor 2', 'Valor 3'],
					['Fila 8', 'Valor 1', 'Valor 2', 'Valor 3'],
					[{text: 'Fila 9 Combinada', colSpan: 1, alignment: 'center'}, {text: 'Hola',colSpan:3},{}, {}]
				]
			}
		},
	],
	pageOrientation: 'landscape'
	
}
*/