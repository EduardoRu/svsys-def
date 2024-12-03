import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MenuComponent  implements OnInit {

  @Input() titulo: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {}


  rToControlInformacion(){
    this.router.navigate(['/control-informacion'], {replaceUrl:true})
  }

  rToAdministracionCuentas(){
    this.router.navigate(['/administracion-cuentas'], {replaceUrl:true});
  }

  rToReportes(){
    this.router.navigate(['/reportes'], {replaceUrl:true})
  }

  rToHistoriaReportes(){
    this.router.navigate(['/historia-reportes'], {replaceUrl:true})
  }

  rToPanelControl(){
    this.router.navigate(['/panel-control'], {replaceUrl:true})
  }

  rToMiPerfil(){
    this.router.navigate(['/mi-perfil'], {replaceUrl:true})
  }

  rToVehEqui(){
    this.router.navigate(['/vehi-equi'], {replaceUrl:true})
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'], {replaceUrl:true});
  }

}
