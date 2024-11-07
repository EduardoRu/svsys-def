import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class DetalleCuentaComponent  implements OnInit {

  informacionUsuario: FormGroup;

  @Input() usuario: any;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private loadController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.informacionUsuario = this.fb.group({
      uid: [this.usuario.id, [Validators.required]],
      usuario: [this.usuario.usuario, [Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      password: [''],
      role: [this.usuario.role, [Validators.required, Validators.required]]
    })
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getInformacionUsuario(){

    const load = await this.loadController.create({
      message: 'Espere un momento...'
    });

    load.present();

    if(this.informacionUsuario.valid){
      
      this.authService.updateUser(this.informacionUsuario.value).then((res) => {
        console.log(res);
        this.presentAlert('Usuario actualizado exitosamente');
        load.dismiss();
      }).catch((error) => {
        console.log(error);
        this.presentAlert('Error al actualizar el usuario');
        load.dismiss();
      });
      
      

      load.dismiss();

      // this.modalController.dismiss(this.informacionUsuario.value, 'close');
    }else{
      this.presentAlert('Favor de completar toda la información');
      load.dismiss();
    }

  }



  limpiarFormulario(){
    this.informacionUsuario.reset();
  }

  

  async cancel() {
    await this.modalController.dismiss(null, 'cancel');
  }

}
