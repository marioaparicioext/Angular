import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Rol } from 'src/app/modelos/rol';
import { RolServicio } from '../servicios/rol.servicio';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent {
  roles: Rol[];
  constructor(private rolServicio: RolServicio){
  }
  ngOnInit(): void {
    this.obtenerRoles();
  }
  //Se obtienen los roles asignados
  public obtenerRoles(): void{
    this.rolServicio.obtenerRoles().subscribe(
      (response: Rol[]) => {
        this.roles = response;
        console.log(this.roles)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}