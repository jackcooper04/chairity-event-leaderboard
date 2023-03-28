import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Payment } from 'src/app/models/payment.modal';
import { LeaderboardService } from 'src/app/services/leaderboard-service.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {

  constructor(private lbService: LeaderboardService){}
  paymentOptions = [{name:'Monzo QR', value:'monzo'}, {name:'Cash', value:'cash'}, {name: 'Other', value:'other'}]

  paymentFormSubmit(form: NgForm){
    if(form.invalid){
      return
    }

    // Set type based on User choice, if other, get type from input
    let type = "null"
    if (form.value.typeSelect == "paid"){
      type = form.value.typeOther
    }else{
      type = form.value.typeSelect
    }

    // format form into object
    const payment: Payment = {
      id: "null",
      payee: form.value.payee,
      amount: form.value.amount,
      type: type,
      created: new Date().getTime()

    }
    this.lbService.addPayment(payment)
    form.reset()
    return
  }
}
