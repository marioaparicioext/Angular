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
  vacacionesEmpleado: Vacaciones[];
  fechasInhabilitadas: Date[];
  hoy = new Date();
  limite: Date;
  empleadoId: number
  constructor(private vacacionesServicio: VacacionesServicio,
    private empleadoServicio: EmpleadoServicio,
    private router: Router,
    private dateAdapter: DateAdapter<Date>) {

    this.empleadoId = +localStorage.getItem("id")!;
    
    this.vacacionesServicio.obtenerVacacionesPorEmpleado(this.empleadoId).subscribe(
      (response: Vacaciones[]) => {
        this.vacacionesEmpleado = response;
        console.log(this.vacacionesEmpleado);
        this.fechasInhabilitadas = this.deshabilitarRangos(this.vacacionesEmpleado);
        this.fechasInhabilitadas.sort((a,b)=> a.getTime() - b.getTime())
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }
  deshabilitarRangos(vacacionesEmpleado: Vacaciones[]): Date[] {
    this.dateAdapter.setLocale('es');
    let dateArray: Date[] = [];
    vacacionesEmpleado.forEach(solicitud => {
      const fechaInicial = new Date(solicitud.fechaInicio);
      const fechaFin = new Date(solicitud.fechaFin);
      while (fechaInicial <= fechaFin) {
        dateArray.push(new Date(fechaInicial));
        // Use UTC date to prevent problems with time zones and DST
        fechaInicial.setDate(fechaInicial.getDate() + 1);
      }
    });
    console.log(dateArray);
    return dateArray;
  }
  

  weekendsDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    const time = d.getTime();
    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6 && !this.fechasInhabilitadas.find(x=>x.getTime()==time);
  }

  public obtenerNumeroDiasFinDeSemana(date: Date, numeroDiasVacaciones: number){
    var weekendDayCount = 0;
    const dateCopy = new Date(date);
    const toDate = new Date(date);
    console.log(toDate);
    toDate.setDate(toDate.getDate()+numeroDiasVacaciones);
    while(dateCopy < toDate){
        dateCopy.setDate(dateCopy.getDate() + 1);
        if(dateCopy.getDay() === 0 || dateCopy.getDay() == 6){
            ++weekendDayCount;
        }
    }

    return weekendDayCount ;
  }

  marcarLimite(date: Date){
    const tomorrow = new Date(date);
    let numeroDeshabilitados: number;
    const numeroDiasVacaciones=7;
    numeroDeshabilitados = this.obtenerNumeroDiasFinDeSemana(date, numeroDiasVacaciones);
    console.log("HAY DIAS DE FINDE",numeroDeshabilitados);
    // if(this.fechasInhabilitadas.length!=0){
    //   this.fechasInhabilitadas.forEach(dia => {
    //   });
      
    // }
    console.log("FECHA FIN",tomorrow);
    tomorrow.setDate(date.getDate()+numeroDiasVacaciones-1+numeroDeshabilitados);
    console.log("FECHA FIN",tomorrow);
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

