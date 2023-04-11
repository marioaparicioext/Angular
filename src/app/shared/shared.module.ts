import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';
import { DatePipe } from '@angular/common';
import { ConversorFechaPipe } from '../pipes/conversor-fecha.pipe';




@NgModule({
  declarations: [ConversorFechaPipe],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ConversorFechaPipe,
    MaterialsModule,
    RouterModule
  ]
})
export class SharedModule { }
