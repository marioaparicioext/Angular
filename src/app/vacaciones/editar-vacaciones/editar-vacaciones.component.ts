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
  limite: Date;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private vacacionesServicio: VacacionesServicio,
    private dateAdapter: DateAdapter<Date>) {
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

  resetLimit(){
    const date = new Date();
    this.limite = new Date(date.getFullYear(), 11, 31);
  }



}
