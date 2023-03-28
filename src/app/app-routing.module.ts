import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnadirEmpleadoComponent } from './empleado/anadir-empleado/anadir-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';
import { ListaEmpleadosComponent } from './empleado/lista-empleados/lista-empleados.component';
import { ListaRolesComponent } from './rol/lista-roles/lista-roles.component';

const routes: Routes = [
  {path: '',redirectTo:'/empleados/listar', pathMatch:'full'},
  {path:'empleados', component: ListaEmpleadosComponent},
  {path:'empleados/listar', component: ListaEmpleadosComponent},
  {path:'empleados/anadir', component: AnadirEmpleadoComponent},
  {path:'roles/listar', component: ListaRolesComponent},
  {path:'empleados/editar/:id', component: EditarEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
