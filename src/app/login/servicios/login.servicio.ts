import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Empleado } from '../../modelos/empleado';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Credenciales } from 'src/app/modelos/credenciales';
import { EmpleadoServicio } from 'src/app/empleado/servicios/empleado.servicio';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class LoginServicio {

    constructor(private http: HttpClient, private empleadoService: EmpleadoServicio, private router: Router) {
    }
    private apiServeUrl = 'http://localhost:8080';

    public login(credenciales: Credenciales) {
        console.log("CREDENCIALES", credenciales);
        let empleado = new Empleado();
        this.empleadoService.obtenerEmpleadoPorUsername(credenciales.email).subscribe(
            (response: Empleado) => {
                empleado = response;
                if (response != null) {
                    console.log(response);
                    localStorage.setItem('id', "" + response.id);
                }
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
        return this.http.post(this.apiServeUrl + "/login", credenciales, {
            observe: 'response'
        }).pipe(map((response: HttpResponse<any>) => {
            const body = response.body;
            const headers = response.headers;
            const bearerToken = headers.get('Authorization');
            const token = bearerToken?.replace('Bearer ', '');
            if (token != undefined) {
                localStorage.setItem('token', token);
            }
            return empleado;
        }));
    }




    public loginBackup(credenciales: Credenciales) {
        console.log("CREDENCIALES", credenciales);
        this.empleadoService.obtenerEmpleadoPorUsername(credenciales.email).subscribe(
            (response: Empleado) => {
                console.log("PRIMERO guardo el id " + response.id);
                localStorage.setItem('id', "" + response.id);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
        return this.http.post(this.apiServeUrl + "/login", credenciales, {
            observe: 'response'
        }).pipe(map((response: HttpResponse<any>) => {
            console.log("HE DEVUELTO AL ORIGEN? 1");
            const body = response.body;
            const headers = response.headers;
            const bearerToken = headers.get('Authorization');
            console.log(body, "BODY");
            console.log(headers, "HEADERS");
            console.log(bearerToken, "BEARER");
            const token = bearerToken?.replace('Bearer ', '');
            if (token != undefined) {
                localStorage.setItem('token', token);
            }
            console.log("HE DEVUELTO AL ORIGEN? 2");
            console.log("HE DEVUELTO AL ORIGEN? 3");
            return body;
        }));
    }

    public logout() {
        localStorage.clear();
    }

    public getToken() {
        return localStorage.getItem('token');
    }
}