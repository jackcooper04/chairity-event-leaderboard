import { Component, OnInit } from '@angular/core';
import {Subscription } from 'rxjs';
import { LeaderboardService } from '../../services/leaderboard-service.service';
import { Record } from '../../models/record.modal';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})



export class LeaderboardComponent implements OnInit{
  trackInfo : any[] = []
  sessions: Record[]= [];
  public tracksSub : Subscription;
  public sessionSub: Subscription;

  
  constructor(private leaderboardService: LeaderboardService){}
  ngOnInit(): void{
    console.log("running on Init")
    this.leaderboardService.getTracks()
    
    this.tracksSub = this.leaderboardService.getTrackUpdateListener().subscribe((data: any)=>{
        this.trackInfo = data
    });
    this.leaderboardService.getSessions(this.trackInfo[0].id)
    this.tracksSub = this.leaderboardService.getSessionListUpdateListener().subscribe((data: any)=>{
        this.sessions = data
    });

  } 
  onTabChanged(value: any){
    this.leaderboardService.getSessions(this.trackInfo[value.index].id)
  }
}