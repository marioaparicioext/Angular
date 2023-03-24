import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelos/empleado';
import { EmpleadoServicio } from '../servicios/empleado.servicio';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: Empleado[];
  constructor(private empleadoServicio: EmpleadoServicio){
  }
  ngOnInit(): void {
    this.obtenerEmpleados();
    
  }
  public obtenerEmpleados(): void{
    this.empleadoServicio.obtenerEmpleados().subscribe(
      (response: Empleado[]) => {
        console.log("LLAMADA AL MÉTODO DE OBTENCION DE EMPLEADOS")
        this.empleados = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public eliminarEmpleado(id: number): void{
    
    this.empleadoServicio.borrarEmpleado(id).subscribe(
      () => {
        //Duda
        this.obtenerEmpleados();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
