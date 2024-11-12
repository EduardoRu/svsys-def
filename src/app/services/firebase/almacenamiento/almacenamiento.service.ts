import { Injectable } from '@angular/core';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {

  constructor(
    private storage: Storage
  ) { }

  async uploadPDF(blob: Blob, fileName: string): Promise<string> {
    try {
      // Crear una referencia al archivo en Firebase Storage
      const fileRef = ref(this.storage, `pdfs/${fileName}`);

      // Subir el archivo a Firebase Storage
      console.log('Subiendo archivo a Firebase Storage...');
      await uploadBytes(fileRef, blob);

      // Obtener la URL pública del archivo subido
      const downloadUrl = await getDownloadURL(fileRef);
      console.log('Archivo subido exitosamente. URL:', downloadUrl);

      // Generar el código QR con la URL de descarga
      const qrCode = await QRCode.toDataURL(downloadUrl);
      console.log('Código QR generado exitosamente.');

      // Retornar el código QR en formato base64
      return qrCode;
    } catch (error) {
      console.error('Error al subir el archivo o generar el código QR:', error);
      throw error;
    }
  }

}
