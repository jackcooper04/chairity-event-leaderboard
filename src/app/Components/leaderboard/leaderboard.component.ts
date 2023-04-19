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
  sessions: any[]= [];
  public tracksSub : Subscription;
  public sessionSub: Subscription;

  
  constructor(private leaderboardService: LeaderboardService){}
  ngOnInit(): void{
    console.log("running on Init")
    
 
    this.tracksSub = this.leaderboardService.getTrackUpdateListener().subscribe((data: any)=>{
        this.trackInfo = data.tracks
       console.log(data.tracks);
       this.leaderboardService.getSessions(this.trackInfo[0].track_name)

        // if (data){
        //   console.log(this.trackInfo[0])
        //   this.leaderboardService.getSessions(this.trackInfo[0]._id)
        // }
        
    });
    this.leaderboardService.getTracks()
    
   // this.leaderboardService.getSessions(this.trackInfo[0]._id)
    this.sessionSub = this.leaderboardService.getSessionListUpdateListener().subscribe((data: any)=>{
        this.sessions = data.sessions;
        console.log(this.sessions)
    });

  } 
  onTabChanged(value: any){
    this.leaderboardService.getSessions(this.trackInfo[value.index].track_name)
    
  }
}