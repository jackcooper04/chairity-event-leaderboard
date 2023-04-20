import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeaderboardService } from '../../services/leaderboard-service.service';
import { Record } from '../../models/record.modal';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})



export class LeaderboardComponent implements OnInit {
  trackInfo: any[] = []
  sessions: any[] = [];
  public tracksSub: Subscription;
  public sessionSub: Subscription;
  public idTest: any;

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
     // console.log(data)
      let sortedSessions = data.sessions.sort(function(a:any, b:any) {
        return a.totalTime - b.totalTime;
      });
      this.sessions = sortedSessions
    });

  }

  onTabChanged(value: any) {
    console.log(this.trackInfo[value.index].track_name)
    let interval:any;
    clearInterval(interval)
    this.leaderboardService.getSessions(this.trackInfo[value.index].track_name)
    let root = this
    interval = setInterval(function () {root.leaderboardService.getSessions(root.trackInfo[value.index].track_name)}, 5000);
  }

}
