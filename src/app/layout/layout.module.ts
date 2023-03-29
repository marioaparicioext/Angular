import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TopMenuComponent
  ],
  exports: [
    TopMenuComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule { }
