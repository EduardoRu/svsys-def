import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerarValeEquipopoService {

  constructor() { }

  async generarJSON() {
    return {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20], // Márgenes generales
      content: [
        {
          table: {
            widths: ['*'], // Una única columna que ocupa todo el ancho
            body: [
              [
                {
                  table: {
                    widths: ['*'], // Una columna para el contenido interno
                    body: [
                      [
                        {
                          text: `VALE DE USO DE EQUIPO\n
    Yo, ___________________________________________ recibo de la empresa “SERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V. UVIM 129, en el domicilio en c. Isabelica Núm. 132 col. Rinconada la Isabélica en Zacatecas Zac., la documentación que a continuación se detalla:\n\n`,
                          margin: [10, 10, 10, 10],
                        },
                      ],
                      // Aquí empieza la tabla para "DESCRIPCIÓN DE EQUIPO"
                      [
                        {
                          table: {
                            widths: ['*', '*', '*', '*'], // Columnas para la tabla
                            body: [
                              [
                                { text: 'DESCRIPCIÓN DE EQUIPO', bold: true },
                                { text: 'CANTIDAD', bold: true },
                                { text: 'IDENTIFICACIÓN', bold: true },
                                { text: 'OBSERVACIONES', bold: true },
                              ],
                              [
                                { text: 'Equipo A', margin: [5, 5, 5, 5] },
                                { text: '1', margin: [5, 5, 5, 5] },
                                { text: 'ID001', margin: [5, 5, 5, 5] },
                                { text: 'Sin observaciones', margin: [5, 5, 5, 5] },
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
                        },
                      ],
                      // Continúa el texto después de la tabla
                      [
                        {
                          text: `\nMisma que es necesaria para realizar mis actividades y funciones como inspector acreditado en la norma: _______________.
    Asimismo, declaro que recibí de conformidad dicho equipo, asumiendo a partir de esta fecha la responsabilidad sobre el uso y manejo de la mismo, comprometiéndome a su buen manejo y/o uso, cuidando que cada uno de ellos; e informar cualquier incidente a las instancias correspondientes de forma inmediata.\n\n
    Zacatecas Zac. a ________ de ____________________ de 2016.\n\n
    Recibí                                                                          Entregó\nNombre y Firma_____________________________  Nombre y Firma_________________________\n
    --------------------------------------------------------------------------------------------------------------------------------------------------------\n
    Pagaré Simple\n\n
    Debo y Pagaré incondicionalmente por el presente PAGARÉ a “SERVICIOS DE VERIFICACIÓN SALIÁ Y SUÁREZ S.A. DE C.V.”, en esta ciudad de Zacatecas Zac., el día: __________________________________________ , la cantidad de $_____________________. (___________________________________________________________________________) Valor recibido a mi entera conformidad. Obligándome a pagar para el caso de mora un interés equivalente al ____ mensual durante todo el tiempo que permanezca insoluto, juntamente con el principal.\n\n
    Datos del Deudor:\nNombre:____________________________________________\nDomicilio:___________________________________________\nTeléfono: ___________________________________________\nFecha:______________________________________________\n\n
    Acepto:\nFirma____________________`,
                          margin: [10, 10, 10, 10],
                        },
                      ],
                    ],
                  },
                  layout: {
                    hLineWidth: () => 0.5, // Grosor de las líneas horizontales
                    vLineWidth: () => 0.5, // Grosor de las líneas verticales
                    hLineColor: () => 'black', // Color de las líneas horizontales
                    vLineColor: () => 'black', // Color de las líneas verticales
                  },
                  margin: [10, 10, 10, 10], // Separar el marco de la tabla del borde del documento
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0, // Sin líneas horizontales exteriores
            vLineWidth: () => 0, // Sin líneas verticales exteriores
          },
        },
      ],
    };
    
  }
}
