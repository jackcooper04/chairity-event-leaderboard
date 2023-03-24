import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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

    

  isManual = false;
  isMarker = false;

  laptoMilli = new LapToMilliPipe();
  milliToLap = new timeConvertPipe();

  constructor(private lbService: LeaderboardService){
    
  }
  

  public toggle(event: MatSlideToggleChange) {
    this.isManual = event.checked;
  }
  sessionFormSubmit(form: NgForm){
    
      if(form.invalid){
        return
      }
      const session= {
          id: null,
          name: form.value.name,
          email: form.value.email,
          studentID: form.value.studentID,
          time: this.laptoMilli.transform(form.value.time), //converts the entered time to milli
          testLaps: [this.laptoMilli.transform(form.value.lapTest1), this.laptoMilli.transform(form.value.lapTest2)],
          personal: this.isManual
      }

      if(form.value.time !== this.milliToLap.transform(session.time)){ //compares the entered value to the milliseconds formated
        form.controls['time'].setErrors({'incorrect': true})
        return
      } 
      if(form.value.lapTest1 !== this.milliToLap.transform(session.testLaps[0])){ //compares the entered value to the milliseconds formated
        console.log(form.value.lapTest1 , this.milliToLap.transform(session.testLaps[1]))
        form.controls['lapTest1'].setErrors({'incorrect': true})
        return
      } 
      if((form.value.lapTest2 !== this.milliToLap.transform(session.testLaps[1]))){ //compares the entered value to the milliseconds formated
        form.controls['lapTest2'].setErrors({'incorrect': true})
        return
      }
      this.lbService.addSession(session, form.value.track)
      // form.resetForm()

  }
}
