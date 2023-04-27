import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelos/empleado';
import { EmpleadoServicio } from '../servicios/empleado.servicio';
import { RolServicio } from 'src/app/rol/servicios/rol.servicio';
import { Rol } from 'src/app/modelos/rol';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: Empleado[];
  public empleado: Empleado;
  page: number;
  emailFiltro: string = "";
  rolFiltro: string = "";
  listaRoles: Rol[];
  constructor(private empleadoServicio: EmpleadoServicio, private rolServicio: RolServicio) {
  }
  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerEmpleados();
    
  }

  public obtenerRoles(): void {
    this.rolServicio.obtenerRoles().subscribe((response: Rol[]) => {
      this.listaRoles = response;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
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

  public onDeleteEmployee(employee: Empleado){
    this.empleado = employee;
  }

  //Se elimina el empleado dado su id
  public eliminarEmpleado(id: number): void {
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
