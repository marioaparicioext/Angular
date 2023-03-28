import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVacacionesComponent } from './lista-vacaciones/lista-vacaciones.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListaVacacionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class VacacionesModule { }
