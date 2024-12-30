import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AddCarComponent } from 'src/app/components/add-car/add-car.component';
import { AddToolComponent } from 'src/app/components/add-tool/add-tool.component';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { EditCarComponent } from 'src/app/components/edit-car/edit-car.component';
import { EditToolComponent } from 'src/app/components/edit-tool/edit-tool.component';
import { AddToolService } from 'src/app/services/actividades/addTool/add-tool.service';

@Component({
  selector: 'app-vehi-equi',
  templateUrl: './vehi-equi.page.html',
  styleUrls: ['./vehi-equi.page.scss'],
})
export class VehiEquiPage implements OnInit {

  public autos:any = []
  public herramientas:any = [];

  // Resultados de autos y herraminetas
  public carResult: any = [];
  public toolResult: any = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private carService: AddCarService,
    private toolService: AddToolService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getInformacion();
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

  async getInformacion(){
    this.carService.getCar().subscribe({
      next: (car) => {
        this.autos = car
        this.carResult = car
      },
      error: (error) => {
        this.presentToast('Error: '+ error.message, 'bottom', 'danger');
      }
    });

    this.toolService.getTool().subscribe({
      next: (data) => {
        this.herramientas = data;
        this.toolResult = data
      },
      error: (error) => {
        this.presentToast('Error: '+ error.message, 'bottom', 'danger');
      }
    })
  }

  async addNewCar(){
    const modalCar = await this.modalController.create({
      component: AddCarComponent,
      cssClass: 'modalAutos'
    });

    modalCar.present();
  }

  async addNewTool(){
    const modalTool = await this.modalController.create({
      component: AddToolComponent,
      cssClass: 'modalCitas'
    });

    modalTool.present();

  }

  async editarAuto(auto:any){
    const modalEditarAuto = await this.modalController.create({
      component: EditCarComponent,
      componentProps: {
        autoEditar: auto
      },
      cssClass: 'modalAutos'
    });

    modalEditarAuto.present();
  }

  async editarHerramienta(tool:any) {
    const modalEditarHerramienta = await this.modalController.create({
      component: EditToolComponent,
      componentProps: {
        toolEditar: tool
      },
      cssClass: 'modalCitas'
    });

    modalEditarHerramienta.present();
  }
  // METODOS DE BUSQUEDA
  async handleSearchTool(e:any){
    const query = e.target.value.toLowerCase();

    this.toolResult = this.herramientas.filter((d: any) =>  d.identificacion.toLowerCase().indexOf(query) > -1);
  }

  async handleSearchCar(e:any){
    const query = e.target.value.toLowerCase();
    this.carResult = this.autos.filter((d: any) => d.placa.toLowerCase().indexOf(query) > -1);
  }

}
