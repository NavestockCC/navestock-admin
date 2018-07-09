import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/* Navestock Component Imports*/
import {AppComponent} from '../root/app.component';
import {MatchListComponent} from '../matches/matchlist/matchlist.component'
import {MatchDetailComponent} from '../matches/match-detail/match-detail.component';
import {HomeComponent} from '../home/home.component';


/* Route Definitaions */
const appRoutes: Routes = [
 { path: '',   redirectTo: '/home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent},
 { path: 'MatchDetailImport', component: MatchListComponent},
 { path: 'matchlist/:tid', component: MatchListComponent},
 { path: 'matchdetails/:mid', component: MatchDetailComponent}
  //{ path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
