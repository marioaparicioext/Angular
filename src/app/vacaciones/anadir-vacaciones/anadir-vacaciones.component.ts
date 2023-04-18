import { Component } from '@angular/core';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmpleadoServicio } from 'src/app/empleado/servicios/empleado.servicio';
import { concatMap } from 'rxjs';
import { NgForm } from '@angular/forms';

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
    private router: Router) {
    this.empleadoId = +localStorage.getItem("id")!;
  }


  //Se anade las vacaciones solicitadas al usuario actual dado su id
  public anadirVacaciones(form: NgForm): void {
    const startDate = this.vacaciones.fechaInicio;
    const endDate = this.vacaciones.fechaFin;
    console.log(startDate + " INICIO");
    this.empleadoServicio.obtenerEmpleadoPorId(this.empleadoId).pipe(
      concatMap((empleado) => {
        this.vacaciones.fechaSolicitud = new Date();
        this.vacaciones.fechaInicio = startDate;
        this.vacaciones.fechaFin = endDate;
        this.vacaciones.estado = "Pendiente";
        this.vacaciones.empleado = empleado;
        return this.vacacionesServicio.anadirVacaciones(this.vacaciones);
      })
    ).subscribe((vacaciones) => {
      this.router.navigate([`/vacaciones/listar/${this.empleadoId}`]);
    });
  }
}
