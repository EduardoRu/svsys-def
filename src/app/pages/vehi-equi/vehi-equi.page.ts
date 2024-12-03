import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddCarComponent } from 'src/app/components/add-car/add-car.component';
import { AddToolComponent } from 'src/app/components/add-tool/add-tool.component';

@Component({
  selector: 'app-vehi-equi',
  templateUrl: './vehi-equi.page.html',
  styleUrls: ['./vehi-equi.page.scss'],
})
export class VehiEquiPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async addNewCar(){
    const modalCar = await this.modalController.create({
      component: AddCarComponent
    });

    modalCar.present();
  }

  async addNewTool(){
    const modalTool = await this.modalController.create({
      component: AddToolComponent
    });

    modalTool.present();
  }

}
