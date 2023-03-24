import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../../modelos/empleado';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoServicio {
    private apiServeUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    public obtenerEmpleados(): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(`${this.apiServeUrl}/empleados/listar`);
    }

    public anadirEmpleado(empleado: Empleado): Observable<Empleado> {
        return this.http.post<Empleado>(`${this.apiServeUrl}/empleados/anadir`, empleado);
    }

    public modificarEmpleado(empleado: Empleado): Observable<Empleado> {
        return this.http.put<Empleado>(`${this.apiServeUrl}/empleados/modificar`, empleado);
    }

    public borrarEmpleado(empleadoId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/empleados/borrar/${empleadoId}`);
    }

    public obtenerEmpleadoPorId(empleadoId: number): Observable<Empleado>{
        return this.http.get<Empleado>(`${this.apiServeUrl}/empleados/${empleadoId}`);
    }

}