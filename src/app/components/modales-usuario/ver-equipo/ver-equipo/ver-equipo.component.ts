import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AddToolService } from 'src/app/services/actividades/addTool/add-tool.service';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class VerEquipoComponent  implements OnInit {

  @Input() detallesUsuario:any

  // Array de busqueda
  public results: any[] = [];
  public herramientas: any = [];

  constructor(
    private modalController: ModalController,
    private toolsService: AddToolService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion() {
    this.toolsService.getTool().subscribe({
      next: (tools) => {
        const herramientas = this.detallesUsuario.herramientas;

        herramientas.forEach((element:any) => {
          const tool = tools.filter((d:any) => d.id == element.id);
          this.results.push(tool[0]);
        });

        this.herramientas = this.results;
        
      },error:(err) => {
        console.error(err);
      }
    })
  }

  async buscarHerramienta(e:any) {
    const query = e.target.value.toString();
    
    if(query == ''){
      this.results = this.herramientas
    }else{
      this.results = this.herramientas.filter((d:any) => d.capacidad.toString() == (query))
    }
  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
