import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadosFitro'
})
export class EstadosFitroPipe implements PipeTransform {


  transform(values: any[], estadoFiltro: string): any[] {
    if (!estadoFiltro) {
      return values;
    }
    return values.filter(item => item.estado === estadoFiltro);
  }

}
