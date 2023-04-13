import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnadirEmpleadoComponent } from './empleado/anadir-empleado/anadir-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';
import { ListaEmpleadosComponent } from './empleado/lista-empleados/lista-empleados.component';
import { LoginComponent } from './login/login/login.component';
import { ListaRolesComponent } from './rol/lista-roles/lista-roles.component';
import { ListaVacacionesComponent } from './vacaciones/lista-vacaciones/lista-vacaciones.component';
import { VacacionesEmpleadoComponent } from './vacaciones/vacaciones-empleado/vacaciones-empleado.component';
import { PantallaPrincipalComponent } from './login/pantalla-principal/pantalla-principal.component';
import { AnadirVacacionesComponent } from './vacaciones/anadir-vacaciones/anadir-vacaciones.component';
import { EditarPerfilComponent } from './empleado/editar-perfil/editar-perfil.component';
import { AuthGuard } from './shared/auth.guard';
import { EditarVacacionesComponent } from './vacaciones/editar-vacaciones/editar-vacaciones.component';

const routes: Routes = [
  {path: '',redirectTo:'/login', pathMatch:'full'},
  {path: 'inicio', component: PantallaPrincipalComponent},
  {path:'empleados', component: ListaEmpleadosComponent},
  {path:'empleados/listar', component: ListaEmpleadosComponent, data:{role: ['ADMIN']}, canActivate: [AuthGuard]},
  {path:'empleados/anadir', component: AnadirEmpleadoComponent, data:{role: ['ADMIN'] }, canActivate: [AuthGuard]},
  {path:'roles/listar', component: ListaRolesComponent, data: {role: ['ADMIN']}, canActivate: [AuthGuard]},
  {path:'empleados/modificar/:id', component: EditarEmpleadoComponent, data: {role: ['ADMIN']}, canActivate: [AuthGuard]},
  {path:'vacaciones/modificar/:id', component: EditarVacacionesComponent, data: {role: ['ADMIN', 'EMPLEADO']}, canActivate: [AuthGuard]},
  {path: 'vacaciones/listar', component: ListaVacacionesComponent, data: {role: ['ADMIN','JEFE']}, canActivate: [AuthGuard]},
  {path: 'vacaciones/anadir', component: AnadirVacacionesComponent},
  {path: 'vacaciones/listar/:id', component: VacacionesEmpleadoComponent, data: {role: ['ADMIN','EMPLEADO']}, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: EditarPerfilComponent},
  {path:'empleados/editarPerfil', component: EditarPerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
