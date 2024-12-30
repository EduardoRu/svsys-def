import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Geolocation } from '@capacitor/geolocation';
import proj4 from 'proj4';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import * as QRCode from 'qrcode';
import { ModalController } from '@ionic/angular';
import { QrModalComponent } from 'src/app/qr-modal/qr-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GenerarDictamenService {

  constructor(
    private storage: Storage,
    private modalController: ModalController
  ) { }

  async obtenerUbicacion() {
    try {
      // Definir el sistema de referencia UTM (Ejemplo: WGS84 zona 13N)
      const utmZone13N = "+proj=utm +zone=13 +datum=WGS84 +units=m +no_defs";

      // Función para convertir latitud/longitud a UTM con redondeo
      const latLongToUtm = (lat: number, long: number) => {
        const utmCoords = proj4(proj4.WGS84, utmZone13N, [long, lat]);
        return {
          easting: Math.round(utmCoords[0]), // Coordenada Este redondeada
          northing: Math.round(utmCoords[1]), // Coordenada Norte redondeada
        };
      };

      // Obtener la ubicación actual
      const position = await Geolocation.getCurrentPosition();

      /*
      console.log("Latitud y Longitud actuales:", {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
      });
      */

      // Convertir latitud y longitud a UTM con redondeo
      const utmCoords = latLongToUtm(position.coords.latitude, position.coords.longitude);

      //console.log("Coordenadas UTM (redondeadas):", utmCoords);

      // Retornar los datos en caso de que necesites usarlos más adelante
      return utmCoords
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      throw error; // Lanza el error para manejarlo donde se llame esta función
    }
  }

  async uploadPDF(blob: Blob, fileName: string): Promise<string> {
      try {
        // Crear una referencia al archivo en Firebase Storage
        const fileRef = ref(this.storage, `pdfs/${fileName}`);
  
        // Subir el archivo a Firebase Storage
        console.log('Subiendo archivo a Firebase Storage...');
        await uploadBytes(fileRef, blob);
  
        // Obtener la URL pública del archivo subido
        const downloadUrl = await getDownloadURL(fileRef);
        console.log('Archivo subido exitosamente. URL:', downloadUrl);
  
        // Generar el código QR con la URL de descarga
        const qrCode = await QRCode.toDataURL(downloadUrl);
        console.log('Código QR generado exitosamente.');
  
        // Retornar el código QR en formato base64
        return qrCode;
      } catch (error) {
        console.error('Error al subir el archivo o generar el código QR:', error);
        throw error;
      }
  }

  async presentQrModal(qrCodeUrl: string) {
    const modal = await this.modalController.create({
      component: QrModalComponent,
      cssClass: 'modalQrCss',
      componentProps: { qrCodeUrl },
    });
    await modal.present();
  }

  async generarReporte(
    infoCliente: any,
    infoPago: any,
    infoVisuales: any,
    encuesta: any,
    infoBasculas: any,
    estudioMtro: any,
    infoResumen: any
  ) {

    var estudioMtroDatos: any = [];

    for (let i = 0; i < estudioMtro.ejemplo1.length; i++) {
      const element = estudioMtro.ejemplo1[i];

      const auxDatos =
        [
          { text: i + 1, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].carga, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].emt, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].errASC, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].errDSC, fontSize: 8, alignment: 'center' },
          {},
          {},
          {},
          {},
          { text: estudioMtro.ejemplo1[i].den50, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].den100, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].num50, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].num100, fontSize: 8, alignment: 'center' },
          { text: estudioMtro.ejemplo1[i].emt13, fontSize: 8, alignment: 'center' },
        ]

      estudioMtroDatos.push(auxDatos);
    }

    if (
          infoCliente && infoPago && infoVisuales && encuesta
        ) {
          this.obtenerUbicacion().then((res: any) => {
            var dd = {
              pageOrientation: 'landscape',
              content: [
    
                {
    
                  columns: [
                    {
                      text: 'logo',
                      width: '10%'
                    },
                    {
                      width: '15%',
                      table: {
                        body: [
                          [
                            { text: 'FOLIO', bold: true, fillColor: '#eeeeee' },
                            { text: '12345' }
                          ],
                        ],
                      }
                    },
                    {
                      width: '*',
                      table: {
                        style: 'tableInformacionEmpresarial',
                        widths: ['*'],
                        body: [
                          [{
                            text: 'SOLICITUD DE SERVICIO DE INSPECCIÓN DE BÁSCULAS \n SERVICIOS DE VERIFICAICIÓN SALIÁ Y SUÁREZ S.A DE C.V \n Av. Isabelica No.132 Col. Rinconada la Isabelica C.P 98099\n e-mail: contacto_svsys@yahoo.com.mx Tel 01(492)154-46-97',
                            alignment: 'center',
                            fillColor: '#eeeeee'
                          }]
                        ]
                      }
                    }
                  ],
                },
                {
                  text: '\n NOM-010-SCFI-1994 INSTRUMENTOS DE MEDICIÓN-INSTRUMENTOS PARA PESAR DE FUNCIONAMIENTO NO AUTOMÁTICO REQUISITOS TÉCNICOS Y METROLÓGICOS ',
                  fontSize: 7,
                  alignment: 'center',
                  bold: true
                },
                {
                  text: 'CONFORME A LO DISPUESTO EN LA LEY DE INFRAESTRUCTURA DE LA CALIDAD VIGENTE DEFINE REFERENTE A LA INSPECCIÓN QUE ES LA CONSTATACIÓN OCULAR O COMPROBACIÓN MEDIANTE MUESTREO, MEDICIÓN, PRUEBAS DE LABORATORIO OEXAMEN DE DOCUMENTOS QUE SE REALIZAPOR LAS UNIDADES DE INSPECCIÓN PARA EVALUAR LA CONFORMIDAD EN UN MOMENTO DETERMINADO APETICIÓN DEPARTE INTERESADA, INSPECCIONAR EL CUMPLIMIENTO DE NORMAS OFICIALES MEXICANAS, SOLAMENTE EN AQUELLOS CAMPOS O ACTIVIDADES PARALAS QUE HUBIEREN SIDO APROBADAS POR LAS DEPENDENCIAS COMPETENTES, ME PERMITO SOLICITAR A SERVICIOS DE VERIFICACIÓN SALIAY SUAREZ, S.A.DEC.V.CONNUMERO DE ACREDITACION EMAUVIM 129 EL SERVICIO DE INSPECCIÓN MANIFESTANDO LO SIGUIENTE:',
                  fontSize: 7,
                  alignment: 'justify'
                },
                {
                  text: 'DATOS DEL SOLICITANTE',
                  fontSize: 11,
                  bold: true,
                  alignment: 'center',
                  margin: [0, 5, 0, 0]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '75%',
                      text: 'Razón Social y/o nombre: ' + infoCliente.nombre_razon_social,
                      fontSize: 10,
                      bold: true
                    },
                    {
                      wdith: '*',
                      text: 'R.F.C: ' + infoCliente.rfc,
                      fontSize: 10,
                      bold: true
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '40%',
                      text: 'Domicilio: ' + infoCliente.domicilio,
                      fontSize: 10,
                      bold: true
                    },
                    {
                      width: '10%',
                      text: 'Num. ' + infoCliente.num_dom,
                      fontSize: 10,
                      bold: true
                    },
                    {
                      width: '20%',
                      text: 'Col.' + infoCliente.colonia,
                      fontSize: 10,
                      bold: true
                    },
                    {
                      width: '30%',
                      text: 'Loc. ' + infoCliente.estado,
                      fontSize: 10,
                      bold: true
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '30%',
                      fontSize: 10,
                      text: 'Municipio: ' + infoCliente.municipio,
                      bold: true
                    },
                    {
                      width: '30%',
                      fontSize: 10,
                      text: 'Edo. ' + infoCliente.estado,
                      bold: true
                    },
                    {
                      width: '10%',
                      fontSize: 10,
                      text: 'C.P. ' + infoCliente.cp,
                      bold: true
                    },
                    {
                      width: '15%',
                      fontSize: 10,
                      text: 'Giro: ' + infoCliente.giro_empresarial,
                      bold: true
                    },
                    {
                      width: '15%',
                      fontSize: 10,
                      text: 'Tel: ' + infoCliente.telefono,
                      bold: true
                    }
                  ]
                },
                {
                  margin: [0, 10, 0, 0],
                  columns: [
                    {
                      width: '40%',
                      margin: [0, 0, 5, 0],
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [{ text: 'Fecha de', alignment: 'center', colSpan: 2, fontSize: 10, bold: true }, {}],
                          [
                            {
                              fontSize: 10,
                              text: 'Compromiso: ' + infoBasculas.compromiso
                            },
                            {
                              fontSize: 10,
                              text: 'Inspección: ' + infoBasculas.inspeccion
                            }
                          ]
                        ]
                      }
                    },
                    {
                      width: '40%',
                      margin: [0, 0, 5, 0],
                      table: {
                        widths: ['*', '*', '*'],
                        body: [
                          [{ text: 'Tipo de inspección', alignment: 'center', colSpan: 3, fontSize: 10, bold: true }, {}, {}],
                          [
                            {
                              fontSize: 10,
                              text: 'Inicial',
                              alignment: 'center',
                              bold: true
                            },
                            {
                              fontSize: 10,
                              text: 'Periódica',
                              alignment: 'center'
                            },
                            {
                              fontSize: 10,
                              text: 'Extraordinaria',
                              alignment: 'center'
                            }
                          ]
                        ]
                      }
                    },
                    {
                      width: '20%',
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [{ text: 'Semestre', alignment: 'center', colSpan: 2, fontSize: 10, bold: true }, {}],
                          [
                            {
                              fontSize: 10,
                              text: 'Primero',
                              alignment: 'center',
                              bold: true
                            },
                            {
                              fontSize: 10,
                              text: 'Segundo',
                              alignment: 'center'
                            }
                          ]
                        ],
                      }
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*'],
                    body: [
                      [{
                        text: 'SOLICITUD',
                        colSpan: 7,
                        alignment: 'center',
                        bold: true
                      },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {}
                      ],
                      [
                        {
                          text: 'MARCA',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 23]
                        }, {
                          text: 'MODELO',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 23]
                        }, {
                          text: 'No. SERIE',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 23]
                        }, {
                          text: 'DIVISIÓN \n MÍNIMA (g)',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 18]
                        }, {
                          text: 'ALCANCE MÁXIMO\nDE MEDICIÓN (kg)',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 18]
                        }, {
                          text: 'CLASE DE \n EXACTITUD',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 18]
                        }, {
                          text: 'TIPO DE INSTRUMENTO\n(M) MECÁNICO\n(E)ELECTRÓNICO\n(H)HIBRIDO',
                          bold: true,
                          alignment: 'center',
                          fontSize: 10,
                          margin: [0, 20]
                        }
                      ],
                      [
                        {
                          text: '1' + infoBasculas.basculas[0].marca
                        }, {
                          text: infoBasculas.basculas[0].modelo
                        }, {
                          text: infoBasculas.basculas[0].no_serie
                        }, {
                          text: infoBasculas.basculas[0].divi_max
                        }, {
                          text: infoBasculas.basculas[0].alcance_max
                        }, {
                          text: infoBasculas.basculas[0].clase
                        }, {
                          text: infoBasculas.basculas[0].tipo_bascula
                        } // SUJETO A CAMBIOS
                      ],
                      [
                        {
                          text: '2'
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        } // SUJETO A CAMBIOS
                      ],
                      [
                        {
                          text: '3'
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        } // SUJETO A CAMBIOS
                      ],
                      [
                        {
                          text: '',
                          colSpan: 5,
                          border: [0, 0, 0, 0]
                        }, {
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
                          text: 'DESCRIPCIÓN',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }, {
                          text: 'CENTRO UNITARIO',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }
                      ],
                      [
                        {
                          text: '',
                          colSpan: 5,
                          border: [0, 0, 0, 0]
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
                          text: '0-99 kg',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }, {
                          text: '$' + infoPago.importe + '.00',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }
                      ],
                      [
                        {
                          text: '',
                          colSpan: 5,
                          border: [0, 0, 0, 0]
                        }, {
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
                          text: 'De 100 a 200 kg',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }, {
                          text: '$' + infoPago.importe2 + '.00',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }
                      ],
                      [
                        {
                          text: '',
                          colSpan: 5,
                          border: [0, 0, 0, 0]
                        }, {
                        }, {
    
                        }, {
    
                        }, {
    
                        }, {
                          text: 'MAYOR DE 200 kg SEGÚN COTIZACIÓN',
                          fontSize: 10,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }, {
                          text: '',
                          fontSize: 8,
                          alignment: 'center',
                          bold: true,
                          fillColor: '#eeeeee'
                        }
                      ]
                    ]
                  }
                },
                {
                  text: 'SE DECLARA AL CLIENTE QUE LA INFORMACIÓN OBTENIDA DURANTE LA INSPECCIÓN SERÁ ENTREGADA A LA PROFECO, DGN, EMA DEBIDO A LAS REGLAS ESTABLECIDAS EN LA LISTA DE INSTRUMENTOS VIGENTE, LA DEMÁS INFORMACIÓN SE TRATARÁ DE MANERA CONFIDENCIAL, Y SI POR LEY SE DEBA DIVULGAR INFORMACIÓN CONFIDENCIAL SE NOTIFICARÁ MEDIANTE EL \"AVISO DE DIVULGACIÓN DE INFORMACIÓN CONFIDENCIAL\" DCN-F-67. SERVICIO DE VERIFICACIÓN SALIA Y SUAREZ, S.A. DE CV. SE COMPROMETE A MANTENER LA CONFIDENCIALIDAD, SALVAGUARDAR TODA LA INFORMACION Y DOCUMENTACION QUE LE ES PROPORCIONADA Y/O PRESENTADA POR SUS CLIENTES EL DICTAMEN DE INSPECCIÓN CERTIFICA QUE LAS PRUEBAS EFECTUADAS CON LOS INSTRUMENTOS DESCRITOS SE EFECTUARON DE ACUERDO CON LA NORMA NOM-010-SCFI-1994 \"INSTRUMENTOS DE MEDICION-INSTRUMENTOS PARA PESAR DE FUNCIONAMIENTO NO AUTOMATICO-REQUISITOS TECNICOS Y METROLOGICOS\". ATENCIÓN A QUEJAS Y SUGERENCIAS TEL. 492 156 4697, contacto_svsys@yahoo.com.mx.',
                  fontSize: 6,
                  margin: [0, 3],
                  alignment: 'justify'
                },
                {
                  alignment: 'center',
                  columns: [
    
                    {
                      text: '___________________________________________________\n NOMBRE Y FIRMA DEL SOLICITANTE',
                      fontSize: 9
                    },
                    {
                      text: '___________________________________________________ \n NOMBRE Y FIRMA DEL INSPECTOR',
                      fontSize: 9
                    }
                  ],
    
                },
                {
                  text: 'CLÁUSULAS',
                  alignment: 'center',
    
                },
                {
                  text: `
                          
                          1.- Esta solicitud es intransferible: los datos asentados son proporcionados por el solicitante y/o su representante legal, por lo que está de acuerdo que en caso en que algún dato resulte inexacto o falso, no se le dará trámite ni se le prestará el servicio de inspección quedando sin efectos y a favor de esta unidad de inspección el pago que se haya efectuado.
                          
                          2.- Únicamente se inspeccionarán los instrumentos relacionados en esta solicitud, en estricto apego a las disposiciones establecidas en la Norma oficial mexicana NOM-010- SCFI-1994 publicada en el diario oficial de la federación el 9 de junio de 1999.
                          
                          3.- Los instrumentos de medición, se inspeccionarán en el domicilio asentado en la presente solicitud.
                          
                          4.- En apego a las disposiciones contenidas en la norma oficial mexicana NOM-010-SCFI-1994 publicada en el diario oficial de la federación el 9 de junio de 1999 y la normatividad establecida por la Secretaría de Comercio y Fomento Industrial en la lista de instrumentos de medición cuya inspección será obligatoria, el solicitante manifiesta sujetarse voluntariamente a dichos ordenamientos jurídicos, obligándose a permitir lo siguiente:
                              Cuando del resultado de la inspección, se determine que algún (os) instrumento (s) de medición, no satisfacen los requisitos establecidos en la norma oficial mexicana NOM-010-SCFI-1994, el inspector procederá a colocar una calcomanía de "INSTRUMENTO NO APTO PARA TRANSACCIONES COMERCIALES" DCN-F-60 y se le entrega al cliente la "Solicitud de Servicio de Inspección de Básculas" DCN-F-01 y "Dictamen de Servicio de Inspección de Básculas" DCN-F-65. Este no podrá utilizar el equipo para fines de transacciones comerciales si no ha sido ajustado y/o reparado e inspeccionado nuevamente.
                          
                          5.- La condición de instrumento inspeccionado se pierde por las siguientes causas:
                              a) Ruptura, remoción, violación, o cualquier forma de inutilización de la calcomanía aún por caso fortuito o por reparación del instrumento inspeccionado.
                              b) Alteración por cualquier medio de los mecanismos de medición del sistema, siempre que produzca como resultado que el sistema para medición se desajuste.
                          
                          6.- Requisitos del solicitante del servicio de inspección:________________________________________________________________
                          
                              NOTA: SERVICIOS DE VERIFICACIÓN SALIA Y SUAREZ S.A. DE C.V. se compromete a mantener la confidencialidad y a salvaguardar toda la información y documentación que le es proporcionada y prestada por sus clientes.
                          `,
                  alignment: 'justify',
                  pageBreak: 'after'
                },
                {
                  style: 'tableInspeccionVisual',
                  table: {
                    widths: ['*', 20, '*', 20],
                    body: [
                      // Primera fila que abarca las cuatro columnas
                      [{ text: 'INSPECCIÓN VISUAL', colSpan: 4, alignment: 'center', fontSize: 13 }, {}, {}, {}],
                      [{ text: 'INSPECCIONAR QUE EL INSTRUMENTO DE MEDICIÓN CUMPLA CON LAS CARACTERÍSTICAS QUE LE APLIQUEN DE LA SIGUIENTE LISTA Y REGISTRAR EL CUMPLIMIENTO (C), NO CUMPLIMIENTO (NC) O NO APLICA (NA)', colSpan: 4, alignment: 'center', fontSize: 10 }, {}, {}, {}],
    
                      [{ text: 'El aspecto general del instrumento debe estar en buenas condiciones y no tener piezas sueltas.', fontSize: 9 }, {
                        text: infoVisuales.IV1
                      }, { text: 'El estado de la escala debe ser aceptable, entendiendo que no presente ralladuras ni deformaciones que afecten la claridad en la toma de lecturas.', fontSize: 9 }, {
                        text: infoVisuales.IV2
                      }],
                      [{ text: 'Se debe inspeccionar que el tornillo que sostiene las piezas para nivelar el dispositivo esté fijo y que las piezas no puedan retirarse fácilmente.', fontSize: 9 }, {
                        text: infoVisuales.IV3
                      }, { text: 'El equipo auxiliar, si existe, debe ser aceptable. Los caucharones y contrapesos no deben tener golpes o deformaciones.', fontSize: 9 }, {
                        text: infoVisuales.IV4
                      }],
                      [{ text: 'Debe comprobarse la masa real de los contrapesos y conocer la relación del instrumento para validar la masa.', fontSize: 9 }, {
                        text: infoVisuales.IV5
                      }, { text: 'Inspeccionar que las graduaciones de los dispositivos estén en unidades del Sistema General de Unidades de Medida, conforme a la NOM-008-SCFI.', fontSize: 9 }, {
                        text: infoVisuales.IV6
                      }],
                      [{ text: 'Inspeccionar las indicaciones obligatorias y posiciones para marcas de inspección y control.', fontSize: 9 }, {
                        text: infoVisuales.IV7
                      }, { text: 'Las graduaciones deben estar grabadas en ambas caras de los dispositivos indicadores.', fontSize: 9 }, {
                        text: infoVisuales.IV8
                      }],
                      [{ text: 'Inspeccionar que las condiciones de uso del instrumento sean apropiadas.', fontSize: 9 }, {
                        text: infoVisuales.IV9
                      }, { text: 'Todas las barras graduadas deben tener un remache en sus extremos para evitar que el pilón corredizo se quite.', fontSize: 9 }, {
                        text: infoVisuales.IV10
                      }],
                      [{ text: 'El ajuste de cero debe ser aceptable, con una desviación no mayor a 0,25e.', fontSize: 9 }, {
                        text: infoVisuales.IV11
                      }, { text: 'Instrumentos con múltiples receptores deben tener grabadas las marcas de identificación, alcance mínimo, y división de inspección.', fontSize: 9 }, {
                        text: infoVisuales.IV12
                      }],
                      [{ text: 'Instrumentos que usan energía eléctrica deben estar conectados y encendidos durante las pruebas.', fontSize: 9 }, {
                        text: infoVisuales.IV13
                      }, { text: 'Inspeccionar el correcto funcionamiento de los dispositivos de ajuste a cero, tara, y dispositivos de cálculo.', fontSize: 9 }, {
                        text: infoVisuales.IV13
                      }]
                    ]
                  }
                },
    
                {
                  style: 'tableInspeccionMtro',
                  table: {
                    widths: [23, 46, 46, 46, 46, 46, 46, 46, 55, 40, 40, 40, 40, 76],
                    body: [
                      [{ text: 'INSPECCIÓN DE PROPIEDADES METROLÓGICAS', colSpan: 14, alignment: 'center', bold: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        { text: 'Equipo No.', fontSize: 8, alignment: 'center' },
                        { text: 'Alcance máximo', colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: 'División mínima', colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: 'Clase de exactitud', colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: 'Precarga 100% de MÁX', colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: 'REPETIBILIDAD', colSpan: 4, fontSize: 10.5, alignment: 'center' }, {}, {}, {},
                        { text: 'EXCENTRICIDAD', fontSize: 10, alignment: 'center' }
                      ],
                      [
                        { text: '1', fontSize: 10.5, alignment: 'center' },
                        { text: estudioMtro.alc_max + ' kg', colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: [estudioMtro.divi_max + 'g'], colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: estudioMtro.clase_ex, colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: [estudioMtro.precarga + 'kg'], colSpan: 2, fontSize: 10.5, alignment: 'center' }, {},
                        { text: ['50% DE MÁX\n' + estudioMtro.infoRepetibilidad[0].rep50num], fontSize: 6, alignment: 'center' },
                        { text: ['100% DE MÁX\n' + estudioMtro.infoRepetibilidad[0].rep100num], fontSize: 6, alignment: 'center' },
                        { text: ['50% DE MÁX\n' + estudioMtro.infoRepetibilidad[0].rep50den], fontSize: 6, alignment: 'center' },
                        { text: ['50% DE MÁ\n' + estudioMtro.infoRepetibilidad[0].rep100den], fontSize: 6, alignment: 'center' },
                        { text: ['1/3 DE MÁX \n' + estudioMtro.infoRepetibilidad[0].rep13den], fontSize: 7, alignment: 'center' }
                      ],
                      [
                        { text: 'EXACTITUD', fontSize: 10.5, colSpan: 9, alignment: 'center' },
                        {}, {},
                        {}, {},
                        {}, {},
                        {}, {},
                        { text: 'Diferencia\n' + estudioMtro.infoRepetibilidad[0].diferenciaUno, fontSize: 8, alignment: 'center' },
                        { text: 'Diferencia\n' + estudioMtro.infoRepetibilidad[0].diferenciaDos, fontSize: 8, alignment: 'center' },
                        { text: 'Diferencia\n' + estudioMtro.infoRepetibilidad[0].diferenciaTres, fontSize: 8, alignment: 'center' },
                        { text: 'Diferencia\n' + estudioMtro.infoRepetibilidad[0].diferenciaCuatro, fontSize: 8, alignment: 'center' },
                        { text: 'EMT\n' + estudioMtro.infoRepetibilidad[0].emt13den, fontSize: 10, alignment: 'center' }
                      ],
                      [
                        {},
                        { text: 'CARGA(kg)', fontSize: 6, alignment: 'center' },
                        { text: 'EMT (g)', fontSize: 6, alignment: 'center' },
                        { text: 'ERROR +/- (g) ASC', fontSize: 6, alignment: 'center' },
                        { text: 'ERROR +/- (g) DESC', fontSize: 6, alignment: 'center' },
                        { text: 'CARGA(kg)', fontSize: 6, alignment: 'center' },
                        { text: 'EMT (g)', fontSize: 6, alignment: 'center' },
                        { text: 'ERROR +/- (g) ASC', fontSize: 6, alignment: 'center' },
                        { text: 'EMT (g)', fontSize: 6, alignment: 'center' },
                        { text: 'Error +/- (g)', fontSize: 7, alignment: 'center' },
                        { text: 'Error +/- (g)', fontSize: 7, alignment: 'center' },
                        { text: 'Error +/- (g)', fontSize: 7, alignment: 'center' },
                        { text: 'Error +/- (g)', fontSize: 7, alignment: 'center' },
                        { text: 'Error +/- (g)', fontSize: 7, alignment: 'center' }
                      ],
                      estudioMtroDatos[0]
                      ,
                      estudioMtroDatos[1]
                      ,
                      estudioMtroDatos[2]
                      ,
                      estudioMtroDatos[3]
                      ,
                      estudioMtroDatos[4]
                      ,
                      estudioMtroDatos[5]
                      ,
                      estudioMtroDatos[6]
                      ,
                      estudioMtroDatos[7]
                      ,
                      estudioMtroDatos[8]
                      ,
                      estudioMtroDatos[9]
                      ,
                      [
                        { text: 'Las cargas de pruebas seleccionadas deben incluir [Máx] y [Mín], y valores cercanos a puntos en los cuales cambian los errores máximos tolerados [EMT]. Para facilitar considere el utilizar lo menos posible pesas fraccionarias y así evitar el apilamiento de pesas pequeñas aunque no coincidan aritméticamente el porcentaje.', fontSize: 8, colSpan: 9 },
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        { text: 'El instrumento deberá regresar a su posición de cero entre cada pesada. En el caso de una deviación a cero entre pesadas, el instrumento debe ser ajustado a cero', fontSize: 8, colSpan: 5 },
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
                      text: 'OBSERVACIONES DEL INSPECTOR:' + estudioMtro.observaciones, fontSize: 6
                    },
                    {
                      text: 'CUMPLE CON LA NORMA NOM-010-SCFI-1994 CUMPLE (C) NO CUMPLE (NC)', fontSize: 6, width: 220
    
                    },
                    {
                      text: 'C/NC',
                      width: 60,
                      fontSize: 6
                    }
                  ],
                },
                {
    
                  columns: [
                    {
                      text: 'SERVICIOS DE VERIFICAICIÓN SALIÁ Y SUÁREZ S.A DE C.V \n Av. Isabelica No.132 Col. Rinconada la Isabelica C.P 98099\n e-mail: contacto_svsys@yahoo.com.mx Tel 01(492)154-46-97',
                      width: '95%',
                      alignment: 'center',
                      fontSize: 10
                    },
                    {
                      width: '10%',
                      table: {
                        body: [
                          [
                            { text: 'FOLIO', bold: true, fillColor: '#eeeeee' },
                            { text: '12345' }
                          ],
                        ],
                      }
                    },
                    
                  ],
                },
                {
                  width: '*',
                  table: {
                    widths: ['*'],
                    body: [
                      [{
                        text: 'DICTAMEN DE SERVICIO DE INSPECCIÓN DE BÁSCULAS \n NOM-010-SCFI-1994 INSTRUMENTOS DE MEDICION - INSTRUMENTOS PARA PESAR DE FUNCIONAMIENTO NO AUTOMATICO REQUISITOS TECNICOS Y METROLOGICOS',
                        alignment: 'center',
                        fillColor: '#eeeeee',
                        fontSize: 10
                      }]
                    ]
                  }
                },
                {
                  text: 'CONFORME A LO DISPUESTO EN LA LEY DE INFRAESTRUCTURA DE LA CALIDAD VIGENTE DEFINE REFERENTE A LA INSPECCIÓN QUE ES LA CONSTATACIÓN OCULAR O COMPROBACIÓN MEDIANTE MUESTREO, MEDICIÓN, PRUEBAS DE LABORATORIO OEXAMEN DE DOCUMENTOS QUE SE REALIZAPOR LAS UNIDADES DE INSPECCIÓN PARA EVALUAR LA CONFORMIDAD EN UN MOMENTO DETERMINADO APETICIÓN DEPARTE INTERESADA, INSPECCIONAR EL CUMPLIMIENTO DE NORMAS OFICIALES MEXICANAS, SOLAMENTE EN AQUELLOS CAMPOS O ACTIVIDADES PARALAS QUE HUBIEREN SIDO APROBADAS POR LAS DEPENDENCIAS COMPETENTES, ME PERMITO SOLICITAR A SERVICIOS DE VERIFICACIÓN SALIAY SUAREZ, S.A.DEC.V.CONNUMERO DE ACREDITACION EMAUVIM 129 EL SERVICIO DE INSPECCIÓN MANIFESTANDO LO SIGUIENTE:',
                  fontSize: 7,
                  alignment: 'justify',
                  margin: [0, 5, 0, 0]
                },
                {
                  text: 'DATOS DEL SOLICITANTE',
                  fontSize: 11,
                  bold: true,
                  alignment: 'center',
                  margin: [0, 5, 0, 0]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '75%',
                      text: 'Razón Social y/o nombre: ' + infoCliente.nombre_razon_social,
                      fontSize: 10
                    },
                    {
                      wdith: '*',
                      text: 'R.F.C: ' + infoCliente.rfc,
                      fontSize: 10
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '40%',
                      text: 'Domicilio: ' + infoCliente.domicilio,
                      fontSize: 10
                    },
                    {
                      width: '10%',
                      text: 'Num. ' + infoCliente.num_dom,
                      fontSize: 10
                    },
                    {
                      width: '20%',
                      text: 'Col.' + infoCliente.colonia,
                      fontSize: 10
                    },
                    {
                      width: '30%',
                      text: 'Loc.' + infoCliente.estado,
                      fontSize: 10
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '30%',
                      fontSize: 10,
                      text: 'Municipio: ' + infoCliente.municipio
                    },
                    {
                      width: '30%',
                      fontSize: 10,
                      text: 'Edo. ' + infoCliente.estado
                    },
                    {
                      width: '10%',
                      fontSize: 10,
                      text: 'C.P. ' + infoCliente.cp
                    },
                    {
                      width: '15%',
                      fontSize: 10,
                      text: 'Giro: ' + infoCliente.giro_empresarial
                    },
                    {
                      width: '15%',
                      fontSize: 10,
                      text: 'Tel: ' + infoCliente.telefono
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      width: '33%',
                      fontSize: 10,
                      text: 'UTMX: ' + res.easting
                    },
                    {
                      width: '33%',
                      fontSize: 10,
                      text: 'UTMY: ' + res.northing
                    },
                    {
                      width: '33%',
                      fontSize: 10,
                      text: 'ZONA: ' + 10
                    }
                  ]
                },
                {
                  margin: [0, 10, 0, 0],
                  columns: [
                    {
                      width: '30%',
                      margin: [0, 0, 5, 0],
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [{ text: 'FECHA DE', alignment: 'center', colSpan: 2, fontSize: 10, bold: true }, {}],
                          [
                            {
                              fontSize: 8.5,
                              text: 'Compromiso: ' + infoBasculas.compromiso
                            },
                            {
                              fontSize: 9,
                              text: 'Inspección: ' + infoBasculas.inspeccion
                            }
                          ]
                        ]
                      }
                    },
                    {
                      width: '20%',
                      margin: [0, 0, 5, 0],
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [{ text: 'HORARIO', alignment: 'center', colSpan: 2, fontSize: 10, bold: true }, {}],
                          [
                            {
                              fontSize: 10,
                              text: 'Primero',
                              alignment: 'center'
                            },
                            {
                              fontSize: 10,
                              text: 'Segundo',
                              alignment: 'center'
                            }
                          ]
                        ],
                      }
                    },
                    {
                      width: '30%',
                      margin: [0, 0, 5, 0],
                      table: {
                        widths: ['*', '*', '*'],
                        body: [
                          [{ text: 'Tipo de inspección', alignment: 'center', colSpan: 3, fontSize: 10, bold: true }, {}, {}],
                          [
                            {
                              fontSize: 10,
                              text: 'Inicial',
                              alignment: 'center'
                            },
                            {
                              fontSize: 10,
                              text: 'Periódica',
                              alignment: 'center'
                            },
                            {
                              fontSize: 10,
                              text: 'Extraordinaria',
                              alignment: 'center'
                            }
                          ]
                        ]
                      }
                    },
                    {
                      width: '20%',
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [{ text: 'Semestre', alignment: 'center', colSpan: 2, fontSize: 10, bold: true }, {}],
                          [
                            {
                              fontSize: 10,
                              text: 'Primero',
                              alignment: 'center'
                            },
                            {
                              fontSize: 10,
                              text: 'Segundo',
                              alignment: 'center'
                            }
                          ]
                        ],
                      }
                    }
                  ]
                },
                {
                  margin: [0, 5, 0, 0],
                  table: {
                    widths: [
                      '10%',
                      '10%',
                      '10%',
                      '5%',
                      '5%',
                      '6%',
                      '9%',
                      '4.5%',
                      '4.5%',
                      '2%',
                      '2%',
                      '2%',
                      '2%',
                      '2%',
                      '2%',
                      '5%',
                      '5%',
                      '6%',
                      '8%'],
                    body: [
                      [{
                        text: 'SOLICITUD',
                        colSpan: 19,
                        alignment: 'center',
                        bold: true
                      }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        {
                          text: 'MARCA',
                          bold: true,
                          alignment: 'center',
                          fontSize: 8,
                          rowSpan: 4,
                          margin: [0, 60, 0, 50]
                        }, {
                          text: 'MODELO',
                          bold: true,
                          alignment: 'center',
                          fontSize: 8,
                          rowSpan: 4,
                          margin: [0, 60, 0, 50]
                        }, {
                          text: 'No. SERIE',
                          bold: true,
                          alignment: 'center',
                          fontSize: 8,
                          rowSpan: 4,
                          margin: [0, 60, 0, 50]
                        }, {
                          text: 'DIVISIÓN MÍNIMA (g)',
                          bold: true,
                          alignment: 'center',
                          fontSize: 7,
                          rowSpan: 4,
                          margin: [0, 50, 0, 50]
                        }, {
                          text: 'ALCANCE MÁXIMO\nDE MEDICIÓN (kg)',
                          bold: true,
                          alignment: 'center',
                          fontSize: 6.5,
                          rowSpan: 4,
                          margin: [0, 45, 0, 50]
                        }, {
                          text: 'CLASE DE EXACTITUD',
                          bold: true,
                          alignment: 'center',
                          fontSize: 6.5,
                          rowSpan: 4,
                          margin: [0, 55, 0, 50]
                        }, {
                          text:'',
                          border: [false, false, false, false]
                        }, {
                          text: 'INSPECCIÓN VISUAL',
                          fontSize: 7,
                          colSpan: 2,
                          alignment: 'center',
                          bold: true,
                          margin:[0,5,0,0]
                        }, {}, {
                          text: 'INSPECCIÓN DE PROPIEDADES METROLOGICAS',
                          fontSize: 7,
                          colSpan: 6,
                          alignment: 'center',
                          bold: true
                        }, {}, {}, {}, {}, {}, {
                          text: 'DICTAMEN FINAL',
                          fontSize: 7,
                          bold: true,
                          alignment: 'center',
                          colSpan: 2,
                          margin:[0,10,0,0]
                        }, {}, {
                          text: 'FOLIOS',
                          fontSize: 7,
                          bold: true,
                          alignment: 'center',
                          colSpan: 2,
                          margin:[0,10,0,0]
                        }, {}
                      ],
                      [{}, {}, {}, {}, {}, {}, {
                        text: 'TIPO DE INSTRUMENTO\n(M)\n MECÁNICO\n(E)\nELECTRÓNICO\n(H)\nHIBRIDO',
                          bold: true,
                          alignment: 'center',
                          fontSize: 7,
                          rowSpan: 3,
                          border: [false, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text: 'CUMPLE',
                        rowSpan: 2,
                        fontSize: 6,
                        colSpan: 3,
                        alignment: 'center',
                        bold: true
                      }, {}, {}, {
                        text: 'NO CUMPLE',
                        rowSpan: 2,
                        fontSize: 6,
                        colSpan: 3,
                        alignment: 'center',
                        bold: true
                      }, {}, {}, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text: 'PROFECO',
                        rowSpan: 2,
                        fontSize: 8,
                        alignment: 'center',
                        bold: true,
                        margin:[0,5,0,0]
                      }],
                      [{}, {}, {}, {}, {}, {}, {}, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {}, {}, {}, {}, {}, {}, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {
                        text:'',
                        border: [true, false, false, false]
                      }, {}],
                      [{}, {}, {}, {}, {}, {}, {}, {
                        text:'CUMPLE',
                        rowSpan: 1,
                        fontSize: 6,
                        alignment: 'center',
                        bold: true,
                        border: [true, false, false, false],
                        margin: [0,30,0,30]
                      }, {
                        text:'NO CUMPLE',
                        rowSpan: 1,
                        fontSize: 6,
                        alignment: 'center',
                        bold: true,
                        border: [true, false, false, false],
                        margin: [0,25,0,25]
                      }, {
                        text: 'EXACTITUD'.split('').join('\n'),
                        fontSize: 5,
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'REPETIBILIDAD'.split('').join('\n'),
                        fontSize: 5,
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'EXCENTRICIDAD'.split('').join('\n'),
                        fontSize: 5,
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'EXACTITUD'.split('').join('\n'),
                        fontSize: 5,
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'REPETIBILIDAD'.split('').join('\n'),
                        fontSize: 5,
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'EXCENTRICIDAD'.split('').join('\n'),
                        fontSize: 5,
                        alignment: 'center',
                        bold: true
                      }, {
                        text:'CUMPLE',
                        rowSpan: 1,
                        fontSize: 6,
                        alignment: 'center',
                        bold: true,
                        border: [true, false, false, false],
                        margin: [0,30,0,30]
                      }, {
                        text:'NO\nCUMPLE',
                        rowSpan: 1,
                        fontSize: 6,
                        alignment: 'center',
                        bold: true,
                        border: [true, false, false, false],
                        margin: [0,25,0,25]
                      }, {
                        text:'UI',
                        rowSpan: 1,
                        fontSize: 8,
                        alignment: 'center',
                        bold: true,
                        border: [true, false, false, false],
                        margin: [0,30,0,30]
                      }, {
                        text: infoResumen.prdfeco,
                        fontSize: 7,
                        alignment: 'center',
                        bold: true,
                        margin: [0,25,0,25]
                      }],
                      [{
                        text: '1 ' + infoResumen.basculaResumen.modelo,
                        fontSize: 8
                      }, {
                        text:  infoResumen.basculaResumen.marca,
                        fontSize: 8
                      }, {
                        text:  infoResumen.basculaResumen.no_serie,
                        fontSize: 8
                      }, {
                        text:  infoResumen.basculaResumen.divi_max,
                        fontSize: 8
                      }, {
                        text:  infoResumen.basculaResumen.alcance_max,
                        fontSize: 8
                      }, {
                        text:  infoResumen.basculaResumen.clase,
                        fontSize: 8
                      }, {
                        text: infoResumen.basculaResumen.tipo_bascula == 'E' ? 'ELECTRÓNICO': infoResumen.basculaResumen.tipo_bascula == 'M' ? 'MECÁNICO': 'HIBRIDO',
                        fontSize: 8
                        
                      }, {
                        text:  infoResumen.inspeccion_visual == 'Cumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.inspeccion_visual == 'NoCumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.exactitud == 'Cumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.repetibilidad == 'Cumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.exentricidad == 'Cumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.exactitud == 'NoCumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.exactitud == 'NoCumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.exactitud == 'NoCumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.dictamen_final == 'Cumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.dictamen_final == 'NoCumple' ? 'X': null,
                        fontSize: 8
                      }, {
                        text:  infoResumen.ui,
                        fontSize: 8
                        
                      }, {}],
                      [{
                        text: '2',
                        fontSize: 8
                      }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{
                        text: '3',
                        fontSize: 8
                      }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                    ]
                  },
                  layout: {
                    paddingTop: function (i, node) {
                      return i === 0 ? 1 : 2; // Ajusta este valor para los títulos (primera fila)
                    },
                    paddingBottom: function (i, node) {
                      return i === 0 ? 1 : 2; // Ajusta este valor para los títulos (primera fila)
                    },
                    paddingLeft: function (i, node) {
                      return 2; // Espacio izquierdo
                    },
                    paddingRight: function (i, node) {
                      return 2; // Espacio derecho
                    },
                    hLineWidth: function (i, node) {
                      return 1; // Grosor de líneas horizontales
                    },
                    vLineWidth: function (i, node) {
                      return 1; // Grosor de líneas verticales
                    }
                  }
                },
                {
                  pageBreak: 'before',
                  text: 'EQUIPO UTILIZADO, EN LA INSPECCIÓN',
                  alignment: 'center',
                  bold: true,
                  fontSize: 15
                },
                {
                  margin: [0, 5],
                  table: {
                    widths: [
                      '8%',
                      '12%',
                      '5%',
                      '15%',
                      '30%',
                      '20%',
                      '10%'
                    ],
                    body: [
                      [
                        {
                          text: 'EQUIPO UTILIZADO EN LA INSPECCIÓN',
                          colSpan: 4,
                          alignment: 'center',
                          margin: [0, 20]
                        },
                        {},
                        {},
                        {},
                        {
    
                        },
                        {
                          text: 'No. APROBACIÓN MODELO PROTOTIPO DGN:',
                          alignment: 'center',
                          margin: [0, 20]
                        },
                        {
                          fontSize: 10,
                          text: 'ALCANCE DE MEDICIÓN \n BAJO(B) MEDIANO(M)',
                          alignment: 'center',
                          margin: [0, 20]
                        }
                      ],
                      [{
                        text: 'IDENTIFICACIÓN',
                        bold: true,
                        alignment: 'center',
                        colSpan: 4
                      }, {}, {}, {}, {
                        text: 'INFORME DE CALIBRACIÓN',
                        bold: true,
                        alignment: 'center'
                      }, {
                        text: '1'
                      }, {}],
                      [{
                        text: 'M'
                      }, {
                        colSpan: 3,
                        text: ''
                      }, {}, {}, {}, {
                        text: '2'
                      }, {}],
                      [{
                        text: '5kg'
                      }, {
                        text: '',
                        colSpan: 3
                      }, {}, {}, {}, {
                        text: '3'
                      }, {}],
                      [{
                        text: '10Kg'
                      }, {
                        colSpan: 3,
                        text: ''
                      }, {}, {}, {}, {
                        text: 'OBSERVACIONES:',
                        colSpan: 2
                      }, {}],
                      [{
                        text: '20Kg'
                      }, {
                        text: '',
                        colSpan: 3
                      }, {}, {}, {}, {
                        text: '',
                        colSpan: 2
                      }, {}],
                      [{
                        text: 'VEHICULO',
                        fontSize: 10
                      }, {}, {
                        text: 'PLACA',
                        fontSize: 9
                      }, {}, {}, {}, {}],
                    ]
                  }
                },
                {
                  text: 'INFORMAICÓN DE PAGO',
                  alignment: 'center',
                  bold: true,
                  fontSize: 15
                },
                {
                  margin: [0, 5],
                  table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                      [{
                        text: 'RECIBO DE PAGO',
                        fillColor: '#ace2b9',
                        colSpan: 4,
                        alignment: 'center',
                        bold: true
                      }, {}, {}, {}],
                      [{
                        text: 'CANTIDAD',
                        fillColor: '#ace2b9',
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'DESCRIPCIÓN',
                        fillColor: '#ace2b9',
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'COSTO UNITARIO',
                        fillColor: '#ace2b9',
                        alignment: 'center',
                        bold: true
                      }, {
                        text: 'IMPORTE',
                        fillColor: '#ace2b9',
                        alignment: 'center',
                        bold: true
                      }],
                      [{
                        fillColor: '#bbf7cf',
                        text: ''
                      }, {
                        fillColor: '#bbf7cf',
                        text: 'DE 0 A 99 Kg'
                      }, {
                        fillColor: '#bbf7cf',
                        text: '380.00'
                      }, {
                        fillColor: '#bbf7cf',
                        text: ''
                      }],
                      [{
                        fillColor: '#bbf7cf',
                        text: ''
                      }, {
                        fillColor: '#bbf7cf',
                        text: 'DE 100 A 200 Kg'
                      }, {
                        fillColor: '#bbf7cf',
                        text: '480.00'
                      }, {
                        fillColor: '#bbf7cf',
                        text: ''
                      }],
                      [{
                        fillColor: '#bbf7cf',
                        text: ''
                      }, {
                        fillColor: '#bbf7cf',
                        text: 'MAYOR DE 200 Kg SEGÚN COTIZACIÓN'
                      }, {
                        fillColor: '#bbf7cf',
                        text: ''
                      }, {
                        fillColor: '#bbf7cf',
                        text: ''
                      }],
                      [{
                        text: '',
                        border: [0]
                      }, {
                        border: [0],
                        text: ''
                      }, {
                        border: [0],
                        text: ''
                      }, {
                        fillColor: '#bbf7cf',
                        text: '0'
                      }]
                    ]
                  }
                },
                {
                  margin: [0, 50, 10, 10],
                  columns: [
                    {
                      wdith: '33%',
                      text: '_________________________________________________ \n NOMBRE Y FIRMA DEL CLIENTE',
                      fontSize: 10,
                      alignment: 'center'
                    },
                    {
                      wdith: '33%',
                      text: '________________________________________ \n NOMBRE Y FIRMA DEL INSPECTOR',
                      fontSize: 10,
                      alignment: 'center'
                    },
                    {
                      wdith: '33%',
                      text: '____________________________________________ \n NOMBRE Y FIRMA DEL PERSONAL DE APOYO',
                      fontSize: 10,
                      alignment: 'center'
                    }
                  ]
                },
                {
                  fontSize: 6,
                  text: 'SERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V. SE COMPROMETE A MANTENER LA CONFIDENCIALIDAD, SALVAGUARDAR TODA LA INFORMACION Y/O DOCUMENTACION QUE LE ES PROPORCIONADA Y/O PRESENTADA POR SUS CLIENTES. EL PRESENTE DICTAMEN DE INSPECCION CERTIFICA QUE LAS PRUEBAS EFECTUADAS CON LOS INSTRUMENTOS DESCRITOS SE EFECTUARON DE ACUERDO CON LA NORMA NOM-010-SCFI-1994 (INSTRUMENTOS DE MEDICION - INSTRUMENTOS PARA PESAR DE FUNCIONAMIENTO NO AUTOMATICO REQUISITOS TECNICOS Y METROLOGICOS ASI COMO TAMBIEN CONFORME AL PROCEDIMIENTO DCN-P-02 DE SERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V.'
                },
                {
                  fontSize: 6,
                  text: '· SERVICIOS DE VERIFICACION SALIA Y SUAREZ NO SUBCONTRATA CUALQUIER PARTE DE LA INSPECCION',
                  margin: [10, 0, 0, 0]
                },
                {
                  fontSize: 6,
                  text: '· EL PRESENTE DICTAMEN DE INSPECCION NO PODRA SER REPRODUCIDO DE MANERA PARCIAL O TOTAL SIN OMITIR NINGUN ELEMENTO Y/O REGISTRO QUE LO CONFORMA SIN PREVIA APROBACION DE LA UNIDAD DE INSPECCION Y EL CLIENTE',
                  margin: [10, 0, 0, 0]
                },
                {
                  fontSize: 6,
                  text: '· LOS RESULTADOS DE LA INSPECCION SE INDICAN EN EL INFORME DE RESULTADOS',
                  margin: [10, 0, 0, 0],
                  pageOrientation: 'portrait', pageBreak: 'after'
                },
    
                {
                  text: 'ENCUESTA DE SATSIFACCIÓN DE CLIENTES',
                  fontSize: 15,
                  alignment: 'center'
                },
                {
                  text: 'Estimado Cliente:',
                  bold: true,
                  fontSzie: 15,
                  margin: [0, 15]
                },
                {
                  text: 'Con la finalidad de brindarle un mejor servicio y lograr su satisfacción solicitamos de su ayuda para proprocionar los siguientes datos:'
                },
                {
                  margin: [0, 20, 0, 0],
                  columns: [
                    {
                      width: '40%',
                      text: 'COMENTARIOS',
                      fontSize: 15
                    },
                    {
                      width: '60%',
                      table: {
                        widths: ['*', '*', '*', '*', '*'],
                        body: [
                          [{
                            text: '10 \n Excelente',
                            alignment: 'center'
                          }, {
                            text: '8 \n Bueno',
                            alignment: 'center'
                          }, {
                            text: '6 \n Regular',
                            alignment: 'center'
                          }, {
                            text: '4 \n Malo',
                            alignment: 'center'
                          }, {
                            text: '2 \n Pésimo',
                            alignment: 'center'
                          }]
                        ]
                      }
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: '40%',
                      table: {
                        widths: ['*'],
                        body: [
                          [{
                            text: '1.- El tiempo de Respuesta desde la solicitud del servicio hasta su realización fue:',
                            margin: [0, 0, 0, 33]
                          }]
                        ]
                      }
                    },
                    {
                      width: '60%',
                      table: {
                        widths: ['*', '*', '*', '*', '*'],
                        body: [
                          [{
                            text: encuesta.tiempo_respuesta == "10" ? 'X' : '',
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 20, 0, 20]
                          }, {
                            text: encuesta.tiempo_respuesta == "8" ? 'X' : '',
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 20, 0, 20]
                          }, {
                            text: encuesta.tiempo_respuesta == "6" ? 'X' : '',
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 20, 0, 20]
                          }, {
                            text: encuesta.tiempo_respuesta == "4" ? 'X' : '',
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 20, 0, 20]
                          }, {
                            text: encuesta.tiempo_respuesta == "2" ? 'X' : '',
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 20, 0, 20]
                          }]
                        ]
                      }
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: '40%',
                      table: {
                        widths: ['*'],
                        body: [
                          [{
                            text: '2.- La Calidad respesto al servicio proporcionada por nuestro personal fue:',
                            margin: [0, 0, 0, 43]
                          }]
                        ]
                      }
                    },
                    {
                      width: '60%',
                      table: {
                        widths: ['*', '*', '*', '*', '*'],
                        body: [
                          [{
                            text: encuesta.calidad == "10" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.calidad == "8" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.calidad == "6" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.calidad == "4" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.calidad == "2" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }]
                        ]
                      }
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: '40%',
                      heigth: '30%',
                      table: {
                        widths: ['*'],
                        body: [
                          [{
                            text: '3.- La Atención personal hacia usted fue:',
                            margin: [0, 0, 0, 57]
                          }]
                        ]
                      }
                    },
                    {
                      width: '60%',
                      table: {
                        widths: ['*', '*', '*', '*', '*'],
                        body: [
                          [{
                            text: encuesta.atencion == "10" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.atencion == "8" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.atencion == "6" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.atencion == "4" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.atencion == "2" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }]
                        ]
                      }
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: '40%',
                      table: {
                        widths: ['*'],
                        body: [
                          [{
                            text: '4.- Algún miembro de nuestro personal le atendió mal o incorrectamente:',
                            margin: [0, 0, 0, 43]
                          }]
                        ]
                      }
                    },
                    {
                      width: '60%',
                      table: {
                        widths: ['*', '*', '*', '*', '*'],
                        body: [
                          [{
                            text: encuesta.mala_conducta_personal == "10" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.mala_conducta_personal == "8" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.mala_conducta_personal == "6" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.mala_conducta_personal == "4" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }, {
                            text: encuesta.mala_conducta_personal == "2" ? 'X' : null,
                            fontSize: 30,
                            alignment: 'center',
                            margin: [0, 25, 0, 25]
                          }]
                        ]
                      }
                    }
                  ]
                },
                {
                  text: '5.- OBSERVACIONES:',
                  margin: [0, 20, 0, 0],
                  fontSize: 15
                },
                {
                  margin: [0, 20, 0, 0],
                  text: encuesta.observaciones,
                  bold: true
                },
                {
                  margin: [0, 20, 0, 0],
                  columns: [
                    {
                      margin: [0, 2],
                      width: '20%',
                      fontSize: 15,
                      text: 'RESULTADO',
    
                    },
                    {
                      width: '5%',
                      table: {
                        widths: ['*'],
                        body: [[{ text: encuesta.resultado, fontSize: 15, bold: true }]]
                      }
                    }
                  ]
                },
                {
                  margin: [0, 20],
                  text: 'Nota: En caso de alguna inconformidad con el servicio, favor de solicitar formato de "Atención a Quejas, Reclamaciones Técnicas y Apelaciones" DCN-F-21'
                }
              ],
              styles: {
                tableInspeccionVisual: {
                  margin: [0, -30, 0, 0]
                },
                tableInspeccionMtro: {
                  margin: [0, 5, 0, 1]
                },
                tableInformacionEmpresarial: {
                  border: [false, false, false, false],
                }
              }
            };
    
            const pdfDocGenerator = pdfMake.createPdf(dd);
    
            pdfDocGenerator.getBlob(async (blob) => {
              const fileName = `ejemplo_${new Date().getTime()}.pdf`;
              const url = await this.uploadPDF(blob, fileName);
              await this.presentQrModal(url);
              console.log('Enlace del PDF:', url);
            });
    
            pdfMake.createPdf(dd).open();
          });
    
    
        }

  }
}
