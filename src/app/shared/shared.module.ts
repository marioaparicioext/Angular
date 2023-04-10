import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    RouterModule
  ]
})
export class SharedModule { }
