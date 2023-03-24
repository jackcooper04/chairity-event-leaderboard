import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class timeConvertPipe implements PipeTransform {
  constructor(private datePipe: DatePipe){}
  transform(value: number) : string  {
    let mins = (value / 1000) / 60;
    let secs = ((value / 1000) % 60).toFixed(3)
    let secsSplit: string[] = secs.toString().split(".")
    let finSecs: string= "00"
    let millis = Number(secsSplit[1]);
    
    let formatedSeconds: Number = Number(secsSplit[0])
    console.log(secs)
    if (mins > 1) {
        mins = Math.round(mins);
    } else {
        mins = 0;
    }
    
    if (formatedSeconds < 10) {
        finSecs = "0" + formatedSeconds;
    }else{
      finSecs = "" + formatedSeconds;
    }

    let formatedTime :any = mins+ ":" + finSecs + ":" + millis
    return formatedTime
  }
}
