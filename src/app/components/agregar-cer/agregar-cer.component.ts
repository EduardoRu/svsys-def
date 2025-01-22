import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { CertificadosService } from 'src/app/services/actividades/certificados/certificados.service';

@Component({
  selector: 'app-agregar-cer',
  templateUrl: './agregar-cer.component.html',
  styleUrls: ['./agregar-cer.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AgregarCerComponent implements OnInit {
  @Input() userId: string; // ID del usuario al que se asignarán los certificados

  certificado: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private certificadosService: CertificadosService
  ) {}

  ngOnInit() {
    this.certificado = this.fb.group({
      rIni: ['', Validators.required],
      rFin: ['', Validators.required],
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

  async guardarCer() {
    const rIni = this.certificado.value.rIni;
    const rFin = this.certificado.value.rFin;

    // Validar que ambos rangos están completos
    if (!rIni || !rFin) {
      this.showAlert('Error', 'Por favor, ingresa ambos rangos.');
      return;
    }

    // Validar si se trata de un solo certificado
    if (rIni === rFin) {
      await this.guardarUnicoCertificado(rIni);
      return;
    }

    // Validar que los rangos tienen el mismo prefijo
    const prefixIni = rIni.slice(0, -6);
    const prefixFin = rFin.slice(0, -6);

    if (prefixIni !== prefixFin) {
      this.showAlert('Error', 'Los rangos deben tener el mismo prefijo.');
      return;
    }

    // Extraer los valores numéricos
    const start = parseInt(rIni.slice(-6));
    const end = parseInt(rFin.slice(-6));

    if (isNaN(start) || isNaN(end) || start > end) {
      this.showAlert('Error', 'Rango inválido. Asegúrate de que los números sean correctos.');
      return;
    }

    // Generar el rango de certificados
    const certificados = [];
    for (let i = start; i <= end; i++) {
      certificados.push(`${prefixIni}${i.toString().padStart(6, '0')}`);
    }

    await this.guardarMultiplesCertificados(certificados);
  }

  async guardarUnicoCertificado(certificado: string) {
    const loading = await this.loadingController.create({
      message: 'Guardando certificado...',
    });
    await loading.present();

    try {
      await this.certificadosService.addCertificado({
        certificado,
        usuarioId: '',
      });
      await loading.dismiss();
      this.showAlert('Éxito', 'Certificado guardado exitosamente.');
      this.modalController.dismiss();
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al guardar el certificado.');
      console.error(error);
    }
  }

  async guardarMultiplesCertificados(certificados: string[]) {
    const loading = await this.loadingController.create({
      message: 'Guardando certificados...',
    });
    await loading.present();

    try {
      for (const certificado of certificados) {
        await this.certificadosService.addCertificado({
          certificado,
          usuarioId: '',
        });
      }
      await loading.dismiss();
      this.showAlert('Éxito', 'Certificados guardados exitosamente.');
      this.modalController.dismiss();
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al guardar los certificados.');
      console.error(error);
    }
  }

  // Mostrar alertas de error o éxito
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
