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
    pageOrientation: 'landscape',
    content: [
        
        {
            
            columns: [
                {
                    text: 'image', 
                    width:'10%'
                    
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
                                text:'SOLICITUD DE SERVICIO DE INSPECCIÓN DE BÁSCULAS \n SERVICIOS DE VERIFICAICIÓN SALIÁ Y SUÁREZ S.A DE C.V \n Av. Isabelica No.132 Col. Rinconada la Isabelica C.P 98099\n e-mail: contacto_svsys@yahoo.com.mx Tel 01(492)154-46-97',
                                alignment: 'center',
                                fillColor: '#eeeeee'
                            }]
                        ]
                    }
                }
            ],
        },
        {
            text:'\n NOM-010-SCFI-1994 INSTRUMENTOS DE MEDICIÓN-INSTRUMENTOS PARA PESAR DE FUNCIONAMIENTO NO AUTOMÁTICO REQUISITOS TÉCNICOS Y METROLÓGICOS ',
            fontSize:7,
            alignment: 'center',
            bold: true
        },
        {
            text:'CONFORME A LO DISPUESTO EN LA LEY DE INFRAESTRUCTURA DE LA CALIDAD VIGENTE DEFINE REFERENTE A LA INSPECCIÓN QUE ES LA CONSTATACIÓN OCULAR O COMPROBACIÓN MEDIANTE MUESTREO, MEDICIÓN, PRUEBAS DE LABORATORIO OEXAMEN DE DOCUMENTOS QUE SE REALIZAPOR LAS UNIDADES DE INSPECCIÓN PARA EVALUAR LA CONFORMIDAD EN UN MOMENTO DETERMINADO APETICIÓN DEPARTE INTERESADA, INSPECCIONAR EL CUMPLIMIENTO DE NORMAS OFICIALES MEXICANAS, SOLAMENTE EN AQUELLOS CAMPOS O ACTIVIDADES PARALAS QUE HUBIEREN SIDO APROBADAS POR LAS DEPENDENCIAS COMPETENTES, ME PERMITO SOLICITAR A SERVICIOS DE VERIFICACIÓN SALIAY SUAREZ, S.A.DEC.V.CONNUMERO DE ACREDITACION EMAUVIM 129 EL SERVICIO DE INSPECCIÓN MANIFESTANDO LO SIGUIENTE:',
            fontSize:7,
            alignment: 'justify'
        },
        {
          text: 'DATOS DEL SOLICITANTE',
          fontSize: 11,
          bold:true,
          alignment:'center',
          margin: [0,5,0,0]
        },
        {
            margin:[0,5,0,0],
            columns:[
                {
                    width:'75%',
                    text:'Razón Social y/o nombre: ____________________________________________________________________________________________________',
                    fontSize:10
                },
                {
                    wdith:'*',
                    text:'R.F.C: ____________________________________',
                    fontSize:10
                }
            ]  
        },
        {
            margin:[0,5,0,0],
            columns:[
                {
                    width:'40%',
                    text:'Domicilio:________________________________________________________',
                    fontSize:10
                },
                {
                    width:'10%',
                    text:'Num. _________',
                    fontSize:10
                },
                {
                    width:'20%',
                    text: 'Col.____________________________',
                    fontSize:10
                },
                {
                    width:'30%',
                    text:'Loc.______________________________________________',
                    fontSize:10
                }
            ]  
        },
        {
            margin:[0,5,0,0],
            columns: [
                {
                    width:'30%',
                    fontSize:10,
                    text:'Municipio:_______________________________________'
                },
                {
                    width:'30%',
                    fontSize:10,
                    text:'Edo._____________________________________________'
                },
                {
                    width:'10%',
                    fontSize:10,
                    text:'C.P.____________'
                },
                {
                    width:'15%',
                    fontSize:10,
                    text:'Giro:____________________'
                },
                {
                    width:'15%',
                    fontSize:10,
                    text:'Tel:_____________________'
                }
            ]
        },
        {
            margin: [0,10,0,0],
            columns: [
                {
                    width:'30%',
                    margin:[0,0,5,0],
                    table: {
                        widths: ['*','*'],
                        body:[
                            [{text:'FECHA DE', alignment:'center', colSpan:2, fontSize:10, bold:true}, {}],
                            [
                                {
                                    fontSize:10,
                                    text:'Compromiso: '    
                                },
                                {
                                    fontSize:10,
                                    text:'Inspección: '
                                }
                            ]
                        ]
                    }
                },
                {
                    width:'20%',
                    margin:[0,0,5,0],
                    table: {
                        widths: ['*','*'],
                        body:[
                            [{text:'HORARIO', alignment:'center', colSpan:2,fontSize:10, bold:true}, {}],
                            [
                                {
                                    fontSize:10,
                                    text: 'Primero',
                                    alignment:'center'
                                },
                                {
                                    fontSize:10,
                                    text: 'Segundo',
                                    alignment:'center'
                                }
                            ]
                        ],
                    }
                },
                {
                    width:'30%',
                    margin:[0,0,5,0],
                    table: {
                        widths: ['*','*', '*'],
                        body:[
                            [{text:'Tipo de inspección', alignment:'center', colSpan:3,fontSize:10, bold:true}, {}, {}],
                            [
                                {
                                    fontSize:10,
                                    text:'Inicial',
                                    alignment:'center'
                                },
                                {
                                    fontSize:10,
                                    text:'Periódica',
                                    alignment:'center'
                                },
                                {
                                    fontSize:10,
                                    text:'Extraordinaria',
                                    alignment:'center'
                                }
                            ]
                        ]
                    }
                },
                {
                    width:'20%',
                    table: {
                        widths: ['*','*'],
                        body:[
                            [{text:'Semestre', alignment:'center', colSpan:2,fontSize:10, bold:true}, {}],
                            [
                                {
                                    fontSize:10,
                                    text: 'Primero',
                                    alignment:'center'
                                },
                                {
                                    fontSize:10,
                                    text: 'Segundo',
                                    alignment:'center'
                                }
                            ]
                        ],
                    }
                }
            ]
        },
        {
            margin:[0,5,0,0],
            table: {
                widths:[
                    '10%',
                    '10%',
                    '10%',
                    '5%',
                    '5%',
                    '6%',
                    '7%',
                    '5%',
                    '5%',
                    '2%',
                    '2%',
                    '2%',
                    '2%',
                    '2%',
                    '2%',
                    '5%',
                    '5%',
                    '5%',
                    '10%'],
                body:[
                    [{
                        text:'SOLICITUD', 
                        colSpan:19,
                        alignment:'center',
                        bold:true
                    },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
                    [
                       {
                           text:'MARCA',
                           bold:true,
                           alignment:'center',
                           fontSize:8,
                           margin:[0,60],
                           rowSpan:4
                       },{
                           text:'MODELO',
                           bold:true,
                           alignment:'center',
                           fontSize:8,
                           margin:[0,60],
                           rowSpan:4
                       },{
                           text:'No. SERIE',
                           bold:true,
                           alignment:'center',
                           fontSize:8,
                           margin:[0,60],
                           rowSpan:4
                       },{
                           text:'DIVISIÓN MÍNIMA (g)',
                           bold:true,
                           alignment:'center',
                           fontSize:7,
                           margin:[0,50],
                           rowSpan:4
                       },{
                           text:'ALCANCE MÁXIMO\nDE MEDICIÓN (kg)',
                           bold:true,
                           alignment:'center',
                           fontSize:6.5,
                           margin:[0,45],
                           rowSpan:4
                       },{
                           text:'CLASE DE EXACTITUD',
                           bold:true,
                           alignment:'center',
                           fontSize:6.5,
                           margin:[0,55],
                           rowSpan:4
                       },{
                           text:'TIPO DE INSTRUMENTO\n(M)\n MECÁNICO\n(E)\nELECTRÓNICO\n(H)\nHIBRIDO',
                           bold:true,
                           alignment:'center',
                           fontSize:6,
                           margin:[0,40],
                           rowSpan:4
                       },{
                           text:'INSPECCIÓN VISUAL',
                           fontSize:8,
                           colSpan:2,
                           margin:[0,2],
                           alignment:'center',
                           bold:true
                       },{},{
                           text:'INSPECCIÓN DE PROPIEDADES METROLOGICAS',
                           fontSize:8,
                           colSpan:6,
                           alignment:'center',
                           bold:true
                       },{},{},{},{},{},{
                           text:'DICTAMEN FINAL',
                           fontSize:9,
                           bold:true,
                           alignment:'center',
                           colSpan:2
                       },{},{
                           text:'FOLIOS',
                           fontSize:9,
                           bold:true,
                           alignment:'center',
                           colSpan:2
                       },{}
                    ],
                    [{},{},{},{},{},{},{},{
                        text:'CUMPLE'.split('').join('\n'),
                        rowSpan:3,
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'NO CUMPLE'.split('').join('\n'),
                        rowSpan:3,
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'CUMPLE',
                        rowSpan:2,
                        fontSize:6,
                        colSpan:3,
                        alignment:'center',
                        bold:true
                    },{},{},{
                        text:'NO CUMPLE',
                        rowSpan:2,
                        fontSize:6,
                        colSpan:3,
                        alignment:'center',
                        bold:true
                    },{},{},{
                        text:'CUMPLE',
                        rowSpan:3,
                        fontSize:6,
                        alignment:'center',
                        bold:true,
                        margin:[0,40]
                    },{
                        text:'NO CUMPLE',
                        rowSpan:3,
                        fontSize:6,
                        alignment:'center',
                        bold:true,
                        margin:[0,35]
                    },{
                        text:'UI',
                        rowSpan:3,
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'PROFECO',
                        rowSpan:2,
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    }],
                    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
                    [{},{},{},{},{},{},{},{},{},{
                        text:'EXACTITUD'.split('').join('\n'),
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'REPETIBILIDAD'.split('').join('\n'),
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'EXCENTRICIDAD'.split('').join('\n'),
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                         text:'EXACTITUD'.split('').join('\n'),
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'REPETIBILIDAD'.split('').join('\n'),
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{
                        text:'EXCENTRICIDAD'.split('').join('\n'),
                        fontSize:6,
                        alignment:'center',
                        bold:true
                    },{},{},{},{}],
                    [{
                        text:'1'
                    },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
                    [{
                        text:'2'
                    },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
                    [{
                        text:'3'
                    },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
                ]
            }
        },
        {
            pageBreak: 'before',
            text:'EQUIPO UTILIZADO, EN LA INSPECCIÓN',
            alignment:'center',
            bold:true,
            fontSize:15
        },
        {
            margin: [0,5],
            table: {
                widths:[
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
                            text:'EQUIPO UTILIZADO EN LA INSPECCIÓN',
                            colSpan:4,
                            alignment:'center',
                            margin: [0,20]
                        },
                        {},
                        {},
                        {},
                        {
                            
                        },
                        {
                            text:'No. APROBACIÓN MODELO PROTOTIPO DGN:',
                            alignment:'center',
                            margin: [0,20]
                        },
                        {
                            fontSize:10,
                            text:'ALCANCE DE MEDICIÓN \n BAJO(B) MEDIANO(M)',
                            alignment:'center',
                            margin: [0,20]
                        }
                    ],
                    [{
                        text:'IDENTIFICACIÓN',
                        bold:true,
                        alignment:'center',
                        colSpan:4
                    },{},{},{},{
                        text:'INFORME DE CALIBRACIÓN',
                        bold:true,
                        alignment:'center'
                    },{
                        text:'1'
                    },{}],
                    [{
                        text:'M'
                    },{
                        colSpan:3,
                        text:''
                    },{},{},{},{
                        text:'2'
                    },{}],
                    [{
                        text:'5kg'
                    },{
                        text:'',
                        colSpan:3
                    },{},{},{},{
                        text:'3'
                    },{}],
                    [{
                        text:'10Kg'
                    },{
                        colSpan:3,
                        text:''
                    },{},{},{},{
                        text:'OBSERVACIONES:',
                        colSpan:2
                    },{}],
                    [{
                        text:'20Kg'
                    },{
                        text:'',
                        colSpan:3
                    },{},{},{},{
                        text:'',
                        colSpan:2
                    },{}],
                    [{
                        text:'VEHICULO',
                        fontSize:10
                    },{},{
                        text:'PLACA',
                        fontSize:9
                    },{},{},{},{}],
                ]
            }
        },
        {
            text:'INFORMAICÓN DE PAGO',
            alignment:'center',
            bold:true,
            fontSize:15
        },
        {
            margin: [0,5],
            table: {
                widths: ['*','*','*','*'],
                body: [
                    [{
                        text:'RECIBO DE PAGO',
                        fillColor: '#ace2b9',
                        colSpan:4,
                        alignment:'center',
                        bold:true
                    },{},{},{}],
                    [{
                        text:'CANTIDAD',
                        fillColor: '#ace2b9',
                        alignment:'center',
                        bold:true
                    },{
                        text:'DESCRIPCIÓN',
                        fillColor: '#ace2b9',
                        alignment:'center',
                        bold:true
                    },{
                        text:'COSTO UNITARIO',
                        fillColor: '#ace2b9',
                        alignment:'center',
                        bold:true
                    },{
                        text:'IMPORTE',
                        fillColor: '#ace2b9',
                        alignment:'center',
                        bold:true
                    }],
                    [{
                        fillColor:'#bbf7cf',
                        text:''
                    },{
                        fillColor:'#bbf7cf',
                        text:'DE 0 A 99 Kg'
                    },{
                        fillColor:'#bbf7cf',
                        text:'380.00'
                    },{
                        fillColor:'#bbf7cf',
                        text:''
                    }],
                    [{
                        fillColor:'#bbf7cf',
                        text:''
                    },{
                        fillColor:'#bbf7cf',
                        text:'DE 100 A 200 Kg'
                    },{
                        fillColor:'#bbf7cf',
                        text:'480.00'
                    },{
                        fillColor:'#bbf7cf',
                        text:''
                    }],
                    [{
                        fillColor:'#bbf7cf',
                        text:''
                    },{
                        fillColor:'#bbf7cf',
                        text:'MAYOR DE 200 Kg SEGÚN COTIZACIÓN'
                    },{
                        fillColor:'#bbf7cf',
                        text:''
                    },{
                        fillColor:'#bbf7cf',
                        text:''
                    }],
                    [{
                        text:'',
                        border:[0]
                    },{
                        border:[0],
                        text:''
                    },{
                        border:[0],
                        text:''
                    },{
                        fillColor:'#bbf7cf',
                        text:'0'
                    }]
                ]
            }
        },
        {
            margin: [0,50,10,10],
            columns:[
                {
                    wdith:'33%',
                    text:'_________________________________________________ \n NOMBRE Y FIRMA DEL CLIENTE',
                    fontSize:10,
                    alignment:'center'
                },
                {
                    wdith:'33%',
                    text:'________________________________________ \n NOMBRE Y FIRMA DEL INSPECTOR',
                    fontSize:10,
                    alignment:'center'
                },
                {
                    wdith:'33%',
                    text:'____________________________________________ \n NOMBRE Y FIRMA DEL PERSONAL DE APOYO',
                    fontSize:10,
                    alignment:'center'
                }
            ]
        },
        {
            fontSize:6,
            text:'SERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V. SE COMPROMETE A MANTENER LA CONFIDENCIALIDAD, SALVAGUARDAR TODA LA INFORMACION Y/O DOCUMENTACION QUE LE ES PROPORCIONADA Y/O PRESENTADA POR SUS CLIENTES. EL PRESENTE DICTAMEN DE INSPECCION CERTIFICA QUE LAS PRUEBAS EFECTUADAS CON LOS INSTRUMENTOS DESCRITOS SE EFECTUARON DE ACUERDO CON LA NORMA NOM-010-SCFI-1994 (INSTRUMENTOS DE MEDICION - INSTRUMENTOS PARA PESAR DE FUNCIONAMIENTO NO AUTOMATICO REQUISITOS TECNICOS Y METROLOGICOS ASI COMO TAMBIEN CONFORME AL PROCEDIMIENTO DCN-P-02 DE SERVICIOS DE VERIFICACION SALIA Y SUAREZ S.A. DE C.V.'
        },
        {
            fontSize:6,
            text:'· SERVICIOS DE VERIFICACION SALIA Y SUAREZ NO SUBCONTRATA CUALQUIER PARTE DE LA INSPECCION',
            margin: [10,0,0,0]
        },
        {
            fontSize:6,
            text:'· EL PRESENTE DICTAMEN DE INSPECCION NO PODRA SER REPRODUCIDO DE MANERA PARCIAL O TOTAL SIN OMITIR NINGUN ELEMENTO Y/O REGISTRO QUE LO CONFORMA SIN PREVIA APROBACION DE LA UNIDAD DE INSPECCION Y EL CLIENTE',
            margin: [10,0,0,0]
        },
        {
            fontSize:6,
            text:'· LOS RESULTADOS DE LA INSPECCION SE INDICAN EN EL INFORME DE RESULTADOS',
            margin: [10,0,0,0]
        }
    ],
    
};
*/