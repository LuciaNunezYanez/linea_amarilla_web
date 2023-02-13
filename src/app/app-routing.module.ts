import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { LlamadasRealesComponent } from './components/llamadas-reales/llamadas-reales.component';

// Guards
import { LoginGuard } from '../app/guards/login.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [LoginGuard] },
  { path: 'pacientes', component: PacientesComponent, canActivate: [LoginGuard] },
  { path: 'llamadasreales', component: LlamadasRealesComponent, canActivate: [LoginGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard, AdminGuard] },
  // { path: '**', component: NotfoundComponent },
  { path: '', component: InicioComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
