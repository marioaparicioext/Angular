import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnadirEmpleadoComponent } from './empleado/anadir-empleado/anadir-empleado.component';
import { ListaEmpleadosComponent } from './empleado/lista-empleados/lista-empleados.component';

const routes: Routes = [
  {path: '',redirectTo:'/empleados/listar', pathMatch:'full'},
  {path:'empleados', component: ListaEmpleadosComponent},
  {path:'empleados/listar', component: ListaEmpleadosComponent},
  {path:'empleados/anadir', component: AnadirEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
