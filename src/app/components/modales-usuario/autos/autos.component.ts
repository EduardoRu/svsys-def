import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

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

  // Este es el arreglo para guardar los autos a los que el ususario ha seleccionado
  public autosSeleccionados:any = []

  // Obtener la informaicón de los usuarios
  @Input() detallesUsuario:any;

  constructor(
    private modalController: ModalController,
    private carService: AddCarService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion(){
    this.carService.getCar().subscribe({
      next: (car) => {
        this.autos = car
        this.results = car

        this.detallesUsuario.autos.forEach((element:any) => {
          const autosDelUsuario = this.autos.filter((auto:any) => auto.id == element.id);
          this.autosSeleccionados.push(autosDelUsuario[0])
        });
      },
      error: (error) => {
        console.log('Error: '+ error.message);
      }
    });
  }

  buscarAuto(e:any){
    const query:any = e.target.value.toLowerCase();
    this.results = this.autos.filter((d:any) => d.placa.toLowerCase().indexOf(query) > -1);
  }

  asignarAuto(auto:any){
    const index = this.autosSeleccionados.indexOf(auto);
    
    if(index === -1){
      this.autosSeleccionados.push(auto);
    }else{
      this.autosSeleccionados.splice(index, 1);
    }

    try {
      const autosParaAegrear = this.autosSeleccionados.map((item:any) => {
        return {
          id: item.id,
          placa: item.placa
        }
      })

      this.detallesUsuario.autos = autosParaAegrear;
      
      this.authservice.updateUser(this.detallesUsuario).then((res) => {
        console.log(res);
      });


      this.autosSeleccionados = []

    } catch (error) {
      console.error('El error ha sido: ', error)
    }
  }

  isAutoSelected(item:any): boolean{
    return this.autosSeleccionados.includes(item)
  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
