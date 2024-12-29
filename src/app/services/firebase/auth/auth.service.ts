import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	signOut,
	updateEmail,
	updatePassword,
	verifyBeforeUpdateEmail,
	getAuth
} from '@angular/fire/auth'
import { doc, docData, Firestore, setDoc, collectionData, collection, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = environment.apiUrl;


	constructor(private auth: Auth, private firestore: Firestore, private http: HttpClient) { }

	async register({ usuario, email, password, role, autos, herramientas }: { usuario: string, email: string, password: string, role: string, autos: any, herramientas: any }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			const userInfo = user.user;
			const userDocRef = doc(this.firestore, `users/${userInfo.uid}`);

			// Guardar rol en Firestore
			await setDoc(userDocRef, {
				usuario,
				email,
				role,
				autos,
				herramientas
			});

			return user;
		} catch (e) {
			return null;
		}
	}

	async login({ email, password }) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	getUsers(): Observable<any[]> {
		const registroRef = collection(this.firestore, 'users');
		return collectionData(registroRef, { idField: 'id' }) as Observable<any[]>;
	};

	async getUser() {
		const user = await this.auth.currentUser;
		const userDocRef = doc(this.firestore, `users/${user.uid}`);
		return docData(userDocRef, { idField: 'id' });
	}

	// Obtener rol del usuario
	async getUserRole() {
		const user = await this.auth.currentUser;
		if (user) {
			const userDocRef = doc(this.firestore, `users/${user.uid}`);
			const userData: any = docData(userDocRef, { idField: 'id' });
			return userData?.role || 'user';
		}
		return 'guest';
	}

	logout() {
		return signOut(this.auth);
	}

	// Función para eliminar al usuario
	async deleteUser(password: string): Promise<void> {
		try {
			const user = this.auth.currentUser;
			if (user) {
				// Reautenticación con credenciales de correo electrónico y contraseña
				const credential = EmailAuthProvider.credential(user.email!, password);
				await reauthenticateWithCredential(user, credential);

				// Eliminar el usuario
				await deleteUser(user);
				console.log('Usuario eliminado con éxito');
			} else {
				console.error('No hay usuario autenticado');
			}
		} catch (error) {
			console.error('Error al eliminar el usuario:', error);
		}
	}

	async updateUser(updatedData: { id?: string, usuario?: string, email?: string, role?: string, autos?: any, herramientas?: any }):Promise<any> {
		try {

			const registroRef = doc(this.firestore, `users/${updatedData.id}`);
			return updateDoc(registroRef, {
				'usuario': updatedData.usuario,
				'email': updatedData.email,
				'role': updatedData. role,
				'autos': updatedData.autos,
				'herramientas': updatedData.herramientas
			});

		} catch (error) {
			console.error('Error al actualizar la información del usuario:', error);
			return { success: false, error };
		}
	}
}
