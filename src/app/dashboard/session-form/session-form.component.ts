import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { createMask } from '@ngneat/input-mask';
import { LapToMilliPipe } from 'src/app/pipes/lap-to-milli.pipe';
import { timeConvertPipe } from 'src/app/pipes/limit-to.pipe';
import { LeaderboardService } from 'src/app/services/leaderboard-service.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})

export class SessionFormComponent {
  trackOptions = [{name:"rainbow Road", value: 0},{name:"DudeRace", value: 1},{name:"Bobbet", value: 2}]

  timeInputMask = createMask('9?9:99:999');

  isManual = false;
  isMarker = false;

  laptoMilli = new LapToMilliPipe();
  milliToLap = new timeConvertPipe();

  constructor(private lbService: LeaderboardService){}
  

  public toggle(event: MatSlideToggleChange) {
    this.isManual = event.checked;
  }
  sessionFormSubmit(form: NgForm){
      let times = [form.value.time, form.value.lapTest1, form.value.lapTest2]
      for (let time of times){
        if(this.validateTime(time) == false){
          console.log(time)
          form.controls['time'].setErrors({'incorrect': true});
        }
      }
    
      if(form.invalid){
        return
      }
      const session= {
          id: "null",
          name: form.value.name,
          email: form.value.email,
          studentID: Number(form.value.studentID),
          time: this.laptoMilli.transform(form.value.time), //converts the entered time to milli
          testLaps: [this.laptoMilli.transform(form.value.lapTest1), this.laptoMilli.transform(form.value.lapTest2)],
          personal: form.value.personal
      }
      
      this.lbService.addSession(session, form.value.track)
      // form.resetForm()

  }

  validateTime(time: string):boolean{
    let min = Number(time.split(':')[1])
    if (min < 60){
      return true
    }else{
      return false
    }
    
  }
}
