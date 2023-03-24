import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rol } from "./rol";

@Injectable({
    providedIn: 'root'
})
export class RolServicio {
    private apiServeUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    public obtenerRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(`${this.apiServeUrl}/roles/listar`);
    }

    public anadirRol(rol: Rol): Observable<Rol> {
        return this.http.post<Rol>(`${this.apiServeUrl}/roles/anadir`, rol);
    }

}