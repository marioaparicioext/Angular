import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from './modelos/empleado';
import { EmpleadoServicio } from './empleado/servicios/empleado.servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public empleados: Empleado[];

  constructor(private empleadoServicio: EmpleadoServicio){}
  ngOnInit(): void {
    //this.obtenerEmpleados();
  }

  

  
}
