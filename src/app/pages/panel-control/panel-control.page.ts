import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarCitaComponent } from 'src/app/components/panel-control/agregar-cita/agregar-cita.component';
import { DetalleCitaComponent } from 'src/app/components/panel-control/detalle-cita/detalle-cita.component';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';

declare var google: any;

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.page.html',
  styleUrls: ['./panel-control.page.scss'],
})
export class PanelControlPage implements OnInit {

  public citas:any;
  public results:any

  constructor(
    private zone: NgZone,
    private citasService: CitasService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getInformacion();
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.zone.run(() => {
        this.drawChart();
      });
    });
    // Observador para redibujar el gráfico en caso de cambio de tamaño
    const observer = new ResizeObserver(() => {
      this.zone.run(() => {
        this.drawChart();
      });
    });
    observer.observe(document.getElementById('chart_div'));
  }
  
  async drawChart() {
    // Datos de ejemplo para la actividad mensual
    const monthlyActivityData = [
      ['Mes', 'Actividad'],
      ['Enero', 300],
      ['Febrero', 450],
      ['Marzo', 600],
      ['Abril', 700],
      ['Mayo', 550],
      ['Junio', 800],
      ['Julio', 900],
      ['Agosto', 750],
      ['Septiembre', 850],
      ['Octubre', 950],
      ['Noviembre', 700],
      ['Diciembre', 850]
    ];

    // Crear un DataTable de Google Charts
    var data = await new google.visualization.DataTable();
    data.addColumn('string', 'Mes');
    data.addColumn('number', 'Actividad');
    data.addRows(monthlyActivityData.slice(1)); // Usar los datos de ejemplo, excluyendo la primera fila de encabezados

    // Configuración del gráfico
    var options = {
      
      legend: { position: 'bottom' },  // Posición de la leyenda
      width: '100%',  // Ancho del gráfico
      height: 250     // Altura del gráfico
    };

    // Dibujar el gráfico en un elemento HTML específico
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  getInformacion(){
    this.citasService.getCitaProgramada().subscribe((data) => {
      this.citas = data;
      this.results = data;
    });
  }

  async addCita(){
    const modalAgregarCita = await this.modalController.create({
      component: AgregarCitaComponent,
      cssClass: "modalCitas"
    });

    modalAgregarCita.present();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.citas.filter((d:any) => d.nombre_razon_social.toLowerCase().indexOf(query) > -1);
  }

  async mostrarDetalles(cita:any){
    const modalDetallesCita = await this.modalController.create({
      component: DetalleCitaComponent,
      componentProps: {
        cita
      },
      cssClass: "modalCitas"
    });

    modalDetallesCita.present();
  }

}
