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
	verifyBeforeUpdateEmail
} from '@angular/fire/auth'
import { doc, docData, Firestore, setDoc, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private auth: Auth, private firestore: Firestore) { }

	async register({ usuario, email, password, role }: { usuario: string, email: string, password: string, role: string }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			const userInfo = user.user;
			const userDocRef = doc(this.firestore, `users/${userInfo.uid}`);

			// Guardar rol en Firestore
			await setDoc(userDocRef, {
				usuario,
				email,
				role
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

	async updateUser(updatedData: { uid?:string, usuario?: string, email?: string, password?: string, role?: string }) {
		try {
			const user = this.auth.currentUser;
			if (user) {
				const userDocRef = doc(this.firestore, `users/${updatedData.uid}`);

				// Actualizar los datos del usuario en Firestore
				await setDoc(userDocRef, updatedData, { merge: true });

				// Si el email fue actualizado, actualizamos también en la autenticación
				if (updatedData.email && updatedData.email !== "" && updatedData.email !== undefined ) {
					await updateEmail(user, updatedData.email);
				}

				// Si la contraseña fue actualizada, la actualizamos también
				if (updatedData.password && updatedData.password != "" && updatedData.password !== undefined) {
					console.log('Se actualizo la contraseña')
					//await updatePassword(user, updatedData.password);
				}

				return { success: true };
			} else {
				throw new Error('No hay un usuario autenticado');
			}
		} catch (error) {
			console.error('Error al actualizar la información del usuario:', error);
			return { success: false, error };
		}
	}
}
