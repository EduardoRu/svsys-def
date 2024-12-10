import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FilesService } from 'src/app/services/files-sistema/files.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  public usuario: any = [];

  constructor(
    private storageSerive: StorageService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadController: LoadingController,
    private fileService: FilesService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getInformacion()
    }, 500);
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
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

  async getInformacion() {
    const usuario = await this.storageSerive.getValue('usuario');
    this.usuario = usuario;
  }

  async crearCarpeta() {
    const loadCarpeta = await this.loadController.create({
      message: 'Creando carpeta...'
    });

    loadCarpeta.present();

    setTimeout(() => {
      try {
        this.fileService.createCarpeta('svsys-data').then((data: any) => { console.log(data.stack) });
        loadCarpeta.dismiss();
        this.presentToast('Carpeta creada exitosamente', 'bottom', 'success');
        this.descargarContenido();
      } catch (error) {
        loadCarpeta.dismiss();
        this.presentToast('Algo salio mal vuelve a intentarlo', 'bottom', 'danger');
      }
    }, 2000);


  }

  async descargarContenido() {
    const loadData = await this.loadController.create({
      message: 'Descargando contenido...'
    });
    loadData.present();

    setTimeout(() => {
      console.log('Cargando....')

      loadData.dismiss();
    }, 2000);
  }

}
