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

const routes: Routes = [
  {path: '',redirectTo:'/login', pathMatch:'full'},
  {path: 'inicio', component: PantallaPrincipalComponent},
  {path:'empleados', component: ListaEmpleadosComponent},
  {path:'empleados/listar', component: ListaEmpleadosComponent},
  {path:'empleados/anadir', component: AnadirEmpleadoComponent},
  {path:'roles/listar', component: ListaRolesComponent},
  {path:'empleados/modificar/:id', component: EditarEmpleadoComponent},
  {path: 'vacaciones/listar', component: ListaVacacionesComponent},
  {path: 'vacaciones/listar/:id', component: VacacionesEmpleadoComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
