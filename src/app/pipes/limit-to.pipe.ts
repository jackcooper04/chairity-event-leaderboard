import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class timeConvertPipe implements PipeTransform {
  constructor(private datePipe: DatePipe){}
  transform(value: number) : string  {
    let formatedTime :any = this.datePipe.transform(value, 'm:s:ms')
    return formatedTime.length > 9 ? formatedTime.substring(0, 9) : formatedTime;
  }
}
