import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AgregarCitaComponent } from 'src/app/components/panel-control/agregar-cita/agregar-cita.component';
import { DetalleCitaComponent } from 'src/app/components/panel-control/detalle-cita/detalle-cita.component';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';
import { FSubidaService } from 'src/app/services/actividades/f_subida/f-subida.service';
import { FilesService } from 'src/app/services/files-sistema/files.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

declare var google: any;

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.page.html',
  styleUrls: ['./panel-control.page.scss'],
})
export class PanelControlPage implements OnInit {
  public citas: any = [];
  public results: any = [];
  private infoClientes: any = [];
  public topClientes: [string, number][] = []; // Almacena los nombres y conteos del top 10

  constructor(
    private zone: NgZone,
    private citasService: CitasService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private storageService: StorageService,
    private fileService: FilesService,
    private alertController: AlertController,
    private fsubidaService: FSubidaService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.initializePage();
    }, 1000);
  }

  // ============================================================
  // Initialization Methods
  // ============================================================

  private async initializePage() {
    await this.showLoadingMessage('Cargando información', 1000);
    this.getInformacion();
    this.generateCharts();
  }

  private async showLoadingMessage(message: string, duration: number) {
    const loading = await this.loadingController.create({ message, duration });
    await loading.present();
  }

  // ============================================================
  // Chart Methods
  // ============================================================

  private generateCharts() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.zone.run(() => {
        this.updateTopClientes(); // Calcular el top 10
        this.drawTopClientesPieChart(); // Dibujar gráfico de pastel
      });
    });

    const observer = new ResizeObserver(() => {
      this.zone.run(() => {
        this.drawTopClientesPieChart(); // Redibujar gráfico de pastel si el contenedor cambia de tamaño
      });
    });

    const pieChartDiv = document.getElementById('chart_div_pie');
    if (pieChartDiv) observer.observe(pieChartDiv);
  }

  private updateTopClientes() {
    if (!this.infoClientes || this.infoClientes.length === 0) return;

    this.topClientes = this.getTopClientesCounts(this.infoClientes);
  }

  private async drawTopClientesPieChart() {
    if (!this.topClientes || this.topClientes.length === 0) return;

    const chartData = [['Cliente', 'Actividades'], ...this.topClientes];
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Cliente');
    data.addColumn('number', 'Actividades');
    data.addRows(chartData.slice(1));

    const options = {
      title: 'Top 10 Clientes Frecuentes (Gráfico de Pastel)',
      pieHole: 0.4, // Gráfico de dona, opcional
      height: 400,
      width: '100%',
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div_pie'));
    chart.draw(data, options);
  }

  private getTopClientesCounts(data: any[]): [string, number][] {
    const counts = data.reduce((acc, cliente) => {
      const key = cliente.nombre_razon_social;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a: any, b: any) => b[1] - a[1]) // Orden descendente
      .slice(0, 10) as [string, number][];
  }

  // ============================================================
  // Data Fetching Methods
  // ============================================================

  private getInformacion() {
    this.loadCitasProgramadas();
    this.loadUserInfo();
    this.loadClientInfo();
  }

  private loadCitasProgramadas() {
    this.citasService.getCitaProgramada().subscribe((data) => {
      this.citas = data;
      this.results = data;
    });
  }

  private async loadUserInfo() {
    (await this.authService.getUser()).subscribe({
      next: (user) => this.storageService.addValue('usuario', user),
      error: (error) => console.error(error),
    });
  }

  private loadClientInfo() {
    this.fsubidaService.getInformacion().subscribe({
      next: (data) => {
        this.infoClientes = data.Sheet1 || data;
        this.updateTopClientes(); // Calcular el top 10 al cargar los datos
      },
      error: (error) => console.error(error),
    });
  }

  // ============================================================
  // User Interaction Methods
  // ============================================================

  async generarCarpeta() {
    const alert = await this.alertController.create({
      header: 'Bienvenido a SVSYS - Administración',
      subHeader: 'Descarga de información',
      message: 'Te solicitamos descargar la información de la base de datos para una experiencia óptima.',
      buttons: [
        { text: 'En otro momento', role: 'cancel' },
        { text: '¡Descargar!', role: 'confirm', handler: () => this.fileService.createCarpeta('svsys-directorio') }
      ],
    });

    await alert.present();
  }

  async addCita() {
    const modal = await this.modalController.create({
      component: AgregarCitaComponent,
      cssClass: 'modalCitas',
    });

    await modal.present();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.citas.filter((d: any) =>
      d.nombre_razon_social.toLowerCase().includes(query)
    );
  }

  async mostrarDetalles(cita: any) {
    const modal = await this.modalController.create({
      component: DetalleCitaComponent,
      componentProps: { cita },
      cssClass: 'modalCitas',
    });

    await modal.present();
  }
}
