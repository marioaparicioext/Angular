import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Empleado } from '../modelos/empleado';
import { EmpleadoServicio } from '../empleado/servicios/empleado.servicio';

@Directive({
  selector: '[appRol]'
})
export class RolDirective implements OnInit {

  private currentUser: Empleado;
  private permissions = []

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private empleadoService: EmpleadoServicio
  ) { }
  ngOnInit(): void {


  }

}
