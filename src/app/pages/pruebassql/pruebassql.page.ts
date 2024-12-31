import { Component, OnInit } from '@angular/core';
import { FSubidaService } from 'src/app/services/actividades/f_subida/f-subida.service';

@Component({
  selector: 'app-pruebassql',
  templateUrl: './pruebassql.page.html',
  styleUrls: ['./pruebassql.page.scss'],
})
export class PruebassqlPage implements OnInit {

  constructor(
    private fSubidaService: FSubidaService
  ) { }

  async ngOnInit() {
    this.getInformacion();
  }

  async getInformacion() {
    this.fSubidaService.organizarInformacion().subscribe({
      next: (info) => {
        const datosUnicos = this.filtrarInformacionUnica(info.Sheet1);
        console.log(datosUnicos);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }


  filtrarInformacionUnica(datos:any[]){
    const mapa = new Map<string, any>();

    datos.forEach((item) => {
      const identificador = `${item.rfc}|${item.nombre_razon_social}|${item.domicilio}|${item.colonia}|${item.num_dom}|${item.giro_empresarial}`;
  
      if (!mapa.has(identificador)) {
        mapa.set(identificador, item);
      }
    });
  
    return Array.from(mapa.values());


  }
}
