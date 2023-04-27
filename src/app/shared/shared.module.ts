import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';
import { ConversorFechaPipe } from '../pipes/conversor-fecha.pipe';
import { EstadosFitroPipe } from '../pipes/estados-fitro.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmpleadoFilterPipe } from '../pipes/empleado-filter.pipe';


@NgModule({
  declarations: [ConversorFechaPipe, EstadosFitroPipe, EmpleadoFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ConversorFechaPipe,
    EstadosFitroPipe,
    MaterialsModule,
    RouterModule,
    NgxPaginationModule,
    EmpleadoFilterPipe
  ]
})
export class SharedModule { }
