import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Empleado } from '../modelos/empleado';
import { EmpleadoServicio } from '../empleado/servicios/empleado.servicio';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: "[appRol]",
})
export class RolDirective implements OnInit {

  private currentUser: Empleado;
  private permissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private empleadoService: EmpleadoServicio
  ) { }
  ngOnInit(): void {
    if (localStorage != null) {
      const id = localStorage.getItem('id');
      if (id != null) {
        this.empleadoService.obtenerEmpleadoPorId(+id).subscribe((user: Empleado) => {
          this.currentUser = user;
          
          
        });
      }


    } else {
      console.log('peinate pelon');
    }
    this.updateView();
  }
  @Input('appRol')
  set appRol(val: Array<string>) {
    this.permissions = val;
    this.updateView();
  }
  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
  private checkPermission(): boolean {
    let tienePermiso = false;
    let hasPermission = false;
    if (this.currentUser && this.currentUser.rol) {
      for (const checkPermiso of this.permissions) {
        const rol = this.currentUser.rol.descripcion;
        tienePermiso = rol.toUpperCase() == checkPermiso.toUpperCase();

        if (tienePermiso) {
          hasPermission = true;
          break;
        }
      }
    }
    return hasPermission;
  }

}
