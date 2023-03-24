import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LeaderboardService } from 'src/app/services/leaderboard-service.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})

export class SessionFormComponent {
  timeMask = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/, /\d/];
  trackOptions = [{name:"rainbow Road", value: 1},{name:"DudeRace", value: 2},{name:"Bobbet", value: 3}]
  isManual = true;
  session = {
    name: '',
  }
  constructor(private lbService: LeaderboardService){
    
  }
  

  public toggle(event: MatSlideToggleChange) {
    this.isManual = event.checked;
  }
  sessionFormSubmit(form: NgForm){
      console.log(form.value)
      // const session= {
      //     id: null,
      //     name: this.sessionForm.value.name,
      //     email: this.sessionForm.value.email,
      //     studentID: this.sessionForm.value.studentID,
      //     time: this.sessionForm.value.time,
      //     personal: this.sessionForm.value.personal,
      // }
      // this.lbService.addSession(session)
      // form.resetForm()

  }
}
