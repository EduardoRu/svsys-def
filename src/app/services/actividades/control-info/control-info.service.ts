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
export class ControlInfoService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  getControlInfo(): Observable<any[]> {
    const registroRef = collection(this.firestore, 'control_info');
    return collectionData(registroRef);
  }

  getControlInfoById(id: string): Observable<any> {
    const registroRef = doc(this.firestore, `control_info/${id}`);
    return docData(registroRef);
  }

  updateControlInfo(data: any) {
    const registroRef = doc(this.firestore, `control_info/${data.id}`);
    return updateDoc(registroRef, {
      // PENDIENTE
    });
  }

  addControlInfo(data: any) {
    return addDoc(collection(this.firestore, 'control_info'), data);
  }

  deleteControlInfo(id: string) {
    const registroRef = doc(this.firestore, `control_info/${id}`);
    return deleteDoc(registroRef);
  }


}
