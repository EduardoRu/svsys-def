import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { DetalleCuentaComponent } from 'src/app/components/adminCuentas/detalle-cuenta/detalle-cuenta.component';
import { AgregarCuentaComponent } from 'src/app/components/adminCuentas/agregar-cuenta/agregar-cuenta.component';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-administracion-cuentas',
  templateUrl: './administracion-cuentas.page.html',
  styleUrls: ['./administracion-cuentas.page.scss'],
})
export class AdministracionCuentasPage implements OnInit {

  public usuariosRegistrados:any = [];

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadController: LoadingController
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion(){
    (await this.authService.getUsers()).subscribe({
      next: (users) => {
        this.usuariosRegistrados = users;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  async addUser(){
    const modalUserCreate = await this.modalController.create({
      component: AgregarCuentaComponent,
      cssClass: 'modalUsuarios'
    });

    modalUserCreate.present();
  }

  async detailUser(usuario:any){
    const modalUserUpdate = await this.modalController.create({
      component: DetalleCuentaComponent,
      componentProps: {
        usuario
      },
      cssClass: 'modalUsuarios'
    });

    modalUserUpdate.present();
  }


}
