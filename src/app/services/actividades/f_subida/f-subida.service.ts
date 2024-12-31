import { Injectable } from '@angular/core';
import {
  doc,
  collection,
  collectionData,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import {
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import {
  Auth
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FSubidaService {

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private auth: Auth
  ) { }

  getInformacion(): Observable<any>{
    // Simulacion con Firestore navigator.onLine
    if(false){
      const registroRef = collection(this.firestore, 'infoClientes');
      return collectionData(registroRef, {idField: 'id'}) as Observable<any[]>;
    }else{
      return this.http.get('assets/resultado.json')
    }
  }


  ingresarInfo(cliente:any){
    return addDoc(collection(this.firestore, 'infoClientes'), cliente);
  }

  organizarInformacion(): Observable<any>{
    var registros:any = this.http.get('assets/resultado.json');

    return registros;
  }
}
