import { Component, OnInit } from '@angular/core';
import { VacacionesServicio } from '../servicios/vacaciones.servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacaciones } from 'src/app/modelos/vacaciones';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-editar-vacaciones',
  templateUrl: './editar-vacaciones.component.html',
  styleUrls: ['./editar-vacaciones.component.css']
})
export class EditarVacacionesComponent implements OnInit {
  vacaciones = new Vacaciones();
  constructor(private route: ActivatedRoute, private router: Router, private vacacionesServicio: VacacionesServicio){
  }
  
  ngOnInit(): void {
    this.cargarDatos();

  }


  public cargarDatos(): void {
    const idRuta = this.route.snapshot.paramMap.get('id');
    console.log(idRuta);
    if (idRuta != null) {
      this.vacacionesServicio.obtenerVacacionesPorId(+idRuta).subscribe((response: Vacaciones) => {
        this.vacaciones = response;
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
    } else {
      alert("idRuta es nulo");
    }
  }



  public editarVacaciones(form: NgForm): void{
    this.vacacionesServicio.modificarVacaciones(this.vacaciones).subscribe(
      () => {
        this.router.navigate([`vacaciones/listar/${this.vacaciones.empleado.id}`]);
      }
    );
  }


  // public editarVacaciones(form: NgForm): void{
  //   const idRuta = this.route.snapshot.paramMap.get('id');
  //   this.vacacionesServicio.obtenerVacacionesPorId(+idRuta!).pipe(
  //     concatMap((vacaciones) => {
  //       this.vacaciones = vacaciones;
  //       return this.vacacionesServicio.modificarVacaciones(this.vacaciones);
  //     })
  //   ).subscribe((vacaciones)=>{
  //     this.router.navigate([`/vacaciones/listar/${localStorage.getItem("id")}`]);
  //   });
  // }
}