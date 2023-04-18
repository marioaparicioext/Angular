import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Empleado } from "src/app/modelos/empleado";
import { Vacaciones } from "../../modelos/vacaciones";


@Injectable({
    providedIn: 'root'
})

export class VacacionesServicio {
    private apiServeUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    //Se obtiene la lista de vacaciones
    public obtenerVacaciones(): Observable<Vacaciones[]> {
        return this.http.get<Vacaciones[]>(`${this.apiServeUrl}/vacaciones/listar`);
    }

    //Se anade vacaciones
    public anadirVacaciones(vacaciones: Vacaciones): Observable<Vacaciones> {
        return this.http.post<Vacaciones>(`${this.apiServeUrl}/vacaciones/anadir`, vacaciones);
    }

    //Se modifican las vacaciones por las introducidas por parametro
    public modificarVacaciones(vacaciones: Vacaciones): Observable<Vacaciones> {
        return this.http.put<Vacaciones>(`${this.apiServeUrl}/vacaciones/modificar`, vacaciones);
    }

    //Se borran las vacaciones mediante su id
    public borrarVacaciones(vacacionesId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/vacaciones/borrar/${vacacionesId}`);
    }

    //Se obtienen las vacaciones mediante el id de las vacacaiones dado
    public obtenerVacacionesPorId(vacacionesId: number): Observable<Vacaciones>{
        return this.http.get<Vacaciones>(`${this.apiServeUrl}/vacaciones/${vacacionesId}`);
    }

    //Se obtienen las vacaciones mediante el id del empleado dado
    public obtenerVacacionesPorEmpleado(empleadoId: number): Observable<Vacaciones[]>{
        return this.http.get<Vacaciones[]>(`${this.apiServeUrl}/vacaciones/listar/${empleadoId}`);
    }
}

