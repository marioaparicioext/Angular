import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolDirective } from './rol.directive';




@NgModule({
  declarations: [
    RolDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RolDirective
  ]
})
export class DirectivasModule { }
