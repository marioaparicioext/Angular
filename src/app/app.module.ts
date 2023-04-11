import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoModule } from './empleado/empleado.module';
import { EmpleadoServicio } from './empleado/servicios/empleado.servicio';
import { RolModule } from './rol/rol.module';
import { RolServicio } from './rol/servicios/rol.servicio';
import { SharedModule } from './shared/shared.module';
import { VacacionesModule } from './vacaciones/vacaciones.module';
import { VacacionesServicio } from './vacaciones/servicios/vacaciones.servicio';
import { LayoutModule } from './layout/layout.module';
import { LoginServicio } from './login/servicios/login.servicio';
import { LoginModule } from './login/login.module';
import { AuthInterceptor } from './interceptores/auth.interceptor';
import { DirectivasModule } from './directivas/directivas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversorFechaPipe } from './pipes/conversor-fecha.pipe';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { EstadosFitroPipe } from './pipes/estados-fitro.pipe';

registerLocaleData(localeEs)

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
    RolModule, 
    VacacionesModule,
    LayoutModule, 
    LoginModule,
    DirectivasModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  },
  {
    provide: LOCALE_ID, useValue:"es"
  },
    EmpleadoServicio, RolServicio, VacacionesServicio, LoginServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
