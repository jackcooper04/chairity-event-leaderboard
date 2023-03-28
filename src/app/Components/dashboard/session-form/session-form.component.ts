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

  isManual = false; //is Email entered manually
  isMarker = false;

  laptoMilli = new LapToMilliPipe();
  milliToLap = new timeConvertPipe();

  constructor(private lbService: LeaderboardService){}
  

  public toggle(event: MatSlideToggleChange) {
    this.isManual = event.checked;
  }
  sessionFormSubmit(form: NgForm){
      let times = [{value: form.value.time, name: "time"}, {value: form.value.lapTest1, name: "lapTest1"}, {value: form.value.lapTest2, name: "lapTest2"} ,{value: form.value.lapTest3, name: "lapTest3"}]
      
      for (let time of times){
        if(this.validateTime(time.value) == false){ //if the seconds are greater than 59 then return error on input

          form.controls[time.name].setErrors({'incorrect': true}); //if incorrect match, incorrect is ture

        }else if(this.validateTime(time.value) == true){

          form.controls[time.name].setErrors(null) //if correct match, no errors found in form
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
          finalTime: this.laptoMilli.transform(form.value.time), //converts the entered time to milli
          fastestLaps: [this.laptoMilli.transform(form.value.lapTest1), this.laptoMilli.transform(form.value.lapTest2)],
          personal: form.value.personal
      }
      
      this.lbService.addSession(session, form.value.track)
      // form.resetForm()

  }
  // Checks that the seconds are less that 60, as otherwise the time would be invalid
  validateTime(time: string):boolean{
    let sec = Number(time.split(':')[1]) //split the time string on the ':', then grabs the second item and converts it to number
    if (sec < 60){
      return true
    }else{
      return false
    }
    
  }
}
