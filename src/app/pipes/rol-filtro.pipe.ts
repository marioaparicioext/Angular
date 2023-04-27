import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolFiltro'
})
export class RolFiltroPipe implements PipeTransform {

  transform(values: any[], rolFiltro: string): any[] {
    if (!rolFiltro) {
      return values;
    }
    return values.filter(item => item.rol.descripcion === rolFiltro);
  }


}
