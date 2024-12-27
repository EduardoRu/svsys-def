import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class AutosComponent  implements OnInit {

  public autos:any = []
  public results:any = []

  constructor(
    private modalController: ModalController,
    private carService: AddCarService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion(){
    this.carService.getCar().subscribe({
      next: (car) => {
        this.autos = car
        this.results = car
      },
      error: (error) => {
        console.log('Error: '+ error.message);
      }
    })
  }

  buscarAuto(e:any){
    const query:any = e.target.value.toLowerCase();
    this.results = this.autos.filter((d:any) => d.placa.toLowerCase().indexOf(query) > -1);
  }

  asignarAuto(auto:any){
    console.log(auto)
  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
