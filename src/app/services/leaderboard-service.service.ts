import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Record } from '../models/record.modal';

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private tracks: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
  tracksStored = [
    [
    {id:"12321313",name: "dude1", time:110555, email: "tada", personal: false},
    {id:"12321313", name: "dude1", time:92803, email: "tada", personal: false},
    {id:"12321313", name: "dude1", time:92706, email: "tada", personal: true},
    {id:"12321313", name: "dude1", time:92703, email: "tada", personal: false}
    ],
    [
      {name: "dude1", time:1679065003698, email: "tada"}, {name: "dude2", time:1679065003697, email: "tada"}
    ],[]]
    

  trackTwo: any[] = [];
  trackThree: any[] = [];
  
  constructor() { }

  getTrackUpdateListener(){
    return this.tracks.asObservable();
  }

  getTracks(){
    this.tracksStored.forEach((track, index)=>{
      this.tracksStored[index] = track.sort((a,b)=> a.time - b.time)
    })
    let tempTracks = this.tracksStored
    this.tracks.next([...tempTracks])
  }
  addSession(session: any, track: any){
    if(track == 1){
      this.trackOne.push(session)
    }else if(track == 2){
      this.trackTwo.push(session)
    }else if(track == 3){
      this.trackThree.push(session)
    }
    
    this.getTracks()
  }

}
