/** Angular Imports */
import { Component, OnInit, Input } from '@angular/core';

/** Material Imports */
import {MatPaginator, MatTableDataSource} from '@angular/material';

/** Navestock Objects */
import {bowling} from '../objects/bowling.object';

/** Navestock Service */
import {MatchDataService} from '../matchdata-service/matchdata.service';

@Component({
    selector: 'bowling-card',
    templateUrl: './bowling.component.html',
    styleUrls: ['./bowling.component.scss']
})
export class BowlingComponent implements OnInit {

    @Input() BowlTeamId:string;
    @Input() MatchId:string;
    public displayedColumns: string[];
    public dataSourceBowling: MatTableDataSource<bowling> = new MatTableDataSource<bowling>();

    constructor(
        private matchdataService: MatchDataService
    ) {
        
     }

    ngOnInit(): void { 
        this.displayedColumns = ['bowlingPlayer', 'bowlingOvers', 'bowlingMaidens', 'bowlingRuns', 'bowlingWickets'];
        this.matchdataService.getBowling(this.MatchId, this.BowlTeamId).subscribe( res => (this.dataSourceBowling.data = res));
    }
}
