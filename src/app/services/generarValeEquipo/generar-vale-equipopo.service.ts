import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class GenerarValeEquipopoService {

  constructor(
    private http: HttpClient
  ) { }


  async cargarFuentes() {
    // Cargar las fuentes desde rutas locales
    const regularFont = await this.http.get('assets/Font/Times/times-new-roman.ttf', { responseType: 'arraybuffer' }).toPromise();
    const boldFont = await this.http.get('assets/Font/Times/times-new-roman-bold.otf', { responseType: 'arraybuffer' }).toPromise();
    const italicFont = await this.http.get('assets/Font/Times/times-new-roman-italic.ttf', { responseType: 'arraybuffer' }).toPromise();
    const boldItalicFont = await this.http.get('assets/Font/Times/times-new-roman-bold-italic.ttf', { responseType: 'arraybuffer' }).toPromise();

    // Convertir las fuentes a Base64 y agregarlas al Virtual File System (vfs)
    pdfMake.vfs['TimesNewRoman-Regular.ttf'] = this.arrayBufferToBase64(regularFont);
    pdfMake.vfs['TimesNewRoman-Bold.ttf'] = this.arrayBufferToBase64(boldFont);
    pdfMake.vfs['TimesNewRoman-Italic.ttf'] = this.arrayBufferToBase64(italicFont);
    pdfMake.vfs['TimesNewRoman-BoldItalic.ttf'] = this.arrayBufferToBase64(boldItalicFont);

     // Configurar las fuentes personalizadas
     pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
      Times: {
        normal: 'TimesNewRoman-Regular.ttf',
        bold: 'TimesNewRoman-Bold.ttf',
        italics: 'TimesNewRoman-Italic.ttf',
        bolditalics: 'TimesNewRoman-BoldItalic.ttf',
      },
    };
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async generarJSON() {
    await this.cargarFuentes();

    var dd = {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20], // Márgenes generales
      defaultStyle: {
        font: 'Times', // Usa Times New Roman como fuente predeterminada
      },
      content: [
        {
          table: {
            widths: ['*'], // Una única columna que ocupa todo el ancho
            body: [
              [
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{
                        table: {
                          widths: ['*'], // Columnas para la tabla
                          body: [
                            [{
                              text: 'VALE DE USO DE EQUIPO',
                              fontSize: 15,
                              alignment: 'center',
                              bold: true,
                              border: [1, 1, 1, 1],
                              fillColor: '#FFDAB9',
                            }]
                          ]
                        },
                        layout: {
                          hLineWidth: () => 0.5, // Grosor de las líneas horizontales
                          vLineWidth: () => 0.5, // Grosor de las líneas verticales
                          hLineColor: () => 'black', // Color de las líneas horizontales
                          vLineColor: () => 'black', // Color de las líneas verticales
                        },
                        margin: [150, 10, 150, 0],
                        border: [1, 1, 1, 0],
                      }],
                      [
                        {
                          text: `Yo, ___________________________________________ recibo de la empresa “SERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V. UVIM 129, en el domicilio en c. Isabelica Núm. 132 col. Rinconada la Isabélica en Zacatecas Zac., la documentación que a continuación se detalla:\n\n`,
                          border: [1, 0, 1, 0],
                          alignment: 'justify',
                          margin: [0, 15, 0, 0],
                          fontSize: 10
                        },
                      ],
                      // Aquí empieza la tabla para "DESCRIPCIÓN DE EQUIPO"
                      [
                        {

                          table: {
                            widths: ['*', '*', '*', '10%', '*'], // Columnas para la tabla
                            body: [
                              [
                                { text: 'DESCRIPCIÓN DE EQUIPO', bold: true, alignment: 'center',  fontSize: 10 },
                                { text: 'CANTIDAD', bold: true, alignment: 'center',  fontSize: 10 },
                                { text: 'IDENTIFICACIÓN', bold: true, alignment: 'center',  fontSize: 10 },
                                { text: '',  fontSize: 10 },
                                { text: 'OBSERVACIONES', bold: true, alignment: 'center',  fontSize: 10 },
                              ],
                              [
                                { text: 'Equipo A', fontSize: 10, margin:[5,5,5,5] },
                                { text: '1', fontSize: 10, margin:[5,5,5,5] },
                                { text: 'ID001', fontSize: 10, margin:[5,5,5,5] },
                                { text: '', fontSize: 10, margin:[5,5,5,5]},
                                { text: 'Sin observaciones', fontSize: 10, margin:[5,5,5,5] },
                              ],
                              [
                                { text: 'Equipo A', fontSize: 10, margin:[5,5,5,5] },
                                { text: '1',fontSize: 10, margin:[5,5,5,5]  },
                                { text: 'ID001',  fontSize: 10, margin:[5,5,5,5]},
                                { text: '', fontSize: 10, margin:[5,5,5,5]},
                                { text: 'Sin observaciones', fontSize: 10, margin:[5,5,5,5] },
                              ],
                              [
                                { text: 'Equipo A',fontSize: 10, margin:[5,5,5,5]  },
                                { text: '1',fontSize: 10, margin:[5,5,5,5]  },
                                { text: 'ID001', fontSize: 10, margin:[5,5,5,5] },
                                { text: '',fontSize: 10, margin:[5,5,5,5] },
                                { text: 'Sin observaciones', fontSize: 10, margin:[5,5,5,5] },
                              ],
                              [
                                { text: 'Equipo A', fontSize: 10, margin:[5,5,5,5] },
                                { text: '1', fontSize: 10, margin:[5,5,5,5] },
                                { text: 'ID001', fontSize: 10, margin:[5,5,5,5] },
                                { text: '',fontSize: 10, margin:[5,5,5,5] },
                                { text: 'Sin observaciones',  fontSize: 10, margin:[5,5,5,5]},
                              ],
                            ],
                          },
                          layout: {
                            hLineWidth: () => 0.5, // Líneas horizontales más delgadas
                            vLineWidth: () => 0.5, // Líneas verticales más delgadas
                            hLineColor: () => 'black', // Color de las líneas horizontales
                            vLineColor: () => 'black', // Color de las líneas verticales
                            paddingLeft: () => 5, // Separar texto del borde izquierdo
                            paddingRight: () => 5, // Separar texto del borde derecho
                            paddingTop: () => 5, // Separar texto del borde superior
                            paddingBottom: () => 5, // Separar texto del borde inferior
                          },
                          margin: [10, 10, 10, 10], // Separar la tabla de los bordes
                          border: [1, 0, 1, 0],
                        },
                      ],
                      // Continúa el texto después de la tabla
                      [
                        {
                          text: `Misma que es necesaria para realizar mis actividades y funciones como inspector acreditado en la norma: _______________.
    así mismo; declaro que recibí de conformidad dicho equipo, asumiendo a partir de esta fecha la responsabilidad sobre el uso y manejo de la mismo, comprometiéndome a su buen manejo y/o uso, cuidando que cada uno de ellos; e informar cualquier incidente a las instancias correspondientes de forma inmediata.`,
                          border: [1, 0, 1, 0],
                          alignment: 'justify',
                          fontSize: 10,
                          margin: [0,0,0,30]
                        },
                      ],
                      [{
                        margin: [0,10,0,10],
                        text: 'Zacatecas Zac. a ________ de ____________________ de 2025.',
                        border: [1, 0, 1, 0],
                        alignment: 'right',
                        fontSize: 10
                      }],
                      [{
                        text: 'Recibí                                                                                                              Entregó\nNombre y Firma______________________________________                  Nombre y Firma__________________________',
                        border: [1, 0, 1, 0],
                        fontSize: 10,
                        margin: [0,5,0,20]
                      }],
                      [{
                        text: '----------------------------------------------------------------------------------------',
                        border: [1, 0, 1, 0],
                        fontSize: 15,
                        margin: [0,5,0,5],
                        alignment: 'center',
                      }],
                      [{
                        text: 'Pagaré Simple',
                        border: [1, 0, 1, 0],
                        alignment: 'center',
                        fontSize: 10,
                        bold: true,
                        margin: [0,5,0,5]
                      }],
                      [{
                        text: 'Debo y Pagaré incondicionalmente por el presente PAGARÉ a “SERVICIOS DE VERIFICACIÓN SALIÁ Y SUÁREZ S.A. DE C.V.”, en esta ciudad de Zacatecas Zac., el día: __________________________________________ , la cantidad de $_____________________. (___________________________________________________________________________) Valor recibido a mi entera conformidad. Obligándome a pagar para el caso de mora un interés equivalente al ____ mensual durante todo el tiempo que permanezca insoluto, juntamente con el principal.',
                        border: [1, 0, 1, 0],
                        alignment: 'justify',
                        fontSize: 10,
                        margin: [0,5,0,5]
                      }],
                      [{
                        margin: [0, 15, 0, 120],
                        border: [1, 0, 1, 1],
                        columns: [
                          {
                            text: 'Datos del Deudor:\nNombre:_____________________________________________\nDomicilio:___________________________________________\nTeléfono: ___________________________________________\nFecha:______________________________________________',
                            fontSize: 10,
                            margin: [0,5,0,5]
                          },
                          {
                            table: {
                              widths: ['*'], // Columnas para la tabla
                              body: [
                                [{
                                  text: 'Acepto:\n\n\n',
                                  fontSize: 10,
                                  alignment: 'center',
                                  border: [1, 1, 1, 0],
                                  font: 'Roboto'
                                }],
                                [{
                                  text: 'Firma _______________________',
                                  fontSize: 10,
                                  alignment: 'center',
                                  border: [1, 0, 1, 1],
                                  margin: [0,5,0,5],
                                  font: 'Roboto'
                                }]
                              ]
                            },
                            layout: {
                              hLineWidth: () => 0.5, // Grosor de las líneas horizontales
                              vLineWidth: () => 0.5, // Grosor de las líneas verticales
                              hLineColor: () => 'black', // Color de las líneas horizontales
                              vLineColor: () => 'black', // Color de las líneas verticales

                            },
                            margin: [20, 10, 10, 0]
                          }
                        ]
                      }]
                    ],
                  },
                  layout: {
                    hLineWidth: () => 0.5, // Grosor de las líneas horizontales
                    vLineWidth: () => 0.5, // Grosor de las líneas verticales
                    hLineColor: () => 'black', // Color de las líneas horizontales
                    vLineColor: () => 'black', // Color de las líneas verticales
                  },
                  margin: [0, 0, 0, 0], // Separar el marco de la tabla del borde del documento
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0, // Sin líneas horizontales exteriores
            vLineWidth: () => 0, // Sin líneas verticales exteriores
          }
        },
      ],
      footer: [
        {
          table: {
            widths: ['*'], // Columnas para la tabla
            body: [
              [{
                text: 'FOLIO',
                fontSize: 10,
                alignment: 'center',
                bold: true,
                border: [1, 1, 1, 1]
              }]
            ]
          },
          layout: {
            hLineWidth: () => 0.5, // Grosor de las líneas horizontales
            vLineWidth: () => 0.5, // Grosor de las líneas verticales
            hLineColor: () => 'black', // Color de las líneas horizontales
            vLineColor: () => 'black', // Color de las líneas verticales
          },
          margin: [470, 2, 50, 20],
        }
      ]
    };

    return pdfMake.createPdf(dd).open();
  }
}
