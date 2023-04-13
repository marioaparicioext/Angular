import { Component } from '@angular/core';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmpleadoServicio } from 'src/app/empleado/servicios/empleado.servicio';
import { Empleado } from 'src/app/modelos/empleado';
import { concatMap, switchMap } from 'rxjs';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-anadir-vacaciones',
  templateUrl: './anadir-vacaciones.component.html',
  styleUrls: ['./anadir-vacaciones.component.css']
})
export class AnadirVacacionesComponent {
  vacaciones = new Vacaciones();
  empleadoId: number
  constructor(private vacacionesServicio: VacacionesServicio,
    private empleadoServicio: EmpleadoServicio, 
    private router: Router){
      if(localStorage != null){
        console.log("HOLA GOLA");
        const id = localStorage.getItem("id");
        if(id != null){
          this.empleadoId = +id;
        }
      }  
  }

  // dateRange = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
  public anadirVacacionesOrig(): void{
    console.log("ID EMPLEADO" + this.empleadoId);
    this.empleadoServicio.obtenerEmpleadoPorId(this.empleadoId).subscribe((response: Empleado) => {
      this.vacaciones.empleado = response;
      this.vacaciones.fechaSolicitud = new Date();
      this.vacaciones.estado = "Pendiente";
      console.log("FECHA INICIO"+this.vacaciones.fechaInicio);


      this.vacacionesServicio.anadirVacaciones(this.vacaciones).subscribe(
        (response1: Vacaciones) => {
          this.router.navigate([`/vacaciones/listar/${this.empleadoId}`]);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });

  }


  public anadirVacaciones(form: NgForm): void{
    const startDate = this.vacaciones.fechaInicio;
    const endDate = this.vacaciones.fechaFin;
    console.log(startDate+" INICIO");
    this.empleadoServicio.obtenerEmpleadoPorId(this.empleadoId).pipe(
      concatMap((empleado) => {
        this.vacaciones.fechaSolicitud = new Date();
        this.vacaciones.fechaInicio = startDate;
        this.vacaciones.fechaFin = endDate;
        this.vacaciones.estado = "Pendiente";
        this.vacaciones.empleado = empleado;
        return this.vacacionesServicio.anadirVacaciones(this.vacaciones);
      })
    ).subscribe((vacaciones)=>{
      this.router.navigate([`/vacaciones/listar/${this.empleadoId}`]);
    });
  }
}
