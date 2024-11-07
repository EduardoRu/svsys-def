import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-encuesta-satifaccion',
  templateUrl: './encuesta-satifaccion.component.html',
  styleUrls: ['./encuesta-satifaccion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class EncuestaSatifaccionComponent  implements OnInit {

  public encuesta:FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.encuesta = this.fb.group({
      tiempo_respuesta: ['', Validators.required],
      calidad: ['', Validators.required],
      atencion: ['', Validators.required],
      mala_conducta_personal: ['', Validators.required],
      observaciones: [''],
      resultado: ['', Validators.required]
    })  
  }

  async guardarEncuesta() {
    if (this.encuesta.valid) {
      console.log(this.encuesta.value);
      await this.storage.addValue('encuesta_satisfaccion', this.encuesta.value);
    } else {
      console.error('La encuesta es inválida');
    }
  }

  async cancel(){
    this.modalController.dismiss(null, 'cancel');
  }

  async generarReporte() {
    var dd = {
      pageOrientation: 'landscape',
      content: [
          {
              style: 'tableInspeccionVisual',
              table: {
                  widths: ['*', 20, '*', 20], 
                  body: [
                      // Primera fila que abarca las cuatro columnas
                      [{ text: 'INSPECCIÓN VISUAL', colSpan: 4, alignment: 'center', fontSize: 13 }, {}, {}, {}],
                      [{ text: 'INSPECCIONAR QUE EL INSTRUMENTO DE MEDICIÓN CUMPLA CON LAS CARACTERÍSTICAS QUE LE APLIQUEN DE LA SIGUIENTE LISTA Y REGISTRAR EL CUMPLIMIENTO (C), NO CUMPLIMIENTO (NC) O NO APLICA (NA)', colSpan: 4, alignment: 'center', fontSize: 10 }, {}, {}, {}],
                      
                      [{ text: 'El aspecto general del instrumento debe estar en buenas condiciones y no tener piezas sueltas.', fontSize: 9 }, {}, { text: 'El estado de la escala debe ser aceptable, entendiendo que no presente ralladuras ni deformaciones que afecten la claridad en la toma de lecturas.', fontSize: 9 }, {}],
                      [{ text: 'Se debe inspeccionar que el tornillo que sostiene las piezas para nivelar el dispositivo esté fijo y que las piezas no puedan retirarse fácilmente.', fontSize: 9 }, {}, { text: 'El equipo auxiliar, si existe, debe ser aceptable. Los caucharones y contrapesos no deben tener golpes o deformaciones.', fontSize: 9 }, {}],
                      [{ text: 'Debe comprobarse la masa real de los contrapesos y conocer la relación del instrumento para validar la masa.', fontSize: 9 }, {}, { text: 'Inspeccionar que las graduaciones de los dispositivos estén en unidades del Sistema General de Unidades de Medida, conforme a la NOM-008-SCFI.', fontSize: 9 }, {}],
                      [{ text: 'Inspeccionar las indicaciones obligatorias y posiciones para marcas de inspección y control.', fontSize: 9 }, {}, { text: 'Las graduaciones deben estar grabadas en ambas caras de los dispositivos indicadores.', fontSize: 9 }, {}],
                      [{ text: 'Inspeccionar que las condiciones de uso del instrumento sean apropiadas.', fontSize: 9 }, {}, { text: 'Todas las barras graduadas deben tener un remache en sus extremos para evitar que el pilón corredizo se quite.', fontSize: 9 }, {}],
                      [{ text: 'El ajuste de cero debe ser aceptable, con una desviación no mayor a 0,25e.', fontSize: 9 }, {}, { text: 'Instrumentos con múltiples receptores deben tener grabadas las marcas de identificación, alcance mínimo, y división de inspección.', fontSize: 9 }, {}],
                      [{ text: 'Instrumentos que usan energía eléctrica deben estar conectados y encendidos durante las pruebas.', fontSize: 9 }, {}, { text: 'Inspeccionar el correcto funcionamiento de los dispositivos de ajuste a cero, tara, y dispositivos de cálculo.', fontSize: 9 }, {}]
                  ]
              }
          },
          
          {
              style: 'tableInspeccionMtro',
              table: {
                  widths: [23, 46, 46, 46, 46, 46, 46, 46, 55, 40, 40, 40, 40, 76],
                  body: [
                      [{text:'INSPECCIÓN DE PROPIEDADES METROLÓGICAS', colSpan: 14, alignment: 'center', bold: true}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                          { text: 'Equipo No.', fontSize: 8, alignment: 'center'}, 
                          { text: 'Alcance máximo', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {},
                          { text: 'División mínima', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {}, 
                          { text: 'Clase de exactitud', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {}, 
                          { text: 'Precarga 100% de MÁX', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {},
                          { text: 'REPETIBILIDAD', colSpan: 4 , fontSize: 10.5, alignment: 'center'}, {}, {}, {},
                          { text: 'EXCENTRICIDAD' , fontSize: 10, alignment: 'center'} 
                      ],
                      [
                          { text: '', fontSize: 10.5, alignment: 'center'}, 
                          { text: 'kg', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {},
                          { text: 'g', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {}, 
                          { text: '', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {}, 
                          { text: 'kg', colSpan: 2 , fontSize: 10.5, alignment: 'center'}, {},
                          { text: '50% DE MÁX', fontSize: 9, alignment: 'center'}, 
                          { text: '100% DE MÁX',fontSize: 9,alignment: 'center'}, 
                          { text: '50% DE MÁX', fontSize: 9,alignment: 'center'}, 
                          { text: '50% DE MÁX',fontSize: 9,alignment: 'center'},
                          { text: '1/3 DE MÁXkg' , fontSize: 10, alignment: 'center'} 
                      ],
                      [
                          { text: 'EXACTITUD', fontSize: 10.5, colSpan: 9, alignment: 'center'}, 
                          {}, {},
                          {}, {}, 
                          {}, {}, 
                          {}, {},
                          { text: 'Diferencia', fontSize: 8, alignment: 'center'}, 
                          { text: 'Diferencia',fontSize: 8,alignment: 'center'}, 
                          { text: 'Diferencia', fontSize: 8,alignment: 'center'}, 
                          { text: 'Diferencia',fontSize: 8,alignment: 'center'},
                          { text: 'EMT' , fontSize: 10, alignment: 'center'} 
                      ],
                      [
                          {},
                          {text: 'CARGA(kg)', fontSize: 6, alignment: 'center'}, 
                          {text: 'EMT (g)', fontSize: 6, alignment: 'center'}, 
                          {text: 'ERROR +/- (g) ASC', fontSize: 6, alignment: 'center'},
                          {text: 'ERROR +/- (g) DESC', fontSize: 6, alignment: 'center'}, 
                          {text: 'CARGA(kg)', fontSize: 6, alignment: 'center'}, 
                          {text: 'EMT (g)', fontSize: 6, alignment: 'center'}, 
                          {text: 'ERROR +/- (g) ASC', fontSize: 6, alignment: 'center'}, 
                          {text: 'EMT (g)', fontSize: 6, alignment: 'center'},
                          { text: 'Error +/- (g)', fontSize: 7, alignment: 'center'}, 
                          { text: 'Error +/- (g)',fontSize: 7,alignment: 'center'}, 
                          { text: 'Error +/- (g)', fontSize: 7,alignment: 'center'}, 
                          { text: 'Error +/- (g)',fontSize: 7,alignment: 'center'},
                          { text: 'Error +/- (g)' , fontSize: 7, alignment: 'center'} 
                      ],
                      [
                          {text: '1',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '2',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '3',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '4',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '5',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '6',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '7',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '8',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '9',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: '10',fontSize: 8, alignment: 'center'},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                      ],
                      [
                          {text: 'Las cargas de pruebas seleccionadas deben incluir [Máx] y [Mín], y valores cercanos a puntos en los cuales cambian los errores máximos tolerados [EMT]. Para facilitar considere el utilizar lo menos posible pesas fraccionarias y así evitar el apilamiento de pesas pequeñas aunque no coincidan aritméticamente el porcentaje.',fontSize: 8, colSpan:9},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {},
                          {text:'El instrumento deberá regresar a su posición de cero entre cada pesada. En el caso de una deviación a cero entre pesadas, el instrumento debe ser ajustado a cero',fontSize: 8, colSpan:5},
                          {},
                          {},
                          {},
                          {},
                      ],
                  ]
              },
          },
          {
        columns: [
          {
            text: 'OBSERVACIONES DEL INSPECTOR: __________________________________________________________', fontSize:10
          },
          {
            text: 'CUMPLE CON LA NORMA NOM-010-SCFI-1994 CUMPLE (C) NO CUMPLE (NC)', fontSize:10,width:220
              
          },
          {
              text:'C/NC',
              width:60
          }
        ]
      },
          
          
      ],
      styles: {
          tableInspeccionVisual: {
              margin: [0, -30, 0, 0]
          },
          tableInspeccionMtro: {
              margin: [0, 5, 0, 0]
          }
      }
  };

  //pdfMake.createPdf(dd).download('archivo_ejemplo.pdf');
  pdfMake.createPdf(dd).open();
  }

}
