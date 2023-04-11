import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolDirective } from './rol.directive';
import { EstadoDirective } from './estado.directive';



@NgModule({
  declarations: [
    RolDirective,
    EstadoDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RolDirective,
    EstadoDirective
  ]
})
export class DirectivasModule { }
