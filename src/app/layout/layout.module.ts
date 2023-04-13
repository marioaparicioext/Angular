import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DirectivasModule } from '../directivas/directivas.module';


@NgModule({
  declarations: [
    TopMenuComponent
  ],
  exports: [
    TopMenuComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    DirectivasModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule { }
