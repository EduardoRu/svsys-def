import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Agregar un registro
   * @param key 
   * @param value 
   */
  async addValue(key:string, value:any){
    await this._storage?.set(key, value);
  }

  /**
   * Obtener un registro
   * @param key 
   */

  async getValue(key:string) {
    return await this._storage?.get(key);
  }

  /**
   * Actualizar un registro
   * @param key 
   * @param value 
   */

  async updateValue(key:string, value:any){
    if(await this._storage?.get(key)){
      await this._storage?.set(key, value);
    }
  }

  /**
   * Eliminar un registro
   * @param key
   */

  async removeValue(key:string){
    await this._storage?.remove(key);
  }

  /**
   * Obtener todos los registros
   */

  async getAllValues() {
    return await this._storage?.keys();
  }

  /**
   * Eliminar los registros temporales
   */

  async clearTempValues() {
    await this._storage?.clear();
  }


}
