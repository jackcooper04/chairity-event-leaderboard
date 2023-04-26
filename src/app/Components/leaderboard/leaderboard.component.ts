import { Component, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { LeaderboardService } from '../../services/leaderboard-service.service';
import { Record } from '../../models/record.modal';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})



export class LeaderboardComponent implements OnInit {
  trackInfo: any[] = []
  sessions: any[] = []
  public tracksSub: Subscription;
  public sessionSub: Subscription;
  public idTest: any;

  currentTab: any;
  interval: any;

  selected=2;
  slideshow = false;
  slideshowInterval: any;

  constructor(private leaderboardService: LeaderboardService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['page'] == 'supersecretpassword') {
        this.router.navigate(['supersecretpage'])
      }
    });
    this.tracksSub = this.leaderboardService.getTrackUpdateListener().subscribe((data: any) => {
     
      this.trackInfo = data.tracks
    });
    
    this.leaderboardService.getTracks()

    // this.leaderboardService.getSessions(this.trackInfo[0]._id)
    this.sessionSub = this.leaderboardService.getSessionListUpdateListener().subscribe((data: any) => {
      let sortedSessions = data.sessions.sort(function(a:any, b:any) {
        return a.totalTime - b.totalTime;
      });
      this.sessions = sortedSessions
    });

  }

  onTabChanged(value: any) {
    this.currentTab = value
    clearInterval(this.interval)
    this.leaderboardService.getSessions(this.trackInfo[value.index].track_name)
    
    let root = this
    this.interval = setInterval(function () {root.leaderboardService.getSessions(root.trackInfo[root.currentTab.index].track_name)}, 2500);
  }

  slideShowStart(){
    let root = this
    if(this.slideshow == true){
      clearInterval(this.slideshowInterval)
      this.slideshow = false
    }
    else if(this.slideshow == false){
      this.slideshow = true 
      let i = 0
      this.slideshowInterval = setInterval(function() {
        
        root.selected = i
        i += 1
        if(i == root.trackInfo.length){
          i = 0
        }
        }, 10000);
    }
  }
}
