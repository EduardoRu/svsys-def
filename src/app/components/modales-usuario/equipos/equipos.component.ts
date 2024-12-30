import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AddToolService } from 'src/app/services/actividades/addTool/add-tool.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EquiposComponent  implements OnInit {
  // Obtener la informaicón del usuario
  @Input() detallesUsuario:any;
  public user:string;

  // Array para guardar los autos seleccionados
  public herramientasSeleccionadas:any = []

  // Array de herramientas y barra de buscqueda
  public herramientas:any = [];
  public results:any = [];

  constructor(
    private modalController: ModalController,
    private toolService: AddToolService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion(){
    this.toolService.getTool().subscribe({
      next: (tools) => {
        this.herramientas = tools;
        this.results = tools;
    
        // Crear un mapa para buscar herramientas por ID de manera eficiente
        const herramientasMap = new Map(tools.map((tool: any) => [tool.id, tool]));
    
        // Encontrar las herramientas seleccionadas usando el mapa
        this.herramientasSeleccionadas = this.detallesUsuario.herramientas
          .map((element: any) => herramientasMap.get(element.id))
          .filter((tool: any) => tool); // Eliminar elementos `undefined` si no hay coincidencias

          console.log(this.herramientasSeleccionadas)
      }
    });

    

    this.user = this.detallesUsuario.id
  }

  async cancel(){
    await this.modalController.dismiss();
  }

  async buscarHerramienta(e:any){
    const query = e.target.value.toString();
    
    if(query == ''){
      this.results = this.herramientas
    }else{
      this.results = this.herramientas.filter((d:any) => d.capacidad.toString() == (query))
    }
  }

  isHerramientaSelected(item:any):boolean{
    return this.herramientasSeleccionadas.includes(item)
  }

  async asignarHerramienta(tool:any){
    const index = this.herramientasSeleccionadas.indexOf(tool);
    console.log(index)
    
    if(index === -1){
      this.herramientasSeleccionadas.push(tool);
      tool.estado = this.user;
    }else{
      this.herramientasSeleccionadas.splice(index, 1);
      tool.estado = 'Disponible'; 
    }

    try{
      
      var herramientasParaAgregar = this.herramientasSeleccionadas.map((item:any) => {
        return {
          id: item.id,
          identificacion: item.identificacion
        }
      });

      this.detallesUsuario.herramientas = herramientasParaAgregar;
      
      this.authservice.updateUser(this.detallesUsuario).then((res) => {
        this.toolService.updateTool(tool).then((resTool) => {
          console.log(resTool)
        })
        console.log(res);
      });
      
    }catch(error){
      console.error('El error ha sido: ', error)
    }
  }


  
}
