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

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  getReporte(): Observable<any[]> {
    const registroRef = collection(this.firestore, 'reportes');
    return collectionData(registroRef, {idField: 'id'}) as Observable<any[]>;
  }

  getReporteById(id: string): Observable<any> {
    const registroRef = doc(this.firestore, `reportes/${id}`);
    return docData(registroRef) as Observable<any>;
  }

  addReporte(reporte: any): Promise<any> {
    return addDoc(collection(this.firestore, 'reportes'), reporte);
  }

  deleteReporte(id:string){
    const registroRef = doc(this.firestore, `reportes/${id}`);
    return deleteDoc(registroRef);
  }

  updateReporte(reporte: any): Promise<any> {
    const registroRef = doc(this.firestore, `reportes/${reporte.id}`);
    return updateDoc(registroRef, {
      //PENDIENTE
    });
  }
}
