import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { DetalleCuentaComponent } from 'src/app/components/adminCuentas/detalle-cuenta/detalle-cuenta.component';
import { AgregarCuentaComponent } from 'src/app/components/adminCuentas/agregar-cuenta/agregar-cuenta.component';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { AutosComponent } from 'src/app/components/modales-usuario/autos/autos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-administracion-cuentas',
  templateUrl: './administracion-cuentas.page.html',
  styleUrls: ['./administracion-cuentas.page.scss'],
})
export class AdministracionCuentasPage implements OnInit {

  informacionUsuario: FormGroup;

  public usuariosRegistrados:any = [];
  public usuarioDetalles:any = [];
  public autos:any = [];
  public editarUsuaio:boolean = false;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadController: LoadingController,
    private toastController: ToastController,
    private autoService: AddCarService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getInformacion();

    // AQUÍ comienza el formulario para la edición de un usuario
    this.informacionUsuario = this.formbuilder.group({
      id: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', [Validators.required, Validators.required]],
      autos: [[]],
      herramientas: [[]]
    });
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
    });
  }

  async addUser(){
    const modalUserCreate = await this.modalController.create({
      component: AgregarCuentaComponent,
      cssClass: 'modalUsuarios'
    });

    modalUserCreate.present();
  }

  async detailUser(usuario:any){
    if(this.editarUsuaio == false){
      this.usuarioDetalles = usuario;
      console.log(this.usuarioDetalles)

      this.informacionUsuario.get('id').setValue(this.usuarioDetalles.id)

      this.informacionUsuario.get('usuario').setValue(this.usuarioDetalles.usuario)
      this.informacionUsuario.get('email').setValue(this.usuarioDetalles.email)
      this.informacionUsuario.get('role').setValue(this.usuarioDetalles.role)

      // Autos y herraminetas
      this.informacionUsuario.get('autos').setValue(this.usuarioDetalles.autos)
      this.informacionUsuario.get('herramientas').setValue(this.usuarioDetalles.herramientas)
    }else{
      this.presentToast('Se esta editando un usuario', 'bottom', 'warning')
    }
  }

  async editUser(usuario:any){
    if(this.usuarioDetalles.length != 0){
      this.editarUsuaio = true;
    }else{
      this.presentToast('Favor de seleccionar un usuario (DETALLES)' , 'bottom','warning');
    }
  }

  async guardarDetallesUsuario() {
    this.editarUsuaio = false;
    try {
      if(this.informacionUsuario.valid){
        this.authService.updateUser(this.informacionUsuario.value);
        this.usuarioDetalles = this.informacionUsuario.value;

        this.presentToast('Detalles actualizados correctamente' , 'bottom','success');
      }else{
        this.presentToast('Todos los campos son obligatorios', 'bottom','danger');
        return;
      }
    } catch (error) {
      this.presentToast('Algo ha salido mal, revisa la informaicón' , 'bottom','danger');
    }
    
  }

  async buscarAutoModal(){
    const modalCarSearch = await this.modalController.create({
      component: AutosComponent,
      cssClass:'modalCarSearch'
    });

    modalCarSearch.present();

    
  }

  async administrarAutosUsuarios(){
    const modalAutosUsuario = await this.modalController.create({
      component: AutosComponent,
      cssClass:'modalAutosUsuario',
      componentProps: {
        detallesUsuario: this.usuarioDetalles
      }
    });

    modalAutosUsuario.present();

    modalAutosUsuario.onDidDismiss().then((data) => {
      if(data.data){
        this.autos = data.data;
      }
    });
  }


}
