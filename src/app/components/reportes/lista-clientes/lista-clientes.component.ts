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
  public resultadosFiltrados: any[] = [];
  public resultadosAgrupados: any[] = [];
  public estados: string[] = [];
  public municipios: string[] = [];
  public colonias: string[] = [];
  private todosLosClientes: any[] = [];
  private filtros: { estado: string; municipio: string; colonia: string } = { estado: '', municipio: '', colonia: '' };

  private pageSize = 50; // Tamaño de la página para paginación
  private currentPage = 0; // Página actual

  constructor(
    private modalController: ModalController,
    private fSubidaService: FSubidaService,
    private loadController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getInformacion();
  }

  async getInformacion() {
    const loading = await this.loadController.create({
      message: 'Cargando clientes...',
      spinner: 'crescent',
      backdropDismiss: false,
    });

    await loading.present();

    this.fSubidaService.organizarInformacion().subscribe({
      next: async (info) => {
        this.todosLosClientes = this.filtrarInformacionUnica(info.Sheet1);
        this.resultadosFiltrados = [...this.todosLosClientes]; // Inicialmente, los filtrados son todos
        this.actualizarFiltros(this.resultadosFiltrados); // Actualiza filtros basados en los datos iniciales
        this.resultadosAgrupados = this.agruparPorRazonSocial(this.cargarPagina());
        await loading.dismiss();
      },
      error: async (error) => {
        console.error(error);
        await loading.dismiss();
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

  buscarCliente(event: any) {
    const query = event.target.value.toLowerCase();
    this.resultadosFiltrados = this.todosLosClientes.filter((cliente) =>
      cliente.nombre_razon_social.toLowerCase().includes(query)
    );
    this.aplicarFiltros(); // Ajusta los resultados agrupados y los filtros dinámicos
  }

  cargarPagina(datos?: any[]) {
    const dataToPaginate = datos || this.resultadosFiltrados;
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const pagina = dataToPaginate.slice(start, end);
    this.currentPage++;
    return pagina;
  }

  cargarMasDatos(event: any) {
    const nuevosDatos = this.cargarPagina();
    this.resultadosAgrupados = [...this.resultadosAgrupados, ...this.agruparPorRazonSocial(nuevosDatos)];
    event.target.complete();

    // Deshabilita la carga infinita si ya no hay más datos
    if (this.currentPage * this.pageSize >= this.resultadosFiltrados.length) {
      event.target.disabled = true;
    }
  }

  filtrarPorEstado(event: any) {
    this.filtros.estado = event.detail.value;
    this.aplicarFiltros();
  }

  filtrarPorMunicipio(event: any) {
    this.filtros.municipio = event.detail.value;
    this.aplicarFiltros();
  }

  filtrarPorColonia(event: any) {
    this.filtros.colonia = event.target.value.toLowerCase();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let resultados = this.resultadosFiltrados;

    if (this.filtros.estado) {
      resultados = resultados.filter((c) => c.estado === this.filtros.estado);
    }
    if (this.filtros.municipio) {
      resultados = resultados.filter((c) => c.municipio === this.filtros.municipio);
    }
    if (this.filtros.colonia) {
      resultados = resultados.filter((c) =>
        c.colonia.toLowerCase().includes(this.filtros.colonia)
      );
    }

    this.currentPage = 0; // Reinicia la paginación
    this.resultadosAgrupados = this.agruparPorRazonSocial(this.cargarPagina(resultados));
    this.actualizarFiltros(resultados); // Actualiza las opciones de filtros dinámicamente
  }

  agruparPorRazonSocial(datos: any[]) {
    const mapa = new Map<string, any>();
    datos.forEach((item) => {
      if (!mapa.has(item.nombre_razon_social)) {
        mapa.set(item.nombre_razon_social, { nombre_razon_social: item.nombre_razon_social, registros: [] });
      }
      mapa.get(item.nombre_razon_social).registros.push(item);
    });
    return Array.from(mapa.values());
  }

  actualizarFiltros(datos: any[]) {
    this.estados = [...new Set(datos.map((c) => c.estado))];
    this.municipios = [...new Set(datos.map((c) => c.municipio))];
    this.colonias = [...new Set(datos.map((c) => c.colonia))];
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
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.modalController.dismiss(item, 'confirm');
          },
        },
      ],
    });
    await alert.present();
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
