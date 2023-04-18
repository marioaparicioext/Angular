import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';
import { ConversorFechaPipe } from '../pipes/conversor-fecha.pipe';
import { EstadosFitroPipe } from '../pipes/estados-fitro.pipe';

@NgModule({
  declarations: [ConversorFechaPipe, EstadosFitroPipe],
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
    EstadosFitroPipe,
    MaterialsModule,
    RouterModule
  ]
})
export class SharedModule { }
