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
import { ListaClientesComponent } from '../lista-clientes/lista-clientes.component';

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
      tipo_bascula: ['', Validators.required],
      alc_max: ['', Validators.required],
      divi_min: ['', Validators.required]
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
      nombreUsuario: ['', Validators.required],
      infoCliente: [[], Validators.required],
      infoPago: [[], Validators.required],
      infoVisuales: [[], Validators.required],
      encuesta: [[], Validators.required],
      infoBasculas: [[], Validators.required],
      estudioMtro: [[], Validators.required],
      infoResumen: [[], Validators.required],
      firmaInspector: ['', Validators.required],
      firmaCliente: ['', Validators.required],
      firmaPa: ['', Validators.required],
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

  get ejemplo1(): FormArray {
    return this.estudioMtro.get('ejemplo1') as FormArray;
  }

  // FUNCIÓNES DE APOYO PARA GUIAR AL USUARIO
  async presentToast(mesage: string, position: 'top' | 'middle' | 'bottom', cl: "danger" | "success" | "warning") {
    const toast = await this.toastController.create({
      message: mesage,
      duration: 1500,
      position: position,
      color: cl
    });

    await toast.present();
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj
    });

    await alert.present();
  }


  // FUNCIONES DE UTILIDAD GENERAL
  convertirCanvasABase64(canvasId: string): string | null {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (!canvas) {
      console.error(`No se encontró el canvas con id ${canvasId}`);
      return null;
    }

    // Convierte el contenido del canvas a una URL en formato base64
    const base64Image = canvas.toDataURL('image/png'); // Formato PNG
    return base64Image;
  }


  enableDrawing(canvasId: string): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error(`No se pudo obtener el contexto del canvas ${canvasId}`);
      return;
    }

    // Configurar el tamaño del canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let isDrawing = false;

    // Eventos de mouse
    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      ctx.closePath();
    });

    canvas.addEventListener('mouseleave', () => {
      isDrawing = false;
      ctx.closePath();
    });

    // Eventos táctiles para dispositivos móviles
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      isDrawing = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      if (isDrawing) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
      }
    });

    canvas.addEventListener('touchend', () => {
      isDrawing = false;
      ctx.closePath();
    });

    canvas.addEventListener('touchcancel', () => {
      isDrawing = false;
      ctx.closePath();
    });

    // Configuración de estilo de dibujo
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
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
      setTimeout(() => {
        this.enableDrawing('firmaCliente');
        this.enableDrawing('firmaInspector');
        this.enableDrawing('firmaApoyo');
      }, 0);
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

  borrarFirma(canvasId: string): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia todo el contenido del canvas
    }
  }

  guardarFirmas(): void {
    const firmaClienteBase64 = this.convertirCanvasABase64('firmaCliente');
    const firmaInspectorBase64 = this.convertirCanvasABase64('firmaInspector');
    const firmaApoyoBase64 = this.convertirCanvasABase64('firmaApoyo');

    if (firmaClienteBase64 && firmaInspectorBase64 && firmaApoyoBase64) {

      this.storageService.addValue('firmaClienteBase64', firmaClienteBase64);
      this.storageService.addValue('firmaInspectorBase64', firmaInspectorBase64);
      this.storageService.addValue('firmaApoyoBase64', firmaApoyoBase64);
    } else {
      console.error('Ocurrió un problema al convertir las firmas.');
    }
  }

  // SECCIÓN DE LOS CLIENTES
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

  async buscarClientes() {
    const modalBuscarCliente = await this.modalController.create({
      component: ListaClientesComponent,
      cssClass: 'my-custom-class-lista-clientes'
    });

    modalBuscarCliente.present();

    const { data, role } = await modalBuscarCliente.onWillDismiss();

    if (role === 'confirm') {
      this.clienteInformacion.get('nombre_razon_social').setValue(data.nombre_razon_social != null ? data.nombre_razon_social : '')
      this.clienteInformacion.get('rfc').setValue(data.rfc != null ? data.rfc : '')
      this.clienteInformacion.get('telefono').setValue(data.telefono != null ? data.telefono : '')
      this.clienteInformacion.get('Fecha').setValue(data.fecha != null ? data.fecha : '')
      this.clienteInformacion.get('tipo_servicio').setValue(data.tipo_servicio != null ? data.tipo_servicio : '')
      this.clienteInformacion.get('cp').setValue(data.cp != null ? data.cp : '')
      this.clienteInformacion.get('giro_empresarial').setValue(data.giro != null ? data.giro : '')
      this.clienteInformacion.get('colonia').setValue(data.colonia != null ? data.colonia : '')
      this.clienteInformacion.get('domicilio').setValue(data.domicilio != null ? data.domicilio : '')
      this.clienteInformacion.get('num_dom').setValue(data.num_dom != null ? data.num_dom : '')
      this.clienteInformacion.get('municipio').setValue(data.municipio != null ? data.municipio : '')
      this.clienteInformacion.get('estado').setValue(data.estado != null ? data.estado : '')
    }
  }

  async getinfoCliente() {
    const loading = await this.loadingController.create({
      message: 'Guardando información...'
    });
    loading.present();

    if (this.clienteInformacion.valid) {

      this.storageService.addValue('infoClientes', this.clienteInformacion.value);
      loading.dismiss();
      this.presentToast('Información del cliente guardada exitosamente', 'bottom', 'success');
      this.segment = 'Basculas'
    } else {
      this.presentToast('Todos los campos son obligatorios', 'bottom', 'warning');
      loading.dismiss();
      return;
    }

  }

  limpiarInfoCliente() {
    //Limpiar la infromación del formulario
    this.clienteInformacion.reset();
  }

  // OBTENER LA INFORMACIÓN DE LAS BASCULAS
  /*
  getControl(controlName: string) {
    return this.basculaInformacion.get(controlName);
  }
  */
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

  clasifiacionbasculas() {
    // Obtener los valores de alcance máximo y división mínima
    const alcanceMax = this.registroBasculas.get('alc_max').value; // Ej: "8/40"
    const divisionMin = this.registroBasculas.get('divi_min').value; // Ej: "5/10"
  
    // Validar formato
    const fraccionRegex = /^(\d+\/?)+$/;
    if (!fraccionRegex.test(alcanceMax) || !fraccionRegex.test(divisionMin)) {
      this.registroBasculas.get('clase').setValue('');
      return;
    }
  
    // Convertir a arrays de números
    const alcances = alcanceMax.split('/').map(Number); // [8, 40]
    const divisiones = divisionMin.split('/').map(Number); // [5, 10]
  
    if (alcances.length !== divisiones.length) {
      this.registroBasculas.get('clase').setValue('');
      return;
    }
  
    // Convertir a divisiones (n)
    const divisionesE = [];
    for (let i = 0; i < alcances.length; i++) {
      const alcanceGramos = alcances[i] * 1000; // Convertir a gramos
      const divisionGramos = divisiones[i]; // Ya está en gramos
      const e = alcanceGramos / divisionGramos;
      divisionesE.push(e); // Guardar n1, n2, n3...
    }
  
    // Determinar la clase más restrictiva
    let claseFinal = '4'; // Inicializamos con la clase más restrictiva
    for (const e of divisionesE) {
      if (e > 1000) {
        claseFinal = '3'; // Si excede Clase III (1000), pasamos a Clase II
      }
      if (e > 10_000) {
        claseFinal = '2'; // Si excede Clase II (10,000), pasamos a Clase I
      }
      if (e > 100_000) {
        claseFinal = '1'; // Si excede Clase I (100,000), pasamos a Especial
      }
    }
  
    // Determinar el peso mínimo
    const pesoMinimo = 20 * Math.min(...divisiones); // Basado en la división más pequeña
  
    // Asignar los valores calculados al formulario
    this.registroBasculas.get('clase').setValue(claseFinal);
  
    console.log(`Clase asignada: ${claseFinal}`);
    console.log(`Peso mínimo: ${pesoMinimo} g`);
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
    const basculaSeleccionada = e.detail.value;
    if (!basculaSeleccionada) {
      console.error("No se seleccionó una báscula.");
      return;
    }
  
    const { alc_max, divi_min, clase } = basculaSeleccionada;
    const alcances = alc_max.split('/').map(Number); // Alcances: n1, n2, n3
    const divisiones = divi_min.split('/').map(Number); // Divisiones: n1, n2, n3
  
    const tipoInspeccion: any = await this.storageService.getValue('infoBasculas').then(res => res);
    const tipoInspeccionSeleccionada = tipoInspeccion.tipo_inspeccion;
  
    const multiplicador =
      tipoInspeccionSeleccionada === "Inicial" ? 1 :
      tipoInspeccionSeleccionada === "Periódica" ? 2 :
      tipoInspeccionSeleccionada === "Extraordinaria" ? 3 : 1;
  
    // Peso mínimo
    const pesoMinimo = (20 * divisiones[0]) / 1000; // Siempre usa n1 de la división mínima en kg
    const precarga = alcances[alcances.length - 1]; // Máximo alcance (último valor de alcances)
  
    let arrayCargas: number[] = [];
    let arrayEMTs: number[] = [];
  
    // Función para redondear a múltiplos de 10 o 100 (excepto para la primera carga)
    const redondearCarga = (carga: number, isPrimeraCarga: boolean = false): number => {
      if (isPrimeraCarga) {
        return carga; // No redondear la primera carga
      }
      if (precarga <= 1000) {
        return Math.round(carga / 10) * 10; // Múltiplos de 10
      } else {
        return Math.round(carga / 100) * 100; // Múltiplos de 100
      }
    };
  
    // Función para calcular EMT según la escala activa
    const calcularEMT = (carga: number, division: number): number => {
      let escala1, escala2, escala3, emt1, emt2, emt3;
  
      if (clase === "2") {
        escala1 = division * 5000;
        escala2 = division * 20000;
        escala3 = division * 100000;
        emt1 = division * 0.5 * multiplicador;
        emt2 = division * 1 * multiplicador;
        emt3 = division * 1.5 * multiplicador;
      } else if (clase === "3") {
        escala1 = division * 500;
        escala2 = division * 2000;
        escala3 = division * 10000;
        emt1 = division * 0.5 * multiplicador;
        emt2 = division * 1 * multiplicador;
        emt3 = division * 1.5 * multiplicador;
      } else if (clase === "4") {
        escala1 = division * 50;
        escala2 = division * 200;
        escala3 = division * 1000;
        emt1 = division * 0.5 * multiplicador;
        emt2 = division * 1 * multiplicador;
        emt3 = division * 1.5 * multiplicador;
      }
  
      return carga * 1000 <= escala1 ? emt1 :
             carga * 1000 <= escala2 ? emt2 : emt3;
    };
  
    // Generar cargas y EMTs para 1 división
    const casoUnaDivision = () => {
      const step = (precarga - pesoMinimo) / 9; // Dividir en 9 pasos después del peso mínimo
  
      arrayCargas.push(redondearCarga(pesoMinimo, true)); // Primera carga sin redondear
      for (let i = 1; i < 10; i++) {
        const carga = pesoMinimo + step * i;
        arrayCargas.push(redondearCarga(carga));
      }
  
      arrayEMTs = arrayCargas.map((carga) => calcularEMT(carga, divisiones[0]));
    };
  
    // Generar cargas y EMTs para 2 divisiones
    const casoDosDivisiones = () => {
      const step1 = (alcances[0] - pesoMinimo) / 5; // 5 pasos para n1
      const step2 = (precarga - alcances[0]) / 4; // 4 pasos para n2
  
      arrayCargas.push(redondearCarga(pesoMinimo, true)); // Primera carga sin redondear
      for (let i = 1; i <= 5; i++) {
        const carga = pesoMinimo + step1 * i;
        arrayCargas.push(redondearCarga(carga));
      }
      for (let i = 1; i <= 4; i++) {
        const carga = alcances[0] + step2 * i;
        arrayCargas.push(redondearCarga(carga));
      }
  
      arrayEMTs = arrayCargas.map((carga) => {
        if (carga <= alcances[0]) return calcularEMT(carga, divisiones[0]);
        return calcularEMT(carga, divisiones[1]);
      });
    };
  
    // Generar cargas y EMTs para 3 divisiones
    const casoTresDivisiones = () => {
      const step1 = (alcances[0] - pesoMinimo) / 3; // 3 pasos para n1
      const step2 = (alcances[1] - alcances[0]) / 3; // 3 pasos para n2
      const step3 = (precarga - alcances[1]) / 3; // 3 pasos para n3
  
      arrayCargas.push(redondearCarga(pesoMinimo, true)); // Primera carga sin redondear
      for (let i = 1; i <= 3; i++) {
        const carga = pesoMinimo + step1 * i;
        arrayCargas.push(redondearCarga(carga));
      }
      for (let i = 1; i <= 3; i++) {
        const carga = alcances[0] + step2 * i;
        arrayCargas.push(redondearCarga(carga));
      }
      for (let i = 1; i <= 3; i++) {
        const carga = alcances[1] + step3 * i;
        arrayCargas.push(redondearCarga(carga));
      }
  
      arrayEMTs = arrayCargas.map((carga) => {
        if (carga <= alcances[0]) return calcularEMT(carga, divisiones[0]);
        if (carga <= alcances[1]) return calcularEMT(carga, divisiones[1]);
        return calcularEMT(carga, divisiones[2]);
      });
    };
  
    // Determinar el caso y generar las cargas y EMTs
    if (alcances.length === 1) {
      casoUnaDivision();
    } else if (alcances.length === 2) {
      casoDosDivisiones();
    } else if (alcances.length === 3) {
      casoTresDivisiones();
    }
  
    // Asignar los valores al formulario
    const arrayCargaUno = this.estudioMtro.get('ejemplo1') as FormArray;
    for (let i = 0; i < arrayCargas.length; i++) {
      if (i >= arrayCargaUno.length) {
        arrayCargaUno.push(this.fb.group({ carga: [''], emt: [''] }));
      }
      const group = arrayCargaUno.at(i) as FormGroup;
      group.get('carga').setValue(arrayCargas[i]);
      group.get('emt').setValue(arrayEMTs[i]);
    }
  
    console.log("Cargas calculadas (kg):", arrayCargas);
    console.log("EMTs calculados (g):", arrayEMTs);
  }
  
  
  
  
  
  

  limpiarEstudioMetro() {
    this.estudioMtro.reset();
  }



  // OBTENER LA INFORMACIÓN METROLOGICA
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

  // SECCIÓN ENCUESTA DE SATISFACCIÓN

  async encuestaSatifaccion() {
    // GUARDAR INFORMAICÓN
    if (this.infoPago.valid) {

      this.storageService.addValue('infoPago', this.infoPago.value);
      this.guardarFirmas();
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

  // SECCIÓN DE GUARDAR EL DICTAMEN EN FIREBASE
  async subirInformacion() {
    const infoCliente: any = await this.storageService.getValue('infoClientes');
    const infoPago: any = await this.storageService.getValue('infoPago');
    const infoVisuales: any = await this.storageService.getValue('inspeccionVisual');
    const encuesta: any = await this.storageService.getValue('encuesta_satisfaccion');
    const infoBasculas: any = await this.storageService.getValue('infoBasculas');
    const estudioMtro: any = await this.storageService.getValue('estudioMtro');
    const infoResumen: any = await this.storageService.getValue('resumen');

    const firmaInspector: any = await this.storageService.getValue('firmaInspectorBase64');
    const firmaCliente: any = await this.storageService.getValue('firmaClienteBase64');
    const firmaPa: any = await this.storageService.getValue('firmaApoyoBase64');

    const user: any = await this.storageService.getValue('usuario');

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

      this.dicamenFinal.get('firmaInspector').setValue(firmaInspector);
      this.dicamenFinal.get('firmaCliente').setValue(firmaCliente);
      this.dicamenFinal.get('firmaPa').setValue(firmaPa);

      if (this.dicamenFinal.valid) {
        try {
          this.dictamenSerivce.addReporte(this.dicamenFinal.value).then((res) => {
            this.presentToast('Reporte guardado correctamente', "bottom", "success")
          })
        } catch (error) {
          this.presentToast('Error al guardar el reporte:' + error.message, "bottom", "danger")
        }
      }
    } else {
      console.log("No hay información para guardar por ahora")
    }
  }

  // SECCCIÓN DEL DICTAMEN
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

  // IMPRIMIR Y/O GENERAR PDF
  async imprimirReporte() {
    const infoCliente = await this.storageService.getValue('infoClientes');
    const infoPago = await this.storageService.getValue('infoPago');
    const infoVisuales = await this.storageService.getValue('inspeccionVisual');
    const encuesta = await this.storageService.getValue('encuesta_satisfaccion');
    const infoBasculas = await this.storageService.getValue('infoBasculas');
    const estudioMtro = await this.storageService.getValue('estudioMtro');
    const infoResumen = await this.storageService.getValue('resumen');

    const firmaInspectorBase64 = await this.storageService.getValue('firmaInspectorBase64');
    const firmaClienteBase64 = await this.storageService.getValue('firmaClienteBase64');
    const firmaApoyoBase64 = await this.storageService.getValue('firmaApoyoBase64');

    const usuario = await this.storageService.getValue('usuario');

    this.generarReporteService.generarReporte(
      infoCliente,
      infoPago,
      infoVisuales,
      encuesta,
      infoBasculas,
      estudioMtro,
      infoResumen,
      firmaInspectorBase64,
      firmaClienteBase64,
      firmaApoyoBase64,
      usuario
    ).then((res: any) => {
      console.log(res);
    })
  }

}