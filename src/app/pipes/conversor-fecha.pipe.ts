import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'conversorFecha'
})
export class ConversorFechaPipe implements PipeTransform {

  //Pasa la zona horaria actual a la zona horaria espanola
  transform(value: Date | null | undefined, format: string): string {
    if (value) {
      const datePipe = new DatePipe("es");
      return datePipe.transform(value, format)!;
    }
    else {
      return ''
    }
  }

}
