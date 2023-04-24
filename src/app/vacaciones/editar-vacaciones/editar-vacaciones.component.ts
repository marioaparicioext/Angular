import { Component, OnInit } from '@angular/core';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-editar-vacaciones',
  templateUrl: './editar-vacaciones.component.html',
  styleUrls: ['./editar-vacaciones.component.css']
})
export class EditarVacacionesComponent implements OnInit {
  hoy = new Date();
  vacaciones = new Vacaciones();
  vacacionesEmpleado: Vacaciones[];
  fechasInhabilitadas: Date[];
  limite: Date;
  empleadoId: number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private vacacionesServicio: VacacionesServicio,
    private dateAdapter: DateAdapter<Date>) {
      this.cargarDatos();
      this.empleadoId = +localStorage.getItem("id")!;
      this.vacacionesServicio.obtenerVacacionesPorEmpleado(this.empleadoId).subscribe(
        (response: Vacaciones[]) => {
          this.vacacionesEmpleado = response;
          console.log(this.vacacionesEmpleado);
          this.fechasInhabilitadas = this.deshabilitarRangos(this.vacacionesEmpleado);
          console.log("Fechas inhabilitadas" + this.fechasInhabilitadas);
          this.fechasInhabilitadas.sort((a,b)=> a.getTime() - b.getTime())
          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
  }
  

  ngOnInit(): void {
    this.cargarDatos();

  }


  //Carga los datos de las vacaciones dado el id de las vacaciones
  public cargarDatos(): void {
    const idRuta = this.route.snapshot.paramMap.get('id');
    console.log(idRuta);
    if (idRuta != null) {
      this.vacacionesServicio.obtenerVacacionesPorId(+idRuta).subscribe((response: Vacaciones) => {
        this.vacaciones = response;
        this.limite = this.vacaciones.fechaFin;
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
    } else {
      alert("idRuta es nulo");
    }
  }

  //Se editan las vacaciones actuales
  public editarVacaciones(form: NgForm): void {
    this.vacaciones.fechaSolicitud = new Date();
    this.vacacionesServicio.modificarVacaciones(this.vacaciones).subscribe(
      () => {
        this.router.navigate([`vacaciones/listar/${this.vacaciones.empleado.id}`]);
      }
    );
  }

  // public anadirVacaciones(form: NgForm): void {
  //   const startDate = this.vacaciones.fechaInicio;
  //   const endDate = this.vacaciones.fechaFin;
  //   console.log(startDate + " INICIO");
  //   this.empleadoServicio.obtenerEmpleadoPorId(this.empleadoId).pipe(
  //     concatMap((empleado) => {
  //       this.vacaciones.fechaSolicitud = new Date();
  //       this.vacaciones.fechaInicio = startDate;
  //       this.vacaciones.fechaFin = endDate;
  //       this.vacaciones.estado = "Pendiente";
  //       this.vacaciones.empleado = empleado;
  //       return this.vacacionesServicio.anadirVacaciones(this.vacaciones);
  //     })
  //   ).subscribe((vacaciones) => {
  //     this.router.navigate([`/vacaciones/listar/${this.empleadoId}`]);
  //   });
  // }
  deshabilitarRangos(vacacionesEmpleado: Vacaciones[]): Date[] {
    this.dateAdapter.setLocale('es');
    let dateArray: Date[] = [];
    const fechaOriginalInicio = new Date(this.vacaciones.fechaInicio); 
    vacacionesEmpleado.forEach(solicitud => {
      const fechaInicial = new Date(solicitud.fechaInicio);
      const fechaFin = new Date(solicitud.fechaFin);
      console.log("Imprimo vacaciones" + this.vacaciones.fechaInicio);
      if (fechaInicial.getTime() == fechaOriginalInicio.getTime()) {
        console.log(fechaInicial + "Estamos modificando con la misma fecha inicial");

      } else {
        while (fechaInicial <= fechaFin) {
          dateArray.push(new Date(fechaInicial));
          // Use UTC date to prevent problems with time zones and DST
          fechaInicial.setDate(fechaInicial.getDate() + 1);
        }
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

  marcarLimite2(date: Date) {
    const tomorrow = new Date(date);
    const numeroDeshabilitados = 2;
    tomorrow.setDate(date.getDate() + 6 + numeroDeshabilitados);
    this.limite = tomorrow;
    let currentDate = new Date(date);
    let dateSent = new Date(this.limite);
    let days = Math.floor(Math.abs((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24)));
    const diasElegidos = days - numeroDeshabilitados;
    console.log(diasElegidos);
    this.dateAdapter.setLocale('es');
  }

  marcarLimite(date: Date){
    const dateCopy = new Date(date);
    const tomorrow = new Date(date);
    let numeroDeshabilitados: number;
    const numeroDiasVacaciones=6;
    numeroDeshabilitados = this.obtenerNumeroDiasFinDeSemana(date, numeroDiasVacaciones);
    console.log("HAY DIAS DE FINDE",numeroDeshabilitados);
    console.log("FECHA FIN",tomorrow);
    tomorrow.setDate(date.getDate()+numeroDiasVacaciones-1+numeroDeshabilitados);
    console.log("FECHA FIN",tomorrow);
    console.log("FECHA CON LA QUE VERIFICAMOS LAS FECHAS INHABILITADAS",dateCopy);
    if(this.fechasInhabilitadas.length!=0){
      let numeroDiasDisponibles =  0;
      let incluida = 1;
      while(numeroDiasDisponibles<numeroDiasVacaciones+numeroDeshabilitados){
        console.log("VERIFICANDO DÍA A DÍA", numeroDiasDisponibles);
        this.fechasInhabilitadas.forEach(fecha => {
          if((fecha.getTime() == dateCopy.getTime()) && this.isNotWeekend(dateCopy)){
            console.log("LA FECHA INCLUIDA ES: ", dateCopy);
            tomorrow.setDate(dateCopy.getDate());
            console.log("LA FECHA TOMORROW SE ASIGNA A: ", dateCopy);
            incluida=0;
          }
        });
        if(incluida==0){
          break;
        }
        dateCopy.setDate(dateCopy.getDate()+1);
        numeroDiasDisponibles++;
      }
    }
    if(tomorrow.getDay()==0){
      tomorrow.setDate(tomorrow.getDate()+1);
    }
    if(tomorrow.getDay()==6){
      tomorrow.setDate(tomorrow.getDate()+2);
    }
    console.log("LA FECHA LIMITE: ", tomorrow);
    this.limite = tomorrow;
    // let currentDate = new Date(date);
    // let dateSent = new Date(this.limite);
    // let days = Math.floor(Math.abs((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)));
    // const diasElegidos = days - numeroDeshabilitados;
    // console.log(diasElegidos);
    this.dateAdapter.setLocale('es');
  }

  isNotWeekend (d: Date) {
    const day = d.getDay();
    const time = d.getTime();
    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6
  }

  public obtenerNumeroDiasFinDeSemana(date: Date, numeroDiasVacaciones: number){
    var weekendDayCount = 0;
    const dateCopy = new Date(date);
    const toDate = new Date(date);
    console.log("VOY A REVISAR HASTA (PREVIO) ",toDate);
    toDate.setDate(toDate.getDate()+numeroDiasVacaciones);
    console.log("VOY A REVISAR HASTA ",toDate);
    while(dateCopy < toDate){
        dateCopy.setDate(dateCopy.getDate() + 1);
        if(dateCopy.getDay() == 0 || dateCopy.getDay() == 6){
            ++weekendDayCount;
        }
    }

    return weekendDayCount ;
  }
  resetLimit() {
    const date = new Date();
    this.limite = new Date(date.getFullYear(), 11, 31);
  }



}
