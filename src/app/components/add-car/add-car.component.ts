import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddCarComponent  implements OnInit {

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
      placa: ['', Validators.required],
      estado: ['disponible'],
      usuario: ['']
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
      this.addCarService.addCar(this.auto.value).then(() => {
        this.modalController.dismiss();
        this.auto.reset();
        this.presentToast("Auto agregado exitosamente!", "bottom", "success");
      })
    }else{
      this.presentToast("Favor de completar todos los campos!", "bottom", "warning");
    }
  }

}
