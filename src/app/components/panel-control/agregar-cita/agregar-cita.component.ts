import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';
import { CodigosPService } from 'src/app/services/cod_pos/codigos-p.service';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule,CommonModule,ReactiveFormsModule]
})
export class AgregarCitaComponent  implements OnInit {

  citaInformacion: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertConoller: AlertController,
    private citasService: CitasService,
    private codpos: CodigosPService
  ) { }

  private codigosPostales:any;

  get nombre_razon_social() {
    return this.citaInformacion.get('nombre_razon_social');
  }

  get telefono() {
    return this.citaInformacion.get('telefono');
  }
  get fecha() {
    return this.citaInformacion.get('fecha');
  }
  get tipo_servicio() {
    return this.citaInformacion.get('tipo_servicio');
  }
  get domicilio() {
    return this.citaInformacion.get('domicilio');
  }
  get num() {
    return this.citaInformacion.get('num');
  }
  get colonia() {
    return this.citaInformacion.get('colonia');
  }
  get municipio() {
    return this.citaInformacion.get('municipio');
  }
  get estado() {
    return this.citaInformacion.get('estado');
  }
  get cp() {
    return this.citaInformacion.get('cp');
  }
  get giro() {
    return this.citaInformacion.get('giro');
  }

  ngOnInit() {
    this.getInfromacion();

    this.citaInformacion = this.fb.group({
      nombre_razon_social: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      tipo_servicio: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      num: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      giro: ['', [Validators.required]],
      creado_en: ['']
    });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  async getInfromacion() {
    this.codpos.getData().subscribe({
      next:(data) => {
        this.codigosPostales = data;
      },
      error: error => {
        console.error('Error al obtener la información de códigos postales', error);
      }
    })
  }

  handleInput(event:any){
    const query = event.target.value;
    
    if(query.length === 5){
      const informacion = this.codigosPostales.find((d:any) => d.d_codigo == query);
      console.log(informacion);
      if(informacion){
        this.citaInformacion.get('municipio').setValue(informacion.D_mnpio);
        this.citaInformacion.get('estado').setValue(informacion.d_estado);
      }
    }
  }

  async getCita(){
    const loading = await this.loadingController.create({
      message: 'Generando cita...'
    });
    await loading.present();
    const fechaActual: Date = new Date();

    if(this.citaInformacion.valid){
      this.citaInformacion.get('creado_en').setValue(fechaActual.toLocaleString());

      this.citasService.addCita(this.citaInformacion.value);

      const alertCitaInformacion = await this.alertConoller.create({
        header: 'Cita generada',
        message: 'La cita ha sido generada exitosamente',
        buttons: ['OK']
      });

      await alertCitaInformacion.present();

      this.modalController.dismiss(null, 'confirm');
    }else{
      const alertCitaInformacion = await this.alertConoller.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios',
        buttons: ['OK']
      });
      await alertCitaInformacion.present();
    }

    await loading.dismiss();
  }

}
