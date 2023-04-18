import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado';
import { Rol } from 'src/app/modelos/rol';
import { RolServicio } from 'src/app/rol/servicios/rol.servicio';
import { EmpleadoServicio } from '../servicios/empleado.servicio';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  empleado = new Empleado();
  id: number;
  desc: String
  roles: Rol[];
  constructor(private empleadoServicio: EmpleadoServicio,
    private rolServicio: RolServicio,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.obtenerRoles()
    this.cargarDatos()
  }

  //Se obtienen los roles
  public obtenerRoles(): void {
    this.rolServicio.obtenerRoles().subscribe((response: Rol[]) => {
      this.roles = response;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  //Se cargan los datos de un empleado dado su parametro id 
  public cargarDatos(): void {
    const idRuta = this.route.snapshot.paramMap.get('id');
    if (idRuta != null) {
      this.empleadoServicio.obtenerEmpleadoPorId(+idRuta).subscribe((response: Empleado) => {
        this.empleado = response;
        this.desc = this.empleado.rol.descripcion;
        console.log(this.empleado)
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
    } else {
      alert("idRuta es nulo");
    }
  }

  //Se edita el empleado 
  public editarEmpleado(): void {
    const role = this.roles.find(rol => rol.descripcion === this.desc)
    const rol = new Rol()
    if (role) {
      rol.id = role.id
      rol.descripcion = role.descripcion
    }
    this.empleado.rol = rol
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



