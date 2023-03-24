import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './empleado/lista-empleados/lista-empleados.component';

const routes: Routes = [
  {path: '',redirectTo:'/empleados/listar', pathMatch:'full'},
  {path:'empleados', component: ListaEmpleadosComponent},
  {path:'empleados/listar', component: ListaEmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
