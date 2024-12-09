import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales: FormGroup;

  constructor(
    private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
		private storageSerive:StorageService
  ) { }

  get email() {
		return this.credenciales.get('email');
	}

	get password() {
		return this.credenciales.get('password');
	}

  ngOnInit() {
    this.credenciales = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
  }

  async login() {

		const user = await this.authService.login(this.credenciales.value);
		if (user) {
			this.router.navigateByUrl('/panel-control', { replaceUrl: true });
		} else {
			this.showAlert('Algo salio mal', 'Favor de volver a intentar!');
		}
	}

  async showAlert(header, message) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

}
