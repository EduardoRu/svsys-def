import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { FSubidaService } from 'src/app/services/actividades/f_subida/f-subida.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ListaClientesComponent implements OnInit {

  public datosUnicosClientes: any[] = [];
  public results: any[] = [];
  public paginatedResults: any[] = [];
  private pageSize: number = 50;
  private currentPage: number = 0;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(
    private modalController: ModalController,
    private fSubidaService: FSubidaService,
    private loadController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion() {
    const loadClientes = this.loadController.create({
      message: 'Cargando clientes...',
      spinner: 'crescent',
      backdropDismiss: false,
    });

    (await loadClientes).present();

    this.fSubidaService.organizarInformacion().subscribe({
      next: async (info) => {
        const datosUnicos = this.filtrarInformacionUnica(info.Sheet1);
        this.datosUnicosClientes = datosUnicos;
        this.results = datosUnicos;
        this.paginatedResults = this.cargarPagina();
        (await loadClientes).dismiss();
      },
      error: async (error) => {
        console.error(error);
        (await loadClientes).dismiss();
      },
    });
  }

  filtrarInformacionUnica(datos: any[]) {
    const mapa = new Map<string, any>();
    datos.forEach((item) => {
      const identificador = `${item.rfc}|${item.nombre_razon_social}|${item.domicilio}|${item.colonia}|${item.num_dom}|${item.giro_empresarial}`;
      if (!mapa.has(identificador)) {
        mapa.set(identificador, item);
      }
    });
    return Array.from(mapa.values());
  }

  cargarPagina() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const newPage = this.results.slice(start, end);
    this.currentPage++;
    return [...this.paginatedResults, ...newPage];
  }

  cargarMasDatos(event: any) {
    const nuevosDatos = this.cargarPagina();
    this.paginatedResults = [...this.paginatedResults, ...nuevosDatos];
    event.target.complete();

    if (this.paginatedResults.length === this.results.length) {
      event.target.disabled = true;
    }
  }

  buscarCliente(e: any) {
    const query = e.target.value.toLowerCase();
  
    if (query.trim() === '') {
      // Si no hay búsqueda, restaura los datos paginados
      this.currentPage = 0;
      this.paginatedResults = this.cargarPagina();
    } else {
      // Filtra los resultados basados en el texto de búsqueda
      const filtered = this.datosUnicosClientes.filter((item: any) =>
        item.nombre_razon_social.toLowerCase().includes(query)
      );
      this.paginatedResults = filtered; // Mostrar directamente los resultados filtrados
    }
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async confirm(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Está seguro de que desea seleccionar a este cliente?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Selección cancelada');
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Cliente confirmado:', item);
            this.modalController.dismiss(item, 'confirm');
          },
        },
      ],
    });

    await alert.present();
  }

}
