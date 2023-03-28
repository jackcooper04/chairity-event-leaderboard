import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Payment } from './models/payment.modal';
import { LeaderboardService } from './services/leaderboard-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public paymentsSub : Subscription;
  payments : any[];
  paymentsTotal: number = 0;

  constructor(private lbService: LeaderboardService){}
  ngOnInit(): void {
    this.lbService.getPayments()
    this.paymentsSub = this.lbService.getPaymentsUpdateListener()
    .subscribe((payents: Payment[])=>{
      this.payments = payents
      this.paymentsTotal = 0
      this.payments.forEach(payment => {
        this.paymentsTotal += payment.amount
      });
    })
  }


}
