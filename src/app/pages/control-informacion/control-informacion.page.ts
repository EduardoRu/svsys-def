import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/actividades/reportes/reportes.service';
import { GenerarDictamenService } from 'src/app/services/generarDictamen/generar-dictamen.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-control-informacion',
  templateUrl: './control-informacion.page.html',
  styleUrls: ['./control-informacion.page.scss'],
})
export class ControlInformacionPage implements OnInit {

  public reportes: any[] = []; // Lista completa de reportes
  public reportesPaginados: any[] = []; // Reportes de la página actual

  public paginaActual: number = 1; // Página actual
  public registrosPorPagina: number = 5; // Número de registros por página

  constructor(
    private dictamenService: ReportesService,
    private generarDictamen: GenerarDictamenService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion() {
    this.dictamenService.getReporte().subscribe({
      next: (reporte) => {
        this.reportes = reporte;
        this.actualizarTabla();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getTotalPaginas(): number {
    return Math.ceil(this.reportes.length / this.registrosPorPagina);
  }

  // Actualiza los reportes visibles según la página actual
  actualizarTabla() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.reportesPaginados = this.reportes.slice(inicio, fin);
  }

  // Cambia a la página siguiente
  paginaSiguiente() {
    if (this.paginaActual < this.getTotalPaginas()) {
      this.paginaActual++;
      this.actualizarTabla();
    }
  }

  // Cambia a la página anterior
  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarTabla();
    }
  }
  async detallesReporte(item: any) {
    try {
      const usuario = await this.storageService.getValue('usuario');
      const imagenURL = await this.generarDictamen.getBase64ImageFromURL('assets/logo_bg1.png');
  
      if (!imagenURL) {
        console.error('No se pudo cargar la imagen.');
        return;
      }
  
      await this.generarDictamen.generarReporte(
        item.infoCliente,
        item.infoPago,
        item.infoVisuales,
        item.encuesta,
        item.infoBasculas,
        item.estudioMtro,
        item.infoResumen,
        item.firmaInspector,
        item.firmaCliente,
        item.firmaPa,
        usuario,
        imagenURL
      );
  
      console.log('Reporte generado exitosamente.');
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  }
  


}
