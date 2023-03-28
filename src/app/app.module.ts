import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SubmitTimeComponent } from './submit-time/submit-time.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LeaderboardService} from './leaderboard-service.service';
import { timeConvertPipe } from './pipes/limit-to.pipe';
import { StudentComponent } from './submit-time/student/student.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TestScannerComponent } from './test-scanner/test-scanner.component';


@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    SubmitTimeComponent,

    timeConvertPipe,
    StudentComponent,
    TestScannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    MaterialModule,
  ],
  providers: [LeaderboardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
