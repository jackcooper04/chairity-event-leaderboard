import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './Components/leaderboard/leaderboard.component'
import { dashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LeaderboardComponent},
  {path: 'string', component: dashboardComponent},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
