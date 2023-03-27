import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoModule } from './empleado/empleado.module';
import { EmpleadoServicio } from './empleado/servicios/empleado.servicio';
import { RolModule } from './rol/rol.module';
import { RolServicio } from './rol/servicios/rol.servicio';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EmpleadoModule,
    SharedModule,
    RolModule
  ],
  providers: [EmpleadoServicio, RolServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
