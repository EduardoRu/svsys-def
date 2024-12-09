import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { DetalleCuentaComponent } from 'src/app/components/adminCuentas/detalle-cuenta/detalle-cuenta.component';
import { AgregarCuentaComponent } from 'src/app/components/adminCuentas/agregar-cuenta/agregar-cuenta.component';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-administracion-cuentas',
  templateUrl: './administracion-cuentas.page.html',
  styleUrls: ['./administracion-cuentas.page.scss'],
})
export class AdministracionCuentasPage implements OnInit {

  public usuariosRegistrados:any = [];
  public usuarioDetalles:any = [];

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async presentToast(mesage: string, position: 'top' | 'middle' | 'bottom', cl: "danger" | "success" | "warning") {
    const toast = await this.toastController.create({
      message: mesage,
      duration: 1500,
      position: position,
      color: cl
    });

    await toast.present();
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
    this.usuarioDetalles = usuario;
    console.log(this.usuarioDetalles);
  }

  async editUser(usuario:any){
    if(usuario.length != 0){
      const modalUserUpdate = await this.modalController.create({
        component: DetalleCuentaComponent,
        componentProps: {
          usuario
        },
        cssClass: 'modalUsuarios'
      });
  
      modalUserUpdate.present();
    }else{
      this.presentToast('Favor de seleccionar un usuario' , 'bottom', 'warning');
    }
    
  }


}
