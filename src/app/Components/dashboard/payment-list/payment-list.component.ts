import { formatCurrency } from '@angular/common';
import { Component, Inject,
  LOCALE_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/models/payment.modal';
import { LeaderboardService } from 'src/app/services/leaderboard-service.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent {
  public paymentsSub : Subscription;
  payments: any[]

  
  constructor(private leaderboardService: LeaderboardService,
    @Inject(LOCALE_ID) public locale: string,){}
  ngOnInit(): void{
    console.log("running on Init")
    this.leaderboardService.getPayments()
    this.paymentsSub = this.leaderboardService.getPaymentsUpdateListener().subscribe((payents: Payment[])=>{
        this.payments = payents
    });
  }
  formatAmount(amount: number):string{
    let newValue = formatCurrency(amount,this.locale, '£')
    return newValue
  }
}
