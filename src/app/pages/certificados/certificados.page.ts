import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CertificadosService } from 'src/app/services/actividades/certificados/certificados.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { AdminCertificadosModalComponentComponent } from 'src/app/components/admin-certificados-modal-component/admin-certificados-modal-component.component';
import { AgregarCerComponent } from 'src/app/components/agregar-cer/agregar-cer.component';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.page.html',
  styleUrls: ['./certificados.page.scss'],
})
export class CertificadosPage implements OnInit {
  users: any[] = []; // Todos los usuarios
  filteredUsers: any[] = []; // Usuarios filtrados
  paginatedUsers: any[] = []; // Usuarios paginados
  selectedUser: any = null; // Usuario seleccionado
  assignedCertificates: any[] = []; // Certificados asignados al usuario seleccionado
  paginatedAssignedCertificates: any[] = []; // Certificados paginados
  totalAssignedCertificates: number = 0;
  

  // Paginación de usuarios
  currentUserPage: number = 1;
  itemsPerUserPage: number = 10;

  // Paginación de certificados
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private certificadosService: CertificadosService,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar todos los usuarios
  loadUsers() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
      this.paginateUsers(); // Inicializar paginación
    });
  }

  // Filtrar usuarios
  filterUsers(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.usuario.toLowerCase().includes(query)
    );
    this.currentUserPage = 1; // Reiniciar a la primera página
    this.paginateUsers();
  }

  // Paginación de usuarios
  paginateUsers() {
    const startIndex = (this.currentUserPage - 1) * this.itemsPerUserPage;
    const endIndex = startIndex + this.itemsPerUserPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  // Cambiar a la página anterior (usuarios)
  prevUserPage() {
    if (this.currentUserPage > 1) {
      this.currentUserPage--;
      this.paginateUsers();
    }
  }

  // Cambiar a la página siguiente (usuarios)
  nextUserPage() {
    const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerUserPage);
    if (this.currentUserPage < totalPages) {
      this.currentUserPage++;
      this.paginateUsers();
    }
  }

  // Obtener el número total de páginas (usuarios)
  get totalUserPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerUserPage);
  }

  // Seleccionar usuario
  selectUser(user: any) {
    this.selectedUser = user;
    this.loadAssignedCertificates();
  }

  // Cargar certificados asignados al usuario seleccionado
  loadAssignedCertificates() {
    if (this.selectedUser) {
      this.assignedCertificates = this.selectedUser.documentos || [];
      this.totalAssignedCertificates = this.assignedCertificates.length;
      this.currentPage = 1; // Reiniciar a la primera página
      this.paginateAssignedCertificates();
    }
  }
  

  // Calcular dinámicamente el total de páginas para los certificados asignados
  getTotalPages(): number {
    return Math.ceil(this.totalAssignedCertificates / this.itemsPerPage);
  }


  // Paginación de certificados
  paginateAssignedCertificates() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAssignedCertificates = this.assignedCertificates.slice(startIndex, endIndex);
  }

  // Cambiar a la página anterior (certificados)
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateAssignedCertificates();
    }
  }

  // Cambiar a la página siguiente (certificados)
  nextPage() {
    const totalPages = Math.ceil(this.totalAssignedCertificates / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateAssignedCertificates();
    }
  }

  // Abrir modal de administración de certificados
  async openAdminModal() {
    const modal = await this.modalController.create({
      component: AdminCertificadosModalComponentComponent,
      cssClass: 'admin-certificados-modal',
      componentProps: { userId: this.selectedUser.id },
    });

    modal.onDidDismiss().then(() => {
      this.loadAssignedCertificates();
    });

    return await modal.present();
  }

  // Abrir modal para agregar certificados
  async agregarCertificados() {
    const modalCert = await this.modalController.create({
      component: AgregarCerComponent,
      cssClass: 'modalAutos'
    });

    modalCert.present();
  }
}
