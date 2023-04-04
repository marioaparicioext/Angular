import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Empleado } from '../../modelos/empleado';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Credenciales } from 'src/app/modelos/credenciales';

@Injectable({
    providedIn: 'root'
})

export class LoginServicio {

    constructor(private http: HttpClient){

    }
    private apiServeUrl = 'http://localhost:8080';

    public login(credenciales: Credenciales){
        console.log("CREDENCIALES", credenciales)
        return this.http.post(this.apiServeUrl + "/login", credenciales, {
            observe: 'response'
        }).pipe(map((response: HttpResponse<any>) => {
            const body = response.body;
            const headers = response.headers;
            const bearerToken = headers.get('Authorization')

            const token = bearerToken?.replace('Bearer ', '')
            if(token!=undefined){
                localStorage.setItem('token',token);
            }
            

            return body;

        }))
    }

    public getToken(){
        return localStorage.getItem('token');
    }
}