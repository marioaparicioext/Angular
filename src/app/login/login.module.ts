import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';



@NgModule({
  declarations: [
    LoginComponent,
    PantallaPrincipalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
