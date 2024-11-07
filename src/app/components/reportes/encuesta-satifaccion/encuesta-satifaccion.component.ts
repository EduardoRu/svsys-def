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
      resultado: ['', Validators.required]
    })  
  }

  async guardarEncuesta() {
    if (this.encuesta.valid) {
      console.log(this.encuesta.value);
      await this.storage.addValue('encuesta_satisfaccion', this.encuesta.value);
    } else {
      console.error('La encuesta es inválida');
    }
  }

  async cancel(){
    this.modalController.dismiss(null, 'cancel');
  }

}
