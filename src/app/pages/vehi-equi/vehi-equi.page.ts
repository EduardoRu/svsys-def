import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddCarComponent } from 'src/app/components/add-car/add-car.component';
import { AddToolComponent } from 'src/app/components/add-tool/add-tool.component';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { EditCarComponent } from 'src/app/components/edit-car/edit-car.component';
import { EditToolComponent } from 'src/app/components/edit-tool/edit-tool.component';

@Component({
  selector: 'app-vehi-equi',
  templateUrl: './vehi-equi.page.html',
  styleUrls: ['./vehi-equi.page.scss'],
})
export class VehiEquiPage implements OnInit {

  public autos:any = []

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private carService: AddCarService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion(){
    this.carService.getCar().subscribe({
      next: (car) => {
        this.autos = car
      },
      error: (error) => {
        console.error(error);
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

}
