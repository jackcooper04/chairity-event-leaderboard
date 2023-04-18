import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.modal';
import { Record } from '../models/record.modal';
const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private payments: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]);
  private testTrack = new Subject<{tracks:any[]}>();
  private testSession  = new Subject<{sessions:any[]}>();
  private users  = new Subject<{users:any[]}>();
  tracksStored: any[] = []
  sessionsStored: Record[] = []
  paymentsStored: Payment[] = [{id:"null", payee:'Yuki', amount:9.02, type:"monzo", created: new Date().valueOf()}]

  constructor(private http:HttpClient) { }
  //Track Data Control

  // Track Info & Sessions Listener
  getTrackUpdateListener(){
    return this.testTrack.asObservable();
  }
  getSessionListUpdateListener(){
    return this.testSession.asObservable();
  }

  // For each track in "storedTracks", it will sort them, then pushes all to the listen object
  getTracks(){
    this.http
    .get<{tracks:any[]}>(API_URL+"/track")
    .subscribe(trackResponse => {
      //console.log(trackResponse)

      this.testTrack.next({tracks:trackResponse.tracks})
    })
    //let trackInfo = [{name:"bob", id:"someValue"}, {name:"bob", id:"someOtherValue"}] //dummy data for track information

  }

  getSessions(trackId:string){ //passing through an id based on what track is opened
    this.http
    .get<{sessions:any[]}>(API_URL+"/time?track="+trackId)
    .subscribe(trackResponse => {
      this.sessionsStored = trackResponse.sessions;

      this.testSession.next({sessions:trackResponse.sessions})
    })
  }
  // Adds session to local list, then runs get Session
  addSession(session: any, trackId: any,user:any){
    const finalBody = {
      user: user,
      trackID:session.trackID,
      trackTimes:session.lapTimes,
      fastestTimeIdx:session.fastestidx,
      totalTime:session.total,
      marker:session.marker
    };
    console.log(finalBody)
    this.http
    .post<{ message: any }>(API_URL + "/time",finalBody)
    .subscribe(trackResponse => {
      console.log(trackResponse)
    })
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
  // User Data Control
  getUsersListUpdateListener(){
    return this.users.asObservable();
  }
  getUsers(){
    this.http
    .get<{users:any[]}>(API_URL+"/user")
    .subscribe(userResponse => {
      //console.log(trackResponse)

      this.users.next({users:userResponse.users})
  })


}
}
