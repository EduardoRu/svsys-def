import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { EncuestaSatifaccionComponent } from '../encuesta-satifaccion/encuesta-satifaccion.component';

@Component({
  selector: 'app-generar-reporte-desktop',
  templateUrl: './generar-reporte-desktop.component.html',
  styleUrls: ['./generar-reporte-desktop.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true

})
export class GenerarReporteDesktopComponent implements OnInit {

  public citasProgramadas: any = [];


  public segment = "infoClientes";

  // Información del cliente
  clienteInformacion: FormGroup;


  // Sección De Registro para las basculas
  basculaInformacion: FormGroup;
  registroBasculas: FormGroup;
  public basculas: any = [];


  estudioMtro: FormGroup
  public basculasMetro: any = [];

  public basculaResumen: any = []

  // Inspección visual
  basculasVisual: any = []
  inspeccionVisual: FormGroup;

  storageInfoVisual: any = [];

  //RESUMEN
  resumen: FormGroup;
  storageInfoResumen:any = []

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private storageService: StorageService,
    private alertController: AlertController,
    private citasService: CitasService,
    private modalController: ModalController
  ) { }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.infoClientes();
  }

  ngOnInit() {
    // Inzilializar la información del cliente
    this.clienteInformacion = this.fb.group({
      nombre_razon_social: ['', Validators.required],
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
      precarga: ['', Validators.required],
      alc_max: [{ value: '', disabled: true }],
      divi_max: [{ value: '', disabled: true }],
      clase_ex: [{ value: '', disabled: true }]
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

  }

  async infoClientes() {
    this.citasService.getCitaProgramada().subscribe({
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
    this.segment = event.detail.value;


    if (this.segment === 'infoClientes') {
      this.storageService.getValue('infoClientes').then(res => {
        if (res != undefined) {
          this.clienteInformacion.get('nombre_razon_social').setValue(res.nombre_razon_social)
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
      });
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
    } else if (this.segment == 'Resumen'){
      this.storageService.getValue('resumen').then(res => {
        if (res!= undefined) {
          this.storageInfoResumen = res
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

  }


  async getInfoVisual() {

  }


  getBascula() {
    // Obtener la información de las basculas
    if (this.registroBasculas.valid) {
      this.basculas.push(this.registroBasculas.value);
      this.registroBasculas.reset();
    } else {
      this.presentAlert('Favor de completar todos los campos para generar un registro de la bascula');
    }
  }

  eliminarBascula(item: any) {
    this.basculas.splice(item, 1)
  }

  guardarInformacion() {
    this.basculaInformacion.get('basculas').setValue(this.basculas);

    if (this.basculaInformacion.valid) {
      this.storageService.addValue('infoBasculas', this.basculaInformacion.value);
      this.presentAlert('Información guardada exitosamente');
    } else {
      this.presentAlert('Todos los campos son obligatorios para generar un registro de las basculas');
    }
  }


  infoBasculaMtro(e: any) {
    this.estudioMtro.get('alc_max').setValue(e.detail.value.alcance_max)
    this.estudioMtro.get('divi_max').setValue(e.detail.value.divi_max)
    this.estudioMtro.get('clase_ex').setValue(e.detail.value.clase)
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

  loadInfoVisuales(event: any) {
    const infoBascula = event.detail.value;

    if (infoBascula) {
      const inspecciones = [this.storageInfoVisual];
      const result = inspecciones.find((item: any) => item.basculaInspeccion.alcance_max == infoBascula.alcance_max &&
        item.basculaInspeccion.marca == infoBascula.marca &&
        item.basculaInspeccion.modelo == infoBascula.modelo &&
        item.basculaInspeccion.no_serie == infoBascula.no_serie &&
        item.basculaInspeccion.tipo_bascula == infoBascula.tipo_bascula &&
        item.basculaInspeccion.clase == infoBascula.clase &&
        item.basculaInspeccion.divi_max == infoBascula.divi_max
      )
      
      if(result){
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
      
    }
  }


  async encuestaSatifaccion() {
    const modalEncuestaSatisfied = await this.modalController.create({
      component: EncuestaSatifaccionComponent,
      cssClass: "modalCitas"
    });

    modalEncuestaSatisfied.present();
  }

  infoBasculaResumen(e: any) {
    this.basculaResumen = e.detail.value;

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
      
      
      if(result){
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

    if(this.resumen.valid){

      this.storageService.addValue('resumen', this.resumen.value);

      this.presentAlert('Datos guardados correctamente');
      load.dismiss();
    }else{
      load.dismiss();
      this.presentAlert('Todos los campos son obligatorios');
    }
  }



}
