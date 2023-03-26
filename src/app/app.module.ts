import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { dashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LeaderboardService} from './services/leaderboard-service.service';
import { timeConvertPipe } from './pipes/limit-to.pipe';
import { PaymentFormComponent } from './dashboard/payment-form/payment-form.component';
import { SessionFormComponent } from './dashboard/session-form/session-form.component';

import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { LapToMilliPipe } from './pipes/lap-to-milli.pipe';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PaymentListComponent } from './dashboard/payment-list/payment-list.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    dashboardComponent,
    timeConvertPipe,
    PaymentFormComponent,
    SessionFormComponent,
    LapToMilliPipe,
    PaymentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    
  ],
  providers: [LeaderboardService, DatePipe, LapToMilliPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
