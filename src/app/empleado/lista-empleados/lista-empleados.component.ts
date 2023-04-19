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
  constructor(private empleadoServicio: EmpleadoServicio) {
  }
  ngOnInit(): void {
    this.obtenerEmpleados();
  }
  //Se obtienen los empleados 
  public obtenerEmpleados(): void {
    this.empleadoServicio.obtenerEmpleados().subscribe(
      (response: Empleado[]) => {
        this.empleados = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  //Se elimina el empleado dado su id
  public eliminarEmpleado(id: number): void {
    //if (confirm("Are you sure to delete " + empleado.email)) {
      console.log("Implement delete functionality here");
      this.empleadoServicio.borrarEmpleado(id).subscribe(
        () => {

          this.obtenerEmpleados();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    
  }
}
