import { Component } from '@angular/core';
import { EmpleadoServicio } from '../servicios/empleado.servicio';
import { RolServicio } from 'src/app/rol/servicios/rol.servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol';
import { HttpErrorResponse } from '@angular/common/http';
import { Empleado } from 'src/app/modelos/empleado';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  idUser: number
  empleado: Empleado

  constructor(private empleadoServicio: EmpleadoServicio,
    private rolServicio: RolServicio,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.idUser = +localStorage.getItem('id')!
    this.cargarDatos(this.idUser)
  }

  public cargarDatos(idUser: number): void {
    this.empleadoServicio.obtenerEmpleadoPorId(idUser).subscribe((response: Empleado) => {
      this.empleado = response;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }
  public editarEmpleado(): void {
    this.empleadoServicio.modificarEmpleado(this.empleado).subscribe(
      () => {
        this.router.navigate(['/empleados/listar'])
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}


