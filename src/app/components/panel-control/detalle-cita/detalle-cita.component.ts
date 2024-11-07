import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DetalleCitaComponent implements OnInit {

  @Input() cita: any;

  citaInformacion: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertConoller: AlertController,
    private citasService: CitasService
  ) { }

  ngOnInit() {
    this.citaInformacion = this.fb.group({
      id: [this.cita.id],
      nombre_razon_social: [this.cita.nombre_razon_social, [Validators.required]],
      telefono: [this.cita.telefono, [Validators.required]],
      fecha: [this.cita.fecha, [Validators.required]],
      tipo_servicio: [this.cita.tipo_servicio, [Validators.required]],
      domicilio: [this.cita.domicilio, [Validators.required]],
      num: [this.cita.num, [Validators.required]],
      colonia: [this.cita.colonia, [Validators.required]],
      municipio: [this.cita.municipio, [Validators.required]],
      estado: [this.cita.estado, [Validators.required]],
      cp: [this.cita.cp, [Validators.required]],
      giro: [this.cita.giro, [Validators.required]],
      creado_en: [this.cita.creado_en, [Validators.required]]
    });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  async editarCita() {
    const loading = await this.loadingController.create({
      message: 'Actualizando cita...'
    });
    await loading.present();
    if (this.citaInformacion.valid) {
      this.citasService.updateCita(this.citaInformacion.value);

      const alertCitaInformacion = await this.alertConoller.create({
        header: 'Cita actualizada',
        message: 'La cita ha sido actualizado exitosamente',
        buttons: ['OK']
      });

      await alertCitaInformacion.present();

      this.modalController.dismiss(null, 'confirm');
    } else {
      const alertCitaInformacion = await this.alertConoller.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios',
        buttons: ['OK']
      });
      await alertCitaInformacion.present();
    }

    await loading.dismiss();
  }

  async eliminarCita() {
    const alertCitaInformacion = await this.alertConoller.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro de eliminar la cita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: async () => {
    
            this.citasService.deleteCita(this.cita.id);


            const loading = await this.loadingController.create({
              message: 'Eliminando cita...'
            });
            loading.present();

            this.modalController.dismiss(null, 'confirm');

            await loading.dismiss();
          }
        }
      ]
    });

    alertCitaInformacion.present();


  }

}
