import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { CitasService } from 'src/app/services/actividades/citas/citas.service';
import { FSubidaService } from 'src/app/services/actividades/f_subida/f-subida.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ListaClientesComponent implements OnInit {
  public segment: string = 'clientes';
  public datosUnicosClientes: any[] = [];
  public resultadosFiltradosClientes: any[] = [];
  public resultadosAgrupadosClientes: any[] = [];
  public estadosClientes: string[] = [];
  public municipiosClientes: string[] = [];
  public coloniasClientes: string[] = [];
  public datosCitas: any[] = [];
  public resultadosAgrupadosCitas: any[] = [];
  private filtrosClientes = { estado: '', municipio: '', colonia: '', query: '' };
  private pageSizeClientes = 20;
  private currentPageClientes = 0;
  private pageSizeCitas = 20;
  private currentPageCitas = 0;

  constructor(
    private fSubidaService: FSubidaService,
    private citasService: CitasService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarCitas();
  }

  async cargarClientes() {
    const loading = await this.loadingController.create({ message: 'Cargando clientes...', spinner: 'crescent' });
    await loading.present();
    this.fSubidaService.organizarInformacion().subscribe({
      next: (data) => {
        this.datosUnicosClientes = this.filtrarInformacionUnica(data.Sheet1);
        this.resultadosFiltradosClientes = [...this.datosUnicosClientes]; // Copia inicial para filtrados
        this.actualizarFiltrosClientes(this.datosUnicosClientes);
        this.resultadosAgrupadosClientes = this.agruparPorRazonSocial(this.cargarPaginaClientes());
        loading.dismiss();
      },
      error: () => loading.dismiss(),
    });
  }

  async cargarCitas() {
    const loading = await this.loadingController.create({ message: 'Cargando citas...', spinner: 'crescent' });
    await loading.present();
    this.citasService.getCitaProgramada().subscribe({
      next: (data) => {
        this.datosCitas = data;
        this.resultadosAgrupadosCitas = this.agruparPorRazonSocial(this.cargarPaginaCitas());
        loading.dismiss();
      },
      error: () => loading.dismiss(),
    });
  }

  onSegmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  cargarPaginaClientes() {
    const start = this.currentPageClientes * this.pageSizeClientes;
    const end = start + this.pageSizeClientes;
    const paginated = this.resultadosFiltradosClientes.slice(start, end);
    this.currentPageClientes++;
    return paginated;
  }

  cargarPaginaCitas() {
    const start = this.currentPageCitas * this.pageSizeCitas;
    const end = start + this.pageSizeCitas;
    const paginated = this.datosCitas.slice(start, end);
    this.currentPageCitas++;
    return paginated;
  }

  cargarMasClientes(event: any) {
    const nuevosClientes = this.cargarPaginaClientes();
    this.resultadosAgrupadosClientes = [...this.resultadosAgrupadosClientes, ...this.agruparPorRazonSocial(nuevosClientes)];
    event.target.complete();
    if (this.currentPageClientes * this.pageSizeClientes >= this.resultadosFiltradosClientes.length) {
      event.target.disabled = true;
    }
  }

  cargarMasCitas(event: any) {
    const nuevasCitas = this.cargarPaginaCitas();
    this.resultadosAgrupadosCitas = [...this.resultadosAgrupadosCitas, ...this.agruparPorRazonSocial(nuevasCitas)];
    event.target.complete();
    if (this.currentPageCitas * this.pageSizeCitas >= this.datosCitas.length) {
      event.target.disabled = true;
    }
  }

  filtrarInformacionUnica(datos: any[]) {
    const mapa = new Map<string, any>();
    datos.forEach((item) => {
      const key = `${item.rfc}|${item.nombre_razon_social}|${item.domicilio}|${item.colonia}`;
      if (!mapa.has(key)) mapa.set(key, item);
    });
    return Array.from(mapa.values());
  }

  agruparPorRazonSocial(datos: any[]) {
    return datos.map((item) => ({
      nombre_razon_social: item.nombre_razon_social,
      registros: datos.filter((c) => c.nombre_razon_social === item.nombre_razon_social),
    }));
  }

  actualizarFiltrosClientes(datos: any[]) {
    this.estadosClientes = [...new Set(datos.map((c) => c.estado))];
    this.municipiosClientes = [...new Set(datos.map((c) => c.municipio))];
    this.coloniasClientes = [...new Set(datos.map((c) => c.colonia))];
  }

  buscarCliente(event: any) {
    this.filtrosClientes.query = event.target.value.toLowerCase();
    this.aplicarFiltrosClientes();
  }

  buscarCita(event: any) {
    const query = event.target.value.toLowerCase();
    const filtrados = this.datosCitas.filter((cita) =>
      cita.nombre_razon_social.toLowerCase().includes(query)
    );
    this.resultadosAgrupadosCitas = this.agruparPorRazonSocial(filtrados);
  }

  filtrarPorEstadoClientes(event: any) {
    this.filtrosClientes.estado = event.detail.value;
    this.aplicarFiltrosClientes();
  }

  filtrarPorMunicipioClientes(event: any) {
    this.filtrosClientes.municipio = event.detail.value;
    this.aplicarFiltrosClientes();
  }

  filtrarPorColoniaClientes(event: any) {
    this.filtrosClientes.colonia = event.target.value.toLowerCase();
    this.aplicarFiltrosClientes();
  }

  aplicarFiltrosClientes() {
    let resultados = this.datosUnicosClientes;

    if (this.filtrosClientes.query) {
      resultados = resultados.filter((c) =>
        c.nombre_razon_social.toLowerCase().includes(this.filtrosClientes.query)
      );
    }

    if (this.filtrosClientes.estado) {
      resultados = resultados.filter((c) => c.estado === this.filtrosClientes.estado);
    }

    if (this.filtrosClientes.municipio) {
      resultados = resultados.filter((c) => c.municipio === this.filtrosClientes.municipio);
    }

    if (this.filtrosClientes.colonia) {
      resultados = resultados.filter((c) =>
        c.colonia.toLowerCase().includes(this.filtrosClientes.colonia)
      );
    }

    this.resultadosFiltradosClientes = resultados;
    this.currentPageClientes = 0; // Reinicia paginación
    this.resultadosAgrupadosClientes = this.agruparPorRazonSocial(this.cargarPaginaClientes());
  }

  async confirm(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Desea seleccionar este registro?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Confirmar', handler: () => this.modalController.dismiss(item, 'confirm') },
      ],
    });
    await alert.present();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
