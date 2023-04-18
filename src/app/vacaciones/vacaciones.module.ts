import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVacacionesComponent } from './lista-vacaciones/lista-vacaciones.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VacacionesEmpleadoComponent } from './vacaciones-empleado/vacaciones-empleado.component';
import { AnadirVacacionesComponent } from './anadir-vacaciones/anadir-vacaciones.component';
import { EditarVacacionesComponent } from './editar-vacaciones/editar-vacaciones.component';


@NgModule({
  declarations: [
    ListaVacacionesComponent,
    VacacionesEmpleadoComponent,
    AnadirVacacionesComponent,
    EditarVacacionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class VacacionesModule { }
