import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Payment } from '../models/payment.modal';
import { Record } from '../models/record.modal';

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private tracks: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private sessions: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
  private payments: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]);

  tracksStored: any[] = []
  sessionsStored: Record[] = []
  paymentsStored: Payment[] = [{id:"null", payee:'Yuki', amount:9.02, type:"monzo", created: new Date().valueOf()}]
  
  constructor() { }
  //Track Data Control

  // Track Info & Sessions Listener
  getTrackUpdateListener(){
    return this.tracks.asObservable();
  }
  getSessionListUpdateListener(){
    return this.sessions.asObservable();
  }
  
  // For each track in "storedTracks", it will sort them, then pushes all to the listen object
  getTracks(){
    let trackInfo = [{name:"bob", id:"someValue"}, {name:"bob", id:"someOtherValue"}] //dummy data for track information
    this.tracksStored = trackInfo
    this.tracks.next([...this.tracksStored])
  }

  getSessions(trackId:string){ //passing through an id based on what track is opened
    let sessionList:Record[]= [{id:"12321313",name: "dude3", finalTime:110566, fastestLap:110555, email: "tada", personal: false}, {id:"12321313",name: "dude2", finalTime:110566, fastestLap:110555, email: "tada", personal: false}]
    //dummy data for Session information

    this.sessionsStored = sessionList
    this.sessions.next([...this.sessionsStored])
  }
  // Adds session to local list, then runs get Session
  addSession(session: any, trackId: any){
    this.sessionsStored.push(session)
    // this.getSessions(trackId)
    this.sessions.next([...this.sessionsStored])
  }


  // Payment Data Control
  getPaymentsUpdateListener(){
    return this.payments.asObservable();
  }

  // gets the Payment List, and pushes it to the listen Object
  getPayments(){
    this.paymentsStored = this.paymentsStored.sort((a:Payment,b:Payment)=> b.created - a.created ) //orders from most recent
    this.payments.next([...this.paymentsStored])
  }


  // Adds payment to local list, then runs getsPayments
  addPayment(payment: Payment){
    this.paymentsStored.push(payment)
    
    this.getPayments()
  }


}

