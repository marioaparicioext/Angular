import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rol } from "../../modelos/rol";

@Injectable({
    providedIn: 'root'
})
export class RolServicio {
    private apiServeUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    //Se obtienen los roles existentes
    public obtenerRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(`${this.apiServeUrl}/roles/listar`);
    }

    //Se anade un rol nuevo
    public anadirRol(rol: Rol): Observable<Rol> {
        return this.http.post<Rol>(`${this.apiServeUrl}/roles/anadir`, rol);
    }

}