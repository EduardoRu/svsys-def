import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { AddToolService } from 'src/app/services/actividades/addTool/add-tool.service';

@Component({
  selector: 'app-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./edit-tool.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule]
})
export class EditToolComponent  implements OnInit {

  @Input() toolEditar: any; // Recibirá el objeto "auto"
  public editarPesaDetalles: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private toolService: AddToolService
  ) { }

  ngOnInit() {
    this.editarPesaDetalles = this.fb.group({
      id: [this.toolEditar.id],
      identificacion: [this.toolEditar.identificacion, Validators.required],
      tipo_instrumento: [this.toolEditar.tipo_instrumento, Validators.required],
      marca: [this.toolEditar.marca, Validators.required],
      modelo: [this.toolEditar.modelo, Validators.required],
      no_serie: [this.toolEditar.no_serie, Validators.required],
      capacidad: [this.toolEditar.capacidad, Validators.required],
      clase_exactitud: [this.toolEditar.clase_exactitud, Validators.required],
      observaciones: [this.toolEditar.observaciones, Validators.required],
      estado: [this.toolEditar.estado, Validators.required]
    });
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

  async cancel(){
    this.modalController.dismiss();
  }

  async editarPesa(){
    const loadEdit  = await this.loadingController.create({
      message: 'Editando pesa...'
    });

    loadEdit.present();
    
    if(this.editarPesaDetalles.valid){
      try {
        this.toolService.updateTool(this.editarPesaDetalles.value).then(() => {
          loadEdit.dismiss();
          this.modalController.dismiss();
          this.presentToast('Pesa editada exitosamente!', 'bottom','success');
        })
      } catch (error) {
        loadEdit.dismiss();
        this.presentToast('Algo salio mal' + error.message, 'bottom','danger');
      }
    }else{
      loadEdit.dismiss();
      this.presentToast('Favor de completar todos los campos', 'bottom', 'warning');
    }
  }

  async borrarPesa(){
    const loadDelete  = await this.loadingController.create({
      message: 'Borrando pesa...'
    });
    
    loadDelete.present();
    
    if(this.toolEditar.estado === 'disponible'){
      this.presentToast('Equipo en uso', 'bottom', 'danger');
    }else{
      try {
        this.toolService.deleteTool(this.toolEditar.id).then(() => {
          loadDelete.dismiss();
          this.modalController.dismiss();
          this.presentToast('Pesa borrada exitosamente!', 'bottom','success');
        })
      } catch (error) {
        loadDelete.dismiss();
        this.presentToast('Algo salio mal' + error.message, 'bottom','danger'); 
      }
    }
    
  }

}
