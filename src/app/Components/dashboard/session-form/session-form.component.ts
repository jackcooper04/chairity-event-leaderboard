import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LapToMilliPipe } from 'src/app/pipes/lap-to-milli.pipe';
import { timeConvertPipe } from 'src/app/pipes/limit-to.pipe';
import { LeaderboardService } from 'src/app/services/leaderboard-service.service';
import {Subscription } from 'rxjs';
import { Track } from 'src/app/models/track.modal';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})

export class SessionFormComponent {
  public tracksSub : Subscription;
  trackOptions: Track[] = []

  isManual = false; //is Email entered manually
  isMarker = false;

  laptoMilli = new LapToMilliPipe();
  milliToLap = new timeConvertPipe();

  constructor(private lbService: LeaderboardService){}

  ngOnInit() :void{
    this.lbService.getTracks()
    this.tracksSub = this.lbService.getTrackUpdateListener().subscribe((data: any)=>{
        this.trackOptions = data
    });

  }

  

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

      let fastestLap = Math.min(...times.map(item => this.laptoMilli.transform(item.value))); //grabs fastest time from all laps

      // Checks if student ID was used and formats to email , otherwise passes email
      let finalEmail = ""
      if(this.isManual==false){
        finalEmail = form.value.studentId.toString() + "@student.chelmsford.ac.uk"
      }else{
        finalEmail = form.value.email
      }
      if(form.invalid){
        return
      }


      const session= {
          id: "null",
          name: form.value.name,
          email: finalEmail,
          finalTime: this.laptoMilli.transform(form.value.time), //converts the entered time to milli
          fastestLap: fastestLap,
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
