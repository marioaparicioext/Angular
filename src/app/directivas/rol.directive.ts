import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Empleado } from '../modelos/empleado';
import { EmpleadoServicio } from '../empleado/servicios/empleado.servicio';

@Directive({
  selector: '[appRol]'
})
export class RolDirective implements OnInit {

  private currentUser: Empleado;
  private permissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private empleadoService: EmpleadoServicio
  ) {

    if (localStorage != null) {
      const id = localStorage.getItem('id');
      console.log("SEGUNDO cargo el id " + id);
      if (id != null) {
        this.empleadoService.obtenerEmpleadoPorId(+id).subscribe((user: Empleado) => {
          this.currentUser = user;
          this.updateView();
        });
      }

    }
  }
  ngOnInit(): void {
    this.updateView();
  }
  @Input('appRol')
  set appRol(val: Array<string>) {
    this.permissions = val;
    this.updateView();
  }


  //Se actualiza los roles del empleado con sesion activa
  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }


  private checkPermission(): boolean {
    let tienePermiso = false;
    let hasPermission = false;
    console.log("PERMISOS " + this.permissions);

    if (this.currentUser && this.currentUser.rol.descripcion) {
      console.log("YO TENGO ESTOS PERMISOS" + this.currentUser.rol.descripcion);
      for (const checkPermiso of this.permissions) {
        const rol = this.currentUser.rol.descripcion;
        tienePermiso = (rol.toUpperCase() == checkPermiso.toUpperCase());
        if (tienePermiso) {
          console.log("TENGO PERMISO PARA VER EL BOTON CON PERMISOS: " + this.permissions);
          hasPermission = true;
          break;
        }
      }
    }
    return hasPermission;
  }

}
