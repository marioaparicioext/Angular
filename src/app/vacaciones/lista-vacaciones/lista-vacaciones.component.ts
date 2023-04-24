import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';



@Component({
  selector: 'app-lista-vacaciones',
  templateUrl: './lista-vacaciones.component.html',
  styleUrls: ['./lista-vacaciones.component.css']
})
export class ListaVacacionesComponent implements OnInit {
  listaVacaciones: Vacaciones[];
  vacaciones: Vacaciones;
  listaEstados = ["Aceptada", "Denegada", "Pendiente"];
  filtroSeleccionado = "";
  page: number;
  constructor(private vacacionesServicio: VacacionesServicio) {
  }

  ngOnInit(): void {
    this.obtenerVacaciones()
  }


  //Se obtienen la lista de vacaciones 
  public obtenerVacaciones(): void {
    this.vacacionesServicio.obtenerVacaciones().subscribe(
      (response: Vacaciones[]) => {
        this.listaVacaciones = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteVacaciones(vacaciones: Vacaciones){
    this.vacaciones=vacaciones;
  }


  //Se elimina las vacaciones dado el id de las mismas
  public eliminarVacaciones(id: number): void {
    this.vacacionesServicio.borrarVacaciones(id).subscribe(
      () => {
        this.obtenerVacaciones();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  //Se deniegan las vacaciones del id dado
  public denegarVacaciones(id: number): void {
    let vac = new Vacaciones();
    vac = this.listaVacaciones.find(vacaciones => vacaciones.id === id)!;
    vac.estado = 'Denegada';
    this.vacacionesServicio.modificarVacaciones(vac).subscribe(
      () => {

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }
  //Se aprueban las vacaciones del id dado
  public aprobarVacaciones(id: number): void {
    let vac = new Vacaciones();
    vac = this.listaVacaciones.find(vacaciones => vacaciones.id === id)!;
    vac.estado = 'Aceptada';
    this.vacacionesServicio.modificarVacaciones(vac).subscribe(
      () => {

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }
}
