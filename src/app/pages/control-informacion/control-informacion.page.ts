import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/actividades/reportes/reportes.service';

@Component({
  selector: 'app-control-informacion',
  templateUrl: './control-informacion.page.html',
  styleUrls: ['./control-informacion.page.scss'],
})
export class ControlInformacionPage implements OnInit {

  public reportes:any = []

  constructor(
    private dictamenService: ReportesService,
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion() {
    this.dictamenService.getReporte().subscribe({
      next: (reporte) => {
        this.reportes = reporte;
        console.log(this.reportes);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
