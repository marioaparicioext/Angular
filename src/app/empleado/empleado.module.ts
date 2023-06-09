import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { AnadirEmpleadoComponent } from './anadir-empleado/anadir-empleado.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { DirectivasModule } from '../directivas/directivas.module';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';




@NgModule({
  declarations: [
    ListaEmpleadosComponent,
    EditarEmpleadoComponent,
    AnadirEmpleadoComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    DirectivasModule,
    RouterModule.forChild([])
  ]
})
export class EmpleadoModule { }
