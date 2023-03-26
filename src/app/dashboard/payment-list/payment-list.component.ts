import { Component } from '@angular/core';
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
  payments: Payment[]

  
  constructor(private leaderboardService: LeaderboardService){}
  ngOnInit(): void{
    console.log("running on Init")
    this.leaderboardService.getPayments()
    this.paymentsSub = this.leaderboardService.getPaymentsUpdateListener().subscribe((payents: any)=>{
        this.payments = payents
    });
  }
}
