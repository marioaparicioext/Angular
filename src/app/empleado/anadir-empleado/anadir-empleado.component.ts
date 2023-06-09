import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado';
import { Rol } from 'src/app/modelos/rol';
import { RolServicio } from 'src/app/rol/servicios/rol.servicio';
import { EmpleadoServicio } from '../servicios/empleado.servicio';


@Component({
  selector: 'app-anadir-empleado',
  templateUrl: './anadir-empleado.component.html',
  styleUrls: ['./anadir-empleado.component.css']
})
export class AnadirEmpleadoComponent implements OnInit {
  empleado = new Empleado();
  desc: String
  roles: Rol[];
  constructor(private empleadoServicio: EmpleadoServicio, private rolServicio: RolServicio, private router: Router) {
  }
  ngOnInit(): void {
    this.obtenerRoles()
  }
  //Se obtiene los roles asignados
  public obtenerRoles(): void {
    this.rolServicio.obtenerRoles().subscribe((response: Rol[]) => {
      this.roles = response;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
  //se anade un empleado con una contrasena generada y ya encriptada
  public anadirEmpleado(): void {
    const role = this.roles.find(rol => rol.descripcion === this.desc)
    console.log(role)
    const rol = new Rol()
    if (role) {
      rol.id = role.id
      rol.descripcion = role.descripcion
    }
    const password = Array(20).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
      .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)]).join('');
    const empleadoConRol = { ...this.empleado, rol: rol, contrasena: password }
    this.empleadoServicio.anadirEmpleado(empleadoConRol).subscribe(
      () => {
        this.router.navigate(['/empleados/listar'])
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


}
