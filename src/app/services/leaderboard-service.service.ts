import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Payment } from '../models/payment.modal';
import { Record } from '../models/record.modal';

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private tracks: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
  private payments: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]);

  tracksStored: any[] = [
    [
    {id:"12321313",name: "dude1", finalTime:110555, fastestLap:110555, email: "tada", personal: false},
    ],
    [
      {id:"12321313",name: "dude1", finalTime:110555, fastestLap:110555, email: "tada", personal: false},
    ],
    [
      {id:"12321313",name: "dude1", finalTime:110555, fastestLap:110555, email: "tada", personal: false},
    ]
  ]
  paymentsStored: Payment[] = [{id:"null", payee:'Yuki', amount:9.02, type:"monzo", created: new Date().valueOf()}]
  
  constructor() { }
  //Track Data Control

  // Tracks Listener
  getTrackUpdateListener(){
    return this.tracks.asObservable();
  }

  // For each track in "storedTracks", it will sort them, then pushes all to the listen object
  getTracks(){
    this.tracksStored.forEach((track, index)=>{
      this.tracksStored[index] = track.sort((a:Record,b:Record)=> a.finalTime - b.finalTime)
    })
    
    this.tracks.next([...this.tracksStored])
  }
  // Adds session to local list, then runs get Session
  addSession(session: any, track: any){
    this.tracksStored[track].push(session)
    
    this.getTracks()
  }
  // Payment Data Control
  getPaymentsUpdateListener(){
    return this.payments.asObservable();
  }
  // gets the Payment List, and pushes it to the listen Object
  getPayments(){
    this.paymentsStored = this.paymentsStored.sort((a:Payment,b:Payment)=> b.created - a.created )
    this.payments.next([...this.paymentsStored])
  }
  // Adds payment to local list, then runs getsPayments
  addPayment(payment: Payment){
    this.paymentsStored.push(payment)
    
    this.getPayments()
  }

}
