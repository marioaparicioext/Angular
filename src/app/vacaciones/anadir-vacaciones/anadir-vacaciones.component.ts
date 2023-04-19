import { Component } from '@angular/core';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
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
  hoy = new Date();
  limite: Date;
  empleadoId: number
  constructor(private vacacionesServicio: VacacionesServicio,
    private empleadoServicio: EmpleadoServicio,
    private router: Router,
    private dateAdapter: DateAdapter<Date>) {
    this.empleadoId = +localStorage.getItem("id")!;
  }


  weekendsDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6;
  }

  marcarLimite(date: Date){
    const tomorrow = new Date(date);
    const numeroDeshabilitados =2;
    tomorrow.setDate(date.getDate()+6+numeroDeshabilitados);
    this.limite = tomorrow;
    let currentDate = new Date(date);
    let dateSent = new Date(this.limite);
    let days = Math.floor(Math.abs((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)));
    const diasElegidos = days - numeroDeshabilitados;
    console.log(diasElegidos);
    this.dateAdapter.setLocale('es');
  }

  resetLimit(date: Date){
    this.limite = new Date(date.getFullYear(), 11, 31);
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
