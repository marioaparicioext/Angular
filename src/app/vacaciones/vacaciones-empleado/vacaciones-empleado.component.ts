import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoServicio } from 'src/app/empleado/servicios/empleado.servicio';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';

@Component({
  selector: 'app-vacaciones-empleado',
  templateUrl: './vacaciones-empleado.component.html',
  styleUrls: ['./vacaciones-empleado.component.css']
})
export class VacacionesEmpleadoComponent implements OnInit {
  listaVacaciones: Vacaciones[];

  constructor(private vacacionesServicio: VacacionesServicio, private empleadoServicio: EmpleadoServicio,
     private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.obtenerVacacionesId();
  }


  public obtenerVacacionesId(): void {
    const idRuta = this.route.snapshot.paramMap.get('id');
    if (idRuta != null) {
      this.vacacionesServicio.obtenerVacacionesPorEmpleado(+idRuta).subscribe(
        (response: Vacaciones[]) => {
          this.listaVacaciones = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    } else {
        alert("idRuta es nulo")
    }
  }
}
