import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditCarComponent  implements OnInit {

  @Input() autoEditar: any; // Recibirá el objeto "auto"

  public auto: FormGroup

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private addCarService: AddCarService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.auto = this.fb.group({
      placa: [this.autoEditar.placa, Validators.required],
      id: [this.autoEditar.id, Validators.required],
      estado: [this.autoEditar.estado],
      usuario: [this.autoEditar.usuario]
    });
  }

  async presentToast(msg: string, position: 'top' | 'middle' | 'bottom', color: "danger" | "dark" | "light" | "success" | "warning") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }

  async cancel(){
    await this.modalController.dismiss();
  }

  async guardarAuto(){
    if(this.auto.valid){
      this.addCarService.updateCar(this.auto.value).then(() => {
        this.modalController.dismiss();
        this.auto.reset();
        this.presentToast("Auto agregado exitosamente!", "bottom", "success");
      })
    }else{
      this.presentToast("Favor de completar todos los campos!", "bottom", "warning");
    }
  }

  async borrar(){
    const loading = await this.loadingController.create({
      message: 'Borrando auto...'
    });
    await loading.present();

    this.addCarService.deleteCar(this.auto.value.id).then(() => {
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Auto eliminado exitosamente!", "bottom", "success");
    })
  }

}
