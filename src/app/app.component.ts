import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
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

  constructor(private lbService: LeaderboardService,
    @Inject(LOCALE_ID) public locale: string,){}


    
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
  formatAmount(amount: number):string{
    let newValue = formatCurrency(amount,this.locale, '£')
    return newValue
  }


}
