import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';


@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AgregarCuentaComponent implements OnInit {

  informacionUsuario: FormGroup

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }



  ngOnInit() {


    this.informacionUsuario = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.required]],
      role: ['', [Validators.required, Validators.required]]
    })
  }



  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getInformacionUsuario() {

    const load = await this.loadingController.create({
      message: 'Espere un momento...'
    });

    load.present();

    if (this.informacionUsuario.valid) {
      const userInfo = this.informacionUsuario.value;
      console.log(userInfo)

      this.authService.register(userInfo).then((res) => {
        console.log(res);
        this.limpiarFormulario();
      });

      this.presentAlert('Se ha agregado el usuario correctamente...');
      load.dismiss();
    } else {
      this.presentAlert('Todos los campos son obligatorios');
      load.dismiss();
    }

  }

  async cancel() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async limpiarFormulario() {
    this.informacionUsuario.reset();
  }

}
