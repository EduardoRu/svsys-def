import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReporteComponent } from 'src/app/components/reporte/reporte.component';

@Component({
  selector: 'app-historia-reportes',
  templateUrl: './historia-reportes.page.html',
  styleUrls: ['./historia-reportes.page.scss'],
})
export class HistoriaReportesPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async mostrarPdf(){
    const modalPDF = await this.modalController.create({
      component: ReporteComponent
    });

    modalPDF.present();
  }

}
