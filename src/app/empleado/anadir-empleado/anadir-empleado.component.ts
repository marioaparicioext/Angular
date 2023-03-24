import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelos/empleado';
import { EmpleadoServicio } from '../servicios/empleado.servicio';

@Component({
  selector: 'app-anadir-empleado',
  templateUrl: './anadir-empleado.component.html',
  styleUrls: ['./anadir-empleado.component.css']
})
export class AnadirEmpleadoComponent implements OnInit {
  
  constructor(private empleadoServicio: EmpleadoServicio){
  }
  ngOnInit(): void {
    
  }
    public anadirEmpleado(empleado: Empleado): void {
    this.empleadoServicio.anadirEmpleado(empleado).subscribe(
      () => {
        //duda
        this.anadirEmpleado(empleado);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  
   
}
