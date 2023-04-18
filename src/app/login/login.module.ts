import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { DirectivasModule } from '../directivas/directivas.module';



@NgModule({
  declarations: [
    LoginComponent,
    PantallaPrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    DirectivasModule,
    RouterModule.forChild([])
  ]
})
export class LoginModule {
}
