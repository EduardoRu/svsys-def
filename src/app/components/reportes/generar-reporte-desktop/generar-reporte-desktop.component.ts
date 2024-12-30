import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { EncuestaSatifaccionComponent } from '../encuesta-satifaccion/encuesta-satifaccion.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlmacenamientoService } from 'src/app/services/firebase/almacenamiento/almacenamiento.service';
import { QrModalComponent } from 'src/app/qr-modal/qr-modal.component';
import { Geolocation } from '@capacitor/geolocation';
import proj4 from 'proj4';
import { GenerarDictamenService } from 'src/app/services/generarDictamen/generar-dictamen.service';
import { ReportesService } from 'src/app/services/actividades/reportes/reportes.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-reporte-desktop',
  templateUrl: './generar-reporte-desktop.component.html',
  styleUrls: ['./generar-reporte-desktop.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true

})
export class GenerarReporteDesktopComponent implements OnInit {

  @ViewChild('canvas') canvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  public citasProgramadas: any = [];


  public segment = "infoClientes";

  // Datos finales
  dicamenFinal: FormGroup;

  // Información del cliente
  clienteInformacion: FormGroup;


  // Sección De Registro para las basculas
  basculaInformacion: FormGroup;
  registroBasculas: FormGroup;
  public basculas: any = [];

  divi_max: any;
  alcance_max: any;


  estudioMtro: FormGroup
  public basculasMetro: any = [];

  public basculaResumen: any = []

  // Inspección visual
  basculasVisual: any = []
  inspeccionVisual: FormGroup;

  storageInfoVisual: any = [];

  //RESUMEN
  resumen: FormGroup;
  storageInfoResumen: any = []

  // INFORMAICÓN DE PAGO
  infoPago: FormGroup;
  storageInfoPago: any = []

  // INFO METROLOGICA
  cargas: any;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private storageService: StorageService,
    private alertController: AlertController,
    private citasService: CitasService,
    private modalController: ModalController,
    private toastController: ToastController,
    private dictamenSerivce: ReportesService,
    private generarReporteService: GenerarDictamenService
  ) { }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj
    });

    await alert.present();
  }

  get ejemplo1(): FormArray {
    return this.estudioMtro.get('ejemplo1') as FormArray;
  }

  async ngOnInit() {
    this.infoClientes();

    // Inzilializar la información del cliente
    this.clienteInformacion = this.fb.group({
      nombre_razon_social: ['', Validators.required],
      rfc: ['', Validators.required],
      telefono: ['', Validators.required],
      Fecha: ['', Validators.required],
      tipo_servicio: ['', Validators.required],
      cp: ['', Validators.required],
      giro_empresarial: ['', Validators.required],
      domicilio: ['', Validators.required],
      num_dom: ['', Validators.required],
      colonia: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
    });


    // Recolección de la General de las basculas
    this.basculaInformacion = this.fb.group({
      compromiso: ['', Validators.required],
      inspeccion: ['', Validators.required],
      tipo_inspeccion: ['', Validators.required],
      semestre: ['', Validators.required],
      basculas: [[], Validators.required]
    });

    //Recolección de la información de cada bascula
    this.registroBasculas = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      no_serie: ['', Validators.required],
      clase: ['', Validators.required],
      divi_max: ['', Validators.required],
      alcance_max: ['', Validators.required],
      tipo_bascula: ['', Validators.required]
    });


    // INSEPCCIÓN VISUAL
    this.inspeccionVisual = this.fb.group({
      bascula: [[]],
      IV1: ['', Validators.required],
      IV2: ['', Validators.required],
      IV3: ['', Validators.required],
      IV4: ['', Validators.required],
      IV5: ['', Validators.required],
      IV6: ['', Validators.required],
      IV7: ['', Validators.required],
      IV8: ['', Validators.required],
      IV9: ['', Validators.required],
      IV10: ['', Validators.required],
      IV11: ['', Validators.required],
      IV12: ['', Validators.required],
      IV13: ['', Validators.required],
      ObervacionesInspeccionVisual: ['', Validators.required],
      basculaInspeccion: ['']
    });


    // Estudio Mtro
    this.estudioMtro = this.fb.group({
      precarga: [''],
      alc_max: [''],
      divi_max: [''],
      clase_ex: [''],
      observaciones: [''],
      ejemplo1: this.fb.array([
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        }),
        this.fb.group({
          carga: [''],
          emt: [''],
          errASC: [''],
          errDSC: [''],
          num50: [''],
          num100: [''],
          den50: [''],
          den100: [''],
          emt13: [''],
        })
      ]),
      infoRepetibilidad: this.fb.array([
        this.fb.group({
          rep50num: [''],
          rep100num: [''],
          rep50den: [''],
          rep100den: [''],
          rep13den: [''],
          diferenciaUno: [''],
          diferenciaDos: [''],
          diferenciaTres: [''],
          diferenciaCuatro: [''],
          emt13den: ['']
        })
      ])
    });

    // Resumen
    this.resumen = this.fb.group({
      basculaResumen: [],
      inspeccion_visual: ['', Validators.required],
      exactitud: ['', Validators.required],
      repetibilidad: ['', Validators.required],
      exentricidad: ['', Validators.required],
      ui: ['', Validators.required],
      prdfeco: ['', Validators.required],
      dictamen_final: ['', Validators.required],
      equipo_medicion: ['', Validators.required],
      observaciones: ['', Validators.required]
    });

    // INFORMACIÓN DE PAGO
    this.infoPago = this.fb.group({
      cantidad: ['', Validators.required],
      desc: ['', Validators.required],
      costo: ['', Validators.required],
      importe: ['', Validators.required],
      importe2: ['', Validators.required],
      firma_cliente: [],
      firma_inspector: [],
      firma_apoto: []
    });

    this.dicamenFinal = this.fb.group({
      idUsuario: ['', Validators.required],
      nombreUsuario:['', Validators.required],
      infoCliente: [[], Validators.required],
      infoPago: [[], Validators.required],
      infoVisuales: [[], Validators.required],
      encuesta: [[], Validators.required],
      infoBasculas: [[], Validators.required],
      estudioMtro: [[], Validators.required],
      infoResumen: [[], Validators.required]
    })



    setTimeout(async () => {
      const loagin = await this.loadingController.create({
        message: "Cargando infocmaicón",
        duration: 1000
      });
      loagin.present();
      await this.onSegementChanged({ detail: { value: this.segment } });
    }, 0); // Espera 1 segundo antes de ejecutar la función
  }

  async infoClientes() {
    return this.citasService.getCitaProgramada().subscribe({
      next: (data) => {
        this.citasProgramadas = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  citaProgramada(e: any) {
    console.log(e.detail.value)
    if (e.detail.value != undefined) {
      this.clienteInformacion.get('nombre_razon_social').setValue(e.detail.value.nombre_razon_social)
      this.clienteInformacion.get('rfc').setValue(e.detail.value.rfc)
      this.clienteInformacion.get('telefono').setValue(e.detail.value.telefono)
      this.clienteInformacion.get('Fecha').setValue(e.detail.value.fecha)
      this.clienteInformacion.get('tipo_servicio').setValue(e.detail.value.tipo_servicio)
      this.clienteInformacion.get('cp').setValue(e.detail.value.cp)
      this.clienteInformacion.get('giro_empresarial').setValue(e.detail.value.giro)
      this.clienteInformacion.get('colonia').setValue(e.detail.value.colonia)
      this.clienteInformacion.get('domicilio').setValue(e.detail.value.domicilio)
      this.clienteInformacion.get('num_dom').setValue(e.detail.value.num)
      this.clienteInformacion.get('municipio').setValue(e.detail.value.municipio)
      this.clienteInformacion.get('estado').setValue(e.detail.value.estado)
    }
  }

  async onSegementChanged(event: any) {
    this.cd.detectChanges();
    if (event.detail != undefined) {
      this.segment = event.detail.value;
    }

    if (this.segment === 'infoClientes') {
      const res: any = await this.storageService.getValue('infoClientes').then(res => { return res });
      if (res != undefined) {
        this.clienteInformacion.get('nombre_razon_social').setValue(res.nombre_razon_social)
        this.clienteInformacion.get('rfc').setValue(res.rfc)
        this.clienteInformacion.get('telefono').setValue(res.telefono)
        this.clienteInformacion.get('Fecha').setValue(res.Fecha)
        this.clienteInformacion.get('tipo_servicio').setValue(res.tipo_servicio)
        this.clienteInformacion.get('cp').setValue(res.cp)
        this.clienteInformacion.get('giro_empresarial').setValue(res.giro_empresarial)
        this.clienteInformacion.get('colonia').setValue(res.colonia)
        this.clienteInformacion.get('domicilio').setValue(res.domicilio)
        this.clienteInformacion.get('num_dom').setValue(res.num_dom)
        this.clienteInformacion.get('municipio').setValue(res.municipio)
        this.clienteInformacion.get('estado').setValue(res.estado)
      }
    } else if (this.segment == 'Basculas') {
      this.storageService.getValue('infoBasculas').then(res => {
        if (res != undefined) {
          this.basculaInformacion.get('compromiso').setValue(res.compromiso);
          this.basculaInformacion.get('inspeccion').setValue(res.inspeccion);
          this.basculaInformacion.get('semestre').setValue(res.semestre);
          this.basculaInformacion.get('tipo_inspeccion').setValue(res.tipo_inspeccion);


          this.basculas = res.basculas
        }
      });
    } else if (this.segment == 'InspeccionMetro') {
      this.storageService.getValue('infoBasculas').then(res => {
        if (res != undefined) {
          this.basculasMetro = res.basculas
        }
      });
    } else if (this.segment == 'InspeccionVisual') {
      this.storageService.getValue('infoBasculas').then(res => {
        if (res != undefined) {
          this.basculasVisual = res.basculas
        }
      });
      this.storageService.getValue('inspeccionVisual').then(res => {
        if (res != undefined) {
          this.storageInfoVisual = res
        }
      })
    } else if (this.segment == 'Resumen') {
      this.storageService.getValue('resumen').then(res => {
        if (res != undefined) {
          this.storageInfoResumen = res
        }
      })
    } else if (this.segment == 'Firma') {
      this.storageService.getValue('infoPago').then(res => {
        if (res != undefined) {
          this.infoPago.get('cantidad').setValue(res.cantidad)
          this.infoPago.get('desc').setValue(res.desc)
          this.infoPago.get('costo').setValue(res.costo)
          this.infoPago.get('importe').setValue(res.importe)
          this.infoPago.get('importe2').setValue(res.importe2)
        }
      })
    }
  }

  getControl(controlName: string) {
    return this.basculaInformacion.get(controlName);
  }

  // OBTENER Y ELEIMINAR LA INFORMACIÓN DE LOS CLIENTES
  async getinfoCliente() {
    const loading = await this.loadingController.create({
      message: 'Guardando información...'
    });
    loading.present();

    if (this.clienteInformacion.valid) {

      this.storageService.addValue('infoClientes', this.clienteInformacion.value);
      loading.dismiss();
      this.presentAlert('Información guardada exitosamente');
    } else {
      this.presentAlert('Todos los campos son obligatorios');
      loading.dismiss();
      return;
    }

  }



  limpiarInfoCliente() {
    //Limpiar la infromación del formulario
    this.clienteInformacion.reset();
  }

  // OBTENER LA INFORMACIÓN DE LAS BASCULAS

  limpiarFormularioBasculas() {
    this.basculaInformacion.reset();
    this.basculas = []
  }

  getBascula() {
    console.log(this.registroBasculas.value)
    // Obtener la información de las basculas
    if (this.registroBasculas.valid) {
      this.basculas.push(this.registroBasculas.value);
      this.registroBasculas.reset();
    } else {
      this.presentAlert('Favor de completar todos los campos para generar un registro de la bascula');
    }
  }

  clasifiacionbasculas(event: any, tipo: string) {
    const valor = event.target.value;

    if (tipo == 'divi_max') {
      const fraccionRegex = /^\d+\/\d+$/;
      if (fraccionRegex.test(valor)) {
        const [numerador, denominador] = valor.split('/')
        this.divi_max = parseInt(denominador)
      } else {
        //console.log("Formato invalido");
      }
    } else if (tipo == 'alcance_max') {
      const fraccionRegex = /^\d+\/\d+$/;
      if (fraccionRegex.test(valor)) {
        const [numerador, denominador] = valor.split('/')
        this.alcance_max = parseInt(denominador)
      } else {
        //console.log("Formato invalido");
      }
    }

    if (this.divi_max != undefined && this.alcance_max != undefined) {
      const clasificacion = (this.alcance_max * 1000) / this.divi_max

      if (clasificacion >= 0 && clasificacion <= 1000) {
        this.registroBasculas.get('clase').setValue('4')
      } else if (clasificacion >= 500 && clasificacion <= 10000) {
        this.registroBasculas.get('clase').setValue('3')
      } else if (clasificacion >= 5000 && clasificacion <= 100000) {
        this.registroBasculas.get('clase').setValue('2')
      }
    }
  }

  eliminarBascula(item: any) {
    this.basculas.splice(item, 1)
  }

  guardarInformacionBasculas() {
    this.basculaInformacion.get('basculas').setValue(this.basculas);

    if (this.basculaInformacion.valid) {
      this.storageService.addValue('infoBasculas', this.basculaInformacion.value);
      this.presentAlert('Información guardada exitosamente');
    } else {
      this.presentAlert('Todos los campos son obligatorios para generar un registro de las basculas');
    }
  }


  async infoBasculaMtro(e: any) {
    const datos: any = await this.storageService.getValue('estudioMtro').then(res => res)
    if (
      datos != undefined &&
      datos.alc_max != undefined &&
      datos.clase_ex != undefined &&
      datos.divi_max != undefined &&
      datos.ejemplo1 != undefined &&
      datos.infoRepetibilidad != undefined &&
      datos.observaciones != undefined &&
      datos.precarga
    ) {
      this.estudioMtro.get('precarga').setValue(datos.precarga)
      this.estudioMtro.get('alc_max').setValue(datos.alc_max)
      this.estudioMtro.get('divi_max').setValue(datos.divi_max)
      this.estudioMtro.get('clase_ex').setValue(datos.clase_ex)
      this.estudioMtro.get('observaciones').setValue(datos.observaciones)
      this.estudioMtro.get('ejemplo1').setValue(datos.ejemplo1)
      this.estudioMtro.get('infoRepetibilidad').setValue(datos.infoRepetibilidad)
    } else {
      this.estudioMtro.get('alc_max').setValue(e.detail.value.alcance_max)
      this.estudioMtro.get('divi_max').setValue(e.detail.value.divi_max)
      this.estudioMtro.get('clase_ex').setValue(e.detail.value.clase)

      const alc_max = this.estudioMtro.get('alc_max').value
      const clase = this.estudioMtro.get('clase_ex').value

      const [numerador, denominador] = alc_max.split('/')
      this.estudioMtro.get('precarga').setValue(denominador)

      // ACCEDER AL ARRAY

      const arrayCargaUno = this.estudioMtro.get('ejemplo1') as FormArray;
      const arrayCargas = [.002, .005, .025, .05, .1, .2, .35, .5, .6, 1]
      for (let i = 0; i < 10; i++) {
        const group = arrayCargaUno.at(i) as FormGroup;
        group.get('carga').setValue(arrayCargas[i] * denominador)
      }

      const arrayRepetibilidad = this.estudioMtro.get('infoRepetibilidad') as FormArray;
      const group = arrayRepetibilidad.at(0) as FormGroup;

      group.get('rep50num').setValue(numerador * .5)
      group.get('rep100num').setValue(numerador)
      group.get('rep50den').setValue(denominador * .5)
      group.get('rep100den').setValue(denominador)
      group.get('rep13den').setValue(Math.round(denominador * 0.33))


      if (clase == "2") {
        const divi_mina = this.estudioMtro.get('divi_max').value
        const [numerador, denominador] = divi_mina.split('/')

        const escala1 = denominador * 5000
        const escala2 = denominador * 20000
        const escala3 = denominador * 100000

        const cla1 = denominador * 1
        const cla2 = denominador * 2
        const cla3 = denominador * 3

        for (let i = 0; i < 10; i++) {
          const group = arrayCargaUno.at(i) as FormGroup;
          group.get('emt').setValue(
            (group.get('carga').value * 1000) <= escala1 ? cla1 :
              (group.get('carga').value * 1000) >= escala2 && (group.get('carga').value * 1000) <= escala3 ? cla2 : cla3
          )
        }

      } else if (clase == "3") {
        const divi_mina = this.estudioMtro.get('divi_max').value
        const [numerador, denominador] = divi_mina.split('/')

        const escala1 = denominador * 500
        const escala2 = denominador * 2000

        const cla1 = denominador * 1
        const cla2 = denominador * 2
        const cla3 = denominador * 3

        for (let i = 0; i < 10; i++) {
          const group = arrayCargaUno.at(i) as FormGroup;
          group.get('emt').setValue(
            (group.get('carga').value * 1000) <= escala1 ? cla1 :
              ((group.get('carga').value * 1000) > escala1 && (group.get('carga').value * 1000) <= escala2) ? cla2 : cla3
          )
        }

      } else if (clase == "4") {

        const divi_mina = this.estudioMtro.get('divi_max').value
        const [numerador, denominador] = divi_mina.split('/')

        const escala1 = denominador * 50
        const escala2 = denominador * 200
        const escala3 = denominador * 1000

        const cla1 = denominador * 1
        const cla2 = denominador * 2
        const cla3 = denominador * 3

        for (let i = 0; i < 10; i++) {
          const group = arrayCargaUno.at(i) as FormGroup;
          group.get('emt').setValue(
            (group.get('carga').value * 1000) <= escala1 ? cla1 :
              (group.get('carga').value * 1000) >= escala2 && (group.get('carga').value * 1000) <= escala3 ? cla2 : cla3
          )
        }
      }
    }



  }

  async getestudioMetro() {
    const load = await this.loadingController.create({
      message: 'Cargando estudio metrológico...'
    })

    load.present();

    if (this.estudioMtro.valid) {
      this.storageService.addValue('estudioMtro', this.estudioMtro.value)
      load.dismiss();
    } else {
      this.presentAlert('Todos los campos son obligatorios');
      load.dismiss();
    }
  }


  // OBTENER INSPECCIÓN VISUAL
  async getInspeccionVisual() {
    const loading = await this.loadingController.create({
      message: 'Guardando información...'
    });
    loading.present();

    if (this.inspeccionVisual.valid) {
      this.storageService.addValue('inspeccionVisual', this.inspeccionVisual.value);
      loading.dismiss();
      this.presentAlert('Información guardada exitosamente');
    } else {
      this.presentAlert('Todos los campos son obligatorios');
      loading.dismiss();
      return;
    }
  }

  limpiarInfoVisual() {
    this.inspeccionVisual.reset();
    this.storageInfoVisual = []
  }

  loadInfoVisuales(event: any) {
    const infoBascula = event.detail.value;
    console.log(infoBascula)

    if (infoBascula) {
      var inspecciones = this.storageInfoVisual;

      if (inspecciones.length != 0) {
        inspecciones = [inspecciones]
        const result = inspecciones.find((item: any) => item.basculaInspeccion.alcance_max == infoBascula.alcance_max &&
          item.basculaInspeccion.marca == infoBascula.marca &&
          item.basculaInspeccion.modelo == infoBascula.modelo &&
          item.basculaInspeccion.no_serie == infoBascula.no_serie &&
          item.basculaInspeccion.tipo_bascula == infoBascula.tipo_bascula &&
          item.basculaInspeccion.clase == infoBascula.clase &&
          item.basculaInspeccion.divi_max == infoBascula.divi_max
        )

        if (result) {
          this.inspeccionVisual.get('bascula').setValue(infoBascula)
          this.inspeccionVisual.get('IV1').setValue(result.IV1)
          this.inspeccionVisual.get('IV2').setValue(result.IV2)
          this.inspeccionVisual.get('IV3').setValue(result.IV3)
          this.inspeccionVisual.get('IV4').setValue(result.IV4)
          this.inspeccionVisual.get('IV5').setValue(result.IV5)
          this.inspeccionVisual.get('IV6').setValue(result.IV6)
          this.inspeccionVisual.get('IV7').setValue(result.IV7)
          this.inspeccionVisual.get('IV8').setValue(result.IV8)
          this.inspeccionVisual.get('IV9').setValue(result.IV9)
          this.inspeccionVisual.get('IV10').setValue(result.IV10)
          this.inspeccionVisual.get('IV11').setValue(result.IV11)
          this.inspeccionVisual.get('IV12').setValue(result.IV12)
          this.inspeccionVisual.get('IV13').setValue(result.IV13)
          this.inspeccionVisual.get('ObervacionesInspeccionVisual').setValue(result.ObervacionesInspeccionVisual)
        }
      } else if (inspecciones.length == 0 && infoBascula.tipo_bascula == "E") {
        this.inspeccionVisual.get('bascula').setValue(infoBascula)
        this.inspeccionVisual.get('IV1').setValue("C")
        this.inspeccionVisual.get('IV2').setValue("C")
        this.inspeccionVisual.get('IV3').setValue("C")
        this.inspeccionVisual.get('IV4').setValue("C")
        this.inspeccionVisual.get('IV5').setValue("C")
        this.inspeccionVisual.get('IV6').setValue("C")
        this.inspeccionVisual.get('IV7').setValue("C")
        this.inspeccionVisual.get('IV8').setValue("C")
        this.inspeccionVisual.get('IV9').setValue("C")
        this.inspeccionVisual.get('IV10').setValue("C")
        this.inspeccionVisual.get('IV11').setValue("C")
        this.inspeccionVisual.get('IV12').setValue("C")
        this.inspeccionVisual.get('IV13').setValue("C")
        this.inspeccionVisual.get('ObervacionesInspeccionVisual').setValue("CUMPLE")
      }


    }
  }

  async presentToast(mesage: string, position: 'top' | 'middle' | 'bottom', cl: "danger" | "success" | "warning") {
    const toast = await this.toastController.create({
      message: mesage,
      duration: 1500,
      position: position,
      color: cl
    });

    await toast.present();
  }


  async encuestaSatifaccion() {
    // GUARDAR INFORMAICÓN
    if (this.infoPago.valid) {

      this.storageService.addValue('infoPago', this.infoPago.value);

      // ABRIR ENCUESTA
      const modalEncuestaSatisfied = await this.modalController.create({
        component: EncuestaSatifaccionComponent,
        cssClass: "modalCitas"
      });

      modalEncuestaSatisfied.present();

      modalEncuestaSatisfied.onDidDismiss().then((result) => {
        if (navigator.onLine) {
          this.subirInformacion();
        } else {
          this.presentToast('No hay conexión WiFi, sube tu reporte cuando tengas internet', "bottom", "warning")
        }
      })
    }
  }

  async subirInformacion() {
    const infoCliente:any = await this.storageService.getValue('infoClientes');
    const infoPago:any = await this.storageService.getValue('infoPago');
    const infoVisuales:any = await this.storageService.getValue('inspeccionVisual');
    const encuesta:any = await this.storageService.getValue('encuesta_satisfaccion');
    const infoBasculas:any = await this.storageService.getValue('infoBasculas');
    const estudioMtro:any = await this.storageService.getValue('estudioMtro');
    const infoResumen:any = await this.storageService.getValue('resumen');

    const user:any = await this.storageService.getValue('usuario');

    if (
      infoCliente != undefined &&
      infoPago != undefined &&
      infoVisuales != undefined &&
      encuesta != undefined &&
      infoBasculas != undefined &&
      estudioMtro != undefined &&
      infoResumen != undefined
    ) {
      this.dicamenFinal.get('infoCliente').setValue(infoCliente);
      this.dicamenFinal.get('infoPago').setValue(infoPago);
      this.dicamenFinal.get('infoVisuales').setValue(infoVisuales);
      this.dicamenFinal.get('encuesta').setValue(encuesta);
      this.dicamenFinal.get('infoBasculas').setValue(infoBasculas);
      this.dicamenFinal.get('estudioMtro').setValue(estudioMtro);
      this.dicamenFinal.get('infoResumen').setValue(infoResumen);
      this.dicamenFinal.get('idUsuario').setValue(user.id);
      this.dicamenFinal.get('nombreUsuario').setValue(user.usuario);

      if(this.dicamenFinal.valid){
        try {
          this.dictamenSerivce.addReporte(this.dicamenFinal.value).then((res) => {
            this.presentToast('Reporte guardado correctamente', "bottom", "success")
          })
        } catch (error) {
          this.presentToast('Error al guardar el reporte:'+ error.message, "bottom", "danger")
        }
      }
    }else{
      console.log("No hay información para guardar")
    }
  }


  infoBasculaResumen(e: any) {
    this.basculaResumen = e.detail.value;
    console.log(e.detail.value)

    if (this.basculaResumen) {
      const bascula = e.detail.value;
      const inspecciones = [this.storageInfoResumen];

      const result = inspecciones.find((item: any) => item.basculaResumen.alcance_max == bascula.alcance_max &&
        item.basculaResumen.marca == bascula.marca &&
        item.basculaResumen.modelo == bascula.modelo &&
        item.basculaResumen.clase == bascula.clase &&
        item.basculaResumen.tipo_bascula == bascula.tipo_bascula &&
        item.basculaResumen.divi_max == bascula.divi_max &&
        item.basculaResumen.no_serie == bascula.no_serie
      )


      if (result) {
        this.resumen.get('inspeccion_visual').setValue(result.inspeccion_visual)
        this.resumen.get('exactitud').setValue(result.exactitud)
        this.resumen.get('repetibilidad').setValue(result.repetibilidad)
        this.resumen.get('exentricidad').setValue(result.exentricidad)
        this.resumen.get('ui').setValue(result.ui)
        this.resumen.get('prdfeco').setValue(result.prdfeco)
        this.resumen.get('dictamen_final').setValue(result.dictamen_final)
        this.resumen.get('equipo_medicion').setValue(result.equipo_medicion)
        this.resumen.get('observaciones').setValue(result.observaciones)
      }
    }
  }

  async getDictamenBascula() {
    const load = await this.loadingController.create({
      message: "Guardando la información..."
    });
    load.present();

    if (this.resumen.valid) {

      this.storageService.addValue('resumen', this.resumen.value);

      this.presentAlert('Datos guardados correctamente');
      load.dismiss();
    } else {
      load.dismiss();
      this.presentAlert('Todos los campos son obligatorios');
    }
  }


  async imprimirReporte() {

    const infoCliente = await this.storageService.getValue('infoClientes');
    const infoPago = await this.storageService.getValue('infoPago');
    const infoVisuales = await this.storageService.getValue('inspeccionVisual');
    const encuesta = await this.storageService.getValue('encuesta_satisfaccion');
    const infoBasculas = await this.storageService.getValue('infoBasculas');
    const estudioMtro = await this.storageService.getValue('estudioMtro');
    const infoResumen = await this.storageService.getValue('resumen');

    this.generarReporteService.generarReporte(
      infoCliente,
      infoPago,
      infoVisuales,
      encuesta,
      infoBasculas,
      estudioMtro,
      infoResumen
    ).then((res: any) => {
      console.log(res);
    })
  }
}