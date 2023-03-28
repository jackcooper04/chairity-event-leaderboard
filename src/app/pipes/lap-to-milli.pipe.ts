import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lapToMilli'
})
export class LapToMilliPipe implements PipeTransform {

  transform(value: string): number {
    let finalValue = 0
    let splitedLap = value.split(":", 3)
    let min = Number(splitedLap[0])
    let sec = Number(splitedLap[1])
    let milli = Number(splitedLap[2])
    min = min * 60
    sec = sec
    finalValue = (min+sec)*1000+milli

    return finalValue
  }

}
