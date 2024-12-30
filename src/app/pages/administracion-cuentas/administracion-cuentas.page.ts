import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { DetalleCuentaComponent } from 'src/app/components/adminCuentas/detalle-cuenta/detalle-cuenta.component';
import { AgregarCuentaComponent } from 'src/app/components/adminCuentas/agregar-cuenta/agregar-cuenta.component';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCarService } from 'src/app/services/actividades/addCar/add-car.service';
import { AutosComponent } from 'src/app/components/modales-usuario/autos/autos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposComponent } from 'src/app/components/modales-usuario/equipos/equipos.component';
import { VerEquipoComponent } from 'src/app/components/modales-usuario/ver-equipo/ver-equipo/ver-equipo.component';


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

      this.informacionUsuario.get('id').setValue(this.usuarioDetalles.id)

      this.informacionUsuario.get('usuario').setValue(this.usuarioDetalles.usuario)
      this.informacionUsuario.get('email').setValue(this.usuarioDetalles.email)
      this.informacionUsuario.get('role').setValue(this.usuarioDetalles.role)

      // Autos y herraminetas
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
        const id = this.informacionUsuario.get('id').value;
        const user = this.informacionUsuario.get('usuario').value;
        const role = this.informacionUsuario.get('role').value

        this.authService.updateUserFields(id,user,role);
        this.getInformacion()
        
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

  // Seección de herramientas
  async administrarEquipo(){
    const modalHerramientas = await this.modalController.create({
      component: EquiposComponent,
      cssClass:'modalHerramientas',
      componentProps: {
        detallesUsuario: this.usuarioDetalles
      }
    });

    modalHerramientas.present();
  }

  // Consultar las herramientas del usuario
  async consultarEquipo(){
    const modalVerEquipo = await this.modalController.create({
      component: VerEquipoComponent,
      cssClass:'modalVerEquipo',
      componentProps: {
        detallesUsuario: this.usuarioDetalles
      }
    });

    modalVerEquipo.present();
  }

  tieneHerramientas(tools:any){
    if(tools != undefined){
      return tools.length != 0 ? true: false;
    }else{
      return false;
    }
  }

  tieneAutos(auto:any):boolean{
    if(auto!= undefined){
      return auto.length != 0 ? true: false;
    }else{
      return false;
    }
  }


}
