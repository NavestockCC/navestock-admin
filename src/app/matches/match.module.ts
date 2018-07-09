/* Angular modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';


/* Navestock Modules*/
import {NavestockMaterialModule} from '../root/match.material.module';

/* Navetock Services */
import {MatchDataService} from './matchdata-service/matchdata.service'

/* Navestock components */
import {MatchListComponent} from './matchlist/matchlist.component'
import {MatchDetailComponent} from './match-detail/match-detail.component';
import {BattingComponent} from './batting/batting.component';
import {BowlingComponent} from './bowling/bowling.component';


@NgModule({
    declarations: [
        MatchListComponent,
        MatchDetailComponent,
        BattingComponent,
        BowlingComponent
    ],
    imports: [ 
        CommonModule,
        NavestockMaterialModule,
        FlexLayoutModule,
        FormsModule,
        RouterModule
         ],
    exports: [
        MatchListComponent,
        MatchDetailComponent,
        BattingComponent,
        BowlingComponent
    ],
    providers: [
        MatchDataService
    ],
})
export class MatchModule {}
