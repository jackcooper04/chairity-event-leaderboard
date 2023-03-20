import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SubmitTimeComponent } from './submit-time/submit-time.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LeaderboardService} from './leaderboard-service.service';
import { timeConvertPipe } from './pipes/limit-to.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    SubmitTimeComponent,
    timeConvertPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [LeaderboardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
