import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';


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
      resultado: ['']
    });

    this.getInformacion();
  }

  async getInformacion(){
    let encuesta_satisfaccion = await this.storage.getValue('encuesta_satisfaccion');
    if(encuesta_satisfaccion){
      this.encuesta.patchValue(encuesta_satisfaccion);
    }
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj
    });

    await alert.present();
  }

  async guardarEncuesta() {
    const load = await this.loadingController.create({
      message: 'Guardando encuensta....'
    });

    load.present();

    if (this.encuesta.valid) {
      console.log(this.encuesta.value);

      let tiempo_respuesta = this.encuesta.get('tiempo_respuesta').value;
      let calidad = this.encuesta.get('calidad').value;
      let atencion = this.encuesta.get('atencion').value;
      let mala_conducta_personal = this.encuesta.get('mala_conducta_personal').value;

      let promedioValor = (Number(tiempo_respuesta) + Number(calidad) + Number(atencion) + Number(mala_conducta_personal))/4

      if(promedioValor) {
        this.encuesta.get('resultado').setValue(promedioValor);
      }else{
        this.encuesta.get('resultado').setValue(0);
      }
      
      await this.storage.addValue('encuesta_satisfaccion', this.encuesta.value);
      load.dismiss();
      this.presentAlert('Encuesta guardada correctamente');
      this.modalController.dismiss();
    } else {
      this.presentAlert('Favor de completar todos los campos')
      load.dismiss();
    }
  }

  async cancel(){
    this.modalController.dismiss(null, 'cancel');
  }

}
