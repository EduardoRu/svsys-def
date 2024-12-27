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
export class AddCarService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  getCar(): Observable<any[]> {
    const registroRef = collection(this.firestore, 'cars');
    return collectionData(registroRef, {idField: 'id'}) as Observable<any[]>;
  }

  getCarById(id: string): Observable<any> {
    const registroRef = doc(this.firestore, `cars/${id}`);
    return docData(registroRef) as Observable<any>;
  }

  addCar(reporte: any): Promise<any> {
    return addDoc(collection(this.firestore, 'cars'), reporte);
  }

  deleteCar(id:string){
    const registroRef = doc(this.firestore, `cars/${id}`);
    return deleteDoc(registroRef);
  }

  updateCar(reporte: any): Promise<any> {
    const registroRef = doc(this.firestore, `cars/${reporte.id}`);
    return updateDoc(registroRef, {
      'placa': reporte.placa,
      'estado': reporte.estado ,
      'usuario': reporte.usuario
    });
  }
}
