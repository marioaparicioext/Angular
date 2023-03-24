import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoModule } from './empleado/empleado.module';
import { EmpleadoServicio } from './empleado/servicios/empleado.servicio';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EmpleadoModule
  ],
  providers: [EmpleadoServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
