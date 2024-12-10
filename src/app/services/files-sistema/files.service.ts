import { Injectable } from '@angular/core';
import {
  Filesystem, Directory, Encoding
} from '@capacitor/filesystem'
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }
  

  // Crear una carpeta
  async createCarpeta(folderName:string): Promise<void>{
    try{
      await Filesystem.mkdir({
        path: folderName,
        directory: Directory.Documents,
        recursive: false
      });
      console.log('Carpeta creada correctamente');
    } catch(error){
      if(error.message == 'Folder already exists'){
        return error.message;
      }else{
        return error
      }
    }
  }

  // Guardar un archivo
  async saveFile(folderName: string, fileName: string, data: string): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: `${folderName}/${fileName}`,
        data: data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log(`Archivo ${fileName} guardado exitosamente en ${folderName}.`);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }
  }

  // Leer un archivo
  async readFile(folderName: string, fileName: string): Promise<any | null> {
    try {
      const file = await Filesystem.readFile({
        path: `${folderName}/${fileName}`,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log(`Archivo ${fileName} leído exitosamente.`);
      return file.data; // Devuelve el contenido del archivo
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return null;
    }
  }

  // Listar archivos en una carpeta
  async listFiles(folderName: string): Promise<any> {
    try {
      const result = await Filesystem.readdir({
        path: folderName,
        directory: Directory.Documents,
      });
      console.log(`Archivos en la carpeta ${folderName}:`, result.files);
      return result.files;
    } catch (error) {
      console.error('Error al listar los archivos:', error);
      return [];
    }
  }

  // Eliminar un archivo
  async deleteFile(folderName: string, fileName: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: `${folderName}/${fileName}`,
        directory: Directory.Documents,
      });
      console.log(`Archivo ${fileName} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  }
}
