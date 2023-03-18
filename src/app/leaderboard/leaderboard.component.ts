import { Component } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { record } from '../record.modal';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  trackOne: record[] = [{name: "dude1", time:1679065003698, email: "tada"}, {name: "dude2", time:1679065003698, email: "tada"}];
  trackTwo: any[] = [];
  trackThree: any[] = [];
  
}
