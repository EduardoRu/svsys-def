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
export class AddToolService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  
  getTool(): Observable<any[]> {
    const registroRef = collection(this.firestore, 'tools');
    return collectionData(registroRef, {idField: 'id'}) as Observable<any[]>;
  }

  getToolById(id: string): Observable<any> {
    const registroRef = doc(this.firestore, `tools/${id}`);
    return docData(registroRef) as Observable<any>;
  }

  addTool(reporte: any): Promise<any> {
    return addDoc(collection(this.firestore, 'tools'), reporte);
  }

  deleteTool(id:string){
    const registroRef = doc(this.firestore, `tools/${id}`);
    return deleteDoc(registroRef);
  }

  updateTool(reporte: any): Promise<any> {
    const registroRef = doc(this.firestore, `tools/${reporte.id}`);
    return updateDoc(registroRef, {
      'placa': reporte.placa,
    });
  }
}
