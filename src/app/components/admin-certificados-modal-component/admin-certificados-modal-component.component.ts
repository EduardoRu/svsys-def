import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CertificadosService } from 'src/app/services/actividades/certificados/certificados.service';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-admin-certificados-modal-component',
  templateUrl: './admin-certificados-modal-component.component.html',
  styleUrls: ['./admin-certificados-modal-component.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AdminCertificadosModalComponentComponent implements OnInit {
  @Input() userId: string; // ID del usuario seleccionado
  userInfo: any = {}; // Información del usuario
  segmentOption: string = 'range'; // Opción seleccionada en el ion-segment
  availableCertificates: any[] = []; // Certificados no asignados
  filteredCertificates: any[] = []; // Certificados filtrados para búsqueda
  assignedCertificates: any[] = []; // Certificados ya asignados al usuario
  selectedRangeStart: string = ''; // Inicio del rango para agregar
  selectedRangeEnd: string = ''; // Fin del rango para agregar
  numCertificatesToAssign: number = 0; // Número de certificados a asignar automáticamente

  constructor(
    private modalController: ModalController,
    private certificadosService: CertificadosService,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserDataAndCertificates();
  }

  // Cargar datos del usuario y certificados disponibles
  loadUserDataAndCertificates() {
    this.authService.getUsers().subscribe((users) => {
      const user = users.find((u) => u.id === this.userId);
      if (user) {
        this.userInfo = user;
        this.assignedCertificates = this.userInfo?.reportes || [];

        // Luego, cargar certificados disponibles
        this.certificadosService.getCertificadoProgramada().subscribe((certificates) => {
          this.availableCertificates = certificates.filter(
            (cert) => !cert.usuarioId || cert.usuarioId === ""
          );

          // Filtrar disponibles que no estén asignados al usuario
          this.availableCertificates = this.availableCertificates.filter((cert) =>
            !this.assignedCertificates.some(
              (assignedCert) => assignedCert.certificado === cert.certificado
            )
          );

          this.filteredCertificates = [...this.availableCertificates];
          console.log('Certificados disponibles:', this.availableCertificates);
        });
      } else {
        console.error("Usuario no encontrado.");
      }
    });
  }

  // Asignar certificados
  assignCertificates(certificates: any[]) {
    const currentReports = this.userInfo?.reportes || [];

    certificates.forEach((cert) => {
      // Verificar si el certificado ya está en los reportes
      const isAlreadyAssigned = currentReports.some(
        (report) => report.certificado === cert.certificado
      );

      if (!isAlreadyAssigned) {
        // Actualizar certificado con usuarioId
        cert.usuarioId = this.userId;

        // Actualizar el certificado en Firestore
        this.certificadosService.updateCertificado(cert).then(() => {
          // Actualizar reportes del usuario
          currentReports.push({
            certificado: cert.certificado,
            id: cert.id,
          });

          this.authService.updateUserCertificados(this.userId, currentReports).then(() => {
            this.showToast(`Certificado ${cert.certificado} asignado.`, 'success');

            // Recargar datos
            this.loadUserDataAndCertificates();
          });
        }).catch((error) => {
          console.error(`Error al asignar el certificado ${cert.certificado}:`, error);
          this.showToast(`Error al asignar el certificado ${cert.certificado}.`, 'danger');
        });
      } else {
        this.showToast(`El certificado ${cert.certificado} ya está asignado.`, 'warning');
      }
    });
  }

  // Asignar certificados por rango
  assignByRange() {
    if (this.selectedRangeStart && this.selectedRangeEnd) {
      const start = this.parseCertificateId(this.selectedRangeStart);
      const end = this.parseCertificateId(this.selectedRangeEnd);

      if (start && end && start <= end) {
        const certificatesToAssign = this.availableCertificates.filter((cert) => {
          const certNumber = this.parseCertificateId(cert.certificado);
          return certNumber >= start && certNumber <= end;
        });

        this.assignCertificates(certificatesToAssign);
      } else {
        this.showToast('El rango ingresado no es válido.', 'danger');
      }
    }
  }

  // Asignar una cantidad específica de certificados
  assignByQuantity() {
    if (this.numCertificatesToAssign > 0) {
      const certificatesToAssign = this.availableCertificates.slice(0, this.numCertificatesToAssign);
      this.assignCertificates(certificatesToAssign);
    }
  }

  // Quitar un certificado asignado
  unassignCertificate(cert: any) {
    cert.usuarioId = ""; // Eliminar usuario asignado del certificado

    // Actualizar el certificado en Firestore
    this.certificadosService.updateCertificado(cert).then(() => {
      // Actualizar el array de reportes del usuario
      const updatedReports = this.assignedCertificates.filter(
        (report) => report.certificado !== cert.certificado
      );

      this.authService.updateUserCertificados(this.userId, updatedReports).then(() => {
        this.showToast(`Certificado ${cert.certificado} eliminado.`, 'success');
        this.loadUserDataAndCertificates(); // Recargar datos
      });
    }).catch((error) => {
      console.error(`Error al eliminar el certificado ${cert.certificado}:`, error);
      this.showToast(`Error al eliminar el certificado ${cert.certificado}.`, 'danger');
    });
  }

  // Buscar certificados disponibles
  filterCertificates(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCertificates = this.availableCertificates.filter((cert) =>
      cert.certificado.toLowerCase().includes(query)
    );
  }

  // Parsear el número del certificado desde el ID
  parseCertificateId(certId: string): number | null {
    const match = certId.match(/\d+$/); // Extraer el número al final
    return match ? parseInt(match[0], 10) : null;
  }

  // Mostrar mensajes en pantalla
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  // Cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }
}