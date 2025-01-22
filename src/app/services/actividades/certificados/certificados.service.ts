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
export class CertificadosService {
  
    constructor(
      private firestore:Firestore,
      private auth: Auth
    ) { }
  
    getCertificadoProgramada(): Observable<any[]> {
      const registroRef = collection(this.firestore, 'certificados');
      return collectionData(registroRef, {idField: 'id'}) as Observable<any[]>;
    };
  
    getCertificadoById(id: string): Observable<any>{
      const registroRef = doc(this.firestore, `certificados/${id}`);
      return docData(registroRef, {'idField': 'id'}) as Observable<any>;
    }
  
    deleteCertificado(id: string) {
      const registroRef = doc(this.firestore, `certificados/${id}`);
      return deleteDoc(registroRef);
    }
  
    addCertificado(cita: any) {
      return addDoc(collection(this.firestore, 'certificados'), cita);
    }
  
    updateCertificado(item: any) {
      const registroRef = doc(this.firestore, `certificados/${item.id}`);
      return updateDoc(registroRef, {
        'certificado': item.certificado,
        'usuarioId': item?.usuarioId
      });
    }
  
}
