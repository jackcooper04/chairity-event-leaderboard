import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class timeConvertPipe implements PipeTransform {
  transform(value: number) : string  {
    let mins = (value / 1000) / 60;
    let secs = ((value / 1000) % 60).toFixed(3)
    let secsSplit: string[] = secs.toString().split(".")
    let finSecs: string= "00"
    let millis = Number(secsSplit[1]);
    
    let formatedSeconds: Number = Number(secsSplit[0])

    mins = Number(mins.toString().split(".")[0]) //Grabs the number before the decimal point in the Mins Value
    
    if (formatedSeconds < 10) {
        finSecs = "0" + formatedSeconds;
    }else{
      finSecs = "" + formatedSeconds;
    }

    let formatedTime :any = mins+ ":" + finSecs + ":" + millis
    return formatedTime
  }
}
