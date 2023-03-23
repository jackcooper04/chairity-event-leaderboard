import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component'
import { SubmitTimeComponent } from './submit-time/submit-time.component';

const routes: Routes = [
  { path: '', component: LeaderboardComponent},
  {path: 'string', component: SubmitTimeComponent},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
