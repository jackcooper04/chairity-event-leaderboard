import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Record } from './record.modal';

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private tracks: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
  trackOne: Record[] = [{name: "dude1", time:1679065003697, email: "tada", personal: false},{name: "dude1", time:1679065003697, email: "tada", personal: false}, {name: "dude1", time:1679065003698, email: "tada", personal: true}, {name: "dude1", time:1679065003699, email: "tada", personal: false} ];
  trackTwo: any[] = [{name: "dude1", time:1679065003698, email: "tada"}, {name: "dude2", time:1679065003697, email: "tada"}];
  trackThree: any[] = [];
  
  constructor() { }

  getTrackUpdateListener(){
    return this.tracks.asObservable();
  }

  getTracks(){
    this.trackOne = this.trackOne.sort((a,b)=> b.time - a.time)
    let tracksTemp: any = [this.trackOne, this.trackTwo, this.trackThree]
    this.tracks.next([...tracksTemp])
  }

}
