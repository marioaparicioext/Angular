import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmpleadoServicio } from 'src/app/empleado/servicios/empleado.servicio';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';

@Component({
  selector: 'app-lista-vacaciones',
  templateUrl: './lista-vacaciones.component.html',
  styleUrls: ['./lista-vacaciones.component.css']
})
export class ListaVacacionesComponent implements OnInit {
  listaVacaciones: Vacaciones[];
  constructor(private vacacionesServicio: VacacionesServicio, 
    private empleadoServicio: EmpleadoServicio){
  }

  ngOnInit(): void {
    this.obtenerVacaciones()
  }

  
  public obtenerVacaciones(): void{
    this.vacacionesServicio.obtenerVacaciones().subscribe(
      (response: Vacaciones[]) => {
        this.listaVacaciones = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public eliminarVacaciones(id: number): void{
    this.vacacionesServicio.borrarVacaciones(id).subscribe(
      () => {
        //Duda
        this.obtenerVacaciones();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
