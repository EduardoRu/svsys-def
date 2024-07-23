import { Injectable } from '@angular/core';
import {
  doc,
  collection,
  collectionData,
  docData,
  Firestore,
  updateDoc,
  setDoc
} from '@angular/fire/firestore';
import {
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import {
  Auth
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(
    private firestore:Firestore,
    private auth: Auth
  ) { }

  getCitaProgramada(): Observable<any[]> {
    const registroRef = collection(this.firestore, 'citas_programadas');
    return collectionData(registroRef, {idField: 'id'}) as Observable<any[]>;
  };

  getCitaById(id: string): Observable<any>{
    const registroRef = doc(this.firestore, `citas_programadas/${id}`);
    return docData(registroRef, {'idField': 'id'}) as Observable<any>;
  }

  deleteCita(id: string) {
    const registroRef = doc(this.firestore, `citas_programadas/${id}`);
    return deleteDoc(registroRef);
  }

  addCita(cita: any) {
    return addDoc(collection(this.firestore, 'citas_programadas'), cita);
  }

  updateCita(cita: any) {
    const registroRef = doc(this.firestore, `citas_programadas/${cita.id}`);
    return updateDoc(registroRef, {
      'nombre_razon_social': cita.nombre_razon_social,
      'telefono': cita.telefono,
      'fecha': cita.fecha,
      'tipo_servicio':cita.tipo_servicio,
      'domicilio': cita.domicilio,
      'num': cita.num,
      'colonia': cita.colonia,
      'municipio': cita.municipio,
      'estado': cita.estado,
      'cp': cita.cp,
      'giro': cita.giro,
    });
  }
}
