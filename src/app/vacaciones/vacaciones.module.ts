import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVacacionesComponent } from './lista-vacaciones/lista-vacaciones.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VacacionesEmpleadoComponent } from './vacaciones-empleado/vacaciones-empleado.component';



@NgModule({
  declarations: [
    ListaVacacionesComponent,
    VacacionesEmpleadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class VacacionesModule { }
