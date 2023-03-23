import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoServicio } from './empleado.servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public empleados: Empleado[];

  constructor(private empleadoServicio: EmpleadoServicio){}
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  public obtenerEmpleados(): void{
    this.empleadoServicio.obtenerEmpleados().subscribe(
      (response: Empleado[]) => {
        this.empleados = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  
}
