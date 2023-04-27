import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empleadoFilter'
})
export class EmpleadoFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultados = [];
    for(const empleado of value){
      if((empleado.email.toLowerCase().indexOf(arg.toLowerCase()) ) > -1 ){
        resultados.push(empleado);
      }
      else if(empleado.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultados.push(empleado);
      }else if(empleado.apellidos.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultados.push(empleado);
      }
    }
    return resultados;
  }

}
// || empleado.nombre.indexOf(arg) || empleado.apellidos.indexOf(arg)
