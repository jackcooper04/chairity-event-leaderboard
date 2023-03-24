import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SubmitTimeComponent } from './submit-time/submit-time.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LeaderboardService} from './services/leaderboard-service.service';
import { timeConvertPipe } from './pipes/limit-to.pipe';
import { PaymentFormComponent } from './submit-time/payment-form/payment-form.component';
import { SessionFormComponent } from './submit-time/session-form/session-form.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'ngx-input-mask';
import { LapToMilliPipe } from './pipes/lap-to-milli.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    SubmitTimeComponent,
    timeConvertPipe,
    PaymentFormComponent,
    SessionFormComponent,
    LapToMilliPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  providers: [LeaderboardService, DatePipe, LapToMilliPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
