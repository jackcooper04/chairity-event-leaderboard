import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Record } from '../models/record.modal';

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private tracks: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
  trackOne: Record[] = [{id:"12321313",name: "dude1", time:4528030, email: "tada", personal: false},{id:"12321313", name: "dude1", time:92803, email: "tada", personal: false}, {id:"12321313", name: "dude1", time:92706, email: "tada", personal: true}, {id:"12321313", name: "dude1", time:92703, email: "tada", personal: false} ];
  trackTwo: any[] = [{name: "dude1", time:1679065003698, email: "tada"}, {name: "dude2", time:1679065003697, email: "tada"}];
  trackThree: any[] = [];
  
  constructor() { }

  getTrackUpdateListener(){
    return this.tracks.asObservable();
  }

  getTracks(){
    this.trackOne = this.trackOne.sort((a,b)=> a.time - b.time)
    let tracksTemp: any = [this.trackOne, this.trackTwo, this.trackThree]
    this.tracks.next([...tracksTemp])
  }
  addSession(session: any){
    console.log(session)
  }

}
