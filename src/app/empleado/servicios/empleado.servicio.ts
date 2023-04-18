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

    //Se obtiene la lista de empleados 
    public obtenerEmpleados(): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(`${this.apiServeUrl}/empleados/listar`);
    }

    //Se anade el empleado dado como parametro
    public anadirEmpleado(empleado: Empleado): Observable<Empleado> {
        return this.http.post<Empleado>(`${this.apiServeUrl}/empleados/anadir`, empleado);
    }

    //Se modifica el empleado dado como parametro
    public modificarEmpleado(empleado: Empleado): Observable<Empleado> {
        return this.http.put<Empleado>(`${this.apiServeUrl}/empleados/modificar`, empleado);
    }

    //Se borra el empleado dado su id
    public borrarEmpleado(empleadoId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/empleados/borrar/${empleadoId}`);
    }

    //Se obtiene el empleado mediante su id
    public obtenerEmpleadoPorId(empleadoId: number): Observable<Empleado> {
        return this.http.get<Empleado>(`${this.apiServeUrl}/empleados/${empleadoId}`);
    }

    //Se obtiene el empleado dado su email
    public obtenerEmpleadoPorUsername(empleadoEmail: string): Observable<Empleado> {
        return this.http.get<Empleado>(`${this.apiServeUrl}/empleados/find/${empleadoEmail}`);
    }

    //Se edita el perfil del empleado pasado por parametro
    public editarPerfil(empleado: Empleado): Observable<Empleado> {
        return this.http.put<Empleado>(`${this.apiServeUrl}/empleados/editarPerfil`, empleado);
    }


}