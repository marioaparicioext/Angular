import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Vacaciones } from "./modelos/vacaciones";


@Injectable({
    providedIn: 'root'
})

export class EmpleadoServicio {
    private apiServeUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    public obtenerVacaciones(): Observable<Vacaciones[]> {
        return this.http.get<Vacaciones[]>(`${this.apiServeUrl}/vacaciones/listar`);
    }

    public anadirVacaciones(vacaciones: Vacaciones): Observable<Vacaciones> {
        return this.http.post<Vacaciones>(`${this.apiServeUrl}/vacaciones/anadir`, vacaciones);
    }

    public modificarVacaciones(vacaciones: Vacaciones): Observable<Vacaciones> {
        return this.http.put<Vacaciones>(`${this.apiServeUrl}/vacaciones/modificar`, vacaciones);
    }

    public borrarVacaciones(vacacionesId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/vacaciones/borrar/${vacacionesId}`);
    }

    public obtenerVacacionesPorId(vacacionesId: number): Observable<Vacaciones>{
        return this.http.get<Vacaciones>(`${this.apiServeUrl}/vacaciones/${vacacionesId}`);
    }
}

