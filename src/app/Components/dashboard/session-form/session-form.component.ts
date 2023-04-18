import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LapToMilliPipe } from 'src/app/pipes/lap-to-milli.pipe';
import { timeConvertPipe } from 'src/app/pipes/limit-to.pipe';
import { LeaderboardService } from 'src/app/services/leaderboard-service.service';
import { Subscription } from 'rxjs';
import { Track } from 'src/app/models/track.modal';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const API_URL = environment.API_URL;
@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})

export class SessionFormComponent {
  public tracksSub: Subscription;
  public userSub: Subscription;

  trackOptions: Track[] = []
  users: any[] = []

  isManual = false; //is Email entered manually
  isMarker = false;

  laptoMilli = new LapToMilliPipe();
  milliToLap = new timeConvertPipe();

  constructor(private lbService: LeaderboardService,private http:HttpClient) { }

  ngOnInit(): void {
    this.lbService.getTracks()
    this.lbService.getUsers()
    this.tracksSub = this.lbService.getTrackUpdateListener().subscribe((data: any) => {
      this.trackOptions = data.tracks
    });
    this.userSub = this.lbService.getUsersListUpdateListener().subscribe((data:any)=>{
      this.users = data.users
    })

  }



  public toggle(event: MatSlideToggleChange) {
    this.isManual = event.checked;
  }
  sessionFormSubmit(form: NgForm) {
    let times = [{ value: form.value.time, name: "time" }, { value: form.value.lapTest1, name: "lapTest1" }, { value: form.value.lapTest2, name: "lapTest2" }, { value: form.value.lapTest3, name: "lapTest3" }]

    for (let time of times) {
      if (this.validateTime(time.value) == false) { //if the seconds are greater than 59 then return error on input

        form.controls[time.name].setErrors({ 'incorrect': true }); //if incorrect match, incorrect is ture

      } else if (this.validateTime(time.value) == true) {

        form.controls[time.name].setErrors(null) //if correct match, no errors found in form
      }
    }
    let laps = [this.laptoMilli.transform(form.value.lapTest1),this.laptoMilli.transform(form.value.lapTest2), this.laptoMilli.transform(form.value.lapTest3) ]
    // let sortedTimes = laps.sort((a,b) => (a< b) ? 1 : (a< b) ? -1 : 0);
    let sortedTimes = laps.sort(function(a, b) {
      return a - b;
    });
    console.log(sortedTimes)
    let fastestLap = sortedTimes[0]

    // Checks if student ID was used and formats to email , otherwise passes email
    let finalEmail = "";
    console.log(form.value)
    console.log(this.users)
    if (this.isManual == false && form.value.userId !== "new") {
      for (let idx in this.users){
        if (this.users[idx]._id == form.value.userId){
            finalEmail = this.users[idx].id.toString() + "@student.chelmsford.ac.uk";
        };
      };
    } else {
      finalEmail = form.value.email
    }
    if (form.invalid) {
      return;
    }


    let user = {};
    if(form.value.userId == "new"){
      user = {
        id:form.value.studentId,
        name: form.value.name,
        email: finalEmail
      };
    }else{
      user = {
        id: form.value.userId
      }
    }

    let marker = form.value.marker
    if (marker == undefined){
      marker = false;
    }else{
      marker = true
    }
    const session = {
      trackID: form.value.track,
      total: this.laptoMilli.transform(form.value.time), //converts the entered time to milli
      lapTimes:sortedTimes,
      fastestidx: 0,
      marker: true,
    };
    console.log(session)
    this.lbService.addSession(session, form.value.track, user)
    //form.reset()


        // form.resetForm()

      }
  // Checks that the seconds are less that 60, as otherwise the time would be invalid
  validateTime(time: string): boolean{
        let sec = Number(time.split(':')[1]) //split the time string on the ':', then grabs the second item and converts it to number
    if(sec < 60) {
          return true
        }else{
          return false
        }

      }
}
