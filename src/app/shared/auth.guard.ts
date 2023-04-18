import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { EmpleadoServicio } from '../empleado/servicios/empleado.servicio';
import { Empleado } from '../modelos/empleado';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  empleado = new Empleado();
  roles: string;
  constructor(private empleadoServicio: EmpleadoServicio, private router: Router, private http: HttpClient) {

  }

  //Se comprueba que permisos tiene el usuario actual para la navegacion de rutas dependiendo de los roles asignados
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = +localStorage.getItem("id")!;
    const idRuta = route.paramMap.get('id');
    console.log(idRuta);
    return this.empleadoServicio.obtenerEmpleadoPorId(id).pipe(
      switchMap((user) => {
        let permitido = false;
        let globalPerms = false;
        this.roles = user.rol.descripcion;
        return new Observable<boolean>((observer) => {
          route.data['role'].forEach((element: string) => {
            if (this.roles == element) {
              permitido = true;
              if (this.roles == "ADMIN") {
                globalPerms = true;
                return;
              }
            }
          });
          if (globalPerms == true) {
            observer.next(true);
          }
          else {
            if (permitido == true) {
              if (route.toString().includes('vacaciones/modificar')) {
                observer.next(true);
              }
              else if (idRuta == null || idRuta == undefined || idRuta == '0' || idRuta == localStorage.getItem("id")) {
                observer.next(true);
              }
              else {
                this.router.navigate(['/inicio']);
                observer.next(false);
              }
            }
            else {
              console.log("NO TENGO PERMISOS ME VOY A INICIO");
              this.router.navigate(['/inicio']);
              observer.next(false);
            }
          }
          observer.complete();
        });
      },
      ));

  }

}
