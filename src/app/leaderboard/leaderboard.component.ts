import { Component, OnInit } from '@angular/core';
import {Subscription } from 'rxjs';
import { LeaderboardService } from '../services/leaderboard-service.service';
import { Record } from '../models/record.modal';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})



export class LeaderboardComponent implements OnInit{
  
  tracks: [Record[], Record[], Record[]]= [[], [], []];
  public tracksSub : Subscription;

  
  constructor(private leaderboardService: LeaderboardService){}
  ngOnInit(): void{
    console.log("running on Init")
    this.leaderboardService.getTracks()
    this.tracksSub = this.leaderboardService.getTrackUpdateListener().subscribe((tracks: any)=>{
        this.tracks = tracks
        console.log(this.tracks[0])
    });

  } 
}