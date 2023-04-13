import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoServicio } from '../empleado/servicios/empleado.servicio';
import { Empleado } from '../modelos/empleado';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  empleado = new Empleado();
  
  
  constructor(private empleadoServicio: EmpleadoServicio, private router: Router, private http: HttpClient){
    
  }
  


    usuarioActual(route: ActivatedRouteSnapshot): boolean {

      const id = +localStorage.getItem("id")!;
      const permitido = 
      this.empleadoServicio.obtenerEmpleadoPorId(id).subscribe(
        (response: Empleado) => {
          this.empleado = response;
          let roles: string;
          roles = this.empleado.rol.descripcion;
          return roles.includes(route.data['role']);
        },
          (error: HttpErrorResponse) => {
            alert(error.message);
          });
        
      } 
    
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioActual(route);
  }
  
}
