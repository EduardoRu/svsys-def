import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['panel-control']);


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'panel-control',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'panel-control',
    loadChildren: () => import('./pages/panel-control/panel-control.module').then( m => m.PanelControlPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then( m => m.ReportesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'historia-reportes',
    loadChildren: () => import('./pages/historia-reportes/historia-reportes.module').then( m => m.HistoriaReportesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'control-informacion',
    loadChildren: () => import('./pages/control-informacion/control-informacion.module').then( m => m.ControlInformacionPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'administracion-cuentas',
    loadChildren: () => import('./pages/administracion-cuentas/administracion-cuentas.module').then( m => m.AdministracionCuentasPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
