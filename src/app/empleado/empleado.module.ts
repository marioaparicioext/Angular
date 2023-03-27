import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { AnadirEmpleadoComponent } from './anadir-empleado/anadir-empleado.component';
import { BorrarEmpleadoComponent } from './borrar-empleado/borrar-empleado.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListaEmpleadosComponent,
    EditarEmpleadoComponent,
    AnadirEmpleadoComponent,
    BorrarEmpleadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EmpleadoModule { }
