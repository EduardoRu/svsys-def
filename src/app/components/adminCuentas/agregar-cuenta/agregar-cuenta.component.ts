import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AgregarCuentaComponent  implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async cancel(){
    await this.modalController.dismiss(null, 'cancel');
  }

}
